import {Component} from '@angular/core';
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {
  DeviceConfigPopUpService,
  DeviceConfiguration,
  OPERATION_MODES
} from "../../../services/pop-ups-services/device-config-popup-service/device-config-pop-up.service";
import {UpdateInfoButtonComponent} from "../../addons/update-info-button/update-info-button.component";
import {undoable} from "../../../services/pop-ups-services/undo-popup-service/undoable-decorator";
import {TranslateModule} from "@ngx-translate/core";

export interface USBDevice {
  device: string;
  name: string;
  description: string;
  serial_number: string;
}

export interface PopUpSettings {
  display: boolean;
  deviceName: string;
  icon: string;
}

@Component({
  selector: 'app-device-config-popup',
  standalone: true,
  imports: [
    NgIf,
    FormsModule,
    NgClass,
    NgForOf,
    UpdateInfoButtonComponent,
    TranslateModule
  ],
  templateUrl: './device-config-popup.component.html',
  styleUrls: ['./device-config-popup.component.css']
})
export class DeviceConfigPopupComponent {
  popUpSettings: PopUpSettings = {
    display: false,
    deviceName: '',
    icon: '',
  };
  deviceConfig: DeviceConfiguration = {
    selectedMode: OPERATION_MODES[1],
    directCommunicationEnabled: false,
    directCommunicationSerialNumber: ''
  }

  // Select only operation modes from 1:3
  operationModes = OPERATION_MODES.slice(1);

  usbPorts: USBDevice[] = []; // Lista de dispositivos USB disponibles
  selectedUsbPort: USBDevice | null = null; // Puerto USB seleccionado

  constructor(private deviceConfigPopUpService: DeviceConfigPopUpService) {
    this.deviceConfigPopUpService.popUpSettings$.subscribe(popUpSettings => {
      this.popUpSettings = popUpSettings;
    });
    this.deviceConfigPopUpService.deviceConfig$.subscribe(deviceConfig => {
      this.deviceConfig = deviceConfig;
    });
    // this.listUsbDevices();
  }

  listUsbDevices() {
    this.deviceConfigPopUpService.getUSBDevices().then(
      (devices: USBDevice[]) => {
        this.usbPorts = devices;
        this.selectedUsbPort = devices[0];
      }
    );
  }

  discardChanges() {
    // Lógica para descartar cambios
    this.deviceConfigPopUpService.hidePopup();
  }

  @undoable(2000)
  applyChanges() {
    console.log('========Applying changes========');
    // Lógica para aplicar cambios
    const newDeviceConfiguration: DeviceConfiguration = {
      selectedMode: this.deviceConfig.selectedMode,
      directCommunicationEnabled: this.deviceConfig.directCommunicationEnabled,
      directCommunicationSerialNumber: this.selectedUsbPort?.serial_number || ''
    }
    this.deviceConfigPopUpService.updateConfiguration(this.popUpSettings.deviceName, newDeviceConfiguration)
      .then(() => console.log('Configuration updated:'));
    this.deviceConfigPopUpService.hidePopup();
  }
  protected readonly console = console;
}
