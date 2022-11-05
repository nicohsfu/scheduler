import React, { Fragment } from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Form from "./Form";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from "../../hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";

export default function Appointment(props) {

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  return (
    <Fragment>
      <article className="appointment">
        <Header time={props.time} />

        <Fragment>
          {mode === EMPTY && <Empty onAdd={() => {
            transition(CREATE);
          }} />}
          {mode === CREATE && (<Form onCancel={back}
            student={props.interview && props.interview.student}
            interviewer={props.interview && props.interview.interviewer}
            interviewers={props.interviewers}
          />)}
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