import "./homeCorporate.scss";
import { Fragment, useEffect, useRef, useState } from "react";
import arrow from "../../../../assets/arrowWhite.svg";
import { useNavigate } from "react-router-dom";

const HomeCorporate = ({ data }) => {
  const navigate = useNavigate();

  const galleryImages = data?.images || [];
  const TYPING_TEXT =
    data?.typingText ||
    "Travel your way with complete flexibility and expert planning.";

  const [typedText, setTypedText] = useState("");
  const indexRef = useRef(0);
  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (!TYPING_TEXT) return;

    const startTyping = () => {
      intervalRef.current = setInterval(() => {
        indexRef.current += 1;

        if (indexRef.current <= TYPING_TEXT.length) {
          setTypedText(TYPING_TEXT.slice(0, indexRef.current));
        } else {
          clearInterval(intervalRef.current);

          timeoutRef.current = setTimeout(() => {
            indexRef.current = 0;
            setTypedText("");
            startTyping();
          }, 1200);
        }
      }, 120);
    };

    startTyping();

    return () => {
      clearInterval(intervalRef.current);
      clearTimeout(timeoutRef.current);
      indexRef.current = 0;
    };
  }, [TYPING_TEXT]);

  if (!data) return null;

  return (
    <section className="HomeCorporate">
      <h4>{data.title}</h4>

      <div className="gallery">
        {galleryImages.map((img, index) => (
          <Fragment key={index}>
            {index === 11 && (
              <div className="imgContainer textContainer">
                <p>{typedText}</p>
              </div>
            )}

            <div className="imgContainer">
              <img
                src={img.url}
                alt={img.alt || `Corporate Event ${index + 1}`}
              />
            </div>
          </Fragment>
        ))}
      </div>

      <div className="bot">
        <h2>{data.bottomHeading}</h2>

        <div className="desc1">
          <h3>{data.bottomDescription}</h3>

          {data.buttonText && (
            <div
              className="button"
              onClick={() => navigate(data.buttonLink)}
            >
              <span>{data.buttonText}</span>
              <img src={arrow} alt="" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HomeCorporate;