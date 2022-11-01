import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  const days = props.days;

  const parsedDays =
    days.map((day) => (
      <DayListItem {...day} />
    ));

  return (
    <ul>
      {parsedDays}
    </ul>
  );
}
