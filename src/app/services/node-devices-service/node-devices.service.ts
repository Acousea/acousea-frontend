import {Injectable} from '@angular/core';
import {catchError, Observable, throwError} from "rxjs";
import {CommunicationResultResponse} from "../../global-interfaces/global-interfaces";
import {AlertPopUpService} from "../pop-ups-services/alert-popup/alert-pop-up.service";
import {map} from "rxjs/operators";
import {undoable} from "../pop-ups-services/undo-popup-service/undoable-decorator";
import {BackendRoutePaths} from "../../app.route.paths";
import {NodeDevice, NodeDeviceMapper} from "../../global-interfaces/nodes/NodeDevice";
import {ApiService} from "../api-service/api.service";


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
export class NodeDevicesService {

  constructor(private apiService: ApiService, private alertPopUpService: AlertPopUpService) {
  }

  getNodes(): Observable<NodeDevice[]> {
    return this.apiService.get<NodeDevice[]>(BackendRoutePaths.communicationSystem.allNodes)
      .pipe(
        map(response => {
          // Usa NodeDeviceMapper para procesar cada NodeDevice
          return response.map(NodeDeviceMapper.mapNodeDevice);
        }),
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
