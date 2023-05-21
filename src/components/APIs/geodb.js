export const GEODB_URL = 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities';
export const GEODB_OPTIONS = {
  method: 'GET',
  headers: {
      'X-RapidAPI-Key': `${import.meta.env.VITE_GEODB_API_KEY}`,
      'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
  }
};