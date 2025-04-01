import {UndoPopupService} from "./undo-popup.service";
import {ServiceLocator} from "@/app/app.service.locator.service";



function getServiceFromInstance(instance: any, serviceName: string): UndoPopupService {
  return instance[serviceName];
}

export function undoable(time_millis: number) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      const undoPopupService: UndoPopupService = ServiceLocator.getService(UndoPopupService);

      if (!undoPopupService) {
        throw new Error('UndoPopupService is not available');
      }

      // Show the undo popup
      undoPopupService.show();

      const undoTimeout = setTimeout(() => {
        // If the time passes without undo, execute the original method
        originalMethod.apply(this, args);
        undoPopupService.confirm();
      }, time_millis);

      // Subscribe to the undo action
      const undoSubscription = undoPopupService.undo$.subscribe(() => {
        clearTimeout(undoTimeout);
        console.log('Action undone by user.');
        undoSubscription.unsubscribe();
      });

      // Clean up the subscription after confirmation
      const confirmSubscription = undoPopupService.confirm$.subscribe(() => {
        undoSubscription.unsubscribe();
        confirmSubscription.unsubscribe();
      });
    };

    return descriptor;
  };

}
