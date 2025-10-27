import { useEffect, useState } from 'react';
import StepOTP from './StepOTP';
import StepPhoneForm from './StepPhoneForm';
import StepRole from './StepRole';

type Step = 'form' | 'role' | 'otp' | 'questionnary' | '';

export default function Register() {
  const [step, setStep] = useState<Step>('');

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem('register.step');
      if (raw === 'form' || raw === 'role' || raw === 'otp' || raw === 'questionnary') {
        setStep(raw);
      } else setStep('form');
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('register.step', step);
    } catch {}
  }, [step]);

  return (
    <div className=' sm:h-dvh grid xl:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 '>
      <div className='bg-primary pb-16 '>
        <div className='pt-24 px-16 h-full'>
          <div className='flex flex-col h-full justify-between'>
            <div>
              <img src='/src/assets/images/logo.svg' className='mb-5' />
              <p className='text-white font-semibold text-50 leading-110'>
                Добро пожаловать в личный кабинет для бизнеса!
              </p>
            </div>
            <img src='/src/assets/images/car.svg' className='h-24 w-24' />
          </div>
        </div>
        <div className='bg-white h-1'></div>
      </div>

      <div>
        <div className='pb-16 h-full'>
          <div className='pt-24 px-28 h-full'>
            {step === 'form' && (
              <StepPhoneForm
                onDone={({ phoneNational }) => {
                  try {
                    localStorage.setItem('register.phone', phoneNational);
                    setStep('role');
                  } catch {}
                }}
              />
            )}

            {step === 'role' && (
              <StepRole
                onContinue={role => {
                  setStep('otp');
                }}
              />
            )}

            {step === 'otp' && (
              <div className='flex items-center justify-center h-full'>
                <StepOTP onSuccess={() => setStep('questionnary')} />
              </div>
            )}

            {step === 'questionnary' && (
              <div className='flex items-center justify-center h-full'>Анкета</div>
            )}
          </div>
          <div className='bg-primary h-1'></div>
        </div>
      </div>
    </div>
  );
}
