import React, { FC, useEffect, useState } from 'react';
import 'react-international-phone/style.css';

type StepOTPProps = { onSuccess?: () => void };

const OTP_LEN = 6;
const OTP_EXPECTED = '000000';

const formatPhone = (iso2: string, dial: string, national: string) => {
  const n = (national || '').replace(/\D/g, '');
  if ((iso2 === 'kz' || iso2 === 'ru') && n.length === 10) {
    return `+${dial}(${n.slice(0, 3)}) ${n.slice(3, 6)}-${n.slice(6, 8)}-${n.slice(8, 10)}`;
  }
  return `+${dial} ${n}`;
};

const StepOTP: FC<StepOTPProps> = ({ onSuccess }) => {
  const [phoneNational, setPhoneNational] = useState('');
  const [dial, setDial] = useState('');
  const [iso2, setIso2] = useState('');

  const [hasOtpStep] = useState(true);
  const [otp, setOtp] = useState('');
  const [isWrong, setIsWrong] = useState(false);
  const [counter, setCounter] = useState(60);
  const [isFocused, setIsFocused] = useState(true);
  const [blinkOn, setBlinkOn] = useState(true);

  useEffect(() => {
    try {
      setPhoneNational(localStorage.getItem('register.phone') || '');
      setDial(localStorage.getItem('register.dial') || '');
      setIso2((localStorage.getItem('register.iso2') || '').toLowerCase());
    } catch {}
  }, []);

  useEffect(() => {
    if (!hasOtpStep || !isFocused) return;
    const id = setInterval(() => setBlinkOn(b => !b), 500);
    return () => clearInterval(id);
  }, [hasOtpStep, isFocused]);

  useEffect(() => {
    if (!hasOtpStep || counter <= 0) return;
    const t = setInterval(() => setCounter(c => c - 1), 1000);
    return () => clearInterval(t);
  }, [hasOtpStep, counter]);

  const handleHiddenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, '').slice(0, OTP_LEN);
    setIsWrong(false);
    setOtp(digits);
  };

  useEffect(() => {
    if (otp.length === OTP_LEN) setTimeout(() => onVerify(), 0);
  }, [otp]);

  const onVerify = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (otp.length !== OTP_LEN) return setIsWrong(true);
    if (otp === OTP_EXPECTED) {
      setIsWrong(false);
      onSuccess ? onSuccess() : console.log('OTP verified ✅');
    } else {
      setIsWrong(true);
      (document.getElementById('otp-hidden') as HTMLInputElement | null)?.focus();
    }
  };

  const resend = () => {
    setCounter(60);
    setOtp('');
    setIsWrong(false);
    (document.getElementById('otp-hidden') as HTMLInputElement | null)?.focus();
  };

  const last = OTP_LEN - 1;
  const activeIndex = isWrong ? last : Math.min(otp.length, last);

  return (
    <form onSubmit={onVerify}>
      <div>
        <h3 className='text-25 font-semibold leading-120 text-grey-charcoal mb-5'>
          Введите код из SMS
        </h3>
        <p
          className={`text-16 text-grey-charcoal-70 leading-120 font-light
                       border-b border-dashed border-b-grey mb-5 pb-5`}
        >
          Проверочный код был отправлен на номер: <br />{' '}
          <span className='pt-2 block'>{formatPhone(iso2, dial, phoneNational)}</span>
        </p>

        {isWrong && <p style={{ color: '#E53935', marginBottom: 8 }}>Неправильный код</p>}

        <div
          className='flex justify-content-between'
          style={{ maxWidth: 360, gap: 12, paddingBottom: 16, marginBottom: 24, cursor: 'text' }}
        >
          {Array.from({ length: OTP_LEN }).map((_, i) => (
            <div
              key={i}
              className='text-center'
              style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                border: `1px solid ${isWrong ? '#E53935' : '#E0E0E0'}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 24,
                userSelect: 'none',
                background: '#fff',
                position: 'relative',
              }}
            >
              {otp[i] ?? ''}
              {isFocused && blinkOn && i === activeIndex && (
                <span
                  style={{
                    position: 'absolute',
                    height: 24,
                    width: 2,
                    background: '#333',
                    right: 'calc(50% - 1px)',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    borderRadius: 1,
                  }}
                />
              )}
            </div>
          ))}
        </div>

        <input
          id='otp-hidden'
          type='tel'
          autoFocus
          value={otp}
          onChange={handleHiddenChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          inputMode='numeric'
          pattern='[0-9]*'
          maxLength={OTP_LEN}
          autoComplete='one-time-code'
          style={{ position: 'absolute', opacity: 0, pointerEvents: 'none', height: 0, width: 0 }}
          aria-label='Код из SMS'
        />

        <div className='text-center'>
          {counter > 0 ? (
            <p
              className={`border rounded-lg border-grey text-grey-charcoal-40
                           text-16 leading-120 font-normal w-full mt-8 p-4`}
            >
              отправить повторно через 00:{String(counter).padStart(2, '0')}
            </p>
          ) : (
            <button
              type='button'
              onClick={resend}
              className={`border border-grey text-grey-charcoal-40 text-16
                          leading-120 font-normal w-full mt-8 p-4`}
            >
              отправить повторно
            </button>
          )}
        </div>
      </div>
    </form>
  );
};

export default StepOTP;
