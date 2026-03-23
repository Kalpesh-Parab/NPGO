import Event from '../models/Event.js';
import Country from '../models/Country.js';
import Destination from '../models/Destination.js';

// 🔧 SLUG GENERATOR
const slugify = (text) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

// ✅ CREATE PACKAGE
export const createEvent = async (req, res) => {
  try {
    const data = req.body;

    const country = await Country.findById(data.country);
    if (!country) {
      return res.status(404).json({ message: 'Country not found' });
    }

    if (country.type === 'domestic') {
      if (!data.destination) {
        return res.status(400).json({
          message: 'Destination is required for domestic events',
        });
      }
    } else {
      data.destination = null;
    }

    data.slug = slugify(data.title);

    const newEvent = new Event(data);
    await newEvent.save();

    res.status(201).json({
      message: 'Event created successfully',
      data: newEvent,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ GET ALL
import mongoose from 'mongoose';

export const getAllEvents = async (req, res) => {
  try {
    const { country, destination, includeInactive } = req.query;

    let filter = {};

    // ✅ Only filter active if NOT admin
    if (includeInactive !== 'true') {
      filter.isActive = true;
    }

    // ✅ Destination filter
    if (destination && destination !== 'undefined' && destination !== 'null') {
      if (!mongoose.Types.ObjectId.isValid(destination)) {
        return res.status(400).json({
          message: 'Invalid destination ID',
        });
      }

      filter.destination = destination;
    }

    // ✅ Country filter
    else if (country && country !== 'undefined' && country !== 'null') {
      if (!mongoose.Types.ObjectId.isValid(country)) {
        return res.status(400).json({
          message: 'Invalid country ID',
        });
      }

      filter.country = country;
    }

    const events = await Event.find(filter)
      .populate('country', 'name code')
      .populate('destination', 'name code');

    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ GET SINGLE (SLUG)
export const getEventBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const pkg = await Event.findOne({ slug, isActive: true })
      .populate('country', 'name code')
      .populate('destination', 'name code');

    if (!pkg) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.status(200).json(pkg);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ UPDATE
export const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    if (data.title) {
      data.slug = slugify(data.title);
    }

    const updated = await Event.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.status(200).json({
      message: 'Event updated successfully',
      data: updated,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ DELETE (HARD)
export const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Event.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.status(200).json({
      message: 'Event deleted permanently',
      data: deleted,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getEventsByLocation = async (req, res) => {
  try {
    const { country, destination } = req.query;

    const events = await Event.find({ isActive: true })
      .populate('country', 'name code')
      .populate('destination', 'name code');

    const normalize = (text) =>
      text
        ?.toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

    const countrySlug = normalize(country);
    const destinationSlug = normalize(destination);

    const filtered = events.filter((pkg) => {
      const pkgCountry = normalize(pkg.country?.name);
      const pkgDestination = normalize(pkg.destination?.name);

      if (destinationSlug) {
        return pkgDestination === destinationSlug;
      }

      if (countrySlug) {
        return pkgCountry === countrySlug;
      }

      return true;
    });

    res.status(200).json(filtered);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
