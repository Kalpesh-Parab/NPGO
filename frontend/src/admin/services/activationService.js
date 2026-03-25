import API from './api';

export const toggleCountry = (code, isActive) =>
  API.patch(`/countries/toggle/${code}`, { isActive });

export const toggleDestination = (code, isActive) =>
  API.patch(`/destinations/toggle/${code}`, { isActive });

export const getCountries = () => API.get('/countries');

export const getDestinationsByCountry = (code) =>
  API.get(`/destinations/country/${code}`);

// upload file
export const uploadFile = (formData) => API.post('/upload', formData);

// update destination media
export const updateDestinationMedia = (code, data) =>
  API.patch(`/destinations/media/${code}`, data);

// update country media
export const updateCountryMedia = (code, data) =>
  API.patch(`/countries/media/${code}`, data);

export const deleteDestinationMedia = (code) =>
  API.patch(`/destinations/delete-media/${code}`);