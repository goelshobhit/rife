import { useSnackbar } from 'notistack5';
import { useNavigate } from 'react-router-dom';
import { Form, FormikProvider, useFormik } from 'formik';
import { styled } from '@material-ui/core/styles';
import * as Yup from 'yup';
// material
import { Card, Stack, TextField, Button, Typography, MenuItem } from '@material-ui/core';
import map from 'lodash/map';
import { useDispatch } from '../../../../redux/store';
import { createUser } from '../../../../redux/slices/usersList';

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

export default function UsersCreate() {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userTypelist = [
    {
      label: 'Normal',
      value: 'Normal'
    },
    {
      label: 'Facebook',
      value: 'Facebook'
    },
    {
      label: 'Instagram',
      value: 'Instagram'
    },
    {
      label: 'Gmail',
      value: 'Gmail'
    },
    {
      label: 'Ymail',
      value: 'Ymail'
    }
  ];

  const userSchema = Yup.object().shape({
    userType: Yup.string().required('User Type is required'),
    email: Yup.string().email('Email must be a valid email').max(255).required('Email is required'),
    username: Yup.string().max(255).required('Username is required'),
    password: Yup.string().min(8).max(15).required('Password is required'),
    confirmPassword: Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('password')], 'Confirm Passwords must match to the password'),
    userFBName: Yup.string().when('userType', {
      is: (e: string) => e === 'Facebook',
      then: Yup.string().trim().required('Facebook Name'),
      otherwise: Yup.string().nullable()
    }),
    fbId: Yup.string().when('userType', {
      is: (e: string) => e === 'Facebook',
      then: Yup.string().trim().required('Facebook Id'),
      otherwise: Yup.string().nullable()
    }),
    userYmailName: Yup.string().when('userType', {
      is: (e: string) => e === 'Ymail',
      then: Yup.string().trim().required('Ymail Name'),
      otherwise: Yup.string().nullable()
    }),
    ymailId: Yup.string().when('userType', {
      is: (e: string) => e === 'Ymail',
      then: Yup.string().trim().required('Ymail Id'),
      otherwise: Yup.string().nullable()
    }),
    userInstagramName: Yup.string().when('userType', {
      is: (e: string) => e === 'Instagram',
      then: Yup.string().trim().required('Instagram Name'),
      otherwise: Yup.string().nullable()
    }),
    instagramId: Yup.string().when('userType', {
      is: (e: string) => e === 'Instagram',
      then: Yup.string().trim().required('Instagram Id'),
      otherwise: Yup.string().nullable()
    }),
    userGmailName: Yup.string().when('userType', {
      is: (e: string) => e === 'Gmail',
      then: Yup.string().trim().required('Gmail Name'),
      otherwise: Yup.string().nullable()
    }),
    gmailId: Yup.string().when('userType', {
      is: (e: string) => e === 'Gmail',
      then: Yup.string().trim().required('Gmail Id'),
      otherwise: Yup.string().nullable()
    })
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      userType: 'Normal',
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
      referenceId: null,
      userFBName: '',
      fbId: '',
      userGmailName: '',
      gmailId: '',
      userYmailName: '',
      ymailId: '',
      userPrefLogin: null,
      userInstagramName: '',
      instagramId: ''
    },
    validationSchema: userSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const payload = {
          'User Type': values.userType,
          'User email': values.email,
          'User login': values.username,
          'User password': values.password,
          'Referer id': values.referenceId ? values.referenceId : 0,
          'User fb name': values.userFBName,
          'Fb id': values.fbId,
          'User gmail name': values.userGmailName,
          'Gmail id': values.gmailId,
          'User ymail name': values.userYmailName,
          'Ymail id': values.ymailId,
          'User pref login': values.userPrefLogin ? values.userPrefLogin : 0,
          'User instagram name': values.userInstagramName,
          'Instagram id': values.instagramId
        };
        dispatch(createUser(payload));
        resetForm();
        setSubmitting(false);
        enqueueSnackbar('User Created', { variant: 'success' });
        navigate('/dashboard/usersList');
      } catch (error) {
        console.error(error);
        setSubmitting(false);
      }
    }
  });

  const { values, touched, handleSubmit, setFieldValue, errors } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" onSubmit={handleSubmit}>
        <Stack spacing={3} sx={{ p: 3 }} direction="row">
          <BoxStyle>
            <HeadingStyle gutterBottom variant="h4">
              Create New User
            </HeadingStyle>
            <Stack spacing={2} direction="column">
              <Stack spacing={2} direction="row">
                <TextField
                  variant="outlined"
                  name="userType"
                  id="userType"
                  select
                  label="User Type"
                  value={values.userType}
                  defaultValue={values.userType}
                  onChange={(e) => setFieldValue('userType', e.target.value)}
                  fullWidth
                  error={Boolean(touched.userType && errors.userType)}
                  helperText={touched.userType && errors.userType}
                  InputLabelProps={{
                    shrink: true
                  }}
                >
                  {map(userTypelist, (item: any, index: any) => (
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
                  value={values.email}
                  onChange={(e) => setFieldValue('email', e.target.value)}
                  fullWidth
                  error={Boolean(touched.email && errors.email)}
                  helperText={touched.email && errors.email}
                  InputLabelProps={{
                    shrink: true
                  }}
                />
              </Stack>
              <Stack spacing={2} direction="row">
                <TextField
                  variant="outlined"
                  type="password"
                  name="password"
                  label="Password"
                  value={values.password}
                  onChange={(e) => setFieldValue('password', e.target.value)}
                  fullWidth
                  error={Boolean(touched.password && errors.password)}
                  helperText={touched.password && errors.password}
                  InputLabelProps={{
                    shrink: true
                  }}
                />
                <TextField
                  variant="outlined"
                  type="password"
                  name="confirmPassword"
                  label="Confirm Password"
                  value={values.confirmPassword}
                  onChange={(e) => setFieldValue('confirmPassword', e.target.value)}
                  fullWidth
                  error={Boolean(touched.confirmPassword && errors.confirmPassword)}
                  helperText={touched.confirmPassword && errors.confirmPassword}
                  InputLabelProps={{
                    shrink: true
                  }}
                />
              </Stack>
              <Stack spacing={2} direction="row">
                <TextField
                  variant="outlined"
                  type="number"
                  name="referenceId"
                  label="Reference Id"
                  value={values.referenceId}
                  onChange={(e) => setFieldValue('referenceId', e.target.value)}
                  fullWidth
                  error={Boolean(touched.referenceId && errors.referenceId)}
                  helperText={touched.referenceId && errors.referenceId}
                  InputLabelProps={{
                    shrink: true
                  }}
                />
              </Stack>
              <Stack spacing={2} direction="row">
                <TextField
                  variant="outlined"
                  name="userFBName"
                  label="Facebook Name"
                  value={values.userFBName}
                  onChange={(e) => setFieldValue('userFBName', e.target.value)}
                  fullWidth
                  error={Boolean(touched.userFBName && errors.userFBName)}
                  helperText={touched.userFBName && errors.userFBName}
                  InputLabelProps={{
                    shrink: true
                  }}
                />
                <TextField
                  variant="outlined"
                  name="fbId"
                  label="Facebook Id"
                  value={values.fbId}
                  onChange={(e) => setFieldValue('fbId', e.target.value)}
                  fullWidth
                  error={Boolean(touched.fbId && errors.fbId)}
                  helperText={touched.fbId && errors.fbId}
                  InputLabelProps={{
                    shrink: true
                  }}
                />
              </Stack>
              <Stack spacing={2} direction="row">
                <TextField
                  variant="outlined"
                  name="userYmailName"
                  label="Ymail Name"
                  value={values.userYmailName}
                  onChange={(e) => setFieldValue('userYmailName', e.target.value)}
                  fullWidth
                  error={Boolean(touched.userYmailName && errors.userYmailName)}
                  helperText={touched.userYmailName && errors.userYmailName}
                  InputLabelProps={{
                    shrink: true
                  }}
                />
                <TextField
                  variant="outlined"
                  name="ymailId"
                  label="Ymail Id"
                  value={values.ymailId}
                  onChange={(e) => setFieldValue('ymailId', e.target.value)}
                  fullWidth
                  error={Boolean(touched.ymailId && errors.ymailId)}
                  helperText={touched.ymailId && errors.ymailId}
                  InputLabelProps={{
                    shrink: true
                  }}
                />
              </Stack>
              <Stack spacing={2} direction="row">
                <TextField
                  variant="outlined"
                  name="userGmailName"
                  label="Gmail Name"
                  value={values.userGmailName}
                  onChange={(e) => setFieldValue('userGmailName', e.target.value)}
                  fullWidth
                  error={Boolean(touched.userGmailName && errors.userGmailName)}
                  helperText={touched.userGmailName && errors.userGmailName}
                  InputLabelProps={{
                    shrink: true
                  }}
                />
                <TextField
                  variant="outlined"
                  name="gmailId"
                  label="Gmail Id"
                  value={values.gmailId}
                  onChange={(e) => setFieldValue('gmailId', e.target.value)}
                  fullWidth
                  error={Boolean(touched.gmailId && errors.gmailId)}
                  helperText={touched.gmailId && errors.gmailId}
                  InputLabelProps={{
                    shrink: true
                  }}
                />
              </Stack>
              <Stack spacing={2} direction="row">
                <TextField
                  variant="outlined"
                  name="userPrefLogin"
                  label="Pref Login"
                  value={values.userPrefLogin}
                  onChange={(e) => setFieldValue('userPrefLogin', e.target.value)}
                  fullWidth
                  error={Boolean(touched.userPrefLogin && errors.userPrefLogin)}
                  helperText={touched.userPrefLogin && errors.userPrefLogin}
                  InputLabelProps={{
                    shrink: true
                  }}
                />
                <TextField
                  variant="outlined"
                  name="userInstagramName"
                  label="Instagram Name"
                  value={values.userInstagramName}
                  onChange={(e) => setFieldValue('userInstagramName', e.target.value)}
                  fullWidth
                  error={Boolean(touched.userInstagramName && errors.userInstagramName)}
                  helperText={touched.userInstagramName && errors.userInstagramName}
                  InputLabelProps={{
                    shrink: true
                  }}
                />
                <TextField
                  variant="outlined"
                  name="instagramId"
                  label="Instagram Id"
                  value={values.instagramId}
                  onChange={(e) => setFieldValue('instagramId', e.target.value)}
                  fullWidth
                  error={Boolean(touched.instagramId && errors.instagramId)}
                  helperText={touched.instagramId && errors.instagramId}
                  InputLabelProps={{
                    shrink: true
                  }}
                />
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
                Create User
              </Button>
            </Stack>
          </BoxStyle>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
