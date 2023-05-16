import { useEffect } from 'react';
import round from 'lodash/round';
import map from 'lodash/map';
import get from 'lodash/get';
import { TextField, Grid, Typography, Button } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import { styled } from '@material-ui/core/styles';
import { isEmpty, filter, includes } from 'lodash';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

// redux
import { useDispatch, useSelector } from '../../../redux/store';
import { getRewards } from '../../../redux/slices/tasks';

// @types
import { taskBrandsState } from '../../../@types/task';

const TokenStyle = styled(Typography)(({ theme }) => ({
  color: '#A434CB',
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  justifyContent: 'flex-start',
  fontSize: 12
}));

const RowStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  justifyContent: 'flex-end'
}));

const TokenUserDescStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  justifyContent: 'flex-start',
  fontSize: 12,
  color: '#979797'
}));

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
  marginBottom: 32
}));

export default function RewardsSection({
  selectedBrand,
  touched,
  errors,
  handleChange,
  values,
  isWatchType = false,
  isContestType = false,
  isStarType = false,
  isAll = false,
  item
}: any) {
  const dispatch = useDispatch();
  const { rewardCenter } = useSelector((state: { task: taskBrandsState }) => state.task);

  useEffect(() => {
    dispatch(getRewards());
  }, [dispatch]);

  const rewardsWithOutCenterDistinct = filter(rewardCenter, (item: any) =>
    isEmpty(item.reward_center_dists)
  );
  const rewardsWithCenterDistinct = filter(
    rewardCenter,
    (item: any) => !isEmpty(item.reward_center_dists)
  );

  return (
    <Grid container>
      <RowStyle>
        <ButtonStyle
          variant="outlined"
          aria-disabled
          disabled={!isEmpty(get(selectedBrand, 'cr_co_total_token'))}
        >
          + Add New Reward
        </ButtonStyle>
      </RowStyle>
      {isAll && (
        <>
          <Grid item sm={6}>
            <TextField
              fullWidth
              name="total_token_budget"
              type="number"
              label="Total Token Budget"
              disabled
              value={get(selectedBrand, 'cr_co_total_token')}
              InputProps={{
                inputProps: {
                  max: get(selectedBrand, 'cr_co_total_token'),
                  min: 0
                }
              }}
              InputLabelProps={{
                shrink: true
              }}
              error={Boolean(touched.total_token_budget && errors.total_token_budget)}
              helperText={touched.total_token_budget && errors.total_token_budget}
            />
            <TokenStyle>
              {get(selectedBrand, 'cr_co_total_token') - get(selectedBrand, 'cr_co_token_spent')}{' '}
              Tokens Available, View Details
            </TokenStyle>
          </Grid>
          <Grid item sm={12}>
            <TextField
              style={{ width: '100%', margin: 12 }}
              name="reward_type"
              id="reward_type"
              select
              label="Reward Present Type"
              onChange={handleChange}
              error={Boolean(touched.reward_type && errors.reward_type)}
              helperText={touched.reward_type && errors.reward_type}
              InputLabelProps={{
                shrink: true
              }}
            >
              {map(['Tokens per user', 'Presents', 'Chests', 'Contest', 'Stars'], (item, index) => (
                <MenuItem value={item} key={item}>
                  {item}
                </MenuItem>
              ))}
            </TextField>

            {includes(['Presents'], values.reward_type) && (
              <TextField
                style={{ width: '100%', margin: 12 }}
                name="reward_center_id"
                id="reward_type"
                select
                label="Reward Present Type"
                onChange={handleChange}
                error={Boolean(touched.reward_type && errors.reward_type)}
                helperText={touched.reward_type && errors.reward_type}
                InputLabelProps={{
                  shrink: true
                }}
              >
                {map(rewardsWithOutCenterDistinct, (item, index) => (
                  <MenuItem value={item.reward_center_id} key={item}>
                    {item.reward_center_name}
                  </MenuItem>
                ))}
              </TextField>
            )}

            {includes(['Chests'], values.reward_type) && (
              <TextField
                style={{ width: '100%', margin: 12 }}
                name="reward_center_id"
                id="reward_type"
                select
                label="Reward Chest Type"
                onChange={handleChange}
                error={Boolean(touched.reward_type && errors.reward_type)}
                helperText={touched.reward_type && errors.reward_type}
                InputLabelProps={{
                  shrink: true
                }}
              >
                {map(rewardsWithCenterDistinct, (item, index) => (
                  <MenuItem value={item.reward_center_id} key={item}>
                    {item.reward_center_name}
                  </MenuItem>
                ))}
              </TextField>
            )}
            {includes(['Tokens per user', 'Contest'], values.reward_type) && (
              <Grid container sm={12} spacing={6}>
                <Grid item sm={6}>
                  <TextField
                    fullWidth
                    name="add_tokens_per_user"
                    type="number"
                    label="Add tokens per user"
                    onChange={handleChange}
                    value={values.add_tokens_per_user}
                    error={Boolean(touched.add_tokens_per_user && errors.add_tokens_per_user)}
                    helperText={touched.add_tokens_per_user && errors.add_tokens_per_user}
                    InputLabelProps={{
                      shrink: true
                    }}
                  />
                  <TokenUserDescStyle>
                    {' '}
                    # Estimated Token Per User:{' '}
                    {round(
                      get(selectedBrand, 'cr_co_total_token') / get(values, 'add_tokens_per_user'),
                      0
                    )}
                  </TokenUserDescStyle>
                  {includes(['Tokens per user'], values.reward_type) && (
                    <FormControlLabel
                      control={<Switch name="checkedB" color="primary" />}
                      label="Continue after token spent"
                    />
                  )}
                </Grid>
                <Grid item sm={6}>
                  <TextField
                    style={{ width: '100%', margin: 12 }}
                    name="star_per_user"
                    type="number"
                    label="Star per user"
                    onChange={handleChange}
                    value={values.star_per_user}
                    error={Boolean(touched.star_per_user && errors.star_per_user)}
                    helperText={touched.star_per_user && errors.star_per_user}
                    InputLabelProps={{
                      shrink: true
                    }}
                  />
                </Grid>
              </Grid>
            )}
          </Grid>
        </>
      )}
      {isWatchType && (
        <>
          <Grid container spacing={6}>
            <Grid item sm={6}>
              <TextField
                fullWidth
                name="total_token_budget"
                type="number"
                label="Total Token Budget"
                disabled
                value={get(selectedBrand, 'cr_co_total_token')}
                InputProps={{
                  inputProps: {
                    max: get(selectedBrand, 'cr_co_total_token'),
                    min: 0
                  }
                }}
                InputLabelProps={{
                  shrink: true
                }}
                error={Boolean(touched.total_token_budget && errors.total_token_budget)}
                helperText={touched.total_token_budget && errors.total_token_budget}
              />
              <TokenStyle>
                {get(selectedBrand, 'cr_co_total_token', 0) -
                  get(selectedBrand, 'cr_co_token_spent', 0)}{' '}
                Tokens Available, View Details
              </TokenStyle>
            </Grid>
            <Grid item sm={6}>
              <TextField
                fullWidth
                name="reward_contest_type"
                type="text"
                label="Reward Type"
                disabled
                value="Contest"
                InputLabelProps={{
                  shrink: true
                }}
                error={Boolean(touched.total_token_budget && errors.total_token_budget)}
                helperText={touched.total_token_budget && errors.total_token_budget}
              />
            </Grid>
            <Grid item sm={6}>
              <TextField
                fullWidth
                name="star_per_user"
                type="number"
                label="Star per user"
                onChange={handleChange}
                value={values.star_per_user}
                error={Boolean(touched.star_per_user && errors.star_per_user)}
                helperText={touched.star_per_user && errors.star_per_user}
                InputLabelProps={{
                  shrink: true
                }}
              />
            </Grid>

            <Grid item sm={6}>
              <TextField
                fullWidth
                name="add_tokens_per_user"
                type="number"
                label="Add tokens per user"
                onChange={handleChange}
                value={values.add_tokens_per_user}
                error={Boolean(touched.add_tokens_per_user && errors.add_tokens_per_user)}
                helperText={touched.add_tokens_per_user && errors.add_tokens_per_user}
                InputLabelProps={{
                  shrink: true
                }}
              />
              <TokenUserDescStyle>
                {' '}
                Estimated Token Per User:{' '}
                {round(
                  get(selectedBrand, 'cr_co_total_token', 0) /
                    get(values, 'add_tokens_per_user', 0),
                  0
                )}
              </TokenUserDescStyle>
            </Grid>
          </Grid>
        </>
      )}
      {isStarType && (
        <>
          <Grid container spacing={6}>
            <Grid item sm={6}>
              <TextField
                fullWidth
                name="total_token_budget"
                type="number"
                label="Total Token Budget"
                disabled
                value={get(selectedBrand, 'cr_co_total_token')}
                InputProps={{
                  inputProps: {
                    max: get(selectedBrand, 'cr_co_total_token'),
                    min: 0
                  }
                }}
                InputLabelProps={{
                  shrink: true
                }}
                error={Boolean(touched.total_token_budget && errors.total_token_budget)}
                helperText={touched.total_token_budget && errors.total_token_budget}
              />
              <TokenStyle>
                {get(selectedBrand, 'cr_co_total_token', 0) -
                  get(selectedBrand, 'cr_co_token_spent', 0)}{' '}
                Tokens Available, View Details
              </TokenStyle>
            </Grid>
          </Grid>
          <Grid container spacing={6}>
            <Grid item sm={6}>
              <TextField
                fullWidth
                name="reward_contest_type"
                type="text"
                label="Reward Type"
                disabled
                value="Stars Only"
                InputLabelProps={{
                  shrink: true
                }}
                error={Boolean(touched.total_token_budget && errors.total_token_budget)}
                helperText={touched.total_token_budget && errors.total_token_budget}
              />
            </Grid>
            <Grid item sm={6}>
              <TextField
                fullWidth
                name="star_per_user"
                type="number"
                label="Star per user"
                onChange={handleChange}
                value={values.star_per_user}
                error={Boolean(touched.star_per_user && errors.star_per_user)}
                helperText={touched.star_per_user && errors.star_per_user}
                InputLabelProps={{
                  shrink: true
                }}
              />
              <TokenUserDescStyle>
                {' '}
                Estimated User:{' '}
                {round(
                  get(selectedBrand, 'cr_co_total_token', 0) / get(values, 'star_per_user', 0),
                  0
                )}
              </TokenUserDescStyle>
            </Grid>
          </Grid>
        </>
      )}
      {isContestType && (
        <>
          <Grid container spacing={3}>
            <Grid item sm={12}>
              <TextField
                fullWidth
                name="total_token_budget"
                type="number"
                label="Total Token Budget"
                disabled
                value={get(selectedBrand, 'cr_co_total_token')}
                InputProps={{
                  inputProps: {
                    max: get(selectedBrand, 'cr_co_total_token'),
                    min: 0
                  }
                }}
                InputLabelProps={{
                  shrink: true
                }}
                error={Boolean(touched.total_token_budget && errors.total_token_budget)}
                helperText={touched.total_token_budget && errors.total_token_budget}
              />
              <TokenStyle>
                {get(selectedBrand, 'cr_co_total_token', 0) -
                  get(selectedBrand, 'cr_co_token_spent', 0)}{' '}
                Tokens Available, View Details
              </TokenStyle>
            </Grid>

            <Grid item sm={6}>
              <TextField
                fullWidth
                name="reward_contest_type"
                type="text"
                label="Reward Type"
                disabled
                value="Contest"
                InputLabelProps={{
                  shrink: true
                }}
                error={Boolean(touched.total_token_budget && errors.total_token_budget)}
                helperText={touched.total_token_budget && errors.total_token_budget}
              />
            </Grid>
            <Grid item sm={6}>
              <TextField
                fullWidth
                name="star_per_user"
                type="number"
                label="Star per user"
                onChange={handleChange}
                value={values.star_per_user}
                error={Boolean(touched.star_per_user && errors.star_per_user)}
                helperText={touched.star_per_user && errors.star_per_user}
                InputLabelProps={{
                  shrink: true
                }}
              />
            </Grid>
            <Grid item sm={6}>
              <TextField
                fullWidth
                name="winner_token"
                type="number"
                label="Winners token"
                onChange={handleChange}
                value={values.winner_token}
                error={Boolean(touched.winner_token && errors.winner_token)}
                helperText={touched.winner_token && errors.winner_token}
                InputLabelProps={{
                  shrink: true
                }}
              />
            </Grid>
          </Grid>
        </>
      )}
    </Grid>
  );
}
