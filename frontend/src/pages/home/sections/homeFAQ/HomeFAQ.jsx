import "./homeFAQ.scss";
import { useState } from "react";
import add from "../../../../assets/add.svg";

const HomeFAQ = ({ data }) => {
  const faqs = data || [];

  const [activeIndex, setActiveIndex] = useState(null);

  if (!faqs.length) return null;

  const toggleFAQ = (index) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="HomeFAQ">
      <div className="title">
        Questions?
        <br /> We’ve Got You Covered
      </div>

      <div className="subTitle">
        Explore answers about destinations, stays, itineraries, and services,
        everything you need to know before setting off on your next NPGO
        experience.
      </div>

      <div className="faqs">
        {faqs.map((faq, i) => {
          const isActive = activeIndex === i;

          return (
            <div
              key={i}
              className={`faq ${isActive ? "active" : ""}`}
              onClick={() => toggleFAQ(i)}
            >
              <div className="faqTop">
                <div className="question">{faq.question}</div>

                <img src={add} alt="toggle" className="icon" />
              </div>

              <div className="answerWrapper">
                <div className="answer">{faq.answer}</div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default HomeFAQ;