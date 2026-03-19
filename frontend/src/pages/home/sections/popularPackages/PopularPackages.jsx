import './popularPackages.scss';
import arrow from '../../../../assets/arrowWhite.svg';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getPackages } from '../../../../admin/services/packageService';

const PopularPackages = ({ mode = 'random', destinationId }) => {
  const navigate = useNavigate();
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        // ✅ ONLY SERVICE CALL (no manual URL)
        const res = await getPackages({
          destinationId: mode === 'similar' ? destinationId : null,
        });

        let data = res.data.filter((p) => p.isActive);

        // 🔥 RANDOMIZE
        data = data.sort(() => 0.5 - Math.random());

        // 🔥 TAKE ONLY 4
        setPackages(data.slice(0, 4));
      } catch (err) {
        console.error(err);
      }
    };

    fetchPackages();
  }, [mode, destinationId]);

  // ⭐ RATING LOGIC
  const getRating = (pkg) => {
    const text = (pkg.title || '') + (pkg.description || '');

    const sum = text.length
      .toString()
      .split('')
      .reduce((acc, num) => acc + Number(num), 0);

    const finalDigit =
      sum >= 10
        ? sum
            .toString()
            .split('')
            .reduce((a, b) => a + Number(b), 0)
        : sum;

    return Number(`4.${finalDigit}`);
  };

  // 🖼 MEDIA
  const getDisplayMedia = (pkg) => {
    if (pkg.heroMedia?.type === 'image') return pkg.heroMedia;

    if (pkg.gallery?.length) {
      const img = pkg.gallery.find((m) => m.type === 'image');
      if (img) return img;
      return pkg.gallery[0];
    }

    return { type: 'image', url: '/fallback.jpg' };
  };

  // 🔄 MAP DATA
  const mappedPackages = packages.map((pkg) => {
    const media = getDisplayMedia(pkg);

    return {
      image: media.url,
      title: pkg.title,
      desc: pkg.destination?.name || pkg.description?.slice(0, 60),
      ratings: getRating(pkg),
      price: pkg.price,
      link: `/package/${pkg.slug}`,
    };
  });

  const renderStars = (rating) => {
    return (
      <div className='stars'>
        {[...Array(5)].map((_, i) => {
          const fillPercentage = Math.min(Math.max(rating - i, 0), 1) * 100;

          return (
            <span className='star' key={i}>
              <span
                className='star-fill'
                style={{ width: `${fillPercentage}%` }}
              >
                ★
              </span>
              <span className='star-base'>★</span>
            </span>
          );
        })}
      </div>
    );
  };

  return (
    <section className='PopularPackages'>
      <div className='top'>
        <h4>Popular Packages</h4>
        <div className='button' onClick={() => navigate('/destination')}>
          <span>View More Packages</span>
          <img src={arrow} alt='' />
        </div>
      </div>

      <div className='title'>
        NPGO offers end-to-end corporate travel solutions for businesses and
        organizations. We specialize in planning
      </div>

      <div className='titleDesc'>
        From logistics and stays to activities and on-ground coordination, we
        handle every detail to ensure a smooth, professional, and memorable
        corporate journey.
      </div>

      <div className='packageCards'>
        {mappedPackages.map((pkg, index) => (
          <div className='card' key={index}>
            <img src={pkg.image} alt='' />

            <div className='info'>
              <div className='cardTitle'>{pkg.title.length > 20 ? `${pkg.title.slice(0, 20)}...` : `${pkg.title}`}</div>
              <div className='cardDesc'>{pkg.desc}</div>
            </div>

            <div className='ratings'>
              <span className='ratingText'>{pkg.ratings}/5</span>
              {renderStars(pkg.ratings)}
            </div>

            <div className='details'>
              <div className='viewButton' onClick={() => navigate(pkg.link)}>
                View More Details
              </div>
              <div className='price'>₹{pkg.price}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PopularPackages;
