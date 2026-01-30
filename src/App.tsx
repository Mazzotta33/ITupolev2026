import { useState } from "react";
import LandingView from "./LandingView";
import RegistrationForm from "./RegistrationForm";
import SponsorsHeader from "./SponsorsHeader";

const App: React.FC = () => {
  const [view, setView] = useState<'landing' | 'register'>('landing');
  const bgImageUrl = '/bg.png'; 

  return (
    <main 
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-cover bg-center font-sans"
      style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2)), url(${bgImageUrl})` }}
    >
      <SponsorsHeader />

      {/* АДАПТИВНЫЙ ОТСТУП СВЕРХУ (mt):
         mt-32 (128px) на мобильных — т.к. логотипы в 2 ряда занимают место.
         md:mt-40 (160px) на десктопе — чтобы красиво отделить от больших логотипов.
      */}
      <div className="mt-32 md:mt-16 flex w-full justify-center px-4">
        {view === 'landing' ? (
          <LandingView onStart={() => setView('register')} />
        ) : (
          <RegistrationForm onClose={() => setView('landing')} />
        )}
      </div>

    </main>
  );
};

export default App;