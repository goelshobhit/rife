import { createSlice } from '@reduxjs/toolkit';
import { store } from '../store';
// utils
import axios from '../../utils/axios';
// @types
import { bonusState } from '../../@types/bonus';
import { handleFlattenNestedObjectOfArray } from '../../utils/flatten'

// ----------------------------------------------------------------------

const initialState: bonusState = {
  loading: false,
  bonusList:[],
  bonusListColumns: [],
  bonusSetList: [],
  bonusRuleList: [],
  bonusPrizeList: [],
};

const slice = createSlice({
  name: 'bonus',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.loading = true;
    },
    stopLoading(state) {
      state.loading = false;
    },
    bonusListSuccess(state, action) {
      state.bonusList = action.payload;
    },
    bonusSetListSuccess(state, action) {
      state.bonusSetList = action.payload;
    },
    bonusRuleListSuccess(state, action) {
      state.bonusRuleList = action.payload;
    },
    bonusPrizeListSuccess(state, action) {
      state.bonusPrizeList = action.payload;
    }
  }
});

// Reducer
export default slice.reducer;


// ----------------------------------------------------------------------




export function getBonusList(params: any) {
  return async () => {
    const { dispatch } = store;
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(
        `bonus_item/?pageNumber=${params.bonusPageNo}`
      );
      dispatch(slice.actions.stopLoading());
      dispatch(
        slice.actions.bonusListSuccess({
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


export function getBonusSetList(params: any) {
  return async () => {
    const { dispatch } = store;
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(
        `bonus_set/?pageNumber=${params.bonusPageNo}`
      );
      dispatch(slice.actions.stopLoading());
      dispatch(
        slice.actions.bonusSetListSuccess({
          data: response.data.data,
          totalRecords: response.data.totalRecords,
          columns: [],
        })
      );

    } catch (error) {
      // console.log(error);
    }
  };
}

export function getBonusRuleList(params: any) {
  return async () => {
    const { dispatch } = store;
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(
        `bonus_tickets_rules/?pageNumber=${params.bonusPageNo}`
      );
      dispatch(slice.actions.stopLoading());
      dispatch(
        slice.actions.bonusRuleListSuccess({
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

export function getBonusPrizeList(params: any) {
  return async () => {
    const { dispatch } = store;
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(
        `bonus_reward/?pageNumber=${params.bonusPageNo}`
      );
      dispatch(slice.actions.stopLoading());
      dispatch(
        slice.actions.bonusPrizeListSuccess({
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

export function createBonusTicketRules(params: any) {
  return async () => {
    const { dispatch } = store;
    dispatch(slice.actions.startLoading());
    try {
      await axios.post(
        `bonus_tickets_rules`, { ...params }
      );
      dispatch(slice.actions.stopLoading());
    } catch (error) {
      // console.log(error);
    }
  };
}

export function createBonusSet(params: any) {
  return async () => {
    const { dispatch } = store;
    dispatch(slice.actions.startLoading());
    try {
      await axios.post(
        `bonus_set`, { ...params }
      );
      dispatch(slice.actions.stopLoading());
    } catch (error) {
      // console.log(error);
    }
  };
}

export function getBonusDetail(params: any) {
  return async () => {
    const { dispatch } = store;
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(
        `bonus_set/${params.bonusSetId}`
      );

      const response2 = await axios.get(
        `bonus_set/?bonusSetId=${params.bonusSetId}`, 
      );
      
      

      const selectedBrandData = response?.data?.data;
      const selectedBonusList = response2?.data?.data;

      console.log(selectedBrandData, selectedBonusList);

      dispatch(slice.actions.stopLoading());
    } catch (error) {
      // console.log(error);
    }
  };
}