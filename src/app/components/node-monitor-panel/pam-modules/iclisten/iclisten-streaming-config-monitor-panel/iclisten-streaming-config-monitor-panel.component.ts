// iclisten-streaming-config-monitor-panel.component.ts (updated)
import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgForOf} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {TooltipComponent} from '../../../../shared/addons/tooltip/tooltip.component';
import {ICListenStreamingConfig} from '@/app/global-interfaces/nodes/PamModules';

import {
  EmitChangesAfter,
  MutableNodeMonitorPanelComponent
} from '@/app/components/node-monitor-panel/node-monitor-panel-component.directive';

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
    { value: 0, label: 'None' },
    { value: 1, label: 'Teager-Kaiser' }
  ];
  fftProcessingTypes = [
    { value: 0, label: 'None' },
    { value: 1, label: 'Magnitude-Calculation' }
  ];

  showTooltip: { [key: string]: boolean } = {};
  private tooltipTimers: { [key: string]: any } = {};

  constructor() {
    super();
  }

  getTitle(): string {
    return 'iclisten-iclisten-streaming-config-monitor-panel';
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

  isDurationOrPeriodValid(duration: number) {
    return duration >= 0 && duration <= 65535;
  }

  @EmitChangesAfter(self => self.emitChange(self.data))
  setRecordWaveform(value: boolean) {
    this.data.streamingConfig.wav.recordWaveform = value;
  }

  @EmitChangesAfter(self => self.emitChange(self.data))
  setProcessWaveform(value: boolean) {
    this.data.streamingConfig.wav.processWaveform = value;
  }

  @EmitChangesAfter(self => self.emitChange(self.data))
  setWaveformProcessingType(value: number) {
    this.data.streamingConfig.wav.waveformProcessingType = value;
  }

  @EmitChangesAfter(self => self.emitChange(self.data))
  setWaveformInterval(value: number) {
    this.data.streamingConfig.wav.waveformInterval = value;
  }

  @EmitChangesAfter(self => self.emitChange(self.data))
  setWaveformDuration(value: number) {
    this.data.streamingConfig.wav.waveformDuration = value;
  }

  @EmitChangesAfter(self => self.emitChange(self.data))
  setRecordFFT(value: boolean) {
    this.data.streamingConfig.fft.recordFFT = value;
  }

  @EmitChangesAfter(self => self.emitChange(self.data))
  setProcessFFT(value: boolean) {
    this.data.streamingConfig.fft.processFFT = value;
  }

  @EmitChangesAfter(self => self.emitChange(self.data))
  setFFTProcessingType(value: number) {
    this.data.streamingConfig.fft.fftProcessingType = value;
  }

  @EmitChangesAfter(self => self.emitChange(self.data))
  setFFTInterval(value: number) {
    this.data.streamingConfig.fft.fftInterval = value;
  }

  @EmitChangesAfter(self => self.emitChange(self.data))
  setFFTDuration(value: number) {
    this.data.streamingConfig.fft.fftDuration = value;
  }

  protected readonly console = console;
}
