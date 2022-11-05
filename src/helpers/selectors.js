export function getAppointmentsForDay(state, day) {
  // console.log("{ state, day }", { state, day });

  //... returns an array of appointments for that day
  let appointmentsForThatDay = [];

  // We need to start by finding the object in our state.days array who's name matches the provided day. With this information we can now access that specific days appointment array.
  const dayObject = state.days.find((element) => {
    return element.name === day;
  });

  // We should also probably do a bit of validation. If there are no appointments on the given day, our days data will be empty. According to our tests, in a case like this, we should return an empty array.
  if (!dayObject) {
    return [];
  }

  // Once we have access to the appointment array for the given day, we'll need to iterate through it, comparing where it's id matches the id of states.appointments and return that value.
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

export function getInterviewersForDay (state, day) {
  let interviewerList = [];

  for (const interviewerDay of state.days) {
    if (interviewerDay.name === day) {
      interviewerList = interviewerDay.interviewers;
    }
  };

  let finalInterviewerList = interviewerList.map((id) => {
    for (let interviewer in state.interviewers) {
      if (Number(interviewer) === id) {
        return state.interviewers[interviewer];
      }
    }
  });

  return finalInterviewerList;
}