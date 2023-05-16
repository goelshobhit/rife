import { useState } from 'react';
import { useDropzone, DropzoneOptions } from 'react-dropzone';
import map from 'lodash/map';
import isString from 'lodash/isString';
// material
import { alpha, styled } from '@material-ui/core/styles';
import { Box, Theme, Typography, Paper } from '@material-ui/core';
import { SxProps } from '@material-ui/system';
// utils
import { fData } from '../../utils/formatNumber';
//
import Scrollbar from '../Scrollbar';

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
  width: 174,
  height: 232,
  border: `3px dashed #BBBBBB`,
  color: '#BBBBBB',
  borderRadius: 4,
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
  desc?: string | null;
}

export default function UploadSingleFile({
  error = false,
  file,
  sx,
  desc = 'Drop or Select file',
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

  const [fileList, setFileList] = useState([
    {
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
    },
    {
      uid: '-2',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
    },
    {
      uid: '-3',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
    },
    {
      uid: '-3',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
    },
    {
      uid: '-3',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
    },
    {
      uid: '-3',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
    },
    {
      uid: '-3',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
    },
    {
      uid: '-3',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
    },
    {
      uid: '-3',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
    }
  ]);

  // console.log(file);

  return (
    <Box sx={{ width: '100%', ...sx }}>
      <div style={{ display: 'flex' }}>
        <DropZoneStyle
          {...getRootProps()}
          sx={{
            ...(isDragActive && { opacity: 0.72 }),
            ...((isDragReject || error) && {
              color: 'error.main',
              borderColor: 'error.light',
              bgcolor: 'error.lighter'
            }),
            ...(file && { padding: '0' })
          }}
        >
          <input {...getInputProps()} />
          {!file && <Box
            sx={{ p: 1, ml: { md: 2 } }}
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              fontSize: 48,
              fontWeight: 800,
              marginRight: 12
            }}
          >
            +
          </Box>}
          {file && (
            <Box
              component="img"
              alt="file preview"
              src={isString(file) ? file : file.preview}
              sx={{
                top: 8,
                borderRadius: 1,
                objectFit: 'cover',
                height:'100%'
              }}
            />
          )}
        </DropZoneStyle>
        <Scrollbar>
          <div style={{ display: 'flex' }}>
            {map(fileList, (item: any) => (
              <Box
                component="img"
                alt="file preview"
                src={item.url}
                style={{
                  width: 174,
                  height: 232,
                  borderRadius: '4px',
                  marginLeft: '8px'
                }}
              />
            ))}
          </div>
        </Scrollbar>
      </div>
      {fileRejections.length > 0 && <ShowRejectionItems />}
    </Box>
  );
}
