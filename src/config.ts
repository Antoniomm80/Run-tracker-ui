console.log(`Loading ${import.meta.env.PROD} config...`);

export const SERVER_URL = import.meta.env.PROD ? 'http://controlplane.local/run-tracker/api/v1' : 'http://localhost:3000';
export const APP_PATH = import.meta.env.PROD ? '/tracks-app' : ''; 