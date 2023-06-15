// ----------------------------------------------------------------------

export type brandState = {
  loading: Boolean;
  brand_list: Array<[]>;
  selected_brand: Array<[]>;
  brand_user_share_list: Array<[]>;
  brandscore_task_list: Array<[]>;
  brandscore_engagement_type_list: Array<[]>;
  brandscore_engagement_settings_list: Array<[]>;
  brandscore_increase_list: Array<[]>;
  brandscore_list: Array<[]>;
  quick_list_list: Array<[]>;
  brand_task_closed_list: Array<[]>;
};

export type IBrand = {
  cr_co_id: string;
  cr_co_name: string;
  cr_co_address: string;
  cr_co_city: string;
  cr_co_state: string;
  cr_co_country: string;
  cr_co_pincode: string;
  cr_co_phone: string;
  cr_co_handle: string | null;
  cr_co_email: string;
  cr_co_logo_path: string | null;
  cr_co_fb_handle: string;
  cr_co_tw_handle: string;
  cr_co_pint_handle: string;
  cr_co_insta_handle: string;
  cr_co_desc_short: string;
  cr_co_desc_long: string;
  cr_co_website: string;
  cr_co_contact_pers: string;
  cr_co_contact_pers_dept: string;
  cr_co_contact_pers_phone_ext: string;
  cr_co_contact_pers_email: string;
  cr_co_contact_pers_title: string;
  cr_co_contact_pers_industry: string;
  cr_co_other_categories: string | null;
  cr_co_status: number;
  cr_co_cover_img_path: string | null;
  cr_co_total_token: number;
  cr_co_token_spent: number;
  cr_co_alias: string;
  is_autotakedown: number;
  cr_co_created_at: Date;
  cr_co_updated_at: Date;
  campaigns: [];
  co_budgets: [];
};
