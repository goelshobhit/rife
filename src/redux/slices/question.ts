import { createSlice } from '@reduxjs/toolkit';
import concat from 'lodash/concat';
import map from 'lodash/map';
import get from 'lodash/get';
import size from 'lodash/size';
import { capitalize } from 'lodash';
import { store } from '../store';
// utils
import axios from '../../utils/axios';
// @types
import { taskQuestionState } from '../../@types/question';

// ----------------------------------------------------------------------

const initialState: taskQuestionState = {
  loading: false,
  brands: [],
  brandPageNo: 1,
  hasMoreBrands: true
};

const slice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.loading = true;
    },
    // GET BRANDS
    getTaskBrandSuccess(state, action) {
      state.loading = false;
      state.brandPageNo += 1;
      state.brands = concat(state.brands, action.payload);
    },
    handleHasMore(state) {
      state.hasMoreBrands = false;
    }
  }
});

// Reducer
export default slice.reducer;

// Actions
export const { getTaskBrandSuccess } = slice.actions;

// ----------------------------------------------------------------------

export function getAllBrands(params: any) {
  return async () => {
    const { dispatch } = store;
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`/brand?pageNumber=${params.brandPageNo}`);
      if (size(get(response, 'data.data', [])) < 10) {
        dispatch(slice.actions.handleHasMore());
      }
      const getBrandName = map(get(response, 'data.data', []), (item: any) => {
        const data = { name: capitalize(item.cr_co_name), ...item };
        return data;
      });
      dispatch(slice.actions.getTaskBrandSuccess(getBrandName));
    } catch (error) {
      // console.log(error);
      // do nothing
    }
  };
}

export function createSurvey(params: any) {
  return async () => {
    try {
      await axios.post('/survey', {
        ...params
      });
    } catch (error) {
      // console.log(error);
      // do nothing
    }
  };
}
