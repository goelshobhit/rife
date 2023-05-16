import { useCallback } from 'react';
import { useFormik, Form, FormikProvider, FieldArray } from 'formik';
import { useSnackbar } from 'notistack5';
import { Icon } from '@iconify/react';
import closeFill from '@iconify/icons-eva/close-fill';
// map
import get from 'lodash/get';
import map from 'lodash/map';
import size from 'lodash/size';
import includes from 'lodash/includes';
import { isEmpty, isEqual } from 'lodash';

// material
import { Stack, Card, Typography, Grid, TextField, Button } from '@material-ui/core';
// material
import { styled } from '@material-ui/core/styles';
// redux
// dynamic fields
import { getDynamicFields } from '../dynamicFields';

import RenderTaskTypeUpload from './renderTaskTypeUpload';
import RewardsSection from '../../components/RewardsSection';
import BonusSection from '../../components/BonusSection';
import BrandBonusSection from '../../components/BrandBonusSection';
import { CaptainSection } from '../../components/CaptainSection';

import { useDispatch } from '../../../../redux/store';
import { createBrandTask } from '../../../../redux/slices/tasks';

import { DynamicQuestionsAndAnswers } from '../question/dynamicQuestionsAndAnswers';
import { MIconButton } from '../../../@material-extend';
import { getItem, removeItem } from '../../../../utils/storage';

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
  selectedBrand: any;
  handleSetHeading: any;
  formData: any;
  activeStep: any;
  handleNext: any;
  handleBack: any;
  auidenceFormData: any;
  handleSaveNext: any;
};

interface InitialValues {
  task_type: string;
  task_name: string;
  audience: string;
  energy_cost_per_user: string;
  questionsAndAnswers: Array<any>;
  captionQuestions: Array<any>;
  star_per_user: any;
  description: any;
  add_tokens_per_user: any;
  'Limit Redemptions': any;
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

const NextButtonStyle1 = styled(Button)(() => ({
  borderColor: 'inherit',
  borderRadius: 23,
  padding: '6px 16px 6px 16px',
  border: '2px solid',
  fontWeight: 700,
  fontSize: 14,
  height: 36,
  color: 'white'
}));

export function GeneralForm({
  fieldJson,
  disabled,
  selectedBrand,
  handleSetHeading,
  handleNext,
  handleBack,
  activeStep,
  auidenceFormData,
  handleSaveNext
}: Props) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const dispatch = useDispatch();

  const formInitialValues1 = getItem('task_form_1');
  const formInitialValues2 = getItem('task_form_2');

