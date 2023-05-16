import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { styled } from '@material-ui/core/styles';
import get from 'lodash/get';
import moment from 'moment';
// material
import { Typography, Box, Pagination, Button, Grid, Skeleton, Link } from '@material-ui/core';

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
import { getRewardEngineAwardsList } from '../../../../redux/slices/reward';
// @types
import { rewardState } from '../../../../@types/reward';

// components
import { MotionContainer } from '../../../../components/animate';
import getVariant from '../../../components-overview/extra/animate/getVariant';

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

export default function RewardEngineAwardList() {
  const dispatch = useDispatch();
  const { loading, rewardEngineAwards } = useSelector((state: { reward: rewardState }) => state.reward);
  const [page, setPageNo] = useState(1);



  useEffect(() => {
    dispatch(getRewardEngineAwardsList({ bonusPageNo: page }));
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

  const mapDataToTargetStructure = (rows: any) =>
    rows.map((row: any) => ({
      id: row.rewards_award_id,
      bonus_item_brand_id: row.rewards_award_id,
      bonus_item_name: row.rewards_award_name,
      rewards_award_event_type: row.rewards_award_event_type,
      rewards_award_token: row.rewards_award_token,
      rewards_award_stars: row.rewards_award_stars,
      rewards_award_energy: row.rewards_award_energy,
      rewards_award_coins: row.rewards_award_coins,
      rewards_award_booster: row.rewards_award_booster,
      rewards_award_card: row.rewards_award_card,
      createdAt: moment(row.created_at).format('MMM DD, YYYY'),
      updatedAt: moment(row.updatedAt).format('MMM DD, YYYY'),
    }));

  const columns: GridColDef[] = [
    {
      field: 'id'
    },
    {
      field: 'bonus_item_name',
      headerName: 'Award Name',
      width: 300,
      renderCell: (params: any) => (
        <Link
          to={`/reward/award/${params.row.id}`}
          key={params.row.id}
          variant="body2"
          component={RouterLink}
        >
          <TextCellWrapperLink variant="subtitle1">
            {params.row.bonus_item_name}
          </TextCellWrapperLink>
        </Link>
      )
    },
    {
      field: 'rewards_award_event_type',
      headerName: 'Event Type',
      width: 200
    },
    {
      field: 'rewards_award_token',
      headerName: 'Available Token',
      width: 200
    },
    {
      field: 'rewards_award_stars',
      headerName: 'Available Stars',
      width: 200
    },
    {
      field: 'rewards_award_booster',
      headerName: 'Booster',
      width: 200
    },
    {
      field: 'rewards_award_card',
      headerName: 'Card',
      width: 200
    },
    {
      field: 'createdAt',
      headerName: 'Created At',
      width: 200
    },
    {
      field: 'updatedAt',
      headerName: 'Updated At',
      width: 200
    }
  ];

  const CustomPagination = () => {
    const { state, apiRef } = useGridSlotComponentProps();

    return (
      <Pagination
        color="primary"
        count={Math.ceil(get(rewardEngineAwards, 'totalRecords') / 10)}
        page={page}
        onChange={(event, value) => {
          setPageNo(value);
          dispatch(getRewardEngineAwardsList({ bonusPageNo: value }));
        }}
      />
    );
  };

  return (
    <>
      <BrandRowWrapper>
        <MotionContainer
          open
          initial="initial"
          component={motion.h4}
          sx={{ typography: 'h4', display: 'flex', overflow: 'hidden' }}
        >
          {'Reward Engine Award List'.split('').map((letter, index) => (
            <motion.span key={index} variants={getVariant('slideInUp')}>
              {letter}{' '}
            </motion.span>
          ))}
        </MotionContainer>
        <Button variant="contained" color="primary" className="button">
          {' '}
          + Add New Reward Engine Award
        </Button>
      </BrandRowWrapper>

      {loading && <SkeletonLoad />}
      {!loading && (
        <DataGrid
          rows={mapDataToTargetStructure(get(rewardEngineAwards, 'data', []))}
          columns={columns}
          pagination
          pageSize={10}
          components={{
            Toolbar: GridToolbar,
            Pagination: CustomPagination
          }}
        />
      )}
    </>
  );
}
