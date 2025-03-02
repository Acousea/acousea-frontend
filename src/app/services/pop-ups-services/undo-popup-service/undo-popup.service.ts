import {Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";

interface UndoStatus {
  display: boolean;
  message?: string;
}

export class UndoMessages {
  static readonly REQUESTING_CHANGES_MESSAGE = 'Requesting changes...';
  static readonly ACTION_UNDONE_SUCCESSFULLY_MESSAGE = 'Action undone successfully.';
}

@Injectable({
  providedIn: 'root'
})
export class UndoPopupService {

  private undoSource = new BehaviorSubject<UndoStatus>({ display: false });
  notification$ = this.undoSource.asObservable();

  private undoSubject = new Subject<void>();
  undo$ = this.undoSubject.asObservable();

  private confirmSubject = new Subject<void>();
  confirm$ = this.confirmSubject.asObservable();

  private successMessageSubject = new Subject<string>();
  successMessage$ = this.successMessageSubject.asObservable();

  show() {
    this.undoSource.next({ display: true, message: UndoMessages.REQUESTING_CHANGES_MESSAGE });
  }

  undo() {
    this.undoSubject.next();
    this.undoSource.next({ display: false });
    this.successMessageSubject.next(UndoMessages.ACTION_UNDONE_SUCCESSFULLY_MESSAGE);
  }

  confirm() {
    console.log('Changes confirmed.');
    this.confirmSubject.next();
    this.undoSource.next({ display: false });
  }
}
