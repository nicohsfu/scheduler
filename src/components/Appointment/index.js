import React, { Fragment } from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Form from "./Form";
import Show from "./Show";
import Empty from "./Empty";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";
import useVisualMode from "../../hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";
const DELETING = "DELETING";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);

    props.bookInterview(props.id, interview)
      .then((() => transition(SHOW)))
      .catch(() => {
        transition(ERROR_SAVE, true);
      });
  }

  function deleter(interview) {

    transition(DELETING);

    props.cancelInterview(props.id, interview)
      .then(() => transition(EMPTY))
      .catch(() => {
        transition(ERROR_DELETE, true);
      });
  }

  return (
    <Fragment>
      <article className="appointment" data-testid="appointment">
        <Header time={props.time} />

        <Fragment>
          {mode === EMPTY && <Empty onAdd={() => {
            transition(CREATE);
          }} />}
          {mode === CREATE && (<Form
            onSave={save}
            onCancel={back}
            student={props.interview && props.interview.student}
            interviewer={props.interview && props.interview.interviewer.id}
            interviewers={props.interviewers}
          />)}
          {mode === EDIT && (<Form
            onSave={save}
            onCancel={() => transition(SHOW)}
            student={props.interview && props.interview.student}
            interviewer={props.interview && props.interview.interviewer.id}
            interviewers={props.interviewers}
          />)}
          {mode === SAVING && (
            <Status message="Saving" />
          )}
          {mode === DELETING && (
            <Status message="Deleting" />
          )}
          {mode === ERROR_SAVE && (
            <Error message="error save" onClose={() => back()} />
          )}
          {mode === ERROR_DELETE && (
            <Error message="error delete" onClose={() => back()} />
          )}
          {mode === CONFIRM && (
            <Confirm
              message="Are you sure?"
              onConfirm={() => deleter()}
              onCancel={() => back()}
            />
          )}
          {mode === SHOW && (
            <Show
              onEdit={() => transition(EDIT)}
              onDelete={() => transition(CONFIRM)}
              student={props.interview.student}
              interviewer={props.interview.interviewer}
            />
          )}
        </Fragment>

      </article>
    </Fragment>
  );
}