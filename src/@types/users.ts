// ----------------------------------------------------------------------

export type usersState = {
  loading: Boolean;
  error: Boolean;
  usersList: Array<[]>;
  adminUsersList: Array<[]>;
  invitedUsersList: Array<[]>;
  adminSetting: object;
  adminUsersData: object;
  usersData: object;
};
