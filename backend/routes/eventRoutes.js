import express from 'express';

import {
  createEvent,
  getAllEvents,
  getEventBySlug,
  updateEvent,
  deleteEvent,
} from '../controllers/eventController.js';

const router = express.Router();

router.post('/', createEvent);
router.get('/', getAllEvents);
router.get('/:slug', getEventBySlug);
router.put('/:id', updateEvent);
router.delete('/:id', deleteEvent);

export default router;
