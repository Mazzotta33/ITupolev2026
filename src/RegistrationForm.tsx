import React, { useState, type ChangeEvent, type FormEvent } from "react";

const CONSENT_URL = "https://storage.yandexcloud.net/storagevideo/tic2026_%D1%81%D0%BE%D0%B3%D0%BB%D0%B0%D1%81%D0%B8%D0%B5_%D0%BD%D0%B0_%D0%BE%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D1%83_%D0%BF%D0%B5%D1%80%D1%81%D0%BE%D0%BD%D0%B0%D0%BB%D1%8C%D0%BD%D1%8B%D1%85_%D0%B4%D0%B0%D0%BD%D0%BD%D1%8B%D1%85.pdf"; 

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^(8|\+7)(\s|\(|-)?(\d{3})(\s|\)|-)?(\d{3})(\s|-)?(\d{2})(\s|-)?(\d{2})$/;

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

interface FieldErrors {
  email?: string;
  phoneNumber?: string;
  telegramName?: string;
}

const STYLES = {
  input: "w-full rounded-xl border bg-white/20 px-3 py-2 text-sm font-bold text-black placeholder-black/50 outline-none transition-all focus:bg-white/50 focus:ring-2",
  label: "ml-2 mb-0.5 block text-[10px] font-extrabold uppercase tracking-wider text-black/60", 
  checkboxWrapper: "flex cursor-pointer items-center justify-between rounded-xl border border-white/30 bg-white/20 p-2.5 transition-colors hover:bg-white/40",
  button: "mt-1 w-full rounded-xl bg-black py-3 text-base font-bold uppercase text-white shadow-lg transition-all hover:scale-[1.01] active:scale-[0.99] hover:bg-gray-900 disabled:opacity-50 disabled:scale-100 disabled:cursor-not-allowed",
  errorText: "ml-2 mt-1 text-[10px] font-bold text-red-700",
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

  const [isAgreed, setIsAgreed] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    
    let newValue: string | boolean = type === 'checkbox' ? checked : value;

    if (name === 'telegramName' && typeof newValue === 'string') {
      // Гарантируем, что строка всегда начинается с @
      if (!newValue.startsWith('@')) {
        newValue = '@' + newValue.replace(/^@+/, '');
      }
    }

    if (name === 'email' || name === 'phoneNumber') {
        setFieldErrors(prev => ({ ...prev, [name]: undefined }));
    }

    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }));
  };

  const handleTgKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const input = e.currentTarget;
    if (
      (e.key === 'Backspace' && input.selectionStart === 1 && input.selectionEnd === 1) ||
      (e.key === 'Backspace' && input.selectionStart === 0 && input.selectionEnd === 1)
    ) {
      e.preventDefault();
    }
  };

  const validateForm = (): boolean => {
    const errors: FieldErrors = {};
    let isValid = true;

    if (!EMAIL_REGEX.test(formData.email)) {
        errors.email = "Некорректный email адрес";
        isValid = false;
    }

    if (!PHONE_REGEX.test(formData.phoneNumber)) {
        errors.phoneNumber = "Формат: +7 (999) 000-00-00 или 8...";
        isValid = false;
    }

    if (formData.telegramName.trim() === "@") {
      errors.telegramName = "Введите никнейм";
      isValid = false;
    }

    setFieldErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!isAgreed) return;
    if (!validateForm()) return;

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

  const getInputClass = (hasError: boolean) => {
    const borderColor = hasError ? "border-red-500 focus:border-red-600 focus:ring-red-200" : "border-white/40 focus:border-black/20 focus:ring-black/10";
    return `${STYLES.input} ${borderColor}`;
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
    <div className="relative z-20 mx-4 w-full max-w-lg rounded-[30px] border border-white/30 bg-white/20 p-5 mt-10 md:p-6 shadow-2xl backdrop-blur-[30px] backdrop-saturate-150 animate-in fade-in zoom-in duration-300 overflow-y-auto max-h-[80vh]">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-xl font-black uppercase text-black">Анкета</h2>
        <button onClick={onClose} disabled={isLoading} className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border border-black/20 bg-white/30 hover:bg-black hover:text-white transition-colors disabled:opacity-50">✕</button>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-2.5">
        
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div>
            <label className={STYLES.label}>Фамилия</label>
            <input name="surname" type="text" placeholder="Иванов" value={formData.surname} onChange={handleChange} className={getInputClass(false)} required disabled={isLoading} />
          </div>
          <div>
            <label className={STYLES.label}>Имя</label>
            <input name="name" type="text" placeholder="Иван" value={formData.name} onChange={handleChange} className={getInputClass(false)} required disabled={isLoading} />
          </div>
          <div>
            <label className={STYLES.label}>Отчество</label>
            <input name="patronymic" type="text" placeholder="Иванович" value={formData.patronymic} onChange={handleChange} className={getInputClass(false)} disabled={isLoading} />
          </div>
        </div>

        <div><label className={STYLES.label}>Организация / ВУЗ</label><input name="organization" type="text" placeholder="КНИТУ-КАИ им. А.Н.Туполева" value={formData.organization} onChange={handleChange} className={getInputClass(false)} required disabled={isLoading} /></div>
        
        <div className="grid grid-cols-2 gap-3">
          <div>
              <label className={STYLES.label}>Email</label>
              <input 
                  name="email" 
                  type="email" 
                  placeholder="mail@..." 
                  value={formData.email} 
                  onChange={handleChange} 
                  className={getInputClass(!!fieldErrors.email)} 
                  required 
                  disabled={isLoading} 
              />
              {fieldErrors.email && <p className={STYLES.errorText}>{fieldErrors.email}</p>}
          </div>
          <div>
              <label className={STYLES.label}>Телефон</label>
              <input 
                  name="phoneNumber" 
                  type="tel" 
                  placeholder="+7..." 
                  value={formData.phoneNumber} 
                  onChange={handleChange} 
                  className={getInputClass(!!fieldErrors.phoneNumber)} 
                  required 
                  disabled={isLoading} 
              />
              {fieldErrors.phoneNumber && <p className={STYLES.errorText}>{fieldErrors.phoneNumber}</p>}
          </div>
        </div>
        
        <div>
          <label className={STYLES.label}>Telegram</label>
          <input 
            name="telegramName" 
            type="text" 
            value={formData.telegramName} 
            onChange={handleChange} 
            onKeyDown={handleTgKeyDown} // Добавлена блокировка Backspace
            className={getInputClass(!!fieldErrors.telegramName)} 
            required 
            disabled={isLoading} 
          />
          {fieldErrors.telegramName && <p className={STYLES.errorText}>{fieldErrors.telegramName}</p>}
        </div>

        <div className="my-1 h-px w-full bg-black/10" />

        <div className="rounded-2xl border border-white/30 bg-white/10 p-3">
          <div className="mb-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
            <label className={STYLES.checkboxWrapper}><span className="text-xs font-bold text-black">🔍 Ищу команду</span><input name="searchingCommand" type="checkbox" checked={formData.searchingCommand} onChange={handleChange} disabled={isLoading} className="h-4 w-4 accent-black" /></label>
            <label className={`flex cursor-pointer items-center justify-between rounded-xl border border-white/30 p-2.5 transition-colors ${formData.searchingCommand ? 'opacity-50 cursor-not-allowed bg-gray-100/10' : 'bg-white/20 hover:bg-white/40'}`}><span className="text-xs font-bold text-black">⭐ Я капитан</span><input name="teamLead" type="checkbox" checked={formData.teamLead} onChange={handleChange} disabled={formData.searchingCommand || isLoading} className="h-4 w-4 accent-black" /></label>
          </div>
          <div className={`transition-all duration-300 ${formData.searchingCommand ? 'opacity-40 grayscale' : 'opacity-100'}`}><label className={STYLES.label}>Название команды {formData.searchingCommand && "(не требуется)"}</label><input name="teamName" type="text" placeholder={formData.searchingCommand ? "..." : "RocketTeam"} value={formData.teamName} onChange={handleChange} disabled={formData.searchingCommand || isLoading} className={getInputClass(false)} /></div>
        </div>

        <div className="mt-1 flex items-start gap-2.5 px-1">
          <input 
            id="consent-checkbox"
            type="checkbox" 
            checked={isAgreed} 
            onChange={(e) => setIsAgreed(e.target.checked)}
            disabled={isLoading}
            className="mt-0.5 h-4 w-4 min-w-[16px] cursor-pointer accent-black" 
          />
          <label htmlFor="consent-checkbox" className="cursor-pointer text-xs font-bold leading-tight text-black/70">
            Я даю согласие на{' '}
            <a 
              href={CONSENT_URL} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="border-b border-black/40 text-black transition-colors hover:border-black"
              onClick={(e) => e.stopPropagation()}
            >
              обработку персональных данных
            </a>
          </label>
        </div>

        <button 
          type="submit" 
          disabled={isLoading || !isAgreed} 
          className={STYLES.button}
        >
          {isLoading ? 'Отправка...' : 'Зарегистрироваться'}
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;