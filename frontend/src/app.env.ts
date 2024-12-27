export const APP_BACKEND_URL = import.meta.env.NODE_ENV === 'production' ? import.meta.env.APP_BACKEND_URL : 'http://localhost:3000';
export const MAX_CLIMATIC_SAMPLES = 10;
export const MAX_PRODUCTION_SAMPLES = 10;
export const DEFAULT_CULTIVATION_TYPE = 'MAIZE';