import React from 'react';
import "./InterviewerList.scss";
import InterviewerListItem from './InterviewerListItem';

export default function InterviewerList(props) {
  const interviewers = props.interviewers;

  const parsedInterviewers =
    interviewers.map((interviewer) => (
      <InterviewerListItem
        {...interviewer}
        key={interviewer.id}
        selected={interviewer.id === props.interviewer}
        setInterviewer={props.setInterviewer}
      />
    ));

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {parsedInterviewers}
      </ul>
    </section>
  );
}

