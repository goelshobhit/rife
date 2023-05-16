// ----------------------------------------------------------------------
import keys from 'lodash/keys';
import map from 'lodash/map';
import concat from 'lodash/concat';
import isEmpty from 'lodash/isEmpty';
import get from 'lodash/get';
import values from 'lodash/values';
import { isNil, isNull, inRange } from 'lodash';

const dymmyUserCmsDetails = {
  u_id: 623,
  u_login: 'test005@gmail.com',
  u_referer_id: 0,
  u_acct_type: 0,
  u_act_sec: 0,
  u_email: 'test005@gmail.com',
  u_active: true,
  u_pref_login: 0,
  u_created_at: '2022-09-30T11:52:35.412Z',
  u_updated_at: '2022-09-30T11:52:35.412Z',
  u_email_verify_status: false,
  is_user_deactivated: 0,
  is_user_hidden: 0,
  'Tickets Earned': 0,
  'Presents Earned': 0,
  'Lottery Wheels': 0,
  'Easter Eggs': 0,
  'Chests Earned': 0,
  'Bonuses Won': '0',
  'Bonus Tasks Completed': '0',
  'Tasks Entered': 0,
  'Contests Entered': 0,
  'Content Entered': 0,
  Surveys: '0',
  Following: '0',
  Followers: '0',
  'Ads Watched': '0',
  'Liked Comments': null,
  'Disliked Comments': null,
  'Reactions Received': null,
  'Reactions Given': '0',
  'Reported Content': '0',
  'Number of Brands': 0,
  'Tier 2 Sent': 0,
  'Tier 2 Incomplete': 0,
  'Tier 2 Declined': 0,
  'Tier 2 Completed': 0,
  'Tier 3 Completed': 0,
  'Tier 3 Sent': 0,
  'Tier 3 Incomplete': 0,
  'Tier 3 Declined': 0
};

const valuesOfDummyUserCmsDetails = values(dymmyUserCmsDetails);


const generateTableHeader = (object: any) => {
  const objectKeys = keys(object);
  const TABLE_HEAD = concat(
    [{ field: 'id', hide: true, headerName: 'id', flex: 1, sortable: false, width: 200 }],
    map(objectKeys, (item: any, index: number) => {
      const tableKeys = {
        field: item,
        headerName: item,
        flex: 1,
        sortable: true,
        width: 200,
        hide: !inRange(index, 6, 13),
      };
      return tableKeys;
    })
  );
  return TABLE_HEAD;
};

const generateTableCellValuesForUserCMSDetails = (object: any) => {
  if (!isEmpty(get(object, 'user_cms_details'))) {
    const userCmsDetailsObject = get(object, 'user_cms_details');
    const valuesOfUserCmsDetailsObject = values(userCmsDetailsObject);
    const tableBodyCells = map(valuesOfUserCmsDetailsObject, (item) => {
      if (!isNil(item) && !isNull(item)) {
        return item;
      }
      return '-';
    });
    return tableBodyCells;
  }
  return map(valuesOfDummyUserCmsDetails, () => 0);
};

export { generateTableHeader, generateTableCellValuesForUserCMSDetails };
