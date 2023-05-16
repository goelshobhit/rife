import { useEffect } from 'react';
import { TextField, Grid, MenuItem, Button } from '@material-ui/core';

import { styled } from '@material-ui/core/styles';
import map from 'lodash/map';
import { includes } from 'lodash';
import get from 'lodash/get';
// redux
import { useDispatch, useSelector } from '../../../redux/store';
import { getSelectedBrandBonus, getBonusSet } from '../../../redux/slices/tasks';

// @types
import { taskBrandsState } from '../../../@types/task';

const ButtonStyle = styled(Button)(() => ({
  width: '186px',
  height: '40px',
  background: '#00BAEF',
  /* Shadows/A. Light Mode/z8 */

  boxShadow:
    '0px 2px 4px rgba(164, 52, 203, 0.08), inset -2px -2px 6px rgba(164, 52, 203, 0.12), inset -1px -1px 4px rgba(164, 52, 203, 0.08)',
  borderRadius: '50px',
  color: '#fff',
  borderColor: '#fff',
  marginBottom: 32,
}));

export default function BonusSection({
  selectedBrand,
  values,
  touched,
  errors,
  handleChange,
  setFieldValue
}: any) {
  const dispatch = useDispatch();
  const { selectedBrandBonus, bonusSet } = useSelector(
    (state: { task: taskBrandsState }) => state.task
  );

  console.log(bonusSet);

  useEffect(() => {
    dispatch(getBonusSet());
    dispatch(getSelectedBrandBonus({ brandId: selectedBrand.cr_co_id }));
  }, [dispatch, selectedBrand]);

  const RowStyle = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'flex-end'
  }));

  return (
    <Grid container>
      <Grid item xs={12}>
        <RowStyle>
          <ButtonStyle variant="outlined" disabled aria-disabled>
            + Add New Bonus
          </ButtonStyle>
        </RowStyle>
        <TextField
          style={{ width: '100%', margin: 12 }}
          name="select_bonus_set"
          id="select_bonus_set"
          select
          label="Bonus Set"
          onChange={(e) => setFieldValue('select_bonus_set', e.target.value)}
          value={values.select_bonus_set}
          error={Boolean(touched.select_bonus_set && errors.select_bonus_set)}
          helperText={touched.select_bonus_set && errors.select_bonus_set}
          InputLabelProps={{
            shrink: true
          }}
        >
          {map(['Bonus Set', 'Single Prize', 'No Bonus'], (item, index) => (
            <MenuItem value={item} key={item}>
              {item}
            </MenuItem>
          ))}
        </TextField>
        {includes(['Bonus Set'], values.select_bonus_set) && (
          <RowStyle>
            <TextField
              style={{ width: '100%', margin: 12 }}
              name="bonus_set_brand_id"
              id="bonus_set_brand_id"
              select
              label="Bonus Name"
              onChange={(e) => setFieldValue('bonus_set_brand_id', e.target.value)}
              value={values.bonus_set_brand_id}
              error={Boolean(touched.bonus_set_brand_id && errors.bonus_set_brand_id)}
              helperText={touched.bonus_set_brand_id && errors.bonus_set_brand_id}
              InputLabelProps={{
                shrink: true
              }}
            >
              {map(bonusSet, (item: any, index: any) => (
                <MenuItem value={item.bonus_set_brand_id} key={item.bonus_set_brand_id}>
                  {item.bonus_set_item_name}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              style={{ width: '100%', margin: 12 }}
              name="bonus_item_name"
              id="bonus_item_name"
              label="Tickets per entry"
              value={get(selectedBrandBonus, 'bonus_item_qty')}
              error={Boolean(touched.bonus_item_qty && errors.bonus_item_qty)}
              helperText={touched.bonus_item_qty && errors.bonus_item_qty}
              InputLabelProps={{
                shrink: true
              }}
            />
          </RowStyle>
        )}
        {includes(['Single Prize'], values.select_bonus_set) && (
          <RowStyle>
            <TextField
              style={{ width: '100%', margin: 12 }}
              name="bonus_item_name"
              id="bonus_item_name"
              label="Bonus Name"
              value={get(selectedBrandBonus, 'bonus_item_name')}
              error={Boolean(touched.bonus_item_name && errors.bonus_item_name)}
              helperText={touched.bonus_item_name && errors.bonus_item_name}
              InputLabelProps={{
                shrink: true
              }}
            />
          </RowStyle>
        )}
      </Grid>
    </Grid>
  );
}
