import React, { FC } from 'react';
import { type RegisterOptions, type UseFormRegister, type UseFormSetValue } from 'react-hook-form';

type FormValues = {
  lastName: string;
  firstName: string;
  middleName?: string;
  email: string;
  password: string;
  idNumber: string;
};

type InputProps = {
  name: keyof FormValues;
  register: UseFormRegister<FormValues>;
  setValue: UseFormSetValue<FormValues>;
  rules?: RegisterOptions<FormValues, keyof FormValues>;
  type?: React.InputHTMLAttributes<HTMLInputElement>['type'];
  placeholder?: string;
  error?: string;
  inputMode?: React.InputHTMLAttributes<HTMLInputElement>['inputMode'];
  maxLength?: number;
  onInputFilterDigits?: boolean;
};

const Input: FC<InputProps> = ({
  name,
  register,
  setValue,
  rules,
  type = 'text',
  placeholder,
  error,
  inputMode,
  maxLength,
  onInputFilterDigits,
}) => {
  const field = register(name, rules);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    const value = onInputFilterDigits ? rawValue.replace(/\D/g, '') : rawValue;
    setValue(name, value, { shouldValidate: true, shouldDirty: true });
  };

  return (
    <div className='mb-4 w-full md:max-w-[440px] flex-1 min-w-[300px]'>
      <input
        type={type}
        placeholder={placeholder}
        inputMode={inputMode}
        maxLength={maxLength}
        className={`block w-full p-4 rounded-xl border border-grey outline-none
                text-16 leading-120 font-400 text-grey-charcoal-70
                ${error ? 'ring-2 ring-red-400' : ''}`}
        {...field}
        onChange={handleChange}
      />
      {error && <p className='mt-1 text-error text-sm'>{error}</p>}
    </div>
  );
};

export default Input;
