import {Injectable} from '@angular/core';
import {BehaviorSubject, firstValueFrom} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {ApiResponse} from "@/app/global-interfaces/global-interfaces";
import {BackendRoutePaths} from "@/app/app.route.paths";

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
    const response = await firstValueFrom(this.httpClient.post<ApiResponse<any>>(BackendRoutePaths.requestQueue.flush, {}))
    console.log("Flush request response: ", response);
    if (response.value) {
      console.log("Flush request was successful.")
      this.hidePopUp();
    } else {
      console.error("Flush request failed.")
    }
  }
}
