export function getAppointmentsForDay(state, day) {
  let appointmentsForThatDay = [];

  const dayObject = state.days.find((element) => {
    return element.name === day;
  });

  if (!dayObject) {
    return [];
  }

  appointmentsForThatDay = dayObject.appointments.map((element) => {
    return state.appointments[element];
  });

  return appointmentsForThatDay; // result: [ {id:1, time: '12pm', interview: null} ]
}

export function getInterview(state, interview) {

  // The function should return a new object containing the interview data when we pass it an object that contains the interviewer. Otherwise, the function should return null.

  let interviewObject = {};

  if (!interview) {
    return null;
  }

  interviewObject["student"] = interview.student;
  interviewObject["interviewer"] = state.interviewers[interview.interviewer];

  return interviewObject;

  // should return an object like this:
  // {  
  //   "student": "Lydia Miller-Jones",
  //   "interviewer": {  
  //     "id": 1,
  //     "name": "Sylvia Palmer",
  //     "avatar": "https://i.imgur.com/LpaY82x.png"
  //   }
  // }
}

export function getInterviewersForDay(state, day) {
  let interviewersForThatDay = [];

  const interviewerObject = state.days.find((element) => {
    return element.name === day;
  });

  if (!interviewerObject) {
    return [];
  }

  interviewersForThatDay = interviewerObject.interviewers.map((element) => {
    return state.interviewers[element];
  });

  return interviewersForThatDay;
}