const production_environment = {
  production: true,
  apiUrl: process.env['API_URL'],
  apiVersion: process.env['API_VERSION'],
  webSocketUrl: process.env['WEBSOCKET_URL']
};

console.warn("This is a production build. The environment production are: ", production_environment);

export const environment = production_environment;
