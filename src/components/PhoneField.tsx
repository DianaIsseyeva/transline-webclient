import { makeCountryValidator, normalizeToNational } from '@/containers/Register/utils/phone';
import { useTheme } from '@/contexts/ThemeContext';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
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
  onMetaChange?: (m: { iso2: string; dialCode: string }) => void;
};

const PhoneField = ({ register, setValue, isSubmitted, error, onMetaChange }: PhoneFieldProps) => {
  const [national, setNational] = useState('');
  const { t } = useTranslation();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const { inputRef, country, setCountry } = usePhoneInput({
    defaultCountry: 'kz',
    forceDialCode: false,
  });

  useEffect(() => {
    const validateByCountry = makeCountryValidator(() => country.iso2, t);
    register('phone', { validate: validateByCountry });
  }, [register, country.iso2, t]);

  useEffect(() => {
    setValue('phone', national, { shouldValidate: isSubmitted });
  }, [setValue, national, country.dialCode, isSubmitted]);

  useEffect(() => {
    onMetaChange?.({ iso2: country.iso2, dialCode: country.dialCode });
  }, [onMetaChange, country.iso2, country.dialCode]);

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

  const wrapClass = `
    mt-8 flex p-2 rounded-xl transition duration-150
    ${isDark ? 'bg-[#1b1f22] border border-gray-700' : 'bg-white border border-gray-300'}
    focus-within:ring-2 focus-within:ring-blue-500
    ${isSubmitted && error ? 'mb-0' : 'mb-8'}
  `;

  const selectorClass = `
    !border-none !rounded-lg !cursor-pointer focus:!ring-0 focus:!outline-none
    ${isDark ? '!bg-[#1b1f22]' : '!bg-transparent'}
  `;

  const selectorBtnClass = `
    !h-full !py-0 !px-3 !flex !items-center !border-none focus:!ring-0 focus:!outline-none
    ${isDark ? '!bg-[#1b1f22] !text-gray-200' : '!bg-transparent !text-gray-800'}
  `;

  const dialClass = `
    !px-2 !border !rounded-lg !text-16 !font-light
    ${
      isDark ? '!bg-[#1b1f22] !border-none !text-gray-200' : '!bg-white !border-none !text-gray-800'
    }
  `;

  const inputClass = `
    !p-3 !border-none !rounded-none !w-full
    focus:!ring-0 focus:!border-none focus:!outline-none focus:!shadow-none
    !text-16 !font-light
    ${
      isDark
        ? '!bg-[#1b1f22] !text-gray-100 placeholder:!text-gray-500'
        : '!bg-white !text-gray-900 placeholder:!text-gray-400'
    }
  `;

  return (
    <>
      <div className={wrapClass}>
        <CountrySelector
          selectedCountry={country.iso2 as CountryIso2}
          onSelect={(c: ParsedCountry) => {
            setCountry(c.iso2 as CountryIso2);
            setNational('');
            setValue('phone', '', { shouldValidate: true, shouldDirty: true });
            inputRef.current?.focus();
          }}
          className={selectorClass}
          buttonClassName={selectorBtnClass}
        />

        <DialCodePreview dialCode={country.dialCode} prefix='+' className={dialClass} />

        <input
          ref={inputRef}
          value={national}
          onChange={onChange}
          onPaste={onPaste}
          placeholder='(000) 000-00-00'
          className={inputClass}
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
