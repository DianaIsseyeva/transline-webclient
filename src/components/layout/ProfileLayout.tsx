import { FC, PropsWithChildren, useState } from 'react';
import UserProfile from '../UserProfile';
import UserProfilePanel from '../UserProfilePanel';
import { Sidebar, SidebarItem, SidebarSection } from './Sidebar';
import { Topbar } from './Topbar';

export type NavItem = SidebarItem & { id: string };
export type NavSection = SidebarSection & { id: string; items: NavItem[] };

type ProfileLayoutProps = {
  title?: string;
  user?: { name: string; avatarUrl?: string };
  sections: NavSection[];
  activePath: string;
};

export const ProfileLayout: FC<PropsWithChildren<ProfileLayoutProps>> = ({
  title = 'TRANSLINE',
  user,
  sections,
  activePath,
  children,
}) => {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className='min-h-screen bg-[#f6f9fb]'>
      <Topbar
        title={title}
        user={user}
        onBurger={() => setMobileOpen(s => !s)}
        onUserClick={() => setSheetOpen(true)}
      />

      <div className='flex'>
        <Sidebar
          sections={sections}
          activePath={activePath}
          desktopOpen={true}
          mobileOpen={mobileOpen}
          onCloseMobile={() => setMobileOpen(false)}
        />

        <main className='flex-1 pt-16 lg:pl-[264px]'>
          <div className='p-6 lg:p-8'>{children}</div>
        </main>
      </div>
      <UserProfile open={sheetOpen} onClose={() => setSheetOpen(false)} widthClass='w-[520px]'>
        <UserProfilePanel onSaved={() => setSheetOpen(false)} />
      </UserProfile>
    </div>
  );
};
