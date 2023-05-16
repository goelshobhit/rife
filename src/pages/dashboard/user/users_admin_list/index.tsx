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
import { getAdminUsersList } from '../../../../redux/slices/usersList';
// @types
import { usersState } from '../../../../@types/users';

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

export default function UsersList() {
  const dispatch = useDispatch();
  const { loading, adminUsersList } = useSelector((state: { users: usersState }) => state.users);
  const [page, setPageNo] = useState(1);


  useEffect(() => {
    dispatch(getAdminUsersList({ bonusPageNo: page }));
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
      id: row.au_user_id,
      userName: get(row,'au_name','-'),
      u_email: get(row,'au_email','-'),
      u_active: row.au_active_status ? 'True' : 'False',
    }));

  const columns: GridColDef[] = [
    {
      field: 'id'
    },
    {
      field: 'userName',
      headerName: 'User Name',
      width: 300,
      renderCell: (params: any) => (
        <Link
          to={`/user/${params.row.id}`}
          key={params.row.id}
          variant="body2"
          component={RouterLink}
        >
          <TextCellWrapperLink variant="subtitle1">
            {params.row.userName}
          </TextCellWrapperLink>
        </Link>
      )
    },
    {
      field: 'u_email',
      headerName: 'Email',
      width: 200
    },
    {
      field: 'u_active',
      headerName: 'Active',
      width: 200
    },
  ];

  const CustomPagination = () => {
    const { state, apiRef } = useGridSlotComponentProps();

    return (
      <Pagination
        color="primary"
        count={Math.ceil(get(adminUsersList, 'totalRecords') / 10)}
        page={page}
        onChange={(event, value) => {
          setPageNo(value);
          dispatch(getAdminUsersList({ bonusPageNo: value }));
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
          {'Admin Users List'.split('').map((letter, index) => (
            <motion.span key={index} variants={getVariant('slideInUp')}>
              {letter}
            </motion.span>
          ))}
        </MotionContainer>
        <Button variant="contained" color="primary" className="button">
          {' '}
          + Add New Admin User
        </Button>
      </BrandRowWrapper>

      {loading && <SkeletonLoad />}
       {!loading && (
        <DataGrid
          rows={mapDataToTargetStructure(get(adminUsersList, 'data', []))}
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
