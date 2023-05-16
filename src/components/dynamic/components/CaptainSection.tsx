import { Button, Divider, TextField, Grid } from '@material-ui/core';

import Chip from '@material-ui/core/Chip';
import Autocomplete from '@material-ui/lab/Autocomplete';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';

import { FieldArray } from 'formik';
import { styled } from '@material-ui/core/styles';
import map from 'lodash/map';
import size from 'lodash/size';
import isEmpty from 'lodash/isEmpty';
import { TrashIcon, AddIcon } from '../../../assets';

const SectionStyle = styled('div')(() => ({
  width: '100%',
  maxWidth: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end'
}));

const QuestionStyle = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  maxWidth: '100%'
}));

const DividerStyle = styled(Divider)(({ theme }) => ({
  gap: '10px',
  height: '1px',
  width: '100%',
  background: '#D8D8D8',
  borderRadius: theme.spacing(1),
  flexGrow: 0
}));

const RowStyle = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  margin: '16px 10px'
}));

const ButtonStyle = styled(Button)(() => ({
  transform: 'translateX(-10px)'
}));

const TextFieldStyle = styled(TextField)(() => ({
  div: {
    width: '100%',
    backgroundColor: '#fff'
  }
}));

export const CaptainSection = (props: any) => {
  const {
    values: { captionQuestions, no_of_photos, no_of_video },
    handleChange,
    touched,
    errors,
    setFieldValue,
    isCaption = false,
    isVideo = false,
    isPhoto = false
  } = props;

  return (
    <SectionStyle>
      <FieldArray
        name="captionQuestions"
        render={(arrayHelpers) => (
          <>
            {isCaption &&
              map(captionQuestions, (item: any, index: number) => (
                <div key={index} style={{ width: '100%' }}>
                  {index !== 0 && <DividerStyle />}
                  <RowStyle>
                    <QuestionStyle key={index}>
                      <TextFieldStyle
                        name={`captionQuestions.${index}.caption_question`}
                        fullWidth
                        label={`User Caption Question ${index + 1}`}
                        onChange={handleChange}
                        placeholder="Please write your questions here..."
                        InputLabelProps={{
                          shrink: true
                        }}
                      />
                      {index === size(captionQuestions) - 1 ? (
                        <ButtonStyle
                          variant="text"
                          onClick={() => {
                            arrayHelpers.insert(index, '');
                          }}
                        >
                          <AddIcon />
                        </ButtonStyle>
                      ) : (
                        <ButtonStyle
                          variant="text"
                          onClick={() => {
                            arrayHelpers.remove(index);
                          }}
                        >
                          <TrashIcon />
                        </ButtonStyle>
                      )}
                    </QuestionStyle>
                  </RowStyle>
                </div>
              ))}
          </>
        )}
      />
      <Grid container sm={12} spacing={3}>
        {isPhoto && (
          <Grid item sm={12}>
            <TextField
              name="no_of_photos"
              fullWidth
              type="number"
              label="No of Photos"
              onChange={(e) => setFieldValue('no_of_photos', e.target.value)}
              value={!isEmpty(no_of_photos) ? no_of_photos : ''}
              error={Boolean(touched.no_of_photos && errors.no_of_photos)}
              helperText={touched.no_of_photos && errors.no_of_photos}
              InputLabelProps={{
                shrink: true
              }}
            />
          </Grid>
        )}
        {isVideo && (
          <Grid item sm={12}>
            <TextField
              name="no_of_video"
              fullWidth
              type="number"
              label="No of Video Required"
              onChange={(e) => setFieldValue('no_of_video', e.target.value)}
              value={!isEmpty(no_of_video) ? no_of_video : ''}
              error={Boolean(touched.no_of_video && errors.no_of_video)}
              helperText={touched.no_of_video && errors.no_of_video}
              InputLabelProps={{
                shrink: true
              }}
            />
          </Grid>
        )}
        <Grid item sm={12}>
          <FormControl fullWidth>
            <FormControlLabel
              name="hashtags"
              label=""
              labelPlacement="top"
              control={
                <Autocomplete
                  fullWidth
                  multiple
                  id="tags-filled"
                  options={[]}
                  freeSolo
                  renderTags={(value: string[], getTagProps: any) =>
                    value.map((option: string, index: number) => (
                      <Chip
                        variant="outlined"
                        label={option}
                        {...getTagProps({ index })}
                        key={index}
                      />
                    ))
                  }
                  renderInput={(params: any) => (
                    <TextField
                      {...params}
                      label="HashTags"
                      error={Boolean(touched.hashtags && errors.hashtags)}
                      helperText={touched.hashtags && errors.hashtags}
                      InputLabelProps={{
                        shrink: true
                      }}
                    />
                  )}
                />
              }
            />
            {Boolean(touched.hashtags && errors.hashtags) && (
              <FormHelperText id="my-helper-text">{errors.hashtags}</FormHelperText>
            )}
          </FormControl>
        </Grid>
      </Grid>
    </SectionStyle>
  );
};
