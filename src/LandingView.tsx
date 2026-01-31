import React from 'react';

const REGULATIONS_URL = "https://storage.yandexcloud.net/storagevideo/%D0%BF%D0%BE%D0%BB%D0%BE%D0%B6%D0%B5%D0%BD%D0%B8%D0%B5_%D0%B1%D0%B5%D0%B7_%D0%BA%D0%B5%D0%B9%D1%81%D0%BE%D0%B2.pdf";

interface LandingViewProps {
  onStart: () => void;
}

const LandingView: React.FC<LandingViewProps> = ({ onStart }) => {
  return (
    <div 
      onClick={onStart}
      className="
        relative z-0 mx-4 cursor-pointer 
        w-full max-w-3xl 
        rounded-[40px] 
        border border-white/30 bg-white/0 
        p-8 md:p-12 
        text-center shadow-2xl 
        backdrop-blur-[10px] backdrop-saturate-150 
        transition-all duration-500 ease-out 
        hover:scale-[1.02] hover:bg-white/5 active:scale-[0.98]
      "
    >
      <div className="pointer-events-none absolute -left-20 -top-20 h-56 w-56 rounded-full bg-white/20 blur-3xl overflow-hidden" />
      
      <div className="relative z-10 flex flex-col items-center pointer-events-none">
        <span className="mb-4 text-sm font-bold tracking-[0.25em] text-black uppercase md:text-base">
          Itupolev
        </span>
        
        <h1 className="mb-6 text-5xl font-black leading-[0.9] text-black uppercase md:text-7xl lg:text-8xl">
          Tupolev IT <br /> Challenge
        </h1>
        
        <p className="text-xl font-extrabold text-black md:text-3xl tracking-wider">
          регистрация открыта
        </p>
        
        <p className="mt-6 text-xs font-semibold uppercase tracking-widest text-black/60 animate-pulse">
          Нажмите, чтобы подать заявку
        </p>

        <a 
          href={REGULATIONS_URL}
          target="_blank" 
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()} 
          className="
            pointer-events-auto
            mt-10
            border-b border-black/20 
            pb-0.5 
            text-[10px] font-bold uppercase tracking-widest text-black/40 
            transition-colors hover:border-black hover:text-black
          "
        >
          Положение о хакатоне
        </a>
      </div>

      <div className="
        absolute bottom-6 right-8 md:bottom-8 md:right-10
        text-right pointer-events-none
        flex flex-col gap-0.5
      ">
        <p className="text-[10px] md:text-xs font-black uppercase tracking-tighter text-black">
          21-24 февраля
        </p>
        <p className="text-[8px] md:text-[10px] font-bold uppercase tracking-tight text-black/50 leading-none">
          IT-парк, ул. Петербургская, 52
        </p>
      </div>
    </div>
  );
};

export default LandingView;