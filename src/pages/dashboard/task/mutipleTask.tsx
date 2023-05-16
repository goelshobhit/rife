import { useEffect, useState } from 'react';
import { styled } from '@material-ui/core/styles';
// lodash
import get from 'lodash/get';
import { includes, isEqual, isEmpty } from 'lodash';
import { Container, Stepper, Step, StepLabel, Box, Typography } from '@material-ui/core';
import * as Yup from 'yup';
// components
import Page from '../../../components/Page';
// hooks
import useSettings from '../../../hooks/useSettings';
// ------------------------------------------------------------------------------
import { taskSteps, taskForm } from '../../../constants/questions';
import { GeneralForm } from '../../../components/dynamic/form/task/generalForm';
import { DynamicFormTypeWatchCampaign } from '../../../components/dynamic/form/task/Type&QuestionWatchCampaign';
import { DynamicFormForAuidence } from '../../../components/dynamic/form/task/Type&Auidence';
import { getItem } from '../../../utils/storage';
import TaskBrand from './multipleTask/brands';

const RootStyle = styled(Page)(({ theme }) => ({
  paddingTop: theme.spacing(0),
  marginTop: theme.spacing(0),
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(0)
  },
  button: {
    marginRight: theme.spacing(1)
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  }
}));

const InstructionStyle = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(5),
  marginBottom: 32
}));

const H1Style = styled('h1')(() => ({
  marginBottom: 12
}));
const HeadingStyle = styled(Typography)(() => ({
  paddingBottom: 14
}));
// ----------------------------------------------------------------------

function getSteps() {
  return taskSteps;
}

