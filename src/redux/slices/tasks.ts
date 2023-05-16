import { createSlice } from '@reduxjs/toolkit';
import forEach from 'lodash/forEach';
import concat from 'lodash/concat';
import map from 'lodash/map';
import get from 'lodash/get';
import size from 'lodash/size';
import { capitalize, filter, isEqual, toNumber } from 'lodash';
import { store } from '../store';
// utils
import axios from '../../utils/axios';
// @types
import { taskBrandsState } from '../../@types/task';

// ----------------------------------------------------------------------

const initialState: taskBrandsState = {
  loading: false,
  brands: [],
  brandPageNo: 1,
  hasMoreBrands: true,
  taskList: [],
  taskListTotal: 0,
  selectedBrandBonus: [],
  selectedBrandBonusLoading: false,
  rewardCenter: [],
  bonusSet: []
};

const slice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.loading = true;
    },
    stopLoading(state) {
      state.loading = false;
    },
    // GET BRANDS
    getTaskBrandSuccess(state, action) {
      state.loading = false;
      state.brandPageNo += 1;
      state.brands = concat(state.brands, action.payload);
    },
    handleHasMore(state) {
      state.hasMoreBrands = false;
    },
    getTaskListLoading(state) {
      state.taskList = [];
    },

    getTaskList(state, action) {
      state.taskList = action.payload.data;
      state.taskListTotal = action.payload.totalRecords;
    },

    getSelectedBrandBonus(state) {
      state.selectedBrandBonus = [];
      state.selectedBrandBonusLoading = true;
    },
    getSelectedBrandBonusSuccess(state, action) {
      state.selectedBrandBonus = action.payload;
      state.selectedBrandBonusLoading = false;
    },
    getRewardsSuccess(state, action) {
      state.rewardCenter = action.payload;
    },
    getBonusSetSuccess(state, action) {
      state.bonusSet = action.payload;
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

const flattenObj = (ob: any) => {
  // The object which contains the
  // final result
  const result: any = {};

  // loop through the object "ob"
  for (const i in ob) {
    // We check the type of the i using
    // typeof() function and recursively
    // call the function again
    if (typeof ob[i] === 'object' && !Array.isArray(ob[i])) {
      const temp = flattenObj(ob[i]);
      // eslint-disable-next-line guard-for-in
      for (const j in temp) {
        const key = `${i}.${j}`;
        // Store temp in result
        result[key] = temp[j];
      }
    } else if (typeof ob[i] === 'object' && Array.isArray(ob[i])) {
      forEach(ob[i], (item: any) => {
        result[i] = item;
      });
    }

    // Else store ob[i] in result directly
    else {
      /* tslint:disable-next-line */
      result[i] = ob[i];
    }
  }
  return result;
};

const handleFlattenNestedObjectOfArray = (array: any) =>
  map(array, (item: any, index: number) => flattenObj(item));

export function getListTask(params: any) {
  return async () => {
    const { dispatch } = store;
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(
        `/tasks_list/?isAdmin=1&pageNumber=${params.brandPageNo}&pageSize=10`
      );
      dispatch(
        slice.actions.getTaskList({
          data: handleFlattenNestedObjectOfArray(response.data.data),
          totalRecords: response.data.totalRecords
        })
      );
      dispatch(slice.actions.stopLoading());
    } catch (error) {
      dispatch(slice.actions.stopLoading());
      // console.log(error);
      // do nothing
    }
  };
}

export function getContestListTask(params: any) {
  return async () => {
    const { dispatch } = store;
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(
        `/tasks_list/?isAdmin=1&pageNumber=${params.brandPageNo}&pageSize=10`
      );

      const filterQuestionsResponse = filter(
        response.data.data,
        (item: any) =>
          isEqual(toNumber(item.task_data.media_type), 1) ||
          isEqual(toNumber(item.task_data.media_type), 2)
      );

      dispatch(
        slice.actions.getTaskList({
          data: handleFlattenNestedObjectOfArray(filterQuestionsResponse),
          totalRecords: response.data.totalRecords
        })
      );
      dispatch(slice.actions.stopLoading());
    } catch (error) {
      dispatch(slice.actions.stopLoading());
      // console.log(error);
      // do nothing
    }
  };
}

export function getWatchListTask(params: any) {
  return async () => {
    const { dispatch } = store;
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(
        `/tasks_list/?isAdmin=1&pageNumber=${params.brandPageNo}&pageSize=10`
      );

      const filterQuestionsResponse = filter(response.data.data, (item: any) =>
        isEqual(toNumber(item.task_data.ta_type), 1)
      );

      dispatch(
        slice.actions.getTaskList({
          data: handleFlattenNestedObjectOfArray(filterQuestionsResponse),
          totalRecords: response.data.totalRecords
        })
      );
      dispatch(slice.actions.stopLoading());
    } catch (error) {
      dispatch(slice.actions.stopLoading());
      // console.log(error);
      // do nothing
    }
  };
}

export function getQuestionListTask(params: any) {
  return async () => {
    const { dispatch } = store;
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`/tasks_list/?isAdmin=1&pageNumber=${params.brandPageNo}`);

      const filterQuestionsResponse = filter(response.data.data, (item: any) =>
        isEqual(toNumber(item.task_data.ta_type), 1)
      );

      dispatch(
        slice.actions.getTaskList({
          data: handleFlattenNestedObjectOfArray(filterQuestionsResponse),
          totalRecords: response.data.totalRecords
        })
      );
      dispatch(slice.actions.stopLoading());
    } catch (error) {
      dispatch(slice.actions.stopLoading());
      // console.log(error);
      // do nothing
    }
  };
}

export function getSelectedBrandBonus(params: any) {
  return async () => {
    const { dispatch } = store;
    dispatch(slice.actions.getSelectedBrandBonus());
    try {
      const response = await axios.get(`/bonus_item?brandId=${params.brandId}`);
      dispatch(slice.actions.getSelectedBrandBonusSuccess(response.data.data[0]));
    } catch (error) {
      // console.log(error);
      // do nothing
    }
  };
}

export function getRewards() {
  return async () => {
    const { dispatch } = store;
    try {
      const response = await axios.get(`/reward_center`);
      dispatch(slice.actions.getRewardsSuccess(response.data.data));
    } catch (error) {
      // console.log(error);
      // do nothing
    }
  };
}

export function createBrandTask(params: any) {
  return async () => {
    try {
      await axios.post('/tasks', {
        ...params
      });
    } catch (error) {
      // console.log(error);
      // do nothing
    }
  };
}

export function getBonusSet() {
  return async () => {
    const { dispatch } = store;
    try {
      const response = await axios.get('/bonus_set/?pageNumber=1');
      dispatch(slice.actions.getBonusSetSuccess(response.data.data));
    } catch (error) {
      // console.log(error);
      // do nothing
    }
  };
}
