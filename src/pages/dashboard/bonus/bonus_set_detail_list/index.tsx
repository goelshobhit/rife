import { useEffect, useState } from 'react';
import { styled } from '@material-ui/core/styles';
// material
import { Typography } from '@material-ui/core';
import get from 'lodash/get';

import { useDispatch, useSelector } from '../../../../redux/store';
import { getAllBrands } from '../../../../redux/slices/reward';
import { getBonusRuleList } from '../../../../redux/slices/bonus';
// @types,
import { rewardState } from '../../../../@types/reward';
import { bonusState } from '../../../../@types/bonus';
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

  const { bonusRuleList } = useSelector((state: { bonus: bonusState }) => state.bonus);

  const [page, setPageNo] = useState(brandPageNo);

  useEffect(() => {
    dispatch(getBonusRuleList({ bonusPageNo: 1 }));
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
          <HeadingStyle variant="h3">Create Bonus Set</HeadingStyle>
          <RewardNewForm
            rewardBrandList={rewardBrandList}
            bonusRuleList={get(bonusRuleList, 'data', [])}
          />
        </Scrollbar>
      )}
    </RootStyle>
  );
}
