import { useEffect, useState } from 'react';
import API from '../../services/api';
import AdminDestSelector from './components/AdminDestSelector';
import PackageForm from './components/PackageForm';

const PackageCreator = () => {
  const [selected, setSelected] = useState(null);
  const [packages, setPackages] = useState([]);
  const [showForm, setShowForm] = useState(false);

  // 🔥 Fetch packages when selection changes
  useEffect(() => {
    if (!selected) return;

    const fetchPackages = async () => {
      try {
        let url = '';

        if (selected.type === 'destination') {
          url = `/packages?destination=${selected._id}`;
        } else {
          url = `/packages?country=${selected._id}`;
        }

        const res = await API.get(url);
        setPackages(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPackages();
    setShowForm(false); // reset form
  }, [selected]);

  return (
    <div>
      <h2>Create Package</h2>

      {/* 1️⃣ Selector */}
      <AdminDestSelector onSelect={setSelected} />

      {/* 2️⃣ Selected Info */}
      {selected && (
        <div style={{ marginTop: '20px' }}>
          <h3>Packages for: {selected.name}</h3>
        </div>
      )}

      {/* 3️⃣ Existing Packages */}
      {selected && (
        <div style={{ marginTop: '10px' }}>
          {packages.length === 0 ? (
            <p>No packages yet</p>
          ) : (
            packages.map((pkg) => (
              <div
                key={pkg._id}
                style={{
                  padding: '10px',
                  border: '1px solid #ccc',
                  marginBottom: '10px',
                }}
              >
                <h4>{pkg.title}</h4>
                <p>₹ {pkg.price}</p>
              </div>
            ))
          )}
        </div>
      )}

      {/* 4️⃣ Add Button */}
      {selected && (
        <button
          style={{ marginTop: '20px' }}
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancel' : '+ Add Package'}
        </button>
      )}

      {/* 5️⃣ Form */}
      {showForm && (
        <PackageForm
          selected={selected}
          onSuccess={() => {
            setShowForm(false);
            // 🔥 refetch
            setSelected({ ...selected });
          }}
        />
      )}
    </div>
  );
};

export default PackageCreator;
