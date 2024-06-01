export interface DeviceStatus {
  unitStatus: string;
  battery: string;
  unitTime: string;
  timeSync: string;
  temperature: string;
  humidity: string;
}

export interface RecordingStatus {
  recordWAV: string;
  recordFFT: string;
}

export interface EventStatus {
  noSignalEventInactive: string;
  signalPresentEventInactive: string;
  signalPresentEventActive: string;
  noSignalEventActive: string;
}

export interface About {
  firmwareRelease: string;
  hardwareRelease: string;
  ipAddress: string;
  macAddress: string;
  hydrophoneSensitivity: string;
  memoryCapacity: string;
}

export interface DeviceInfo {
  deviceStatus: DeviceStatus;
  recordingStatus: RecordingStatus;
  eventStatus: EventStatus;
  epochs: number[];
  tilt: string;
  about: About;
}
