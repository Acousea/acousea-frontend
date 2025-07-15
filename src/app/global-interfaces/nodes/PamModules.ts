export class ICListenHF {
  static moduleName = "ICListenHF";
  id!: string;
  name!: string;
  serialNumber!: string;
  status?: ICListenStatus;
  loggingConfig?: ICListenLoggingConfig;
  streamingConfig?: ICListenStreamingConfig;
  recordingStats?: ICListenRecordingStats;
}


export class ICListenStatus {
  static moduleName = "ICListenStatus";
  unitStatus!: number;
  batteryStatus!: number;
  batteryPercentage!: number;
  temperature!: number;
  humidity!: number;
  timestamp!: string; // ISO
}

export class ICListenLoggingConfig {
  static moduleName = "ICListenLoggingConfig";
  wav!: {
    gain: number;
    sampleRate: number;
    bitDepth: number;
    loggingMode: number;
    logLength: number;
  };
  fft!: {
    processingType: number;
    sampleRate: number;
    fftsAccumulated: number;
    loggingMode: number;
    logLength: number;
  };
  timestamp!: string;
}

export class ICListenStreamingConfig {
  static moduleName = "ICListenStreamingConfig";
  wav!: {
    recordWaveform: boolean;
    processWaveform: boolean;
    waveformProcessingType: number;
    waveformInterval: number;
    waveformDuration: number;
  };
  fft!: {
    recordFFT: boolean;
    processFFT: boolean;
    fftProcessingType: number;
    fftInterval: number;
    fftDuration: number;
  };
  timestamp!: string;
}

export class ICListenRecordingStats {
  static moduleName = "ICListenRecordingStats";
  epochTime!: string;  // ISO
  numberOfClicks!: number;
  recordedMinutes!: number;
  numberOfFiles!: number;
}

export interface PamModule {
  ICListenHF?: ICListenHF;
}

