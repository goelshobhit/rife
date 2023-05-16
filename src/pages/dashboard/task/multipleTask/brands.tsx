import { useEffect, useState } from 'react';
import map from 'lodash/map';
import get from 'lodash/get';
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
import { find, toLower } from 'lodash';
// material
import {
  Card,
  Typography,
  Grid,
  TextField,
  Button,
  FormControl,
  RadioGroup,
  FormHelperText
} from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
// redux
import { useDispatch, useSelector } from '../../../../redux/store';
import { getAllBrands } from '../../../../redux/slices/tasks';

// @types
import { taskBrandsState } from '../../../../@types/task';
// dynamic fields
import { taskForm } from '../../../../constants/questions';
import { getItem, setItem } from '../../../../utils/storage';

interface InitialValues {
  select_brand: string;
  task_type: string;
}

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2),
  padding: 32
}));

const CardStyle = styled(Card)(({ theme }) => ({
  width: '90%',
  height: 200,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'end',
  marginTop: 48,
  marginBottom: 72,
  padding: 0,
  backgroundColor: theme.palette.primary.main,
  margin: 10
}));

const HeadingStyle = styled(Typography)(() => ({
  paddingBottom: 14
}));

const BrandStyle = styled(Typography)(() => ({
  padding: 23,
  backgroundColor: '#fff',
  height: '38%',
  fontWeight: 600
}));

const LoginSchema = Yup.object().shape({
  select_brand: Yup.string().required('Required'),
  task_type: Yup.string().required('Required')
});

const RowStyle = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-end',
  marginTop: 58
}));

const NextButtonStyle = styled(Button)(({ theme }) => ({
  borderColor: 'inherit',
  borderRadius: 23,
  padding: '6px 16px 6px 16px',
  border: '2px solid',
  fontWeight: 700,
  fontSize: 14,
  height: 36
}));

export default function TaskBrand({ handleNext, handleShowSteps, handleSetSelectBrand }: any) {
  const formInitialValues = getItem('task_form_1');

  const formik = useFormik<InitialValues>({
    initialValues: {
      select_brand: get(formInitialValues, 'select_brand', ''),
      task_type: get(formInitialValues, 'task_type', '')
    },
    validationSchema: LoginSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        handleNext(values);
      } catch (error) {
        resetForm();
      }
    }
  });

  const { errors, touched, values, getFieldProps, handleChange, setFieldValue } = formik;

  const dispatch = useDispatch();
  const { brandPageNo, brands, hasMoreBrands } = useSelector(
    (state: { task: taskBrandsState }) => state.task
  );
  const [page, setPageNo] = useState(brandPageNo);

  useEffect(() => {
    if (hasMoreBrands) {
      dispatch(getAllBrands({ brandPageNo: page }));
    }
  }, [dispatch, hasMoreBrands, page]);

  useEffect(() => {
    setPageNo(brandPageNo);
  }, [brandPageNo]);

  const fieldProps = {
    label: taskForm.FIRST_FORM.LABEL,
    name: taskForm.FIRST_FORM.NAME,
    type: taskForm.FIRST_FORM.TYPE,
    getFieldProps
  };

  return (
    <>
      <FormikProvider value={formik}>
        <Form autoComplete="off">
          <SectionStyle>
            <HeadingStyle gutterBottom variant="h4">
              {taskForm.FIRST_FORM.HEADING}
            </HeadingStyle>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                name={fieldProps.name}
                id={fieldProps.name}
                select
                label={fieldProps.label}
                value={values.select_brand}
                onChange={(e) => {
                  const selectedBrand = find(
                    brands,
                    (item: any) => toLower(item.name) === toLower(e.target.value)
                  );
                  handleSetSelectBrand(selectedBrand);
                  setFieldValue(fieldProps.name, get(e, 'target.value'));
                }}
                fullWidth
                error={Boolean(touched.select_brand && errors.select_brand)}
                helperText={touched.select_brand && errors.select_brand}
                InputLabelProps={{
                  shrink: true
                }}
              >
                <MenuItem value="" key="">
                  None
                </MenuItem>
                {map(brands, (item: any, index: number) => (
                  <MenuItem value={item.name} key={item.name}>
                    {item.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </SectionStyle>

          <Grid container spacing={1}>
            <FormControl
              error={Boolean(touched.task_type || errors.task_type)}
              variant="standard"
              style={{ width: '100%' }}
            >
              <RadioGroup
                aria-labelledby="demo-error-radios"
                name="quiz"
                value={get(values, 'task_type')}
                onChange={handleChange}
                style={{ width: '100%', display: 'flex', flexDirection: 'row' }}
              >
                {['Task', 'Question', 'Watch', 'Contest'].map((item: any) => (
                  <Grid
                    item
                    xs={3}
                    key={item}
                    onClick={() => {
                      setItem('task_type_heading', `Create ${item}`);
                      setFieldValue('task_type', item);
                      handleShowSteps();
                    }}
                  >
                    <CardStyle
                      style={{
                        border:
                          get(values, 'task_type') === item ? '2px solid black' : '1px solid #fff'
                      }}
                    >
                      <BrandStyle variant="h4">{item}</BrandStyle>
                    </CardStyle>
                  </Grid>
                ))}
              </RadioGroup>
              {errors.task_type && <FormHelperText>{errors.task_type}</FormHelperText>}
            </FormControl>
          </Grid>
          <RowStyle>
            <NextButtonStyle variant="contained" color="primary" className="button" type="submit">
              Next
            </NextButtonStyle>
          </RowStyle>
        </Form>
      </FormikProvider>
    </>
  );
}
