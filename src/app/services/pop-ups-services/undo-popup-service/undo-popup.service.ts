import {Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";

interface UndoStatus {
  display: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class UndoPopupService {

  private undoSource = new BehaviorSubject<UndoStatus>(
    {display: false}
  );
  notification$ = this.undoSource.asObservable();

  private undoSubject = new Subject<void>();
  undo$ = this.undoSubject.asObservable();

  private confirmSubject = new Subject<void>();
  confirm$ = this.confirmSubject.asObservable();

  show() {
    this.undoSource.next({display: true});
  }

  undo() {
    this.undoSubject.next();
    this.undoSource.next({display: false});
  }

  confirm() {
    console.log("Changes confirmed.")
    this.confirmSubject.next();
    this.undoSource.next({display: false});
  }


}
