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
import { getInvitedUsersList } from '../../../../redux/slices/usersList';
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
  const { loading, invitedUsersList } = useSelector((state: { users: usersState }) => state.users);
  const [page, setPageNo] = useState(1);


  useEffect(() => {
    dispatch(getInvitedUsersList({ bonusPageNo: page }));
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
      id: row.users_invitation_user_id,
      userName: get(row,'user_profile.username','-'),
      u_email: get(row,'users_invitation_recipient_email','-'),
      users_invitation_recipient_mobile: get(row,'users_invitation_recipient_mobile','-'),
      users_invitation_url: get(row,'users_invitation_url','-'),
      users_invitation_invitation_timestamp: moment(get(row,'users_invitation_invitation_timestamp','-')).format('MMM DD, YYYY'),
      users_invitation_received_acknowledgment_timestamp: moment(get(row,'users_invitation_received_acknowledgment_timestamp','-')).format('MMM DD, YYYY'),
      users_invitation_status: get(row,'users_invitation_status','-'),
      createdAt: moment(get(row,'ui_created_at')).format('MMM DD, YYYY'),
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
      field: 'users_invitation_recipient_mobile',
      headerName: 'Phone No',
      width: 200
    },
    {
      field: 'users_invitation_url',
      headerName: 'Invitation Url',
      width: 200
    },
    {
      field: 'users_invitation_invitation_timestamp',
      headerName: 'Invitation Sent Time',
      width: 200
    },
    {
      field: 'users_invitation_received_acknowledgment_timestamp',
      headerName: 'User Acknowledgement Time',
      width: 200
    },
    {
      field: 'users_invitation_status',
      headerName: 'Invitation Status',
      width: 200
    },
    {
      field: 'createdAt',
      headerName: 'Created At',
      width: 200
    }
    
  ];

  const CustomPagination = () => {
    const { state, apiRef } = useGridSlotComponentProps();

    return (
      <Pagination
        color="primary"
        count={Math.ceil(get(invitedUsersList, 'totalRecords') / 10)}
        page={page}
        onChange={(event, value) => {
          setPageNo(value);
          dispatch(getInvitedUsersList({ bonusPageNo: value }));
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
          {'Invited Users List'.split('').map((letter, index) => (
            <motion.span key={index} variants={getVariant('slideInUp')}>
              {letter}
            </motion.span>
          ))}
        </MotionContainer>
        <Button variant="contained" color="primary" className="button">
          {' '}
          + Add New Invited User
        </Button>
      </BrandRowWrapper>

      {loading && <SkeletonLoad />}
       {!loading && (
        <DataGrid
          rows={mapDataToTargetStructure(get(invitedUsersList, 'data', []))}
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
