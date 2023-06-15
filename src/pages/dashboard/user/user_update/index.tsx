import { useEffect } from 'react';
import { useSnackbar } from 'notistack5';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, FormikProvider, useFormik } from 'formik';
import { styled } from '@material-ui/core/styles';
import * as Yup from 'yup';
// material
import { Card, Stack, TextField, Button, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from '../../../../redux/store';
import { getUsersById, updateUser } from '../../../../redux/slices/usersList';
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

export default function UsersUpdate() {
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { usersData, error }: { usersData: any; error: any } = useSelector(
    (state: { users: usersState }) => state.users
  );
  const userSchema = Yup.object().shape({
    username: Yup.string().max(255).required('Username is required'),
    userFBName: Yup.string(),
    fbId: Yup.string(),
    userYmailName: Yup.string(),
    ymailId: Yup.string(),
    userInstagramName: Yup.string(),
    instagramId: Yup.string(),
    userGmailName: Yup.string(),
    gmailId: Yup.string()
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: '',
      username: '',
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
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const payload = {
          u_login: values.username,
          u_referer_id: values.referenceId ? values.referenceId : 0,
          u_fb_username: values.userFBName,
          u_fb_id: values.fbId,
          u_gmail_username: values.userGmailName,
          u_gmail_id: values.gmailId,
          u_ymail_username: values.userYmailName,
          u_ymail_id: values.ymailId,
          u_pref_login: values.userPrefLogin ? values.userPrefLogin : 0,
          u_instagram_username: values.userInstagramName,
          u_instagram_id: values.instagramId
        };
        dispatch(updateUser(payload, Number(id)));
        setSubmitting(false);
        enqueueSnackbar('User Updated', { variant: 'success' });
        navigate('/dashboard/usersList');
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
        dispatch(getUsersById(Number(id)));
      } catch (error) {
        console.log('Error', error);
      }
    }
  }, [id]);

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error?.message, { variant: 'error' });
      navigate('/dashboard/usersList');
    }
    if (usersData && Object.keys(usersData).length) {
      setValues({
        email: usersData?.u_email,
        username: usersData?.u_login,
        referenceId: usersData?.u_referer_id,
        userFBName: usersData?.u_fb_username,
        fbId: usersData?.u_fb_id,
        userGmailName: usersData?.u_gmail_username,
        gmailId: usersData?.u_gmail_id,
        userYmailName: usersData?.u_ymail_username,
        ymailId: usersData?.u_ymail_id,
        userPrefLogin: usersData?.u_pref_login,
        userInstagramName: usersData?.u_instagram_username,
        instagramId: usersData?.u_instagram_id
      });
    }
  }, [usersData, error]);

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" onSubmit={handleSubmit}>
        <Stack spacing={3} sx={{ p: 3 }} direction="row">
          <BoxStyle>
            <HeadingStyle gutterBottom variant="h4">
              Update User
            </HeadingStyle>
            <Stack spacing={2} direction="column">
              <Stack spacing={2} direction="row">
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
                  aria-readonly={true}
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
                Update User
              </Button>
            </Stack>
          </BoxStyle>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
