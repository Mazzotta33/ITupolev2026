import React from 'react';

interface Sponsor {
  id: number;
  name: string;
  logoUrl: string;
}

const SPONSORS_DATA: Sponsor[] = [
  { id: 1, name: 'Apex', logoUrl: '/apex.png' },
  { id: 2, name: 'Baklazhan', logoUrl: '/itpark.png' },
  { id: 3, name: 'Digital Kai', logoUrl: '/digital_kai.png' },
  { id: 4, name: 'Parnas IT', logoUrl: '/kai.png' },
  { id: 5, name: 'SimbirSoft', logoUrl: '/baklazhan.png' },
  { id: 6, name: 'Kai', logoUrl: '/parnas.png' },
  { id: 7, name: 'It Park', logoUrl: '/simbir.png' },
];

const SponsorsHeader: React.FC = () => {
  return (
    <header className="
      absolute top-0 left-0 z-10 
      w-full 
      
      flex flex-wrap justify-center items-center gap-y-6 gap-x-8 px-4 py-6
      md:flex-nowrap md:justify-between md:px-16 md:py-8 md:gap-y-0
    ">
      {SPONSORS_DATA.map((sponsor) => (
        <img 
          key={sponsor.id} 
          src={sponsor.logoUrl} 
          alt={sponsor.name} 
          className="
            pointer-events-auto 
            object-contain 
            h-7 w-auto
            md:h-12 lg:h-16 md:w-auto
          " 
        />
      ))}
    </header>
  );
};

export default SponsorsHeader;