export interface PAMDeviceStatus {
  unit_status: number;
  battery_status: number;
  battery_percentage: number;
  temperature: number;
  humidity: number;
  storage: {
    total: number;
    free: number;
  };
}
export interface CommunicationSystemStatus {
  latitude: number;
  longitude: number;
  battery_percentage: number;
  battery_status: number;
  temperature: number;
  humidity: number;
  storage: {
    total: number;
    free: number;
  };
}

export interface SystemStatusInformation {
  last_updated_date: string;
  pam_device_status: PAMDeviceStatus;
  communication_system_status: CommunicationSystemStatus;
}
