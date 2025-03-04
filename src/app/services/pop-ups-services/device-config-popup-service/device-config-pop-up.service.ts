import {Injectable} from '@angular/core';
import {BehaviorSubject, firstValueFrom} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {ApiResponse, OperationCode} from "../../../global-interfaces/global-interfaces";
import {PopUpSettings, USBDevice} from '../../../components/map-site/device-config-popup/device-config-popup.component';
import {BackendRoutePaths} from "../../../app.route.paths";
import {NodeDevice} from "../../../global-interfaces/nodes/NodeDevice";

interface OperationMode {
  name: string;
  value: number;
}

interface Device {
  name: string;
  value: string;
}


export const OPERATION_MODES: OperationMode[] = [
  {name: 'NONE', value: 0},
  {name: 'LAUNCHING', value: 1},
  {name: 'WORKING', value: 2},
  {name: 'RECOVERING', value: 3}
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

  private popUpSettingsSource : BehaviorSubject<PopUpSettings> = new BehaviorSubject<PopUpSettings>({
    display: false,
    deviceName: '',
    icon: '',
  });

  private deviceConfigSource = new BehaviorSubject<DeviceConfiguration>({
    selectedMode: OPERATION_MODES[1],
    directCommunicationEnabled: false,
    directCommunicationSerialNumber: ''
  });

  popUpSettings$ = this.popUpSettingsSource.asObservable();
  deviceConfig$ = this.deviceConfigSource.asObservable();

  constructor(private http: HttpClient) {
  }

  async getUSBDevices() {
    try {
      const response = await firstValueFrom(this.http.get<ApiResponse<{ devices: USBDevice[] }>>(
        BackendRoutePaths.communicationSystem.availableUsbDevices));
      if (!response.value) {
        console.error('DeviceConfigPopUpService::getUSBDevices(): ', response.error?.error_message);
        return [];
      }
      return response.value.devices;
    } catch (error) {
      console.error('Error getting USB devices:', error);
      return [];
    }
  }

  async showNodePopup(node: NodeDevice) {
    this.deviceConfigSource.next({
      selectedMode: OPERATION_MODES.find(mode => mode.name === node.operationMode) || OPERATION_MODES[0],
      directCommunicationEnabled: false,
      directCommunicationSerialNumber: ''
    });
    this.popUpSettingsSource.next({
      display: true,
      deviceName: node.name,
      icon: node.icon
    });
  }


  async getDirectCommunicationStatus(){
    let response = await firstValueFrom(this.http.get<ApiResponse<{ active: boolean }>>(
      BackendRoutePaths.communicationSystem.directCommunicationStatus));
    if (response.value) {
      console.log("Direct communication status: ", response.value);
      return response.value.active;
    } else {
      console.error('Error getting direct communication status: ', response.error?.error_message);
      return false;
    }
  }

  async updateConfiguration(device: string, configuration: DeviceConfiguration) {
    let backendResponse: ApiResponse<any>;
    if (configuration.directCommunicationEnabled) {
      const url = BackendRoutePaths.communicationSystem.directCommunicationEnable(configuration.directCommunicationSerialNumber);
      backendResponse = await firstValueFrom(this.http.put<ApiResponse<any>>(url, {}));
    } else {
      const url = BackendRoutePaths.communicationSystem.directCommunicationDisable;
      backendResponse = await firstValueFrom(this.http.put<ApiResponse<any>>(url, {}));
    }

    if (!backendResponse.value) {
      console.error('Error updating direct communication: ', backendResponse.error?.error_message);
      return;
    }

    // Create new DeviceConfiguration object with updated mode
    const updatedConfig: DeviceConfiguration = {
      selectedMode: this.deviceConfigSource.value.selectedMode,
      directCommunicationEnabled: true,
      directCommunicationSerialNumber: configuration.directCommunicationSerialNumber
    };
    this.deviceConfigSource.next(updatedConfig);
    const url: string = BackendRoutePaths.communicationSystem.operationMode(device, configuration.selectedMode.value);
    backendResponse = await firstValueFrom(this.http.put<ApiResponse<any>>(url, {}));
    if (!backendResponse.value) {
      console.error('Error updating configuration: ', backendResponse.error?.error_message);
      return;
    }
  }

  hidePopup() {
    this.popUpSettingsSource.next({
      display: false,
      deviceName: '',
      icon: ''
    });
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
