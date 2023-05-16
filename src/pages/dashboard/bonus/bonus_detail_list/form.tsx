import { useState, useCallback } from 'react';
import { useSnackbar } from 'notistack5';
import { useNavigate } from 'react-router-dom';
import { FieldArray, Form, FormikProvider, useFormik } from 'formik';
import { styled } from '@material-ui/core/styles';
import get from 'lodash/get';
import map from 'lodash/map';
import size from 'lodash/size';
import sum from 'lodash/sum';
import includes from 'lodash/includes';
// material
import {
  Card,
  Stack,
  TextField,
  Typography,
  Button,
  MenuItem,
  FormControl,
  FormControlLabel,
  Autocomplete,
  Chip,
  Select,
  Input
} from '@material-ui/core';
// @types
import { rewardState } from '../../../../@types/reward';

import { TrashIcon } from '../../../../assets';
import { useDispatch, useSelector } from '../../../../redux/store';
import { createBonusTicketRules, getBonusRuleList } from '../../../../redux/slices/bonus';
// utils
import { fData } from '../../../../utils/formatNumber';

interface Props {
  rewardBrandList: Array<[]>;
}

const BoxStyle = styled(Card)(() => ({
  padding: '32px',
  background: '#FFFFFF',
  /* V3 reward shaddow */
  boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.06), 0px -5px 10px rgba(0, 0, 0, 0.06)',
  borderRadius: '12px',
  width: '100%'
}));

const RowStyle1 = styled(Card)(() => ({
  background: '#FFFFFF',
  /* V3 reward shaddow */
  boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.06), 0px -5px 10px rgba(0, 0, 0, 0.06)',
  borderRadius: '12px',
  width: '50%',
  minHeight: 100,
  padding: 24
}));

const RuleHeader = styled(Typography)(() => ({
  fontWeight: 600,
  fontSize: '15px',
  color: '#232323'
}));

const AddButtonStyle = styled(Button)(() => ({
  border: '1px solid #232323',
  borderRadius: '30px',
  width: '124px',
  padding: '6px 16px',
  color: '#232323'
}));

