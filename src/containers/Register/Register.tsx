import type { CountryCode } from 'libphonenumber-js';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  CountryIso2,
  CountrySelector,
  DialCodePreview,
  ParsedCountry,
  usePhoneInput,
} from 'react-international-phone';
import 'react-international-phone/style.css';

type FormValues = {
  phone: string;
  consent: boolean;
};

type Step = 'form' | 'role';
const FIXED_10: Record<string, true> = { kz: true, ru: true, us: true, ca: true };
const Register = () => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitted },
  } = useForm<FormValues>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: { phone: '', consent: false },
  });

  const [consent, setConsent] = useState(false);
  const [national, setNational] = useState('');
  const [step, setStep] = useState<Step>('form');
  const [isSending, setIsSending] = useState(false);
  const [role, setRole] = useState<'customer' | 'carrier' | null>(null);

  const { inputRef, country, setCountry } = usePhoneInput({
    defaultCountry: 'kz',
    forceDialCode: false,
  });

  const validateByCountry = (val: string) => {
    const nat = (val || '').replace(/\D/g, '');
    if (!nat) return 'Введите номер';

    const iso2 = country.iso2.toLowerCase();
    if (FIXED_10[iso2] && nat.length !== 10) {
      return 'Некорректный номер телефона';
    }

    const cc = iso2.toUpperCase() as CountryCode;
    const pn = parsePhoneNumberFromString(nat, cc);

    if (!pn?.isPossible()) return 'Некорректный номер телефона';
    if (!pn.isValid()) return 'Некорректный номер телефона';

    return true;
  };

  useEffect(() => {
    register('phone', { validate: validateByCountry });
    register('consent', { validate: v => v || 'Нужно согласие' });
  }, [register]);

  useEffect(() => {
    setValue('phone', national, { shouldValidate: isSubmitted });
  }, [country.dialCode]);

  const normalizeToNational = (raw: string, dialCode: string, iso2: string) => {
    const trimmed = (raw || '').trim();
    let d = trimmed.replace(/\D/g, '');
    const hadIntlPrefix = trimmed.startsWith('+') || trimmed.startsWith('00');
    if (hadIntlPrefix && dialCode && d.startsWith(dialCode)) d = d.slice(dialCode.length);
    if ((iso2 === 'kz' || iso2 === 'ru') && d.length >= 11 && d.startsWith('8')) d = d.slice(1);
    return d;
  };

  const onPhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const n = normalizeToNational(e.target.value, country.dialCode, country.iso2);
    setNational(n);
    setValue('phone', n, { shouldValidate: isSubmitted, shouldDirty: true });
  };

  const onPhonePaste: React.ClipboardEventHandler<HTMLInputElement> = e => {
    const text = e.clipboardData.getData('text');
    const n = normalizeToNational(text, country.dialCode, country.iso2);
    e.preventDefault();
    setNational(n);
    setValue('phone', n, { shouldValidate: isSubmitted, shouldDirty: true });
  };

  const handleConsentChange = (checked: boolean) => {
    setConsent(checked);
    setValue('consent', checked, { shouldValidate: isSubmitted, shouldDirty: true });
  };

  const phoneInputStyles = {
    inputClassName:
      '!p-3 !border-none !rounded-none !w-full focus:!ring-0 focus:!border-none !text-16 !font-light focus:!outline-none focus:!shadow-none',
    countrySelectorStyleProps: {
      className:
        '!border-none !rounded-none !bg-transparent !cursor-pointer focus:!ring-0 focus:!outline-none',
      buttonClassName:
        '!h-full !py-0 !px-3 !flex !items-center !border-none focus:!ring-0 focus:!outline-none',
      dropdownClassName: '!z-50',
    },
  };

  const onSubmit = (data: FormValues) => {
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setStep('role');
    }, 1200);
  };

  return (
    <div className=' sm:h-dvh grid xl:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 '>
      <div className='bg-primary pb-16 '>
        <div className='pt-24 px-16 h-full'>
          <div className='flex flex-col h-full justify-between'>
            <div>
              <img src='/src/assets/images/logo.svg' className='mb-5' />
              <p className='text-white font-semibold text-50 leading-110'>
                Добро пожаловать в личный кабинет для бизнеса!
              </p>
            </div>
            <img src='/src/assets/images/car.svg' className='h-24 w-24' />
          </div>
        </div>
        <div className='bg-white h-1'></div>
      </div>

      <div>
        <div className='pb-16 h-full'>
          <div className='pt-24 px-28 h-full'>
            {/* ШАГ 1: форма */}
            {step === 'form' && (
              <div className='flex flex-col h-full justify-between'>
                <div>
                  <h3 className='text-32 text-grey-charcoal leading-120 font-semibold  mb-2'>
                    Регистрация
                  </h3>
                  <p className='text-16 text-grey-charcoal-70 leading-120 font-light'>
                    Для входа в личный кабинет введите свой номер телефона, на него будет отправлено
                    SMS с проверочным кодом
                  </p>

                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div
                      className={`mt-8 flex p-2 border border-gray-300 rounded-xl focus-within:ring-2 focus-within:ring-blue-500 transition duration-150 ${
                        isSubmitted && errors.phone ? 'mb-0' : 'mb-8'
                      }`}
                    >
                      <CountrySelector
                        selectedCountry={country.iso2 as CountryIso2}
                        onSelect={(c: ParsedCountry) => {
                          setCountry(c.iso2 as CountryIso2);
                          setNational('');
                          setValue('phone', '', { shouldValidate: isSubmitted, shouldDirty: true });
                          inputRef.current?.focus();
                        }}
                        className={phoneInputStyles.countrySelectorStyleProps.className}
                        buttonClassName={phoneInputStyles.countrySelectorStyleProps.buttonClassName}
                      />
                      <DialCodePreview
                        dialCode={country.dialCode}
                        prefix='+'
                        className='!px-2 !border-none !text-16 !font-light'
                      />
                      <input
                        ref={inputRef}
                        value={national}
                        onChange={onPhoneChange}
                        onPaste={onPhonePaste}
                        placeholder='(000) 000-00-00'
                        className={phoneInputStyles.inputClassName}
                        inputMode='tel'
                        autoComplete='tel-national'
                        pattern='\d*'
                        aria-label='Номер телефона'
                      />
                    </div>

                    {isSubmitted && errors.phone && (
                      <p className='text-error text-sm mb-3'>{String(errors.phone.message)}</p>
                    )}

                    <label
                      htmlFor='consent'
                      className={`inline-flex items-center gap-2 select-none cursor-pointer mt-5 ${
                        isSubmitted && errors.consent ? 'mb-0' : 'mb-[23px]'
                      }`}
                    >
                      <input
                        id='consent'
                        name='consent'
                        type='checkbox'
                        required
                        checked={consent}
                        onChange={e => handleConsentChange(e.target.checked)}
                        className='h-[18px] w-[18px] mt-0.5'
                      />
                      <span className='text-14 text-grey-charcoal-70 leading-120 font-light mt-2'>
                        Согласен с{' '}
                        <a href='#' className='underline'>
                          политикой конфиденциальности
                        </a>
                      </span>
                    </label>

                    {isSubmitted && errors.consent && (
                      <p className='text-error text-sm mb-0'>{String(errors.consent.message)}</p>
                    )}

                    <button
                      type='submit'
                      disabled={isSending}
                      aria-disabled={isSending}
                      className='disabled:bg-disabled bg-primary text-white text-16 leading-120 font-ligh w-full mt-8 disabled:cursor-not-allowed'
                    >
                      {isSending ? 'Отправляем…' : 'войти'}
                    </button>
                  </form>
                </div>
                <img src='/src/assets/images/geo.svg' className='h-24 w-24 ml-auto' />
              </div>
            )}
            {/* ШАГ 2: выбор роли */}
            {step === 'role' && (
              <div className='flex flex-col h-full justify-between'>
                <>
                  <h3 className='text-32 text-grey-charcoal leading-120 font-semibold  mb-2'>
                    Регистрация
                  </h3>
                  <p className='text-16 text-grey-charcoal-70 leading-120 font-light'>
                    Выберите, как вы хотите использовать приложение
                  </p>

                  <div className='flex flex-col items-center-safe gap-4 mt-8'>
                    {/* Карточка Заказчик */}
                    <label
                      className={`border border-gray-300 rounded-xl p-4 cursor-pointer transition duration-150 max-w-[343px] ${
                        role === 'customer' ? 'ring-2 ring-blue-500' : ''
                      }`}
                    >
                      <input
                        type='radio'
                        name='role'
                        className='hidden'
                        checked={role === 'customer'}
                        onChange={() => setRole('customer')}
                      />
                      <div className='flex'>
                        <div>
                          <img src='/src/assets/images/bag.png' />
                          <p className='text-25 text-grey-charcoal font-semibold mb-1'>
                            как заказчик
                          </p>
                          <p className='text-14 text-grey-charcoal-40 font-light mb-1'>
                            Контролируйте выполнение заявок в реальном времени
                          </p>
                        </div>
                        <img src='/src/assets/images/img-client.png' />
                      </div>
                    </label>

                    {/* Карточка Перевозчик */}
                    <label
                      className={`border border-gray-300 rounded-xl p-4 cursor-pointer transition duration-150 max-w-[343px] ${
                        role === 'carrier' ? 'ring-2 ring-blue-500' : ''
                      }`}
                    >
                      <input
                        type='radio'
                        name='role'
                        className='hidden'
                        checked={role === 'carrier'}
                        onChange={() => setRole('carrier')}
                      />
                      <div className='flex'>
                        <div>
                          <img src='/src/assets/images/truck.png' />
                          <p className='text-25 text-grey-charcoal font-semibold mb-1'>
                            как перевозчик
                          </p>
                          <p className='text-14 text-grey-charcoal-40 font-light mb-1'>
                            Получайте актуальную информацию о своих перевозках
                          </p>
                        </div>
                        <img src='/src/assets/images/img-carrier.png' />
                      </div>
                    </label>
                  </div>

                  <button
                    type='button'
                    disabled={!role}
                    aria-disabled={!role}
                    onClick={() => {
                      console.log('chosen role:', role);
                    }}
                    className='disabled:bg-disabled bg-primary text-white text-16 leading-120 font-ligh w-full mt-8 disabled:cursor-not-allowed'
                  >
                    Продолжить
                  </button>
                </>
                <img src='/src/assets/images/geo.svg' className='h-[72px] w-[72px] ml-auto' />
              </div>
            )}
          </div>
          <div className='bg-primary h-1'></div>
        </div>
      </div>
    </div>
  );
};

export default Register;
