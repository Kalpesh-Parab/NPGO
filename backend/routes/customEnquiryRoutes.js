import express from 'express';
import {
  createCustomEnquiry,
  getAllCustomEnquiries,
  getCustomEnquiryById,
  updateCustomEnquiryStatus,
} from '../controllers/customEnquiryController.js';

const router = express.Router();

// CREATE
router.post('/', createCustomEnquiry);

// GET ALL
router.get('/', getAllCustomEnquiries);

// GET SINGLE
router.get('/:id', getCustomEnquiryById);

// UPDATE
router.patch('/:id/status', updateCustomEnquiryStatus);
export default router;

