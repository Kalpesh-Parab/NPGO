import './packageCreator.scss';
import { useEffect, useState } from 'react';
import API from '../../services/api';
import AdminDestSelector from './components/AdminDestSelector';
import AdminPackageList from './components/AdminPackageList';
import PackageForm from './components/PackageForm';

const PackageCreator = () => {
  const [editingPackage, setEditingPackage] = useState(null);
  const [selected, setSelected] = useState(null);
  const [packages, setPackages] = useState([]);
  const [showForm, setShowForm] = useState(false);

  // ✅ MOVE HERE (component scope)
  const handleEdit = (pkg) => {
    setEditingPackage(pkg);
    setShowForm(true);
  };

  const handleDelete = async (pkg) => {
    if (!window.confirm('Delete this package?')) return;

    try {
      await API.delete(`/packages/${pkg._id}`);

      // 🔥 trigger refetch
      setSelected((prev) => ({ ...prev }));
    } catch (err) {
      console.error(err);
    }
  };

  // 🔥 Fetch packages when selection changes
  useEffect(() => {
    if (!selected) return;

    if (!selected._id) {
      setPackages([]);
      return;
    }

    const fetchPackages = async () => {
      try {
        let url = '';

        if (selected.type === 'destination') {
          url = `/packages?destination=${selected._id}`;
        } else {
          url = `/packages?country=${selected._id}&includeInactive=true`;
        }

        const res = await API.get(url);
        setPackages(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPackages();
    setShowForm(false);
  }, [selected]);

  return (
    <div className='package-creator'>
      <h2>Create Package</h2>

      <AdminDestSelector onSelect={setSelected} />

      {selected && (
        <div className='selected-info'>
          <h3>Packages for: {selected.name}</h3>
        </div>
      )}

      {selected && (
        <AdminPackageList
          title={selected.name}
          packages={packages}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      {selected && (
        <button className='add-btn' onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : '+ Add Package'}
        </button>
      )}

      {showForm && (
        <PackageForm
          selected={selected}
          initialData={editingPackage}
          onSuccess={() => {
            setShowForm(false);
            setEditingPackage(null);
            setSelected((prev) => ({ ...prev }));
          }}
        />
      )}
    </div>
  );
};

export default PackageCreator;
