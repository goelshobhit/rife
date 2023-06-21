import { useSnackbar } from 'notistack5';
import { useEffect } from 'react';
import { Form, FormikProvider, useFormik } from 'formik';
import { styled } from '@material-ui/core/styles';
// material
import { Card, Stack, TextField, Button, Typography } from '@material-ui/core';

import { useDispatch, useSelector } from '../../../../redux/store';
import useAuth from '../../../../hooks/useAuth';
import { changeAdminSetting, getAdminSetting } from '../../../../redux/slices/usersList';
import { usersState } from '../../../../@types/users';
import { AccountChangePassword } from '../../../../components/_dashboard/user/account';

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

export default function BrandCreate() {
  const { user } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const { adminSetting }: { adminSetting: any } = useSelector(
    (state: { users: usersState }) => state.users
  );
  const dispatch = useDispatch();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      ad_conversion_rate: 0,
      ad_min_withdraw_limit: 0,
      ad_max_withdraw_limit: 0
    },
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const payload = {
          ad_conversion_rate: values.ad_conversion_rate,
          ad_min_withdraw_limit: values.ad_min_withdraw_limit,
          ad_max_withdraw_limit: values.ad_max_withdraw_limit
        };
        dispatch(changeAdminSetting(payload));
        setSubmitting(false);
        enqueueSnackbar('Setting Changed Successfully', { variant: 'success' });
        dispatch(getAdminSetting());
      } catch (error) {
        console.error(error);
        setSubmitting(false);
      }
    }
  });

  const { handleSubmit, setFieldValue, values, setValues } = formik;

  useEffect(() => {
    dispatch(getAdminSetting());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (adminSetting) {
      setValues({
        ad_conversion_rate: adminSetting?.ad_conversion_rate,
        ad_max_withdraw_limit: adminSetting?.ad_max_withdraw_limit,
        ad_min_withdraw_limit: adminSetting?.ad_min_withdraw_limit
      });
    }
  }, [adminSetting]);

  return (
    <>
      <FormikProvider value={formik}>
        <Form autoComplete="off" onSubmit={handleSubmit}>
          <Stack spacing={3} sx={{ pb: 3 }} direction="row">
            <BoxStyle>
              <HeadingStyle gutterBottom variant="h4">
                Settings
              </HeadingStyle>
              <Stack spacing={2} direction="column">
                <Stack spacing={3} direction="row">
                  <TextField
                    label="Conversion Rate"
                    type="number"
                    value={values?.ad_conversion_rate}
                    fullWidth
                    name="ad_conversion_rate"
                    required={true}
                    InputLabelProps={{ shrink: true }}
                    onChange={(e) => setFieldValue('ad_conversion_rate', Number(e.target.value))}
                  />
                  <TextField
                    label="Min Withdraw Limit"
                    type="number"
                    value={values?.ad_min_withdraw_limit}
                    fullWidth
                    name="ad_min_withdraw_limit"
                    required={true}
                    InputLabelProps={{ shrink: true }}
                    onChange={(e) => setFieldValue('ad_min_withdraw_limit', Number(e.target.value))}
                  />
                  <TextField
                    label="Max Withdraw Limit"
                    type="number"
                    value={values?.ad_max_withdraw_limit}
                    fullWidth
                    name="ad_max_withdraw_limit"
                    required={true}
                    InputLabelProps={{ shrink: true }}
                    onChange={(e) => setFieldValue('ad_max_withdraw_limit', Number(e.target.value))}
                  />
                </Stack>
              </Stack>
              <Stack
                direction="row"
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
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
                  Save Setting
                </Button>
              </Stack>
            </BoxStyle>
          </Stack>
        </Form>
      </FormikProvider>
      {user?.role !== 'admin' && <AccountChangePassword />}
    </>
  );
}
