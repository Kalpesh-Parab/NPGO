import './homeFAQ.scss';
import { useState } from 'react';
import add from '../../../../assets/add.svg';

const HomeFAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: 'How can I book a tour with NPGO?',
      answer:
        'You can book a tour with NPGO by contacting our team through the website inquiry form or directly via our official communication channels. Once we understand your travel requirements, our team will curate a suitable itinerary and guide you through the booking process step by step.',
    },
    {
      question: 'Can I customize my travel package?',
      answer:
        'Yes, all NPGO travel packages can be customized based on your preferences. Whether it is destinations, duration, accommodation type, activities, or travel pace, our team works closely with you to design a personalized itinerary that aligns with your expectations.',
    },
    {
      question: 'Do you offer group discounts?',
      answer:
        'NPGO offers special pricing and benefits for group bookings. Discounts and inclusions depend on the group size, destination, and travel duration. Please reach out to our team with your group details for a customized quotation.',
    },
    {
      question: 'What payment methods do you accept?',
      answer:
        'We accept multiple payment methods including bank transfers, UPI, and other secure digital payment options. Payment details and instructions are shared clearly during the booking confirmation process to ensure a safe and transparent transaction.',
    },
    {
      question: 'Is a deposit required to confirm booking?',
      answer:
        'Yes, a partial deposit is required to confirm your booking with NPGO. The deposit amount varies depending on the destination, services included, and travel dates. Our team will communicate the exact amount and payment timeline during confirmation.',
    },
    {
      question: 'What is your cancellation and refund policy?',
      answer:
        'Our cancellation and refund policy depends on the destination, services booked, and third-party vendor terms. Cancellation details, timelines, and applicable refunds are clearly outlined at the time of booking to ensure complete transparency.',
    },
  ];

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
              className={`faq ${isActive ? 'active' : ''}`}
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
