import './packItinerary.scss';
import g1 from '../../../../assets/package/g1.png';
import g2 from '../../../../assets/package/g2.png';
import { useRef, useEffect, useState } from 'react';

const PackItinerary = () => {
  const [activeDay, setActiveDay] = useState(1);
  const sectionsRef = useRef([]);

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
      },
    );

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToDay = (id) => {
    sectionsRef.current[id - 1]?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  const itinerary = [
    {
      id: 1,
      day: 'Day 1',
      title: 'Arrival in New York',
      description: [
        {
          heading: 'Arrival & Transfer',
          content:
            'Welcome to the Big Apple! Upon arrival at JFK/EWR, meet your tour manager at the arrivals lounge. Enjoy a comfortable private transfer to your hotel in the heart of Manhattan.',
        },
        {
          heading: 'Evening Leisure',
          content:
            'As the sun sets, take a short walk to Times Square. Experience the neon lights, giant billboards, and the electric energy of NYC at night.',
        },
      ],
      images: [
        {
          src: g1,
          caption: 'Scenic skyline of New York City',
        },
        {
          src: g2,
          caption: 'Times Square illuminated at night',
        },
      ],
    },
    {
      id: 2,
      day: 'Day 2',
      title: 'City Tour',
      description: [
        {
          heading: 'Icons of Liberty',
          content:
            'Board the morning ferry to Liberty Island for an up-close view of the Statue of Liberty, followed by a visit to Ellis Island.',
        },
        {
          heading: 'Manhattan Exploration',
          content:
            'Enjoy a guided panoramic tour including Wall Street, 9/11 Memorial, Central Park, and Rockefeller Center. End with views from the Top of the Rock.',
        },
      ],
      images: [
        {
          src: g1,
        },
      ],
    },
    {
      id: 3,
      day: 'Day 3',
      title: 'Washington DC',
      description: [
        {
          heading: 'The Capital Run',
          content:
            'Travel to Washington DC and visit the Lincoln Memorial and reflecting pool.',
        },
        {
          heading: 'Political Landmarks',
          content:
            'Capture photos outside the White House and explore the Smithsonian Air and Space Museum.',
        },
      ],
      images: [],
    },
    {
      id: 4,
      day: 'Day 4',
      title: 'Niagara Falls',
      description: [
        {
          heading: 'Majestic Waters',
          content:
            'Travel through scenic upstate New York and witness the falls illuminated at night.',
        },
        {
          heading: 'Maid of the Mist',
          content:
            'Board the famous boat ride and experience the power of the Horseshoe Falls up close.',
        },
      ],
      images: [
        {
          src: g2,
        },
      ],
    },
    {
      id: 5,
      day: 'Day 5',
      title: 'Las Vegas',
      description: [
        {
          heading: 'The Entertainment Capital',
          content:
            'Fly to Las Vegas and check into your luxury resort on the Strip.',
        },
        {
          heading: 'Viva Las Vegas',
          content:
            'Explore mega-resorts and watch the Bellagio fountains or a Cirque du Soleil show.',
        },
      ],
      images: [],
    },
    {
      id: 6,
      day: 'Day 6',
      title: 'Grand Canyon',
      description: [
        {
          heading: 'Natural Wonder',
          content:
            'Full-day excursion to the Grand Canyon West Rim. Walk across the Skywalk.',
        },
        {
          heading: 'Guano Point',
          content:
            'Enjoy scenic canyon views and learn about the Hualapai tribe.',
        },
      ],
      images: [
        {
          src: g1,
        },
      ],
    },
    {
      id: 7,
      day: 'Day 7',
      title: 'San Francisco',
      description: [
        {
          heading: 'The City by the Bay',
          content:
            'Fly to San Francisco and explore its rolling hills and Victorian charm.',
        },
        {
          heading: 'Golden Gate Bridge',
          content:
            'Cross the Golden Gate Bridge and enjoy the evening at Fisherman’s Wharf.',
        },
      ],
      images: [
        {
          src: g2,
        },
      ],
    },
    {
      id: 8,
      day: 'Day 8',
      title: 'Hollywood',
      description: [
        {
          heading: 'The Red Carpet',
          content:
            'Visit the Hollywood Walk of Fame and find your favorite celebrity star.',
        },
        {
          heading: 'Luxury & Lifestyle',
          content:
            'Drive through Beverly Hills and enjoy sunset views from Griffith Observatory.',
        },
      ],
      images: [],
    },
    {
      id: 9,
      day: 'Day 9',
      title: 'Shopping Day',
      description: [
        {
          heading: 'Retail Therapy',
          content:
            'Spend the day at Premium Outlets shopping major American brands.',
        },
        {
          heading: 'Farewell Dinner',
          content:
            'Celebrate the end of the journey with a special farewell dinner.',
        },
      ],
      images: [],
    },
    {
      id: 10,
      day: 'Day 10',
      title: 'Departure',
      description: [
        {
          heading: 'Final Farewells',
          content: 'Enjoy a final breakfast and last-minute sightseeing.',
        },
        {
          heading: 'Return Journey',
          content:
            'Transfer to the airport for your flight home with unforgettable memories.',
        },
      ],
      images: [],
    },
  ];
  return (
    <section className='PackItinerary'>
      <div className='title'>Itinerary</div>
      <div className='bottom'>
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
        <div className='daysDesc'>
          {itinerary.map((day, index) => (
            <div
              className='singleDay'
              key={day.id}
              ref={(el) => (sectionsRef.current[index] = el)}
              data-id={day.id}
            >
              <div className='dayDesc'>
                <h2>{day.day} : {day.title}</h2>
                {day.description.map((item, i) => (
                  <div key={i} className='descBlock'>
                    <h4>{item.heading}</h4>
                    <p>{item.content}</p>
                  </div>
                ))}
              </div>

              {day.images.length > 0 && (
                <div className='images'>
                  {day.images.map((image, i) => (
                    <div className='image' key={i}>
                      <img src={image.src} alt='' />
                      <div className='overlay' />
                      <div className='caption'>{image.caption}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PackItinerary;
