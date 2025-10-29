import React, { FC } from 'react';

type UserProfileProps = {
  open: boolean;
  onClose: () => void;
  widthClass?: string;
  children: React.ReactNode;
};

const UserProfile: FC<UserProfileProps> = ({
  open,
  onClose,
  widthClass = 'w-full sm:w-[420px]',
  children,
}) => {
  return (
    <div className={`fixed inset-0 z-50 ${open ? '' : 'pointer-events-none'}`} aria-hidden={!open}>
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black/30 transition-opacity ${
          open ? 'opacity-100' : 'opacity-0'
        }`}
      />
      <aside
        className={`
          absolute right-0 top-16 h-screen bg-white shadow-xl
          transition-transform duration-300 px-5 pt-5 ${open ? 'translate-x-0' : 'translate-x-full'}
          ${widthClass}
        `}
        role='dialog'
        aria-modal='true'
      >
        {children}
      </aside>
    </div>
  );
};

export default UserProfile;
