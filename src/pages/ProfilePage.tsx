import { Icon } from '@/components/Icons';
import { NavSection, ProfileLayout } from '@/components/layout/ProfileLayout';
import { icon } from '@/icons';
import { useTranslation } from 'react-i18next';

export default function ProfilePage() {
  const { t } = useTranslation();

  const sections: NavSection[] = [
    {
      id: 'orders',
      title: t('sidebar.order_title'),
      items: [
        {
          id: 'active',
          label: t('sidebar.active'),
          href: '#',
          icon: <Icon icon={icon.activeApp} />,
        },
        { id: 'arch', label: t('sidebar.arch'), href: '#', icon: <Icon icon={icon.archApp} /> },
      ],
    },
    {
      id: 'partners',
      title: t('sidebar.partners_title'),
      items: [
        {
          id: 'clients',
          label: t('sidebar.clients'),
          href: '#',
          icon: <Icon icon={icon.client} />,
        },
        {
          id: 'carriers',
          label: t('sidebar.carriers'),
          href: '#',
          icon: <Icon icon={icon.carrier} />,
        },
      ],
    },
    {
      id: 'transport',
      title: t('sidebar.transport_title'),
      items: [
        {
          id: 'transport',
          label: t('sidebar.transport'),
          href: '#',
          icon: <Icon icon={icon.transport} />,
        },
      ],
    },
    {
      id: 'admin',
      title: t('sidebar.admin_title'),
      items: [
        { id: 'refs', label: t('sidebar.refs'), href: '#', icon: <Icon icon={icon.refs} /> },
        {
          id: 'mgrs',
          label: t('sidebar.mgrs'),
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
    ></ProfileLayout>
  );
}
