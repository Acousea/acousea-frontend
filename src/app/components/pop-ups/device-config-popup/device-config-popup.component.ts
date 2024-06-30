// device-config-popup.component.ts
import { Component } from '@angular/core';
import { NgClass, NgForOf, NgIf } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { usb, getDeviceList } from 'usb';
import {
  DeviceConfigPopUpService, DeviceConfiguration, OPERATION_MODES
} from "../../../services/pop-ups-services/device-config-popup-service/device-config-pop-up.service";



@Component({
  selector: 'app-device-config-popup',
  standalone: true,
  imports: [
    NgIf,
    FormsModule,
    NgClass,
    NgForOf
  ],
  templateUrl: './device-config-popup.component.html',
  styleUrls: ['./device-config-popup.component.css']
})
export class DeviceConfigPopupComponent {
  display = false;
  deviceName = '';
  icon = '';

  // Select only operation modes from 1:3
  operationModes = OPERATION_MODES.slice(1);
  selectedMode = OPERATION_MODES[1];
  directCommunicationEnabled = false;

  usbPorts: USBDevice[] = []; // Lista de dispositivos USB disponibles
  selectedUsbPort: USBDevice | null = null; // Puerto USB seleccionado

  constructor(private deviceConfigPopUpService: DeviceConfigPopUpService) {
    this.deviceConfigPopUpService.display$.subscribe(display => this.display = display);
    this.deviceConfigPopUpService.title$.subscribe(title => this.deviceName = title);
    this.deviceConfigPopUpService.icon$.subscribe(icon => this.icon = `/assets/icons/${icon}`);
    this.deviceConfigPopUpService.deviceConfig$.subscribe(deviceConfig => {
      this.selectedMode = deviceConfig.selectedMode;
      this.directCommunicationEnabled = deviceConfig.directCommunicationEnabled;
    });

    this.listUsbDevices().then(
      () => console.log('USB devices listed: ', this.usbPorts),
    )
  }

  async listUsbDevices() {
    try {
      const devices = await navigator.usb.getDevices();
      this.usbPorts = devices;
      if (devices.length > 0) {
        this.selectedUsbPort = devices[0];
      }
    } catch (error) {
      console.error('Error listing USB devices:', error);
    }
  }

  async requestUsbDevice() {
    try {
      const device = await navigator.usb.requestDevice({ filters: [] });
      this.usbPorts.push(device);
      if (!this.selectedUsbPort) {
        this.selectedUsbPort = device;
      }
    } catch (error) {
      console.error('Error requesting USB device:', error);
    }
  }

  toggleDirectCommunication() {
    this.directCommunicationEnabled = !this.directCommunicationEnabled;
  }

  discardChanges() {
    // Lógica para descartar cambios
    console.log('Discard changes');
    this.deviceConfigPopUpService.hidePopup();
  }

  applyChanges() {
    // Lógica para aplicar cambios
    console.log('Apply changes');
    const newDeviceConfiguration: DeviceConfiguration = {
      selectedMode: this.selectedMode,
      directCommunicationEnabled: this.directCommunicationEnabled,
      directCommunicationSerialNumber: this.selectedUsbPort?.serialNumber || ''
    }
    this.deviceConfigPopUpService.updateConfiguration(this.deviceName, newDeviceConfiguration).then(r =>
      console.log('Configuration updated:', r)
    );
    this.deviceConfigPopUpService.hidePopup();
  }
}
