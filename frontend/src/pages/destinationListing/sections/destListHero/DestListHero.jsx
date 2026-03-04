import './destListHero.scss';

const DestListHero = ({
    title,
    subTitle,
  backgroundType = 'image', // 'image' | 'video'
  backgroundSrc,
}) => {
  return (
    <section className='DestListHero'>
      <div className='background'>
        {backgroundType === 'video' ? (
          <video src={backgroundSrc} autoPlay muted loop playsInline />
        ) : (
          <img src={backgroundSrc} alt='hero-background' />
        )}
      </div>

      {/* Dark Overlay */}
      <div className='overlay'></div>

      <div className='text'>
              <h1>{title}</h1>
              <h4>{subTitle}</h4>
      </div>
    </section>
  );
};

export default DestListHero;
