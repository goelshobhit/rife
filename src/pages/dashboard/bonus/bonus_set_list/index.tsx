import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import moment from 'moment';
import { motion } from 'framer-motion';
import { styled } from '@material-ui/core/styles';
import get from 'lodash/get';
import { sum, map, toNumber, round } from 'lodash';
// material
import { Typography, Box, Pagination, Button, Grid, Skeleton, Link } from '@material-ui/core';

import { DataGrid, GridColDef, GridToolbar } from '@material-ui/data-grid';
// utils

// lodash

// redux
import { useDispatch, useSelector } from '../../../../redux/store';
import { getBonusSetList } from '../../../../redux/slices/bonus';
// @types
import { bonusState } from '../../../../@types/bonus';

// components
import { MotionContainer } from '../../../../components/animate';
import getVariant from '../../../components-overview/extra/animate/getVariant';
import Label from '../../../../components/Label';

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

export default function BonusSetList() {
  const dispatch = useDispatch();
  const { loading, bonusSetList } = useSelector((state: { bonus: bonusState }) => state.bonus);
  const [page, setPageNo] = useState(1);

  useEffect(() => {
    dispatch(getBonusSetList({ bonusPageNo: page }));
  }, [dispatch, page]);

  const SkeletonLoad = () => (
    <Grid container spacing={3} sx={{ mt: 2 }}>
      {[...Array(4)].map((_, index) => (
        <Grid item xs={12} md={3} key={index}>
          <Skeleton variant="rectangular" width="200%" sx={{ height: 200, borderRadius: 2 }} />
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
      id: row.bonus_set_brand_id,
      bonus_item_brand_id: row.bonus_set_brand_id,
      bonus_item_name: row.bonus_set_item_name,
      brandName: get(row, 'brand.brand_name'),
      endDate: moment(row.bonus_set_start_date)
        .add('day', row.bonus_set_duration)
        .format('MMM DD,YYYY'),
      noOfBonuses: get(row, 'total_bonus_items'),
      averageOfASingleBonus: round(get(row, 'average_dollar_value', 0), 2),
      valueOfAllBonuses: sum(
        map(get(row, 'bonus_items'), (item: any) => toNumber(item.bonus_item_dollar_value))
      ),
      noOfParticipants: get(row, 'total_participants', 0),
      noOfTicket: get(row, 'total_tickets', 0),
      avgUserTicket:
        get(row, 'total_tickets', 0) > 0
          ? get(row, 'total_tickets', 0) / get(row, 'total_participants', 0)
          : 0,
      status: moment(row.bonus_set_start_date).add('day', row.bonus_set_duration).isAfter(moment())
    }));

  const columns: GridColDef[] = [
    {
      field: 'id'
    },
    {
      field: 'bonus_item_name',
      headerName: 'Set Name',
      width: 300,
      renderCell: (params: any) => (
        <Link
          to={`/dashboard/bonus/set/id=${params.row.id}`}
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
      headerName: 'Brand',
      width: 200
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 300,
      align: 'left',
      renderCell: (params) => {
        const getStatus = params.row.status;
        return (
          <Label
            color={getStatus ? 'success' : 'error'}
            sx={{ textTransform: 'capitalize', mx: 'auto' }}
          >
            {getStatus ? 'Active' : 'Inactive'}
          </Label>
        );
      }
    },
    {
      field: 'endDate',
      headerName: 'End Date',
      width: 200
    },
    {
      field: 'averageOfASingleBonus',
      headerName: 'Average $ of a single bonus',
      width: 300
    },
    {
      field: 'valueOfAllBonuses',
      headerName: 'Value of all Prizes',
      width: 200
    },
    {
      field: 'noOfParticipants',
      headerName: 'No of participation',
      width: 300
    },
    {
      field: 'noOfTicket',
      headerName: 'No of tickets',
      width: 200
    },
    {
      field: 'avgUserTicket',
      headerName: 'Average Of  User Tickets',
      width: 300
    }
  ];

  const CustomPagination = () => (
    <Pagination
      color="primary"
      count={Math.ceil(get(bonusSetList, 'totalRecords') / 5)}
      page={page}
      onChange={(event, value) => {
        setPageNo(value);
        dispatch(getBonusSetList({ bonusPageNo: value }));
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
          <motion.span key={1} variants={getVariant('slideInUp')}>
            Bonus Set
          </motion.span>
        </MotionContainer>
        <Button
          variant="contained"
          color="primary"
          className="button"
          href="/dashboard/bonus/set/add"
        >
          + Add New Bonus Set
        </Button>
      </BrandRowWrapper>

      {loading && <SkeletonLoad />}
      {!loading && (
        <DataGrid
          autoHeight
          rows={mapDataToTargetStructure(get(bonusSetList, 'data', []))}
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
