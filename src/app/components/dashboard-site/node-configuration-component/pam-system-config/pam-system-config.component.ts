import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {NodeDevice} from "@/app/global-interfaces/nodes/NodeDevice";
import {ICListenLoggingConfig, pamModuleTypes} from "@/app/global-interfaces/nodes/PamModules";

@Component({
  selector: 'app-pam-system-config',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    TranslateModule
  ],
  templateUrl: './pam-system-config.component.html',
  styleUrl: '../node-config.component.css'
})
export class PamSystemConfigComponent implements OnChanges {
  @Input() selectedNode!: NodeDevice | undefined;
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

  constructor() {

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


    this.populateForm({
      timestamp: '',
      wav: {
        gain: pamDevice.loggingConfig.wav.gain,
        sampleRate: pamDevice.loggingConfig.wav.sampleRate,
        bitDepth: pamDevice.loggingConfig.wav.bitDepth,
        loggingMode: pamDevice.loggingConfig.wav.loggingMode,
        logLength: pamDevice.loggingConfig.wav.logLength
      },
      fft: {
        processingType: pamDevice.loggingConfig.fft.processingType,
        sampleRate: pamDevice.loggingConfig.fft.sampleRate,
        fftsAccumulated: pamDevice.loggingConfig.fft.fftsAccumulated,
        loggingMode: pamDevice.loggingConfig.fft.loggingMode,
        logLength: pamDevice.loggingConfig.fft.logLength
      }
    });
  }


  populateForm(config: ICListenLoggingConfig) {
    const waveformConfig = config.wav;
    const fftConfig = config.fft;


    this.waveformDataLoggingEnabled = Boolean(waveformConfig.loggingMode);
    this.selectedWaveformSampleRate = waveformConfig.sampleRate;
    this.fileLength = waveformConfig.logLength;
    this.gainDB = waveformConfig.gain;
    this.selectedBitDepth = this.bitDepths.find(bitDepth => bitDepth.value === waveformConfig.bitDepth) || this.bitDepths[0];

    this.spectrumDataLoggingEnabled = Boolean(fftConfig.loggingMode);
    this.selectedSpectrumSampleRate = fftConfig.sampleRate;
    this.maxLogLength = fftConfig.logLength;
    this.selectedProcessingMode = this.FFTProcessingModesOptions.find(mode => mode.value === fftConfig.processingType) || this.FFTProcessingModesOptions[0];
    this.accumulationsPerResult = fftConfig.fftsAccumulated;
  }

  applySettings() {
    console.log("SELECTED BIT DEPTH COPONENT: ", this.selectedBitDepth)
    const waveformConfig = {
      gain: this.gainDB,
      sampleRate: this.selectedWaveformSampleRate,
      bitDepth: this.selectedBitDepth.value,
      loggingMode: Number(this.waveformDataLoggingEnabled),
      logLength: this.fileLength,
    };

    const fftConfig = {
      processingType: this.selectedProcessingMode.value,
      sampleRate: this.selectedSpectrumSampleRate,
      fftsAccumulated: this.accumulationsPerResult,
      loggingMode: Number(this.spectrumDataLoggingEnabled),
      logLength: this.maxLogLength,
    };

    const params: ICListenLoggingConfig = {
      wav: waveformConfig,
      fft: fftConfig,
      timestamp: new Date().toISOString(),
    };

    console.log("SELECTED BIT DEPTH: ", this.selectedBitDepth.value);
  }

  protected readonly console = console;


}
