import { Transition, TransitionChild } from '@headlessui/react';
import React, { Fragment } from 'react';

export type SidebarItem = {
  label: string;
  href: string;
  icon?: React.ReactNode;
};

export type SidebarSection = {
  title?: string;
  footer?: React.ReactNode;
};

type SidebarProps = {
  sections: { id: string; title?: string; items: (SidebarItem & { id: string })[] }[];
  activePath: string;
  desktopOpen: boolean;
  mobileOpen: boolean;
  onCloseMobile: () => void;
};

export const Sidebar: React.FC<SidebarProps> = ({
  sections,
  activePath,
  mobileOpen,
  onCloseMobile,
}) => {
  const Nav = (
    <nav className='h-full w-[264px] bg-grey-light border-r border-grey flex flex-col'>
      <div className='pt-16' />
      <div className='px-4 py-4 space-y-6'>
        {sections.map(section => (
          <Fragment key={section.id}>
            {section.title && (
              <div className='px-2 text-16 font-medium tracking-wide text-grey-charcoal'>
                {section.title}
              </div>
            )}
            <ul className='mt-2 space-y-1'>
              {section.items.map(item => {
                const active = activePath === item.href;
                return (
                  <li key={item.id}>
                    <a
                      href={item.href}
                      className={`flex items-center rounded-md text-14 font-light gap-3 px-3 py-2
                        ${
                          active
                            ? 'bg-[#eef6fb] text-grey-charcoal'
                            : 'text-grey-charcoal-40 hover:bg-gray-100'
                        }`}
                    >
                      <span className='shrink-0'>{item.icon}</span>
                      <span className='truncate'>{item.label}</span>
                    </a>
                  </li>
                );
              })}
            </ul>

            <div className='border-t border-dashed border-gray-200 pt-4' />
          </Fragment>
        ))}
      </div>
    </nav>
  );

  return (
    <>
      <aside className='hidden lg:block fixed top-0 left-0 h-screen'>{Nav}</aside>

      <Transition show={mobileOpen}>
        <TransitionChild
          enter='transition-opacity duration-200'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='transition-opacity duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black/30 z-40 lg:hidden' onClick={onCloseMobile} />
        </TransitionChild>
        <TransitionChild
          enter='transition-transform duration-200'
          enterFrom='-translate-x-full'
          enterTo='translate-x-0'
          leave='transition-transform duration-200'
          leaveFrom='translate-x-0'
          leaveTo='-translate-x-full'
        >
          <aside className='fixed z-50 top-0 left-0 h-screen lg:hidden'>{Nav}</aside>
        </TransitionChild>
      </Transition>
    </>
  );
};
