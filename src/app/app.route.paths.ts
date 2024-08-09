import {environment} from "./app.environment";

export const AppRoutePaths = {
  fullPath: (path: string) => `/${path}`,
  summary: 'summary',
  map: 'map',
  history: {
    base: 'history',
    iridiumMessages: 'history/iridium-messages',
    controlSystem: 'history/control-system',
    pamSystem: 'history/pam-system'
  },
  configuration: {
    base: 'configuration',
    streaming: 'configuration/streaming',
    controlSystem: 'configuration/control-system',
    pamSystem: 'configuration/pam-system'
  },
  systemInfo: 'system-info',
  user: {
    base: 'user',
    profile: 'user/profile'
  },
  auth: {
    base: 'auth',
    login: 'auth/login',
    register: 'auth/register'
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
    operationMode: (device: string, operationMode?: number) => `${apiUrl}/${apiVersion}/communication-system/${device.toLowerCase()}/operation-mode/${operationMode}`,
    directCommunicationEnable: (serialId: string) => `${apiUrl}/${apiVersion}/communication-system/direct-communication/activate/${serialId}`,
    directCommunicationDisable: `${apiUrl}/${apiVersion}/communication-system/direct-communication/deactivate`,
    directCommunicationStatus: `${apiUrl}/${apiVersion}/communication-system/direct-communication/status`,
    availableUsbDevices: `${apiUrl}/${apiVersion}/communication-system/available-usb-devices`,
    reportingPeriods: (device: string) => `${apiUrl}/${apiVersion}/communication-system/${device.toLowerCase()}/reporting-periods`,
    location: (device: string) => `${apiUrl}/${apiVersion}/communication-system/${device.toLowerCase()}/location`
  },
  user: {
    base: `${apiUrl}/${apiVersion}/user`,
    profile: `${apiUrl}/${apiVersion}/user/profile`,
    login: `${apiUrl}/${apiVersion}/user/login`,
    register: `${apiUrl}/${apiVersion}/user/register`,
    logout: `${apiUrl}/${apiVersion}/user/logout`
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
