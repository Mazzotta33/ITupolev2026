import React, { useState, type ChangeEvent, type FormEvent } from "react";

interface RegistrationFormProps {
  onClose: () => void;
}

interface RegistrationData {
  name: string;
  surname: string;
  patronymic: string;
  email: string;
  teamLead: boolean;
  searchingCommand: boolean;
  organization: string;
  teamName: string;
  telegramName: string;
  phoneNumber: string;
}

const STYLES = {
  input: "w-full rounded-xl border border-white/40 bg-white/20 px-3 py-2 text-sm font-bold text-black placeholder-black/50 outline-none transition-all focus:bg-white/50 focus:border-black/20 focus:ring-2 focus:ring-black/10",
  label: "ml-2 mb-0.5 block text-[10px] font-extrabold uppercase tracking-wider text-black/60", 
  checkboxWrapper: "flex cursor-pointer items-center justify-between rounded-xl border border-white/30 bg-white/20 p-2.5 transition-colors hover:bg-white/40",
  button: "mt-1 w-full rounded-xl bg-black py-3 text-base font-bold uppercase text-white shadow-lg transition-all hover:scale-[1.01] active:scale-[0.99] hover:bg-gray-900",
};

const RegistrationForm: React.FC<RegistrationFormProps> = ({ onClose }) => {
  const [formData, setFormData] = useState<RegistrationData>({
    name: "", 
    surname: "", 
    patronymic: "",
    email: "", 
    teamLead: false, 
    searchingCommand: false, 
    organization: "", 
    teamName: "", 
    telegramName: "", 
    phoneNumber: ""
  });

  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    try {
      const response = await fetch('http://localhost:8080/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
      } else {
        try {
          const errorData = await response.json();
          setErrorMessage(errorData.message || "Ошибка при регистрации");
        } catch (jsonError) {
          const text = await response.text();
          setErrorMessage(text || `Ошибка сервера: ${response.status}`);
        }
        setStatus('error');
      }
    } catch (error) {
      console.error("Ошибка сети:", error);
      setErrorMessage("Нет соединения с сервером.");
      setStatus('error');
    } finally {
      setIsLoading(false);
    }
  };

  if (status === 'success') {
    return (
      <div className="relative z-20 mx-4 w-full max-w-lg rounded-[30px] border border-white/30 bg-white/20 p-8 shadow-2xl backdrop-blur-[30px] backdrop-saturate-150 animate-in fade-in zoom-in duration-300">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-400/20 border border-green-400/30">
            <svg className="h-10 w-10 text-green-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-3xl font-black uppercase text-black mb-2">Поздравляем!</h2>
          <p className="text-sm font-bold text-black/60 mb-8">Вы успешно зарегистрировались.</p>
          <button onClick={onClose} className={STYLES.button}>Отлично</button>
        </div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="relative z-20 mx-4 w-full max-w-lg rounded-[30px] border border-white/30 bg-white/20 p-8 shadow-2xl backdrop-blur-[30px] backdrop-saturate-150 animate-in fade-in zoom-in duration-300">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-400/20 border border-red-400/30">
            <svg className="h-10 w-10 text-red-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h2 className="text-3xl font-black uppercase text-black mb-2">Ошибка!</h2>
          <p className="text-sm font-bold text-black/60 mb-4">Не удалось отправить данные.</p>
          <div className="mb-8 w-full rounded-xl bg-red-500/10 border border-red-500/20 p-3">
             <p className="text-xs font-bold text-red-900 break-words">{errorMessage}</p>
          </div>
          <div className="flex w-full gap-3">
             <button onClick={onClose} className="w-full rounded-xl border border-black/10 bg-white/20 py-3 text-sm font-bold uppercase text-black hover:bg-white/40 transition-colors">Закрыть</button>
             <button onClick={() => setStatus('idle')} className={STYLES.button}>Исправить</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative z-20 mx-4 w-full max-w-lg rounded-[30px] border border-white/30 bg-white/20 p-5 md:p-6 shadow-2xl backdrop-blur-[30px] backdrop-saturate-150 animate-in fade-in zoom-in duration-300 overflow-y-auto max-h-[80vh]">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-xl font-black uppercase text-black">Анкета</h2>
        <button onClick={onClose} disabled={isLoading} className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border border-black/20 bg-white/30 hover:bg-black hover:text-white transition-colors disabled:opacity-50">✕</button>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-2.5">
        
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div>
            <label className={STYLES.label}>Имя</label>
            <input name="name" type="text" placeholder="Иван" value={formData.name} onChange={handleChange} className={STYLES.input} required disabled={isLoading} />
          </div>
          <div>
            <label className={STYLES.label}>Отчество</label>
            <input name="patronymic" type="text" placeholder="Иванович" value={formData.patronymic} onChange={handleChange} className={STYLES.input} disabled={isLoading} />
          </div>
          <div>
            <label className={STYLES.label}>Фамилия</label>
            <input name="surname" type="text" placeholder="Иванов" value={formData.surname} onChange={handleChange} className={STYLES.input} required disabled={isLoading} />
          </div>
        </div>

        <div><label className={STYLES.label}>Организация / ВУЗ</label><input name="organization" type="text" placeholder="МГТУ им. Баумана" value={formData.organization} onChange={handleChange} className={STYLES.input} required disabled={isLoading} /></div>
        
        <div className="grid grid-cols-2 gap-3">
          <div><label className={STYLES.label}>Email</label><input name="email" type="email" placeholder="mail@..." value={formData.email} onChange={handleChange} className={STYLES.input} required disabled={isLoading} /></div>
          <div><label className={STYLES.label}>Телефон</label><input name="phoneNumber" type="tel" placeholder="+7..." value={formData.phoneNumber} onChange={handleChange} className={STYLES.input} required disabled={isLoading} /></div>
        </div>
        
        <div><label className={STYLES.label}>Telegram</label><input name="telegramName" type="text" placeholder="@tag" value={formData.telegramName} onChange={handleChange} className={STYLES.input} required disabled={isLoading} /></div>
        
        <div className="my-1 h-px w-full bg-black/10" />

        <div className="rounded-2xl border border-white/30 bg-white/10 p-3">
          <div className="mb-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
            <label className={STYLES.checkboxWrapper}><span className="text-xs font-bold text-black">🔍 Ищу команду</span><input name="searchingCommand" type="checkbox" checked={formData.searchingCommand} onChange={handleChange} disabled={isLoading} className="h-4 w-4 accent-black" /></label>
            <label className={`flex cursor-pointer items-center justify-between rounded-xl border border-white/30 p-2.5 transition-colors ${formData.searchingCommand ? 'opacity-50 cursor-not-allowed bg-gray-100/10' : 'bg-white/20 hover:bg-white/40'}`}><span className="text-xs font-bold text-black">⭐ Я капитан</span><input name="teamLead" type="checkbox" checked={formData.teamLead} onChange={handleChange} disabled={formData.searchingCommand || isLoading} className="h-4 w-4 accent-black" /></label>
          </div>
          <div className={`transition-all duration-300 ${formData.searchingCommand ? 'opacity-40 grayscale' : 'opacity-100'}`}><label className={STYLES.label}>Название команды {formData.searchingCommand && "(не требуется)"}</label><input name="teamName" type="text" placeholder={formData.searchingCommand ? "..." : "RocketTeam"} value={formData.teamName} onChange={handleChange} disabled={formData.searchingCommand || isLoading} className={STYLES.input} /></div>
        </div>

        <button type="submit" disabled={isLoading} className={`${STYLES.button} ${isLoading ? 'opacity-70 cursor-wait' : ''}`}>{isLoading ? 'Отправка...' : 'Зарегистрироваться'}</button>
      </form>
    </div>
  );
};

export default RegistrationForm;