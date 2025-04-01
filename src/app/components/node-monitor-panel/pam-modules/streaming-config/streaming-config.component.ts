import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {TooltipComponent} from "../../../shared/addons/tooltip/tooltip.component";
import {undoable} from "@/app/services/pop-ups/undo-popup-service/undoable-decorator";
import {NodeDevice} from "@/app/global-interfaces/nodes/NodeDevice";
import {pamModuleTypes} from "@/app/global-interfaces/nodes/PamModules";


@Component({
  selector: 'app-streaming-config',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    TooltipComponent,
    TranslateModule
  ],
  templateUrl: './streaming-config.component.html',
  styleUrls: ['../../node-config.component.css']
})
export class StreamingConfigComponent implements OnChanges {
  @Input() selectedNode!: NodeDevice | undefined;
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

  waveformConfig = {
    record_waveform: false,
    process_waveform: false,
    waveform_processing_type: 0,
    waveform_interval: 1,
    waveform_duration: 1
  };

  spectrumConfig = {
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


  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['selectedNode']) {
      return;
    }
    this.selectedNode = changes['selectedNode'].currentValue as NodeDevice;
    if (!this.selectedNode) {
      return;
    }

    const pamDevice = this.selectedNode.pamModules.find(pam => pam.name === pamModuleTypes.ICListenHF);
    if (!pamDevice) {
      return;
    }

    console.log('PAM Device:', pamDevice)

    this.waveformConfig = {
      record_waveform: pamDevice.streamingConfig.wav.recordWaveform,
      process_waveform: pamDevice.streamingConfig.wav.processWaveform,
      waveform_processing_type: pamDevice.streamingConfig.wav.waveformProcessingType,
      waveform_interval: pamDevice.streamingConfig.wav.waveformInterval,
      waveform_duration: pamDevice.streamingConfig.wav.waveformDuration
    };
    this.spectrumConfig = {
      record_fft: pamDevice.streamingConfig.fft.recordFFT,
      process_fft: pamDevice.streamingConfig.fft.processFFT,
      fft_processing_type: pamDevice.streamingConfig.fft.fftProcessingType,
      fft_interval: pamDevice.streamingConfig.fft.fftInterval,
      fft_duration: pamDevice.streamingConfig.fft.fftDuration
    }
  }


  @undoable(2000)
  applySettings() {
    console.log('Applying settings:', {
      waveformConfig: this.waveformConfig,
      spectrumConfig: this.spectrumConfig
    });

  }

  isDurationOrPeriodValid(duration: number) {
    // Duration must be between 0 and 65535
    return duration >= 0 && duration <= 65535;
  }


  protected readonly console = console;
}
