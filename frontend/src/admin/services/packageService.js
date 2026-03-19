import API from './api';

// 🔹 Get single package
export const getPackageBySlug = (slug) => {
  return API.get(`/packages/${slug}`);
};

// 🔹 Get packages (filter based)
export const getPackages = ({ destinationId, countryId } = {}) => {
  let url = '/packages';

  if (destinationId) {
    url += `?destination=${destinationId}`;
  } else if (countryId) {
    url += `?country=${countryId}`;
  }

  return API.get(url);
};