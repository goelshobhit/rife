import { useEffect, useState } from 'react';
import { useLocation, useMatch } from 'react-router-dom';
import queryString from 'querystring';
import { styled } from '@material-ui/core/styles';
import { matchPath } from "react-router";
// material
import { Box, Grid, Skeleton, Typography } from '@material-ui/core';
import get from 'lodash/get';

import { useDispatch, useSelector } from '../../../../redux/store';
import { getAllBrands } from '../../../../redux/slices/reward';
import { getBonusRuleList, getBonusDetail } from '../../../../redux/slices/bonus';
// @types,
import { rewardState } from '../../../../@types/reward';
import { bonusState } from '../../../../@types/bonus';
// components
import Scrollbar from '../../../../components/Scrollbar';
import LoadingScreen from '../../../../components/LoadingScreen';


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

export default function RewardList(props: any) {
  const dispatch = useDispatch();
  const location = useLocation();
  const match = matchPath("dashboard/bonus/set/id=:id", location?.pathname)
  
  const { loading, bonusRuleList } = useSelector((state: { bonus: bonusState }) => state.bonus);

  useEffect(() => {
    dispatch(getBonusDetail({ bonusSetId: match?.params?.id }))
  }, []);

  return (
    <RootStyle>
      {loading && <LoadingScreen />}

      {!loading && (
        <Scrollbar sx={{ flexGrow: 1 }}>
          <HeadingStyle variant="h3">Create Bonus Set</HeadingStyle>
          Nike: Summer Bonus Set
        </Scrollbar>
      )}
    </RootStyle>
  );
}
