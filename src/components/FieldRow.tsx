import React, { FC } from 'react';

type Props = {
  label: string;
  htmlFor?: string;
  error?: string;
  helpText?: string;
  labelWidthClass?: string;
  className?: string;
  children: React.ReactNode;
};

const FieldRow: FC<Props> = ({
  label,
  htmlFor,
  error,
  helpText,
  labelWidthClass = 'w-48',
  className = '',
  children,
}) => (
  <div className={`flex items-center ${className}`}>
    <label
      className={`${labelWidthClass} text-grey-charcoal-40 text-12 font-light`}
      htmlFor={htmlFor}
    >
      {label}
    </label>
    <div className='flex-1'>
      {children}
      {helpText && !error && <p className='text-gray-400 text-xs mt-1'>{helpText}</p>}
      {error && <p className='text-red-500 text-xs mt-1'>{error}</p>}
    </div>
  </div>
);

export default FieldRow;
