import { styled } from '@material-ui/core/styles';
// material
import { Card, Stack, Typography, TableRow, TableCell, TableBody, Table } from '@material-ui/core';
import useAuth from '../../../../hooks/useAuth';
import MyAvatar from '../../../../components/MyAvatar';

const HeadingStyle = styled(Typography)(() => ({
  paddingBottom: 14
}));

const BoxStyle = styled(Card)(() => ({
  padding: '32px',
  background: '#FFFFFF',
  /* V3 reward shaddow */
  boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.06), 0px -5px 10px rgba(0, 0, 0, 0.06)',
  borderRadius: '12px',
  width: '100%'
}));

export default function UserProfile() {
  const { user } = useAuth();

  return (
    <Stack spacing={3} sx={{ p: 3 }} direction="row">
      <BoxStyle>
        <HeadingStyle gutterBottom variant="h4">
          My Profile
        </HeadingStyle>
        <Table size="small" aria-label="purchases">
          <TableBody>
            <TableRow>
              <TableCell colSpan={4}>
                <MyAvatar />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <b>Name</b>
              </TableCell>
              <TableCell>{user?.displayName}</TableCell>
              <TableCell>
                <b>Email</b>
              </TableCell>
              <TableCell>{user?.email}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <b>Role</b>
              </TableCell>
              <TableCell>{user?.role}</TableCell>
              <TableCell>
                <b>Phone Number</b>
              </TableCell>
              <TableCell>{user?.phoneNumber}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <b>Address</b>
              </TableCell>
              <TableCell>{user?.address}</TableCell>
              <TableCell>
                <b>About</b>
              </TableCell>
              <TableCell>{user?.about}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <b>Country</b>
              </TableCell>
              <TableCell>{user?.country}</TableCell>
              <TableCell>
                <b>State</b>
              </TableCell>
              <TableCell>{user?.state}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <b>City</b>
              </TableCell>
              <TableCell>{user?.city}</TableCell>
              <TableCell>
                <b>Zip Code</b>
              </TableCell>
              <TableCell>{user?.zipCode}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </BoxStyle>
    </Stack>
  );
}
