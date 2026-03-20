import './activationZone.scss';
import { useEffect, useState } from 'react';
import {
  getCountries,
  getDestinationsByCountry,
  toggleCountry,
  toggleDestination,
} from '../../services/activationService';
import { toast } from 'sonner';

import ToggleSwitch from './components/ToggleSwitch';
import EntityCard from './components/EntityCard';

const ActivationZone = () => {
  const [mode, setMode] = useState('domestic'); // domestic | international
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageTitle, setPageTitle] = useState('');

  const titles = [
    'Meri Marzi Zone',
    'Yahan Sab Band Hai',
    'Abhi Mood Nahi Hai',
    'Control Room: On/Off Ka Game',
    'Kisko Zinda Rakhein?',
  ];

  useEffect(() => {
    const random = titles[Math.floor(Math.random() * titles.length)];
    setPageTitle(random);
  }, []);
  // 🔥 Fetch all countries
  const fetchCountries = async () => {
    try {
      setLoading(true);
      const res = await getCountries();
      setCountries(res.data.data);
    } catch (err) {
      toast.error('Failed to fetch countries');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  // 🔥 Filter based on mode
  const filteredCountries = countries.filter((c) => c.type === mode);

  // 🔥 Handle country click
  const handleCountryClick = async (country) => {
    setSelectedCountry(country);

    if (country.type === 'domestic') {
      try {
        const res = await getDestinationsByCountry(country.code);
        setDestinations(res.data.data);
      } catch {
        toast.error('Failed to fetch destinations');
      }
    }
  };

  // 🔥 Toggle country
  const handleCountryToggle = async (country) => {
    try {
      await toggleCountry(country.code, !country.isActive);

      toast.success(
        `${country.name} ${country.isActive ? 'deactivated' : 'activated'}`,
      );

      fetchCountries();
      setSelectedCountry(null);
      setDestinations([]);
    } catch {
      toast.error('Failed to update country');
    }
  };

  // 🔥 Toggle destination
  const handleDestinationToggle = async (destination) => {
    try {
      await toggleDestination(destination.code, !destination.isActive);

      toast.success(
        `${destination.name} ${
          destination.isActive ? 'deactivated' : 'activated'
        }`,
      );

      // refresh destinations
      const res = await getDestinationsByCountry(selectedCountry.code);
      setDestinations(res.data.data);
    } catch {
      toast.error('Failed to update destination');
    }
  };
  return (
    <div className='activation-zone'>
      {/* 🔥 HEADER */}
      <div className='header'>
        <h1>{pageTitle}</h1>

        <ToggleSwitch mode={mode} setMode={setMode} />
      </div>

      {/* 🔥 BODY */}
      <div className='content'>
        {/* LEFT: Countries */}
        <div className='panel'>
          <h2>{mode === 'domestic' ? 'States (India)' : 'Countries'}</h2>

          <div className='grid'>
            {filteredCountries.map((country) => (
              <EntityCard
                key={country._id}
                item={country}
                mapType={mode === 'international' ? 'world' : 'india'} // 🔥 FIX
                onClick={() => handleCountryClick(country)}
                onToggle={() => handleCountryToggle(country)}
                isSelected={selectedCountry?._id === country._id}
              />
            ))}
          </div>
        </div>

        {/* RIGHT: Destinations */}
        {mode === 'domestic' && selectedCountry && (
          <div className='panel'>
            <h2>{selectedCountry.name} Destinations</h2>

            <div className='grid'>
              {destinations.map((dest) => (
                <EntityCard
  key={dest._id}
  item={dest}
  mapType="india" // 🔥 always india for states
  isParentActive={selectedCountry?.isActive}
  onToggle={() => handleDestinationToggle(dest)}
/>
              ))}
            </div>
          </div>
        )}
      </div>

      {loading && <p className='loading'>Loading...</p>}
    </div>
  );
};

export default ActivationZone;