  const formik = useFormik<InitialValues>({
    initialValues: {
      task_type: get(formInitialValues2, 'task_type', ''),
      task_name: get(formInitialValues2, 'task_name', ''),
      audience: get(formInitialValues2, 'auidence', ''),
      'Limit Redemptions': get(formInitialValues2, 'Limit Redemptions', ''),
      star_per_user: get(formInitialValues2, 'star_per_user', ''),
      description: get(formInitialValues2, 'description', ''),
      add_tokens_per_user: get(formInitialValues2, 'add_tokens_per_user', ''),
      energy_cost_per_user: get(formInitialValues2, 'energy_cost_per_user', ''),
      questionsAndAnswers: [
        { 'Survey Question': ' ', 'Question Status': 0, 'Question Answers': new Array(2).fill(' ') }
      ],
      captionQuestions: [{ caption_question: '' }]
    },
    onSubmit: async (values) => {
      try {
        const payload = {
          ...values,
          ...auidenceFormData,
          'Task name': get(formInitialValues2, 'task_name', ''),
          'Task type': get(formInitialValues2, 'task_type_id', 1),
          'Task Status': 0,
          'Brand Id': get(formInitialValues1, 'select_brand_id', '')
        };
        dispatch(createBrandTask(payload));
        enqueueSnackbar('Task has been created', {
          variant: 'success',
          action: (key) => (
            <MIconButton size="small" onClick={() => closeSnackbar(key)}>
              <Icon icon={closeFill} />
            </MIconButton>
          )
        });
        removeItem('task_form_1');
        removeItem('task_form_2');
      } catch (error) {
        enqueueSnackbar('Error', {
          variant: 'error',
          action: (key) => (
            <MIconButton size="small" onClick={() => closeSnackbar(key)}>
              <Icon icon={closeFill} />
            </MIconButton>
          )
        });
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

  const EndDateDisabledStyle = styled(TextField)(() => ({
    transform: 'translate(20px, 38px)',
    width: '48%'
  }));

  // console.log(values);
  // console.log(formData);

  return (
    <>
      <FormikProvider value={formik}>
        <Form autoComplete="off">
          {map(fieldJson, ({ heading, fields }: any, index: any) => {
            if (includes(['Task Type'], heading)) {
              return (
                <SectionStyle style={{ width: '100%' }}>
                  <RenderTaskTypeUpload
                    task={get(auidenceFormData, 'task_type')}
                    formik={formik}
                    audienceTaskType={get(auidenceFormData, 'audience', '')}
                  />
                </SectionStyle>
              );
            }

            if (includes(['questions'], heading)) {
              return (
                <SectionStyle key={index}>
                  <HeadingStyle gutterBottom variant="h4">
                    {heading} {renderTaskName(heading, handleSetHeading)}
                  </HeadingStyle>

                  <Stack spacing={3}>
                    <Grid container spacing={3}>
                      {map(fields, (item: any) => (
                        <FieldArray
                          validateOnChange
                          name="questionsAndAnswers"
                          render={(arrayProps) => (
                            <DynamicQuestionsAndAnswers
                              {...item}
                              {...arrayProps}
                              disabled={disabled}
                              errors={errors}
                            />
                          )}
                        />
                      ))}
                    </Grid>
                  </Stack>
                </SectionStyle>
              );
            }
            if (includes(['Rewards'], heading)) {
              return (
                <SectionStyle key={index}>
                  <HeadingStyle gutterBottom variant="h4">
                    {heading} {renderTaskName(heading, handleSetHeading)}
                  </HeadingStyle>
                  {map(fields, (item: any) => {
                    return (
                      <RewardsSection
                        selectedBrand={selectedBrand}
                        touched={touched}
                        errors={errors}
                        handleChange={handleChange}
                        values={values}
                        setFieldValue={setFieldValue}
                        isWatchType={item.isWatchType}
                        isContestType={item.isContestType}
                        isStarType={item.isStarType}
                        isAll={item.isAll}
                        item={item}
                      />
                    );
                  })}
                </SectionStyle>
              );
            }
            if (includes(['Brand Bonus Prize'], heading)) {
              return (
                <SectionStyle key={index}>
                  <HeadingStyle gutterBottom variant="h4">
                    {heading} {renderTaskName(heading, handleSetHeading)}
                  </HeadingStyle>

                  <BrandBonusSection
                    touched={touched}
                    errors={errors}
                    handleChange={handleChange}
                    values={values}
                    setFieldValue={setFieldValue}
                    handleDrop={handleDrop}
                  />
                </SectionStyle>
              );
            }

            if (includes(['Bonus Prize'], heading)) {
              return (
                <SectionStyle key={index}>
                  <HeadingStyle gutterBottom variant="h4">
                    {heading} {renderTaskName(heading, handleSetHeading)}
                  </HeadingStyle>

                  {map(fields, (item: any) => {
                    return (
                      <BonusSection
                        selectedBrand={selectedBrand}
                        touched={touched}
                        errors={errors}
                        handleChange={handleChange}
                        values={values}
                        setFieldValue={setFieldValue}
                      />
                    );
                  })}
                </SectionStyle>
              );
            }

            if (includes(['User Requirements'], heading)) {
              return (
                <SectionStyle key={index}>
                  <HeadingStyle gutterBottom variant="h4">
                    {heading} {renderTaskName(heading, handleSetHeading)}
                  </HeadingStyle>
                  {map(fields, (item: any) => {
                    return (
                      <CaptainSection
                        sel
                        ectedBrand={selectedBrand}
                        touched={touched}
                        errors={errors}
                        handleChange={handleChange}
                        values={values}
                        setFieldValue={setFieldValue}
                        isCaption={item.isCaption}
                        isPhoto={item.isPhoto}
                        isVideo={item.isVideo}
                      />
                    );
                  })}
                </SectionStyle>
              );
            }

            if (includes(['Schedule'], heading)) {
              return (
                <SectionStyle key={index}>
                  <HeadingStyle gutterBottom variant="h4">
                    {heading}
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

                        if (
                          includes(['End Date'], item.label) &&
                          !isEqual(get(values, 'Schedule', false), true)
                        ) {
                          return (
                            <EndDateDisabledStyle
                              disabled
                              value="Not Mandatory"
                              type="text"
                              label="End Date"
                            />
                          );
                        }
                        return (
                          <Grid item xs={size(fields) > 1 ? 6 : 12}>
                            {getDynamicFields(fieldProps, disabled)}
                          </Grid>
                        );
                      })}
                    </Grid>
                  </Stack>
                </SectionStyle>
              );
            }
            return (
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
            );
          })}
          <RowStyle>
            <NextButtonStyle disabled={activeStep === 0} onClick={handleBack} className="button">
              Back
            </NextButtonStyle>
            <NextButtonStyle
              className="button"
              type="submit"
              onClick={() => handleSaveNext(values)}
              disabled={!isEmpty(errors)}
            >
              Save
            </NextButtonStyle>

            {activeStep === 1 && (
              <NextButtonStyle1
                variant="contained"
                color="primary"
                className="button"
                type="submit"
                onClick={() => handleNext(values)}
                disabled={!isEmpty(errors)}
              >
                Next
              </NextButtonStyle1>
            )}

            {activeStep === 2 && (
              <NextButtonStyle1
                variant="contained"
                color="primary"
                className="button"
                type="submit"
              >
                Complete Setup
              </NextButtonStyle1>
            )}
          </RowStyle>
        </Form>
      </FormikProvider>
    </>
  );
}
