import '../../../../pages/destinationListing/sections/destPackages/destPackages.scss';

const AdminPackageList = ({ title, packages = [], onEdit, onDelete, onDuplicate }) => {
  // 🔥 Convert backend → UI

  const getDisplayMedia = (pkg) => {
    // 1️⃣ Hero media (if image)
    if (pkg.heroMedia?.type === 'image' && pkg.heroMedia?.url) {
      return { type: 'image', url: pkg.heroMedia.url };
    }

    // 2️⃣ Gallery → prefer image
    if (pkg.gallery?.length) {
      const image = pkg.gallery.find((m) => m.type === 'image');
      if (image) return image;

      // fallback video
      if (pkg.gallery[0]?.url) return pkg.gallery[0];
    }

    // 3️⃣ Itinerary media
    if (pkg.itinerary?.length) {
      for (const day of pkg.itinerary) {
        if (day.media?.length) {
          const image = day.media.find((m) => m.type === 'image');
          if (image) return image;

          if (day.media[0]?.url) return day.media[0];
        }
      }
    }

    // 4️⃣ fallback
    return { type: 'image', url: '/fallback.jpg' };
  };

  const mapData = (pkg) => {
    const media = getDisplayMedia(pkg);

    return {
      id: pkg._id,
      media,
      title: pkg.title,
      desc:
        pkg.description?.slice(0, 30) ||
        pkg.destination?.name ||
        'No description',
      price: pkg.price,
    };
  };

  const sortedPackages = [...packages].sort((a, b) => {
    // 1️⃣ Active first
    if (a.isActive !== b.isActive) {
      return b.isActive - a.isActive; // true first
    }

    // 2️⃣ Price ascending
    return a.price - b.price;
  });

  return (
    <section className='DestPackages'>
      <div className='top'>
        <h4>Packages for {title}</h4>
      </div>

      <div className='packageCards'>
        {sortedPackages.map((rawPkg) => {
          const pkg = mapData(rawPkg);

          return (
            <div className='card' key={pkg.id}>
              {pkg.media.type === 'video' ? (
                <video
                  src={pkg.media.url}
                  autoPlay
                  loop
                  muted
                  style={{
                    width: '100%',
                    aspectRatio: '1.05',
                    objectFit: 'cover',
                    borderRadius: '0.2vw',
                  }}
                />
              ) : (
                <img src={pkg.media.url} alt={pkg.title} />
              )}

              <div className='info'>
                <div className='cardTitle'>{pkg.title}</div>
                <div className='cardDesc'>{pkg.desc}</div>
              </div>

              <div className='details'>
                {/* ✏️ EDIT */}
                <div
                  className='viewButton'
                  onClick={() => onEdit && onEdit(rawPkg)}
                >
                  Edit
                </div>

                {/* 💰 PRICE */}
                <div className='price'>₹{pkg.price}</div>
              </div>

              {/* 🗑 DELETE */}
              <div
                style={{
                  marginTop: '0.5vw',
                  textAlign: 'center',
                  color: 'red',
                  fontSize: '0.8vw',
                  cursor: 'pointer',
                }}
                onClick={() => onDelete && onDelete(rawPkg)}
              >
                Delete
              </div>
              <div
                style={{
                  marginTop: '0.3vw',
                  textAlign: 'center',
                  fontSize: '0.8vw',
                  cursor: 'pointer',
                  color: '#0a74a1',
                }}
                onClick={() => onDuplicate && onDuplicate(rawPkg)}
              >
                Duplicate
              </div>
              {!rawPkg.isActive && <div className='inactiveOverlay' />}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default AdminPackageList;
