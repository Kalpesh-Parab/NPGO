import React from 'react';
import DestHero from './sections/destHero/DestHero';
import DestSelector from './sections/destSelector/DestSelector';
import DestMemories from './sections/destMemories/DestMemories';
import DestExplore from './sections/destExplore/DestExplore';
import DestIntExplore from './sections/destIntExplore/DestIntExplore';

const Destination = () => {
  return (
    <>
      <DestHero />
      <DestSelector />
      <DestMemories />
      <DestExplore />
      <DestIntExplore/>
    </>
  );
};

export default Destination;
