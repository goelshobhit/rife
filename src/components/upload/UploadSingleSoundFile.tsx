import { isString } from 'lodash';
import { useDropzone, DropzoneOptions } from 'react-dropzone';
// material
import { alpha, styled } from '@material-ui/core/styles';
import { Box, Theme, Typography, Paper } from '@material-ui/core';
import { SxProps } from '@material-ui/system';
// utils
import { fData } from '../../utils/formatNumber';
//
import { UploadSoundIllustration } from '../../assets';

// ----------------------------------------------------------------------

const DropZoneStyle = styled('div')(({ theme }) => ({
  outline: 'none',
  display: 'flex',
  overflow: 'hidden',
  textAlign: 'center',
  position: 'relative',
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: 1,
  transition: theme.transitions.create('padding'),
  border: `2px solid #00BAEF`,
  color:"#00BAEF",
  borderRadius: 23,
  '&:hover': {
    opacity: 0.72,
    cursor: 'pointer'
  },
  [theme.breakpoints.up('md')]: { textAlign: 'left', flexDirection: 'row' }
}));

// ----------------------------------------------------------------------

interface CustomFile extends File {
  path?: string;
  preview?: string;
}

interface UploadSingleFileProps extends DropzoneOptions {
  error?: boolean;
  file: CustomFile | string | null;
  sx?: SxProps<Theme>;
  desc?: string |  null;
}

export default function UploadSingleFile({
  error = false,
  file,
  sx,
  desc = "Drop or Select file",
  ...other
}: UploadSingleFileProps) {
  const { getRootProps, getInputProps, isDragActive, isDragReject, fileRejections } = useDropzone({
    multiple: false,
    ...other
  });

  const ShowRejectionItems = () => (
    <Paper
      variant="outlined"
      sx={{
        py: 1,
        px: 2,
        mt: 3,
        borderColor: 'error.light',
        bgcolor: (theme) => alpha(theme.palette.error.main, 0.08)
      }}
    >
      {fileRejections.map(({ file, errors }) => {
        const { path, size }: CustomFile = file;
        return (
          <Box key={path} sx={{ my: 1 }}>
            <Typography variant="subtitle2" noWrap>
              {path} - {fData(size)}
            </Typography>
            {errors.map((e) => (
              <Typography key={e.code} variant="caption" component="p">
                - {e.message}
              </Typography>
            ))}
          </Box>
        );
      })}
    </Paper>
  );

  return (
    <Box sx={{ width: '100%', ...sx }}>
      <DropZoneStyle
        {...getRootProps()}
        sx={{
          ...(isDragActive && { opacity: 0.72 }),
          ...((isDragReject || error) && {
            color: 'error.main',
            borderColor: 'error.light',
            bgcolor: 'error.lighter'
          }),
        }}
      >
        <input {...getInputProps()} />
        <Box sx={{ p: 1, ml: { md: 2 } }} style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          width:'100%'
        }}>
          <span style={{ marginRight: 24 }}><UploadSoundIllustration /></span>Upload Sound
        </Box>
      </DropZoneStyle>
      {file && (
          <Box
            component="img"
            alt="file preview"
            src='https://www.computerhope.com/jargon/m/mp3.png'
            sx={{
              top: 8,
              borderRadius: 1,
              objectFit: 'cover',
              width: '100px',
              height: '100px',
              marginTop: 2,
            }}
          />
        )}
      {fileRejections.length > 0 && <ShowRejectionItems />}
    </Box>
  );
}