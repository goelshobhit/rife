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
import { getRewardSettingList } from '../../../../redux/slices/reward';
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

export default function RewardSettingList() {
  const dispatch = useDispatch();
  const { loading, rewardSettings } = useSelector((state: { reward: rewardState }) => state.reward);
  const [page, setPageNo] = useState(1);

  useEffect(() => {
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

  const mapDataToTargetStructure = (rows: any) =>
    rows.map((row: any) => ({
      id: row.reward_settings_id,
      bonus_item_brand_id: row.reward_settings_id,
      bonus_item_name: row.reward_settings_id,
      token_value_in_usd: row.token_value_in_usd,
      star_value_in_token: row.star_value_in_tokens,
      key_value_in_tokens: row.key_value_in_tokens,
      booster_value_in_tokens: row.booster_value_in_tokens,
      rs_created_at: moment(row.bonus_item_qty).format('MMM DD, YYYY'),
      rs_updated_at: moment(row.bonus_item_remaining_qty).format('MMM DD, YYYY'),
    }));

  const columns: GridColDef[] = [
    {
      field: 'id'
    },
    {
      field: 'bonus_item_name',
      headerName: 'Setting',
      width: 300,
      renderCell: (params: any) => (
        <Link
          to={`/reward/setting/${params.row.id}`}
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
      field: 'token_value_in_usd',
      headerName: 'Token Value',
      width: 200
    },
    {
      field: 'star_value_in_token',
      headerName: 'Star Token Value',
      width: 200
    },
    {
      field: 'key_value_in_tokens',
      headerName: 'Key TOken Value',
      width: 200
    },
    {
      field: 'booster_value_in_tokens',
      headerName: 'Booster Token Value',
      width: 200
    },
    {
      field: 'rs_created_at',
      headerName: 'Created At',
      width: 200
    },
    {
      field: 'rs_updated_at',
      headerName: 'Updated At',
      width: 200
    },
  ];

  const CustomPagination = () => {
    const { state, apiRef } = useGridSlotComponentProps();

    return (
      <Pagination
        color="primary"
        count={Math.ceil(get(rewardSettings, 'totalRecords') / 10)}
        page={page}
        onChange={(event, value) => {
          setPageNo(value);
          dispatch(getRewardSettingList({ bonusPageNo: value }));
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
          {'Reward Setting List'.split('').map((letter, index) => (
            <motion.span key={index} variants={getVariant('slideInUp')}>
              {letter}{' '}
            </motion.span>
          ))}
        </MotionContainer>
        <Button variant="contained" color="primary" className="button">
          {' '}
          + Add New Reward Setting
        </Button>
      </BrandRowWrapper>

      {loading && <SkeletonLoad />}
      {!loading && (
        <DataGrid
          rows={mapDataToTargetStructure(get(rewardSettings, 'data', []))}
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
