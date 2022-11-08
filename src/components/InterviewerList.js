import React from 'react';
import "./InterviewerList.scss";
import InterviewerListItem from './InterviewerListItem';
import PropTypes from 'prop-types';

export default function InterviewerList(props) {
  const interviewers = props.interviewers;

  const parsedInterviewers =
    interviewers.map((interviewer) => (
      <InterviewerListItem
        {...interviewer}
        key={interviewer.id}
        selected={interviewer.id === props.value}
        setInterviewer={() => props.onChange(interviewer.id)}
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

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};
