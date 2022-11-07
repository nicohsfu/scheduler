import React, { Fragment } from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Form from "./Form";
import Show from "./Show";
import Empty from "./Empty";
import Status from "./Status";
import useVisualMode from "../../hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";

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
          {mode === SAVING && (
            <Status message="Saving" />
          )}
          {mode === SHOW && (
            <Show
              student={props.interview.student}
              interviewer={props.interview.interviewer}
            />
          )}
        </Fragment>

      </article>
    </Fragment>
  );
}