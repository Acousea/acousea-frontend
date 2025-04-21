export interface ICListenHF  {
  id: string;
  name: string;
  serialNumber: string;
  status?: ICListenStatus;
  loggingConfig?: ICListenLoggingConfig;
  streamingConfig?: ICListenStreamingConfig;
  recordingStats?: RecordingStats;
}

// Definiciones de las interfaces de estado y configuraciones específicas de ICListenHF
export interface ICListenStatus {
  unitStatus: number;
  batteryStatus: number;
  batteryPercentage: number;
  temperature: number;
  humidity: number;
  timestamp: string; // Fecha y hora en formato ISO
}

export interface ICListenLoggingConfig {
  wav: {
    gain: number;
    sampleRate: number;
    bitDepth: number;
    loggingMode: number;
    logLength: number;
  }
  fft: {
    processingType: number;
    sampleRate: number;
    fftsAccumulated: number;
    loggingMode: number;
    logLength: number;
  }
  timestamp: string;
}

export interface ICListenStreamingConfig {
  wav: {
    recordWaveform: boolean;
    processWaveform: boolean;
    waveformProcessingType: number;
    waveformInterval: number;
    waveformDuration: number;
  }
  fft: {
    recordFFT: boolean;
    processFFT: boolean;
    fftProcessingType: number;
    fftInterval: number;
    fftDuration: number;
  }
  timestamp: string;
}

export interface RecordingStats {
  epochTime: string;  // Fecha y hora en formato ISO
  numberOfClicks: number;
  recordedMinutes: number;
  numberOfFiles: number;
}

export interface PamModule {
  ICListenHF?: ICListenHF;
}
