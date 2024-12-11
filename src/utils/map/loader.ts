import { Loader } from '@googlemaps/js-api-loader';

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

if (!API_KEY) {
  throw new Error('Google Maps API key is missing in .env file');
}

export const mapLoader = new Loader({
  apiKey: API_KEY,
  version: 'weekly',
  libraries: ['places']
});
