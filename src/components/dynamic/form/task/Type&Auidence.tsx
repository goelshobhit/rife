import { useCallback } from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
// map
import map from 'lodash/map';
import size from 'lodash/size';
import includes from 'lodash/includes';
import { isEmpty } from 'lodash';
import get from 'lodash/get';
// material
import { Stack, Card, Typography, Grid, Button } from '@material-ui/core';
// material
import { styled } from '@material-ui/core/styles';
// redux
// dynamic fields
import { getDynamicFields } from '../dynamicFields';

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2),
  padding: 32
}));

const HeadingStyle = styled(Typography)(() => ({
  paddingBottom: 14
}));

type Props = {
  fieldJson: any;
  disabled: boolean;
  handleSetHeading: any;
  activeStep: any;
  handleBack: any;
  handleSaveNext: any;
  initialValues: any;
  validationSchema: any;
};

interface InitialValues {
  task_type: string;
  task_name: string;
  audience: string;
  energy_cost_per_user: string;
}

const RowStyle = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-end',
  marginTop: 58
}));

const NextButtonStyle = styled(Button)(() => ({
  borderColor: 'inherit',
  borderRadius: 23,
  padding: '6px 16px 6px 16px',
  border: '2px solid',
  fontWeight: 700,
  fontSize: 14,
  height: 36
}));

export function DynamicFormForAuidence({
  fieldJson,
  disabled,
  handleSetHeading,
  handleBack,
  activeStep,
  handleSaveNext,
  initialValues,
  validationSchema
}: Props) {
  const formInitialValues = initialValues;

  const formik = useFormik<InitialValues>({
    initialValues: {
      task_type: get(formInitialValues, 'task_type', ''),
      task_name: get(formInitialValues, 'task_name', ''),
      audience: get(formInitialValues, 'audience', ''),
      energy_cost_per_user: get(formInitialValues, 'energy_cost_per_user', '')
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        handleSaveData(values);
      } catch (error) {
        // do nothing
      }
    }
  });
  const { errors, touched, values, getFieldProps, handleChange, setFieldValue } = formik;
  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        setFieldValue('cover', {
          ...file,
          preview: URL.createObjectURL(file)
        });
      }
    },
    [setFieldValue]
  );

  const renderTaskName = (heading: any, handleSetHeading: any) => {
    if (get(values, 'task_type') && includes(['Task Type'], heading)) {
      handleSetHeading(`Task Type - ${get(values, 'task_type')}`);
      return `- ${get(values, 'task_type')}`;
    }
    if (isEmpty(get(values, 'task_type'))) {
      handleSetHeading(`Create Task`);
    }
    return false;
  };
  // console.log(values);
  // console.log(formData);

  const handleSaveData = (values: any) => {
    handleSaveNext(values);
  };

  return (
    <>
      <FormikProvider value={formik}>
        <Form autoComplete="off">
          {map(fieldJson, ({ heading, fields }, index) => (
            <SectionStyle key={index}>
              <HeadingStyle gutterBottom variant="h4">
                {heading} {renderTaskName(heading, handleSetHeading)}
              </HeadingStyle>

              <Stack spacing={3}>
                <Grid container spacing={3}>
                  {map(fields, (item: any) => {
                    const fieldProps = {
                      ...item,
                      getFieldProps,
                      touched,
                      errors,
                      handleChange,
                      values,
                      setFieldValue,
                      handleDrop
                    };

                    return (
                      <Grid item xs={size(fields) > 1 ? 6 : 12}>
                        {getDynamicFields(fieldProps, disabled)}
                      </Grid>
                    );
                  })}
                </Grid>
              </Stack>
            </SectionStyle>
          ))}
          <RowStyle>
            <NextButtonStyle disabled={activeStep === 0} onClick={handleBack} className="button">
              Back
            </NextButtonStyle>
            <NextButtonStyle className="button" type="submit">
              Save
            </NextButtonStyle>

            {activeStep === 1 && (
              <NextButtonStyle variant="contained" color="primary" className="button" type="submit">
                Next
              </NextButtonStyle>
            )}

            {activeStep === 2 && (
              <NextButtonStyle variant="contained" color="primary" className="button" type="submit">
                Complete Setup
              </NextButtonStyle>
            )}
          </RowStyle>
        </Form>
      </FormikProvider>
    </>
  );
}
