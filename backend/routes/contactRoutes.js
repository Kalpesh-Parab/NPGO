import express from 'express';
import {
  createContact,
  getAllContacts,
  getContactById,
  deleteContact,
  updateContactStatus,
} from '../controllers/contactController.js';

const router = express.Router();

// CREATE
router.post('/', createContact);

// GET ALL
router.get('/', getAllContacts);

// GET SINGLE
router.get('/:id', getContactById);

// DELETE
router.delete('/:id', deleteContact);

// UPDATE
router.patch('/:id/status', updateContactStatus);

export default router;
