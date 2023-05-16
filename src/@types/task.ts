// ----------------------------------------------------------------------

export type taskBrandsState = {
  loading:Boolean;
  brands: Array<any>;
  hasMoreBrands: boolean;
  brandPageNo: number;
  taskList: Array<any>;
  taskListTotal: number;
  selectedBrandBonus: Array<any>;
  selectedBrandBonusLoading: boolean;
  rewardCenter: Array<any>;
  bonusSet: [],
};



export type taskBrandsState2 = {
  loading:Boolean;
  brands: Array<any>;
  hasMoreBrands: boolean;
  brandPageNo: number;
};