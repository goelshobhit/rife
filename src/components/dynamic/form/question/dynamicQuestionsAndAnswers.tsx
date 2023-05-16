import { Button, Divider, TextField } from '@material-ui/core';

import { Field, FieldArray } from 'formik';
import { styled } from '@material-ui/core/styles';
import map from 'lodash/map';
import get from 'lodash/get';
import size from 'lodash/size';
import { TrashIcon, AddIcon } from '../../../../assets';

const SectionStyle = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
}));

const QuestionStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  maxWidth: '100%',
  margin: theme.spacing(2, 0, 2, 2)
}));

const DividerStyle = styled(Divider)(({ theme }) => ({
  gap: '10px',
  height: '1px',
  width: '100%',
  background: '#D8D8D8',
  borderRadius: theme.spacing(1),
  flexGrow: 0
}));

const RowStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  margin: '16px 10px'
}));

const AnsRowStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  padding: `10px 0px`
}));

const AnswerInputRender = ({ field, form, ...props }: any) => (
  <TextField style={{ width: '100%' }} {...field} {...props} />
);

const AnswersFieldArray = ({ questionItem, name }: any) => (
  <FieldArray
    name={name}
    render={(arrayHelpers) => (
      <div style={{ width: '100%' }}>
        {get(questionItem,'Question Answers').length ? (
          get(questionItem,'Question Answers').map((color: any, index: number) => (
            <div key={index} style={{ width: '100%' }}>
              <AnsRowStyle>
                <Field
                  name={`${name}.${index}`}
                  component={AnswerInputRender}
                  label={`Answers ${index + 1}`}
                />
                {index === size(get(questionItem, 'Question Answers', [])) - 1 ? (
                  <Button
                  variant="outlined"
                  className="button"
                  color="info"
                    disabled={size(get(questionItem, 'Question Answers', [])) > 5}
                    onClick={() => {
                      arrayHelpers.insert(size(get(questionItem,'Question Answers')), '');
                    }}
                  >
                    <AddIcon />
                  </Button>
                ) : (
                  <Button
                  variant="outlined"
                  color="info"
                  className="button"
                    disabled={size(get(questionItem, 'Question Answers', [])) < 3}
                    onClick={() => {
                      arrayHelpers.remove(index);
                    }}
                  >
                    <TrashIcon />
                  </Button>
                )}
              </AnsRowStyle>
            </div>
          ))
        ) : (
          <div />
        )}
      </div>
    )}
  />
);

export const DynamicQuestionsAndAnswers = (props: any) => {
  const {
    form: {
      values: { questionsAndAnswers },
      handleChange
    },
    insert,
    disabledz
  } = props;

  return (
    <SectionStyle>
      <Button
        variant="contained"
        color="primary"
        className="button"
        disabled={size(questionsAndAnswers) > 5}
        onClick={() =>
          insert(size(questionsAndAnswers) + 1, {'Survey Question': ' ',  "Question Status": 0,'Question Answers': new Array(2).fill(' ') })
        }
      >
        + Add New
      </Button>
      <FieldArray
        name="questionsAndAnswers"
        render={(arrayHelpers) =>
          map(questionsAndAnswers, (item: any, index: number) => (
            <div key={index} style={{ width: '100%' }}>
              {index !== 0 && <DividerStyle />}
              <RowStyle>
                <QuestionStyle key={index}>
                  <TextField
                    name={`questionsAndAnswers.${index}.Survey Question`}
                    fullWidth
                    label={`Questions ${index + 1}`}
                    onChange={handleChange}
                    placeholder="Please write your questions here..."
                  />
                </QuestionStyle>

                <AnswersFieldArray
                  name={`questionsAndAnswers.${index}.Question Answers`}
                  questionItem={item}
                />
              </RowStyle>
            </div>
          ))
        }
      />
    </SectionStyle>
  );
};
