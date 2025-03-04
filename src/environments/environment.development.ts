const debug_environment = {
  production: false,
  apiUrl: 'http://localhost:8000',
  apiVersion: 'api/v1',
  webSocketUrl: 'ws://localhost:8000'
};

console.warn("This is a development build. The environment variables are: ", debug_environment);

export const environment = debug_environment;
