import { useEffect, useRef, useState } from 'react';
import { INDIA_PATHS } from '../data/IndiaPath';
import { WORLD_PATHS } from '../data/worldPath';

const SingleStatePreview = ({ entity, mode = 'domestic' }) => {
  const pathRef = useRef(null);
  const [transform, setTransform] = useState('');

  if (!entity) return null;

  let pathD = null;

  if (mode === 'domestic') {
    pathD = INDIA_PATHS[entity.code?.toUpperCase()];
  } else {
    pathD = WORLD_PATHS[entity.code?.toUpperCase()];
  }

  if (!pathD) {
    console.error('❌ PATH NOT FOUND:', entity.code);
    return <p>❌ No SVG found</p>;
  }

  // 🔥 Detect video
  const isVideo =
    entity.mediaType === 'video' ||
    entity.media?.toLowerCase().includes('.mp4');

  // 🔥 Calculate proper centering + scaling
  useEffect(() => {
    if (pathRef.current) {
      const bbox = pathRef.current.getBBox();

      const svgSize = 300;
      const padding = 20;

      let scale = Math.min(
        (svgSize - padding) / bbox.width,
        (svgSize - padding) / bbox.height,
      );

      // 🔥 FIX 1: Prevent over-scaling for tiny states
      const MAX_SCALE = 8; // tweak if needed
      scale = Math.min(scale, MAX_SCALE);

      // 🔥 FIX 2: Handle extremely tiny paths
      const MIN_SIZE = 10;
      if (bbox.width < MIN_SIZE || bbox.height < MIN_SIZE) {
        scale = 6; // controlled zoom instead of explosion
      }

      const translateX = (svgSize - bbox.width * scale) / 2 - bbox.x * scale;

      const translateY = (svgSize - bbox.height * scale) / 2 - bbox.y * scale;

      setTransform(`translate(${translateX}, ${translateY}) scale(${scale})`);
    }
  }, [pathD]);

  return (
    <div
      style={{
        width: '100%',
        height: '300px',
        background: '#000',
        borderRadius: '12px',
        overflow: 'hidden',
      }}
    >
      <svg viewBox='0 0 300 300' width='100%' height='100%'>
        <defs>
          <clipPath id='stateClip'>
            <path ref={pathRef} d={pathD} transform={transform} />
          </clipPath>
        </defs>

        {/* MEDIA */}
        {entity.media && (
          <foreignObject
            x='0'
            y='0'
            width='100%'
            height='100%'
            clipPath='url(#stateClip)'
          >
            {isVideo ? (
              <video
                src={entity.media}
                autoPlay
                muted
                loop
                playsInline
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            ) : (
              <img
                src={entity.media}
                alt=''
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            )}
          </foreignObject>
        )}

        {/* BORDER */}
        <path
          d={pathD}
          transform={transform}
          fill='none'
          stroke='white'
          strokeWidth='2'
        />
      </svg>
    </div>
  );
};

export default SingleStatePreview;
