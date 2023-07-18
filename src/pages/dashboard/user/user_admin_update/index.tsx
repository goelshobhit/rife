import { useEffect } from 'react';
import { useSnackbar } from 'notistack5';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, FormikProvider, useFormik } from 'formik';
import { styled } from '@material-ui/core/styles';
import map from 'lodash/map';
import * as Yup from 'yup';
// material
import {
  Card,
  Stack,
  TextField,
  Button,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  MenuItem
} from '@material-ui/core';
import { useDispatch, useSelector } from '../../../../redux/store';
import { getAdminUsersById, updateAdminUser } from '../../../../redux/slices/usersList';
import { usersState } from '../../../../@types/users';

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

export default function AdminUsersUpdate() {
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { adminUsersData, error }: { adminUsersData: any; error: any } = useSelector(
    (state: { users: usersState }) => state.users
  );
  const roleList = [
    {
      label: 'Admin',
      value: 1
    }
  ];
  const adminUserSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email').max(255).required('Email is required'),
    username: Yup.string().max(255).required('Username is required')
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: '',
      username: '',
      role: 1,
      status: '1'
    },
    validationSchema: adminUserSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const payload = {
          au_email: values.email,
          au_name: values.username,
          au_active_status: values.status,
          ar_role_id: values.role
        };
        dispatch(updateAdminUser(payload, Number(id)));
        setSubmitting(false);
        enqueueSnackbar('Admin User Updated', { variant: 'success' });
        navigate('/dashboard/usersList/admin');
      } catch (error) {
        console.error(error);
        setSubmitting(false);
      }
    }
  });

  const { values, touched, handleSubmit, setFieldValue, setValues, errors } = formik;

  useEffect(() => {
    if (id) {
      try {
        dispatch(getAdminUsersById(Number(id)));
      } catch (error) {
        console.log('Error', error);
      }
    }
  }, [id]);

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error?.message, { variant: 'error' });
      navigate('/dashboard/usersList/admin');
    }
    if (adminUsersData && Object.keys(adminUsersData).length) {
      setValues({
        username: adminUsersData?.au_name,
        email: adminUsersData?.au_email,
        role: adminUsersData?.ar_role_id,
        status: adminUsersData?.au_active_status?.toString()
      });
    }
  }, [adminUsersData, error]);

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" onSubmit={handleSubmit}>
        <Stack spacing={3} sx={{ p: 3 }} direction="row">
          <BoxStyle>
            <HeadingStyle gutterBottom variant="h4">
              Update Admin User
            </HeadingStyle>
            <Stack spacing={2} direction="column">
              <Stack spacing={2} direction="row">
                <TextField
                  variant="outlined"
                  name="role"
                  id="role"
                  select
                  label="Admin Role"
                  value={values.role}
                  defaultValue={values.role}
                  onChange={(e) => setFieldValue('role', e.target.value)}
                  fullWidth
                  error={Boolean(touched.role && errors.role)}
                  helperText={touched.role && errors.role}
                  InputLabelProps={{
                    shrink: true
                  }}
                >
                  {map(roleList, (item: any, index: any) => (
                    <MenuItem value={item.value} key={index}>
                      {item.label}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  variant="outlined"
                  name="userName"
                  label="Username"
                  value={values.username}
                  onChange={(e) => setFieldValue('username', e.target.value)}
                  fullWidth
                  error={Boolean(touched.username && errors.username)}
                  helperText={touched.username && errors.username}
                  InputLabelProps={{
                    shrink: true
                  }}
                />
                <TextField
                  variant="outlined"
                  name="email"
                  label="Email"
                  aria-readonly
                  value={values.email}
                  fullWidth
                  error={Boolean(touched.email && errors.email)}
                  helperText={touched.email && errors.email}
                  InputLabelProps={{
                    shrink: true
                  }}
                />
              </Stack>
              <Stack spacing={2} direction="row">
                <RadioGroup
                  key="1"
                  value={values.status}
                  name="status"
                  onChange={(event) => setFieldValue('status', event.target.value)}
                >
                  <FormControlLabel
                    value="1"
                    label="Active"
                    style={{ color: 'black' }}
                    control={<Radio size="small" />}
                    sx={{ color: 'common.white' }}
                  />
                  <FormControlLabel
                    value="0"
                    label="Inactive"
                    style={{ color: 'black' }}
                    control={<Radio size="small" />}
                    sx={{ color: 'common.white' }}
                  />
                </RadioGroup>
              </Stack>
            </Stack>
            <Stack
              direction="row"
              style={{
                display: 'flex',
                justifyContent: 'flex-start',
                width: '100%',
                marginTop: 20,
                marginBottom: 10
              }}
            >
              <Button
                variant="contained"
                color="primary"
                className="button"
                type="submit"
                style={{
                  borderRadius: 35
                }}
              >
                Update Admin User
              </Button>
            </Stack>
          </BoxStyle>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
