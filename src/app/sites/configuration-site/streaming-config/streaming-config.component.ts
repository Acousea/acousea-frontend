import {Component, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";
import {TooltipComponent} from '../../../components/tooltip/tooltip.component';
import {
  StreamingConfigResponse,
  StreamingConfigService,
  StreamingSpectrumConfig,
  StreamingWaveformConfig
} from "../../../services/streaming-config-service/streaming-config.service";
import {UpdateInfoButtonComponent} from "../../../components/update-info-button/update-info-button.component";
import {undoable} from "../../../services/pop-ups-services/undo-popup-service/undoable-decorator";


@Component({
  selector: 'app-streaming',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    TooltipComponent,
    UpdateInfoButtonComponent
  ],
  templateUrl: './streaming-config.component.html',
  styleUrls: ['./streaming-config.component.css']
})
export class StreamingConfigComponent implements OnInit {
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

  waveformConfig: StreamingWaveformConfig = {
    record_waveform: false,
    process_waveform: false,
    waveform_processing_type: 0,
    waveform_interval: 1,
    waveform_duration: 1
  };

  spectrumConfig: StreamingSpectrumConfig = {
    record_fft: false,
    process_fft: false,
    fft_processing_type: 0,
    fft_interval: 1,
    fft_duration: 1
  };

  showTooltip: { [key: string]: boolean } = {};
  private tooltipTimers: { [key: string]: any } = {};

  onMouseEnter(field: string) {
    this.tooltipTimers[field] = setTimeout(() => {
      this.showTooltip[field] = true;
    }, 1000);
  }

  onMouseLeave(field: string) {
    clearTimeout(this.tooltipTimers[field]);
    this.showTooltip[field] = false;
  }

  constructor(protected configService: StreamingConfigService) {
  }

  ngOnInit() {
    this.loadConfig();
  }

  @undoable(3000)
  applySettings() {
    console.log('Applying settings:', {
      waveformConfig: this.waveformConfig,
      spectrumConfig: this.spectrumConfig
    });

    this.configService.setConfig(this.waveformConfig, this.spectrumConfig).subscribe({
      next: (response) => {
        if (response.success) {
          console.log('Settings applied successfully:', response.success);
        }
      },
      error: (err) => {
        console.error('Error applying settings:', err);
      }
    });
  }

  isDurationOrPeriodValid(duration: number) {
    // Duration must be between 0 and 65535
    return duration >= 0 && duration <= 65535;
  }

  private loadConfig() {
    this.configService.getConfig().subscribe({
      next: (config: StreamingConfigResponse) => {
        this.waveformConfig = {
          record_waveform: config.waveform_config.record_waveform,
          process_waveform: config.waveform_config.process_waveform,
          waveform_processing_type: config.waveform_config.waveform_processing_type,
          waveform_interval: config.waveform_config.waveform_interval,
          waveform_duration: config.waveform_config.waveform_duration
        };

        this.spectrumConfig = {
          record_fft: config.fft_config.record_fft,
          process_fft: config.fft_config.process_fft,
          fft_processing_type: config.fft_config.fft_processing_type,
          fft_interval: config.fft_config.fft_interval,
          fft_duration: config.fft_config.fft_duration
        };
      },
      error: (err) => {
        console.error('Error loading config:', err);
      }
    });

  }

  protected readonly console = console;
}
