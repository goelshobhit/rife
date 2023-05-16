import * as Yup from 'yup';
import { useSnackbar } from 'notistack5';
import { useFormik, Form, FormikProvider } from 'formik';
// material
import { Grid, Button, TextField } from '@material-ui/core';

interface FormValues {
  booster_value_in_tokens: number;
  key_value_in_tokens: number;
  star_value_in_tokens: number;
  token_value_in_usd: number;
  max_no_of_ballons: number;
  app_use_hours: number;
}

// ----------------------------------------------------------------------

interface Props {
  initialVal: any;
}
// ----------------------------------------------------------------------

export default function WithMaterialUIRewardSettingForm({ initialVal }: Props) {
  const { enqueueSnackbar } = useSnackbar();

  const handleClosePreview = () => {};

  const RewardSettingSchema = Yup.object().shape({
    booster_value_in_tokens: Yup.string().required('required'),
    key_value_in_tokens: Yup.string().required('required'),
    star_value_in_tokens: Yup.string().required('required'),
    token_value_in_usd: Yup.string().required('required')
  });

  const formik = useFormik<FormValues>({
    initialValues: {
      booster_value_in_tokens: initialVal.booster_value_in_tokens,
      key_value_in_tokens: initialVal.key_value_in_tokens,
      star_value_in_tokens: initialVal.star_value_in_tokens,
      token_value_in_usd: initialVal.token_value_in_usd,
      max_no_of_ballons: 0,
      app_use_hours: 0
    },
    validationSchema: RewardSettingSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        resetForm();
        handleClosePreview();
        setSubmitting(false);
        enqueueSnackbar('Post success', { variant: 'success' });
      } catch (error) {
        console.error(error);
        setSubmitting(false);
      }
    }
  });

  const { errors, values, touched, handleSubmit, getFieldProps } = formik;

  return (
    <div style={{ marginTop: 14 }}>
      <FormikProvider value={formik}>
        <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <Grid container spacing={3} sm={12}>
            <Grid item sm={6}>
              <TextField
                fullWidth
                label="App use hours to qualify for 1 Balloon"
                {...getFieldProps('app_use_hours')}
                value={values.app_use_hours}
                error={Boolean(touched.app_use_hours && errors.app_use_hours)}
                helperText={touched.app_use_hours && errors.app_use_hours}
                InputLabelProps={{
                  shrink: true
                }}
              />
            </Grid>
            <Grid item sm={6}>
              <TextField
                fullWidth
                label="Max number of Ballons per week"
                {...getFieldProps('max_no_of_ballons')}
                value={values.max_no_of_ballons}
                error={Boolean(touched.max_no_of_ballons && errors.max_no_of_ballons)}
                helperText={touched.max_no_of_ballons && errors.max_no_of_ballons}
                InputLabelProps={{
                  shrink: true
                }}
              />
            </Grid>

            <Grid item sm={3}>
              <TextField
                fullWidth
                label="Tokens in USD"
                {...getFieldProps('token_value_in_usd')}
                value={values.token_value_in_usd}
                error={Boolean(touched.token_value_in_usd && errors.token_value_in_usd)}
                helperText={touched.token_value_in_usd && errors.token_value_in_usd}
                InputLabelProps={{
                  shrink: true
                }}
                InputProps={{
                  startAdornment: <strong>$</strong>
                }}
              />
            </Grid>
            <Grid item sm={3}>
              <TextField
                fullWidth
                label="Star Value in Tokens"
                {...getFieldProps('star_value_in_tokens')}
                value={values.star_value_in_tokens}
                error={Boolean(touched.star_value_in_tokens && errors.star_value_in_tokens)}
                helperText={touched.star_value_in_tokens && errors.star_value_in_tokens}
                InputLabelProps={{
                  shrink: true
                }}
                InputProps={{
                  endAdornment: <strong>Tokens</strong>
                }}
              />
            </Grid>
            <Grid item sm={2}>
              <TextField
                fullWidth
                label="Key Value in Tokens "
                {...getFieldProps('key_value_in_tokens')}
                value={values.key_value_in_tokens}
                error={Boolean(touched.key_value_in_tokens && errors.key_value_in_tokens)}
                helperText={touched.key_value_in_tokens && errors.key_value_in_tokens}
                InputLabelProps={{
                  shrink: true
                }}
                InputProps={{
                  endAdornment: <strong>Tokens</strong>
                }}
              />
            </Grid>
            <Grid item sm={2}>
              <TextField
                fullWidth
                label="Booster Value in Tokens"
                {...getFieldProps('booster_value_in_tokens')}
                value={values.booster_value_in_tokens}
                error={Boolean(touched.booster_value_in_tokens && errors.booster_value_in_tokens)}
                helperText={touched.booster_value_in_tokens && errors.booster_value_in_tokens}
                InputLabelProps={{
                  shrink: true
                }}
                InputProps={{
                  endAdornment: <strong>Tokens</strong>
                }}
              />
            </Grid>
            <Grid item sm={2}>
              <Button fullWidth type="submit" color="primary" variant="contained" size="large">
                Save
              </Button>
            </Grid>
          </Grid>
        </Form>
      </FormikProvider>
    </div>
  );
}
