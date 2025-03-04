import {environment} from "./app.environment";
import {NodeDevice} from "./global-interfaces/nodes/NodeDevice";

export const AppRoutePaths = {
  fullPath: (path: string) => `/${path}`,
  summary: {
    base: 'summary',
    stats: 'summary/stats',
    info: 'summary/info',
    settings: 'summary/settings',
    statsForNode: (node: NodeDevice) => `summary/stats/${node.id}`,
    infoForNode: (node: NodeDevice) => `summary/info/${node.id}`,
    settingsForNode: (node: NodeDevice) => `summary/settings/${node.id}`
  },
  map: 'map',
  history: {
    base: 'history',
    iridiumMessages: 'history/iridium-messages',
    controlSystem: 'history/control-system',
    pamSystem: 'history/pam-system'
  },
  systemInfo: 'system-info',
  user: {
    base: 'user',
    profile: 'user/profile'
  },
  auth: {
    base: 'auth',
    login: 'auth/login',
    register: {
      base: 'auth/register',
      account: 'auth/register/step1',
      profile: 'auth/register/step2'
    }
  },
  notAvailable: 'not-available',
};

const apiUrl = environment.apiUrl;
const websocketUrl = environment.webSocketUrl;
const apiVersion = environment.apiVersion;

console.log("API URL: ", apiUrl)
console.log("WEBSOCKET URL: ", websocketUrl)
console.log("API VERSION: ", apiVersion)


export const BackendRoutePaths = {
  files: (path: string)  => `${apiUrl}/files/${path}`,
  update: (path: string) => `${path}/update`,
  set: (path: string) => `${path}/set`,
  base: `${apiUrl}/${apiVersion}`,
  pamSystem: {
    pamSystemInfo: `${apiUrl}/${apiVersion}/pam-system/info`,
    latestStats: `${apiUrl}/${apiVersion}/pam-system/latest-stats`,
    streamingConfiguration: `${apiUrl}/${apiVersion}/pam-system/streaming-configuration`,
    controlSystemConfiguration: `${apiUrl}/${apiVersion}/pam-system/control-system-configuration`,
    pamSystemConfiguration: `${apiUrl}/${apiVersion}/pam-system/pam-system-configuration`,
    loggingConfiguration: `${apiUrl}/${apiVersion}/pam-system/logging-configuration`,
  },
  communicationSystem: {
    allStatusInformation: `${apiUrl}/${apiVersion}/communication-system/all-status-information`,
    nodeConfiguration: `${apiUrl}/${apiVersion}/communication-system/node-device`,
    allNodes: `${apiUrl}/${apiVersion}/communication-system/node-device/all`,
    node: (nodeId: string) => `${apiUrl}/${apiVersion}/communication-system/node-device?id=${nodeId}`,

    operationMode: (device: string, operationMode?: number) => `${apiUrl}/${apiVersion}/communication-system/${device.toLowerCase()}/operation-mode/${operationMode}`,
    directCommunicationEnable: (serialId: string) => `${apiUrl}/${apiVersion}/communication-system/direct-communication/activate/${serialId}`,
    directCommunicationDisable: `${apiUrl}/${apiVersion}/communication-system/direct-communication/deactivate`,
    directCommunicationStatus: `${apiUrl}/${apiVersion}/communication-system/direct-communication/status`,
    availableUsbDevices: `${apiUrl}/${apiVersion}/communication-system/available-usb-devices`,
    reportingPeriods: (device: string) => `${apiUrl}/${apiVersion}/communication-system/${device.toLowerCase()}/reporting-periods`,
    location: (device: string) => `${apiUrl}/${apiVersion}/communication-system/${device.toLowerCase()}/location`
  },
  user: {
    base: `${apiUrl}/${apiVersion}/users`,
    profile: `${apiUrl}/${apiVersion}/users/profile`,
    login: `${apiUrl}/${apiVersion}/users/auth/login`,
    register: `${apiUrl}/${apiVersion}/users/auth/register`,
    logout: `${apiUrl}/${apiVersion}/users/auth/logout`,
    validateUsername: (username: string) => `${apiUrl}/${apiVersion}/users/validate-username?username=${username}`,
    validateEmail: (email: string) => `${apiUrl}/${apiVersion}/users/validate-email?email=${email}`,
  },
  systemInfo: `${apiUrl}/${apiVersion}/system-info`,
  requestQueue: {
    flush: `${apiUrl}/${apiVersion}/communication-system/request-queue/flush`
  },
  surfaceFields: {
    latest: (lat: number, lon: number) => `${apiUrl}/${apiVersion}/surface-fields/latest/${lat}/${lon}`
  },
  history: {
    paginatedMessages: (page: number, rowsPerPage: number) => `${apiUrl}/${apiVersion}/rockblock/messages/paginated?page=${page}&rows_per_page=${rowsPerPage}`
  },
  websocket: {
    rockBlockMessages: `${websocketUrl}/${apiVersion}/ws/rockblock/messages`,
    notifications: `${websocketUrl}/${apiVersion}/ws/notifications`
  }
};
