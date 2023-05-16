import { WATCH_STEPS as STEPS, WATCH_FORM as FORM, FIELDTYPE } from './constants';

export const watchSteps = [STEPS.CAMPAIGN, STEPS.TypeAndAudience, STEPS.Details];

export const watchCampaignForm = [
  {
    heading: FORM.TASK_DETAIL,
    fields: [
      { label: FORM.TASK_LABEL, name: FORM.TASK_NAME, type: FIELDTYPE.TEXT },
    ]
  },
  {
    heading: FORM.AUDIENCE,
    fields: [{ label: FORM.AUDIENCE, name: FORM.AUDIENCE_NAME, type: FIELDTYPE.DROPDOWN, options: ['Public','Tier Two', 'Tier Three'], }]
  },
  {
    heading: FORM.REWARDS,
    fields: [
      { label: FORM.STAR_LABEL, name: FORM.STAR_NAME, type: FIELDTYPE.TEXT },
      { label: FORM.ADD_TOKEN_LABEL, name: FORM.ADD_TOKEN_NAME, type: FIELDTYPE.SWITCH },
      { label: FORM.TOTAL_TOKEN_BUDGET, name: FORM.TOTAL_TOKEN_BUDGET, type: FIELDTYPE.TEXT },
      { label: FORM.TOKENS_PER_USER, name: FORM.TOKENS_PER_USER, type: FIELDTYPE.TEXT },
    ]
  },
  {
    heading: FORM.LIMIT_HEADING,
    fields: [
      { label: FORM.LIMIT_LABEL, name: FORM.LIMIT_NAME, type: FIELDTYPE.TEXT },
    ]
  },
];

export const watchCampaignSecondForm = [
    {
      heading: FORM.TASK_DETAIL,
      fields: [
        { label: FORM.TASK_LABEL, name: FORM.TASK_NAME, type: FIELDTYPE.UPLOAD_VIDEO },
      ]
    },
    {
        heading: FORM.SCHEDULE,
        fields: [
          { label: FORM.ADD_TOKEN_LABEL, name: FORM.ADD_TOKEN_NAME, type: FIELDTYPE.EMPTY },
          { label: FORM.SCHEDULE, name: FORM.SCHEDULE, type: FIELDTYPE.SWITCH },
          { label: FORM.START_DATE_LABEL, name: FORM.START_DATE_NAME, type: FIELDTYPE.DATE },
          { label: FORM.END_DATE_LABEL, name: FORM.END_DATE_NAME, type: FIELDTYPE.DATE }
        ]
      }
  ];
  
