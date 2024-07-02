export interface DeviceStatus {
  unit_status: string;
  battery_status: string;
  unit_time: string;
  system_time_status: string;
  temperature: string;
  humidity: string;
  hydrophone_sensitivity: string;
}

export interface RecordingStatus {
  record_wav: string;
  wav_sample_rate: string;
  record_fft: string;
  fft_sample_rate: string;
}

export interface About {
  firmware_release: string;
  hardware_release: string;
  ip_address: string;
}

export interface DeviceInfo {
  device_status: DeviceStatus;
  recording_status: RecordingStatus;
  about: About;
}
