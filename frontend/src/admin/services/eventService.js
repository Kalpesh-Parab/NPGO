import API from './api';

export const getAllEvents = () => API.get('/events');

export const getEventBySlug = (slug) => API.get(`/events/${slug}`);
