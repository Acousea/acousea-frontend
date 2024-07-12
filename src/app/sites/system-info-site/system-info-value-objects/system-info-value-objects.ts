export interface PAMDeviceStatus {
  unit_status: number;
  battery_status: number;
  battery_percentage: number;
  temperature: number;
  humidity: number;
}
export interface CommunicationSystemStatus {
  timestamp: string;
  epoch_time: string;
  latitude: number;
  longitude: number;
  battery_percentage: number;
  battery_status: number;
  temperature: number;
  operation_mode: number;
  storage: {
    total: number;
    used: number;
  };
}

export interface SystemStatusInformation {
  last_updated_date: string;
  pam_device_status: PAMDeviceStatus;
  communication_system_status: CommunicationSystemStatus;
}
