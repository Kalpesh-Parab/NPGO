import { useEffect, useState } from 'react';
import API from '../../services/api';
import './enquiries.scss';
import { toast } from 'sonner';

const Enquiries = () => {
  const [type, setType] = useState('contact'); // contact | custom
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);

  const LIMIT = 8;

  // 🔥 Fetch Data
  const fetchData = async () => {
    try {
      setLoading(true);

      let res;

      if (type === 'contact') {
        res = await API.get(`/contact?page=${page}&limit=${LIMIT}`);
        setData(res.data.data);
      } else {
        res = await API.get(`/custom-enquiry`);
        setData(res.data.data.slice((page - 1) * LIMIT, page * LIMIT));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [type, page]);

  // 🔥 Open Modal + Auto Checked
  const openEnquiry = async (item) => {
    let updatedItem = item;

    if (item.status === 'new') {
      await updateStatus(item._id, 'checked');
      updatedItem = { ...item, status: 'checked' };
    }

    setSelected(updatedItem);
  };

  // 🔥 Update Status
  const updateStatus = async (id, status) => {
    try {
      const url =
        type === 'contact'
          ? `/contact/${id}/status`
          : `/custom-enquiry/${id}/status`;

      await API.patch(url, { status });

      fetchData();
      setSelected((prev) => ({ ...prev, status }));
    } catch (err) {
      console.error(err);
    }
  };

  // 🔥 Delete
  const handleDelete = async (id) => {
    if (type !== 'contact') return;

    toast('Delete this enquiry?', {
      action: {
        label: 'Delete',
        onClick: async () => {
          try {
            await API.delete(`/contact/${id}`);
            toast.success('Deleted successfully');
            fetchData();
          } catch {
            toast.error('Delete failed');
          }
        },
      },
    });
  };

  return (
    <div className='enquiries'>
      {/* 🔥 Toggle */}
      <div className='toggle'>
        <button
          className={type === 'contact' ? 'active' : ''}
          onClick={() => setType('contact')}
        >
          Contact
        </button>
        <button
          className={type === 'custom' ? 'active' : ''}
          onClick={() => setType('custom')}
        >
          Custom Trips
        </button>
      </div>

      {/* 🔥 Cards */}
      <div className='table-wrapper'>
        {loading && <div className='loading'>Loading enquiries...</div>}
        <table className='enquiry-table'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item) => (
              <tr key={item._id} onClick={() => openEnquiry(item)}>
                <td>{item.name || `${item.firstName} ${item.lastName}`}</td>

                <td className='highlight'>{item.email}</td>

                <td className='highlight'>{item.phone}</td>

                <td>
                  <span className={`status ${item.status}`}>{item.status}</span>
                </td>

                <td onClick={(e) => e.stopPropagation()}>
                  {type === 'contact' && (
                    <button
                      className='delete'
                      onClick={() => handleDelete(item._id)}
                    >
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 🔥 Pagination */}
      <button
        disabled={page === 1}
        onClick={() => setPage((p) => Math.max(1, p - 1))}
      >
        Prev
      </button>
      <span>{page}</span>
      <button
        disabled={data.length < LIMIT}
        onClick={() => setPage((p) => p + 1)}
      >
        Next
      </button>

      {/* 🔥 Modal */}
      {selected && (
        <div className='modal' onClick={() => setSelected(null)}>
          <div className='modal-content' onClick={(e) => e.stopPropagation()}>
            <h2>Enquiry Details</h2>

            <div className='details'>
              <div>
                <strong>Name:</strong>{' '}
                {selected.name || `${selected.firstName} ${selected.lastName}`}
              </div>
              <div>
                <strong>Email:</strong> {selected.email}
              </div>
              <div>
                <strong>Phone:</strong> {selected.phone}
              </div>

              {selected.message && (
                <div>
                  <strong>Message:</strong> {selected.message}
                </div>
              )}

              {/* 🔥 SOURCE LINK */}
              {selected.source?.page && (
                <div>
                  <strong>Source:</strong>{' '}
                  <a
                    href={`https://npgo.me${selected.source.page}`}
                    target='_blank'
                    rel='noreferrer'
                  >
                    https://npgo.me{selected.source.page}
                  </a>
                </div>
              )}

              <div>
                <strong>Location:</strong> {selected.location?.city},{' '}
                {selected.location?.country}
              </div>
            </div>

            {/* 🔥 Status Buttons */}
            <div className='actions'>
              <button
                className={selected.status === 'new' ? 'active' : ''}
                onClick={() => updateStatus(selected._id, 'new')}
              >
                New
              </button>

              <button
                className={selected.status === 'checked' ? 'active' : ''}
                onClick={() => updateStatus(selected._id, 'checked')}
              >
                Checked
              </button>

              <button
                className={selected.status === 'contacted' ? 'active' : ''}
                onClick={() => updateStatus(selected._id, 'contacted')}
              >
                Contacted
              </button>
            </div>

            <button className='close' onClick={() => setSelected(null)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Enquiries;
