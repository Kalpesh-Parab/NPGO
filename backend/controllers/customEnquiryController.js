import CustomEnquiry from '../models/customEnquiry.js';
import requestIp from 'request-ip';
import geoip from 'geoip-lite';

// 🔥 CREATE
export const createCustomEnquiry = async (req, res) => {
  try {
    const ip = requestIp.getClientIp(req) || 'unknown';
    const geo = geoip.lookup(ip) || {};

    const { day, month, year, ...rest } = req.body;

    // 🧠 Convert to Date
    let travelDate = null;
    if (day && month && year) {
      travelDate = new Date(`${day} ${month} ${year}`);
    }

    const enquiry = await CustomEnquiry.create({
      ...rest,
      travelDate,

      source: {
        page: '/customise',
        from: req.body?.source?.from || null,
        type: req.body?.source?.type || 'custom',
        slug: req.body?.source?.slug || null,
        subSlug: req.body?.source?.subSlug || null,
      },

      location: {
        ip,
        country: geo.country || 'unknown',
        city: geo.city || 'unknown',
      },
    });

    res.status(201).json({
      success: true,
      data: enquiry,
    });
  } catch (error) {
    console.error('Custom Enquiry Error:', error);

    res.status(500).json({
      success: false,
      message: 'Failed to submit enquiry',
    });
  }
};

// 🔥 GET ALL (admin panel)
export const getAllCustomEnquiries = async (req, res) => {
  try {
    const enquiries = await CustomEnquiry.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: enquiries.length,
      data: enquiries,
    });
  } catch (error) {
    res.status(500).json({ success: false });
  }
};

// 🔥 GET SINGLE
export const getCustomEnquiryById = async (req, res) => {
  try {
    const enquiry = await CustomEnquiry.findById(req.params.id);

    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: 'Enquiry not found',
      });
    }

    res.status(200).json({
      success: true,
      data: enquiry,
    });
  } catch (error) {
    res.status(500).json({ success: false });
  }
};

export const updateCustomEnquiryStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!['new', 'checked', 'contacted'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status',
      });
    }

    const enquiry = await CustomEnquiry.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true },
    );

    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: 'Enquiry not found',
      });
    }

    res.status(200).json({
      success: true,
      data: enquiry,
    });
  } catch (error) {
    console.error('Update Custom Enquiry Error:', error);

    res.status(500).json({
      success: false,
      message: 'Failed to update status',
    });
  }
};
