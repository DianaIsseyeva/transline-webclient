import React from 'react';

type TopbarProps = {
  title: string;
  user?: { name: string; avatarUrl?: string };
  onBurger?: () => void;
  onUserClick?: () => void;
};

export const Topbar: React.FC<TopbarProps> = ({ title, user, onBurger, onUserClick }) => {
  return (
    <header className='fixed inset-x-0 top-0 z-40 h-16 bg-grey-light border-b border-gray-200'>
      <div className='h-full px-4 lg:px-6 flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          <button
            className='lg:hidden inline-flex flex-col h-9 w-9 items-start justify-center rounded-md hover:bg-gray-100'
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
              <button
                type='button'
                onClick={onUserClick}
                className='h-8 w-8 rounded-full overflow-hidden ring-1 ring-gray-300 hover:ring-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500'
                aria-label='Edit profile'
              >
                {user.avatarUrl ? (
                  <img
                    src={user.avatarUrl}
                    alt={user.name}
                    className='h-full w-full object-cover'
                  />
                ) : (
                  <div className='h-full w-full bg-gray-300' />
                )}
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
