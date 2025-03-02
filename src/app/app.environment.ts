export const debug_environment = {
  production: false,
  apiUrl: 'http://localhost:8000',
  apiVersion: 'api/v1',
  webSocketUrl: 'ws://localhost:8000'
};

export const production_environment = {
  production: true,
  apiUrl: 'http://fedora-vpn-server.duckdns.org:8000',
  apiVersion: 'api/v1',
  webSocketUrl: 'ws://fedora-vpn-server.duckdns.org:8000'
};

export const environment = debug_environment;
