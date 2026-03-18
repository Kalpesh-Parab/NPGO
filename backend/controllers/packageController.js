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
export const getAllPackages = async (req, res) => {
  try {
    const { country, destination } = req.query;

    let filter = { isActive: true };

    if (destination) {
      filter.destination = destination;
    }

    if (country && !destination) {
      filter.country = country;
    }

    const packages = await Package.find(filter)
      .populate('country', 'name')
      .populate('destination', 'name');

    res.json(packages);
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

// ✅ DELETE (SOFT)
export const deletePackage = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Package.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true },
    );

    if (!deleted) {
      return res.status(404).json({ message: 'Package not found' });
    }

    res.status(200).json({ message: 'Package deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
