import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { styled } from '@material-ui/core/styles';
import { matchPath } from 'react-router';
// material
import { Typography } from '@material-ui/core';

import { useDispatch, useSelector } from '../../../../redux/store';
import { getBonusDetail } from '../../../../redux/slices/bonus';
// @types,
import { bonusState } from '../../../../@types/bonus';
// components
import Scrollbar from '../../../../components/Scrollbar';
import LoadingScreen from '../../../../components/LoadingScreen';

const RootStyle = styled('div')(() => ({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  height: '83vh',
  margin: '0px 32px'
}));

const HeadingStyle = styled(Typography)(() => ({
  color: '#232323',
  marginBottom: 32
}));

export default function RewardList() {
  const dispatch = useDispatch();
  const location = useLocation();
  const match = matchPath('dashboard/bonus/set/id=:id', location?.pathname);

  const { loading } = useSelector((state: { bonus: bonusState }) => state.bonus);

  useEffect(() => {
    dispatch(getBonusDetail({ bonusSetId: match?.params?.id }));
  }, [dispatch]);

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
