import {Injectable} from '@angular/core';
import {BehaviorSubject, firstValueFrom} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {BackendResponse} from "../../../global-interfaces/global-interfaces";
import {PopUpSettings, USBDevice} from '../../../components/map-site/device-config-popup/device-config-popup.component';
import {BackendRoutePaths} from "../../../app.route.paths";

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
  // private displaySource = new BehaviorSubject<boolean>(false); // Show or hide popup
  // private titleSource = new BehaviorSubject<string>(''); // Localizer or Drifter
  // private iconSource = new BehaviorSubject<string>(''); // compass.svg or buoy.svg

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
      const response = await firstValueFrom(this.http.get<BackendResponse<{ devices: USBDevice[] }>>(
        BackendRoutePaths.communicationSystem.availableUsbDevices));
      if (!response.success) {
        console.error('DeviceConfigPopUpService::getUSBDevices(): ', response.error?.error_message);
        return [];
      }
      return response.success.devices;
    } catch (error) {
      console.error('Error getting USB devices:', error);
      return [];
    }
  }

  async showLocalizerPopup() {
    await this.getCurrentDeviceOpMode('localizer').then((operationMode) => {
      const currentConfig = this.deviceConfigSource.value;
      this.deviceConfigSource.next({...currentConfig, selectedMode: operationMode});
    });
    await this.getDirectCommunicationStatus().then((enabled) => {
      const currentConfig = this.deviceConfigSource.value;
      this.deviceConfigSource.next({...currentConfig, directCommunicationEnabled: enabled});
    });
    this.popUpSettingsSource.next({
      display: true,
      deviceName: 'Localizer',
      icon: 'compass.svg'
    });
  }

  async showDrifterPopup() {
    await this.getCurrentDeviceOpMode('drifter').then((operationMode) => {
      const currentConfig = this.deviceConfigSource.value;
      this.deviceConfigSource.next({...currentConfig, selectedMode: operationMode});
    });
    await this.getDirectCommunicationStatus().then((enabled) => {
      const currentConfig = this.deviceConfigSource.value;
      this.deviceConfigSource.next({...currentConfig, directCommunicationEnabled: enabled});
    });

    this.popUpSettingsSource.next({
      display: true,
      deviceName: 'Drifter',
      icon: 'buoy.svg'
    });
  }

  async getCurrentDeviceOpMode(device: string) {
    let response = await firstValueFrom(this.http.get<BackendResponse<any>>(
      BackendRoutePaths.communicationSystem.operationMode(device)));
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

  async getDirectCommunicationStatus(){
    let response = await firstValueFrom(this.http.get<BackendResponse<{ active: boolean }>>(
      BackendRoutePaths.communicationSystem.directCommunicationStatus));
    if (response.success) {
      console.log("Direct communication status: ", response.success);
      return response.success.active;
    } else {
      console.error('Error getting direct communication status: ', response.error?.error_message);
      return false;
    }
  }

  async updateConfiguration(device: string, configuration: DeviceConfiguration) {
    let backendResponse: BackendResponse<any>;
    if (configuration.directCommunicationEnabled) {
      const url = BackendRoutePaths.communicationSystem.directCommunicationEnable(configuration.directCommunicationSerialNumber);
      backendResponse = await firstValueFrom(this.http.put<BackendResponse<any>>(url, {}));
    } else {
      const url = BackendRoutePaths.communicationSystem.directCommunicationDisable;
      backendResponse = await firstValueFrom(this.http.put<BackendResponse<any>>(url, {}));
    }

    if (!backendResponse.success) {
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
    backendResponse = await firstValueFrom(this.http.put<BackendResponse<any>>(url, {}));
    if (!backendResponse.success) {
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
