import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { styled } from '@material-ui/core/styles';
import get from 'lodash/get';
import size from 'lodash/size';
import round from 'lodash/round';
import moment from 'moment';
// material
import {
  Typography,
  Box,
  Pagination,
  Button,
  Grid,
  Skeleton,
  Link,
  Paper,
  Stack,
  Card
} from '@material-ui/core';
import { isEmpty } from 'lodash';
import {
  useGridSlotComponentProps,
  DataGrid,
  GridColDef,
  GridToolbar
} from '@material-ui/data-grid';
// utils

// lodash

// redux
import { useDispatch, useSelector } from '../../../../redux/store';
import { getRewardCenterList, getRewardSettingList } from '../../../../redux/slices/reward';
// @types
import { rewardState } from '../../../../@types/reward';

// components
import { MotionContainer } from '../../../../components/animate';
import Scrollbar from '../../../../components/Scrollbar';
import Label from '../../../../components/Label';
import getVariant from '../../../components-overview/extra/animate/getVariant';

import WithMaterialUIRewardSettingForm from './form';


const TextCellWrapperLink = styled(Typography)(() => ({
  fontSize: 14,
  color: '#00BAEF',
  textDecoration: 'underline'
}));

const BrandRowWrapper = styled('div')(() => ({
  paddingBottom: 48,
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: '100%'
}));

const ButtonStyled = styled(Button)(() => ({
  color: '#fff',
  backgroundColor: '#00BAEF',
  padding: 8,
  '&:hover': {
    color: '#fff',
    backgroundColor: '#00BAEF'
  }
}));

const BoxStyle = styled(Card)(() => ({
  padding: '32px',
  background: '#FFFFFF',
  /* V3 reward shaddow */
  boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.06), 0px -5px 10px rgba(0, 0, 0, 0.06)',
  borderRadius: '12px',
  marginBottom: 32
}));

const BoxStyle1 = styled(Card)(() => ({
  padding: '32px',
  background: '#FFFFFF',
  /* V3 reward shaddow */
  boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.06), 0px -5px 10px rgba(0, 0, 0, 0.06)',
  borderRadius: '12px',
  width: '75%',
  marginBottom: 32
}));

