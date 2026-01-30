import React from 'react';

interface Sponsor {
  id: number;
  name: string;
  logoUrl: string;
}

const SPONSORS_DATA: Sponsor[] = [
  { id: 1, name: 'Apex', logoUrl: '/apex.png' },
  { id: 2, name: 'Baklazhan', logoUrl: '/baklazhan.png' },
  { id: 3, name: 'Digital Kai', logoUrl: '/digital_kai.png' },
  { id: 4, name: 'Parnas IT', logoUrl: '/parnas.png' },
  { id: 5, name: 'SimbirSoft', logoUrl: '/simbir.png' },
  { id: 6, name: 'Kai', logoUrl: '/kai.png' },
];

const SponsorsHeader: React.FC = () => {
  return (
    <header className="
      absolute top-0 left-0 z-10 
      w-full 
      pointer-events-none 
      
      /* --- АДАПТИВНАЯ СЕТКА --- */
      /* Mobile: Grid (сетка), 3 колонки, отступы поменьше */
      grid grid-cols-3 items-center justify-items-center gap-y-4 gap-x-2 px-4 py-6
      
      /* Desktop (md): Flex, растянутый по ширине, большие отступы */
      md:flex md:justify-between md:px-16 md:py-8 md:gap-y-0
    ">
      {SPONSORS_DATA.map((sponsor) => (
        <img 
          key={sponsor.id} 
          src={sponsor.logoUrl} 
          alt={sponsor.name} 
          className="
            pointer-events-auto 
            object-contain 
            transition-opacity duration-300 opacity-80 hover:opacity-100
            
            /* --- РАЗМЕРЫ ЛОГОТИПОВ --- */
            /* Mobile: высота 8 (32px), макс. ширина, чтобы не наезжали */
            h-8 w-full max-w-[100px]
            
            /* Desktop: высота 20 (80px) или 24 (96px), авто ширина */
            md:h-16 md:w-auto md:max-w-none
          " 
        />
      ))}
    </header>
  );
};

export default SponsorsHeader;