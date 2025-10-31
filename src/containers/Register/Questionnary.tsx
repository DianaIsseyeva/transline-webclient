import Input from '@/components/Input';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
type FormValues = {
  lastName: string;
  firstName: string;
  middleName?: string;
  email: string;
  password: string;
  idNumber: string;
};

const StepQuestionary: React.FC<{ onDone?: () => void }> = ({ onDone }) => {
  const { t } = useTranslation();
  const role =
    (typeof window !== 'undefined' ? localStorage.getItem('register.role') : null) || 'customer';
  const rolePlaceholder = role === 'carrier' ? t('profile.BIN') : t('profile.IIN');

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
  } = useForm<FormValues>({
    mode: 'onChange',
    defaultValues: {
      lastName: '',
      firstName: '',
      middleName: '',
      email: '',
      password: '',
      idNumber: '',
    },
  });
  const navigate = useNavigate();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passRule = (v: string | undefined) =>
    /(?=.*[A-Za-z])(?=.*\d).{8,}/.test(v ?? '') || t('errors.password_weak');
  const idRule = (v: string | undefined) => /^\d{12}$/.test(v ?? '') || t('errors.iin_bin_len');

  const onSubmit = (data: FormValues) => {
    try {
      localStorage.setItem('register.profile', JSON.stringify(data));
    } catch {}

    onDone?.();
    navigate('/profile', { replace: true });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        name='lastName'
        register={register}
        setValue={setValue}
        rules={{ required: t('errors.required') }}
        placeholder={t('profile.lastName')}
        error={errors.lastName?.message}
      />

      <Input
        name='firstName'
        register={register}
        setValue={setValue}
        rules={{ required: t('errors.required') }}
        placeholder={t('profile.lastName')}
        error={errors.firstName?.message}
      />

      <Input
        name='middleName'
        register={register}
        setValue={setValue}
        placeholder={t('profile.middleName')}
        error={errors.middleName?.message}
      />

      <Input
        name='email'
        register={register}
        setValue={setValue}
        rules={{
          required: t('errors.required'),
          pattern: { value: emailRegex, message: t('errors.email') },
        }}
        type='email'
        placeholder={t('profile.email')}
        error={errors.email?.message}
      />

      <Input
        name='password'
        register={register}
        setValue={setValue}
        rules={{
          required: t('errors.required'),
          validate: passRule,
        }}
        type='password'
        placeholder={t('profile.password')}
        error={errors.password?.message}
      />

      <Input
        name='idNumber'
        register={register}
        setValue={setValue}
        rules={{
          required: t('errors.required'),
          validate: idRule,
        }}
        placeholder={rolePlaceholder}
        inputMode='numeric'
        maxLength={12}
        onInputFilterDigits
        error={errors.idNumber?.message}
      />

      <button
        type='submit'
        disabled={!isValid}
        aria-disabled={!isValid}
        className={`disabled:bg-disabled bg-primary text-white text-16
                    leading-120 font-400 w-full mt-6 py-3 rounded-xl
                    disabled:cursor-not-allowed`}
      >
        {t('actions.login')}
      </button>
    </form>
  );
};

export default StepQuestionary;
