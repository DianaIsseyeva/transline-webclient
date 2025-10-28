import Input from '@/components/Input';
import { useForm } from 'react-hook-form';

type FormValues = {
  lastName: string;
  firstName: string;
  middleName?: string;
  email: string;
  password: string;
  idNumber: string;
};

const StepQuestionary: React.FC<{ onDone?: () => void }> = ({ onDone }) => {
  const role =
    (typeof window !== 'undefined' ? localStorage.getItem('register.role') : null) || 'customer';
  const rolePlaceholder = role === 'carrier' ? 'БИН*' : 'ИИН*';

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

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passRule = (v: string | undefined) =>
    /(?=.*[A-Za-z])(?=.*\d).{8,}/.test(v ?? '') || 'Минимум 8 символов, буквы и цифры';
  const idRule = (v: string | undefined) => /^\d{12}$/.test(v ?? '') || 'Нужно ровно 12 цифр';

  const onSubmit = (data: FormValues) => {
    console.log('Questionary data:', data);
    onDone?.();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        name='lastName'
        register={register}
        setValue={setValue}
        rules={{ required: 'Обязательное поле' }}
        placeholder='Фамилия*'
        error={errors.lastName?.message}
      />

      <Input
        name='firstName'
        register={register}
        setValue={setValue}
        rules={{ required: 'Обязательное поле' }}
        placeholder='Имя*'
        error={errors.firstName?.message}
      />

      <Input
        name='middleName'
        register={register}
        setValue={setValue}
        placeholder='Отчество'
        error={errors.middleName?.message}
      />

      <Input
        name='email'
        register={register}
        setValue={setValue}
        rules={{
          required: 'Обязательное поле',
          pattern: { value: emailRegex, message: 'Некорректный email' },
        }}
        type='email'
        placeholder='Email*'
        error={errors.email?.message}
      />

      <Input
        name='password'
        register={register}
        setValue={setValue}
        rules={{
          required: 'Обязательное поле',
          validate: passRule,
        }}
        type='password'
        placeholder='Пароль*'
        error={errors.password?.message}
      />

      <Input
        name='idNumber'
        register={register}
        setValue={setValue}
        rules={{
          required: 'Обязательное поле',
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
        ВОЙТИ
      </button>
    </form>
  );
};

export default StepQuestionary;
