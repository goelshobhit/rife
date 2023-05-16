import map from 'lodash/map';
import forEach from 'lodash/forEach';

const flattenObj = (ob: any) => {
    // The object which contains the
    // final result
    const result: any = {};
  
    // loop through the object "ob"
    for (const i in ob) {
      // We check the type of the i using
      // typeof() function and recursively
      // call the function again
      if (typeof ob[i] === 'object' && !Array.isArray(ob[i])) {
        const temp = flattenObj(ob[i]);
        // eslint-disable-next-line guard-for-in
        for (const j in temp) {
          const key = `${i}.${j}`;
          // Store temp in result
          result[key] = temp[j];
        }
      } else if (typeof ob[i] === 'object' && Array.isArray(ob[i])) {
        forEach(ob[i], (item: any) => {
          result[i] = item;
        });
      }
  
      // Else store ob[i] in result directly
      else {
        /* tslint:disable-next-line */
        result[i] = ob[i];
      }
    }
    return result;
  };
  
  export const handleFlattenNestedObjectOfArray = (array: any) => map(array, (item: any, index: number) => flattenObj(item));