import { Suspense, lazy } from 'react';
import { Navigate, useRoutes, useLocation } from 'react-router-dom';
// layouts
import DashboardLayout from '../layouts/dashboard';
import LogoOnlyLayout from '../layouts/LogoOnlyLayout';
// guards
import GuestGuard from '../guards/GuestGuard';
import AuthGuard from '../guards/AuthGuard';
// import RoleBasedGuard from '../guards/RoleBasedGuard';
// components
import LoadingScreen from '../components/LoadingScreen';

// ----------------------------------------------------------------------

const Loadable = (Component: any) => (props: any) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();
  const isDashboard = pathname.includes('/dashboard');

  return (
    <Suspense
      fallback={
        <LoadingScreen
          sx={{
            ...(!isDashboard && {
              top: 0,
              left: 0,
              width: 1,
              zIndex: 9999,
              position: 'fixed'
            })
          }}
        />
      }
    >
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: 'auth',
      children: [
        {
          path: 'login',
          element: (
            <GuestGuard>
              <Login />
            </GuestGuard>
          )
        },
        {
          path: 'register',
          element: (
            <GuestGuard>
              <Register />
            </GuestGuard>
          )
        },
        { path: 'login-unprotected', element: <Login /> },
        { path: 'register-unprotected', element: <Register /> },
        { path: 'reset-password', element: <ResetPassword /> }
        // { path: 'verify', element: <VerifyCode /> }
      ]
    },

    // Dashboard Routes
    {
      path: 'dashboard',
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [
        { path: '/', element: <Navigate to="/dashboard/app" replace /> },
        { path: 'app', element: <GeneralApp /> },
        {
          path: 'task',
          children: [
            { path: '/', element: <TaskList /> },
            { path: 'contest', element: <TaskContestList /> },
            { path: 'questions', element: <TaskQuestionList /> },
            { path: 'watch', element: <TaskWatchList /> },
            { path: 'create', element: <TaskCreateList /> }
          ]
        },
        {
          path: 'bonus',
          children: [
            { path: '/', element: <BonusList /> },
            { path: 'prize', element: <BonusPrizeList /> },
            { path: 'rule', element: <BonusRuleList /> },
            { path: 'set', element: <BonusSetList /> },
            { path: 'rule/add', element: <BonusRuleDetailList /> },
            { path: 'set/add', element: <BonusSetDetailList /> },
            { path: 'set/:id', element: <BonusSetDetail /> }
          ]
        },
        {
          path: 'brand',
          children: [
            { path: '/', element: <BrandList /> },
            { path: 'create', element: <BrandCreate /> },
            { path: 'edit/:id', element: <BrandUpdate /> },
            { path: 'user', element: <BrandUserList /> }
          ]
        },
        {
          path: 'usersList',
          children: [
            { path: '/', element: <UsersList /> },
            { path: 'create', element: <UsersCreate /> },
            { path: 'edit/:id', element: <UsersUpdate /> },
            { path: 'admin', element: <UsersAdminList /> },
            { path: 'admin/create', element: <AdminUsersCreate /> },
            { path: 'admin/edit/:id', element: <AdminUsersUpdate /> },
            { path: 'invited', element: <UsersInvitedList /> }
          ]
        },
        {
          path: 'reward',
          children: [
            { path: '/', element: <RewardList /> },
            { path: 'count', element: <RewardCountList /> },
            { path: 'center', element: <RewardCenterList /> },
            { path: 'setting', element: <RewardSettingList /> },
            { path: 'selection', element: <RewardSelectionList /> },
            { path: 'engineAwards', element: <RewardEngineAwardsList /> },
            { path: 'engineRewards', element: <RewardEngineRewardsList /> },
            { path: 'engineRequests', element: <RewardEngineRequestList /> },
            { path: 'center/:id', element: <RewardDetail /> }
          ]
        },
        {
          path: 'user',
          children: [
            { path: 'profile', element: <UserAccount /> },
            { path: 'account', element: <UserSetting /> }
          ]
        }
      ]
    },

    // Main Routes
    {
      path: '*',
      element: <LogoOnlyLayout />,
      children: [
        { path: 'coming-soon', element: <ComingSoon /> },
        // { path: 'maintenance', element: <Maintenance /> },
        // { path: 'pricing', element: <Pricing /> },
        // { path: 'payment', element: <Payment /> },
        { path: '500', element: <Page500 /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" replace /> }
      ]
    },
    {
      path: '/',
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [
        { path: '/', element: <Navigate to="/dashboard/app" replace /> },
        { path: 'app', element: <GeneralApp /> }
      ]
    },
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}

