import React from "react"; // mandatory, storybook needs React to be imported
import "components/Button.scss";
import classNames from "classnames";

export default function Button(props) {
  const buttonClass = classNames('button', {
    'button--confirm': props.confirm,
    'button--danger': props.danger
  });

  return (
    <button
      className={buttonClass}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
}