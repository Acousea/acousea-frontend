import {
  ICListenHF,
  ICListenLoggingConfig,
  ICListenStatus,
  ICListenStreamingConfig, RecordingStats
} from "@/app/global-interfaces/nodes/PamModules";

export class RTCModule {
  static moduleName = "rtc";
  currentTime!: string; // ISO string
}

export class BatteryModule {
  static moduleName = "battery";
  batteryPercentage!: number;
  batteryStatus!: number; // charging / discharging, etc.
}

export class LocationModule {
  static moduleName = "location";
  latitude!: number;
  longitude!: number;
}

export class AmbientModule {
  static moduleName = "ambient";
  temperature!: number;
  humidity!: number;
}

export class StorageModule {
  static moduleName = "storage";
  capacity!: number;
  available!: number;
}

export class OperationModes {
  static moduleName = "operationModes";
  modes!: { [key: number]: string };
  activeOperationModeIdx!: number;
}

export class OperationModesGraph {
  static moduleName = "operationModesGraph";
  graph!: { [key: number]: { targetMode: number; duration: number } };
}

export class ReportingModule {
  static moduleName = "reportingModule";
  reportingPeriodsPerOperationModeIdx!: { [operationModeIdx: number]: number };
}

export class LoraReportingModule extends ReportingModule {
  static override moduleName = "loRaReporting";
}

export class IridiumReportingModule extends ReportingModule {
  static override moduleName = "iridiumReporting";
  imei!: string;
}


// Diccionario para los diferentes módulos de un NodeDevice
export interface ExtModule {
  rtc?: RTCModule;
  battery?: BatteryModule;
  location?: LocationModule;
  ambient?: AmbientModule;
  storage?: StorageModule;
  operationModes?: OperationModes;
  operationModesGraph?: OperationModesGraph;
  loRaReporting?: LoraReportingModule;
  iridiumReporting?: IridiumReportingModule;
}

export type ExtModuleNameType =
  | typeof RTCModule.moduleName
  | typeof BatteryModule.moduleName
  | typeof LocationModule.moduleName
  | typeof AmbientModule.moduleName
  | typeof StorageModule.moduleName
  | typeof OperationModes.moduleName
  | typeof OperationModesGraph.moduleName
  | typeof LoraReportingModule.moduleName
  | typeof IridiumReportingModule.moduleName
  | typeof ICListenHF.moduleName
  | typeof ICListenStatus.moduleName
  | typeof ICListenLoggingConfig.moduleName
  | typeof ICListenStreamingConfig.moduleName
  | typeof RecordingStats.moduleName;


