import './packageCreator.scss';
import { useEffect, useState, useRef } from 'react';
import API from '../../services/api';
import AdminDestSelector from './components/AdminDestSelector';
import AdminPackageList from './components/AdminPackageList';
import PackageForm from './components/PackageForm';

const PackageCreator = () => {
  const listRef = useRef(null);
  const [editingPackage, setEditingPackage] = useState(null);
  const [selected, setSelected] = useState(null);
  const [packages, setPackages] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const formRef = useRef(null);

  // ✅ MOVE HERE (component scope)
  const handleEdit = (pkg) => {
    setEditingPackage(pkg);
    setShowForm(true);

    // 🔥 scroll after render
    setTimeout(() => {
      if (formRef.current) {
        formRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    }, 100);
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
          url = `/packages?destination=${selected._id}&includeInactive=true`;
        } else {
          url = `/packages?country=${selected._id}&includeInactive=true`;
        }

        const res = await API.get(url);
        setPackages(res.data);

        // 🔥 SCROLL AFTER DATA LOAD
        setTimeout(() => {
          if (listRef.current) {
            const yOffset = window.innerHeight * 0.4;

            const y =
              listRef.current.getBoundingClientRect().top +
              window.pageYOffset -
              yOffset;

            window.scrollTo({
              top: y,
              behavior: 'smooth',
            });
          }
        }, 100); // slight delay for render
      } catch (err) {
        console.error(err);
      }
    };

    fetchPackages();
    setShowForm(false);
  }, [selected]);

  const handleDuplicate = async (pkg) => {
    try {
      const cloned = { ...pkg };

      delete cloned._id;
      delete cloned.slug;
      delete cloned.createdAt;
      delete cloned.__v;

      // optional tweak
      cloned.title = `${pkg.title} (Copy)`;

      await API.post('/packages', cloned);

      // refetch
      setSelected((prev) => ({ ...prev }));
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className='package-creator'>
      <h2>Create Package</h2>

      <AdminDestSelector onSelect={setSelected} />

      {selected && (
        <div className='selected-info'>
          <h3>Packages for: {selected.name}</h3>
        </div>
      )}
      <div ref={listRef}>
        {selected && (
          <AdminPackageList
            title={selected.name}
            packages={packages}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onDuplicate={handleDuplicate}
          />
        )}
      </div>

      {selected && (
        <button className='add-btn' onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : '+ Add Package'}
        </button>
      )}

      {showForm && (
        <div ref={formRef}>
          <PackageForm
            selected={selected}
            initialData={editingPackage}
            onSuccess={() => {
              setShowForm(false);
              setEditingPackage(null);
              setSelected((prev) => ({ ...prev }));
            }}
          />
        </div>
      )}
    </div>
  );
};

export default PackageCreator;
