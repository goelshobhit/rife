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
  borderColor: '#fff'
}));

export default function BrandBonusSection({
  selectedBrand,
  values,
  touched,
  errors,
  handleChange,
  setFieldValue
}: any) {
  const dispatch = useDispatch();
  const { brands, bonusSet } = useSelector(
    (state: { task: taskBrandsState }) => state.task
  );


  useEffect(() => {
    dispatch(getBonusSet());
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
        <TextField
          style={{ width: '100%', margin: 12 }}
          name="select_brand_bonus_set"
          id="select_brand_bonus_set"
          select
          label="Brand Bonus Set"
          onChange={(e) => setFieldValue('select_brand_bonus_set', e.target.value)}
          value={values.select_brand_bonus_set}
          error={Boolean(touched.select_brand_bonus_set && errors.select_brand_bonus_set)}
          helperText={touched.select_brand_bonus_set && errors.select_brand_bonus_set}
          InputLabelProps={{
            shrink: true
          }}
        >
          {map(brands, (item, index) => (
            <MenuItem value={item.cr_co_id} key={item.cr_co_name}>
              {item.cr_co_name}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
    </Grid>
  );
}
