interface LandingViewProps {
  onStart: () => void;
}

const LandingView: React.FC<LandingViewProps> = ({ onStart }) => {
  return (
    <div 
      onClick={onStart}
      className="
        relative z-0 mx-4 cursor-pointer 
        w-full max-w-3xl          /* <-- СУЗИЛИ (было max-w-5xl) */
        rounded-[40px] 
        border border-white/30 bg-white/0 
        p-8 md:p-12               /* <-- УМЕНЬШИЛИ ОТСТУПЫ */
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
        
        {/* Уменьшили гигантский шрифт заголовка */}
        <h1 className="mb-6 text-5xl font-black leading-[0.9] text-black uppercase md:text-7xl lg:text-8xl">
          Tupolev IT <br /> Challenge
        </h1>
        
        <p className="text-xl font-extrabold text-black md:text-3xl tracking-wider">
          регистрация открыта
        </p>
        
        <p className="mt-6 text-xs font-semibold uppercase tracking-widest text-black/60 animate-pulse">
          Нажмите, чтобы подать заявку
        </p>
      </div>
    </div>
  );
};

export default LandingView;