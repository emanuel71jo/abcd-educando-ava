import editBagFill from '@iconify/icons-eva/edit-fill';
import folderFill from '@iconify/icons-eva/folder-fill';
import monitorFill from '@iconify/icons-eva/monitor-fill';
import peopleFill from '@iconify/icons-eva/people-fill';
import pieChart2Fill from '@iconify/icons-eva/pie-chart-2-fill';
import { Icon } from '@iconify/react';

// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: getIcon(pieChart2Fill)
  },
  {
    title: 'classes',
    path: '/dashboard/classes',
    icon: getIcon(monitorFill)
  },
  {
    title: 'modules',
    path: '/dashboard/modules',
    icon: getIcon(folderFill)
  },
  {
    title: 'exam',
    path: '/dashboard/exam',
    icon: getIcon(editBagFill)
  },
  {
    title: 'students',
    path: '/dashboard/students',
    icon: getIcon(peopleFill)
  }
];

export default sidebarConfig;
