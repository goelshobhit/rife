import { useEffect, useState } from 'react';
import moment from 'moment';
import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { styled } from '@material-ui/core/styles';
import get from 'lodash/get';
// material
import { Typography, Pagination, Button, Link } from '@material-ui/core';

import { DataGrid, GridColDef, GridToolbar } from '@material-ui/data-grid';
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
      id: row?.bonus_tickets_rules_id,
      bonus_item_name: row?.['bonus_ticket_rule.Bonus Ticket Rule Name'],
      bonusTicketWorks: row?.bonus_tickets_how_it_works,
      bonusTicketCashOutRules: row?.bonus_tickets_cashout_rules,
      createdAt: moment(row?.bonus_tickets_rules_created_at).format('MMM DD, YYYY'),
      updatedAt: moment(row?.bonus_tickets_rules_updated_at).format('MMM DD, YYYY')
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
        <TextCellWrapperLink variant="subtitle1">
          {get(params, 'row.bonus_item_name', '-')}
        </TextCellWrapperLink>
      )
    },
    {
      field: 'bonusTicketWorks',
      headerName: 'Bonus Ticket Works',
      width: 300,
      renderCell: (params: { row: any }) => {
        const data: string = params.row.bonusTicketWorks ? params.row.bonusTicketWorks : '';
        return <p dangerouslySetInnerHTML={{ __html: data }} />;
      }
    },
    {
      field: 'bonusTicketCashOutRules',
      headerName: 'Bonus Ticket Cashout Rules',
      width: 300,
      renderCell: (params: { row: any }) => {
        const data: string = params.row.bonusTicketCashOutRules
          ? params.row.bonusTicketCashOutRules
          : '';
        return <p dangerouslySetInnerHTML={{ __html: data }} />;
      }
    },
    {
      field: 'createdAt',
      headerName: 'Created At',
      width: 300
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
