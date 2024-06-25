import {Component, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {KeyValuePipe, NgForOf} from "@angular/common";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../app.config";

enum OPERATION_MODE {
  IGNITION_MODE = 0,
  LAUNCHING_MODE = 1,
  WORKING_MODE = 2,
  RECOVERY_MODE = 3
}

@Component({
  selector: 'app-map-op-mode-selector',
  standalone: true,
  imports: [
    FormsModule,
    KeyValuePipe,
    NgForOf
  ],
  templateUrl: './map-op-mode-selector.component.html',
  styleUrl: './map-op-mode-selector.component.css'
})
export class MapOpModeSelectorComponent implements OnInit {
  operationModes = OPERATION_MODE;
  currentMode: OPERATION_MODE | undefined;
  selectedMode: OPERATION_MODE | undefined;
  device: 'Localizer' | 'Drifter' = 'Localizer'; // Default to LOCALIZER

  constructor(private http: HttpClient) {

  }

  ngOnInit(): void {
    this.getCurrentMode();
  }

  getCurrentMode(): void {
    this.http.get<{ mode: OPERATION_MODE }>(
      `${environment.apiUrl}/${environment.apiVersion}/operation-mode/${this.device.toLowerCase()}`,
    ).subscribe(response => {
      this.currentMode = response.mode;
      this.selectedMode = this.currentMode;
    });
  }

  changeMode(): void {
    this.http.put(
      `${environment.apiUrl}/${environment.apiVersion}/operation-mode/${this.device.toLowerCase()}/${this.selectedMode}`, {})
      .subscribe(response => {
        this.currentMode = this.selectedMode;
      });
  }

}
