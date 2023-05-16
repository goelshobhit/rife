import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { styled } from '@material-ui/core/styles';
import get from 'lodash/get';
// material
import { Typography, Box, Pagination, Button, Grid, Skeleton, Link } from '@material-ui/core';

import { DataGrid, GridColDef, GridToolbar } from '@material-ui/data-grid';
// utils

// lodash

// redux
import { useDispatch, useSelector } from '../../../../redux/store';
import { getRewardList } from '../../../../redux/slices/reward';
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

export default function RewardList() {
  const dispatch = useDispatch();
  const { loading, rewardList } = useSelector((state: { reward: rewardState }) => state.reward);
  const [page, setPageNo] = useState(1);

  useEffect(() => {
    dispatch(getRewardList({ bonusPageNo: page }));
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

  // const mapDataToTargetStructure = (rows: any) =>
  //   rows.map((row: any) => ({
  //     id: row.bonus_item_id,
  //     bonus_item_brand_id: row.bonus_item_brand_id,
  //     bonus_item_name: row.bonus_item_name,
  //     bonus_item_description: row.bonus_item_description,
  //     bonus_item_dollar_value: row.bonus_item_dollar_value,
  //     bonus_item_giveaway_type: row.bonus_item_giveaway_type,
  //     user_token_value_not_accepting: row.user_token_value_not_accepting,
  //     bonus_item_qty: row.bonus_item_qty,
  //     bonus_item_remaining_qty: row.bonus_item_remaining_qty,
  //     brandName: get(row, 'brand.brand_name')
  //   }));

  const columns: GridColDef[] = [
    {
      field: 'id'
    },
    {
      field: 'bonus_item_name',
      headerName: 'Bonus Name',
      width: 300,
      renderCell: (params: any) => (
        <Link
          to={`/brand/${params.row.id}`}
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
      field: 'brandName',
      headerName: 'Brand Name',
      width: 200
    },
    {
      field: 'bonus_item_description',
      headerName: 'Description',
      width: 500
    },
    {
      field: 'bonus_item_dollar_value',
      headerName: 'Dollar Value',
      width: 200
    },
    {
      field: 'bonus_item_giveaway_type',
      headerName: 'Giveaway type',
      width: 200
    },
    {
      field: 'user_token_value_not_accepting',
      headerName: 'User Token Value Not Accepting',
      width: 200
    },
    {
      field: 'bonus_item_qty',
      headerName: 'Bonus Item Quantity',
      width: 200
    },
    {
      field: 'bonus_item_remaining_qty',
      headerName: 'Bonus Item Remaining Quantity',
      width: 200
    }
  ];

  // const CustomPagination = () => {
  //   return (
  //     <Pagination
  //       color="primary"
  //       count={Math.ceil(get(rewardList, 'totalRecords') / 10)}
  //       page={page}
  //       onChange={(event, value) => {
  //         setPageNo(value);
  //         dispatch(getRewardList({ bonusPageNo: value }));
  //       }}
  //     />
  //   );
  // };

  return (
    <>
      <BrandRowWrapper>
        <MotionContainer
          open
          initial="initial"
          component={motion.h4}
          sx={{ typography: 'h4', display: 'flex', overflow: 'hidden' }}
        >
          {'Reward Award List'.split('').map((letter, index) => (
            <motion.span key={index} variants={getVariant('slideInUp')}>
              {letter}{' '}
            </motion.span>
          ))}
        </MotionContainer>
        <Button variant="contained" color="primary" className="button">
          {' '}
          + Add New Reward Award
        </Button>
      </BrandRowWrapper>

      {loading && <SkeletonLoad />}
      {/* {!loading && (
        <DataGrid
          autoHeight
          rowHeight={100}
          rows={mapDataToTargetStructure(get(rewardList, 'data', []))}
          columns={columns}
          pagination
          pageSize={10}
          components={{
            Toolbar: GridToolbar,
            Pagination: CustomPagination
          }}
        />
      )} */}
    </>
  );
}
