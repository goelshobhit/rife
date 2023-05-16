import { useEffect, useState } from 'react';
import moment from 'moment';
import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { styled } from '@material-ui/core/styles';
import get from 'lodash/get';
// material
import { Typography, Pagination, Button, Link } from '@material-ui/core';

import {
  useGridSlotComponentProps,
  DataGrid,
  GridColDef,
  GridToolbar
} from '@material-ui/data-grid';
// utils

// lodash
import { isEmpty } from 'lodash';
// redux
import { useDispatch, useSelector } from '../../../../redux/store';
import { getBonusRuleList } from '../../../../redux/slices/bonus';
// @types
import { bonusState } from '../../../../@types/bonus';

// components
import { MotionContainer } from '../../../../components/animate';
import getVariant from '../../../components-overview/extra/animate/getVariant';
import LoadingScreen from '../../../../components/LoadingScreen';
import Label from '../../../../components/Label';

const TextCellWrapperLink = styled(Typography)(() => ({
  fontSize: 14,
  color: '#00BAEF',
  textDecoration: 'underline'
}));

const BrandRowWrapper = styled('div')(() => ({
  paddingBottom: 48,
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: '100%'
}));

const renderColorStatusCode = (index: any) => {
  switch (index) {
    case 0:
      return 'success';
    case 1:
      return 'error';
    default:
      return 'warning';
  }
};
export default function BonusRuleList() {
  const dispatch = useDispatch();
  const { loading, bonusRuleList } = useSelector((state: { bonus: bonusState }) => state.bonus);
  const [page, setPageNo] = useState(1);

  useEffect(() => {
    dispatch(getBonusRuleList({ bonusPageNo: page }));
  }, [dispatch, page]);

  const SkeletonLoad = () => <LoadingScreen />;

  const mapDataToTargetStructure = (rows: any) =>
    rows.map((row: any) => ({
      id: row.bonus_ticket_rules_id,
      bonus_item_brand_id: row.bonus_ticket_rules_id,
      bonus_item_name: row.bonus_ticket_rule_name,
      bonusTicketWorks: 0,
      bonusTicketCashOutRules: 0,
      createdAt: moment(row.bonus_ticket_rules_created_at).format('MMM DD, YYYY'),
      updatedAt: moment(row.bonus_ticket_rules_created_at).format('MMM DD, YYYY'),
      Status: isEmpty(row.bonus_ticket_rule_details) ? 1 : 0,
      brand: '-'
    }));

  const columns: GridColDef[] = [
    {
      field: 'id'
    },
    {
      field: 'bonus_item_name',
      headerName: 'Bonus Ticket Rule Name',
      width: 300,
      renderCell: (params: any) => (
        <Link
          to={`/brand/${params.row.id}`}
          key={params.row.id}
          variant="body2"
          component={RouterLink}
        >
          <TextCellWrapperLink variant="subtitle1">
            {get(params, 'row.bonus_item_name', '-')}
          </TextCellWrapperLink>
        </Link>
      )
    },
    {
      field: 'brand',
      headerName: 'Brand',
      width: 300
    },
    {
      field: 'Status',
      headerName: 'Status',
      width: 300,
      renderCell: (params) => (
        <Label
          color={renderColorStatusCode(params.row.Status)}
          sx={{ textTransform: 'capitalize', mx: 'auto' }}
        >
          {params.row.Status === 0 ? 'Active' : 'Inactive'}
        </Label>
      )
    }
  ];

  const CustomPagination = () => (
    <Pagination
      color="primary"
      count={Math.ceil(get(bonusRuleList, 'totalRecords') / 10)}
      page={page}
      onChange={(event, value) => {
        setPageNo(value);
        dispatch(getBonusRuleList({ bonusPageNo: value }));
      }}
    />
  );

  return (
    <>
      <BrandRowWrapper>
        <MotionContainer
          open
          initial="initial"
          component={motion.h4}
          sx={{ typography: 'h4', display: 'flex', overflow: 'hidden' }}
        >
          <motion.span key={1} variants={getVariant('slideInUp')}>
            Bonus Ticket Rules
          </motion.span>
        </MotionContainer>
        <Button
          variant="contained"
          color="primary"
          className="button"
          href="/dashboard/bonus/rule/add"
        >
          + Add New Bonus Rules
        </Button>
      </BrandRowWrapper>

      {loading && <SkeletonLoad />}
      {!loading && (
        <DataGrid
          autoHeight
          rows={mapDataToTargetStructure(get(bonusRuleList, 'data', []))}
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
