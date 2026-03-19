import './package.scss';
import PackGallery from './sections/packGallery/PackGallery';
import PackHero from './sections/packHero/PackHero';
import PackItinerary from './sections/packItinerary/PackItinerary';
import PopularPackages from '../home/sections/popularPackages/PopularPackages';
import HomeExperience from '../home/sections/homeExperience/HomeExperience';
import HomeTesti from '../home/sections/homeTesti/HomeTesti';
import HomeContact from '../home/sections/homeContact/HomeContact';
import PackInclusions from './sections/packInclusions/PackInclusions';
import comm from '../../assets/common/comm.mp4';
import g1 from '../../assets/package/g1.png';
import g2 from '../../assets/package/g2.png';
import g3 from '../../assets/package/g3.png';

const Package = () => {
  const packageData = {
    title: 'USA New York Washington Philadelphia with Luray & Shenandoah',

    price: 900,
    currency: '$',

    types: [
      'Adventure',
      'City Life',
      'Group Trip',
      'Luxury',
      'Nature',
      'Photography',
    ],

    heroMedia: comm, // replace with your local or cloudinary later

    description:
      'Explore the vibrant energy of New York City, the political heart of Washington DC, and the historic charm of Philadelphia. From iconic skylines to natural wonders like Shenandoah, this journey blends urban excitement with scenic beauty for an unforgettable American experience.',

    gallery: [
      {
        url: g1,
        caption: 'Manhattan Bridge, New York, United States',
      },
      {
        url: g2,
        caption: 'Times Square lights up the night skyline',
      },
      {
        url: g3,
        caption: 'Statue of Liberty standing tall in the harbor',
      },
      {
        url: g2,
        caption: 'Central Park in the heart of the city',
      },
      {
        url: g1,
        caption: 'Broadway’s iconic theatre district',
      },
      {
        url: g3,
        caption: 'NYC skyline touching the clouds',
      },
    ],

    inclusions: {
      included: [
        'Accommodation on sharing basis',
        'Breakfast & dinner throughout the trip',
        'All internal transportation',
        'Experienced trip coordinator',
        'Assistance during temple visits',
        'Basic first-aid support',
      ],
      notIncluded: [
        'Helicopter tickets to Kedarnath',
        'Pony / palki / porter charges',
        'Personal expenses',
        'Travel insurance',
        'Any meals not mentioned above',
      ],
    },

    itinerary: [
      {
        id: 1,
        day: 'Day 1',
        title: 'Arrival in New York',
        description: [
          {
            heading: 'Arrival & Transfer',
            content:
              'Welcome to the Big Apple! Upon arrival at JFK/EWR, meet your tour manager and transfer to your hotel in Manhattan.',
          },
          {
            heading: 'Evening Leisure',
            content:
              'Take a walk to Times Square and experience NYC nightlife.',
          },
        ],
        media: [
          { type: 'image', url: g1, caption: 'NYC skyline' },
          { type: 'image', url: g2, caption: 'Times Square at night' },
          { type: 'image', url: g1, caption: 'City views' },
          { type: 'image', url: g2, caption: 'NYC lights' },
          { type: 'image', url: g2, caption: 'Night skyline' },
        ],
      },
      {
        id: 2,
        day: 'Day 2',
        title: 'City Tour',
        description: [
          {
            heading: 'Icons of Liberty',
            content: 'Visit Statue of Liberty and Ellis Island.',
          },
          {
            heading: 'Manhattan Exploration',
            content:
              'Explore Wall Street, Central Park and Rockefeller Center.',
          },
        ],
        media: [{ type: 'image', url: g1, caption: 'City exploration' }],
      },
      {
        id: 3,
        day: 'Day 3',
        title: 'Washington DC',
        description: [
          {
            heading: 'The Capital Run',
            content: 'Visit Lincoln Memorial and reflecting pool.',
          },
          {
            heading: 'Political Landmarks',
            content: 'See the White House and Smithsonian Museum.',
          },
        ],
        media: [],
      },
      {
        id: 4,
        day: 'Day 4',
        title: 'Niagara Falls',
        description: [
          {
            heading: 'Majestic Waters',
            content: 'Witness the illuminated Niagara Falls.',
          },
          {
            heading: 'Maid of the Mist',
            content: 'Experience the falls up close via boat ride.',
          },
        ],
        media: [{ type: 'image', url: g2, caption: 'Niagara Falls' }],
      },
      {
        id: 5,
        day: 'Day 5',
        title: 'Las Vegas',
        description: [
          {
            heading: 'The Entertainment Capital',
            content: 'Fly to Las Vegas and check into your resort.',
          },
          {
            heading: 'Viva Las Vegas',
            content: 'Explore casinos and enjoy live shows.',
          },
        ],
        media: [],
      },
      {
        id: 6,
        day: 'Day 6',
        title: 'Grand Canyon',
        description: [
          {
            heading: 'Natural Wonder',
            content: 'Visit Grand Canyon West Rim and Skywalk.',
          },
          {
            heading: 'Guano Point',
            content: 'Enjoy panoramic canyon views.',
          },
        ],
        media: [{ type: 'image', url: g1, caption: 'Grand Canyon views' }],
      },
      {
        id: 7,
        day: 'Day 7',
        title: 'San Francisco',
        description: [
          {
            heading: 'The City by the Bay',
            content: 'Explore San Francisco’s famous spots.',
          },
          {
            heading: 'Golden Gate Bridge',
            content: 'Visit and cross the iconic bridge.',
          },
        ],
        media: [{ type: 'image', url: g2, caption: 'Golden Gate Bridge' }],
      },
      {
        id: 8,
        day: 'Day 8',
        title: 'Hollywood',
        description: [
          {
            heading: 'The Red Carpet',
            content: 'Walk through Hollywood Walk of Fame.',
          },
          {
            heading: 'Luxury & Lifestyle',
            content: 'Explore Beverly Hills and Griffith Observatory.',
          },
        ],
        media: [
          {
            type: 'video',
            url: comm,
            caption: 'Hollywood experience',
          },
        ],
      },
      {
        id: 9,
        day: 'Day 9',
        title: 'Shopping Day',
        description: [
          {
            heading: 'Retail Therapy',
            content: 'Shop at premium outlets.',
          },
          {
            heading: 'Farewell Dinner',
            content: 'Enjoy a final dinner with the group.',
          },
        ],
        media: [],
      },
      {
        id: 10,
        day: 'Day 10',
        title: 'Departure',
        description: [
          {
            heading: 'Final Farewells',
            content: 'Enjoy breakfast and prepare for departure.',
          },
          {
            heading: 'Return Journey',
            content: 'Transfer to airport for return flight.',
          },
        ],
        media: [],
      },
    ],
  };

  return (
    <>
      <PackHero data={packageData} />
      <PackGallery data={packageData} />
      <PackItinerary data={packageData} />
      <PackInclusions data={packageData.inclusions} />
      <HomeTesti />
      <HomeContact />
      <HomeExperience />
      <PopularPackages />
    </>
  );
};

export default Package;


