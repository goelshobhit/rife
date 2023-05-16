import { createSlice } from '@reduxjs/toolkit';
import { map, size, get, capitalize, concat } from 'lodash';
import { store } from '../store';
// utils
import axios from '../../utils/axios';
// @types
import { rewardState } from '../../@types/reward';
import { handleFlattenNestedObjectOfArray } from '../../utils/flatten';

// ----------------------------------------------------------------------

const initialState: rewardState = {
  loading: false,
  rewardList: [],
  rewardCount: [],
  rewardAwards: [],
  rewardCenter: [],
  rewardSettings: [],
  rewardSelections: [],
  rewardEngineAwards: [],
  rewardEngineRewards: [],
  rewardEngineRequests: [],
  rewardBrandList: [],
  hasMoreBrands: true,
  brandPageNo: 1,
  rewardCenterImage: null,
};

const slice = createSlice({
  name: 'reward',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.loading = true;
    },
    stopLoading(state) {
      state.loading = false;
    },
    rewardListSuccess(state, action) {
      state.rewardList = action.payload;
    },
    rewardCountListSuccess(state, action) {
      state.rewardCount = action.payload;
    },
    rewardAwardsListSuccess(state, action) {
      state.rewardAwards = action.payload;
    },
    rewardCenterListSuccess(state, action) {
      state.rewardCenter = action.payload;
    },
    rewardSettingListSuccess(state, action) {
      state.rewardSettings = action.payload;
    },
    rewardSelectionListSuccess(state, action) {
      state.rewardSelections = action.payload;
    },
    rewardEngineAwardsListSuccess(state, action) {
      state.rewardEngineAwards = action.payload;
    },
    rewardEngineRewardsListSuccess(state, action) {
      state.rewardEngineRewards = action.payload;
    },
    rewardEngineRequestsListSuccess(state, action) {
      state.rewardEngineRequests = action.payload;
    },
    getTaskBrandSuccess(state, action) {
      state.brandPageNo += 1;
      state.rewardBrandList = concat(state.rewardBrandList, action.payload);
    },
    handleHasMore(state) {
      state.hasMoreBrands = false;
    },
    rewardCenterImage(state, action) {
      state.rewardCenterImage = action.payload;
    }
  }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getRewardList(params: any) {
  return async () => {
    const { dispatch } = store;
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`reward_center_dist`);
      dispatch(slice.actions.stopLoading());
      dispatch(
        slice.actions.rewardListSuccess({
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

export function getRewardCountList(params: any) {
  return async () => {
    const { dispatch } = store;
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`reward_count/?pageNumber=${params.bonusPageNo}`);
      dispatch(slice.actions.stopLoading());
      dispatch(
        slice.actions.rewardCountListSuccess({
          data: handleFlattenNestedObjectOfArray(response.data.data),
          totalRecords: response.data.totalRecords,
          columns: []
        })
      );
    } catch (error) {
      dispatch(slice.actions.stopLoading());
      // console.log(error);
    }
  };
}

export function getRewardCenterList(params: any) {
  return async () => {
    const { dispatch } = store;
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`reward_center/?pageNumber=${params.bonusPageNo}`);
      dispatch(slice.actions.stopLoading());
      dispatch(
        slice.actions.rewardCenterListSuccess({
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

export function getRewardSettingList(params: any) {
  return async () => {
    const { dispatch } = store;
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`reward_settings/?pageNumber=${params.bonusPageNo}`);
      const response2 = await axios.get(`reward_tokens`);
      dispatch(slice.actions.stopLoading());
      dispatch(
        slice.actions.rewardSettingListSuccess({
          data: response.data.data,
          totalRecords: response.data.totalRecords,
          columns: [],
          tokenData: response2.data.data
        })
      );
    } catch (error) {
      // console.log(error);
    }
  };
}

export function getRewardSelectionList(params: any) {
  return async () => {
    const { dispatch } = store;
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`reward_user_selection/?pageNumber=${params.bonusPageNo}`);
      dispatch(slice.actions.stopLoading());
      dispatch(
        slice.actions.rewardSelectionListSuccess({
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

export function getRewardEngineAwardsList(params: any) {
  return async () => {
    const { dispatch } = store;
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`rewards-engine/awards/?pageNumber=${params.bonusPageNo}`);
      dispatch(slice.actions.stopLoading());
      dispatch(
        slice.actions.rewardEngineAwardsListSuccess({
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

export function getRewardEngineRewardsList(params: any) {
  return async () => {
    const { dispatch } = store;
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`rewards-engine/reward_listing/?pageNumber=${params.bonusPageNo}`);
      dispatch(slice.actions.stopLoading());
      dispatch(
        slice.actions.rewardEngineRewardsListSuccess({
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

export function getRewardEngineRequestsList(params: any) {
  return async () => {
    const { dispatch } = store;
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`rewards-engine/request_rewards/?pageNumber=${params.bonusPageNo}`);
      dispatch(slice.actions.stopLoading());
      dispatch(
        slice.actions.rewardEngineRequestsListSuccess({
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


export function getAllBrands(params: any) {
  return async () => {
    const { dispatch } = store;
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(
        `/brand?pageNumber=${params.brandPageNo}`
      );
      if (size(get(response, 'data.data', [])) < 10) {
        dispatch(slice.actions.handleHasMore());
      }
      const getBrandName = map(get(response, 'data.data', []), (item: any) => {
        const data = { name: capitalize(item.cr_co_name), ...item, };
        return data;
      });
      dispatch(slice.actions.getTaskBrandSuccess(getBrandName));
      dispatch(slice.actions.stopLoading());
    } catch (error) {
      // console.log(error);
      // do nothing
    }
  };
}

export function createRewardTask(params: any) {
  return async () => {
    const { dispatch } = store;
    dispatch(slice.actions.startLoading());
    try {
      await axios.post(
       'reward_center', { ...params }
      );
      dispatch(slice.actions.stopLoading());
    } catch (error) {
      // console.log(error);
      // do nothing
    }
  };
}

export function createRewardImage(params: any) {
  return async () => {
    const { dispatch } = store;
    try {
     const response =  await axios.post(
       'images-upload', params, { headers: {
        'content-type': 'multipart/form-data'
       }});
      dispatch(slice.actions.rewardCenterImage(response.data.data[0].image_url))
    } catch (error) {
      // console.log(error);
      // do nothing
    }
  };
}