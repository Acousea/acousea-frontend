// iclisten-data-collection-config-monitor-panel.component.ts
import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgForOf} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {ICListenLoggingConfig} from '@/app/global-interfaces/nodes/PamModules';

import {
  EmitChangesAfter,
  MutableNodeMonitorPanelComponent
} from '@/app/components/node-monitor-panel/node-monitor-panel-component.directive';

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
export class ICListenDataCollectionConfigMonitorPanel extends MutableNodeMonitorPanelComponent<{
  loggingConfig: ICListenLoggingConfig
}> {
  waveformSampleRates = [1000, 2000, 4000, 8000, 16000, 32000, 64000, 128000, 256000, 512000];
  spectrumSampleRates = [1000, 2000, 4000, 8000, 16000, 32000, 64000, 128000, 256000, 512000];
  bitDepths = [
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

  constructor() {
    super();
  }

  getTitle(): string {
    return 'iclisten-logging-config';
  }

  @EmitChangesAfter(self => self.emitChange(self.data))
  setWavLoggingMode(value: number) {
    this.data.loggingConfig.wav.loggingMode = value;
  }

  @EmitChangesAfter(self => self.emitChange(self.data))
  setWavSampleRate(value: number) {
    this.data.loggingConfig.wav.sampleRate = value;
  }

  @EmitChangesAfter(self => self.emitChange(self.data))
  setWavLogLength(value: number) {
    this.data.loggingConfig.wav.logLength = value;
  }

  @EmitChangesAfter(self => self.emitChange(self.data))
  setWavGain(value: number) {
    this.data.loggingConfig.wav.gain = value;
  }

  @EmitChangesAfter(self => self.emitChange(self.data))
  setWavBitDepth(value: number) {
    this.data.loggingConfig.wav.bitDepth = value;
  }

  @EmitChangesAfter(self => self.emitChange(self.data))
  setFftLoggingMode(value: number) {
    this.data.loggingConfig.fft.loggingMode = value;
  }

  @EmitChangesAfter(self => self.emitChange(self.data))
  setFftSampleRate(value: number) {
    this.data.loggingConfig.fft.sampleRate = value;
  }

  @EmitChangesAfter(self => self.emitChange(self.data))
  setFftLogLength(value: number) {
    this.data.loggingConfig.fft.logLength = value;
  }

  @EmitChangesAfter(self => self.emitChange(self.data))
  setFftProcessingType(value: any) {
    this.data.loggingConfig.fft.processingType = value;
  }

  @EmitChangesAfter(self => self.emitChange(self.data))
  setFftAccumulations(value: number) {
    this.data.loggingConfig.fft.fftsAccumulated = value;
  }
}
