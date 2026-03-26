import { useEffect, useState } from 'react';
import API from '../../services/api';
import './enquiries.scss';

const Enquiries = () => {
  const [type, setType] = useState('contact');

  const [contactData, setContactData] = useState([]);
  const [customData, setCustomData] = useState([]);

  const [selected, setSelected] = useState(null);

  // 🔄 Fetch Data
  const fetchContact = async () => {
    const res = await API.get('/contact');
    setContactData(res.data.data || []);
  };

  const fetchCustom = async () => {
    const res = await API.get('/custom-enquiry');
    setCustomData(res.data.data || []);
  };

  useEffect(() => {
    fetchContact();
    fetchCustom();
  }, []);

  const data = type === 'contact' ? contactData : customData;

  // 🔁 Update Status
  const updateStatus = async (item, newStatus) => {
    const endpoint =
      type === 'contact'
        ? `/contact/${item._id}/status`
        : `/custom-enquiry/${item._id}/status`;

    await API.patch(endpoint, { status: newStatus });

    if (type === 'contact') fetchContact();
    else fetchCustom();

    setSelected({ ...item, status: newStatus });
  };

  // ⚡ Auto mark contacted
  useEffect(() => {
    if (selected && selected.status === 'new') {
      updateStatus(selected, 'checked');
    }
  }, [selected]);

  const buildUrl = (path) => {
    if (!path) return '#';

    // already full URL (contact case)
    if (path.startsWith('http')) return path;

    // custom case → prepend domain
    return `https://npgo.me${path}`;
  };

  return (
    <div className='enquiries'>
      {/* 🔘 TOGGLE */}
      <div className='toggle'>
        <button
          className={type === 'contact' ? 'active' : ''}
          onClick={() => setType('contact')}
        >
          Contact Enquiries
        </button>

        <button
          className={type === 'custom' ? 'active' : ''}
          onClick={() => setType('custom')}
        >
          Custom Enquiries
        </button>
      </div>

      {/* 📊 TABLE */}
      <div className='table-container'>
        <table>
          <thead>
            <tr>
              {type === 'contact' ? (
                <>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Message</th>
                  <th>Source</th>
                  <th>Location</th>
                  <th>Date</th>
                  <th>Status</th>
                </>
              ) : (
                <>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Travel</th>
                  <th>People</th>
                  <th>Budget</th>
                  <th>Source</th>
                  <th>Date</th>
                  <th>Status</th>
                </>
              )}
            </tr>
          </thead>

          <tbody>
            {data.map((item) => (
              <tr
                key={item._id}
                onClick={() => setSelected(item)}
                className={item.status === 'new' ? 'highlight' : ''}
              >
                {type === 'contact' ? (
                  <>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.phone}</td>
                    <td>{item.message?.slice(0, 30)}...</td>
                    <td>
                      <a
                        href={item.source?.page}
                        target='_blank'
                        onClick={(e) => e.stopPropagation()}
                      >
                        {item.source?.type} / {item.source?.slug}
                      </a>
                    </td>
                    <td>
                      {item.location?.country}, {item.location?.city}
                    </td>
                    <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                    <td>
                      <StatusBadge status={item.status} />
                    </td>
                  </>
                ) : (
                  <>
                    <td>
                      {item.firstName} {item.lastName}
                    </td>
                    <td>{item.email}</td>
                    <td>{item.phone}</td>
                    <td>{new Date(item.travelDate).toLocaleDateString()}</td>
                    <td>{item.adults + item.children}</td>
                    <td>{item.budget}</td>
                    <td>
                      <a
                        href={buildUrl(item.source?.from)}
                        target='_blank'
                        onClick={(e) => e.stopPropagation()}
                      >
                        {item.source?.type}
                      </a>
                    </td>
                    <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                    <td>
                      <StatusBadge status={item.status} />
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 🧊 MODAL */}
      {selected && (
        <div className='modal-overlay' onClick={() => setSelected(null)}>
          <div className='modal' onClick={(e) => e.stopPropagation()}>
            <div className='modal-header'>
              <h2>Enquiry Details</h2>
              <button className='close-btn' onClick={() => setSelected(null)}>
                ✕
              </button>
            </div>

            <div className='section'>
              <h4>User Info</h4>
              {type === 'contact' ? (
                <>
                  <p>
                    <strong>Name:</strong> {selected.name}
                  </p>
                  <p>
                    <strong>Email:</strong> {selected.email}
                  </p>
                  <p>
                    <strong>Phone:</strong> {selected.phone}
                  </p>
                  <p>
                    <strong>Message:</strong> {selected.message}
                  </p>
                </>
              ) : (
                <>
                  <p>
                    <strong>Name:</strong> {selected.firstName}{' '}
                    {selected.lastName}
                  </p>
                  <p>
                    <strong>Email:</strong> {selected.email}
                  </p>
                  <p>
                    <strong>Phone:</strong> {selected.phone}
                  </p>
                </>
              )}
            </div>

            {type === 'custom' && (
              <div className='section'>
                <h4>Travel Info</h4>
                <p>Destination: {selected.knowDestination}</p>
                <p>
                  Date: {new Date(selected.travelDate).toLocaleDateString()}
                </p>
                <p>Nights: {selected.nights}</p>
                <p>Adults: {selected.adults}</p>
                <p>Children: {selected.children}</p>
                <p>Budget: {selected.budget}</p>
                <p>Must Do: {selected.mustDo}</p>
                <p>Special Occasion: {selected.specialOccasion}</p>
              </div>
            )}

            <div className='section'>
              <h4>Source</h4>

              {type === 'contact' ? (
                <>
                  <p>
                    Page:{' '}
                    <a href={buildUrl(selected.source?.page)} target='_blank'>
                      {selected.source?.page}
                    </a>
                  </p>
                </>
              ) : (
                <>
                  <p>
                    From:{' '}
                    <a href={buildUrl(selected.source?.from)} target='_blank'>
                      {selected.source?.from}
                    </a>
                  </p>
                </>
              )}

              <p>Type: {selected.source?.type}</p>
              <p>Slug: {selected.source?.slug}</p>
            </div>

            <div className='section'>
              <h4>Location</h4>
              <p>
                {selected.location?.country}, {selected.location?.city}
              </p>
            </div>

            <div className='section'>
              <h4>Date</h4>
              <p>{new Date(selected.createdAt).toLocaleString()}</p>
            </div>

            {/* 🎯 ACTIONS */}
            <div className='actions'>
              <button onClick={() => updateStatus(selected, 'contacted')}>
                Mark as Contacted
              </button>

              {type === 'contact' ? (
                <button onClick={() => updateStatus(selected, 'closed')}>
                  Close
                </button>
              ) : (
                <button onClick={() => updateStatus(selected, 'converted')}>
                  Convert
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// 🎨 STATUS BADGE
const StatusBadge = ({ status }) => {
  return <span className={`badge ${status}`}>{status}</span>;
};

export default Enquiries;
