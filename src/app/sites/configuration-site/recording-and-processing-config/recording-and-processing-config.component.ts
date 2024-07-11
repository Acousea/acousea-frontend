import { Component } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { NgForOf } from "@angular/common";
import { TooltipComponent } from '../../../components/tooltip/tooltip.component';

export interface StreamingWaveformConfig {
  sampleRate: number;
  bitDepth: number;
  fileLength: number;
  recording: boolean;
  processing: boolean;
  processingType: string;
  interval: number;
  duration: number;
}

export interface StreamingSpectrumConfig {
  sampleRate: number;
  recording: boolean;
  processing: boolean;
  processingType: string;
  interval: number;
  duration: number;
}

@Component({
  selector: 'app-recording-and-processing-config',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    TooltipComponent
  ],
  templateUrl: './recording-and-processing-config.component.html',
  styleUrls: ['./recording-and-processing-config.component.css']
})
export class RecordingAndProcessingConfigComponent {
  waveformSampleRates = [1000, 2000, 4000, 8000, 16000, 32000, 64000, 128000, 256000, 512000];
  spectrumSampleRates = [1000, 2000, 4000, 8000, 16000, 32000, 64000, 128000, 256000, 512000];
  bitDepths = [16, 24, 32];
  wavProcessingTypes = ['None', 'Teager-Kaiser'];
  fftProcessingTypes = ['None', 'Magnitude-Calculation'];

  waveformConfig: StreamingWaveformConfig = {
    sampleRate: this.waveformSampleRates[0],
    bitDepth: this.bitDepths[0],
    fileLength: 1,
    recording: false,
    processing: false,
    processingType: this.wavProcessingTypes[0],
    interval: 1,
    duration: 1
  };

  spectrumConfig: StreamingSpectrumConfig = {
    sampleRate: this.spectrumSampleRates[0],
    recording: false,
    processing: false,
    processingType: this.fftProcessingTypes[0],
    interval: 1,
    duration: 1
  };

  showTooltip: { [key: string]: boolean } = {};
  private tooltipTimers: { [key: string]: any } = {};

  ngOnInit() {
    this.initializeTooltips();
  }

  initializeTooltips() {}

  onMouseEnter(field: string) {
    this.tooltipTimers[field] = setTimeout(() => {
      this.showTooltip[field] = true;
    }, 1000);
  }

  onMouseLeave(field: string) {
    clearTimeout(this.tooltipTimers[field]);
    this.showTooltip[field] = false;
  }

  applySettings() {
    console.log('Settings applied:', {
      waveformConfig: this.waveformConfig,
      spectrumConfig: this.spectrumConfig
    });
  }

  isValid(duration: number) {
    // Duration must be between 0 and 65535
    return duration >= 0 && duration <= 65535;
  }
}
