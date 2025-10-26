import PhoneField from '@/components/PhoneField';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

type FormValues = { phone: string; consent: boolean };
type Props = { onDone: (payload: { phoneNational: string }) => void };

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

  const [consent, setConsent] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const onSubmit = (data: FormValues) => {
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      onDone({ phoneNational: data.phone.replace(/\D/g, '') });
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
            className='disabled:bg-disabled bg-primary text-white text-16 leading-120 font-ligh w-full mt-8 disabled:cursor-not-allowed'
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
