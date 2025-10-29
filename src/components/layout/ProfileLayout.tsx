import React, { PropsWithChildren, useState } from 'react';
import { Sidebar, SidebarItem, SidebarSection } from './Sidebar';
import { Topbar } from './Topbar';

export type NavItem = SidebarItem & { id: string };
export type NavSection = SidebarSection & { id: string; items: NavItem[] };

type AppLayoutProps = {
  title?: string;
  user?: { name: string; avatarUrl?: string };
  sections: NavSection[];
  activePath: string;
};

export const AppLayout: React.FC<PropsWithChildren<AppLayoutProps>> = ({
  title = 'TRANSLINE',
  user,
  sections,
  activePath,
  children,
}) => {
  const [open] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className='min-h-screen bg-[#f6f9fb]'>
      <Topbar title={title} user={user} onBurger={() => setMobileOpen(s => !s)} />

      <div className='flex'>
        <Sidebar
          sections={sections}
          activePath={activePath}
          desktopOpen={open}
          mobileOpen={mobileOpen}
          onCloseMobile={() => setMobileOpen(false)}
        />

        <main className='flex-1 pt-16 lg:pl-[264px]'>
          <div className='p-6 lg:p-8'>{children}</div>
        </main>
      </div>
    </div>
  );
};
