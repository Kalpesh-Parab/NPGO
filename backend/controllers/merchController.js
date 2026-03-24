import Merchandise from '../models/Merchandise.js';

// ➕ CREATE
export const createMerch = async (req, res) => {
  try {
    const merch = new Merchandise(req.body);
    const saved = await merch.save();

    res.status(201).json({
      success: true,
      data: saved,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating merchandise',
      error: error.message,
    });
  }
};

// 📥 GET ALL (with pagination)
export const getAllMerch = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 12;

    const merch = await Merchandise.find({ isActive: true })
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await Merchandise.countDocuments({ isActive: true });

    res.status(200).json({
      success: true,
      data: merch,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching merchandise',
      error: error.message,
    });
  }
};

// 🔍 GET SINGLE
export const getMerchById = async (req, res) => {
  try {
    const merch = await Merchandise.findById(req.params.id);

    if (!merch) {
      return res.status(404).json({
        success: false,
        message: 'Merchandise not found',
      });
    }

    res.status(200).json({
      success: true,
      data: merch,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching merchandise',
      error: error.message,
    });
  }
};

// ✏️ UPDATE
export const updateMerch = async (req, res) => {
  try {
    const updated = await Merchandise.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'Merchandise not found',
      });
    }

    res.status(200).json({
      success: true,
      data: updated,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating merchandise',
      error: error.message,
    });
  }
};

// ❌ DELETE (soft delete)
export const deleteMerch = async (req, res) => {
  try {
    const deleted = await Merchandise.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Merchandise not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Merchandise permanently deleted',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting merchandise',
      error: error.message,
    });
  }
};

export const getAllMerchAdmin = async (req, res) => {
  try {
    const { page = 1, limit = 12 } = req.query;

    const merch = await Merchandise.find() // 🔥 no filter
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Merchandise.countDocuments();

    res.status(200).json({
      success: true,
      data: merch,
      pagination: {
        total,
        page: Number(page),
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching admin merchandise',
      error: error.message,
    });
  }
};
