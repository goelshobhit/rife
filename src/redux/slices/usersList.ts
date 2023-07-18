import { createSlice } from '@reduxjs/toolkit';
import { store, dispatch } from '../store';
// utils
import axios from '../../utils/axios';
// @types
import { usersState } from '../../@types/users';
import { handleFlattenNestedObjectOfArray } from '../../utils/flatten';

// ----------------------------------------------------------------------

const initialState: usersState = {
  loading: false,
  error: false,
  usersList: [],
  adminUsersList: [],
  invitedUsersList: [],
  adminSetting: {},
  adminUsersData: {},
  usersData: {}
};

const slice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.loading = true;
    },
    stopLoading(state) {
      state.loading = false;
    },
    usersListSuccess(state, action) {
      state.usersList = action.payload;
      state.error = false;
    },
    usersByIdSuccess(state, action) {
      state.usersData = action.payload;
      state.error = false;
    },
    usersAdminListSuccess(state, action) {
      state.adminUsersList = action.payload;
      state.error = false;
    },
    usersAdminByIdSuccess(state, action) {
      state.adminUsersData = action.payload;
      state.error = false;
    },
    usersInvitedListSuccess(state, action) {
      state.invitedUsersList = action.payload;
      state.error = false;
    },
    userAdminSettingSuccess(state, action) {
      state.adminSetting = action.payload;
      state.error = false;
    },
    hasError(state, action) {
      state.loading = false;
      state.error = action.payload;
    }
  }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getUsersList(params: any) {
  return async () => {
    const { dispatch } = store;
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`users/?pageNumber=${params.bonusPageNo}&pageSize=10`);
      dispatch(slice.actions.stopLoading());
      dispatch(
        slice.actions.usersListSuccess({
          data: handleFlattenNestedObjectOfArray(response.data.data),
          totalRecords: response.data.totalRecords,
          columns: []
        })
      );
    } catch (error) {
      // console.log(error);
    }
  };
}

export function getUsersById(id: number) {
  return async () => {
    const { dispatch } = store;
    try {
      const response = await axios.get(`users/${id}`);
      dispatch(slice.actions.usersByIdSuccess(response.data.user_details));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getAdminUsersList(params: any) {
  return async () => {
    const { dispatch } = store;
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`admin_users/?pageNumber=${params.bonusPageNo}`);
      dispatch(slice.actions.stopLoading());
      dispatch(
        slice.actions.usersAdminListSuccess({
          data: handleFlattenNestedObjectOfArray(response.data.data),
          totalRecords: response.data.totalRecords,
          columns: []
        })
      );
    } catch (error) {
      // console.log(error);
    }
  };
}

export function getAdminUsersById(id: number) {
  return async () => {
    const { dispatch } = store;
    try {
      const response = await axios.get(`admin_users/${id}`);
      dispatch(slice.actions.usersAdminByIdSuccess(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getInvitedUsersList(params: any) {
  return async () => {
    const { dispatch } = store;
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`users_invitation/?pageNumber=${params.bonusPageNo}`);
      dispatch(slice.actions.stopLoading());
      dispatch(
        slice.actions.usersInvitedListSuccess({
          data: handleFlattenNestedObjectOfArray(response.data.data),
          totalRecords: response.data.totalRecords,
          columns: []
        })
      );
    } catch (error) {
      // console.log(error);
    }
  };
}

export function createUser(params: any) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      await axios.post(`users`, { ...params });
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function updateUser(params: any, id: number) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      await axios.put(`users/${id}`, { ...params });
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function createAdminUser(params: any) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      await axios.post(`admin_users`, { ...params });
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function updateAdminUser(params: any, id: number) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      await axios.put(`admin_users/${id}`, { ...params });
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getAdminSetting() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`admin_setting`);
      dispatch(slice.actions.userAdminSettingSuccess(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function changeAdminSetting(params: any) {
  return async () => {
    try {
      await axios.put(`admin_setting`, { ...params });
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
