import { useTheme } from '@/contexts/ThemeContext';

export default function ThemeSwitch() {
  const { theme, toggle } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type='button'
      onClick={toggle}
      role='switch'
      aria-checked={isDark}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      className={`inline-flex items-center gap-2 rounded-full max-w-fit px-3 py-1.5
                  border border-gray-300 hover:border-gray-400
                  bg-white dark:bg-[#1b1f22] dark:border-gray-700
                  transition`}
    >
      {isDark ? (
        <svg width='16' height='16' viewBox='0 0 24 24' aria-hidden>
          <path d='M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z' fill='currentColor' />
        </svg>
      ) : (
        <svg width='16' height='16' viewBox='0 0 24 24' aria-hidden>
          <path
            d='M12 4V2M12 22v-2M4.93 4.93 3.51 3.51M20.49 20.49l-1.42-1.42M4 12H2m20 0h-2M4.93 19.07 3.51 20.49M20.49 3.51l-1.42 1.42'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
          />
          <circle cx='12' cy='12' r='4' fill='currentColor' />
        </svg>
      )}
      <span className='text-sm text-gray-700 dark:text-gray-200 select-none'>
        {isDark ? 'Dark' : 'Light'}
      </span>
    </button>
  );
}
