import {ExtModule} from './ExtModules';
import {ICListenHF, PamModule, pamModuleClasses} from "./PamModules";

export interface NodeDevice {
  id: string;                // Identificador único del dispositivo
  name: string;              // Nombre del dispositivo
  icon: string;           // URL del icono asociado al dispositivo
  extModules: ExtModule;      // Módulos del dispositivo
  pamModules: PamModule; // Módulos PAM asociados al dispositivo
}

export class NodeDeviceMapper {

  // Mapea un NodeDevice y procesa sus pamModules
  static mapNodeDevice(nodeData: NodeDevice): NodeDevice {
    return {
      ...nodeData
    };
  }
}
