import {Component, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";
import {UpdateInfoButtonComponent} from "@/app/components/update-info-button/update-info-button.component";
import {
  LoggingConfigService,
  PAMDeviceFFTLoggingConfig,
  PAMDeviceLoggingConfigReadModel,
  PAMDeviceWaveformLoggingConfig
} from "@/app/services/logging-config-service/logging-config.service";

@Component({
    selector: 'app-data-collection-config',
    imports: [
        FormsModule,
        NgForOf,
        UpdateInfoButtonComponent
    ],
    templateUrl: './pam-system-config.component.html',
    styleUrl: './pam-system-config.component.css'
})
export class PamSystemConfigComponent implements OnInit {
  waveformSampleRates = [1000, 2000, 4000, 8000, 16000, 32000, 64000, 128000, 256000, 512000];
  spectrumSampleRates = [1000, 2000, 4000, 8000, 16000, 32000, 64000, 128000, 256000, 512000];
  bitDepths = [ // 16, 24, 32
    { label: '16', value: 2 },
    { label: '24', value: 3 },
    { label: '32', value: 4 }
  ];
  FFTProcessingModesOptions = [
    { label: 'Mean Average', value: 4 },
    { label: 'Peak Detect', value: 5 },
    { label: 'Exponential Moving Average', value: 6 }
  ];
  gainsDB = [0, 6, 12, 18, 24, 30, 36, 42, 48];

  waveformDataLoggingEnabled: boolean = false;
  spectrumDataLoggingEnabled: boolean = false;
  selectedWaveformSampleRate = this.waveformSampleRates[0];
  selectedSpectrumSampleRate = this.spectrumSampleRates[0];
  fileLength = 1;
  selectedBitDepth = this.bitDepths[0];
  maxLogLength = 1;
  selectedProcessingMode = this.FFTProcessingModesOptions[0];
  accumulationsPerResult = 500;
  gainDB: number = 0;

  constructor(protected loggingConfigService: LoggingConfigService) {}

  ngOnInit() {
    this.fetchLoggingConfig();
  }

  fetchLoggingConfig() {
    this.loggingConfigService.getLoggingConfig().subscribe(response => {
      if (response) {
        this.populateForm(response);
      } else {
        console.error('Error loading logging config');
      }
    });
  }

  populateForm(config: PAMDeviceLoggingConfigReadModel) {
    const waveformConfig = config.waveform_config;
    const fftConfig = config.fft_config;

    this.waveformDataLoggingEnabled = waveformConfig.logging_mode;
    this.selectedWaveformSampleRate = waveformConfig.sample_rate;
    this.fileLength = waveformConfig.log_length;
    this.gainDB = waveformConfig.gain;
    this.selectedBitDepth = this.bitDepths.find(bitDepth => bitDepth.value === waveformConfig.bit_depth) || this.bitDepths[0];

    this.spectrumDataLoggingEnabled = fftConfig.logging_mode;
    this.selectedSpectrumSampleRate = fftConfig.sample_rate;
    this.maxLogLength = fftConfig.log_length;
    this.selectedProcessingMode = this.FFTProcessingModesOptions.find(mode => mode.value === fftConfig.fft_processing_type) || this.FFTProcessingModesOptions[0];
    this.accumulationsPerResult = fftConfig.ffts_accumulated;
  }

  applySettings() {
    const waveformConfig: PAMDeviceWaveformLoggingConfig = {
      gain: this.gainDB,
      sample_rate: this.selectedWaveformSampleRate,
      bit_depth: this.selectedBitDepth.value,
      logging_mode: this.waveformDataLoggingEnabled,
      log_length: this.fileLength,
    };

    const fftConfig: PAMDeviceFFTLoggingConfig = {
      sample_rate: this.selectedSpectrumSampleRate,
      fft_processing_type: this.selectedProcessingMode.value,
      ffts_accumulated: this.accumulationsPerResult,
      logging_mode: this.spectrumDataLoggingEnabled,
      log_length: this.maxLogLength,
    };

    const params: PAMDeviceLoggingConfigReadModel = {
      timestamp: new Date().toISOString(),
      waveform_config: waveformConfig,
      fft_config: fftConfig
    };

    this.loggingConfigService.setLoggingConfig(params).subscribe(response => {
      if (response.success) {
        console.log('Settings applied successfully:', response.success.message);
      } else {
        console.error('Error applying settings:', response.error?.error_message);
      }
    });
  }

  protected readonly console = console;


}
