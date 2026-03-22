import Contact from '../models/Contact.js';
import requestIp from 'request-ip';
import geoip from 'geoip-lite';

export const createContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // 🔥 Basic validation
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Required fields missing',
      });
    }

    // 🌐 IP + Geo
    const ip = requestIp.getClientIp(req) || 'unknown';
    const geo = geoip.lookup(ip) || {};

    const contactData = {
      ...req.body,
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