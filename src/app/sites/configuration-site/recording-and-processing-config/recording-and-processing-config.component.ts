import {Component} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";
import {TooltipComponent} from '../../../components/tooltip/tooltip.component';

@Component({
  selector: 'app-recording-and-processing-config',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    TooltipComponent
  ],
  templateUrl: './recording-and-processing-config.component.html',
  styleUrl: './recording-and-processing-config.component.css'
})
export class RecordingAndProcessingConfigComponent {
  waveformSampleRates = [1000, 2000, 4000, 8000, 16000, 32000, 64000, 128000, 256000, 512000];
  spectrumSampleRates = [1000, 2000, 4000, 8000, 16000, 32000, 64000, 128000, 256000, 512000];
  bitDepths = [16, 24, 32];
  wavProcessingTypes = ['Type1', 'Type2'];
  fftProcessingTypes = ['Type1', 'Type2'];

  selectedWaveformSampleRate = this.waveformSampleRates[0];
  selectedSpectrumSampleRate = this.spectrumSampleRates[0];
  fileLength = 1;
  selectedBitDepth = this.bitDepths[0];
  recordingWav = false;
  processingWav = false;
  selectedWavProcessingType = this.wavProcessingTypes[0];
  wavInterval = 1;
  wavDuration = 1;
  recordingFft = false;
  processingFft = false;
  selectedFftProcessingType = this.fftProcessingTypes[0];
  fftInterval = 1;
  fftDuration = 1;

  showTooltip: { [key: string]: boolean } = {};
  private tooltipTimers: { [key: string]: any } = {};

  ngOnInit() {
    this.initializeTooltips();
  }

  initializeTooltips() {
    // this.showTooltip = {
    //   'waveform-frequency': true,
    //   'recording-wav': true,
    //   'processing-wav': true,
    //   'wav-processing-type': true,
    //   'wav-interval': true,
    //   'wav-duration': true,
    //   'spectrum-frequency': true,
    //   'recording-fft': true,
    //   'processing-fft': true,
    //   'fft-processing-type': true,
    //   'fft-interval': true,
    //   'fft-duration': true
    // };
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

  applySettings() {
    console.log('Settings applied:', {
      selectedWaveformSampleRate: this.selectedWaveformSampleRate,
      selectedSpectrumSampleRate: this.selectedSpectrumSampleRate,
      fileLength: this.fileLength,
      selectedBitDepth: this.selectedBitDepth,
      recordingWav: this.recordingWav,
      processingWav: this.processingWav,
      selectedWavProcessingType: this.selectedWavProcessingType,
      wavInterval: this.wavInterval,
      wavDuration: this.wavDuration,
      recordingFft: this.recordingFft,
      processingFft: this.processingFft,
      selectedFftProcessingType: this.selectedFftProcessingType,
      fftInterval: this.fftInterval,
      fftDuration: this.fftDuration,
    });
  }
}
