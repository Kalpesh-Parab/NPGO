import { INDIA_PATHS } from '../data/IndiaPath';
import { WORLD_PATHS } from '../data/worldPath';

const SingleStatePreview = ({ entity, mode = 'domestic' }) => {
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

  // 🔥 FIX: detect video properly
  const isVideo =
    entity.mediaType === 'video' ||
    entity.media?.toLowerCase().includes('.mp4');

  return (
    <div
      style={{
        width: '100%',
        height: '300px',
        background: '#000', // ✅ BLACK BG
        borderRadius: '12px',
        overflow: 'hidden',
      }}
    >
      <svg
        viewBox='0 0 300 300'
        style={{
          width: '100%',
            height: '100%',
        }}
      >
        <defs>
          <clipPath id='stateClip'>
            <path d={pathD} transform='scale(0.4) translate(200, 100)' />
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
          transform='scale(0.4) translate(200, 100)'
          fill='none'
          stroke='white'
          strokeWidth='2'
        />
      </svg>
    </div>
  );
};

export default SingleStatePreview;
