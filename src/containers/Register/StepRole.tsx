import { useState } from 'react';

type Props = { onContinue: (role: 'customer' | 'carrier') => void };

const StepRole = ({ onContinue }: Props) => {
  const [role, setRole] = useState<'customer' | 'carrier' | null>(null);

  return (
    <div className='flex flex-col h-full justify-between'>
      <>
        <h3 className='text-32 text-grey-charcoal leading-120 font-semibold  mb-2'>Регистрация</h3>
        <p className='text-16 text-grey-charcoal-70 leading-120 font-light'>
          Выберите, как вы хотите использовать приложение
        </p>

        <div className='flex flex-col items-center-safe gap-4 mt-8'>
          <label
            className={`border border-gray-300 rounded-xl p-4 cursor-pointer transition duration-150 max-w-[343px] ${
              role === 'customer' ? 'ring-2 ring-blue-500' : ''
            }`}
          >
            <input
              type='radio'
              name='role'
              className='hidden'
              checked={role === 'customer'}
              onChange={() => setRole('customer')}
            />
            <div className='flex'>
              <div>
                <img src='/src/assets/images/bag.png' />
                <p className='text-25 text-grey-charcoal font-semibold mb-1'>как заказчик</p>
                <p className='text-14 text-grey-charcoal-40 font-light mb-1'>
                  Контролируйте выполнение заявок в реальном времени
                </p>
              </div>
              <img src='/src/assets/images/img-client.png' />
            </div>
          </label>

          <label
            className={`border border-gray-300 rounded-xl p-4 cursor-pointer transition duration-150 max-w-[343px] ${
              role === 'carrier' ? 'ring-2 ring-blue-500' : ''
            }`}
          >
            <input
              type='radio'
              name='role'
              className='hidden'
              checked={role === 'carrier'}
              onChange={() => setRole('carrier')}
            />
            <div className='flex'>
              <div>
                <img src='/src/assets/images/truck.png' />
                <p className='text-25 text-grey-charcoal font-semibold mb-1'>как перевозчик</p>
                <p className='text-14 text-grey-charcoal-40 font-light mb-1'>
                  Получайте актуальную информацию о своих перевозках
                </p>
              </div>
              <img src='/src/assets/images/img-carrier.png' />
            </div>
          </label>
        </div>

        <button
          type='button'
          disabled={!role}
          aria-disabled={!role}
          onClick={() => role && onContinue(role)}
          className='disabled:bg-disabled bg-primary text-white text-16 leading-120 font-ligh w-full mt-8 disabled:cursor-not-allowed'
        >
          Продолжить
        </button>
      </>
      <img src='/src/assets/images/geo.svg' className='h-[72px] w-[72px] ml-auto' />
    </div>
  );
};

export default StepRole;
