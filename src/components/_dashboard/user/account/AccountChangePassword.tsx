import * as Yup from 'yup';
import { useSnackbar } from 'notistack5';
import { useFormik, Form, FormikProvider } from 'formik';
// material
import { Stack, Card, TextField, styled, Typography } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
// utils
import { changePassword } from '../../../../redux/slices/user';

// ----------------------------------------------------------------------

const HeadingStyle = styled(Typography)(() => ({
  paddingBottom: 14
}));

export default function AccountChangePassword() {
  const { enqueueSnackbar } = useSnackbar();

  const ChangePassWordSchema = Yup.object().shape({
    oldPassword: Yup.string().required('Old Password is required'),
    newPassword: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('New Password is required'),
    confirmNewPassword: Yup.string().oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
  });

  const formik = useFormik({
    initialValues: {
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: ''
    },
    validationSchema: ChangePassWordSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const payload = {
          current_password: values?.oldPassword,
          new_password: values?.newPassword,
          confirm_password: values?.confirmNewPassword
        };
        changePassword(payload);
        resetForm();
        setSubmitting(false);
        enqueueSnackbar('Password Changed Successfully', { variant: 'success' });
      } catch (error) {
        console.error(error);
        setSubmitting(false);
      }
    }
  });

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

  return (
    <Card sx={{ p: 3 }}>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <HeadingStyle gutterBottom variant="h4">
            Change Password
          </HeadingStyle>
          <Stack spacing={3} alignItems="flex-end">
            <TextField
              {...getFieldProps('oldPassword')}
              fullWidth
              autoComplete="on"
              type="password"
              label="Old Password"
              error={Boolean(touched.oldPassword && errors.oldPassword)}
              helperText={touched.oldPassword && errors.oldPassword}
            />

            <TextField
              {...getFieldProps('newPassword')}
              fullWidth
              autoComplete="on"
              type="password"
              label="New Password"
              error={Boolean(touched.newPassword && errors.newPassword)}
              helperText={
                (touched.newPassword && errors.newPassword) || 'Password must be minimum 6+'
              }
            />

            <TextField
              {...getFieldProps('confirmNewPassword')}
              fullWidth
              autoComplete="on"
              type="password"
              label="Confirm New Password"
              error={Boolean(touched.confirmNewPassword && errors.confirmNewPassword)}
              helperText={touched.confirmNewPassword && errors.confirmNewPassword}
            />

            <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
              Save Changes
            </LoadingButton>
          </Stack>
        </Form>
      </FormikProvider>
    </Card>
  );
}
