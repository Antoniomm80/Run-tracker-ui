console.log(`Loading ${import.meta.env.PROD} config...`);

export const SERVER_URL = import.meta.env.PROD ? 'http://black-pearl.local' : 'http://devpi.local:4000';
export const APP_PATH = import.meta.env.PROD ? '/tracks-app' : ''; 