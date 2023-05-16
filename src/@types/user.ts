// ----------------------------------------------------------------------

import { FormikProps } from 'formik';

export type UserInvoice = {
  id: string;
  createdAt: Date;
  price: number;
};

export type CreditCard = {
  id: string;
  cardNumber: string;
  cardType: string;
};

export type Follower = {
  id: string;
  avatarUrl: string;
  name: string;
  country: string;
  isFollowed: boolean;
};

export type Gallery = {
  id: string;
  title: string;
  postAt: Date;
  imageUrl: string;
};

export type UserAddressBook = {
  id: string;
  name: string;
  phone: string;
  country: string;
  state: string;
  city: string;
  street: string;
  zipCode: string;
};

export type Profile = {
  id: string;
  cover: string;
  position: string;
  follower: number;
  following: number;
  quote: string;
  country: string;
  email: string;
  company: string;
  school: string;
  role: string;
  facebookLink: string;
  instagramLink: string;
  linkedinLink: string;
  twitterLink: string;
};

export type PropTypeUserCMSDetails = {
  u_id: number;
  u_login: string;
  u_referer_id: number;
  u_acct_type: number;
  u_act_sec: number;
  u_email: string;
  u_active: boolean;
  u_pref_login: number;
  u_created_at: string;
  u_updated_at: string;
  u_email_verify_status: boolean;
  is_user_deactivated: number;
  is_user_hidden:  number;
  'Tickets Earned':  number;
  'Presents Earned':  number;
  'Lottery Wheels':  number;
  'Easter Eggs':  number;
  'Chests Earned':  number;
  'Bonuses Won': string;
  'Bonus Tasks Completed': string;
  'Tasks Entered':  number;
  'Contests Entered':  number;
  'Content Entered':  number;
  Surveys: string;
  Following: string;
  Followers: any;
  'Ads Watched': any;
  'Liked Comments': any;
  'Disliked Comments': any;
  'Reactions Received': any;
  'Reactions Given': any;
  'Reported Content': any;
  'Number of Brands': any;
  'Tier 2 Sent': any;
  'Tier 2 Incomplete': any;
  'Tier 2 Declined': any;
  'Tier 2 Completed': any;
  'Tier 3 Completed': any;
  'Tier 3 Sent': any;
  'Tier 3 Incomplete': any;
  'Tier 3 Declined': any;
  'Brands Participated': any;
};

export type UserManager = {
  u_id: number;
  id: string;
  avatarUrl: string;
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  country: string;
  state: string;
  city: string;
  zipCode: string;
  company: string;
  isVerified: boolean;
  status: string;
  role: string;
  user_cms_details: PropTypeUserCMSDetails;
};

export type UserData = {
  id: string;
  avatarUrl: string;
  cover: string;
  name: string;
  follower: number;
  following: number;
  totalPost: number;
  position: string;
};

export type NotificationSettings = {
  activityComments: boolean;
  activityAnswers: boolean;
  activityFollows: boolean;
  applicationNews: boolean;
  applicationProduct: boolean;
  applicationBlog: boolean;
};

export type Friend = {
  id: string;
  avatarUrl: string;
  name: string;
  role: string;
};

export type UserPost = {
  id: string;
  author: {
    id: string;
    avatarUrl: string;
    name: string;
  };
  isLiked: boolean;
  createdAt: Date;
  media: string;
  message: string;
  personLikes: {
    name: string;
    avatarUrl: string;
  }[];
  comments: {
    id: string;
    author: {
      id: string;
      avatarUrl: string;
      name: string;
    };
    createdAt: Date;
    message: string;
  }[];
};

export type AccountBillingFormikProps = FormikProps<{
  cardName: string;
  cardNumber: string;
  cardExpired: string;
  cardCvv: string;
}>;
