// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import Label from '../../components/Label';
import SvgIconStyle from '../../components/SvgIconStyle';

// ----------------------------------------------------------------------

const getIcon = (name: string) => (
  <SvgIconStyle src={`/static/icons/navbar/${name}.svg`} sx={{ width: '100%', height: '100%' }} />
);

const ICONS = {
  blog: getIcon('ic_blog'),
  cart: getIcon('ic_cart'),
  chat: getIcon('ic_chat'),
  mail: getIcon('ic_mail'),
  user: getIcon('ic_user'),
  calendar: getIcon('ic_calendar'),
  ecommerce: getIcon('ic_ecommerce'),
  analytics: getIcon('ic_analytics'),
  dashboard: getIcon('ic_dashboard'),
  kanban: getIcon('ic_kanban')
};

const sidebarConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: 'general',
    items: [
      {
        title: 'Dashboard',
        path: PATH_DASHBOARD.general.app,
        icon: ICONS.dashboard
      },
    ]
  },

  // MANAGEMENT
  // ----------------------------------------------------------------------
  {
    subheader: 'management',
    items: [
      {
        title: 'Tasks',
        path: PATH_DASHBOARD.task.root,
        icon: ICONS.dashboard,
        children: [
          { title: 'Contest', path: PATH_DASHBOARD.task.contest },
          { title: 'Question', path: PATH_DASHBOARD.task.questions },
          { title: 'Watch', path: PATH_DASHBOARD.task.watch },
        ]
      },
      {
        title: 'Bonus',
        path: PATH_DASHBOARD.bonus.bonus_root,
        icon: ICONS.blog,
        children: [
          { title: 'Bonus Prizes', path: PATH_DASHBOARD.bonus.bonus_prize },
          { title: 'Bonus Rules', path: PATH_DASHBOARD.bonus.bonus_rule },
          { title: 'Bonus Set', path: PATH_DASHBOARD.bonus.bonus_set },
        ]
      },
      {
        title: 'Brand',
        path: PATH_DASHBOARD.brand.brand_root,
        icon: ICONS.ecommerce,
        children: [
          { title: 'User Share', path: PATH_DASHBOARD.brand.brand_user_root },
          { title: 'Score Task', path: PATH_DASHBOARD.brand.brand_root },
          { title: 'Score Engagement Task', path: PATH_DASHBOARD.brand.brand_root },
          { title: 'Score Engagement Type', path: PATH_DASHBOARD.brand.brand_root },
          { title: 'Score Engagement Setting', path: PATH_DASHBOARD.brand.brand_root },
          { title: 'Score Increase', path: PATH_DASHBOARD.brand.brand_root },
          { title: 'Quick List', path: PATH_DASHBOARD.brand.brand_root },
          { title: 'Task Closed', path: PATH_DASHBOARD.brand.brand_root },
        ]
      },
      {
        title: 'Users',
        path: PATH_DASHBOARD.userList.userList_root,
        icon: ICONS.user,
        children: [
          { title: 'Admin Users', path: PATH_DASHBOARD.userList.userList_admin_root },
          { title: 'Invited Users', path: PATH_DASHBOARD.userList.userList_invited_root },
        ]
      },
      {
        title: 'Reward',
        path: PATH_DASHBOARD.reward.reward_center,
        icon: ICONS.cart,
      },
    ]
  },
  // APP
  // ----------------------------------------------------------------------
  // {
  //   subheader: 'admin',
  //   items: [
  //     {
  //       title: 'rewards',
  //       path: PATH_DASHBOARD.mail.root,
  //       icon: ICONS.mail,
  //       info: <Label color="error">2</Label>
  //     },
  //     { title: 'Bonus', path: PATH_DASHBOARD.chat.root, icon: ICONS.chat },
  //     { title: 'brand score', path: PATH_DASHBOARD.calendar, icon: ICONS.calendar },
  //     {
  //       title: 'points',
  //       path: PATH_DASHBOARD.kanban,
  //       icon: ICONS.kanban
  //     },
  //     {
  //       title: 'mini tasks',
  //       path: PATH_DASHBOARD.kanban,
  //       icon: ICONS.kanban
  //     }
  //   ]
  // },
  // {
  //   subheader: 'admin',
  //   items: [
  //     {
  //       title: 'inbox',
  //       path: PATH_DASHBOARD.mail.root,
  //       icon: ICONS.mail,
  //       info: <Label color="error">2</Label>
  //     },
  //     { title: 'report', path: PATH_DASHBOARD.chat.root, icon: ICONS.chat },
  //     { title: 'settings', path: PATH_DASHBOARD.calendar, icon: ICONS.calendar },
  //     {
  //       title: 'requests',
  //       path: PATH_DASHBOARD.kanban,
  //       icon: ICONS.kanban
  //     },
  //   ]
  // }
];

export default sidebarConfig;
