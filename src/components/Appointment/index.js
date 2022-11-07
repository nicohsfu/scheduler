import React, { Fragment } from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Form from "./Form";
import Show from "./Show";
import Empty from "./Empty";
import Status from "./Status";
import Confirm from "./Confirm";
import useVisualMode from "../../hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";
const DELETING = "DELETING";
const EDIT = "EDIT";

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
      .then((() => transition(SHOW)));
  }

  function deleter(interview) {

    transition(DELETING);

    props.cancelInterview(props.id, interview)
      .then(() => transition(EMPTY));
  }

  return (
    <Fragment>
      <article className="appointment">
        <Header time={props.time} />

        <Fragment>
          {mode === EMPTY && <Empty onAdd={() => {
            transition(CREATE);
          }} />}
          {mode === CREATE && (<Form
            onSave={save}
            onCancel={back}
            student={props.interview && props.interview.student}
            interviewer={props.interview && props.interview.interviewer}
            interviewers={props.interviewers}
          />)}
          {mode === EDIT && (<Form
            onSave={save}
            onCancel={() => { transition(SHOW); }}
            student={props.interview && props.interview.student}
            interviewer={props.interview && props.interview.interviewer}
            interviewers={props.interviewers}
          />)}
          {mode === SAVING && (
            <Status message="Saving" />
          )}
          {mode === DELETING && (
            <Status message="Deleting" />
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
              onEdit={() => { transition(EDIT); }}
              onDelete={() => { transition(CONFIRM); }}
              student={props.interview.student}
              interviewer={props.interview.interviewer}
            />
          )}
        </Fragment>

      </article>
    </Fragment>
  );
}