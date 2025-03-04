import {ExtModule} from './ExtModules';
import {ICListenHF, pamModuleClasses} from "./PamModules";

export interface NodeDevice {
  id: string;                // Identificador único del dispositivo
  name: string;              // Nombre del dispositivo
  icon: string;           // URL del icono asociado al dispositivo
  operationMode: "LAUNCHING" | "WORKING" | "RECOVERING"; // Modo de operación del dispositivo
  extModules: ExtModule;      // Módulos del dispositivo
  pamModules: ICListenHF[]; // Módulos PAM asociados al dispositivo
}

export class NodeDeviceMapper {

  // Mapea un NodeDevice y procesa sus pamModules
  static mapNodeDevice(nodeData: NodeDevice): NodeDevice {
    return {
      ...nodeData,
      pamModules: nodeData.pamModules.map(NodeDeviceMapper.mapPamModule)
    };
  }

  // Mapea un pamModule a su tipo específico usando pamModuleClasses
  static mapPamModule(moduleData: any): ICListenHF {
    const createModule = pamModuleClasses[moduleData.name];
    if (!createModule) {
      throw new Error(`Unknown PAM Module type: ${moduleData.name}`);
    }
    return createModule(moduleData);
  }
}
