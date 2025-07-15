import {Injectable} from '@angular/core';
import {catchError, Observable, of} from "rxjs";
import {CommunicationResultResponse} from "@/app/global-interfaces/global.interface";
import {undoable} from "@/app/services/pop-ups/undo-popup-service/undoable-decorator";
import {NodeDevice} from "@/app/global-interfaces/nodes/NodeDevice";
import {ApiService} from "@/app/services/api/api.service";
import {BackendRoutePaths} from "@/app/routes/backend.route.paths";
import {NotificationService} from "@/app/services/real-time/notification-service/notification.service";
import {Notification} from "@/app/global-interfaces/notification/notification.interface";
import {ExtModuleNameType} from "@/app/global-interfaces/nodes/ExtModules";



@Injectable({
  providedIn: 'root'
})
export class NodeConfigurationService {

  constructor(private apiService: ApiService, private notificationService: NotificationService) {
  }

  getNodes(): Observable<NodeDevice[]> {
    return this.apiService.get<NodeDevice[]>(BackendRoutePaths.communicationSystem.allNodes)
      .pipe(
        catchError(error => {
          console.error('Error while fetching nodes:', error);
          this.notificationService.pushNotification(Notification.error(
            'Error while fetching nodes'
          ));
          return of([]);
        })
      );
  }


  setNodeConfiguration(node: NodeDevice): void {
    const apiUrl = BackendRoutePaths.set(BackendRoutePaths.communicationSystem.nodeConfiguration);
    this.apiService.put<CommunicationResultResponse>(apiUrl, node).subscribe({
      next: (response) => {
        this.notificationService.pushNotification(Notification.success(response.message));
      },
      error: (error) => {
        console.error('Error updating node configuration', error);
        this.notificationService.pushNotification(Notification.error(
          'Error while setting the node configuration'
        ));
      }
    });
  }

  @undoable(2000)
  requestUpdatedNodeConfiguration(
    nodeId: string,
    requestedModules: ExtModuleNameType[] = []

  ): void {
    const apiUrl = BackendRoutePaths.update(BackendRoutePaths.communicationSystem.nodeConfiguration);
    this.apiService.put<CommunicationResultResponse>(apiUrl, {
      nodeId: nodeId,
      requestedModules: requestedModules
    }).subscribe({
      next: (response) => {
        this.notificationService.pushNotification(Notification.success(response.message));
      },
      error: (error) => {
        console.error("Error updating reporting periods", error);
      }
    });
  }
}
