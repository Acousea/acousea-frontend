import {Component} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {ICListenLoggingConfig} from "@/app/global-interfaces/nodes/PamModules";
import {NodeMonitorPanelComponent} from "@/app/components/node-monitor-panel/node-monitor-panel-component.directive";

@Component({
  selector: 'app-iclisten-data-collection-config-monitor-panel',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    TranslateModule
  ],
  templateUrl: './iclisten-data-collection-config-monitor-panel.component.html',
  styleUrl: '../../../node-config.component.css'
})
export class ICListenDataCollectionConfigMonitorPanel extends NodeMonitorPanelComponent<{
  loggingConfig: ICListenLoggingConfig
}> {
  waveformSampleRates = [1000, 2000, 4000, 8000, 16000, 32000, 64000, 128000, 256000, 512000];
  spectrumSampleRates = [1000, 2000, 4000, 8000, 16000, 32000, 64000, 128000, 256000, 512000];
  bitDepths = [ // 16, 24, 32
    {label: '16', value: 2},
    {label: '24', value: 3},
    {label: '32', value: 4}
  ];
  FFTProcessingModesOptions = [
    {label: 'Mean Average', value: 4},
    {label: 'Peak Detect', value: 5},
    {label: 'Exponential Moving Average', value: 6}
  ];
  gainsDB = [0, 6, 12, 18, 24, 30, 36, 42, 48];

  getTitle(): string {
    return "iclisten-logging-config";
  }


  constructor() {
    super(true);
  }


  applySettings() {

  }

  protected readonly console = console;

}
