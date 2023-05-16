import { WATCH_FORM as FORM, FIELDTYPE } from './constants';

export const taskSteps = ['Campaign', 'Type & Auidence', 'Details'];

export const taskForm = {
  FIRST_FORM: {
    HEADING: 'Brand',
    LABEL: 'Select Brand',
    NAME: 'select_brand',
    TYPE: 'dropDown'
  },
  SECOND_FORM: [
    {
      heading: FORM.TASK_DETAIL,
      fields: [
        { label: FORM.TASK_LABEL, name: FORM.TASK_NAME, type: 'text2' },
        {
          label: 'Task Type',
          name: 'task_type',
          type: 'taskdropDown',
          options: ['Video', 'Image', 'Sound', 'Video Response', 'Caption this']
        }
      ]
    },
    {
      heading: 'User Requirements / Costs',
      fields: [
        { label: 'Energy Costs Per User', name: 'energy_cost_per_user', type: FIELDTYPE.TEXT }
      ]
    },
    {
      heading: FORM.AUDIENCE,
      fields: [
        {
          label: FORM.AUDIENCE,
          name: 'audience',
          type: 'taskdropDown',
          options: ['Public', 'Tier Two', 'Tier Three', 'Bonus prize winner', 'Specific Group']
        }
      ]
    }
  ],
  THIRD_FORM: [
    {
      heading: 'Task Type',
      fields: [{ label: FORM.TASK_LABEL, name: FORM.TASK_NAME, type: 'Dynamic' }]
    },
    {
      heading: 'Details',
      fields: [
        { label: 'Description Title', name: 'Description Title', type: FIELDTYPE.TEXT },
        { label: 'Description', name: 'description', type: FIELDTYPE.TEXT, isMandatory: true }
      ]
    },
    {
      heading: 'User Costs',
      fields: [
        { label: 'Energy Cost Per User', name: 'energy_cost_per_user', type: FIELDTYPE.TEXT }
      ]
    },
    {
      heading: FORM.REWARDS,
      fields: [
        {
          isWatchType: false
        }
      ]
    },
    {
      heading: 'Bonus Prize',
      fields: [{ label: 'Bonus Set', name: 'bonus_set', type: FIELDTYPE.TEXT }]
    },
    {
      heading: 'User Requirements - Question',
      fields: [{ label: 'Caption Question', name: 'caption_question', type: FIELDTYPE.TEXT }]
    },
    {
      heading: 'User Requirements -Photos',
      fields: [
        { label: 'No of Photos required', name: 'No_of_photos_required', type: FIELDTYPE.TEXT },
        { label: 'No of Videos required', name: 'No_of_videos_required', type: FIELDTYPE.TEXT }
      ]
    },
    {
      heading: 'User Requirements - Hashtag',
      fields: [{ label: 'HashTags', name: 'hashtags', type: 'tags' }]
    },
    {
      heading: FORM.SCHEDULE,
      fields: [
        { label: FORM.ADD_TOKEN_LABEL, name: FORM.ADD_TOKEN_NAME, type: FIELDTYPE.EMPTY },
        { label: FORM.SCHEDULE, name: FORM.SCHEDULE, type: FIELDTYPE.SWITCH },
        { label: FORM.START_DATE_LABEL, name: FORM.START_DATE_NAME, type: FIELDTYPE.DATE },
        { label: FORM.END_DATE_LABEL, name: FORM.END_DATE_NAME, type: FIELDTYPE.DATE }
      ]
    },
    {
      heading: 'Voting Dates',
      fields: [
        { label: 'Voting Start Date', name: 'voting_start_date', type: FIELDTYPE.DATE },
        { label: 'Voting End Date', name: 'voting_end_date', type: FIELDTYPE.DATE }
      ]
    }
  ],
  WATCH_SECOND_FORM: [
    {
      heading: 'Task Details',
      fields: [
        { label: 'Name', name: 'task_name', type: FIELDTYPE.TEXT },
        { label: 'Description', name: 'description', type: FIELDTYPE.TEXT, isMandatory: true }
      ]
    },
    {
      heading: FORM.AUDIENCE,
      fields: [
        {
          label: FORM.AUDIENCE,
          name: 'audience',
          type: 'taskdropDown',
          options: ['Public', 'Tier Two', 'Tier Three', 'Bonus prize winner', 'Specific Group']
        }
      ]
    },
    {
      heading: FORM.REWARDS,
      fields: [
        {
          isWatchType: true
        }
      ]
    },
    {
      heading: 'Limit',
      fields: [{ label: 'Limit Redemptions', name: 'Limit Redemptions', type: 'number' }]
    }
  ],
  WATCH_THIRD_FORM: [
    {
      heading: FORM.TASK_DETAIL,
      fields: [{ label: FORM.TASK_LABEL, name: FORM.TASK_NAME, type: FIELDTYPE.UPLOAD_VIDEO }]
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
  ],
  CONTEST_THIRD_FORM: [
    {
      heading: 'Task Details',
      fields: [
        { label: 'Name', name: 'task_name', type: FIELDTYPE.TEXT },
        {
          label: 'Description',
          name: 'description',
          type: FIELDTYPE.TEXT,
          isMandatory: true,
          isMandatory: true
        }
      ]
    },

    {
      heading: FORM.REWARDS,
      fields: [{
        isWatchType: true
      }]
    },
    {
      heading: 'Bonus Prize',
      fields: [{ label: 'Bonus Set', name: 'bonus_set', type: FIELDTYPE.TEXT }]
    },
    {
      heading: 'User Requirements',
      fields: [
        { label: 'Caption Question', name: 'caption_question', type: FIELDTYPE.TEXT },
        { label: 'No of Photos required', name: 'No_of_photos_required', type: FIELDTYPE.TEXT },
        { label: 'No of Videos required', name: 'No_of_videos_required', type: FIELDTYPE.TEXT },
        { label: 'HashTags', name: 'hashtags', type: 'tags' }
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
  ],
  QUESTION_SECOND_FORM: [
    {
      heading: FORM.TASK_DETAIL,
      fields: [
        { label: FORM.TASK_LABEL, name: 'survey_title', type: FIELDTYPE.TEXT },
        {
          label: FORM.PERCENTAGE_LABEL,
          name: 'survey_color',
          type: FIELDTYPE.DROPDOWN,
          options: ['Green', 'Blue', 'Red', 'Purple']
        }
      ]
    },
    {
      heading: FORM.AUDIENCE,
      fields: [
        {
          label: FORM.AUDIENCE,
          name: FORM.AUDIENCE_NAME,
          type: 'taskdropDown',
          options: ['Public', 'Tier Two', 'Tier Three']
        }
      ]
    }
  ],
  TASK_THIRD_SECHDULE_FORM: [
    {
      heading: 'Task Type',
      fields: []
    },
    {
      heading: 'Task Details',
      fields: [
        { label: 'Name', name: 'task_name', type: FIELDTYPE.TEXT },
        {
          label: 'Title',
          name: 'description_title',
          type: FIELDTYPE.TEXT
        },
        {
          label: 'Description',
          name: 'description',
          type: FIELDTYPE.TEXT,
          isMandatory: true
        }
      ]
    },
    {
      heading: 'Bonus Prize',
      fields: [{ label: 'Bonus Set', name: 'bonus_set', type: FIELDTYPE.TEXT }]
    },
    {
      heading: FORM.REWARDS,
      fields: [
        {
          isWatchType: true
        }
      ]
    },
    {
      heading: 'User Requirements',
      fields: [
        { label: 'Caption Question', name: 'caption_question', type: FIELDTYPE.TEXT },
        { label: 'No of Photos required', name: 'No_of_photos_required', type: FIELDTYPE.TEXT },
        { label: 'No of Videos required', name: 'No_of_videos_required', type: FIELDTYPE.TEXT },
        { label: 'HashTags', name: 'hashtags', type: 'tags' }
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
  ],
  TASK_THIRD_NO_SECHDULE_FORM: [
    {
      heading: 'Task Type',
      fields: []
    },
    {
      heading: 'Task Details',
      fields: [
        { label: 'Name', name: 'task_name', type: FIELDTYPE.TEXT },
        { label: 'Description', name: 'description', type: FIELDTYPE.TEXT, isMandatory: true }
      ]
    },
    {
      heading: 'Bonus Prize',
      fields: [{ label: 'Bonus Set', name: 'bonus_set', type: FIELDTYPE.TEXT }]
    },
    {
      heading: FORM.REWARDS,
      fields: [
        {
          isWatchType: true
        }
      ]
    },
    {
      heading: 'User Requirements',
      fields: [
        { label: 'Caption Question', name: 'caption_question', type: FIELDTYPE.TEXT },
        { label: 'No of Photos required', name: 'No_of_photos_required', type: FIELDTYPE.TEXT },
        { label: 'No of Videos required', name: 'No_of_videos_required', type: FIELDTYPE.TEXT },
        { label: 'HashTags', name: 'hashtags', type: 'tags' }
      ]
    }
  ],
  TASK_THIRD_NO_PUBLIC_VIDEO_FORM: [
    {
      heading: 'Task Type',
      fields: []
    },
    {
      heading: 'Bonus Prize',
      fields: [{ label: 'Bonus Set', name: 'bonus_set', type: FIELDTYPE.TEXT }]
    },
    {
      heading: FORM.REWARDS,
      fields: [
        {
          isAll: true
        }
      ]
    },
    {
      heading: 'User Requirements',
      fields: [{ isVideo: true, isPhoto: false, isCaption: true }]
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
  ],
  TASK_THIRD_NO_PUBLIC_IMAGE_FORM: [
    {
      heading: 'Task Type',
      fields: []
    },
    {
      heading: 'Bonus Prize',
      fields: [{ label: 'Bonus Set', name: 'bonus_set', type: FIELDTYPE.TEXT }]
    },
    {
      heading: FORM.REWARDS,
      fields: [
        {
          isAll: true
        }
      ]
    },
    {
      heading: 'User Requirements',
      fields: [{ isVideo: false, isPhoto: true, isCaption: true }]
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
  ],
  TASK_THIRD_NO_PUBLIC_VIDEO_RESPONSE_FORM: [
    {
      heading: 'Task Type',
      fields: []
    },
    {
      heading: 'Bonus Prize',
      fields: [{ label: 'Bonus Set', name: 'bonus_set', type: FIELDTYPE.TEXT }]
    },
    {
      heading: FORM.REWARDS,
      fields: [
        {
          isAll: true
        }
      ]
    },
    {
      heading: 'User Requirements',
      fields: [{ isVideo: true, isPhoto: false, isCaption: true }]
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
  ],
  TASK_THIRD_NO_PUBLIC_CAPTION_THIS_FORM: [
    {
      heading: 'Task Type',
      fields: []
    },
    {
      heading: FORM.REWARDS,
      fields: [
        {
          isWatchType: true
        }
      ]
    },
    {
      heading: 'User Requirements',
      fields: [{ isVideo: false, isPhoto: false, isCaption: false }]
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
  ],
  TASK_THIRD_NO_PUBLIC_SOUND_FORM: [
    {
      heading: 'Task Type',
      fields: []
    },
    {
      heading: 'Bonus Prize',
      fields: [{ label: 'Bonus Set', name: 'bonus_set', type: FIELDTYPE.TEXT }]
    },
    {
      heading: FORM.REWARDS,
      fields: [
        {
          isAll: true
        }
      ]
    },
    {
      heading: 'User Requirements',
      fields: [{ isVideo: true, isPhoto: false, isCaption: true }]
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
  ],
  TASK_THIRD_NO_TIER_VIDEO_FORM: [
    {
      heading: 'Task Type',
      fields: []
    },
    {
      heading: 'Bonus Prize',
      fields: [{ label: 'Bonus Set', name: 'bonus_set', type: FIELDTYPE.TEXT }]
    },
    {
      heading: FORM.REWARDS,
      fields: [
        {
          isAll: true
        }
      ]
    },
    {
      heading: 'User Requirements',
      fields: [{ isVideo: true, isPhoto: false, isCaption: true }]
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
  ],
  TASK_THIRD_NO_TIER_IMAGE_FORM: [
    {
      heading: 'Task Type',
      fields: []
    },
    {
      heading: 'Bonus Prize',
      fields: [{ label: 'Bonus Set', name: 'bonus_set', type: FIELDTYPE.TEXT }]
    },
    {
      heading: FORM.REWARDS,
      fields: [
        {
          isAll: true
        }
      ]
    },
    {
      heading: 'User Requirements',
      fields: [{ isVideo: false, isPhoto: true, isCaption: true }]
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
  ],
  TASK_THIRD_NO_TIER_VIDEO_RESPONSE_FORM: [
    {
      heading: 'Task Type',
      fields: []
    },
    {
      heading: 'Bonus Prize',
      fields: [{ label: 'Bonus Set', name: 'bonus_set', type: FIELDTYPE.TEXT }]
    },
    {
      heading: FORM.REWARDS,
      fields: [
        {
          isAll: true
        }
      ]
    },
    {
      heading: 'User Requirements',
      fields: [{ isVideo: true, isPhoto: false, isCaption: true }]
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
  ],
  TASK_THIRD_NO_TIER_CAPTION_THIS_FORM: [
    {
      heading: 'Task Type',
      fields: []
    },
    {
      heading: FORM.REWARDS,
      fields: [
        {
          isWatchType: true
        }
      ]
    },
    {
      heading: 'User Requirements',
      fields: [{ isVideo: false, isPhoto: false, isCaption: true }]
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
  ],
  TASK_THIRD_NO_TIER_SOUND_FORM: [
    {
      heading: 'Task Type',
      fields: []
    },
    {
      heading: 'Bonus Prize',
      fields: [{ label: 'Bonus Set', name: 'bonus_set', type: FIELDTYPE.TEXT }]
    },
    {
      heading: FORM.REWARDS,
      fields: [
        {
          isAll: true
        }
      ]
    },
    {
      heading: 'User Requirements',
      fields: [{ isVideo: true, isPhoto: false, isCaption: true }]
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
  ],
  TASK_THIRD_QUESTION_FORM: [
    {
      heading: 'questions',
      hasMore: true,
      maxQuestions: FORM.MAX_QUES,
      minQuestion: FORM.MIN_QUES,
      minAnswers: FORM.MIN_ANS,
      maxAnswers: FORM.MAX_ANS,
      fields: [{ label: 'render_questions' }]
    },
    {
      heading: FORM.REWARDS,
      fields: [
        {
          isStarType: true
        }
      ]
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
  ],
  TASK_THIRD_WATCH_FORM: [
    {
      heading: FORM.REWARDS,
      fields: [
        {
          isStarType: true
        }
      ]
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
  ],
  TASK_THIRD_CONTEST_FORM: [
    {
      heading: 'Bonus Prize',
      fields: [{ label: 'Bonus Set', name: 'bonus_set', type: FIELDTYPE.TEXT }]
    },
    {
      heading: FORM.REWARDS,
      fields: [
        {
          isWatchType: true,
          isContestType: true
        }
      ]
    },
    {
      heading: 'User Requirements',
      fields: [
        { label: 'Caption Question', name: 'caption_question', type: FIELDTYPE.TEXT },
        { label: 'No of Photos required', name: 'No_of_photos_required', type: FIELDTYPE.TEXT },
        { label: 'No of Videos required', name: 'No_of_videos_required', type: FIELDTYPE.TEXT },
        { label: 'HashTags', name: 'hashtags', type: 'tags' }
      ]
    },
    {
      heading: FORM.SCHEDULE,
      fields: [
        { label: FORM.ADD_TOKEN_LABEL, name: FORM.ADD_TOKEN_NAME, type: FIELDTYPE.EMPTY },
        { label: FORM.SCHEDULE, name: FORM.SCHEDULE, type: FIELDTYPE.SWITCH },
        { label: FORM.START_DATE_LABEL, name: 'Start Date', type: FIELDTYPE.DATE },
        { label: FORM.END_DATE_LABEL, name: 'End Date', type: FIELDTYPE.DATE }
      ]
    },
    {
      heading: 'Voting Dates',
      fields: [
        { label: FORM.START_DATE_LABEL, name: 'voting_start_date', type: FIELDTYPE.DATE },
        { label: FORM.END_DATE_LABEL, name: 'voting_end_date', type: FIELDTYPE.DATE }
      ]
    },
    {
      heading: 'Winner Announced Date & Time',
      fields: [
        {
          label: 'Winner Announcement Date & Time',
          name: 'winner_announcement_date_and_time',
          type: 'dateAndTime'
        }
      ]
    }
  ],
  TASK_THIRD_BONUS_PRIZE_FORM: [
    {
      heading: 'Bonus Prize',
      fields: [
        {
          label: 'Select Bonus Prize',
          name: 'select_bonus_prize',
          type: FIELDTYPE.DROPDOWN,
          options: []
        }
      ]
    },
    {
      heading: 'User Requirements',
      fields: [
        { label: 'Caption Question', name: 'caption_question', type: FIELDTYPE.TEXT },
        { label: 'No of Photos required', name: 'No_of_photos_required', type: FIELDTYPE.TEXT },
        { label: 'No of Videos required', name: 'No_of_videos_required', type: FIELDTYPE.TEXT },
        { label: 'HashTags', name: 'hashtags', type: 'tags' }
      ]
    }
  ],
  TASK_SECOND_QUESTION_FORM: [
    {
      heading: FORM.TASK_DETAIL,
      fields: [
        { label: 'Task name', name: 'task_name', type: 'text2' },
        {
          label: "Percentage Color",
          name: 'percentage_color',
          type: 'colorDropDown',
          options: ['Green', 'Blue', 'Red', 'Purple']
        }
      ]
    },
    {
      heading: FORM.AUDIENCE,
      fields: [
        {
          label: FORM.AUDIENCE,
          name: 'audience',
          type: 'taskdropDown',
          options: ['Public', 'Tier Two', 'Tier Three', 'Bonus prize winner', 'Specific Group']
        }
      ]
    }
  ],
  TASK_SECOND_WATCH_FORM: [
    {
      heading: FORM.TASK_DETAIL,
      fields: [{ label: 'Task name', name: 'task_name', type: 'text2' }]
    },
    {
      heading: FORM.AUDIENCE,
      fields: [
        {
          label: FORM.AUDIENCE,
          name: 'audience',
          type: 'taskdropDown',
          options: ['Public', 'Tier Two', 'Tier Three', 'Bonus prize winner', 'Specific Group']
        }
      ]
    },
    {
      heading: 'Limit',
      fields: [{ label: 'Limit Redemptions', name: 'limit_redemption', type: 'number' }]
    }
  ],
  TASK_SECOND_CONTEST_FORM: [
    {
      heading: FORM.TASK_DETAIL,
      fields: [
        { label: FORM.TASK_LABEL, name: FORM.TASK_NAME, type: 'text2' },
        {
          label: 'Task Type',
          name: 'task_type',
          type: 'taskdropDown',
          options: ['Video', 'Image', 'Sound', 'Video Response', 'Caption this']
        }
      ]
    },
    {
      heading: 'User Requirements / Costs',
      fields: [
        { label: 'Energy Costs Per User', name: 'energy_cost_per_user', type: FIELDTYPE.TEXT }
      ]
    },
    {
      heading: FORM.AUDIENCE,
      fields: [
        {
          label: FORM.AUDIENCE,
          name: 'audience',
          type: 'taskdropDown',
          options: ['Public', 'Tier Two', 'Tier Three', 'Bonus prize winner', 'Specific Group']
        }
      ]
    }
  ],
  CONTEST_THIRD_NO_SECHDULE_FORM: [
    {
      heading: 'Task Type',
      fields: []
    },
    {
      heading: 'Task Details',
      fields: [
        { label: 'Name', name: 'task_name', type: FIELDTYPE.TEXT },
        { label: 'Description', name: 'description', type: FIELDTYPE.TEXT, isMandatory: true }
      ]
    },
    {
      heading: 'Bonus Prize',
      fields: [{ label: 'Bonus Set', name: 'bonus_set', type: FIELDTYPE.TEXT }]
    },
    {
      heading: FORM.REWARDS,
      fields: [
        {
          isStarType: true
        }
      ]
    },
    {
      heading: 'User Requirements',
      fields: [
        { label: 'Caption Question', name: 'caption_question', type: FIELDTYPE.TEXT },
        { label: 'No of Photos required', name: 'No_of_photos_required', type: 'number' },
        { label: 'No of Videos required', name: 'No_of_videos_required', type: 'number' },
        { label: 'HashTags', name: 'hashtags', type: 'tags' }
      ]
    },
    {
      heading: 'Voting Dates',
      fields: [
        { label: FORM.START_DATE_LABEL, name: 'voting_start_date', type: FIELDTYPE.DATE },
        { label: FORM.END_DATE_LABEL, name: 'voting_end_date', type: FIELDTYPE.DATE }
      ]
    },
    {
      heading: 'Winner Announced Date & Time',
      fields: [
        {
          label: 'Winner Announcement Date & Time',
          name: 'winner_announcement_date_and_time',
          type: 'dateAndTime'
        }
      ]
    }
  ],
  CONTEST_THIRD_NO_PUBLIC_VIDEO_FORM: [
    {
      heading: 'Task Type',
      fields: []
    },
    {
      heading: FORM.REWARDS,
      fields: [
        {
          isContestType: true
        }
      ]
    },
    {
      heading: 'Bonus Prize',
      fields: [{ label: 'Bonus Set', name: 'bonus_set', type: FIELDTYPE.TEXT }]
    },
    {
      heading: 'User Requirements',
      fields: [{ isVideo: true, isPhoto: false, isCaption: true }]
    },
    {
      heading: 'Voting Dates',
      fields: [
        { label: FORM.START_DATE_LABEL, name: 'voting_start_date', type: FIELDTYPE.DATE },
        { label: FORM.END_DATE_LABEL, name: 'voting_end_date', type: FIELDTYPE.DATE }
      ]
    },
    {
      heading: 'Winner Announced Date & Time',
      fields: [
        {
          label: 'Winner Announcement Date & Time',
          name: 'winner_announcement_date_and_time',
          type: 'dateAndTime'
        }
      ]
    }
  ],
  CONTEST_THIRD_NO_PUBLIC_IMAGE_FORM: [
    {
      heading: 'Task Type',
      fields: []
    },
    {
      heading: FORM.REWARDS,
      fields: [
        {
          isContestType: true
        }
      ]
    },
    {
      heading: 'Bonus Prize',
      fields: [{ label: 'Bonus Set', name: 'bonus_set', type: FIELDTYPE.TEXT }]
    },
    {
      heading: 'User Requirements',
      fields: [{ isVideo: false, isPhoto: true, isCaption: true }]
    },
    {
      heading: 'Voting Dates',
      fields: [
        { label: FORM.START_DATE_LABEL, name: 'voting_start_date', type: FIELDTYPE.DATE },
        { label: FORM.END_DATE_LABEL, name: 'voting_end_date', type: FIELDTYPE.DATE }
      ]
    },
    {
      heading: 'Winner Announced Date & Time',
      fields: [
        {
          label: 'Winner Announcement Date & Time',
          name: 'winner_announcement_date_and_time',
          type: 'dateAndTime'
        }
      ]
    }
  ],
  CONTEST_THIRD_NO_PUBLIC_VIDEO_RESPONSE_FORM: [
    {
      heading: 'Task Type',
      fields: []
    },
    {
      heading: FORM.REWARDS,
      fields: [
        {
          isContestType: true
        }
      ]
    },
    {
      heading: 'Bonus Prize',
      fields: [{ label: 'Bonus Set', name: 'bonus_set', type: FIELDTYPE.TEXT }]
    },
    {
      heading: 'User Requirements',
      fields: [{ isVideo: true, isPhoto: false, isCaption: true }]
    },
    {
      heading: 'Voting Dates',
      fields: [
        { label: FORM.START_DATE_LABEL, name: 'voting_start_date', type: FIELDTYPE.DATE },
        { label: FORM.END_DATE_LABEL, name: 'voting_end_date', type: FIELDTYPE.DATE }
      ]
    },
    {
      heading: 'Winner Announced Date & Time',
      fields: [
        {
          label: 'Winner Announcement Date & Time',
          name: 'winner_announcement_date_and_time',
          type: 'dateAndTime'
        }
      ]
    }
  ],
  CONTEST_THIRD_NO_PUBLIC_CAPTION_THIS_FORM: [
    {
      heading: 'Task Type',
      fields: []
    },
    {
      heading: FORM.REWARDS,
      fields: [
        {
          isContestType: true
        }
      ]
    },
    {
      heading: 'Bonus Prize',
      fields: [{ label: 'Bonus Set', name: 'bonus_set', type: FIELDTYPE.TEXT }]
    },
    {
      heading: 'User Requirements',
      fields: [{ isVideo: false, isPhoto: false, isCaption: false }]
    },
    {
      heading: 'Voting Dates',
      fields: [
        { label: FORM.START_DATE_LABEL, name: 'voting_start_date', type: FIELDTYPE.DATE },
        { label: FORM.END_DATE_LABEL, name: 'voting_end_date', type: FIELDTYPE.DATE }
      ]
    },
    {
      heading: 'Winner Announced Date & Time',
      fields: [
        {
          label: 'Winner Announcement Date & Time',
          name: 'winner_announcement_date_and_time',
          type: 'dateAndTime'
        }
      ]
    }
  ],
  CONTEST_THIRD_NO_PUBLIC_SOUND_FORM: [
    {
      heading: 'Task Type',
      fields: []
    },
    {
      heading: FORM.REWARDS,
      fields: [
        {
          isContestType: true
        }
      ]
    },
    {
      heading: 'Bonus Prize',
      fields: [{ label: 'Bonus Set', name: 'bonus_set', type: FIELDTYPE.TEXT }]
    },
    {
      heading: 'User Requirements',
      fields: [{ isVideo: true, isPhoto: false, isCaption: true }]
    },
    {
      heading: 'Voting Dates',
      fields: [
        { label: FORM.START_DATE_LABEL, name: 'voting_start_date', type: FIELDTYPE.DATE },
        { label: FORM.END_DATE_LABEL, name: 'voting_end_date', type: FIELDTYPE.DATE }
      ]
    },
    {
      heading: 'Winner Announced Date & Time',
      fields: [
        {
          label: 'Winner Announcement Date & Time',
          name: 'winner_announcement_date_and_time',
          type: 'dateAndTime'
        }
      ]
    }
  ],
  CONTEST_THIRD_NO_TIER_VIDEO_FORM: [
    {
      heading: 'Task Type',
      fields: []
    },
    {
      heading: FORM.REWARDS,
      fields: [
        {
          isContestType: true
        }
      ]
    },
    {
      heading: 'Bonus Prize',
      fields: [{ label: 'Bonus Set', name: 'bonus_set', type: FIELDTYPE.TEXT }]
    },
    {
      heading: 'User Requirements',
      fields: [
        { label: 'Caption Question', name: 'caption_question', type: FIELDTYPE.TEXT },
        { label: 'HashTags', name: 'hashtags', type: 'tags' }
      ]
    },
    {
      heading: 'Voting Dates',
      fields: [
        { label: FORM.START_DATE_LABEL, name: 'voting_start_date', type: FIELDTYPE.DATE },
        { label: FORM.END_DATE_LABEL, name: 'voting_end_date', type: FIELDTYPE.DATE }
      ]
    },
    {
      heading: 'Winner Announced Date & Time',
      fields: [
        {
          label: 'Winner Announcement Date & Time',
          name: 'winner_announcement_date_and_time',
          type: 'dateAndTime'
        }
      ]
    }
  ],
  CONTEST_THIRD_NO_TIER_IMAGE_FORM: [
    {
      heading: 'Task Type',
      fields: []
    },
    {
      heading: FORM.REWARDS,
      fields: [
        {
          isContestType: true
        }
      ]
    },
    {
      heading: 'Bonus Prize',
      fields: [{ label: 'Bonus Set', name: 'bonus_set', type: FIELDTYPE.TEXT }]
    },
    {
      heading: 'User Requirements',
      fields: [
        { label: 'Caption Question', name: 'caption_question', type: FIELDTYPE.TEXT },
        { label: 'HashTags', name: 'hashtags', type: 'tags' }
      ]
    },
    {
      heading: 'Voting Dates',
      fields: [
        { label: FORM.START_DATE_LABEL, name: 'voting_start_date', type: FIELDTYPE.DATE },
        { label: FORM.END_DATE_LABEL, name: 'voting_end_date', type: FIELDTYPE.DATE }
      ]
    },
    {
      heading: 'Winner Announced Date & Time',
      fields: [
        {
          label: 'Winner Announcement Date & Time',
          name: 'winner_announcement_date_and_time',
          type: 'dateAndTime'
        }
      ]
    }
  ],
  CONTEST_THIRD_NO_TIER_VIDEO_RESPONSE_FORM: [
    {
      heading: 'Task Type',
      fields: []
    },
    {
      heading: FORM.REWARDS,
      fields: [
        {
          isContestType: true
        }
      ]
    },
    {
      heading: 'Bonus Prize',
      fields: [{ label: 'Bonus Set', name: 'bonus_set', type: FIELDTYPE.TEXT }]
    },
    {
      heading: 'User Requirements',
      fields: [
        { label: 'Caption Question', name: 'caption_question', type: FIELDTYPE.TEXT },
        { label: 'HashTags', name: 'hashtags', type: 'tags' }
      ]
    },
    {
      heading: 'Voting Dates',
      fields: [
        { label: FORM.START_DATE_LABEL, name: 'voting_start_date', type: FIELDTYPE.DATE },
        { label: FORM.END_DATE_LABEL, name: 'voting_end_date', type: FIELDTYPE.DATE }
      ]
    },
    {
      heading: 'Winner Announced Date & Time',
      fields: [
        {
          label: 'Winner Announcement Date & Time',
          name: 'winner_announcement_date_and_time',
          type: 'dateAndTime'
        }
      ]
    }
  ],
  CONTEST_THIRD_NO_TIER_CAPTION_THIS_FORM: [
    {
      heading: 'Task Type',
      fields: []
    },
    {
      heading: FORM.REWARDS,
      fields: [
        {
          isContestType: true
        }
      ]
    },
    {
      heading: 'Bonus Prize',
      fields: [{ label: 'Bonus Set', name: 'bonus_set', type: FIELDTYPE.TEXT }]
    },
    {
      heading: 'User Requirements',
      fields: [
        { label: 'Caption Question', name: 'caption_question', type: FIELDTYPE.TEXT },
        { label: 'HashTags', name: 'hashtags', type: 'tags' }
      ]
    },
    {
      heading: 'Voting Dates',
      fields: [
        { label: FORM.START_DATE_LABEL, name: 'voting_start_date', type: FIELDTYPE.DATE },
        { label: FORM.END_DATE_LABEL, name: 'voting_end_date', type: FIELDTYPE.DATE }
      ]
    },
    {
      heading: 'Winner Announced Date & Time',
      fields: [
        {
          label: 'Winner Announcement Date & Time',
          name: 'winner_announcement_date_and_time',
          type: 'dateAndTime'
        }
      ]
    }
  ],
  CONTEST_THIRD_NO_TIER_SOUND_FORM: [
    {
      heading: 'Task Type',
      fields: []
    },
    {
      heading: FORM.REWARDS,
      fields: [
        {
          isContestType: true
        }
      ]
    },
    {
      heading: 'Bonus Prize',
      fields: [{ label: 'Bonus Set', name: 'bonus_set', type: FIELDTYPE.TEXT }]
    },
    {
      heading: 'User Requirements',
      fields: [
        { label: 'Caption Question', name: 'caption_question', type: FIELDTYPE.TEXT },
        { label: 'HashTags', name: 'hashtags', type: 'tags' }
      ]
    },
    {
      heading: 'Voting Dates',
      fields: [
        { label: FORM.START_DATE_LABEL, name: 'voting_start_date', type: FIELDTYPE.DATE },
        { label: FORM.END_DATE_LABEL, name: 'voting_end_date', type: FIELDTYPE.DATE }
      ]
    },
    {
      heading: 'Winner Announced Date & Time',
      fields: [
        {
          label: 'Winner Announcement Date & Time',
          name: 'winner_announcement_date_and_time',
          type: 'dateAndTime'
        }
      ]
    }
  ],
  BONUS_THIRD_NO_SECHDULE_FORM: [
    {
      heading: 'Task Type',
      fields: []
    },
    {
      heading: 'Task Details',
      fields: [
        { label: 'Name', name: 'task_name', type: FIELDTYPE.TEXT },
        {
          label: 'Title',
          name: 'description_title',
          type: FIELDTYPE.TEXT
        },
        {
          label: 'Description',
          name: 'description',
          type: FIELDTYPE.TEXT,
          isMandatory: true
        }
      ]
    },
    { heading: 'Brand Bonus Prize' },
    {
      heading: 'Task Details',
      fields: [
        { label: 'Name', name: 'task_name', type: FIELDTYPE.TEXT },
        { label: 'Description', name: 'description', type: FIELDTYPE.TEXT, isMandatory: true }
      ]
    },
    {
      heading: FORM.REWARDS,
      fields: [
        {
          isAll: true
        }
      ]
    },
    {
      heading: 'User Requirements',
      fields: [{ isVideo: false, isPhoto: false, isCaption: false }]
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
  ],
  BONUS_THIRD_NO_PUBLIC_VIDEO_FORM: [
    {
      heading: 'Task Type',
      fields: []
    },
    {
      heading: FORM.REWARDS,
      fields: [
        {
          isAll: true
        }
      ]
    },
    {
      heading: 'Task Details',
      fields: [
        { label: 'Name', name: 'task_name', type: FIELDTYPE.TEXT },
        {
          label: 'Title',
          name: 'description_title',
          type: FIELDTYPE.TEXT
        },
        {
          label: 'Description',
          name: 'description',
          type: FIELDTYPE.TEXT,
          isMandatory: true
        }
      ]
    },
    { heading: 'Brand Bonus Prize' },
    {
      heading: 'User Requirements',
      fields: [{ isVideo: true, isPhoto: false, isCaption: true }]
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
  ],
  BONUS_THIRD_NO_PUBLIC_IMAGE_FORM: [
    {
      heading: 'Task Type',
      fields: []
    },
    {
      heading: 'Task Details',
      fields: [
        { label: 'Name', name: 'task_name', type: FIELDTYPE.TEXT },
        {
          label: 'Title',
          name: 'description_title',
          type: FIELDTYPE.TEXT
        },
        {
          label: 'Description',
          name: 'description',
          type: FIELDTYPE.TEXT,
          isMandatory: true
        }
      ]
    },
    { heading: 'Brand Bonus Prize' },
    {
      heading: FORM.REWARDS,
      fields: [
        {
          isAll: true
        }
      ]
    },
    {
      heading: 'User Requirements',
      fields: [{ isVideo: false, isPhoto: true, isCaption: true }]
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
  ],
  BONUS_THIRD_NO_PUBLIC_VIDEO_RESPONSE_FORM: [
    {
      heading: 'Task Type',
      fields: []
    },
    {
      heading: 'Task Details',
      fields: [
        { label: 'Name', name: 'task_name', type: FIELDTYPE.TEXT },
        {
          label: 'Title',
          name: 'description_title',
          type: FIELDTYPE.TEXT
        },
        {
          label: 'Description',
          name: 'description',
          type: FIELDTYPE.TEXT,
          isMandatory: true
        }
      ]
    },
    { heading: 'Brand Bonus Prize' },
    {
      heading: FORM.REWARDS,
      fields: [
        {
          isAll: true
        }
      ]
    },
    {
      heading: 'User Requirements',
      fields: [{ isVideo: true, isPhoto: false, isCaption: true }]
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
  ],
  BONUS_THIRD_NO_PUBLIC_CAPTION_THIS_FORM: [
    {
      heading: 'Task Type',
      fields: []
    },
    {
      heading: 'Task Details',
      fields: [
        { label: 'Name', name: 'task_name', type: FIELDTYPE.TEXT },
        {
          label: 'Title',
          name: 'description_title',
          type: FIELDTYPE.TEXT
        },
        {
          label: 'Description',
          name: 'description',
          type: FIELDTYPE.TEXT,
          isMandatory: true
        }
      ]
    },
    { heading: 'Brand Bonus Prize' },
    {
      heading: FORM.REWARDS,
      fields: [
        {
          isAll: true
        }
      ]
    },
    {
      heading: 'User Requirements',
      fields: [{ isVideo: false, isPhoto: false, isCaption: false }]
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
  ],
  BONUS_THIRD_NO_PUBLIC_SOUND_FORM: [
    {
      heading: 'Task Type',
      fields: []
    },
    {
      heading: 'Task Details',
      fields: [
        { label: 'Name', name: 'task_name', type: FIELDTYPE.TEXT },
        {
          label: 'Title',
          name: 'description_title',
          type: FIELDTYPE.TEXT
        },
        {
          label: 'Description',
          name: 'description',
          type: FIELDTYPE.TEXT,
          isMandatory: true
        }
      ]
    },
    { heading: 'Brand Bonus Prize' },
    {
      heading: FORM.REWARDS,
      fields: [
        {
          isAll: true
        }
      ]
    },
    {
      heading: 'User Requirements',
      fields: [{ isVideo: true, isPhoto: false, isCaption: true }]
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
  ],
  BONUS_THIRD_NO_TIER_VIDEO_FORM: [
    {
      heading: 'Task Type',
      fields: []
    },
    {
      heading: 'Task Details',
      fields: [
        { label: 'Name', name: 'task_name', type: FIELDTYPE.TEXT },
        {
          label: 'Title',
          name: 'description_title',
          type: FIELDTYPE.TEXT
        },
        {
          label: 'Description',
          name: 'description',
          type: FIELDTYPE.TEXT,
          isMandatory: true
        }
      ]
    },
    { heading: 'Brand Bonus Prize' },
    {
      heading: FORM.REWARDS,
      fields: [
        {
          isAll: true
        }
      ]
    },
    {
      heading: 'User Requirements',
      fields: [{ isVideo: false, isPhoto: false, isCaption: false }]
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
  ],
  BONUS_THIRD_NO_TIER_IMAGE_FORM: [
    {
      heading: 'Task Type',
      fields: []
    },
    {
      heading: 'Task Details',
      fields: [
        { label: 'Name', name: 'task_name', type: FIELDTYPE.TEXT },
        {
          label: 'Title',
          name: 'description_title',
          type: FIELDTYPE.TEXT
        },
        {
          label: 'Description',
          name: 'description',
          type: FIELDTYPE.TEXT,
          isMandatory: true
        }
      ]
    },
    { heading: 'Brand Bonus Prize' },
    {
      heading: FORM.REWARDS,
      fields: [
        {
          isAll: true
        }
      ]
    },
    {
      heading: 'User Requirements',
      fields: [{ isVideo: false, isPhoto: false, isCaption: false }]
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
  ],
  BONUS_THIRD_NO_TIER_VIDEO_RESPONSE_FORM: [
    {
      heading: 'Task Type',
      fields: []
    },
    {
      heading: 'Task Details',
      fields: [
        { label: 'Name', name: 'task_name', type: FIELDTYPE.TEXT },
        {
          label: 'Title',
          name: 'description_title',
          type: FIELDTYPE.TEXT
        },
        {
          label: 'Description',
          name: 'description',
          type: FIELDTYPE.TEXT,
          isMandatory: true
        }
      ]
    },
    { heading: 'Brand Bonus Prize' },
    {
      heading: FORM.REWARDS,
      fields: [
        {
          isAll: true
        }
      ]
    },
    {
      heading: 'User Requirements',
      fields: [{ isVideo: false, isPhoto: false, isCaption: false }]
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
  ],
  BONUS_THIRD_NO_TIER_CAPTION_THIS_FORM: [
    {
      heading: 'Task Type',
      fields: []
    },
    {
      heading: 'Task Details',
      fields: [
        { label: 'Name', name: 'task_name', type: FIELDTYPE.TEXT },
        {
          label: 'Title',
          name: 'description_title',
          type: FIELDTYPE.TEXT
        },
        {
          label: 'Description',
          name: 'description',
          type: FIELDTYPE.TEXT,
          isMandatory: true
        }
      ]
    },
    { heading: 'Brand Bonus Prize' },
    {
      heading: FORM.REWARDS,
      fields: [
        {
          isAll: true
        }
      ]
    },
    {
      heading: 'User Requirements',
      fields: [{ isVideo: false, isPhoto: false, isCaption: false }]
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
  ],
  BONUS_THIRD_NO_TIER_SOUND_FORM: [
    {
      heading: 'Task Type',
      fields: []
    },
    {
      heading: 'Task Details',
      fields: [
        { label: 'Name', name: 'task_name', type: FIELDTYPE.TEXT },
        {
          label: 'Title',
          name: 'description_title',
          type: FIELDTYPE.TEXT
        },
        {
          label: 'Description',
          name: 'description',
          type: FIELDTYPE.TEXT,
          isMandatory: true
        }
      ]
    },
    { heading: 'Brand Bonus Prize' },
    {
      heading: FORM.REWARDS,
      fields: [
        {
          isAll: true
        }
      ]
    },
    {
      heading: 'User Requirements',
      fields: [{ isVideo: false, isPhoto: false, isCaption: false }]
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
  ]
};
