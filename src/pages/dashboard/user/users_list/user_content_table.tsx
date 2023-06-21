import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import get from 'lodash/get';
// material
import { Box, Grid, Skeleton, Stack, Typography, Avatar, IconButton } from '@material-ui/core';
import eyeOutline from '@iconify/icons-eva/eye-outline';
import messageCircleOutline from '@iconify/icons-eva/message-circle-outline';
import heartOutline from '@iconify/icons-eva/heart-outline';

// redux
import { useDispatch, useSelector } from '../../../../redux/store';
import { getUsersList } from '../../../../redux/slices/usersList';
// @types
import { usersState } from '../../../../@types/users';
import { PropTypeUserCMSDetails } from '../../../../@types/user';

export default function UsersContentTable() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, usersList } = useSelector((state: { users: usersState }) => state.users);
  const [userData, setUserData] = useState<PropTypeUserCMSDetails[]>([]);

  useEffect(() => {
    dispatch(getUsersList({}));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (usersList) {
      setUserData(get(usersList, 'data', []));
    }
  }, usersList);

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

  const imageStyle = { padding: '5px 10px', height: '350px', borderRadius: '12px' };
  return (
    <>
      {userData &&
        userData?.map((value) => (
          <>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{ padding: '5px 10px 10px 10px' }}
              spacing={2}
            >
              <Avatar alt="" src="" sx={{ width: 56, height: 56 }} />
              <Box sx={{ minWidth: 240, flexGrow: 1 }}>
                {value.u_login}
                <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                  {value.u_email}
                </Typography>
              </Box>
              <Box>
                <IconButton sx={{ flexDirection: 'column' }}>
                  <Icon icon={eyeOutline} width={30} height={30} />
                  <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                    15k
                  </Typography>
                </IconButton>
                <IconButton sx={{ flexDirection: 'column' }}>
                  <Icon icon={messageCircleOutline} width={30} height={30} />
                  <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                    10k
                  </Typography>
                </IconButton>
                <IconButton sx={{ flexDirection: 'column' }}>
                  <Icon icon={heartOutline} width={30} height={30} />
                  <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                    8k
                  </Typography>
                </IconButton>
              </Box>
            </Stack>
            <Stack direction="row" sx={{ padding: '0px 0px 30px 0px' }}>
              <img alt="" src="/images/3.png" style={imageStyle} />
              <img alt="" src="/images/2.png" style={imageStyle} />
              <img alt="" src="/images/2.png" style={imageStyle} />
              <img alt="" src="/images/2.png" style={imageStyle} />
              <img alt="" src="/images/2.png" style={imageStyle} />
              <img alt="" src="/images/3.png" style={imageStyle} />
            </Stack>
          </>
        ))}
    </>
  );
}
