import './entityCard.scss';
import { useEffect, useRef, useState } from 'react';
import { INDIA_PATHS } from '../data/IndiaPath';
import { WORLD_PATHS } from '../data/worldPath';

const EntityCard = ({
  item,
  onToggle,
  onClick,
  isSelected,
  mapType = 'india',
  isParentActive = true,
}) => {
  const PATH_MAP = mapType === 'world' ? WORLD_PATHS : INDIA_PATHS;

  // 🔥 normalize code (important for world map)
  const code = item.code?.toUpperCase();

  const pathData = PATH_MAP[code];
  const pathRef = useRef(null);
  const [transform, setTransform] = useState('');

  useEffect(() => {
    if (!pathRef.current || !pathData) return;

    // 🔥 Delay to ensure DOM ready (important)
    requestAnimationFrame(() => {
      try {
        const bbox = pathRef.current.getBBox();

        if (!bbox.width || !bbox.height) return;

        const size = 100;

        const baseScale = Math.min(size / bbox.width, size / bbox.height);

        // 🔥 cap scaling (THIS IS THE MAGIC)
        const scale = Math.min(baseScale * 0.55, 1.8);

        const centerX = bbox.x + bbox.width / 2;
        const centerY = bbox.y + bbox.height / 2;

        const translateX = size / 2 - centerX * scale;
        const translateY = size / 2 - centerY * scale;

        setTransform(`translate(${translateX}, ${translateY}) scale(${scale})`);
      } catch (err) {
        console.log('BBox error:', err);
      }
    });
  }, [pathData]);

  return (
    <div
      className={`entity-card 
        ${isSelected ? 'selected' : ''} 
        ${!isParentActive ? 'disabled' : ''}
      `}
      onClick={onClick}
    >
      {/* 🔥 MAP PREVIEW */}
      <div className='map-preview'>
        {pathData ? (
          <svg viewBox='0 0 100 100'>
            <g transform={transform}>
              <path
                ref={pathRef}
                d={pathData}
                className={item.isActive ? 'active' : 'inactive'}
              />
            </g>
          </svg>
        ) : (
          <span className='fallback'>{code || item.name?.slice(0, 2)}</span>
        )}
      </div>

      <div className='info'>
        {/* 🔥 NAME */}
        <div className='top'>
          <h3>{item.name}</h3>
        </div>

        {/* 🔥 TOGGLE */}
        <div className='bottom'>
          <button
            className={item.isActive ? 'active' : 'inactive'}
            disabled={!isParentActive}
            onClick={(e) => {
              e.stopPropagation();
              if (!isParentActive) return;
              onToggle(item);
            }}
          >
            {item.isActive ? 'Active' : 'Inactive'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EntityCard;
