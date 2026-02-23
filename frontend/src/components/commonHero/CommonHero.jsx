import './commonHero.scss';

const CommonHero = ({
  title,
  backgroundType = 'image', // 'image' | 'video'
  backgroundSrc,
}) => {
  return (
    <section className='CommonHero'>
      <div className='background'>
        {backgroundType === 'video' ? (
          <video
            src={backgroundSrc}
            autoPlay
            muted
            loop
            playsInline
          />
        ) : (
          <img src={backgroundSrc} alt='hero-background' />
        )}
      </div>

      {/* Dark Overlay */}
      <div className='overlay'></div>

      <div className='text'>
        <h1>{title}</h1>
      </div>
    </section>
  );
};

export default CommonHero;