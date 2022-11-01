import React from 'react';
import "./InterviewerListItem.scss";
import classNames from "classnames";

export default function InterviewerListItem(props) {

  const interviewersClass = classNames('interviewers__item', {
    'interviewers__item--selected': props.selected,
  });

  return (
    <li onClick={props.setInterviewer} className={interviewersClass}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
}

