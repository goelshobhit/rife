import { useEffect, useState } from 'react';
import { styled } from '@material-ui/core/styles';
// material
import { Typography } from '@material-ui/core';

import { useDispatch, useSelector } from '../../../../redux/store';
import { getAllBrands, getRewardSettingList } from '../../../../redux/slices/reward';
// @types
import { rewardState } from '../../../../@types/reward';
// components
import Scrollbar from '../../../../components/Scrollbar';
import LoadingScreen from '../../../../components/LoadingScreen';

import RewardNewForm from './form';

const RootStyle = styled('div')(({ theme }) => ({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  height: '83vh',
  margin: '0px 32px'
}));

const HeadingStyle = styled(Typography)(({ theme }) => ({
  color: '#232323',
  marginBottom: 32
}));

export default function RewardList() {
  const dispatch = useDispatch();
  const { loading, brandPageNo, rewardBrandList, hasMoreBrands } = useSelector(
    (state: { reward: rewardState }) => state.reward
  );

  const [page, setPageNo] = useState(brandPageNo);

  useEffect(() => {
    dispatch(getRewardSettingList({ bonusPageNo: 1 }));
  }, []);
  useEffect(() => {
    if (hasMoreBrands) {
      dispatch(getAllBrands({ brandPageNo: page }));
    }
  }, [dispatch, hasMoreBrands, page]);

  useEffect(() => {
    setPageNo(brandPageNo);
  }, [brandPageNo]);

  return (
    <RootStyle>
      {loading && <LoadingScreen />}

      {!loading && (
        <Scrollbar sx={{ flexGrow: 1 }}>
          <HeadingStyle variant="h3">Rewards</HeadingStyle>
          <RewardNewForm rewardBrandList={rewardBrandList} />
        </Scrollbar>
      )}
    </RootStyle>
  );
}
