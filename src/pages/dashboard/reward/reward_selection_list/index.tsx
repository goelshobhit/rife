import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { styled } from '@material-ui/core/styles';
import get from 'lodash/get';
// material
import { Box, Pagination, Button, Grid, Skeleton } from '@material-ui/core';

import { DataGrid, GridColDef, GridToolbar } from '@material-ui/data-grid';
// utils

// lodash

// redux
import { useDispatch, useSelector } from '../../../../redux/store';
import { getRewardSelectionList } from '../../../../redux/slices/reward';
// @types
import { rewardState } from '../../../../@types/reward';

// components
import { MotionContainer } from '../../../../components/animate';
import getVariant from '../../../components-overview/extra/animate/getVariant';

const BrandRowWrapper = styled('div')(() => ({
  paddingBottom: 48,
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: '100%'
}));

export default function RewardSelectionList() {
  const dispatch = useDispatch();
  const { loading, rewardSelections } = useSelector(
    (state: { reward: rewardState }) => state.reward
  );
  const [page, setPageNo] = useState(1);

  useEffect(() => {
    dispatch(getRewardSelectionList({ bonusPageNo: page }));
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
    rows.map((row: any, index: number) => ({
      id: row.index
    }));

  const columns: GridColDef[] = [
    {
      field: 'id'
    }
  ];

  const CustomPagination = () => (
    <Pagination
      color="primary"
      count={Math.ceil(get(rewardSelections, 'totalRecords') / 10)}
      page={page}
      onChange={(event, value) => {
        setPageNo(value);
        dispatch(getRewardSelectionList({ bonusPageNo: value }));
      }}
    />
  );

  return (
    <>
      <BrandRowWrapper>
        <MotionContainer
          open
          initial="initial"
          component={motion.h4}
          sx={{ typography: 'h4', display: 'flex', overflow: 'hidden' }}
        >
          {'Reward Selection List'.split('').map((letter, index) => (
            <motion.span key={index} variants={getVariant('slideInUp')}>
              {letter}{' '}
            </motion.span>
          ))}
        </MotionContainer>
        <Button variant="contained" color="primary" className="button">
          {' '}
          + Add New Reward Selection
        </Button>
      </BrandRowWrapper>

      {loading && <SkeletonLoad />}
      {!loading && (
        <DataGrid
          autoHeight
          rowHeight={100}
          rows={mapDataToTargetStructure(get(rewardSelections, 'data', []))}
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
