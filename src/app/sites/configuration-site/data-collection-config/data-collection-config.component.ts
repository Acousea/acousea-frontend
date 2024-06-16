import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-data-collection-config',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf
  ],
  templateUrl: './data-collection-config.component.html',
  styleUrl: './data-collection-config.component.css'
})
export class DataCollectionConfigComponent {
  waveformSampleRates = [1000, 2000, 4000, 8000, 16000, 32000, 64000, 128000, 256000, 512000];
  spectrumSampleRates = [1000, 2000, 4000, 8000, 16000, 32000, 64000, 128000, 256000, 512000];
  loggingModes = [
    { value: 0, label: 'None' },
    { value: 1, label: 'Enabled' },
    { value: 2, label: 'On Epoch Trigger' }
  ];
  bitDepths = [16, 24, 32];
  endiannessOptions = [
    { value: 0, label: 'Big Endian' },
    { value: 1, label: 'Little Endian' }
  ];
  processingModes = ['Mean', 'Mode 2', 'Mode 3']; // Ajusta según sea necesario
  updateRates = ['1/2 sec', '1 sec', '2 sec']; // Ajusta según sea necesario

  selectedWaveformSampleRate = this.waveformSampleRates[0];
  selectedSpectrumSampleRate = this.spectrumSampleRates[0];
  selectedLoggingMode = this.loggingModes[0].value;
  fileLength = 1;
  selectedBitDepth = this.bitDepths[0];
  selectedEndianness = this.endiannessOptions[1].value; // little endian por defecto
  maxLogLength = 1;
  selectedProcessingMode = this.processingModes[0];
  selectedUpdateRate = this.updateRates[0];
  accumulationsPerResult = 500;
  enableDelay = false;

  applySettings() {
    console.log('Settings applied:', {
      selectedWaveformSampleRate: this.selectedWaveformSampleRate,
      selectedSpectrumSampleRate: this.selectedSpectrumSampleRate,
      selectedLoggingMode: this.selectedLoggingMode,
      fileLength: this.fileLength,
      selectedBitDepth: this.selectedBitDepth,
      selectedEndianness: this.selectedEndianness,
      maxLogLength: this.maxLogLength,
      selectedProcessingMode: this.selectedProcessingMode,
      selectedUpdateRate: this.selectedUpdateRate,
      accumulationsPerResult: this.accumulationsPerResult,
      enableDelay: this.enableDelay
    });
  }

}
