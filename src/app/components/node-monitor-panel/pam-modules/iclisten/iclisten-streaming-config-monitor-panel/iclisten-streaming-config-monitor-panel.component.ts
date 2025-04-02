import {Component} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {TooltipComponent} from "../../../../shared/addons/tooltip/tooltip.component";
import {undoable} from "@/app/services/pop-ups/undo-popup-service/undoable-decorator";
import {ICListenStreamingConfig} from "@/app/global-interfaces/nodes/PamModules";
import {
  MutableNodeMonitorPanelComponent
} from "@/app/components/node-monitor-panel/node-monitor-panel-component.directive";


@Component({
  selector: 'app-iclisten-streaming-config-monitor-panel',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    TooltipComponent,
    TranslateModule
  ],
  templateUrl: './iclisten-streaming-config-monitor-panel.component.html',
  styleUrls: ['../../../node-config.component.css']
})
export class ICListenStreamingConfigMonitorPanelComponent extends MutableNodeMonitorPanelComponent<{
  streamingConfig: ICListenStreamingConfig
}> {
  waveformSampleRates = [1000, 2000, 4000, 8000, 16000, 32000, 64000, 128000, 256000, 512000];
  spectrumSampleRates = [1000, 2000, 4000, 8000, 16000, 32000, 64000, 128000, 256000, 512000];
  bitDepths = [16, 24, 32];
  wavProcessingTypes = [
    {value: 0, label: 'None'},
    {value: 1, label: 'Teager-Kaiser'}
  ];

  fftProcessingTypes = [
    {value: 0, label: 'None'},
    {value: 1, label: 'Magnitude-Calculation'}
  ];

  showTooltip: { [key: string]: boolean } = {};
  private tooltipTimers: { [key: string]: any } = {};

  getTitle(): string {
    return "iclisten-iclisten-streaming-config-monitor-panel";
  }

  constructor() {
    super();
  }

  onMouseEnter(field: string) {
    this.tooltipTimers[field] = setTimeout(() => {
      this.showTooltip[field] = true;
    }, 1000);
  }

  onMouseLeave(field: string) {
    clearTimeout(this.tooltipTimers[field]);
    this.showTooltip[field] = false;
  }

  @undoable(2000)
  applySettings() {
    console.log('Applying settings:', {
      waveformConfig: this.data.streamingConfig.wav,
      spectrumConfig: this.data.streamingConfig.fft
    });

  }

  isDurationOrPeriodValid(duration: number) {
    // Duration must be between 0 and 65535
    return duration >= 0 && duration <= 65535;
  }


  protected readonly console = console;
}
