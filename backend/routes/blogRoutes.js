import express from 'express';
import {
  createBlog,
  getBlogs,
  getAllBlogsAdmin,
  getSingleBlog,
  updateBlog,
  deleteBlog,
  duplicateBlog
} from '../controllers/blogController.js';

const router = express.Router();

// USER
router.get('/', getBlogs);
router.get('/:id', getSingleBlog);

// ADMIN
router.get('/admin/all', getAllBlogsAdmin);
router.post('/', createBlog);
router.put('/:id', updateBlog);
router.delete('/:id', deleteBlog);

// 🔥 DUPLICATE
router.post('/:id/duplicate', duplicateBlog);

export default router;