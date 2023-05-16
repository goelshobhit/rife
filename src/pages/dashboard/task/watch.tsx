// material
import * as Yup from 'yup';
import { useState } from 'react';
import { styled } from '@material-ui/core/styles';
import { Container, Typography, Stepper, Step, StepLabel, Button, Box } from '@material-ui/core';
import { useFormik, Form, FormikProvider } from 'formik';
// components
import Page from '../../../components/Page';
// hooks
import useSettings from '../../../hooks/useSettings';
// ------------------------------------------------------------------------------
import { watchSteps, watchCampaignForm, watchCampaignSecondForm } from '../../../constants/questions';
import { DynamicForm } from '../../../components/dynamic/form/question/questionForm';

interface InitialValues {}

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
  marginBottom: theme.spacing(5)
}));

const RowStyle = styled('div')(({ theme }) => ({
  display:"flex",
  flexDirection:'row',
  justifyContent:'flex-end',
}));

const NextButtonStyle = styled(Button)(({ theme }) => ({
  border: `1px solid`,
  borderColor: 'inherit',
  borderRadius: 23,
padding: '6px 16px 6px 16px',

}));

// ----------------------------------------------------------------------

function getSteps() {
  return watchSteps;
}

function getStepContent(step: any, formik: any) {
  switch (step) {
    case 0:
      return <DynamicForm fieldJson={watchCampaignForm} disabled={false} formik={formik} />;
    case 1:
      return <DynamicForm fieldJson={watchCampaignSecondForm} disabled={false} formik={formik} />;
    case 2:
      return <DynamicForm fieldJson={watchCampaignSecondForm} disabled={true} formik={formik} />;
    default:
      return 'Unknown step';
  }
}

export default function CreateTaskQuestion() {
  const { themeStretch } = useSettings();
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const steps = getSteps();

  const handleFinish = () => {
    // console.log('this is handle finish');
    handleReset();
  };

  const isStepOptional = (step: any) => step === 10;

  const isStepSkipped = (step: any) => skipped.has(step);

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const LoginSchema = Yup.object().shape({});
  const formik = useFormik<InitialValues>({
    initialValues: {
      remember: true,
      questionsAndAnswers: [{ question: ' ', answers: new Array(2).fill(' ') }]
    },
    validationSchema: LoginSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        // console.log(values);
      } catch (error) {
        resetForm();
      }
    }
  });

  return (
    <RootStyle title="Task | Watch | Riddim">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label, index) => {
            const stepProps: { completed?: boolean } = {};
            const labelProps: { optional?: React.ReactNode } = {};
            if (isStepOptional(index)) {
              labelProps.optional = <Typography variant="caption">Optional</Typography>;
            }
            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        <div>
          <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate>
              <InstructionStyle>{getStepContent(activeStep, formik)}</InstructionStyle>
              <RowStyle>
                <NextButtonStyle disabled={activeStep === 0} onClick={handleBack} className="button">
                  Back
                </NextButtonStyle>
                {isStepOptional(activeStep) && (
                  <NextButtonStyle
                    variant="contained"
                    color="primary"
                    onClick={handleSkip}
                    className="button"
                  >
                    Skip
                  </NextButtonStyle>
                )}

                {activeStep !== 2 ? (
                  <NextButtonStyle
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className="button"
                  >
                    Next
                  </NextButtonStyle>
                ) : (
                  <NextButtonStyle
                    variant="contained"
                    color="primary"
                    onClick={handleFinish}
                    className="button"
                    type="submit"
                  >
                    Finish
                  </NextButtonStyle>
                )}
              </RowStyle>
            </Form>
          </FormikProvider>
        </div>
      </Container>
    </RootStyle>
  );
}
