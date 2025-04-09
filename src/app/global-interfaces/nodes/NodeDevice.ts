import {ExtModule} from './ExtModules';
import {PamModule} from "./PamModules";

export interface NodeDevice {
  id: string;                // Identificador único del dispositivo
  name: string;              // Nombre del dispositivo
  icon: string;           // URL del icono asociado al dispositivo
  extModules: ExtModule;      // Módulos del dispositivo
  pamModules: PamModule; // Módulos PAM asociados al dispositivo
}
