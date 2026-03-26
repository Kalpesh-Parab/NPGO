import Contact from '../models/Contact.js';
import requestIp from 'request-ip';
import geoip from 'geoip-lite';

// 🔥 CREATE
export const createContact = async (req, res) => {
  try {
    const { name, email, message, source } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Required fields missing',
      });
    }

    const ip = requestIp.getClientIp(req) || 'unknown';
    const geo = geoip.lookup(ip) || {};

    const contactData = {
      name,
      email,
      phone: req.body.phone,
      message,

      // ✅ SAFE SOURCE HANDLING
      source: {
        page: source?.page || 'unknown',
        type: source?.type || 'home',
        slug: source?.slug || null,
        subSlug: source?.subSlug || null,
      },

      location: {
        ip,
        country: geo.country || 'unknown',
        city: geo.city || 'unknown',
      },
    };

    const contact = await Contact.create(contactData);

    return res.status(201).json({
      success: true,
      data: contact,
    });
  } catch (error) {
    console.error('Contact Error:', error);

    return res.status(500).json({
      success: false,
      message: 'Failed to submit enquiry',
    });
  }
};

// 🔥 GET ALL (with pagination)
export const getAllContacts = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const contacts = await Contact.find()
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Contact.countDocuments();

    res.status(200).json({
      success: true,
      count: contacts.length,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
      data: contacts,
    });
  } catch (error) {
    console.error('Get Contacts Error:', error);

    res.status(500).json({
      success: false,
      message: 'Failed to fetch contacts',
    });
  }
};

// 🔥 GET SINGLE
export const getContactById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found',
      });
    }

    res.status(200).json({
      success: true,
      data: contact,
    });
  } catch (error) {
    console.error('Get Contact Error:', error);

    res.status(500).json({
      success: false,
      message: 'Failed to fetch contact',
    });
  }
};

// 🔥 DELETE
export const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Contact deleted successfully',
    });
  } catch (error) {
    console.error('Delete Contact Error:', error);

    res.status(500).json({
      success: false,
      message: 'Failed to delete contact',
    });
  }
};

// 🔥 UPDATE STATUS
export const updateContactStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!['new', 'contacted', 'closed'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status value',
      });
    }

    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true },
    );

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found',
      });
    }

    res.status(200).json({
      success: true,
      data: contact,
    });
  } catch (error) {
    console.error('Update Status Error:', error);

    res.status(500).json({
      success: false,
      message: 'Failed to update status',
    });
  }
};