export default function MultipleTask() {
  const { themeStretch } = useSettings();
  const [activeStep, setActiveStep] = useState(0);
  const [selectedBrand, setSelectedBrand] = useState({});
  const [formData, setFormData] = useState({});
  const [auidenceFormData, setAuidenceFormData] = useState({});
  const [showSteps, setShowSteps] = useState(false);
  const [heading, setHeading] = useState('Create Task');
  const steps = getSteps();
  console.log(heading);

  useEffect(() => {
    setHeading(get(formData, 'task_type'));
  }, [formData]);

  const handleNext = (data: any) => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setFormData(data);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleNextAuidenceData = (data: any) => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setAuidenceFormData(data);
  };

  const handleSaveNext = (data: any) => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    // const payloadFeData = { ...data, select_brand_id: get(selectedBrand, 'cr_co_id', 0) };
    // setItem('task_form_1', payloadFeData);
    // const findIdOfTaskType = ['Video', 'Image', 'Sound', 'Video Response', 'Caption this'].indexOf(
    //   get(data, 'task_type')
    // );
    // const payloadSaveData = { ...data, task_type_id: findIdOfTaskType };
    // setItem('task_form_2', payloadSaveData);
    setAuidenceFormData(data);
  };

  const handleShowSteps = () => setShowSteps(true);
  const handleSetSelectBrand = (data: any) => setSelectedBrand(data);
  const handleSetHeading = (data: any) => setHeading(data);

  const RenderSecondForm = () => {
    if (isEqual('Watch', get(formData, 'task_type', ''))) {
      const initialValues = {
        task_name: '',
        limit_redemption: '',
        audience: ''
      };

      const validationSchema = Yup.object().shape({
        task_name: Yup.string().min(3, 'Min length should be 4 ').required('Required'),
        limit_redemption: Yup.string().min(0, 'Min length should be 4 ').required('Required'),
        audience: Yup.string().required('Required')
      });

      return (
        <DynamicFormTypeWatchCampaign
          initialValues={initialValues}
          validationSchema={validationSchema}
          fieldJson={taskForm.TASK_SECOND_WATCH_FORM}
          disabled={false}
          handleSetHeading={handleSetHeading}
          activeStep={activeStep}
          handleBack={handleBack}
          handleSaveNext={handleSaveNext}
        />
      );
    }

    if (isEqual('Question', get(formData, 'task_type', ''))) {
      const initialValues = {
        task_name: '',
        audience: '',
        percentage_color: ''
      };

      const validationSchema = Yup.object().shape({
        task_name: Yup.string().min(3, 'Min length should be 4 ').required('Required'),
        audience: Yup.string().required('Required'),
        percentage_color: Yup.string().required('Required')
      });

      return (
        <DynamicFormTypeWatchCampaign
          initialValues={initialValues}
          validationSchema={validationSchema}
          fieldJson={taskForm.TASK_SECOND_QUESTION_FORM}
          disabled={false}
          handleSetHeading={handleSetHeading}
          activeStep={activeStep}
          handleBack={handleBack}
          handleSaveNext={handleSaveNext}
        />
      );
    }

    if (isEqual('Task', get(formData, 'task_type', ''))) {
      const initialValues = {
        task_name: '',
        auidence: '',
        energy_cost_per_user: ''
      };

      const validationSchema = Yup.object().shape({
        task_name: Yup.string().min(3, 'Min length should be 4 ').required('Required'),
        audience: Yup.string().required('Required'),
        energy_cost_per_user: Yup.string().min(0).required('Required')
      });
      return (
        <DynamicFormForAuidence
          initialValues={initialValues}
          validationSchema={validationSchema}
          fieldJson={taskForm.TASK_SECOND_CONTEST_FORM}
          disabled={false}
          handleSetHeading={handleSetHeading}
          activeStep={activeStep}
          handleBack={handleBack}
          handleSaveNext={handleSaveNext}
        />
      );
    }

    if (isEqual('Contest', get(formData, 'task_type', ''))) {
      const initialValues = {
        task_name: '',
        task_type: '',
        audience: '',
        energy_cost_per_user: ''
      };

      const validationSchema = Yup.object().shape({
        task_name: Yup.string().min(3, 'Min length should be 4 ').required('Required'),
        task_type: Yup.string().required('Required'),
        audience: Yup.string().required('Required'),
        energy_cost_per_user: Yup.string().min(0).required('Required')
      });

      return (
        <DynamicFormTypeWatchCampaign
          initialValues={initialValues}
          validationSchema={validationSchema}
          fieldJson={taskForm.TASK_SECOND_CONTEST_FORM}
          disabled={false}
          handleSetHeading={handleSetHeading}
          activeStep={activeStep}
          handleBack={handleBack}
          handleSaveNext={handleSaveNext}
        />
      );
    }

    return <div />;
  };

  const handleRenderThirdTypeForm = (params1: any) => {
    const type1 = ['Public'];
    const type2 = ['Tier Two', 'Tier Three'];

    if (includes(type2, params1.audience) && isEqual('Sound', params1.task_type)) {
      return taskForm.TASK_THIRD_NO_TIER_SOUND_FORM;
    }
    if (includes(type2, params1.audience) && isEqual('Caption this', params1.task_type)) {
      return taskForm.TASK_THIRD_NO_TIER_CAPTION_THIS_FORM;
    }
    if (includes(type2, params1.audience) && isEqual('Video Response', params1.task_type)) {
      return taskForm.TASK_THIRD_NO_TIER_VIDEO_RESPONSE_FORM;
    }
    if (includes(type2, params1.audience) && isEqual('Image', params1.task_type)) {
      return taskForm.TASK_THIRD_NO_TIER_IMAGE_FORM;
    }
    if (includes(type2, params1.audience) && isEqual('Video', params1.task_type)) {
      return taskForm.TASK_THIRD_NO_TIER_VIDEO_FORM;
    }

    if (includes(type1, params1.audience) && isEqual('Sound', params1.task_type)) {
      return taskForm.TASK_THIRD_NO_PUBLIC_SOUND_FORM;
    }
    if (includes(type1, params1.audience) && isEqual('Caption this', params1.task_type)) {
      return taskForm.TASK_THIRD_NO_PUBLIC_CAPTION_THIS_FORM;
    }
    if (includes(type1, params1.audience) && isEqual('Video Response', params1.task_type)) {
      return taskForm.TASK_THIRD_NO_PUBLIC_VIDEO_RESPONSE_FORM;
    }
    if (includes(type1, params1.audience) && isEqual('Image', params1.task_type)) {
      return taskForm.TASK_THIRD_NO_PUBLIC_IMAGE_FORM;
    }
    if (includes(type1, params1.audience) && isEqual('Video', params1.task_type)) {
      return taskForm.TASK_THIRD_NO_PUBLIC_VIDEO_FORM;
    }

    return {};
  };

  const handleRenderThirdTypeContestForm = (params1: any) => {
    if (isEqual('Sound', params1.task_type)) {
      return taskForm.CONTEST_THIRD_NO_PUBLIC_SOUND_FORM;
    }
    if (isEqual('Caption this', params1.task_type)) {
      return taskForm.CONTEST_THIRD_NO_PUBLIC_CAPTION_THIS_FORM;
    }
    if (isEqual('Video Response', params1.task_type)) {
      return taskForm.CONTEST_THIRD_NO_PUBLIC_VIDEO_RESPONSE_FORM;
    }
    if (isEqual('Image', params1.task_type)) {
      return taskForm.CONTEST_THIRD_NO_PUBLIC_IMAGE_FORM;
    }
    if (isEqual('Video', params1.task_type)) {
      return taskForm.CONTEST_THIRD_NO_PUBLIC_VIDEO_FORM;
    }

    return {};
  };

  const handleRenderThirdTypeBonusForm = (params1: any) => {
    if (isEqual('Sound', params1.task_type)) {
      return taskForm.BONUS_THIRD_NO_PUBLIC_SOUND_FORM;
    }
    if (isEqual('Caption this', params1.task_type)) {
      return taskForm.BONUS_THIRD_NO_PUBLIC_CAPTION_THIS_FORM;
    }
    if (isEqual('Video Response', params1.task_type)) {
      return taskForm.BONUS_THIRD_NO_PUBLIC_VIDEO_RESPONSE_FORM;
    }
    if (isEqual('Image', params1.task_type)) {
      return taskForm.BONUS_THIRD_NO_PUBLIC_IMAGE_FORM;
    }
    if (isEqual('Video', params1.task_type)) {
      return taskForm.BONUS_THIRD_NO_PUBLIC_VIDEO_FORM;
    }

    return {};
  };

  const RenderThirdForm = () => {
    if (isEqual('Bonus prize winner', get(auidenceFormData, 'audience', ''))) {
      return (
        <GeneralForm
          fieldJson={handleRenderThirdTypeBonusForm(auidenceFormData)}
          disabled={false}
          selectedBrand={selectedBrand}
          handleSetHeading={handleSetHeading}
          formData={{}}
          activeStep={activeStep}
          handleNext={handleNextAuidenceData}
          handleBack={handleBack}
          auidenceFormData={auidenceFormData}
          handleSaveNext={handleSaveNext}
        />
      );
    }

    if (isEqual('Watch', get(formData, 'task_type', ''))) {
      return (
        <GeneralForm
          fieldJson={taskForm.TASK_THIRD_WATCH_FORM}
          disabled={false}
          selectedBrand={selectedBrand}
          handleSetHeading={handleSetHeading}
          formData={{}}
          activeStep={activeStep}
          handleNext={handleNextAuidenceData}
          handleBack={handleBack}
          auidenceFormData={auidenceFormData}
          handleSaveNext={handleSaveNext}
        />
      );
    }

    if (isEqual('Contest', get(formData, 'task_type', ''))) {
      return (
        <GeneralForm
          fieldJson={handleRenderThirdTypeContestForm(auidenceFormData)}
          disabled={false}
          selectedBrand={selectedBrand}
          handleSetHeading={handleSetHeading}
          formData={{}}
          activeStep={activeStep}
          handleNext={handleNextAuidenceData}
          handleBack={handleBack}
          auidenceFormData={auidenceFormData}
          handleSaveNext={handleSaveNext}
        />
      );
    }

    if (isEqual('Question', get(formData, 'task_type', ''))) {
      return (
        <GeneralForm
          fieldJson={taskForm.TASK_THIRD_QUESTION_FORM}
          disabled={false}
          selectedBrand={selectedBrand}
          handleSetHeading={handleSetHeading}
          formData={{}}
          activeStep={activeStep}
          handleNext={handleNextAuidenceData}
          handleBack={handleBack}
          auidenceFormData={{}}
          handleSaveNext={handleSaveNext}
        />
      );
    }

    if (isEqual('Task', get(formData, 'task_type', ''))) {
      return (
        <GeneralForm
          fieldJson={handleRenderThirdTypeForm(auidenceFormData)}
          disabled={false}
          selectedBrand={selectedBrand}
          handleSetHeading={handleSetHeading}
          formData={{}}
          activeStep={activeStep}
          handleNext={handleNextAuidenceData}
          handleBack={handleBack}
          auidenceFormData={auidenceFormData}
          handleSaveNext={handleSaveNext}
        />
      );
    }

    return <div />;
  };

  function getStepContent(step: any) {
    switch (step) {
      case 0:
        return (
          <TaskBrand
            handleNext={handleNext}
            handleShowSteps={handleShowSteps}
            handleSetSelectBrand={handleSetSelectBrand}
          />
        );
      case 1:
        return <RenderSecondForm />;
      case 2:
        return <RenderThirdForm />;
      default:
        handleBack();
        return 'Unknown step';
    }
  }

  return (
    <RootStyle title="Task | Watch | Riddim">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        {showSteps && (
          <>
            <H1Style>{getItem('task_type_heading')}</H1Style>
            {!isEmpty(get(auidenceFormData, 'task_type')) &&
              !isEmpty(get(auidenceFormData, 'audience')) && (
                <HeadingStyle gutterBottom variant="subtitle1">
                  Task Type - {get(auidenceFormData, 'task_type')} & Auidence Type -{' '}
                  {get(auidenceFormData, 'audience', '')}
                </HeadingStyle>
              )}
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map((label) => {
                const stepProps: { completed?: boolean } = {};
                const labelProps: {
                  optional?: React.ReactNode;
                } = {};
                return (
                  <Step key={label} {...stepProps}>
                    <StepLabel {...labelProps}>{label}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>
          </>
        )}
        <div>
          <InstructionStyle>{getStepContent(activeStep)}</InstructionStyle>
        </div>
      </Container>
    </RootStyle>
  );
}
