import React, { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import FieldRow from './FieldRow';

type ProfileForm = {
  lastName: string;
  firstName: string;
  middleName?: string;
  phone: string;
  email: string;
};
type Props = { onSaved?: () => void };
const ONLY_DIGITS = (s: string) => s.replace(/\D/g, '');

const UserProfilePanel: FC<Props> = ({ onSaved }) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isDirty },
    watch,
  } = useForm<ProfileForm>({ mode: 'onChange' });

  const phone = watch('phone') ?? '';

  useEffect(() => {
    try {
      const raw = localStorage.getItem('register.profile');
      const phone = localStorage.getItem('register.phone');
      const dial = localStorage.getItem('register.dial');
      if (raw) {
        const p = JSON.parse(raw);
        reset({
          lastName: p.lastName ?? '',
          firstName: p.firstName ?? '',
          middleName: p.middleName ?? '',
          phone: phone ? `+${dial || ''}${phone}` : '',
          email: p.email ?? '',
        });
      }
    } catch {}
  }, [reset]);

  const onPhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = ONLY_DIGITS(e.target.value).slice(0, 12);
    setValue('phone', v, { shouldDirty: true, shouldValidate: true });
  };

  const onSubmit = (data: ProfileForm) => {
    try {
      const raw = localStorage.getItem('register.profile');
      const prev = raw ? JSON.parse(raw) : {};
      localStorage.setItem('register.profile', JSON.stringify({ ...prev, ...data }));
      onSaved?.();
    } catch {}
    alert('Данные изменены');
  };

  const canSave = isDirty;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
      <div className='border-b border-b-grey pb-3'>
        <button
          type='submit'
          disabled={!canSave}
          className='px-4 py-2 border border-primary text-primary
                    rounded-md text-12 font-normal disabled:opacity-50'
        >
          сохранить
        </button>
      </div>

      <FieldRow label='Фамилия' error={errors.lastName?.message} htmlFor='lastName'>
        <input
          className='w-full text-14 font-light rounded-lg p-2 outline-none
                    focus:border-primary focus:ring-1 focus:ring-primary'
          {...register('lastName', { required: 'Обязательное поле' })}
        />
      </FieldRow>

      <FieldRow label='Имя' error={errors.firstName?.message} htmlFor='firstName'>
        <input
          className='w-full text-14 font-light rounded-lg p-2 outline-none focus:border-primary focus:ring-1 focus:ring-primary'
          {...register('firstName', { required: 'Обязательное поле' })}
        />
      </FieldRow>

      <FieldRow label='Отчество' error={errors.middleName?.message} htmlFor='middleName'>
        <input
          className='w-full text-14 font-light rounded-lg p-2 outline-none focus:border-primary focus:ring-1 focus:ring-primary'
          {...register('middleName')}
        />
      </FieldRow>

      <FieldRow label='Номер телефона' error={errors.phone?.message} htmlFor='phone'>
        <input
          className='w-full text-14 font-light rounded-lg p-2 outline-none
                   focus:border-primary focus:ring-1 focus:ring-primary'
          inputMode='tel'
          autoComplete='tel'
          maxLength={12}
          {...register('phone', {
            required: 'Обязательное поле',
            validate: v => (/^\d*$/.test(v ?? '') ? true : 'Только цифры'),
          })}
          value={phone}
          onChange={onPhoneChange}
        />
      </FieldRow>

      <FieldRow label='Email' error={errors.email?.message} htmlFor='email'>
        <input
          className='w-full text-14 font-light rounded-lg p-2 outline-none
                   focus:border-primary focus:ring-1 focus:ring-primary'
          type='email'
          {...register('email', {
            required: 'Обязательное поле',
            pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Некорректный email' },
          })}
        />
      </FieldRow>
    </form>
  );
};

export default UserProfilePanel;
