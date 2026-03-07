import { useEffect, useState } from "react";
import "./eventsGallery.scss";

import e1 from "../../../../assets/e1.png";
import e2 from "../../../../assets/p4.png";
import e3 from "../../../../assets/b3.png";

import left from "../../../../assets/left.png";
import right from "../../../../assets/right.png";

const EventsGallery = () => {

  const data = [
    {
      img: e1,
      title: "Konkan Bike Travel",
      desc: "Ride through coastal Konkan roads surrounded by lush greenery, sea breeze and breathtaking sunset points.",
    },
    {
      img: e2,
      title: "Maharashtra Valley Trek",
      desc: "Experience the thrill of trekking through hidden valleys, waterfalls and ancient mountain forts.",
    },
    {
      img: e3,
      title: "Rajasthan Tour",
      desc: "Explore majestic palaces, golden deserts and royal culture through a curated Rajasthan experience.",
    },
  ];

  const [current, setCurrent] = useState(0);
  const [animateText, setAnimateText] = useState(true);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % data.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + data.length) % data.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setAnimateText(false);
    const t = setTimeout(() => setAnimateText(true), 50);
    return () => clearTimeout(t);
  }, [current]);

  return (
    <section className="EventsGallery">

      {/* SVG ClipPath Definition */}
      <svg width="0" height="0">
        <defs>
          <clipPath id="eventsClip" clipPathUnits="objectBoundingBox">
            <path transform="scale(0.000683,0.001364)"
              d="M1463 693C1463 715.091 1445.09 733 1423 733H930C907.909 733 890 715.091 890 693V688C890 665.909 872.091 648 850 648H614C591.909 648 574 665.909 574 688V693C574 715.091 556.091 733 534 733H40C17.9086 733 0 715.091 0 693V40C0 17.9086 17.9086 0 40 0H1423C1445.09 0 1463 17.9086 1463 40V693Z"/>
          </clipPath>
        </defs>
      </svg>

      <div className="galleryWrapper">

        <div className="slider">

          <div className="clipContainer">

            <img
              key={data[current].img}
              src={data[current].img}
              className="slideImage"
              alt={data[current].title}
            />

            <div className="overlay"></div>

            <div className={`textContent ${animateText ? "reveal" : ""}`}>
              <h3>{data[current].title}</h3>
              <p>{data[current].desc}</p>
            </div>

          </div>

          <div className="navButtons">
            <button onClick={prevSlide}>
              <img src={left} alt="previous"/>
            </button>

            <button onClick={nextSlide}>
              <img src={right} alt="next"/>
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};

export default EventsGallery;