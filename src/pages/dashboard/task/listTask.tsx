import { useEffect, useState } from 'react';
import faker from 'faker';
import { sample, map, concat, get, toNumber } from 'lodash';
import { Icon } from '@iconify/react';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
import { styled } from '@material-ui/core/styles';
// material
import { Box, Rating, Pagination, Typography, Button } from '@material-ui/core';
import {
  DataGrid,
  GridColDef,
  GridToolbar,
  useGridSlotComponentProps,
  GridFilterInputValueProps
} from '@material-ui/data-grid';
// utils
import { generateTableHeader } from '../../../utils/mapping/taskList';
// components
import { TaskMoreMenu } from '../../../components/_dashboard/user/list';
import Label from '../../../components/Label';
// redux
import { useDispatch, useSelector } from '../../../redux/store';
import { getListTask } from '../../../redux/slices/tasks';

// @types
import { taskBrandsState } from '../../../@types/task';

// ----------------------------------------------------------------------

export default function TaskBrand() {
  const dispatch = useDispatch();
  const { taskList, taskListTotal } = useSelector((state: { task: taskBrandsState }) => state.task);
  const [page, setPage] = useState(1);
  useEffect(() => {
    dispatch(getListTask({ brandPageNo: 1 }));
  }, [dispatch]);

  const CustomPagination = () => {
    const { state, apiRef } = useGridSlotComponentProps();
    return (
      <Pagination
        color="primary"
        count={Math.ceil(taskListTotal / 10)}
        page={page}
        onChange={(event, value) => {
          setPage(value);
          dispatch(getListTask({ brandPageNo: value }));
        }}
      />
    );
  };

  const renderColorStatusCode = (status: any) => {
    switch (status) {
      case 1:
        return 'warning';
      case 3:
        return 'success';
      case 4:
        return 'success';
      case 2:
        return 'error';
      default:
        return 'primary';
    }
  };

  const renderColorStatus = (status: any) => {
    switch (status) {
      case 1:
        return 'Pending';
      case 2:
        return 'Ended';
      case 3:
        return 'Saved';
      case 4:
        return 'Active';
      default:
        return 'Unknown';
    }
  };

  const renderTask = (status: any) => {
    switch (status) {
      case 5:
        return 'Video Response';
      case 3:
        return 'Sound';
      case 2:
        return 'Image';
      default:
        return 'Unknown';
    }
  };

  const renderColumns = () => {
    const generatedColumns = generateTableHeader(taskList[0]);
    const columns: GridColDef[] = generatedColumns;

    columns.push({
      field: 'Type',
      headerName: 'Type',
      width: 120,
      renderCell: (params) => {
        const getStatus = get(params, 'row')['task_data.ta_type'];
        return (
          <Label
            color={renderColorStatusCode(getStatus)}
            sx={{ textTransform: 'capitalize', mx: 'auto' }}
          >
            {renderTask(toNumber(getStatus))}
          </Label>
        );
      }
    });

    columns.push({
      field: 'status',
      headerName: 'Status',
      width: 120,
      renderCell: (params) => {
        const getStatus = get(params, 'row.task_status');
        return (
          <Label
            color={renderColorStatusCode(getStatus)}
            sx={{ textTransform: 'capitalize', mx: 'auto' }}
          >
            {renderColorStatus(getStatus)}
          </Label>
        );
      }
    });
    columns.push({
      field: 'action',
      headerName: ' ',
      flex: 0,
      sortable: false,
      hide: false,
      renderCell: (params) => {
        const selectedID = params.row.id;
        const handleClick = () => {
          // console.log('selectedID', selectedID);
        };

        return <TaskMoreMenu id={Math.random().toString()} />;
      }
    });
    return columns;
  };

  const renderRows = () =>
    map(taskList, (item: any, index: number) => {
      const data = {
        id: index,
        ...item
      };
      return data;
    });

  const RowStyle = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width:'100%',
    marginBottom: 40,
  }));

  const ButtonStyle = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    borderRadius: 23,
    padding: '6px 16px 6px 16px',
    color: '#fff',
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
    }
  }));

  return (
    <>
      <RowStyle>
        <Typography variant="h4">Task List</Typography>
        <ButtonStyle  href="/dashboard/task/create">+ New Task</ButtonStyle>
      </RowStyle>
      <DataGrid
        rows={renderRows()}
        columns={renderColumns()}
        pagination
        pageSize={10}
        components={{
          Toolbar: GridToolbar,
          Pagination: CustomPagination
        }}
      />
    </>
  );
}
