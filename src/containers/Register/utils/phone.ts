import type { CountryCode } from 'libphonenumber-js';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { useTranslation } from 'react-i18next';

export const FIXED_10: Record<string, true> = { kz: true, ru: true, us: true, ca: true };

export const normalizeToNational = (raw: string, dialCode: string, iso2: string) => {
  const trimmed = (raw || '').trim();
  let d = trimmed.replace(/\D/g, '');

  const hadIntlPrefix = trimmed.startsWith('+') || trimmed.startsWith('00');
  if (hadIntlPrefix && dialCode && d.startsWith(dialCode)) d = d.slice(dialCode.length);

  if ((iso2 === 'kz' || iso2 === 'ru') && d.length >= 11 && d.startsWith('8')) d = d.slice(1);

  return d;
};

export const makeCountryValidator =
  (getIso2: () => string) =>
  (val: string): true | string => {
    const { t } = useTranslation();

    const nat = (val || '').replace(/\D/g, '');
    if (!nat) return 'Введите номер';

    const iso2 = getIso2().toLowerCase();
    if (FIXED_10[iso2] && nat.length !== 10) return t('errors.phone');

    const cc = iso2.toUpperCase() as CountryCode;
    const pn = parsePhoneNumberFromString(nat, cc);
    if (!pn?.isPossible()) return t('errors.phone');
    if (!pn.isValid()) return t('errors.phone');
    return true;
  };
