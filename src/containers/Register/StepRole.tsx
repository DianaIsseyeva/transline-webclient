import { useState } from 'react';
import { useTranslation } from 'react-i18next';

type Props = { onContinue: (role: 'customer' | 'carrier') => void };

const StepRole = ({ onContinue }: Props) => {
  const { t } = useTranslation();

  const [role, setRole] = useState<'customer' | 'carrier' | null>(null);
  const chooseRole = (value: 'customer' | 'carrier') => {
    setRole(value);
    try {
      localStorage.setItem('register.role', value);
    } catch {}
  };
  return (
    <div className='flex flex-col lg:h-full justify-between'>
      <>
        <h3 className='lg:text-32 text-25 text-grey-charcoal leading-120 font-semibold mb-2'>
          {t('register.registration')}
        </h3>
        <p className='text-16 text-grey-charcoal-70 leading-120 font-light'>
          {t('register.choose_role')}
        </p>

        <div className='flex flex-col items-center-safe gap-4 mt-8'>
          <label
            className={`border border-gray-300 rounded-xl cursor-pointer transition
                        duration-150 max-w-[343px] p-4
                        ${role === 'customer' ? 'ring-2 ring-blue-500' : ''}`}
          >
            <input
              type='radio'
              name='role'
              className='hidden'
              checked={role === 'customer'}
              onChange={() => chooseRole('customer')}
            />
            <div className='flex'>
              <div>
                <img src='/images/bag.png' />
                <p className='text-25 text-grey-charcoal font-semibold mb-1'>
                  {t('register.as_customer')}
                </p>
                <p className='text-14 text-grey-charcoal-40 font-light mb-1'>
                  {t('register.customer')}
                </p>
              </div>
              <img src='/images/img-client.png' />
            </div>
          </label>

          <label
            className={`border border-gray-300 rounded-xl cursor-pointer
                        transition duration-150 max-w-[343px] p-4
                        ${role === 'carrier' ? 'ring-2 ring-blue-500' : ''}`}
          >
            <input
              type='radio'
              name='role'
              className='hidden'
              checked={role === 'carrier'}
              onChange={() => chooseRole('carrier')}
            />
            <div className='flex'>
              <div>
                <img src='/images/truck.png' />
                <p className='text-25 text-grey-charcoal font-semibold mb-1'>
                  {t('register.as_carrier')}
                </p>
                <p className='text-14 text-grey-charcoal-40 font-light mb-1'>
                  {t('register.pros_carrier')}
                </p>
              </div>
              <img src='/images/img-carrier.png' />
            </div>
          </label>
        </div>

        <button
          type='button'
          disabled={!role}
          aria-disabled={!role}
          onClick={() => role && onContinue(role)}
          className={`disabled:bg-disabled bg-primary text-white text-16
                      leading-120 font-ligh w-full disabled:cursor-not-allowed mt-8 py-2.5 px-8`}
        >
          {t('actions.continue')}
        </button>
      </>
    </div>
  );
};

export default StepRole;
