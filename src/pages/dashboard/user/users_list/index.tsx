import { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { styled } from '@material-ui/core/styles';
import get from 'lodash/get';
import moment from 'moment';
// material
import { Typography, Box, Pagination, Button, Grid, Skeleton, Link } from '@material-ui/core';

import { DataGrid, GridColDef, GridToolbar } from '@material-ui/data-grid';
// redux
import { useDispatch, useSelector } from '../../../../redux/store';
import { getUsersList } from '../../../../redux/slices/usersList';
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
  const navigate = useNavigate();
  const { loading, usersList } = useSelector((state: { users: usersState }) => state.users);
  const [page, setPageNo] = useState(1);

  useEffect(() => {
    dispatch(getUsersList({ bonusPageNo: page }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      id: row.u_id,
      userName: get(row, 'u_login', '-'),
      u_email: get(row, 'u_email', '-'),
      u_active: row.u_active ? 'True' : 'False',
      facebookId: get(row, 'u_fb_username', '-'),
      googleId: get(row, 'u_gmail_username', '-'),
      yMaildId: get(row, 'u_ymail_username', '-'),
      instagramId: get(row, 'u_instagram_username', '-'),
      emailVerified: row.u_email_verify_status ? 'true' : 'false',
      is_user_deactivated: row.is_user_deactivated ? 'true' : 'false',
      is_user_hidden: row.is_user_hidden ? 'true' : 'false',
      gender: get(row, 'user_profile.u_gender'),
      createdAt: moment(get(row, 'user_profile.u_created_at')).format('MMM DD, YYYY')
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
        <TextCellWrapperLink variant="subtitle1">{params.row.userName}</TextCellWrapperLink>
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
    {
      field: 'emailVerified',
      headerName: 'Is Email Verified ?',
      width: 200
    },
    {
      field: 'is_user_deactivated',
      headerName: 'Is Deactivated ?',
      width: 200
    },
    {
      field: 'is_user_hidden',
      headerName: 'Is Hidden ?',
      width: 200
    },
    {
      field: 'createdAt',
      headerName: 'Created At',
      width: 200
    }
  ];

  const CustomPagination = () => (
    <Pagination
      color="primary"
      count={Math.ceil(get(usersList, 'totalRecords') / 10)}
      page={page}
      onChange={(event, value) => {
        setPageNo(value);
        dispatch(getUsersList({ bonusPageNo: value }));
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
          {'Users List'.split('').map((letter, index) => (
            <motion.span key={index} variants={getVariant('slideInUp')}>
              {letter}
            </motion.span>
          ))}
        </MotionContainer>
        <Button
          variant="contained"
          color="primary"
          className="button"
          onClick={() => navigate('/dashboard/usersList/create')}
        >
          {' '}
          + Add New User
        </Button>
      </BrandRowWrapper>

      {loading && <SkeletonLoad />}
      {!loading && (
        <DataGrid
          rows={mapDataToTargetStructure(get(usersList, 'data', []))}
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
