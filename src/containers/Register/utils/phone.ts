import type { CountryCode } from 'libphonenumber-js';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

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
    const nat = (val || '').replace(/\D/g, '');
    if (!nat) return 'Введите номер';

    const iso2 = getIso2().toLowerCase();
    if (FIXED_10[iso2] && nat.length !== 10) return 'Некорректный номер телефона';

    const cc = iso2.toUpperCase() as CountryCode;
    const pn = parsePhoneNumberFromString(nat, cc);
    if (!pn?.isPossible()) return 'Некорректный номер телефона';
    if (!pn.isValid()) return 'Некорректный номер телефона';
    return true;
  };
