import PhoneField from '@/components/PhoneField';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

type FormValues = { phone: string; consent: boolean };
type Props = { onDone: (payload: { phoneNational: string }) => void };
type Meta = { iso2: string; dialCode: string };

const StepPhoneForm = ({ onDone }: Props) => {
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

  useEffect(() => {
    register('consent', { validate: v => v || 'Нужно согласие' });
  }, [register]);

  const [consent, setConsent] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [meta, setMeta] = useState<Meta>({ iso2: 'kz', dialCode: '7' });

  const onSubmit = (data: FormValues) => {
    const phoneNational = data.phone.replace(/\D/g, '');
    try {
      localStorage.setItem('register.phone', phoneNational);
      localStorage.setItem('register.iso2', meta.iso2);
      localStorage.setItem('register.dial', meta.dialCode);
      localStorage.setItem('register.step', 'role');
    } catch {}
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      onDone({ phoneNational });
    }, 1200);
  };

  return (
    <div className='flex flex-col h-full justify-between'>
      <div>
        <h3 className='text-32 text-grey-charcoal leading-120 font-semibold  mb-2'>Регистрация</h3>
        <p className='text-16 text-grey-charcoal-70 leading-120 font-light'>
          Для входа в личный кабинет введите свой номер телефона, на него будет отправлено SMS с
          проверочным кодом
        </p>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <PhoneField
            register={(name, opts) => register(name, opts)}
            setValue={setValue as any}
            isSubmitted={isSubmitted}
            error={errors.phone && String(errors.phone.message)}
            onMetaChange={m =>
              setMeta(prev => (prev.iso2 === m.iso2 && prev.dialCode === m.dialCode ? prev : m))
            }
          />

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
              onChange={e => {
                setConsent(e.target.checked);
                setValue('consent', e.target.checked, {
                  shouldValidate: isSubmitted,
                  shouldDirty: true,
                });
              }}
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
            className='disabled:bg-disabled bg-primary text-white text-16 leading-120 font-ligh w-full disabled:cursor-not-allowed mt-8 py-2.5 px-8'
          >
            {isSending ? 'Отправляем…' : 'войти'}
          </button>
        </form>
      </div>

      <img src='/src/assets/images/geo.svg' className='h-24 w-24 ml-auto' />
    </div>
  );
};

export default StepPhoneForm;
