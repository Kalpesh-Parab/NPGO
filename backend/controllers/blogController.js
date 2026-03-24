import Blog from '../models/Blog.js';

// ✅ CREATE BLOG
export const createBlog = async (req, res) => {
  try {
    const blog = new Blog(req.body);
    await blog.save();

    res.status(201).json({
      message: 'Blog created successfully',
      data: blog
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ GET ALL BLOGS (USER - ACTIVE ONLY)
export const getBlogs = async (req, res) => {
  try {
    const { page = 1, limit = 9 } = req.query;

    const blogs = await Blog.find({ isActive: true })
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Blog.countDocuments({ isActive: true });

    res.json({
      data: blogs,
      pagination: {
        total,
        page: Number(page),
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ ADMIN - ALL BLOGS
export const getAllBlogsAdmin = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });

    res.json({ data: blogs });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ GET SINGLE BLOG
export const getSingleBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) return res.status(404).json({ message: 'Not found' });

    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ UPDATE BLOG
export const updateBlog = async (req, res) => {
  try {
    const updated = await Blog.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({
      message: 'Blog updated',
      data: updated
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ DELETE BLOG
export const deleteBlog = async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);

    res.json({ message: 'Blog deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ DUPLICATE BLOG 🔥
export const duplicateBlog = async (req, res) => {
  try {
    const original = await Blog.findById(req.params.id);

    if (!original)
      return res.status(404).json({ message: 'Blog not found' });

    const duplicated = new Blog({
      ...original.toObject(),
      _id: undefined,
      title: original.title + ' (Copy)',
      createdAt: new Date(),
      updatedAt: new Date()
    });

    await duplicated.save();

    res.json({
      message: 'Blog duplicated',
      data: duplicated
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};