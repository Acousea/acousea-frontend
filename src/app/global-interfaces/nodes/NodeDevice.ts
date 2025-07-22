import {SerializableModules} from './ExtModules';

export interface NodeDevice {
  id: string;                // Identificador único del dispositivo
  name: string;              // Nombre del dispositivo
  icon: string;           // URL del icono asociado al dispositivo
  modules: SerializableModules;      // Módulos del dispositivo
}
