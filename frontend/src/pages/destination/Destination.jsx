import React from 'react';
import DestHero from './sections/destHero/DestHero';
import DestSelector from './sections/destSelector/DestSelector';
import DestMemories from './sections/destMemories/DestMemories';

const Destination = () => {
  return (
    <>
      <DestHero />
      <DestSelector />
      <DestMemories/>
    </>
  );
};

export default Destination;
