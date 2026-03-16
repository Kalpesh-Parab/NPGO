import "./homeHero.scss";
import arrow from "../../../../assets/arrow.svg";
import { useNavigate } from "react-router-dom";

const HomeHero = ({ data }) => {
  const navigate = useNavigate();

  if (!data) return null;

  const handleClick = () => {
    if (data.buttonLink) {
      navigate(data.buttonLink);
    }
  };

  return (
    <section className="HomeHero">

      {data.media?.type === "video" ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          className="bg-video"
          preload="none"
        >
          <source src={data.media.url} type="video/mp4" />
        </video>
      ) : (
        <img
          className="bg-video"
          src={data.media?.url}
          alt={data.media?.alt || "Hero background"}
        />
      )}

      <div className="mainOverlay">
        <div className="heading">
          {data.heading}
        </div>

        <div className="subHeading">
          {data.subHeading}
        </div>

        {data.buttonText && (
          <div className="button" onClick={handleClick}>
            <span>{data.buttonText}</span>
            <img src={arrow} alt="arrow" />
          </div>
        )}
      </div>
    </section>
  );
};

export default HomeHero;