export default function RewardCenterList() {
  const dispatch = useDispatch();
  const { loading, rewardCenter, rewardSettings } = useSelector(
    (state: { reward: rewardState }) => state.reward
  );
  const [page, setPageNo] = useState(1);

  useEffect(() => {
    dispatch(getRewardCenterList({ bonusPageNo: page }));
    dispatch(getRewardSettingList({ bonusPageNo: page }));
  }, [dispatch, page]);


  const SkeletonLoad = () => (
    <Grid container spacing={3} sx={{ mt: 2 }}>
      {[...Array(4)].map((_, index) => (
        <Grid item xs={12} md={3} key={index}>
          <Skeleton variant="rectangular" width="100%" sx={{ height: 200, borderRadius: 2 }} />
          <Box sx={{ display: 'flex', mt: 1.5 }}>
            <Skeleton variant="circular" sx={{ width: 40, height: 40 }} />
            <Skeleton variant="text" sx={{ mx: 1, flexGrow: 1 }} />
          </Box>
        </Grid>
      ))}
    </Grid>
  );

  const renderLocation = (id: any) => {
    switch (id) {
      case 0:
        return 'Default';
      case 1:
        return 'Referral';
      case 2:
        return 'Unassigned';
      default:
        return 'N/A';
    }
  };

  const renderType = (id: any) => {
    switch (id) {
      case 0:
        return 'Easter Egg';
      case 1:
        return 'Present';
      case 2:
        return 'Chest';
      case 3:
        return 'Lottery Wheel';
      default:
        return 'N/A';
    }
  };

  const renderStatus = (id: any) => {
    switch (id) {
      case 0:
        return 'Active';
      default:
        return 'Closed';
    }
  };

  const renderColorStatusCode = (status: any) => {
    switch (status) {
      case 0:
        return 'success';
      default:
        return 'error';
    }
  };

  const mapDataToTargetStructure = (rows: any) =>
    rows.map((row: any) => ({
      id: row.reward_center_id,
      bonus_item_brand_id: row.reward_center_id,
      bonus_item_name: row.reward_center_name,
      reward_center_reward_type: renderType(row.reward_center_reward_type),
      brand: 'N/A',
      weeklyDispensed: 0,
      weeklyDispensedTotalValue: row.average_token_value,
      averageValueToken: round(row.average_token_value / size(row.reward_center_dists), 0),
      userInPast: 0,
      location: renderLocation(row.reward_center_location_id),
      state: renderStatus(get(row, 'reward_center_dists.reward_center_dist_status')),
      stateColor: get(row, 'reward_center_dists.reward_center_dist_status')
    }));

  const columns: GridColDef[] = [
    {
      field: 'id'
    },
    {
      field: 'bonus_item_name',
      headerName: 'Name',
      width: 300,
    },
    {
      field: 'reward_center_reward_type',
      headerName: 'Type',
      width: 200
    },
    {
      field: 'brand',
      headerName: 'Brand',
      width: 200
    },
    {
      field: 'weeklyDispensed',
      headerName: 'Weekly Dispensed',
      width: 300
    },
    {
      field: 'weeklyDispensedTotalValue',
      headerName: 'Weekly Dispensed (Total Value)',
      width: 400
    },
    {
      field: 'averageValueToken',
      headerName: 'Average Value (Tokens)',
      width: 400
    },
    {
      field: 'userInPast',
      headerName: 'Users in past 7 days',
      width: 400
    },
    {
      field: 'location',
      headerName: 'Location',
      width: 200
    },
    {
      field: 'state',
      headerName: 'State',
      width: 200,
      renderCell: (params) => {
        const getStatus = params.row.state;
        return (
          <Label
            color={renderColorStatusCode(params.row.stateColor)}
            sx={{ textTransform: 'capitalize', mx: 'auto' }}
          >
            {params.row.state}
          </Label>
        );
      }
    }
  ];

  const CustomPagination = () => {
    const { state, apiRef } = useGridSlotComponentProps();

    return (
      <Pagination
        color="primary"
        count={Math.ceil(get(rewardCenter, 'totalRecords') / 10)}
        page={page}
        onChange={(event, value) => {
          setPageNo(value);
          dispatch(getRewardCenterList({ bonusPageNo: value }));
        }}
      />
    );
  };

  return (
    <div style={{ margin: 32, height: '100%' }}>
      <BrandRowWrapper>
        <Typography variant="h4">
          <MotionContainer
            open
            initial="initial"
            component={motion.h4}
            sx={{ typography: 'h4', display: 'flex', overflow: 'hidden' }}
          >
            {'Rewards'.split('').map((letter, index) => (
              <motion.span key={index} variants={getVariant('slideInUp')}>
                {letter}{' '}
              </motion.span>
            ))}
          </MotionContainer>
        </Typography>

        <ButtonStyled variant="contained" color="primary" className="button" href="/dashboard/reward/center/add">
          + Add New Reward
        </ButtonStyled>
      </BrandRowWrapper>

      {loading && <SkeletonLoad />}

      {!loading && (
        <>
          <BoxStyle>
            <Typography variant="h6">Reward Settings</Typography>
            <p>
              {!isEmpty(get(rewardSettings,'data',[])) && <WithMaterialUIRewardSettingForm
                initialVal={{
                  booster_value_in_tokens: get(rewardSettings, 'data.[0].booster_value_in_tokens', 100),
                  key_value_in_tokens: get(rewardSettings, 'data.[0].key_value_in_tokens'),
                  star_value_in_tokens: get(rewardSettings, 'data.[0].star_value_in_tokens'),
                  token_value_in_usd: get(rewardSettings, 'data.[0].token_value_in_usd')
                }}
              />}
            </p>
          </BoxStyle>
          <BoxStyle1>
            <Typography variant="h6">Summary</Typography>
            <p>
              <Stack direction="row" spacing={3}>
                <Typography variant="subtitle1">Present </Typography>{' '}
                <Typography variant="body1">
                  {' '}
                  {get(rewardSettings, 'tokenData[0].total_token')} Tokens
                </Typography>
              </Stack>
              <Stack direction="row" spacing={3}>
                <Typography variant="subtitle1">Chest </Typography>
                <Typography variant="body1">
                  {' '}
                  {get(rewardSettings, 'tokenData[1].total_token')} Tokens
                </Typography>
              </Stack>
              <Stack direction="row" spacing={3}>
                {' '}
                <Typography variant="subtitle1">Easter Egg </Typography>
                <Typography variant="body1">
                  {' '}
                  {get(rewardSettings, 'tokenData[2].total_token')} Tokens
                </Typography>
              </Stack>
              <Stack direction="row" spacing={3}>
                <Typography variant="subtitle1">Lottery Wheel </Typography>
                <Typography variant="body1">
                  {' '}
                  {get(rewardSettings, 'tokenData[3].total_token')} Tokens
                </Typography>
              </Stack>
            </p>
          </BoxStyle1>
          <DataGrid
            rows={mapDataToTargetStructure(get(rewardCenter, 'data', []))}
            columns={columns}
            pagination
            pageSize={10}
            components={{
              Toolbar: GridToolbar,
              Pagination: CustomPagination
            }}
          />
        </>
      )}
    </div>
  );
}
