import { useState, useEffect } from 'react';
// material
import { Icon } from '@iconify/react';
import closeFill from '@iconify/icons-eva/close-fill';
import { useSnackbar } from 'notistack5';
import * as Yup from 'yup';
import get from 'lodash/get';
import { styled } from '@material-ui/core/styles';
import { Container, Typography, Stepper, Step, StepLabel, Button, Box } from '@material-ui/core';
import { useFormik, Form, FormikProvider } from 'formik';
// components
import Page from '../../../components/Page';
// hooks
import useSettings from '../../../hooks/useSettings';
// ------------------------------------------------------------------------------
import { questionSteps, questionCampaignForm } from '../../../constants/questions';
import { DynamicForm } from '../../../components/dynamic/form/question/questionForm';
// redux
import { useDispatch, useSelector } from '../../../redux/store';
import { getAllBrands, createSurvey } from '../../../redux/slices/question';

// @types
import { taskQuestionState } from '../../../@types/question';
import { MIconButton } from '../../../components/@material-extend';

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
  return questionSteps;
}

function getStepContent(step: any, formik: any,  brands: any) {
  switch (step) {
    case 0:
      return <DynamicForm fieldJson={questionCampaignForm} disabled={false} formik={formik} step={step}  brands={brands} />;
    case 1:
      return <DynamicForm fieldJson={questionCampaignForm} disabled={true} formik={formik} step={step} />;
    default:
      return 'Unknown step';
  }
}

export default function CreateTaskQuestion() {

  const dispatch = useDispatch();
  const { brandPageNo, brands, hasMoreBrands } = useSelector(
    (state: { task: taskQuestionState }) => state.task
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

  const { themeStretch } = useSettings();
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const steps = getSteps();

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
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const LoginSchema = Yup.object().shape({});
  const formik = useFormik<InitialValues>({
    initialValues: {
      questionsAndAnswers: [{ 'Survey Question': ' ',  "Question Status": 0,'Question Answers': new Array(2).fill(' ') }]
    },
    validationSchema: LoginSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const payload = { ...values, 'Survey Questions': get(values,'questionsAndAnswers',[]) }
        dispatch(createSurvey(payload));
        enqueueSnackbar('Task Question has been created', {
          variant: 'success',
          action: (key) => (
            <MIconButton size="small" onClick={() => closeSnackbar(key)}>
              <Icon icon={closeFill} />
            </MIconButton>
          )
        });
      } catch (error) {
        resetForm();
      }
    }
  });

  const handleFinish = () => {
    formik.resetForm({ values: { } })
    handleReset();
  };

  return (
    <RootStyle title="Task | Questions | Riddim">
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
              <InstructionStyle>{getStepContent(activeStep, formik, brands)}</InstructionStyle>
              <RowStyle>
                <NextButtonStyle disabled={activeStep === 0} onClick={handleBack} className="button">
                  Back
                </NextButtonStyle>
                {activeStep === 0 ? (
                  <NextButtonStyle
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className="button"
                  >
                    Finish
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
