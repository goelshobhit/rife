import { useState, useCallback } from 'react';
import { useSnackbar } from 'notistack5';
import { useNavigate } from 'react-router-dom';
import { FieldArray, Form, FormikProvider, useFormik } from 'formik';
import { styled } from '@material-ui/core/styles';
import get from 'lodash/get';
import map from 'lodash/map';
import size from 'lodash/size';
import sum from 'lodash/sum';
// material
import {
  Card,
  Stack,
  TextField,
  Typography,
  Button,
  MenuItem,
  CardHeader,
  CardContent
} from '@material-ui/core';
// @types
import { rewardState } from '../../../../@types/reward';

import { TrashIcon } from '../../../../assets';
import { useDispatch, useSelector } from '../../../../redux/store';
import { createRewardTask, createRewardImage } from '../../../../redux/slices/reward';
import { UploadAvatar } from '../../../../components/upload';
// utils
import { fData } from '../../../../utils/formatNumber';

interface Props {
  rewardBrandList: Array<[]>;
}

const UploadBoxStyle = styled(Card)(() => ({
  padding: '12px',
  background: '#FFFFFF',
  /* V3 reward shaddow */
  boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.06), 0px -5px 10px rgba(0, 0, 0, 0.06)',
  borderRadius: '12px',
  width: 291,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}));
const BoxStyle = styled(Card)(() => ({
  padding: '32px',
  background: '#FFFFFF',
  /* V3 reward shaddow */
  boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.06), 0px -5px 10px rgba(0, 0, 0, 0.06)',
  borderRadius: '12px',
  width: '100%'
}));

const BoxStyle2 = styled(Card)(() => ({
  padding: '32px',
  background: '#FFFFFF',
  /* V3 reward shaddow */
  boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.06), 0px -5px 10px rgba(0, 0, 0, 0.06)',
  borderRadius: '12px',
  width: '100%',
  minHeight: 300
}));

const DistributionBoxStyle = styled(Card)(() => ({
  margin: '32px',
  background: '#FFFFFF',
  /* V3 reward shaddow */
  boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.06), 0px -5px 10px rgba(0, 0, 0, 0.06)',
  borderRadius: '12px',
  width: '27%',
  minHeight: 558,
  padding: 40
}));

const ColStyle = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
  alignItems: 'flex-end'
}));

const RowStyle1 = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  flexWrap: 'wrap',
  width: '100%'
}));

