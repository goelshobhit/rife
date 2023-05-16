// ----------------------------------------------------------------------
import keys from 'lodash/keys';
import map from 'lodash/map';
import concat from 'lodash/concat';
import { includes, isEqual } from 'lodash';

const handleHide = (item: any) => {
  if (includes(['cr_co_id', 'cr_co_name', 'cr_co_token_spent', 'cr_co_total_token'], item)) {
    return false;
  }
  return true;
};

const handleDisplayName = (item: any) => {
  if (isEqual(item, 'cr_co_id')) {
    return 'Id';
  }
  if (isEqual(item, 'cr_co_name')) {
    return 'Brand';
  }
  if (isEqual(item, 'cr_co_token_spent')) {
    return 'Brand Spent';
  }
  if (isEqual(item, 'cr_co_total_token')) {
    return 'Budget Unassigned';
  }
  return item;
};

const generateTableHeader = (object: any) => {
  const objectKeys = keys(object);
  const TABLE_HEAD = concat(
    [{ id: 0, field: 'id', hide: true, headerName: 'id', flex: 1, sortable: false, width: 200 }],
    map(objectKeys, (item: any, index: number) => {
      const tableKeys = {
        id: index,
        field: item,
        headerName: handleDisplayName(item),
        flex: 1,
        sortable: true,
        width: 200,
        hide: handleHide(item)
      };
      return tableKeys;
    })
  );
  return TABLE_HEAD;
};

export { generateTableHeader };
