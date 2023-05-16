import { useCallback } from 'react';
import includes from 'lodash/includes';
// material
import { TextField, Grid } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
// material
import { styled } from '@material-ui/core/styles';
import { UploadSingleFile, UploadSingleSoundFile } from '../../../upload';

const SectionStyle = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2),
  paddingTop: 32,
  paddingBottom: 32,
  paddingLeft: 8
}));

const SmallStyle = styled('small')(() => ({
  width: '100%',
  fontSize: 12,
  color: '#E02D69',
  marginLeft: 12
}));

export default function RenderTaskTypeUpload(props: any) {
  const { formik } = props;
  // console.log(props);
  const { values, setFieldValue } = formik;

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

  const VideoResponseTask = () => (
    <>
      <Alert severity="info" style={{ marginBottom: 24 }}>
        This task includes a video a and text
      </Alert>
      <div style={{ marginBottom: 24 }}>
        <UploadSingleFile
          maxSize={3145728}
          accept="video/*"
          onDrop={handleDrop}
          file={values.cover}
          desc="Add Single Video"
        />
      </div>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            name="Description"
            fullWidth
            type="text"
            label="Description"
            variant="outlined"
            style={{ marginTop: 5, marginBottom: 5 }}
            inputProps={{
              maxLength: 42
            }}
          />
          <SmallStyle> Max 42 characters</SmallStyle>
        </Grid>
      </Grid>
    </>
  );

  const SoundResponseTask = () => (
    <>
      <Alert severity="info" style={{ marginBottom: 24 }}>
        This task includes a sound
      </Alert>
      <div style={{ marginBottom: 24 }}>
        <UploadSingleSoundFile
          maxSize={3145728}
          accept="audio/*"
          onDrop={handleDrop}
          file={values.cover}
          desc="Add Single Video"
        />
      </div>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            name="description"
            fullWidth
            type="text"
            label="Description"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            name="Sound Creator Title"
            fullWidth
            type="text"
            label="Sound Title"
            variant="outlined"
            InputLabelProps={{
              shrink: true
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            name="Sound Create Username"
            fullWidth
            type="text"
            label="Sound Creator Username"
            variant="outlined"
            InputProps={{
              startAdornment: '@'
            }}
            InputLabelProps={{
              shrink: true
            }}
          />
        </Grid>
      </Grid>
    </>
  );

  const PublicVideo = () => (
    <Grid container sm={12} spacing={3}>
      <Grid item sm={6}>
        <TextField name="desc_title" fullWidth type="text" label="Title" variant="outlined" />
      </Grid>
      <Grid item sm={6}>
        <TextField
          name="description"
          fullWidth
          type="text"
          label="Description"
          variant="outlined"
        />
      </Grid>
    </Grid>
  );

  const PublicCaptionThis = () => (
    <>
      <div style={{ marginBottom: 24 }}>
        <UploadSingleFile
          maxSize={3145728}
          accept="image/*"
          onDrop={handleDrop}
          file={values.cover}
          desc="Add Single Image or Video"
        />
      </div>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <TextField
            name="CreatorName"
            fullWidth
            type="text"
            label="Creator"
            variant="outlined"
            InputProps={{
              startAdornment: '@'
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            name="desc_title"
            fullWidth
            disabled
            type="text"
            label="Title"
            value="Caption + Share"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            name="description"
            fullWidth
            type="text"
            label="Description"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            name="Number of Mandatory Social Shares"
            fullWidth
            type="text"
            label="Number of Mandatory Social Shares"
            variant="outlined"
          />
        </Grid>
      </Grid>
    </>
  );

  return (
    <SectionStyle>
      {includes(['Video'], props.task) && <PublicVideo />}
      {includes(['Image'], props.task) && <PublicVideo />}
      {includes(['Video Response'], props.task) && <VideoResponseTask />}
      {includes(['Caption this'], props.task) && <PublicCaptionThis />}
      {includes(['Sound'], props.task) && <SoundResponseTask />}
    </SectionStyle>
  );
}
