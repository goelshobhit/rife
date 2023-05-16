import { createSlice } from '@reduxjs/toolkit';
import { store } from '../store';
// utils
import axios from '../../utils/axios';
// @types
import { brandState } from '../../@types/brand';
import { handleFlattenNestedObjectOfArray } from '../../utils/flatten'

// ----------------------------------------------------------------------

const initialState: brandState = {
  loading: false,
  brand_list: [],
  brand_user_share_list: [],
  brandscore_task_list: [],
  brandscore_engagement_type_list: [],
  brandscore_engagement_settings_list: [],
  brandscore_increase_list: [],
  brandscore_list: [],
  quick_list_list: [],
  brand_task_closed_list: [],
};

const slice = createSlice({
  name: 'brand',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.loading = true;
    },
    stopLoading(state) {
      state.loading = false;
    },
    brandListSuccess(state, action) {
      state.brand_list = action.payload;
    },
    brandUserShareListSuccess(state, action) {
      state.brand_user_share_list = action.payload;
    },
  }
});

// Reducer
export default slice.reducer;


// ----------------------------------------------------------------------




export function getBrandList(params: any) {
  return async () => {
    const { dispatch } = store;
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(
        `brand/?pageNumber=${params.bonusPageNo}`
      );
      dispatch(slice.actions.stopLoading());
      dispatch(
        slice.actions.brandListSuccess({
          data: handleFlattenNestedObjectOfArray(response.data.data),
          totalRecords: response.data.totalRecords,
          columns: [],
        })
      );

    } catch (error) {
      // console.log(error);
    }
  };
}

export function getBrandUserShareList(params: any) {
  return async () => {
    const { dispatch } = store;
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(
        `brand_user_share/?pageNumber=${params.bonusPageNo}`
      );
      dispatch(slice.actions.stopLoading());
      dispatch(
        slice.actions.brandUserShareListSuccess({
          data: handleFlattenNestedObjectOfArray(response.data.data),
          totalRecords: response.data.totalRecords,
          columns: [],
        })
      );

    } catch (error) {
      // console.log(error);
    }
  };
}