import express from 'express';
import {
  createMerch,
  getAllMerch,
  getAllMerchAdmin,
  getMerchById,
  updateMerch,
  deleteMerch,
} from '../controllers/merchController.js';

const router = express.Router();

// 👤 USER
router.get('/', getAllMerch);

// 👨‍💼 ADMIN
router.get('/admin/all', getAllMerchAdmin);

// CRUD
router.post('/', createMerch);
router.get('/:id', getMerchById);
router.put('/:id', updateMerch);
router.delete('/:id', deleteMerch);

export default router;