// IMPORT COMPONENTS

// Authentication
const Login = Loadable(lazy(() => import('../pages/authentication/Login')));
const Register = Loadable(lazy(() => import('../pages/authentication/Register')));
const ResetPassword = Loadable(lazy(() => import('../pages/authentication/ResetPassword')));
// Dashboard
const GeneralApp = Loadable(lazy(() => import('../pages/dashboard/GeneralApp')));
// Main
const ComingSoon = Loadable(lazy(() => import('../pages/ComingSoon')));
const Page500 = Loadable(lazy(() => import('../pages/Page500')));
const NotFound = Loadable(lazy(() => import('../pages/Page404')));
// Components

const TaskList = Loadable(lazy(() => import('../pages/dashboard/task/task_list')));
const TaskCreateList = Loadable(lazy(() => import('../pages/dashboard/task/mutipleTask')));
const TaskContestList = Loadable(lazy(() => import('../pages/dashboard/task/task_contest_list')));
const TaskQuestionList = Loadable(lazy(() => import('../pages/dashboard/task/task_question_list')));
const TaskWatchList = Loadable(lazy(() => import('../pages/dashboard/task/task_watch_list')));

const BonusList = Loadable(lazy(() => import('../pages/dashboard/bonus/bonus_list')));
const BonusPrizeList = Loadable(lazy(() => import('../pages/dashboard/bonus/bonus_prize_list')));
const BonusRuleList = Loadable(lazy(() => import('../pages/dashboard/bonus/bonus_rules_list')));
const BonusSetList = Loadable(lazy(() => import('../pages/dashboard/bonus/bonus_set_list')));
const BonusRuleDetailList = Loadable(
  lazy(() => import('../pages/dashboard/bonus/bonus_detail_list'))
);

const BonusSetDetailList = Loadable(
  lazy(() => import('../pages/dashboard/bonus/bonus_set_detail_list'))
);
const BonusSetDetail = Loadable(lazy(() => import('../pages/dashboard/bonus/bonus_set_detail')));

const BrandList = Loadable(lazy(() => import('../pages/dashboard/brand/brand_list')));
const BrandCreate = Loadable(lazy(() => import('../pages/dashboard/brand/brand_create')));
const BrandUpdate = Loadable(lazy(() => import('../pages/dashboard/brand/brand_update')));
const BrandUserList = Loadable(lazy(() => import('../pages/dashboard/brand/brand_user_list')));
const UsersList = Loadable(lazy(() => import('../pages/dashboard/user/users_list')));
const UsersCreate = Loadable(lazy(() => import('../pages/dashboard/user/users_create')));
const UsersUpdate = Loadable(lazy(() => import('../pages/dashboard/user/user_update')));
const UsersAdminList = Loadable(lazy(() => import('../pages/dashboard/user/users_admin_list')));
const AdminUsersCreate = Loadable(lazy(() => import('../pages/dashboard/user/user_admin_create')));
const AdminUsersUpdate = Loadable(lazy(() => import('../pages/dashboard/user/user_admin_update')));
const UsersInvitedList = Loadable(lazy(() => import('../pages/dashboard/user/users_invited_list')));
const RewardList = Loadable(lazy(() => import('../pages/dashboard/reward/reward_list')));
const RewardDetail = Loadable(lazy(() => import('../pages/dashboard/reward/reward_detail_page')));
const RewardCountList = Loadable(lazy(() => import('../pages/dashboard/reward/reward_count_list')));
const RewardCenterList = Loadable(
  lazy(() => import('../pages/dashboard/reward/reward_center_list'))
);
const RewardSettingList = Loadable(
  lazy(() => import('../pages/dashboard/reward/reward_setting_list'))
);
const RewardSelectionList = Loadable(
  lazy(() => import('../pages/dashboard/reward/reward_selection_list'))
);
const RewardEngineAwardsList = Loadable(
  lazy(() => import('../pages/dashboard/reward/reward_engine_award_list'))
);
const RewardEngineRewardsList = Loadable(
  lazy(() => import('../pages/dashboard/reward/reward_engine_reward_list'))
);
const RewardEngineRequestList = Loadable(
  lazy(() => import('../pages/dashboard/reward/reward_engine_request_list'))
);
const UserAccount = Loadable(lazy(() => import('../pages/dashboard/user/user_profile')));
const UserSetting = Loadable(lazy(() => import('../pages/dashboard/user/user_settings')));
