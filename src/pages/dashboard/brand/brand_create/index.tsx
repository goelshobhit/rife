import { useSnackbar } from 'notistack5';
import { useNavigate } from 'react-router-dom';
import { Form, FormikProvider, useFormik } from 'formik';
import { styled } from '@material-ui/core/styles';
// material
import { Card, Stack, TextField, Button, Typography } from '@material-ui/core';

import { useDispatch } from '../../../../redux/store';
import { createBrand, getBrandList } from '../../../../redux/slices/brand';

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
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: ''
    },
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const payload = {
          'Brand name': values.name
        };
        dispatch(createBrand(payload));
        resetForm();
        setSubmitting(false);
        enqueueSnackbar('Brand Created', { variant: 'success' });
        navigate('/dashboard/brand');
        dispatch(getBrandList({ bonusPageNo: 1 }));
      } catch (error) {
        console.error(error);
        setSubmitting(false);
      }
    }
  });

  const { handleSubmit, setFieldValue } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" onSubmit={handleSubmit}>
        <Stack spacing={3} sx={{ p: 3 }} direction="row">
          <BoxStyle>
            <HeadingStyle gutterBottom variant="h4">
              Create New Brand
            </HeadingStyle>
            <Stack spacing={2} direction="column">
              <Stack spacing={3} direction="row">
                <TextField
                  label="Brand Name"
                  fullWidth
                  required={true}
                  InputLabelProps={{ shrink: true }}
                  onChange={(e) => setFieldValue('name', e.target.value)}
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
                Create Brand
              </Button>
            </Stack>
          </BoxStyle>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
