// ----------------------------------------------------------------------

function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '/dashboard';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  loginUnprotected: path(ROOTS_AUTH, '/login-unprotected'),
  register: path(ROOTS_AUTH, '/register'),
  registerUnprotected: path(ROOTS_AUTH, '/register-unprotected'),
  resetPassword: path(ROOTS_AUTH, '/reset-password'),
  verify: path(ROOTS_AUTH, '/verify')
};

export const PATH_PAGE = {
  comingSoon: '/coming-soon',
  maintenance: '/maintenance',
  pricing: '/pricing',
  payment: '/payment',
  about: '/about-us',
  contact: '/contact-us',
  faqs: '/faqs',
  page404: '/404',
  page500: '/500',
  components: '/components'
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  general: {
    app: path(ROOTS_DASHBOARD, '/app'),
    ecommerce: path(ROOTS_DASHBOARD, '/ecommerce'),
    analytics: path(ROOTS_DASHBOARD, '/analytics')
  },
  mail: {
    root: path(ROOTS_DASHBOARD, '/mail'),
    all: path(ROOTS_DASHBOARD, '/mail/all')
  },
  chat: {
    root: path(ROOTS_DASHBOARD, '/chat'),
    new: path(ROOTS_DASHBOARD, '/chat/new'),
    conversation: path(ROOTS_DASHBOARD, '/chat/:conversationKey')
  },
  calendar: path(ROOTS_DASHBOARD, '/calendar'),
  kanban: path(ROOTS_DASHBOARD, '/kanban'),
  user: {
    root: path(ROOTS_DASHBOARD, '/user'),
    profile: path(ROOTS_DASHBOARD, '/user/profile'),
    cards: path(ROOTS_DASHBOARD, '/user/cards'),
    list: path(ROOTS_DASHBOARD, '/user/list'),
    newUser: path(ROOTS_DASHBOARD, '/user/new'),
    editById: path(ROOTS_DASHBOARD, '/user/ada-lindgren/edit'),
    account: path(ROOTS_DASHBOARD, '/user/account')
  },
  eCommerce: {
    root: path(ROOTS_DASHBOARD, '/e-commerce'),
    shop: path(ROOTS_DASHBOARD, '/e-commerce/shop'),
    product: path(ROOTS_DASHBOARD, '/e-commerce/product/:name'),
    productById: path(ROOTS_DASHBOARD, '/e-commerce/product/nike-air-force-1-ndestrukt'),
    list: path(ROOTS_DASHBOARD, '/e-commerce/list'),
    newProduct: path(ROOTS_DASHBOARD, '/e-commerce/product/new'),
    editById: path(ROOTS_DASHBOARD, '/e-commerce/product/nike-blazer-low-77-vintage/edit'),
    checkout: path(ROOTS_DASHBOARD, '/e-commerce/checkout'),
    invoice: path(ROOTS_DASHBOARD, '/e-commerce/invoice')
  },
  blog: {
    root: path(ROOTS_DASHBOARD, '/blog'),
    posts: path(ROOTS_DASHBOARD, '/blog/posts'),
    post: path(ROOTS_DASHBOARD, '/blog/post/:title'),
    postById: path(ROOTS_DASHBOARD, '/blog/post/portfolio-review-is-this-portfolio-too-creative'),
    newPost: path(ROOTS_DASHBOARD, '/blog/new-post')
  },
  task: {
    root: path(ROOTS_DASHBOARD, '/task'),
    create: path(ROOTS_DASHBOARD, '/task/create'),
    contest: path(ROOTS_DASHBOARD, '/task/contest'),
    watch: path(ROOTS_DASHBOARD, '/task/watch'),
    questions: path(ROOTS_DASHBOARD, '/task/questions'),
  },
  bonus: {
    bonus_root:path(ROOTS_DASHBOARD, '/bonus'),
    bonus_prize: path(ROOTS_DASHBOARD, '/bonus/prize'),
    bonus_rule: path(ROOTS_DASHBOARD, '/bonus/rule'),
    bonus_set: path(ROOTS_DASHBOARD, '/bonus/set'),
    bonus_rule_detail:path(ROOTS_DASHBOARD, '/bonus/rule/add'),
    bonus_set_detail_list: path(ROOTS_DASHBOARD,'/bonus/set/add'),
    bonus_set_detail: path(ROOTS_DASHBOARD,'/bonus/set/:id'),
  },
  userList: {
    userList_root: path(ROOTS_DASHBOARD, '/usersList'),
    userList_admin_root: path(ROOTS_DASHBOARD, '/usersList/admin'),
    userList_invited_root: path(ROOTS_DASHBOARD, '/usersList/invited'),
  },
  brand: {
    brand_root:path(ROOTS_DASHBOARD, '/brand'),
    brand_user_root:path(ROOTS_DASHBOARD, '/brand/user'),
  },
  reward: {
    reward_root:path(ROOTS_DASHBOARD, '/reward'),
    reward_count:path(ROOTS_DASHBOARD, '/reward/count'),
    reward_awards:path(ROOTS_DASHBOARD, '/reward/awards'),
    reward_center:path(ROOTS_DASHBOARD, '/reward/center'),
    reward_setting:path(ROOTS_DASHBOARD, '/reward/setting'),
    reward_selection:path(ROOTS_DASHBOARD, '/reward/selection'),
    reward_engine_awards:path(ROOTS_DASHBOARD, '/reward/engineAwards'),
    reward_engine_rewards:path(ROOTS_DASHBOARD, '/reward/engineRewards'),
    reward_engine_requests:path(ROOTS_DASHBOARD, '/reward/engineRequests'),
    reward_center_detail:path(ROOTS_DASHBOARD, '/reward/center/:id'),
  },
};

export const PATH_DOCS = 'https://docs-minimals.vercel.app/introduction';
