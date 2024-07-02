import {Injectable} from '@angular/core';
import {BehaviorSubject, firstValueFrom} from "rxjs";
import {environment} from "../../../app.config";
import {HttpClient} from "@angular/common/http";
import {BackendResponse} from "../../../global-interfaces/global-interfaces";

interface OperationMode {
  name: string;
  value: number;
}

interface Device {
  name: string;
  value: string;
}


export const OPERATION_MODES: OperationMode[] = [
  {name: 'Keep current', value: 0},
  {name: 'Launching', value: 1},
  {name: 'Working', value: 2},
  {name: 'Recovery', value: 3}
];
const DEVICES: Device[] = [
  {name: 'Localizer', value: 'Localizer'},
  {name: 'Drifter', value: 'Drifter'}
];

export interface DeviceConfiguration {
  selectedMode: OperationMode;
  directCommunicationEnabled: boolean;
  directCommunicationSerialNumber: string;
}


@Injectable({
  providedIn: 'root'
})
export class DeviceConfigPopUpService {

  private displaySource = new BehaviorSubject<boolean>(false);
  private titleSource = new BehaviorSubject<string>('');
  private iconSource = new BehaviorSubject<string>('');
  private deviceConfigSource = new BehaviorSubject<DeviceConfiguration>({
    selectedMode: OPERATION_MODES[1],
    directCommunicationEnabled: false,
    directCommunicationSerialNumber: ''
  });

  display$ = this.displaySource.asObservable();
  title$ = this.titleSource.asObservable();
  icon$ = this.iconSource.asObservable();
  deviceConfig$ = this.deviceConfigSource.asObservable();

  constructor(private http: HttpClient) {

  }

  async showLocalizerPopup() {
    await this.getCurrentMode('localizer').then((operationMode) => {
      const currentConfig = this.deviceConfigSource.value;
      this.deviceConfigSource.next({...currentConfig, selectedMode: operationMode});
    });
    this.titleSource.next('Localizer');
    this.iconSource.next('compass.svg');
    this.displaySource.next(true);
  }

  async showDrifterPopup() {
    await this.getCurrentMode('drifter').then((operationMode) => {
      const currentConfig = this.deviceConfigSource.value;
      this.deviceConfigSource.next({...currentConfig, selectedMode: operationMode});
    });
    this.titleSource.next('Drifter');
    this.iconSource.next('buoy.svg');
    this.displaySource.next(true);
  }

  async getCurrentMode(device: string) {
    let response = await firstValueFrom(this.http.get<BackendResponse<any>>(
      `${environment.apiUrl}/${environment.apiVersion}/operation-mode/${device.toLowerCase()}`));
    if (response.success) {
      let operationMode = OPERATION_MODES.find(mode => mode.value === response.success.mode);
      if (!operationMode) {
        console.error('Invalid operation mode received from server: ', response.success.mode);
        return OPERATION_MODES[0];
      }
      return operationMode;
    } else {
      console.error('Error getting current mode: ', response.error?.error_message);
      return OPERATION_MODES[0];
    }
  }

  async updateConfiguration(device: string, configuration: DeviceConfiguration) {
    const url: string = `${environment.apiUrl}/${environment.apiVersion}/operation-mode/${device.toLowerCase()}/${configuration.selectedMode.value}`;
    let backendResponse = await firstValueFrom(this.http.put<BackendResponse<any>>(url, {}));
    if (!backendResponse.success) {
      console.error('Error updating configuration: ', backendResponse.error?.error_message);
      return;
    }

    if (configuration.directCommunicationEnabled) {
      const url = `${environment.apiUrl}/${environment.apiVersion}/direct-communication/activate/${configuration.directCommunicationSerialNumber}`;
      backendResponse = await firstValueFrom(this.http.put<BackendResponse<any>>(url, {}));
    } else {
      const url = `${environment.apiUrl}/${environment.apiVersion}/direct-communication/deactivate`;
      backendResponse = await firstValueFrom(this.http.put<BackendResponse<any>>(url, {}));
    }

    if (!backendResponse.success) {
      console.error('Error updating direct communication: ', backendResponse.error?.error_message);
      return;
    }

    const updatedDirectCommunicationSerial = backendResponse.success.serial_number;

    // Create new DeviceConfiguration object with updated mode
    const updatedConfig: DeviceConfiguration = {
      selectedMode: this.deviceConfigSource.value.selectedMode,
      directCommunicationEnabled: !!(updatedDirectCommunicationSerial),
      directCommunicationSerialNumber: updatedDirectCommunicationSerial
    };
    this.deviceConfigSource.next(updatedConfig);
  }

  hidePopup() {
    this.displaySource.next(false);
  }

  setDirectCommunicationEnabled(enabled: boolean) {
    const currentConfig = this.deviceConfigSource.value;
    this.deviceConfigSource.next({...currentConfig, directCommunicationEnabled: enabled});
  }

  setDirectCommunicationSerialNumber(serialNumber: string) {
    const currentConfig = this.deviceConfigSource.value;
    this.deviceConfigSource.next({...currentConfig, directCommunicationSerialNumber: serialNumber});
  }

}
