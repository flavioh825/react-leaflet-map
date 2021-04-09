const BASE_URL = 'https://api.mapbox.com/geocoding/v5';
const ACCESS_TOKEN_MAP_BOX = `access_token=${process.env.REACT_APP_ACCESS_TOKEN_MAP_BOX}`

export const getLocal = async (place) => {
  const res = await fetch(`${BASE_URL}/mapbox.places/${place}.json?${ACCESS_TOKEN_MAP_BOX}`)
  let json = await res.json();
  return json;
}