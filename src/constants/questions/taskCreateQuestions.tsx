import { STEPS, FORM, FIELDTYPE } from './constants';

// {
//   "Brand ID": 0,
//   "Survey title": "string",
//   "Survey Desc": "string",
//   "Survey Hashtag": [
//     "string"
//   ],
//   "Survey Color": 0,
//   "Start Date": "2021-11-22T00:00:00.000Z",
//   "End Date": "2021-12-22T00:00:00.000Z",
//   "Survey Status": 0,
//   "User Restriction": 0,
//   "Stars Per User": 0,
//   "Survey Questions": [
//     {
//       "Survey Question": "string",
//       "Question Status": 0,
//       "Question Answers": [
//         {
//           "Survey Answer": "string"
//         }
//       ]
//     }
//   ]
// }

export const questionSteps = [STEPS.CAMPAIGN];
export const questionCampaignForm = [
  {
    heading: FORM.TASK_DETAIL,
    fields: [
      { label: FORM.TASK_LABEL, name: 'Survey title', type: FIELDTYPE.TEXT },
      {
        label: FORM.PERCENTAGE_LABEL,
        name: 'Survey Color',
        type: FIELDTYPE.DROPDOWN,
        options: ['Green', 'Blue', 'Red', 'Purple']
      },
      {
        label: 'Status',
        name: 'Survey Status',
        type: FIELDTYPE.DROPDOWN,
        options: ['Active', 'InActive']
      },
      {
        label: 'User Restriction',
        name: 'User Restriction',
        type: FIELDTYPE.DROPDOWN,
        options: ['YES', 'NO']
      }
    ]
  },
  {
    heading: 'Brands',
    fields: [{ label: 'Brand', name: 'Brand ID', type: 'brandDropDown' }]
  },
  {
    heading: FORM.AUDIENCE,
    fields: [
      {
        label: FORM.AUDIENCE,
        name: FORM.AUDIENCE_NAME,
        type: FIELDTYPE.DROPDOWN,
        options: ['Public', 'Tier Two', 'Tier Three']
      }
    ]
  },
  {
    heading: FORM.REWARDS,
    fields: [{ label: FORM.STAR_LABEL, name: 'Stars Per User', type: FIELDTYPE.TEXT }]
  },
  {
    heading: FORM.QUESTIONS,
    hasMore: true,
    maxQuestions: FORM.MAX_QUES,
    minQuestion: FORM.MIN_QUES,
    minAnswers: FORM.MIN_ANS,
    maxAnswers: FORM.MAX_ANS,
    fields: [{ label: 'render_questions' }]
  },
  {
    heading: FORM.SCHEDULE,
    fields: [
      { label: FORM.ADD_TOKEN_LABEL, name: FORM.ADD_TOKEN_NAME, type: FIELDTYPE.EMPTY },
      { label: FORM.SCHEDULE, name: FORM.SCHEDULE, type: FIELDTYPE.SWITCH },
      { label: FORM.START_DATE_LABEL, name: 'Start Date', type: FIELDTYPE.DATE },
      { label: FORM.END_DATE_LABEL, name: 'End Date', type: FIELDTYPE.DATE }
    ]
  }
];
