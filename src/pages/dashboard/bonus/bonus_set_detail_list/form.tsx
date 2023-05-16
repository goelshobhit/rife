import { useSnackbar } from 'notistack5';
import { useNavigate } from 'react-router-dom';
import { FieldArray, Form, FormikProvider, useFormik } from 'formik';
import { styled } from '@material-ui/core/styles';
import moment from 'moment';
import map from 'lodash/map';
import size from 'lodash/size';
import get from 'lodash/get';
// material
import { Card, Stack, TextField, Button, MenuItem, Typography, Switch } from '@material-ui/core';
// @types

import { DatePicker} from '@material-ui/lab';

import { useDispatch } from '../../../../redux/store';
import { createBonusSet, getBonusSetList } from '../../../../redux/slices/bonus';
// utils

interface Props {
  rewardBrandList: Array<[]>;
  bonusRuleList: Array<[]>;
}

const BoxStyle = styled(Card)(() => ({
  padding: '32px',
  background: '#FFFFFF',
  /* V3 reward shaddow */
  boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.06), 0px -5px 10px rgba(0, 0, 0, 0.06)',
  borderRadius: '12px',
  width: '100%'
}));

export default function RewardNewForm({ rewardBrandList, bonusRuleList }: Props) {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      bonus_set_name: '',
      brand: '',
      rule: '',
      start_date: '',
      end_date: '',
      bonus_set_prizes: [],
      isDefault: false,
      isActive: 0
    },
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const payload = {
          'Bonus Set Brand Id': values.brand,
          'Bonus Item ids': [1],
          'Bonus Set Item Name': values.bonus_set_name,
          'Bonus Set Item Qty': values.bonus_set_prizes.length,
          'Bonus Set Icons': '',
          'Bonus Set Images': '',
          'Bonus Set Start Date': moment(values.start_date).toISOString(),
          'Bonus Set Default': values.isDefault ? 1 : 0,
          'Bonus Set Item Timestamp': moment(values.end_date).toISOString(),
          'Bonus Set Status': values.isActive,
          'Bonus Set Duration': moment(values.end_date).diff(moment(values.start_date),'days'),
          'Bonus Rule Ids': [values.rule]
        };

        dispatch(createBonusSet(payload));
        resetForm();
        setSubmitting(false);
        enqueueSnackbar('Bonus Set Created', { variant: 'success' });
        navigate('/dashboard/bonus/set');
        dispatch(getBonusSetList({ bonusPageNo: 1 }));
      } catch (error) {
        console.error(error);
        setSubmitting(false);
      }
    }
  });

  const { errors, values, touched, handleSubmit, setFieldValue } = formik;

  return (
    <FormikProvider value={formik}>
      <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Stack spacing={3} sx={{ p: 3 }} direction="column">
          <BoxStyle>
            <Stack spacing={2} direction="column">
              <Typography variant="h4">Bonus Set</Typography>
              <Stack spacing={3} direction="row">
                <TextField
                  label="Name"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  onChange={(e) => setFieldValue('bonus_set_name', e.target.value)}
                />
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
                  name="rule"
                  id="rule"
                  select
                  label="Select Rule"
                  value={values.rule}
                  onChange={(e) => setFieldValue('rule', e.target.value)}
                  fullWidth
                  error={Boolean(touched.rule && errors.rule)}
                  helperText={touched.rule && errors.rule}
                  InputLabelProps={{
                    shrink: true
                  }}
                >
                  {map(bonusRuleList, (item: any) => (
                    <MenuItem value={item.bonus_ticket_rules_id} key={item.bonus_ticket_rules_id}>
                      {item.bonus_ticket_rule_name}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  variant="outlined"
                  name="rule"
                  id="rule"
                  select
                  label="Select Status"
                  value={values.isActive}
                  onChange={(e) => setFieldValue('isActive', e.target.value)}
                  fullWidth
                  error={Boolean(touched.isActive && errors.isActive)}
                  helperText={touched.isActive && errors.isActive}
                  InputLabelProps={{
                    shrink: true
                  }}
                >
                  {map(['Active', 'InActive'], (item: any, index: any) => (
                    <MenuItem value={index} key={item}>
                      {item}
                    </MenuItem>
                  ))}
                </TextField>
              </Stack>
            </Stack>
          </BoxStyle>

          <BoxStyle>
            <FieldArray
              name="bonus_set_prizes"
              render={(arrayHelpers: any) => (
                <>
                  <Stack
                    direction="row"
                    spacing={3}
                    style={{ alignItems: 'center', justifyContent: 'space-between' }}
                  >
                    <Typography variant="h4">Add Bonus Prizes</Typography>

                    <Button
                      variant="contained"
                      color="primary"
                      className="button"
                      style={{
                        borderRadius: 35
                      }}
                      disabled={size(values.bonus_set_prizes) > 9}
                      onClick={() => arrayHelpers.insert(size(values.bonus_set_prizes) + 1, {})}
                    >
                      + Add New Bonus Prize
                    </Button>
                  </Stack>
                  <Stack spacing={3} direction="column">
                    {map(get(values, 'bonus_set_prizes', []), (item: any, index: any) => (
                      <Stack direction="row" spacing={2} sx={{ p: 1 }} key={1}>
                        <TextField
                          label="Prize"
                          fullWidth
                          InputLabelProps={{ shrink: true }}
                          name={`bonus_set_prizes.${index}.Prize`}
                          onChange={(e) =>
                            setFieldValue(`bonus_set_prizes.${index}.Prize`, e.target.value)
                          }
                        />
                        <TextField
                          label="Quantity"
                          fullWidth
                          name={`bonus_set_prizes.${index}.Quantity`}
                          InputLabelProps={{ shrink: true }}
                          onChange={(e) =>
                            setFieldValue(`bonus_set_prizes.${index}.Quantity`, e.target.value)
                          }
                        />
                      </Stack>
                    ))}
                  </Stack>
                </>
              )}
            />
          </BoxStyle>
          <BoxStyle>
            <Stack spacing={3} direction="column">
              <Stack spacing={1} direction="row">
                <Typography variant="h4">Schedule</Typography>
                <Switch
                  checked={values.isDefault}
                  onChange={(e) => setFieldValue(`isDefault`, e.target.checked)}
                />
              </Stack>

              <Stack spacing={3} direction="row">
                <DatePicker<Date>
                  orientation="landscape"
                  value={values.start_date}
                  onChange={(newValue: any) => {
                    setFieldValue('start_date', newValue);
                  }}
                  renderInput={(params) => (
                    <TextField {...params} fullWidth label="Start Date" name="start_date" />
                  )}
                />
                <DatePicker<Date>
                  orientation="landscape"
                  value={values.end_date}
                  onChange={(newValue: any) => {
                    setFieldValue('end_date', newValue);
                  }}
                  renderInput={(params) => (
                    <TextField {...params} fullWidth label="End Date" name="end_date" />
                  )}
                />
              </Stack>
            </Stack>

            <Stack
              direction="row"
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                width: '100%',
                marginTop: 50,
                marginBottom: 50
              }}
            >
              <Button
                variant="contained"
                color="primary"
                className="button"
                type="submit"
                style={{
                  borderRadius: 35
                }}
              >
                Save
              </Button>
            </Stack>
          </BoxStyle>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
