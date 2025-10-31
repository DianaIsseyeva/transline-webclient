import { Icon } from '@/components/Icons';
import { icon } from '@/icons';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import StepQuestionary from './Questionnary';
import StepOTP from './StepOTP';
import StepPhoneForm from './StepPhoneForm';
import StepRole from './StepRole';

type Step = 'form' | 'role' | 'otp' | 'questionnary' | '';
const isValidStep = (v: string | null): v is Step =>
  v === 'form' || v === 'role' || v === 'otp' || v === 'questionnary';

export default function Register() {
  const { t } = useTranslation();
  const [step, setStep] = useState<Step>(() => {
    try {
      if (typeof window === 'undefined') return 'form';
      const raw = window.localStorage.getItem('register.step');
      return isValidStep(raw) ? raw : 'form';
    } catch {
      return 'form';
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem('register.step', step);
    } catch {}
  }, [step]);

  const hideLeftOnMobile = step === 'otp';

  return (
    <div className='min-h-[90svh] lg:min-h-svh grid lg:grid-cols-2 sm:grid-cols-1'>
      <div className={`${hideLeftOnMobile ? 'hidden lg:block' : ''} bg-primary lg:pb-16 pb-0`}>
        <div className='lg:pt-24 lg:px-16 py-10 px-8 lg:h-full'>
          <div className='flex flex-col h-full justify-between'>
            <div>
              <img src='/images/logo.svg' className='mb-5' />
              <p className='text-white font-semibold lg:text-50 md:text-32 text-25 leading-110'>
                {t('register.title')}
              </p>
            </div>
            <Icon icon={icon.car} strokeColor='#ffffff' className='hidden lg:block' />
          </div>
        </div>
        <div className='bg-white h-1 hidden lg:block'></div>
      </div>

      <div className='h-full lg:pb-[60px] flex flex-col overflow-x-hidden'>
        <div className='flex-1 lg:pb-16 pb-10'>
          <div className='lg:pt-24 lg:px-28 p-5 pb-0 h-full'>
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
                onContinue={() => {
                  setStep('otp');
                }}
              />
            )}

            {step === 'otp' && (
              <div className='flex items-center justify-center h-full w-full overflow-x-hidden'>
                <StepOTP onSuccess={() => setStep('questionnary')} />
              </div>
            )}

            {step === 'questionnary' && (
              <div className='flex items-center justify-center h-full'>
                <StepQuestionary />
              </div>
            )}
          </div>
        </div>

        <div className={`mt-auto ${hideLeftOnMobile ? 'hidden lg:block' : ''}`}>
          <div className='flex items-baseline lg:hidden'>
            <Icon
              icon={icon.car}
              width={72}
              height={72}
              strokeColor='#05c0e6'
              className='lg:hidden block'
            />
            <img src='/images/geo.svg' className='lg:h-24 lg:w-24 ml-auto' />
          </div>
          <img src='/images/geo.svg' className='h-24 w-24 ml-auto lg:block hidden' />
          <div className='bg-primary h-1' />
        </div>
      </div>
    </div>
  );
}
