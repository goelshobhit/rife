import { useEffect } from 'react';
import { TextField, Grid, MenuItem } from '@material-ui/core';

import map from 'lodash/map';

// redux
import { useDispatch, useSelector } from '../../../redux/store';
import { getSelectedBrandBonus, getBonusSet } from '../../../redux/slices/tasks';

// @types
import { taskBrandsState } from '../../../@types/task';

export default function BrandBonusSection({
  selectedBrand,
  values,
  touched,
  errors,
  setFieldValue
}: any) {
  const dispatch = useDispatch();
  const { brands } = useSelector((state: { task: taskBrandsState }) => state.task);

  useEffect(() => {
    dispatch(getBonusSet());
  }, [dispatch, selectedBrand]);

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
          {map(brands, (item) => (
            <MenuItem value={item.cr_co_id} key={item.cr_co_name}>
              {item.cr_co_name}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
    </Grid>
  );
}
