import React from 'react';

type TopbarProps = {
  title: string;
  user?: { name: string; avatarUrl?: string };
  onBurger?: () => void;
};

export const Topbar: React.FC<TopbarProps> = ({ title, user, onBurger }) => {
  return (
    <header className='fixed inset-x-0 top-0 z-40 h-16 bg-grey-light border-b border-gray-200'>
      <div className='h-full px-4 lg:px-6 flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          <button
            className={`lg:hidden inline-flex flex-col h-9 w-9 items-start
                      justify-center rounded-md hover:bg-gray-100`}
            onClick={onBurger}
            aria-label='Toggle sidebar'
          >
            <span className='block w-5 h-0.5 bg-gray-700 mb-1' />
            <span className='block w-4 h-0.5 bg-gray-700 mb-1' />
            <span className='block w-5 h-0.5 bg-gray-700' />
          </button>
          <div className='text-gray-800 font-semibold tracking-wide'>{title}</div>
        </div>

        <div className='flex items-center gap-3'>
          {user && (
            <>
              <span className='hidden sm:block text-sm text-gray-600'>{user.name}</span>
              {user.avatarUrl ? (
                <img
                  src={user.avatarUrl}
                  alt={user.name}
                  className='h-8 w-8 rounded-full object-cover'
                />
              ) : (
                <div className='h-8 w-8 rounded-full bg-gray-300' />
              )}
            </>
          )}
        </div>
      </div>
    </header>
  );
};
