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
  invitedUsersList: []
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
    },
    usersAdminListSuccess(state, action) {
      state.adminUsersList = action.payload;
    },
    usersInvitedListSuccess(state, action) {
      state.invitedUsersList = action.payload;
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
