import {NodeDevice} from "../global-interfaces/nodes/NodeDevice";

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

