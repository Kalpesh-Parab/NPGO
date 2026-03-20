import API from './api';

export const toggleCountry = (code, isActive) =>
  API.patch(`/countries/toggle/${code}`, { isActive });

export const toggleDestination = (code, isActive) =>
  API.patch(`/destinations/toggle/${code}`, { isActive });

export const getCountries = () => API.get('/countries');

export const getDestinationsByCountry = (code) =>
  API.get(`/destinations/country/${code}`);
