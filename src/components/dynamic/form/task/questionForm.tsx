import { useCallback } from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
import * as Yup from 'yup';
import { Icon } from '@iconify/react';
import closeFill from '@iconify/icons-eva/close-fill';
import { useSnackbar } from 'notistack5';
// map
import map from 'lodash/map';
import size from 'lodash/size';
import includes from 'lodash/includes';
import isEqual from 'lodash/isEqual';
import get from 'lodash/get';
import { isEmpty } from 'lodash';

// material
import { Stack, Card, Typography, Grid, TextField, Button } from '@material-ui/core';
// material
import { styled } from '@material-ui/core/styles';
// redux
import { useDispatch } from '../../../../redux/store';
import { createBrandTask } from '../../../../redux/slices/tasks';
// dynamic fields
import { getDynamicFields } from '../dynamicFields';
import RenderTaskTypeUpload from './renderTaskTypeUpload';
import RewardsSection from '../../components/RewardsSection';
import BonusSection from '../../components/BonusSection';
import { CaptainSection } from '../../components/CaptainSection';
import { MIconButton } from '../../../@material-extend';

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

const EndDateDisabledStyle = styled(TextField)(() => ({
  transform: 'translate(20px, 38px)',
  width: '48%'
}));

type Props = {
  fieldJson: any;
  disabled: boolean;
  selectedBrand: any;
  handleSetHeading: any;
  formData: any;
  activeStep: any;
  handleBack: any;
  handleNext: any;
  auidenceFormData: any;
};

interface InitialValues {
  task_type: string;
  task_name: string;
  audience: string;
  energy_cost_per_user: string;
  star_per_user: string;
  add_tokens_per_user: string;
  total_token_budget: string;
  token_per_user: string;
  bonus_set: string;
  select_bonus_set: string;
  tickets_per_entry: string;
  caption_question: string;
  No_of_photos_required: string;
  No_of_videos_required: string;
  hashtags: string;
  Schedule: string;
  start_date: any;
  end_date: any;
  voting_start_date: any;
  voting_end_date: any;
  winner_announcement_date_and_time: any;
  bonus: Array<any>;
  captionQuestions: Array<any>;
}

const RowStyle = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-end'
}));

const NextButtonStyle = styled(Button)(() => ({
  border: `1px solid`,
  borderColor: 'inherit',
  borderRadius: 23,
  padding: '6px 16px 6px 16px'
}));

const TaskValidationSchema = Yup.object().shape({
  task_type: Yup.string().required('Required'),
  task_name: Yup.string().required('Required'),
  audience: Yup.string().required('Required').optional(),
  energy_cost_per_user: Yup.string().required('Required').optional(),
  star_per_user: Yup.string().required('Required').optional(),
  add_tokens_per_user: Yup.string().required('Required').optional(),
  reward_type: Yup.string().required('Required').optional(),
  bonus_set: Yup.string().required('Required').optional(),
  select_bonus_set: Yup.string().required('Required').optional(),
  tickets_per_entry: Yup.string().required('Required').optional(),
  caption_question: Yup.string().required('Required').optional(),
  No_of_photos_required: Yup.string().required('Required').optional(),
  No_of_videos_required: Yup.string().required('Required').optional(),
  Schedule: Yup.string().required('Required').optional(),
  start_date: Yup.string().required('Required').optional(),
  end_date: Yup.string().required('Required').optional(),
  voting_start_date: Yup.string().required('Required').optional(),
  voting_end_date: Yup.string().required('Required').optional(),
  winner_announcement_date_and_time: Yup.string().required('Required')
});