export default function RewardNewForm({ rewardBrandList }: Props) {
  const { rewardCenterImage, rewardSettings } = useSelector(
    (state: { reward: rewardState }) => state.reward
  );

  const [centerImage, setCenterImage] = useState(null);

  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      reward_name: '',
      reward_type: '',
      location: '',
      brand: '',
      reward_center_dists: [{}]
    },
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      const payload = {
        ...values,
        reward_center_image: rewardCenterImage,
        reward_center_average_value: sum(
          map(values.reward_center_dists, (item: any, index: number) =>
            sum([
              get(values, `reward_center_dists.${index}.reward_center_dist_one_booster`, 0) *
                get(rewardSettings, 'data[0].booster_value_in_tokens'),
              get(values, `reward_center_dists.${index}.reward_center_dist_one_coins`, 0) * 1,
              get(values, `reward_center_dists.${index}.reward_center_dist_one_stars`, 0) *
                get(rewardSettings, 'data[0].star_value_in_tokens'),
              get(values, `reward_center_dists.${index}.reward_center_dist_one_keys`, 0) *
                get(rewardSettings, 'data[0].key_value_in_tokens')
            ])
          )
        )
      };
      try {
        dispatch(createRewardTask(payload));
        resetForm();
        setSubmitting(false);
        enqueueSnackbar('Reward Created', { variant: 'success' });
        navigate('/dashboard/reward/center');
      } catch (error) {
        console.error(error);
        setSubmitting(false);
      }
    }
  });

  const { errors, values, touched, handleSubmit, setFieldValue } = formik;

  const REWARD_TYPE = ['Easter Egg', 'Present', 'Chest', 'Lottery Wheel'];
  const LOCATION_TYPE = ['Default', 'Referral', 'Unassigned'];

  const handleDropAvatar = useCallback((acceptedFiles: any) => {
    const file = acceptedFiles[0];
    if (file) {
      const form = new FormData();
      form.append(`file`, file, file.name);
      form.append('media_key', 'reward_center');
      dispatch(createRewardImage(form));
      setCenterImage({
        ...file,
        preview: URL.createObjectURL(file)
      });
    }
  }, []);

  return (
    <FormikProvider value={formik}>
      <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Stack spacing={3} sx={{ p: 3 }} direction="row">
          <UploadBoxStyle>
            <UploadAvatar
              accept="image/*"
              file={centerImage}
              onDrop={handleDropAvatar}
              caption=""
            />
          </UploadBoxStyle>
          <BoxStyle>
            <Stack spacing={2} direction="column">
              <TextField
                label="Name"
                InputLabelProps={{ shrink: true }}
                onChange={(e) => setFieldValue('reward_name', e.target.value)}
              />
              <Stack spacing={1} direction="row">
                <TextField
                  variant="outlined"
                  name="reward_type"
                  id="reward_type"
                  select
                  label="Reward Type"
                  value={values.reward_type}
                  onChange={(e) => setFieldValue('reward_type', e.target.value)}
                  fullWidth
                  error={Boolean(touched.reward_type && errors.reward_type)}
                  helperText={touched.reward_type && errors.reward_type}
                  InputLabelProps={{
                    shrink: true
                  }}
                >
                  {map(REWARD_TYPE, (item: any, index: any) => (
                    <MenuItem value={index} key={item}>
                      {item}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  variant="outlined"
                  name="brand"
                  id="brand"
                  select
                  label="Brand"
                  value={values.brand}
                  onChange={(e) => setFieldValue('brand', e.target.value)}
                  fullWidth
                  error={Boolean(touched.brand && errors.brand)}
                  helperText={touched.brand && errors.brand}
                  InputLabelProps={{
                    shrink: true
                  }}
                >
                  {map(rewardBrandList, (item: any) => (
                    <MenuItem value={item.cr_co_id} key={item}>
                      {item.name}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  variant="outlined"
                  name="location"
                  id="location"
                  select
                  label="Location"
                  value={values.location}
                  onChange={(e) => setFieldValue('location', e.target.value)}
                  fullWidth
                  error={Boolean(touched.location && errors.location)}
                  helperText={touched.location && errors.location}
                  InputLabelProps={{
                    shrink: true
                  }}
                >
                  {map(LOCATION_TYPE, (item: any, index: any) => (
                    <MenuItem value={index} key={item}>
                      {item}
                    </MenuItem>
                  ))}
                </TextField>
              </Stack>
              <Typography variant="subtitle1">
                Average value of a single selection in this set ={' '}
                {sum(
                  map(values.reward_center_dists, (item: any, index: number) =>
                    sum([
                      get(
                        values,
                        `reward_center_dists.${index}.reward_center_dist_one_booster`,
                        0
                      ) * get(rewardSettings, 'data[0].booster_value_in_tokens'),
                      get(values, `reward_center_dists.${index}.reward_center_dist_one_coins`, 0) *
                        1,
                      get(values, `reward_center_dists.${index}.reward_center_dist_one_stars`, 0) *
                        get(rewardSettings, 'data[0].star_value_in_tokens'),
                      get(values, `reward_center_dists.${index}.reward_center_dist_one_keys`, 0) *
                        get(rewardSettings, 'data[0].key_value_in_tokens')
                    ])
                  )
                )}{' '}
                tokens{' '}
              </Typography>
            </Stack>
          </BoxStyle>
        </Stack>
        <Stack sx={{ p: 2 }}>
          <BoxStyle2>
            <Typography variant="h4">Reward Center Distribution</Typography>

            <FieldArray
              name="reward_center_dists"
              render={(arrayHelpers) => (
                <ColStyle>
                  <Button
                    variant="contained"
                    color="primary"
                    className="button"
                    style={{ width: 100 }}
                    onClick={() => arrayHelpers.insert(size(values.reward_center_dists) + 1, {})}
                  >
                    Add
                  </Button>
                  <RowStyle1>
                    {map(get(values, 'reward_center_dists'), (item: any, index: number) => (
                      <DistributionBoxStyle key={index}>
                        <Stack spacing={3} direction="column">
                          <TextField
                            name={`reward_center_dists.${index}.reward_center_dist_one_name`}
                            onChange={(e) =>
                              setFieldValue(
                                `reward_center_dists.${index}.reward_center_dist_one_name`,
                                e.target.value
                              )
                            }
                            label="Title"
                            InputLabelProps={{
                              shrink: true
                            }}
                          />
                          <TextField
                            name={`reward_center_dists.${index}.reward_center_dist_one_freq`}
                            onChange={(e) =>
                              setFieldValue(
                                `reward_center_dists.${index}.reward_center_dist_one_freq`,
                                e.target.value
                              )
                            }
                            type="number"
                            InputProps={{ inputProps: { min: 0, max: 10 } }}
                            label="Frequency"
                            InputLabelProps={{
                              shrink: true
                            }}
                          />

                          <TextField
                            name={`reward_center_dists.${index}.reward_center_dist_one_keys`}
                            onChange={(e) =>
                              setFieldValue(
                                `reward_center_dists.${index}.reward_center_dist_one_keys`,
                                e.target.value
                              )
                            }
                            type="number"
                            label="No of Keys"
                            InputLabelProps={{
                              shrink: true
                            }}
                            InputProps={{
                              inputProps: { min: 0 },
                              endAdornment: ` ${
                                get(
                                  values,
                                  `reward_center_dists.${index}.reward_center_dist_one_keys`,
                                  0
                                ) * get(rewardSettings, 'data[0].key_value_in_tokens')
                              } Tokens`
                            }}
                          />
                          <TextField
                            name={`reward_center_dists.${index}.reward_center_dist_one_stars`}
                            onChange={(e) =>
                              setFieldValue(
                                `reward_center_dists.${index}.reward_center_dist_one_stars`,
                                e.target.value
                              )
                            }
                            type="number"
                            label="No of Stars"
                            InputLabelProps={{
                              shrink: true
                            }}
                            InputProps={{
                              inputProps: { min: 0 },
                              endAdornment: `${
                                get(
                                  values,
                                  `reward_center_dists.${index}.reward_center_dist_one_stars`,
                                  0
                                ) * get(rewardSettings, 'data[0].star_value_in_tokens')
                              }  Tokens`
                            }}
                          />
                          <TextField
                            name={`reward_center_dists.${index}.reward_center_dist_one_coins`}
                            onChange={(e) =>
                              setFieldValue(
                                `reward_center_dists.${index}.reward_center_dist_one_coins`,
                                e.target.value
                              )
                            }
                            type="number"
                            label="No of Coins"
                            InputLabelProps={{
                              shrink: true
                            }}
                            InputProps={{
                              inputProps: { min: 0 },
                              endAdornment: `${
                                get(
                                  values,
                                  `reward_center_dists.${index}.reward_center_dist_one_coins`,
                                  0
                                ) * 1
                              }  Tokens`
                            }}
                          />

                          <TextField
                            name={`reward_center_dists.${index}.reward_center_dist_one_booster`}
                            onChange={(e) =>
                              setFieldValue(
                                `reward_center_dists.${index}.reward_center_dist_one_booster`,
                                e.target.value
                              )
                            }
                            type="number"
                            label="No of Boosters"
                            InputLabelProps={{
                              shrink: true
                            }}
                            InputProps={{
                              inputProps: { min: 0 },
                              endAdornment: `${
                                get(
                                  values,
                                  `reward_center_dists.${index}.reward_center_dist_one_booster`,
                                  0
                                ) * get(rewardSettings, 'data[0].booster_value_in_tokens')
                              }  Tokens`
                            }}
                          />
                          <Button
                            disabled={index === 0}
                            variant="outlined"
                            style={{
                              width: 100,
                              marginLeft: get(rewardSettings, 'data[0].key_value_in_tokens')
                            }}
                            onClick={() => {
                              arrayHelpers.remove(index);
                            }}
                          >
                            <TrashIcon />
                          </Button>
                          <Typography variant="subtitle1">
                            {' '}
                            Total Values: &nbsp;&nbsp;
                            {sum([
                              get(
                                values,
                                `reward_center_dists.${index}.reward_center_dist_one_booster`,
                                0
                              ) * get(rewardSettings, 'data[0].booster_value_in_tokens'),
                              get(
                                values,
                                `reward_center_dists.${index}.reward_center_dist_one_coins`,
                                0
                              ) * 1,
                              get(
                                values,
                                `reward_center_dists.${index}.reward_center_dist_one_stars`,
                                0
                              ) * get(rewardSettings, 'data[0].star_value_in_tokens'),
                              get(
                                values,
                                `reward_center_dists.${index}.reward_center_dist_one_keys`,
                                0
                              ) * get(rewardSettings, 'data[0].key_value_in_tokens')
                            ])}{' '}
                            &nbsp; Tokens
                          </Typography>
                        </Stack>
                      </DistributionBoxStyle>
                    ))}
                  </RowStyle1>
                  <Button
                    variant="contained"
                    color="primary"
                    className="button"
                    type="submit"
                    style={{
                      width: 100,
                      borderRadius: 35
                    }}
                  >
                    Save
                  </Button>
                </ColStyle>
              )}
            />
          </BoxStyle2>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
