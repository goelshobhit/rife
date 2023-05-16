// material ui
import { FormControl, TextField, FormHelperText } from '@material-ui/core';
import isEmpty from 'lodash/isEmpty';
import get from 'lodash/get';
import size from 'lodash/size';
import trim from 'lodash/trim';
import isEqual from 'lodash/isEqual';
import { styled } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Chip from '@material-ui/core/Chip';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Switch from '@material-ui/core/Switch';

import { DesktopDatePicker, DesktopDateTimePicker } from '@material-ui/lab';
// lodash
import map from 'lodash/map';

// custom component
import { UploadSingleFile } from '../../upload';

// the MenuItem height is a bit different between xs and larger breakpoints

const TextFieldStyle = styled(TextField)(() => ({
  border: '1px solid rgba(0, 0, 0, 0.42)',
  borderTopLeftRadius: 8,
  borderTopRightRadius: 8,
  backgroundColor: '#fff',
  '& :before': {
    borderBottom: 'none !important'
  },
  '& :hover': {
    backgroundColor: '#fff !important'
  },
  '& div': {
    backgroundColor: '#fff',
    '& :hover': {
      backgroundColor: '#fff !important'
    },
    '& :before': {
      borderBottom: 'none !important'
    }
  }
}));

export const getDynamicFields = (
  {
    name,
    label,
    type,
    touched,
    errors,
    handleChange,
    values,
    setFieldValue,
    options,
    handleDrop,
    isDisabled,
    fixedValue,
    isMandatory
  }: any,
  disabled: any
) => {
  const handleValue = () => {
    if (isDisabled) {
      return fixedValue;
    }
    return !isEmpty(values[name]) ? values[name] : '';
  };

  const handleError = () => {
    if (isMandatory && isEqual(size(get(values, 'description')), 0)) {
      return true;
    }
    return Boolean(touched[name] && errors[name]);
  };

  const handleErrorText = () => {
    if (isMandatory && isEqual(size(get(values, 'description')), 0)) {
      return 'Required';
    }
    return touched[name] && errors[name];
  };

  switch (type) {
    case 'text':
      return (
        <TextField
          name={name}
          disabled={disabled || isDisabled}
          fullWidth
          label={label}
          onChange={(e) => setFieldValue(name, e.target.value)}
          value={handleValue()}
          error={handleError()}
          helperText={handleErrorText()}
          InputLabelProps={{
            shrink: true,
          }}
        />
      );
    case 'number':
      return (
        <TextField
          type="number"
          name={name}
          disabled={disabled || isDisabled}
          fullWidth
          label={label}
          onChange={(e) => setFieldValue(name, e.target.value)}
          value={handleValue()}
          error={handleError()}
          helperText={handleErrorText()}
          InputLabelProps={{
            shrink: true
          }}
        />
      );
    case 'text2':
      return (
        <TextField
          name={name}
          disabled={disabled}
          fullWidth
          type={name}
          label={label}
          onChange={(e) => setFieldValue(name, trim(e.target.value))}
          value={!isEmpty(values[name]) ? values[name] : ''}
          error={Boolean(touched[name] && errors[name])}
          helperText={touched[name] && errors[name]}
          InputLabelProps={{
            shrink: true,
          }}
        />
      );
    case 'colorDropDown':
      return (
<TextField
          variant="outlined"
          name={name}
          id={name}
          select
          label={label}
          value={values[name]}
          onChange={(e) => setFieldValue(name, e.target.value)}
          fullWidth
          error={Boolean(touched[name] && errors[name])}
          helperText={touched[name] && errors[name]}
          InputLabelProps={{
            shrink: true,
          }}
        >
          {map(options, (item: any, index: any) => (
            <MenuItem value={index} key={item}>
              {item}
            </MenuItem>
          ))}
        </TextField>
      );
    case 'taskdropDown':
      return (
        <TextField
          variant="outlined"
          name={name}
          id={name}
          select
          label={label}
          value={values[name]}
          onChange={(e) => setFieldValue(name, e.target.value)}
          fullWidth
          error={Boolean(touched[name] && errors[name])}
          helperText={touched[name] && errors[name]}
          InputLabelProps={{
            shrink: true,
          }}
        >
          {map(options, (item: any, index: any) => (
            <MenuItem value={item} key={item}>
              {item}
            </MenuItem>
          ))}
        </TextField>
      );
    case 'dropDown':
      return (
        <TextField
          variant="outlined"
          name={name}
          id={name}
          select
          label={label}
          onChange={(e) => setFieldValue(name, e.target.value)}
          fullWidth
          error={Boolean(touched[name] && errors[name])}
          helperText={touched[name] && errors[name]}
          InputLabelProps={{
            shrink: true,
          }}
        >
          {map(options, (item: any, index: any) => (
            <MenuItem value={index + 1} key={item}>
              {item}
            </MenuItem>
          ))}
        </TextField>
      );
    case 'brandDropDown':
      return (
        <TextField
          variant="outlined"
          name={name}
          id={name}
          select
          label={label}
          onChange={(e) => setFieldValue(name, e.target.value)}
          fullWidth
          error={Boolean(touched[name] && errors[name])}
          helperText={touched[name] && errors[name]}
        >
          {map(options, (item: any, index: any) => (
            <MenuItem value={item.cr_co_id} key={item}>
              {item.name}
            </MenuItem>
          ))}
        </TextField>
      );
    case 'switch':
      return (
        <FormControlLabel
          name={name}
          control={<Switch {...label} onChange={handleChange} name={name} disabled={disabled} />}
          label={label}
          labelPlacement="start"
        />
      );
    case 'tags':
      return (
        <FormControl fullWidth>
          <FormControlLabel
            name={name}
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
                  <TextFieldStyle
                    {...params}
                    variant="filled"
                    placeholder={`Please select ${label}`}
                    label={label}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                )}
              />
            }
          />
          {Boolean(touched[name] && errors[name]) && (
            <FormHelperText id="my-helper-text">{errors[name]}</FormHelperText>
          )}
        </FormControl>
      );
    case 'date':
      return (
        <DesktopDatePicker
          label={label}
          value={values[name]}
          onChange={(date) => setFieldValue(name, date)}
          renderInput={(params) => <TextField fullWidth {...params} margin="normal" />}
          disabled={disabled}
        />
      );
    case 'dateAndTime':
      return (
        <DesktopDateTimePicker
          label={label}
          value={values[name]}
          onChange={(date) => setFieldValue(name, date)}
          renderInput={(params) => <TextField fullWidth {...params} margin="normal" />}
          disabled={disabled}
        />
      );
    case 'empty':
      return <div />;
    case 'upload_video':
      return (
        <UploadSingleFile
          maxSize={3145728}
          accept="video/*"
          onDrop={handleDrop}
          file={values.cover}
          desc="Add Video"
        />
      );
    default:
      return '';
  }
};
