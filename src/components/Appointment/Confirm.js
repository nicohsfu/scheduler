import React from "react";
import Button from "components/Button";

export default function Confirm(props) {

  return (
    <main className="appointment__card appointment__card--confirm">
      <h1 className="text--semi-bold">{props.message}</h1>
      <section className="appointment__actions">
        <Button danger onClick={props.onCancel} data-testid="cancel">Cancel</Button>
        <Button danger onClick={props.onConfirm} data-testid="confirm">Confirm</Button>
      </section>
    </main>
  );
}