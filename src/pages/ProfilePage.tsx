import { Icon } from '@/components/Icons';
import { NavSection, ProfileLayout } from '@/components/layout/ProfileLayout';
import { icon } from '@/icons';

export default function ProfilePage() {
  const sections: NavSection[] = [
    {
      id: 'orders',
      title: 'заявки',
      items: [
        {
          id: 'active',
          label: 'Активные',
          href: '#',
          icon: <Icon icon={icon.activeApp} />,
        },
        { id: 'arch', label: 'Архивные', href: '#', icon: <Icon icon={icon.archApp} /> },
      ],
    },
    {
      id: 'partners',
      title: 'контрагенты',
      items: [
        { id: 'clients', label: 'Заказчики', href: '#', icon: <Icon icon={icon.client} /> },
        { id: 'carriers', label: 'Перевозчики', href: '#', icon: <Icon icon={icon.carrier} /> },
      ],
    },
    {
      id: 'transport',
      title: 'автопарк',
      items: [
        { id: 'transport', label: 'Транспорт', href: '#', icon: <Icon icon={icon.transport} /> },
      ],
    },
    {
      id: 'admin',
      title: 'управление',
      items: [
        { id: 'refs', label: 'Справочники', href: '#', icon: <Icon icon={icon.refs} /> },
        {
          id: 'mgrs',
          label: 'Менеджеры',
          href: '#',
          icon: <Icon icon={icon.mgrs} />,
        },
      ],
    },
  ];

  return (
    <ProfileLayout
      title='TRANSLINE'
      user={{ name: 'Иван Иванов', avatarUrl: 'https://i.pravatar.cc/80' }}
      sections={sections}
      activePath='/admin/refs'
    >
      данные юзера
    </ProfileLayout>
  );
}
