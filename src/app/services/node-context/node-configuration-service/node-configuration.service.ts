import {Injectable} from '@angular/core';
import {catchError, Observable, throwError} from "rxjs";
import {CommunicationResultResponse} from "@/app/global-interfaces/global-interfaces";
import {AlertPopUpService} from "@/app/services/pop-ups/alert-popup/alert-pop-up.service";
import {map} from "rxjs/operators";
import {undoable} from "@/app/services/pop-ups/undo-popup-service/undoable-decorator";
import {NodeDevice, NodeDeviceMapper} from "@/app/global-interfaces/nodes/NodeDevice";
import {ApiService} from "@/app/services/api/api.service";
import {BackendRoutePaths} from "@/app/routes/backend.route.paths";


export interface ReportingPeriods {
  launchingSbdPeriod: number;
  launchingLoraPeriod: number;
  workingSbdPeriod: number;
  workingLoraPeriod: number;
  recoveringSbdPeriod: number;
  recoveringLoraPeriod: number;
}


@Injectable({
  providedIn: 'root'
})
export class NodeConfigurationService {

  constructor(private apiService: ApiService, private alertPopUpService: AlertPopUpService) {
  }

  getNodes(): Observable<NodeDevice[]> {
    return this.apiService.get<NodeDevice[]>(BackendRoutePaths.communicationSystem.allNodes)
      .pipe(
        catchError(error => {
          this.alertPopUpService.showErrorMessage('An error occurred while fetching the nodes.');
          return throwError(() => new Error('Failed to fetch nodes.'));
        })
      );
  }


  setNodeConfiguration(node: NodeDevice): void {
    const apiUrl = BackendRoutePaths.set(BackendRoutePaths.communicationSystem.nodeConfiguration);
    this.apiService.put<CommunicationResultResponse>(apiUrl, node).subscribe({
      next: (response) => {
        this.alertPopUpService.showSuccessMessage(response.message);
      },
      error: (error) => {
        this.alertPopUpService.showErrorMessage('An error occurred while setting the node configuration.');
      }
    });
  }

  @undoable(2000)
  getUpdatedReportingPeriods(): void {
    const apiUrl = BackendRoutePaths.update(BackendRoutePaths.communicationSystem.reportingPeriods('drifter'));
    this.apiService.post<CommunicationResultResponse>(apiUrl, {}).subscribe({
      next: (response) => {
        this.alertPopUpService.showSuccessMessage(response.message);
      },
      error: (error) => {
        this.alertPopUpService.showErrorMessage('An error occurred while setting the reporting periods.');
      }
    });
  }
}
