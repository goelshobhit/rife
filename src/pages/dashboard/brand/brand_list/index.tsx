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
import { getBrandList } from '../../../../redux/slices/brand';
// @types
import { brandState } from '../../../../@types/brand';

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

export default function BrandList() {
  const dispatch = useDispatch();
  const { loading, brand_list } = useSelector((state: { brand: brandState }) => state.brand);
  const [page, setPageNo] = useState(1);

  useEffect(() => {
    dispatch(getBrandList({ bonusPageNo: page }));
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
      id: row.cr_co_id,
      bonus_item_brand_id: row.cr_co_id,
      cr_co_name: row.cr_co_name,
      cr_co_created_at: moment(get(row, 'cr_co_created_at')).format('MMM DD,YYYY')
    }));

  const columns: GridColDef[] = [
    {
      field: 'id'
    },
    {
      field: 'cr_co_name',
      headerName: 'Brand Name',
      width: 300,
      renderCell: (params: any) => (
        <Link
          to={`/brand/${params.row.id}`}
          key={params.row.id}
          variant="body2"
          component={RouterLink}
        >
          <TextCellWrapperLink variant="subtitle1">
            {params.row.cr_co_name}
          </TextCellWrapperLink>
        </Link>
      )
    },
    {
      field: 'cr_co_created_at',
      headerName: 'Created At',
      width: 200
    },
  ];

  const CustomPagination = () => {
    const { state, apiRef } = useGridSlotComponentProps();

    return (
      <Pagination
        color="primary"
        count={Math.ceil(get(brand_list, 'totalRecords') / 10)}
        page={page}
        onChange={(event, value) => {
          setPageNo(value);
          dispatch(getBrandList({ bonusPageNo: value }));
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
          {'Brand List'.split('').map((letter, index) => (
            <motion.span key={index} variants={getVariant('slideInUp')}>
              {letter}
            </motion.span>
          ))}
        </MotionContainer>
        <Button variant="contained" color="primary" className="button">
          {' '}
          + Add New Brand
        </Button>
      </BrandRowWrapper>

      {loading && <SkeletonLoad />}
      {!loading && (
        <DataGrid
          rows={mapDataToTargetStructure(get(brand_list, 'data', []))}
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