export function DynamicForm({
  fieldJson,
  disabled,
  selectedBrand,
  handleSetHeading,
  formData,
  activeStep,
  handleNext,
  handleBack,
  auidenceFormData,
}: Props) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const formik = useFormik<InitialValues>({
    initialValues: {
      task_type: '',
      task_name: '',
      audience: '',
      energy_cost_per_user: '',
      star_per_user: '',
      add_tokens_per_user: '',
      total_token_budget: '',
      token_per_user: '',
      bonus_set: '',
      select_bonus_set: '',
      tickets_per_entry: '',
      caption_question: '',
      No_of_photos_required: '',
      No_of_videos_required: '',
      hashtags: '',
      Schedule: '',
      start_date: new Date(),
      end_date: new Date(),
      voting_start_date: new Date(),
      voting_end_date: new Date(),
      winner_announcement_date_and_time: new Date(),
      bonus: [{ bonus_name: '', bonus_set: '', ticket_per_entry: '' }],
      captionQuestions: [{ caption_question:''}]
    },
    validationSchema: TaskValidationSchema,
    onSubmit: async (values, { resetForm }: any) => {
      try {
        const payload = {
          ...values,
          ...auidenceFormData,
          'Task name': values.task_name,
          'Task type': values.task_type,
          'Task Status': 0,
          'Brand Id': selectedBrand.cr_co_id
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
    if (get(values,'task_type') && includes(['Task Type'], heading)) {
      handleSetHeading(`Task Type - ${get(values,'task_type')}`);
      return `- ${get(values,'task_type')}`;
    }
    if (isEmpty(get(values,'task_type'))) {
      handleSetHeading(`Create Task`);
    }
    return false;
  };

  return (
    <>
      <FormikProvider value={formik}>
        <Form autoComplete="off">
          {map(fieldJson, ({ heading, fields }, index) => {
            if (
              includes(['Voting Dates'], heading) &&
              includes(
                ['Image contest', 'Sound Contest (In App will display as video)'],
                get(auidenceFormData, 'task_type')
              )
            ) {
              return (
                <SectionStyle key={index}>
                  <HeadingStyle gutterBottom variant="h4">
                    Voting Dates
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
                          <Grid item xs={6}>
                            {getDynamicFields(fieldProps, disabled)}
                          </Grid>
                        );
                      })}
                    </Grid>
                  </Stack>
                </SectionStyle>
              );
            }
            if (includes(['Task Details'], heading)) {
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
            }

            if (includes(['Task Type'], heading)) {
              console.log(heading);
              return (
                <SectionStyle style={{ width: '100%' }}>
                  <HeadingStyle gutterBottom variant="h4">
                    {heading} {renderTaskName(heading, handleSetHeading)}
                  </HeadingStyle>
                  <RenderTaskTypeUpload task={get(auidenceFormData, 'task_type')} formik={formik}  audienceTaskType={get(auidenceFormData, 'audience', '')} />
                </SectionStyle>
              );
            }

            if (
              includes(['Rewards'], heading) &&
              includes(
                [
                  'Sound (In App will display as video)',
                  'Sound Contest (In App will display as video)',
                  'Video Response',
                  'Caption this'
                ],
                get(auidenceFormData, 'task_type')
              )
            ) {
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
                          <RewardsSection
                            selectedBrand={selectedBrand}
                            touched={touched}
                            errors={errors}
                            handleChange={handleChange}
                            values={values}
                            setFieldValue={setFieldValue}
                          />
                        );
                      })}
                    </Grid>
                  </Stack>
                </SectionStyle>
              );
            }

            if (
              includes(['Rewards'], heading)
            ) {
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
                          <RewardsSection
                            selectedBrand={selectedBrand}
                            touched={touched}
                            errors={errors}
                            handleChange={handleChange}
                            values={values}
                            setFieldValue={setFieldValue}
                          />
                        );
                      })}
                    </Grid>
                  </Stack>
                </SectionStyle>
              );
            }

            if (
              includes(['Details'], heading) &&
              !includes(
                [
                  'Video Response'
                ],
                get(auidenceFormData, 'task_type')
              ) 
            ) {
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

                        return (
                          <Grid item xs={12}>
                            {getDynamicFields(fieldProps, disabled)}
                          </Grid>
                        );
                      })}
                    </Grid>
                  </Stack>
                </SectionStyle>
              );
            }

            if (
              includes(['Bonus Prize'], heading) &&
              includes(
                [
                  'Sound (In App will display as video)',
                  'Sound Contest (In App will display as video)',
                  'Video Response',
                  'Caption this'
                ],
                get(auidenceFormData, 'task_type')
              )
            ) {
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
                    </Grid>
                  </Stack>
                </SectionStyle>
              );
            }

            if (
              includes(['Schedule'], heading) &&
              includes(
                [
                  'Sound (In App will display as video)',
                  'Sound Contest (In App will display as video)',
                  'Video Response',
                  'Caption this'
                ],
                get(auidenceFormData, 'task_type')
              )
            ) {
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

            if (
              includes(['User Requirements - Question'], heading) &&
              includes(
                [
                  'Sound (In App will display as video)',
                  'Sound Contest (In App will display as video)',
                  'Video Response',
                  'Caption this'
                ],
                get(auidenceFormData, 'task_type')
              )
            ) {
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
                      <CaptainSection selectedBrand={selectedBrand}
                            touched={touched}
                            errors={errors}
                            handleChange={handleChange}
                            values={values}
                            setFieldValue={setFieldValue} />
                          </Grid>
                        );
                      })}
                    </Grid>
                  </Stack>
                </SectionStyle>
              );
            }

            if (
              includes(['User Requirements - Hashtag'], heading) &&
              includes(
                [
                  'Sound (In App will display as video)',
                  'Sound Contest (In App will display as video)',
                  'Video Response',
                  'Caption this'
                ],
                get(auidenceFormData, 'task_type')
              )
            ) {
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
            }

            if (
              includes(['User Requirements'], heading) &&
              includes(['Bonus prize winner'], get(values, 'audience'))
            ) {
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
            }

            if (
              includes(['User Requirements -Photos'], heading) &&
              includes(['Bonus prize winner'], get(values, 'audience'))
            ) {
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
            }

            if (
              includes(['User Requirements - Question'], heading) &&
              includes(['Bonus prize winner'], get(values, 'audience'))
            ) {
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
                            <CaptainSection selectedBrand={selectedBrand}
                            touched={touched}
                            errors={errors}
                            handleChange={handleChange}
                            values={values}
                            setFieldValue={setFieldValue}/>
                          </Grid>
                        );
                      })}
                    </Grid>
                  </Stack>
                </SectionStyle>
              );
            }

            if (
              includes(['User Requirements - Hashtag'], heading) &&
              includes(['Bonus prize winner'], get(values, 'audience'))
            ) {
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
            }

            if (
              includes(['Bonus Prize'], heading) &&
              includes(['Bonus prize winner'], get(values, 'audience'))
            ) {
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
                    </Grid>
                  </Stack>
                </SectionStyle>
              );
            }

            if (includes(['Audience'], heading)) {
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

            if (
              includes(['User Requirements -Photos'], heading) &&
              includes(
                [
                  'Sound (In App will display as video)',
                  'Sound Contest (In App will display as video)',
                  'Video Response',
                  'Caption this'
                ],
                get(auidenceFormData, 'task_type')
              )
            ) {
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
            }
            return <div />;
          })}
          <RowStyle>
          <NextButtonStyle disabled={activeStep === 0} onClick={handleBack} className="button">
                  Back
                </NextButtonStyle>
                <NextButtonStyle
                    variant="contained"
                    color="primary"
                    className="button"
                    type="submit"
                  >
                    Save
                  </NextButtonStyle>

                  <NextButtonStyle
                    variant="contained"
                    color="primary"
                    className="button"
                    type="submit"
                  >
                    Complete Setup
                  </NextButtonStyle>
          </RowStyle>
        </Form>
      </FormikProvider>
    </>
  );
}
