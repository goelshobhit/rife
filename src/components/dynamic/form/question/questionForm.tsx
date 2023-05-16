import { useCallback, useEffect } from 'react';
import { FieldArray } from 'formik';
// map
import map from 'lodash/map';
import size from 'lodash/size';
import includes from 'lodash/includes';
import isEqual from 'lodash/isEqual';
import get from 'lodash/get';
import find from 'lodash/find';
// material
import { Stack, Card, Typography, Grid, TextField } from '@material-ui/core';
// material
import { styled } from '@material-ui/core/styles';
// dynamic fields
import { getDynamicFields } from '../dynamicFields';
import { DynamicQuestionsAndAnswers } from './dynamicQuestionsAndAnswers';
import RewardsSection from '../../components/RewardsSection';

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
  formik: any;
  step?: number;
  brands?: [];
};
export function DynamicForm({ fieldJson, disabled, formik, step, brands }: Props) {
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

  return (
    <>
      {map(fieldJson, ({ heading, fields }, index) => (
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
                  handleDrop,
                  options: get(item, 'options', brands)
                };

                if (includes(['Rewards'], heading) && values['Brand ID']) {
                  if (
                    includes(['Total Token Budget', 'Tokens Per User'], item.label) &&
                    !isEqual(get(values, 'add_tokens_per_user', false), true)
                  ) {
                    return <div />;
                  }
                  return (
                    <RewardsSection
                      selectedBrand={find(brands, (item: any) =>item.cr_co_id ===  values['Brand ID'])}
                      touched={touched}
                      errors={errors}
                      handleChange={handleChange}
                      values={values}
                    />
                  );
                }

                if (includes(['questions'], heading)) {
                  return (
                    <FieldArray
                      validateOnChange
                      name="questionsAndAnswers"
                      render={(arrayProps) => (
                        <DynamicQuestionsAndAnswers {...item} {...arrayProps} disabled={disabled} />
                      )}
                    />
                  );
                }

                if (includes(['Schedule'], heading)) {
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
                }

                if (!includes(['Rewards', 'questions'], heading)) {
                  return (
                    <Grid item xs={size(fields) > 1 ? 6 : 12}>
                      {getDynamicFields(fieldProps, disabled)}
                    </Grid>
                  );
                }
                return <div />;
              })}
            </Grid>
          </Stack>
        </SectionStyle>
      ))}
    </>
  );
}
