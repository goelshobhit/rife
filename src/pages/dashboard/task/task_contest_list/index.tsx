import { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { styled } from '@material-ui/core/styles';
import get from 'lodash/get';
import { toNumber } from 'lodash';
import moment from 'moment';
// material
import {
  Typography,
  Box,
  Pagination,
  Button,
  Grid,
  Skeleton,
  Link,
  Stack,
  LinearProgress
} from '@material-ui/core';

import {
  useGridSlotComponentProps,
  DataGrid,
  GridColDef,
  GridToolbar
} from '@material-ui/data-grid';
// utils

// lodash

// redux
import { useDispatch, useSelector } from '../../../../redux/store';
// @types
import { taskBrandsState } from '../../../../@types/task';
import { getContestListTask } from '../../../../redux/slices/tasks';
// components
import { MotionContainer } from '../../../../components/animate';
import getVariant from '../../../components-overview/extra/animate/getVariant';
import Label from '../../../../components/Label';

import { fPercent } from '../../../../utils/formatNumber';

const TextCellWrapperLink = styled(Typography)(() => ({
  fontSize: 14,
  color: '#00BAEF',
  textDecoration: 'underline'
}));

const BrandRowWrapper = styled('div')(() => ({
  marginBottom: 32,
  padding: 20,
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: '100%'
}));

const renderColorStatusCode = (status: any) => {
  switch (status) {
    case 0:
      return 'warning';
    case 1:
      return 'success';
    case 2:
      return 'success';
    case 3:
      return 'primary';
    case 4:
      return 'error';
    case 5:
      return 'error';
    default:
      return 'primary';
  }
};

const renderTask = (status: any) => {
  switch (status) {
    case 0:
      return 'Waiting for approval';
    case 1:
      return 'Approved';
    case 2:
      return 'Published';
    case 3:
      return 'Draft';
    case 4:
      return 'Closed';
    case 5:
      return 'Cancelled';
    default:
      return 'Unknown';
  }
};

export default function BonusList() {
  const dispatch = useDispatch();
  const { loading, taskList, taskListTotal } = useSelector(
    (state: { task: taskBrandsState }) => state.task
  );
  const [page, setPageNo] = useState(1);

  useEffect(() => {
    dispatch(getContestListTask({ brandPageNo: page }));
  }, [dispatch, page]);

  const SkeletonLoad = () => (
    <Grid container spacing={3} sx={{ mt: 2 }}>
      {[...Array(4)].map((_, index) => (
        <Grid item xs={12} md={3} key={index}>
          <Skeleton variant="rectangular" width="100%" sx={{ height: 200, borderRadius: 2 }} />
          <Box sx={{ display: 'flex', mt: 1.5 }}>
            <Skeleton variant="circular" sx={{ width: 40, height: 40 }} />
            <Skeleton variant="text" sx={{ mx: 1, flexGrow: 1 }} />
          </Box>
        </Grid>
      ))}
    </Grid>
  );

  const mapDataToTargetStructure = (rows: any) =>
    rows.map((row: any, index: any) => ({
      id: index,
      taskName: get(row, 'task_data.ta_name', '-'),
      brandName: get(row, 'task_data.brand.brand_name'),
      Tier: 0,
      campaign: 0,
      taskType: get(row, 'task_data.media_type') === '1' ? "Video Contest" : "Image Contest",
      tokenProgress: 0,
      targetReachProgress: 0,
      budget: get(row, 'task_data.ta_total_available'),
      impressions: 0,
      reach: 0,
      engagementRate: 0,
      tokensDispensed:
        get(row, 'task_data.ta_token_budget') - get(row, 'task_data.ta_remaining_budget', 0),
      starsDispensed: get(row, 'task_data.ta_stars_per_user'),
      tickets: get(row, 'task_data.tickets_per_task_submissions'),
      bonusSet: get(row, 'task_data.bonus_set_id'),
      tokensAdded: get(row, 'task_data.ta_token_budget'),
      ghostFollowers: 0,
      viewers: 0,
      inComplete: 0,
      completed: 0,
      daysActive: moment(get(row, 'task_data.ta_end_date')).diff(
        moment(get(row, 'task_data.ta_start_date')),
        'days'
      ),
      endDate: moment(get(row, 'task_data.ta_end_date')).format('MMM DD, YYYY'),
      state: get(row, 'task_status')
    }));

  const columns: GridColDef[] = [
    {
      field: 'id',
      hide: true
    },
    {
      field: 'task_name',
      headerName: 'Task Name',
      width: 300,
      renderCell: (params: any) => (
        <Link
          to={`/brand/${params.row.id}`}
          key={params.row.id}
          variant="body2"
          component={RouterLink}
        >
          <TextCellWrapperLink variant="subtitle1">{params.row.taskName}</TextCellWrapperLink>
        </Link>
      )
    },
    {
      field: 'brandName',
      headerName: 'Brand Name',
      width: 200
    },
    {
      field: 'Tier',
      headerName: 'Tier',
      width: 200
    },
    {
      field: 'campaign',
      headerName: 'Campaign',
      width: 200
    },
    {
      field: 'taskType',
      headerName: 'Type',
      width: 200
    },
    {
      field: 'tokenProgress',
      headerName: 'Token Progress',
      width: 200,
      renderCell: (params) => {
        const value = Math.floor(Math.random() * 100) + 25;
        return (
          <Stack direction="column" alignItems="center">
            <Stack direction="row" alignItems="center" sx={{ px: 2, width: 1, height: 1 }}>
              <LinearProgress
                value={value}
                variant="determinate"
                color={
                  (value < 30 && 'error') || (value > 30 && value < 70 && 'warning') || 'primary'
                }
                sx={{ width: 100, height: 6 }}
              />
              <Typography variant="body1" sx={{ width: 90 }}>
                {' '}
                {fPercent(value)}
              </Typography>
            </Stack>
            <Typography variant="caption" sx={{ width: 90 }}>
              4555 / 5000
            </Typography>
          </Stack>
        );
      }
    },
    {
      field: 'targetReachProgress',
      headerName: 'Target Reach Progress',
      width: 200,
      renderCell: (params) => {
        const value = Math.floor(Math.random() * 100) + 25;
        return (
          <Stack direction="column" alignItems="center">
            <Stack direction="row" alignItems="center" sx={{ px: 2, width: 1, height: 1 }}>
              <LinearProgress
                value={value}
                variant="determinate"
                color={
                  (value < 30 && 'error') || (value > 30 && value < 70 && 'warning') || 'primary'
                }
                sx={{ width: 100, height: 6 }}
              />
              <Typography variant="body1" sx={{ width: 90 }}>
                {' '}
                {fPercent(value)}
              </Typography>
            </Stack>
            <Typography variant="caption" sx={{ width: 90 }}>
              4555 / 5000
            </Typography>
          </Stack>
        );
      }
    },
    {
      field: 'budget',
      headerName: 'Budget',
      width: 200
    },
    {
      field: 'impressions',
      headerName: 'Impressions',
      width: 200
    },
    {
      field: 'reach',
      headerName: 'Reach',
      width: 200
    },
    {
      field: 'engagementRate',
      headerName: 'Engagement Rate',
      width: 200
    },
    {
      field: 'tokensDispensed',
      headerName: 'Tokens Dispensed',
      width: 200
    },
    {
      field: 'starsDispensed',
      headerName: 'Stars Dispensed',
      width: 200
    },
    {
      field: 'tickets',
      headerName: 'Tickets',
      width: 200
    },
    {
      field: 'bonusSet',
      headerName: 'Bonus Set',
      width: 200
    },
    {
      field: 'tokensAdded',
      headerName: 'Tokens Added',
      width: 200
    },
    {
      field: 'ghostFollowers',
      headerName: 'Ghost Followers',
      width: 200
    },
    {
      field: 'viewers',
      headerName: 'Viewers',
      width: 200
    },
    {
      field: 'inComplete',
      headerName: 'Incomplete',
      width: 200
    },
    {
      field: 'completed',
      headerName: 'Completed',
      width: 200
    },
    {
      field: 'daysActive',
      headerName: 'Days Active',
      width: 200
    },
    {
      field: 'endDate',
      headerName: 'End Date',
      width: 200
    },
    {
      field: 'state',
      headerName: 'State',
      width: 200,
      renderCell: (params) => {
        const getStatus = params.row.state;
        return (
          <Label
            color={renderColorStatusCode(toNumber(params.row.state))}
            sx={{ textTransform: 'capitalize', mx: 'auto' }}
          >
            {renderTask(toNumber(params.row.state))}
          </Label>
        );
      }
    }
  ];

  const CustomPagination = () => {
    const { state, apiRef } = useGridSlotComponentProps();

    return (
      <Pagination
        color="primary"
        count={Math.ceil(taskListTotal / 10)}
        page={page}
        onChange={(event, value) => {
          setPageNo(value);
          dispatch(getContestListTask({ brandPageNo: value }));
        }}
      />
    );
  };

  const navigate = useNavigate();
  return (
    <>
      <BrandRowWrapper>
        <MotionContainer
          open
          initial="initial"
          component={motion.h4}
          sx={{ typography: 'h4', display: 'flex', overflow: 'hidden' }}
        >
          {'Task Contest List'.split('').map((letter, index) => (
            <motion.span key={index} variants={getVariant('slideInUp')}>
              {letter}
            </motion.span>
          ))}
        </MotionContainer>
        <Button
          variant="contained"
          color="primary"
          className="button"
          onClick={() => navigate("/dashboard/task/create")}
        >
          {' '}
          + Add New Task
        </Button>
      </BrandRowWrapper>

      {loading && <SkeletonLoad />}
      {!loading && (
        <DataGrid
          rows={mapDataToTargetStructure(taskList)}
          columns={columns}
          pagination
          pageSize={10}
          components={{
            Toolbar: GridToolbar,
            Pagination: CustomPagination
          }}
        />
      )}
    </>
  );
}
