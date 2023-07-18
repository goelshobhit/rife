import { useSnackbar } from 'notistack5';
import { useNavigate } from 'react-router-dom';
import { Form, FormikProvider, useFormik } from 'formik';
import { styled } from '@material-ui/core/styles';
import { matchPath, useLocation } from 'react-router';
import { useEffect, useState } from 'react';
// material
import { Card, Stack, TextField, Button, Typography } from '@material-ui/core';

import { useDispatch, useSelector } from '../../../../redux/store';
import { updateBrand, getBrandDetail, getBrandList } from '../../../../redux/slices/brand';
// @types
import { brandState } from '../../../../@types/brand';

const BoxStyle = styled(Card)(() => ({
  padding: '32px',
  background: '#FFFFFF',
  /* V3 reward shaddow */
  boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.06), 0px -5px 10px rgba(0, 0, 0, 0.06)',
  borderRadius: '12px',
  width: '100%'
}));

const HeadingStyle = styled(Typography)(() => ({
  paddingBottom: 14
}));

export default function BrandUpdate() {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [brandData, setBrandData] = useState<any>({});
  const match = matchPath('dashboard/brand/edit/:id', location?.pathname);
  const { selected_brand } = useSelector((state: { brand: brandState }) => state.brand);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      cr_co_name: ''
    },
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const payload = {
          cr_co_name: brandData.cr_co_name
        };
        dispatch(updateBrand(Number(match?.params?.id), payload));
        resetForm();
        setSubmitting(false);
        enqueueSnackbar('Brand Updated', { variant: 'success' });
        navigate('/dashboard/brand');
      } catch (error) {
        console.error(error);
        setSubmitting(false);
      }
    }
  });
  const { values, handleSubmit } = formik;
  useEffect(() => {
    setBrandData(selected_brand);
  }, [selected_brand]);

  useEffect(() => {
    dispatch(getBrandDetail({ brandID: match?.params?.id }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" onSubmit={handleSubmit}>
        <Stack spacing={3} sx={{ p: 3 }} direction="row">
          <BoxStyle>
            <HeadingStyle gutterBottom variant="h4">
              Update Brand
            </HeadingStyle>
            <Stack spacing={2} direction="column">
              <Stack spacing={3} direction="row">
                <TextField
                  label="Brand Name"
                  fullWidth
                  required={true}
                  name="cr_co_name"
                  value={brandData.cr_co_name}
                  InputLabelProps={{ shrink: true }}
                  onChange={(e) => setBrandData({ cr_co_name: e.target.value })}
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
                Update Brand
              </Button>
            </Stack>
          </BoxStyle>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