export default function RewardNewForm({ rewardBrandList }: Props) {
  const TiCKET_RULE = ['Historical Data', 'Follower', 'App Level', 'Social Network'];
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      bonus_ticket_name: '',
      ticket_rule: TiCKET_RULE,
      brand: '',
      bonus_ticket_status: '',
      bonus_rule_1: [{ From: '', To: '', Ticket: '' }],
      bonus_rule_2: [{ From: '', To: '', Ticket: '' }],
      bonus_rule_3: [{ From: '', To: '', Ticket: '' }],
      bonus_rule_4: [{ From: '', To: '', Ticket: '' }],
      bonus_rule_4_social_network: ''
    },
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const payload = {
          'Bonus Ticket Rule Name': values.bonus_ticket_name,
          brand: values.brand,
          status: values.bonus_ticket_status,
          'Bonus Ticket Rule Details': [
            {
              'Bonus Rule Type': 1,
              'Social Networks': null,
              'Bonus Rules': values.bonus_rule_1
            },
            {
              'Bonus Rule Type': 2,
              'Social Networks': null,
              'Bonus Rules': values.bonus_rule_2
            },
            {
              'Bonus Rule Type': 3,
              'Social Networks': null,
              'Bonus Rules': values.bonus_rule_3
            },
            {
              'Bonus Rule Type': 4,
              'Social Networks': values.bonus_rule_4_social_network,
              'Bonus Rules': values.bonus_rule_4
            }
          ]
        };
        dispatch(createBonusTicketRules(payload));
        resetForm();
        setSubmitting(false);
        enqueueSnackbar('Bonus Ticket Rule Created', { variant: 'success' });
        navigate('/dashboard/bonus/rule');
        dispatch(getBonusRuleList({ bonusPageNo: 1 }))
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
        <Stack spacing={3} sx={{ p: 3 }} direction="row">
          <BoxStyle>
            <Stack spacing={2} direction="column">
              <Stack spacing={3} direction="row">
                <TextField
                  label="Name"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  onChange={(e) => setFieldValue('bonus_ticket_name', e.target.value)}
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
              </Stack>
              <Stack spacing={3} direction="row">
                <Autocomplete
                  fullWidth
                  multiple
                  id="tags-standard"
                  options={TiCKET_RULE}
                  defaultValue={TiCKET_RULE}
                  onChange={(e, value) => setFieldValue('ticket_rule', value)}
                  renderInput={(params: any) => (
                    <TextField
                      {...params}
                      fullWidth
                      variant="outlined"
                      label="Ticket Rule"
                      InputLabelProps={{
                        shrink: true
                      }}
                    />
                  )}
                />

                <TextField
                  variant="outlined"
                  name="bonus_ticket_status"
                  id="bonus_ticket_status"
                  select
                  label="Brand Status"
                  value={values.bonus_ticket_status}
                  onChange={(e) => setFieldValue('bonus_ticket_status', e.target.value)}
                  fullWidth
                  error={Boolean(touched.bonus_ticket_status && errors.bonus_ticket_status)}
                  helperText={touched.bonus_ticket_status && errors.bonus_ticket_status}
                  InputLabelProps={{
                    shrink: true
                  }}
                >
                  {map(['Active', 'InActive'], (item: any, index: number) => (
                    <MenuItem value={index} key={item}>
                      {item}
                    </MenuItem>
                  ))}
                </TextField>
              </Stack>
            </Stack>
            <>
              <Stack spacing={3} sx={{ p: 1 }} direction="row">
                {includes(get(values, 'ticket_rule'), 'Historical Data') && (
                  <FieldArray
                    name="bonus_rule_1"
                    render={(arrayHelpers) => (
                      <RowStyle1>
                        <Stack
                          direction="row"
                          style={{ alignItems: 'center', justifyContent: 'space-between' }}
                        >
                          <RuleHeader>History Rules</RuleHeader>
                          <AddButtonStyle
                            variant="outlined"
                            disabled={size(values.bonus_rule_1) > 9}
                            onClick={() => arrayHelpers.insert(size(values.bonus_rule_1) + 1, {})}
                          >
                            + Add Rule
                          </AddButtonStyle>
                        </Stack>

                        <Stack spacing={2} direction="column">
                          {map(get(values, 'bonus_rule_1', []), (item: any, index: any) => (
                            <Stack direction="row" spacing={2} sx={{ p: 1 }} key={1}>
                              Did not win
                              <TextField
                                variant="standard"
                                label=""
                                name={`bonus_rule_1.${index}.From`}
                                style={{ width: 30 }}
                                InputLabelProps={{ shrink: true }}
                                onChange={(e) =>
                                  setFieldValue(`bonus_rule_1.${index}.From`, e.target.value)
                                }
                                type="number"
                                InputProps={{
                                  inputProps: {
                                    max: 100,
                                    min: 0
                                  }
                                }}
                              />
                              To
                              <TextField
                                variant="standard"
                                label=""
                                name={`bonus_rule_1.${index}.From`}
                                style={{ width: 30 }}
                                InputLabelProps={{ shrink: true }}
                                onChange={(e) =>
                                  setFieldValue(`bonus_rule_1.${index}.From`, e.target.value)
                                }
                                type="number"
                                InputProps={{
                                  inputProps: {
                                    max: 100,
                                    min: 0
                                  }
                                }}
                              />
                              Times
                              <TextField
                                variant="standard"
                                label=""
                                name={`bonus_rule_1.${index}.From`}
                                style={{ width: 30 }}
                                InputLabelProps={{ shrink: true }}
                                onChange={(e) =>
                                  setFieldValue(`bonus_rule_1.${index}.From`, e.target.value)
                                }
                                type="number"
                                InputProps={{
                                  inputProps: {
                                    max: 100,
                                    min: 0
                                  }
                                }}
                              />
                              Tickets
                              <Button
                                disabled={index === 0}
                                variant="outlined"
                                onClick={() => {
                                  arrayHelpers.remove(index);
                                }}
                              >
                                <TrashIcon />
                              </Button>
                            </Stack>
                          ))}
                        </Stack>
                      </RowStyle1>
                    )}
                  />
                )}
                {includes(get(values, 'ticket_rule', []), 'Follower') && (
                  <FieldArray
                    name="bonus_rule_2"
                    render={(arrayHelpers) => (
                      <RowStyle1>
                        <Stack
                          direction="row"
                          style={{ alignItems: 'center', justifyContent: 'space-between' }}
                        >
                          <RuleHeader>Followers Rules</RuleHeader>
                          <AddButtonStyle
                            variant="outlined"
                            disabled={size(values.bonus_rule_2) > 9}
                            onClick={() => arrayHelpers.insert(size(values.bonus_rule_2) + 1, {})}
                          >
                            + Add Rule
                          </AddButtonStyle>
                        </Stack>

                        <Stack spacing={2} direction="column">
                          {map(get(values, 'bonus_rule_2', []), (item: any, index: any) => (
                            <Stack direction="row" spacing={2} sx={{ p: 1 }} key={1}>
                              App Level
                              <TextField
                                variant="standard"
                                label=""
                                name={`bonus_rule_2.${index}.From`}
                                style={{ width: 30 }}
                                InputLabelProps={{ shrink: true }}
                                onChange={(e) =>
                                  setFieldValue(`bonus_rule_2.${index}.From`, e.target.value)
                                }
                                type="number"
                                InputProps={{
                                  inputProps: {
                                    max: 100,
                                    min: 0
                                  }
                                }}
                              />
                              To
                              <TextField
                                variant="standard"
                                label=""
                                name={`bonus_rule_2.${index}.From`}
                                style={{ width: 30 }}
                                InputLabelProps={{ shrink: true }}
                                onChange={(e) =>
                                  setFieldValue(`bonus_rule_2.${index}.From`, e.target.value)
                                }
                                type="number"
                                InputProps={{
                                  inputProps: {
                                    max: 100,
                                    min: 0
                                  }
                                }}
                              />
                              Times
                              <TextField
                                variant="standard"
                                label=""
                                name={`bonus_rule_2.${index}.From`}
                                style={{ width: 30 }}
                                InputLabelProps={{ shrink: true }}
                                onChange={(e) =>
                                  setFieldValue(`bonus_rule_2.${index}.From`, e.target.value)
                                }
                              />
                              Tickets
                              <Button
                                disabled={index === 0}
                                variant="outlined"
                                onClick={() => {
                                  arrayHelpers.remove(index);
                                }}
                              >
                                <TrashIcon />
                              </Button>
                            </Stack>
                          ))}
                        </Stack>
                      </RowStyle1>
                    )}
                  />
                )}
              </Stack>
              <Stack spacing={3} direction="row" sx={{ p: 1 }}>
                {includes(get(values, 'ticket_rule', []), 'App Level') && (
                  <FieldArray
                    name="bonus_rule_3"
                    render={(arrayHelpers) => (
                      <RowStyle1>
                        <Stack
                          direction="row"
                          style={{ alignItems: 'center', justifyContent: 'space-between' }}
                        >
                          <RuleHeader>App Level Rules</RuleHeader>
                          <AddButtonStyle
                            variant="outlined"
                            disabled={size(values.bonus_rule_3) > 9}
                            onClick={() => arrayHelpers.insert(size(values.bonus_rule_3) + 1, {})}
                          >
                            + Add Rule
                          </AddButtonStyle>
                        </Stack>

                        <Stack spacing={2} direction="column">
                          {map(get(values, 'bonus_rule_3', []), (item: any, index: any) => (
                            <Stack direction="row" spacing={2} sx={{ p: 1 }} key={1}>
                              Followers
                              <TextField
                                variant="standard"
                                label=""
                                name={`bonus_rule_3.${index}.From`}
                                style={{ width: 30 }}
                                InputLabelProps={{ shrink: true }}
                                onChange={(e) =>
                                  setFieldValue(`bonus_rule_3.${index}.From`, e.target.value)
                                }
                                type="number"
                                InputProps={{
                                  inputProps: {
                                    max: 100,
                                    min: 0
                                  }
                                }}
                              />
                              To
                              <TextField
                                variant="standard"
                                label=""
                                name={`bonus_rule_3.${index}.From`}
                                style={{ width: 30 }}
                                InputLabelProps={{ shrink: true }}
                                onChange={(e) =>
                                  setFieldValue(`bonus_rule_3.${index}.From`, e.target.value)
                                }
                                type="number"
                                InputProps={{
                                  inputProps: {
                                    max: 100,
                                    min: 0
                                  }
                                }}
                              />
                              Times
                              <TextField
                                variant="standard"
                                label=""
                                name={`bonus_rule_3.${index}.From`}
                                style={{ width: 30 }}
                                InputLabelProps={{ shrink: true }}
                                onChange={(e) =>
                                  setFieldValue(`bonus_rule_3.${index}.From`, e.target.value)
                                }
                              />
                              Tickets
                              <Button
                                disabled={index === 0}
                                variant="outlined"
                                onClick={() => {
                                  arrayHelpers.remove(index);
                                }}
                              >
                                <TrashIcon />
                              </Button>
                            </Stack>
                          ))}
                        </Stack>
                      </RowStyle1>
                    )}
                  />
                )}

                {includes(get(values, 'ticket_rule', []), 'Social Network') && (
                  <FieldArray
                    name="bonus_rule_4"
                    render={(arrayHelpers) => (
                      <RowStyle1>
                        <Stack
                          direction="row"
                          style={{ alignItems: 'center', justifyContent: 'space-between' }}
                        >
                          <RuleHeader>Social Network Rules</RuleHeader>
                          <AddButtonStyle
                            variant="outlined"
                            disabled={size(values.bonus_rule_4) > 9}
                            onClick={() => arrayHelpers.insert(size(values.bonus_rule_4) + 1, {})}
                          >
                            + Add Rule
                          </AddButtonStyle>
                        </Stack>

                        <Stack spacing={2} direction="column">
                          <Stack
                            direction="column"
                            spacing={3}
                            sx={{ paddingTop: 3, paddingBottom: 3 }}
                          >
                            <TextField
                              variant="outlined"
                              name="bonus_rule_4_social_network"
                              id="bonus_rule_4_social_network"
                              select
                              label="Social Network"
                              value={values.bonus_rule_4_social_network}
                              onChange={(e) =>
                                setFieldValue('bonus_rule_4_social_network', e.target.value)
                              }
                              fullWidth
                              InputLabelProps={{
                                shrink: true
                              }}
                            >
                              {map(
                                [
                                  'Facebook',
                                  'Instagram',
                                  'Twitter',
                                  'Pin Interest',
                                  'SnapChat',
                                  'Tiktok'
                                ],
                                (item: any, index: number) => (
                                  <MenuItem value={item} key={item}>
                                    {item}
                                  </MenuItem>
                                )
                              )}
                            </TextField>
                          </Stack>

                          {map(get(values, 'bonus_rule_4', []), (item: any, index: any) => (
                            <Stack direction="row" spacing={2} sx={{ p: 1 }} key={1}>
                              <TextField
                                variant="standard"
                                label=""
                                name={`bonus_rule_4.${index}.From`}
                                fullWidth
                                InputLabelProps={{ shrink: true }}
                                onChange={(e) =>
                                  setFieldValue(`bonus_rule_4.${index}.From`, e.target.value)
                                }
                                type="number"
                                InputProps={{
                                  inputProps: {
                                    max: 100,
                                    min: 0
                                  }
                                }}
                              />
                              Networks
                              <TextField
                                variant="standard"
                                label=""
                                name={`bonus_rule_4.${index}.From`}
                                fullWidth
                                InputLabelProps={{ shrink: true }}
                                onChange={(e) =>
                                  setFieldValue(`bonus_rule_4.${index}.From`, e.target.value)
                                }
                                type="number"
                                InputProps={{
                                  inputProps: {
                                    max: 100,
                                    min: 0
                                  }
                                }}
                              />
                              Tickets
                              <Button
                                disabled={index === 0}
                                variant="outlined"
                                onClick={() => {
                                  arrayHelpers.remove(index);
                                }}
                              >
                                <TrashIcon />
                              </Button>
                            </Stack>
                          ))}
                        </Stack>
                      </RowStyle1>
                    )}
                  />
                )}
              </Stack>
            </>
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
                Save Rules
              </Button>
            </Stack>
          </BoxStyle>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
