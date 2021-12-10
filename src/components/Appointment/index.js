import React from 'react';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';
import Error from './Error';

import useVisualMode from 'hooks/useVisualMode';

import "./styles.scss";

/************** Constants **************/
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREAT";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {


  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer, newRequest) {
    // if (!interviewer) {
    //   transition(ERROR_SAVE);
    //   return;
    // }
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview, newRequest)
      .then(() => {
        transition(SHOW)
      })
      .catch(() => {
        transition(ERROR_SAVE, true)
      })
  }


  const deleteInterview = () => {
    transition(DELETING);
    props.deleteInterview(props.id)
      .then(() => {
        transition(EMPTY);
      })
      .catch(() => {
        transition(ERROR_DELETE, true)
      })
  };

  const cancel = () => {
    back();
  };
  //console.log(props.interview);

  return (
    <article className="appointment" data-testid="appointment">
      <Header
        time={props.time}>
      </Header>

      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          deleteInterview={() => transition(CONFIRM)}
          editInterview={() => transition(EDIT)}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={() => cancel()}
          onSave={save}
          newRequest={true}
        />
      )}
      {mode === EDIT && (
        <Form
          interviewers={props.interviewers}
          interviewer={props.interview.interviewer && props.interview.interviewer.id}
          student={props.interview.student}
          onCancel={() => cancel()}
          onSave={save}
          newRequest={false}
        />
      )}
      {mode === CONFIRM && (
        <Confirm
          onConfirm={deleteInterview}
          onCancel={() => cancel()}
          message="Are you sure you would like to delete?"
        />
      )}

      {mode === SAVING && <Status message="Saving" />}
      {mode === DELETING && <Status message="Deleting" />}
      {mode === ERROR_DELETE && (
        <Error message="Could not cancel Appointment" onCancel={() => back()} />
      )}
      {mode === ERROR_SAVE && (
        <Error message="Could not save Appointment" onCancel={() => back()} />
      )}

    </article>
  )
}
