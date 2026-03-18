import './packItinerary.scss';
import { useRef, useEffect, useState } from 'react';

const PackItinerary = ({ data }) => {
  const [activeDay, setActiveDay] = useState(1);
  const sectionsRef = useRef([]);

  if (!data) return null;

  const { itinerary = [] } = data;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveDay(Number(entry.target.dataset.id));
          }
        });
      },
      {
        threshold: 0.6,
      }
    );

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, [itinerary]);

  const scrollToDay = (id) => {
    sectionsRef.current[id - 1]?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  return (
    <section className='PackItinerary'>
      <div className='title'>Itinerary</div>

      <div className='bottom'>
        {/* LEFT SIDE */}
        <div className='days'>
          {itinerary.map((day) => (
            <div
              key={day.id}
              className={`day ${activeDay === day.id ? 'active' : ''}`}
              onClick={() => scrollToDay(day.id)}
            >
              <div className='dayNum'>{day.day}</div>
              <div className='dayTitle'>{day.title}</div>
            </div>
          ))}
        </div>

        {/* RIGHT SIDE */}
        <div className='daysDesc'>
          {itinerary.map((day, index) => (
            <div
              className='singleDay'
              key={day.id}
              ref={(el) => (sectionsRef.current[index] = el)}
              data-id={day.id}
            >
              {/* MEDIA */}
              {day.media?.length > 0 && (
                <div className='images'>
                  {day.media.map((item, i) => (
                    <div className='image' key={i}>
                      {item.type === 'image' ? (
                        <img src={item.url} alt='' />
                      ) : (
                        <video
                          src={item.url}
                          autoPlay
                          loop
                          muted
                          playsInline
                        />
                      )}

                      <div className='overlay' />
                      <div className='caption'>{item.caption}</div>
                    </div>
                  ))}
                </div>
              )}

              {/* DESCRIPTION */}
              <div className='dayDesc'>
                <h2>
                  {day.day} : {day.title}
                </h2>

                {day.description.map((item, i) => (
                  <div key={i} className='descBlock'>
                    <h4>{item.heading}</h4>
                    <p>{item.content}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PackItinerary;