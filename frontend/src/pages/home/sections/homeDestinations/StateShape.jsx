import { useEffect, useRef, useState } from 'react';

const StateShape = ({ pathD, media, mediaType, clipId }) => {
  const pathRef = useRef(null);
  const videoRef = useRef(null);

  const [transform, setTransform] = useState('');
  const [isHovered, setIsHovered] = useState(false);

  // 🔥 SCALE + CENTER
  useEffect(() => {
    if (!pathRef.current) return;

    const bbox = pathRef.current.getBBox();

    const svgSize = 300;
    const padding = 20;

    const scale = Math.min(
      (svgSize - padding) / bbox.width,
      (svgSize - padding) / bbox.height,
    );

    const translateX = (svgSize - bbox.width * scale) / 2 - bbox.x * scale;

    const translateY = (svgSize - bbox.height * scale) / 2 - bbox.y * scale;

    setTransform(`translate(${translateX}, ${translateY}) scale(${scale})`);
  }, [pathD]);

  // 🔥 VIDEO CONTROL (MAIN FIX)
  useEffect(() => {
    if (!videoRef.current) return;

    if (isHovered) {
      videoRef.current.play().catch(() => {});
    } else {
      videoRef.current.pause();
    //   videoRef.current.currentTime = 0; // optional reset
    }
  }, [isHovered]);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <svg viewBox='0 0 300 300'>
        <defs>
          <clipPath id={clipId}>
            <path ref={pathRef} d={pathD} transform={transform} />
          </clipPath>
        </defs>

        {/* 🔥 MEDIA */}
        <foreignObject
          x='0'
          y='0'
          width='100%'
          height='100%'
          clipPath={`url(#${clipId})`}
          className='media'
        >
          {mediaType === 'video' ? (
            <video
              ref={videoRef}
              src={media}
              muted
              loop
              playsInline
              preload='metadata'
            />
          ) : (
            <img src={media} alt='' />
          )}
        </foreignObject>

        {/* 🔥 SHAPE */}
        <path
          d={pathD}
          transform={transform}
          fill='rgba(255,255,255,0.05)'
          stroke='white'
          strokeWidth='.3'
        />
      </svg>
    </div>
  );
};

export default StateShape;
