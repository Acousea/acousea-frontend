import {Injectable} from '@angular/core';
import {BehaviorSubject, firstValueFrom} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../app.config";
import {BackendResponse} from "../../../global-interfaces/global-interfaces";

interface FlushRequestQueuePopUpState {
  display: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class FlushRequestQueuePopupService {
  private popupStateSource = new BehaviorSubject<FlushRequestQueuePopUpState>({
    display: false
  });
  currentPopupState = this.popupStateSource.asObservable();

  constructor(private httpClient: HttpClient) {}

  showPopUp() {
    this.popupStateSource.next({display: true});
  }

  hidePopUp() {
    this.popupStateSource.next({display: false});
  }

  async flushRequestQueue() {
    console.log("Sending flush request to the server...")
    const response = await firstValueFrom(this.httpClient.post<BackendResponse<any>>(`${environment.apiUrl}/${environment.apiVersion}/communication-system/request-queue/flush`, {}))
    console.log("Flush request response: ", response);
    if (response.success) {
      console.log("Flush request was successful.")
      this.hidePopUp();
    } else {
      console.error("Flush request failed.")
    }
  }
}
