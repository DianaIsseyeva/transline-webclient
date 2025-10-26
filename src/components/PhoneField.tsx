import { makeCountryValidator, normalizeToNational } from '@/containers/Register/utils/phone';
import { useEffect, useState } from 'react';
import {
  CountryIso2,
  CountrySelector,
  DialCodePreview,
  ParsedCountry,
  usePhoneInput,
} from 'react-international-phone';
import 'react-international-phone/style.css';

type PhoneFieldProps = {
  register: (name: 'phone', opts: { validate: (v: string) => true | string }) => void;
  setValue: (
    name: 'phone',
    value: string,
    opts?: { shouldValidate?: boolean; shouldDirty?: boolean }
  ) => void;
  isSubmitted: boolean;
  error?: string;
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

const PhoneField = ({ register, setValue, isSubmitted, error }: PhoneFieldProps) => {
  const [national, setNational] = useState('');

  const { inputRef, country, setCountry } = usePhoneInput({
    defaultCountry: 'kz',
    forceDialCode: false,
  });

  useEffect(() => {
    const validateByCountry = makeCountryValidator(() => country.iso2);
    register('phone', { validate: validateByCountry });
  }, [country.iso2]);

  useEffect(() => {
    setValue('phone', national, { shouldValidate: isSubmitted });
  }, [country.dialCode]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const n = normalizeToNational(e.target.value, country.dialCode, country.iso2);
    setNational(n);
    setValue('phone', n, { shouldValidate: isSubmitted, shouldDirty: true });
  };

  const onPaste: React.ClipboardEventHandler<HTMLInputElement> = e => {
    const text = e.clipboardData.getData('text');
    const n = normalizeToNational(text, country.dialCode, country.iso2);
    e.preventDefault();
    setNational(n);
    setValue('phone', n, { shouldValidate: isSubmitted, shouldDirty: true });
  };

  return (
    <>
      <div
        className={`mt-8 flex p-2 border border-gray-300 rounded-xl focus-within:ring-2 focus-within:ring-blue-500 transition duration-150 ${
          isSubmitted && error ? 'mb-0' : 'mb-8'
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
          onChange={onChange}
          onPaste={onPaste}
          placeholder='(000) 000-00-00'
          className={phoneInputStyles.inputClassName}
          inputMode='tel'
          autoComplete='tel-national'
          pattern='\d*'
          aria-label='Номер телефона'
        />
      </div>

      {isSubmitted && error && <p className='text-error text-sm mb-3'>{error}</p>}
    </>
  );
};

export default PhoneField;
