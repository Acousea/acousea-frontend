// RTCModule - Representa el módulo de reloj en tiempo real
export interface RTCModule {
  currentTime: string;  // Fecha y hora actual en formato ISO (ISO string)
}

// BatteryModule - Representa el módulo de la batería
export interface BatteryModule {
  batteryPercentage: number;        // Nivel de la batería en porcentaje
  batteryStatus: number;       // Estado de la batería (e.g., "charging", "discharging")
}

// LocationModule - Representa el módulo de localización
export interface LocationModule {
  latitude: number;
  longitude: number;
}

// TemperatureModule - Representa el módulo de temperatura
export interface AmbientModule {
  temperature: number;  // Temperatura en grados Celsius
  humidity: number;     // Humedad en porcentaje
}

// StorageModule - Representa el módulo de almacenamiento
export interface StorageModule {
  capacity: number;     // Capacidad total de almacenamiento en MB o GB
  available: number;    // Espacio de almacenamiento disponible
}

export interface OperationModes {
  modes: { [key: number]: string }; // Dictionary of operation mode ID → Name
  activeOperationModeIdx: number; // Active mode index
}

export interface OperationModesGraph {
  graph: { [key: number]: { targetMode: number; duration: number } };
}

// It has a sorted map of key: OperationMode - value: ReportingPeriod
export interface ReportingModule {
  reportingPeriodsPerOperationModeIdx: { [operationModeIdx: number]: number }; // Updated to use a Map-like object
}

// LoraReportingModule.ts
export interface LoraReportingModule extends ReportingModule {
}

// IridiumReportingModule.ts
export interface IridiumReportingModule extends ReportingModule {
  imei: string;
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

