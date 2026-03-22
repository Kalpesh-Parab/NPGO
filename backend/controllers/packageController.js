import Package from '../models/Package.js';
import Country from '../models/Country.js';
import Destination from '../models/Destination.js';

// 🔧 SLUG GENERATOR
const slugify = (text) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

// ✅ CREATE PACKAGE
export const createPackage = async (req, res) => {
  try {
    const data = req.body;

    const country = await Country.findById(data.country);
    if (!country) {
      return res.status(404).json({ message: 'Country not found' });
    }

    if (country.type === 'domestic') {
      if (!data.destination) {
        return res.status(400).json({
          message: 'Destination is required for domestic packages',
        });
      }
    } else {
      data.destination = null;
    }

    data.slug = slugify(data.title);

    const newPackage = new Package(data);
    await newPackage.save();

    res.status(201).json({
      message: 'Package created successfully',
      data: newPackage,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ GET ALL
import mongoose from 'mongoose';

export const getAllPackages = async (req, res) => {
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

    const packages = await Package.find(filter)
      .populate('country', 'name code')
      .populate('destination', 'name code');

    res.status(200).json(packages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ GET SINGLE (SLUG)
export const getPackageBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const pkg = await Package.findOne({ slug, isActive: true })
      .populate('country', 'name code')
      .populate('destination', 'name code');

    if (!pkg) {
      return res.status(404).json({ message: 'Package not found' });
    }

    res.status(200).json(pkg);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ UPDATE
export const updatePackage = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    if (data.title) {
      data.slug = slugify(data.title);
    }

    const updated = await Package.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return res.status(404).json({ message: 'Package not found' });
    }

    res.status(200).json({
      message: 'Package updated successfully',
      data: updated,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ DELETE (HARD)
export const deletePackage = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Package.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: 'Package not found' });
    }

    res.status(200).json({
      message: 'Package deleted permanently',
      data: deleted,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPackagesByLocation = async (req, res) => {
  try {
    const { country, destination } = req.query;

    const packages = await Package.find({ isActive: true })
      .populate('country', 'name code')
      .populate('destination', 'name code');

    const normalize = (text) =>
      text
        ?.toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

    const countrySlug = normalize(country);
    const destinationSlug = normalize(destination);

    const filtered = packages.filter((pkg) => {
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
