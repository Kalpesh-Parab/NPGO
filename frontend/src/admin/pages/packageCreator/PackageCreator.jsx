import './packageCreator.scss';
import { useEffect, useState, useRef } from 'react';
import API from '../../services/api';
import AdminDestSelector from './components/AdminDestSelector';
import AdminPackageList from './components/AdminPackageList';
import PackageForm from './components/PackageForm';
import { toast } from 'sonner';

const PackageCreator = ({ type = 'package' }) => {
  const BASE_URL = type === 'event' ? '/events' : '/packages';
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

  const handleDelete = (pkg) => {
    toast('Delete this package?', {
      description: pkg.title,
      action: {
        label: 'Delete',
        onClick: async () => {
          const toastId = toast.loading('Deleting package...');

          try {
            await API.delete(`${BASE_URL}/${pkg._id}`);

            toast.success('Package deleted', { id: toastId });

            // refetch
            setSelected((prev) => ({ ...prev }));
          } catch (err) {
            toast.error('Failed to delete package', { id: toastId });
          }
        },
      },
      cancel: {
        label: 'Cancel',
      },
    });
  };

  // 🔥 Fetch packages when selection changes
  useEffect(() => {
    if (!selected) return;

    if (!selected._id) {
      setPackages([]);
      return;
    }

    const fetchPackages = async () => {
      const toastId = toast.loading('Fetching packages...');

      try {
        let url = '';

        if (selected.type === 'destination') {
          url = `${BASE_URL}?destination=${selected._id}&includeInactive=true`;
        } else {
          url = `${BASE_URL}?country=${selected._id}&includeInactive=true`;
        }

        const res = await API.get(url);
        setPackages(res.data);

        toast.success('Packages loaded', { id: toastId });

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
        toast.error('Failed to fetch packages', { id: toastId });
      }
    };

    fetchPackages();
    setShowForm(false);
  }, [selected]);

  const handleDuplicate = async (pkg) => {
    const toastId = toast.loading('Duplicating package...');

    try {
      const cloned = { ...pkg };

      delete cloned._id;
      delete cloned.slug;
      delete cloned.createdAt;
      delete cloned.__v;

      cloned.title = `${pkg.title} (Copy)`;

      await API.post(`${BASE_URL}`, cloned);

      toast.success('Package duplicated', { id: toastId });

      setSelected((prev) => ({ ...prev }));
    } catch (err) {
      toast.error('Failed to duplicate', { id: toastId });
    }
  };
  return (
    <div className='package-creator'>
      <h2>Create {type === 'event' ? 'Event' : 'Package'}</h2>

      <AdminDestSelector onSelect={setSelected} />

      {selected && <div className='selected-info'></div>}
      <div ref={listRef}>
        {selected && (
          <AdminPackageList
            title={selected.name}
            packages={packages}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onDuplicate={handleDuplicate}
            type={type}
          />
        )}
      </div>

      {selected && (
        <button
          className='add-btn'
          onClick={() => {
            setShowForm((prev) => {
              const next = !prev;

              if (!prev) {
                // only scroll when opening
                setTimeout(() => {
                  if (formRef.current) {
                    formRef.current.scrollIntoView({
                      behavior: 'smooth',
                      block: 'start',
                    });
                  }
                }, 100);
              }

              return next;
            });
          }}
        >
          {showForm
            ? 'Cancel'
            : `+ Add ${type === 'event' ? 'Event' : 'Package'}`}
        </button>
      )}

      {showForm && (
        <div ref={formRef}>
          <PackageForm
            selected={selected}
            initialData={editingPackage}
            type={type}
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
