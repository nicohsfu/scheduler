import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData(initial) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });

  function getCurrentDay(day, days) {
    // TODO - use find instead of filter
    // state.days.find(day => day.appointments.includes(id))
    const foundDay = days.filter((d) => d.name === day); 

    return foundDay[0]; // returns day *object* which has the spots property
  }

  function calcRemainingSpots(day, days, appointments) {
    const currentDay = getCurrentDay(day, days);

    const maxAppointmentId = currentDay.id * 5;
    const minAppointmentId = maxAppointmentId - 4;

    let spotsRemaining = Object.values(appointments).filter((a) => a.id >= minAppointmentId && a.id <= maxAppointmentId && a.interview === null);
    // console.log("spotsRemaining", spotsRemaining);

    return spotsRemaining.length;
  }

  function bookInterview(id, interview) {
    // console.log("id and interview", id, interview);

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const currentDay = state.days.find(day => day.appointments.includes(id));
    const updatedSpots = calcRemainingSpots(state.day, state.days, appointments);

    const newDay = { ...currentDay, spots: updatedSpots };
    const newDays = state.days.map((day) => { return day.name === state.day ? newDay : day; });

    return axios.put(`/api/appointments/${id}`, { interview })
      .then(() => {
        setState(prev => ({ ...prev, appointments, days: newDays }));
      });
  }

  function cancelInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const currentDay = state.days.find(day => day.appointments.includes(id));
    const updatedSpots = calcRemainingSpots(state.day, state.days, appointments);

    const newDay = { ...currentDay, spots: updatedSpots };
    const newDays = state.days.map((day) => { return day.name === state.day ? newDay : day; });

    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        setState({ ...state, appointments, days: newDays });
      });
  }

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      // console.log("all[0].data: ", all[0].data); // /api/days
      // console.log("all[1].data: ", all[1].data); // /api/appointments
      // console.log("all[2].data: ", all[2].data); // /api/interviewers
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    });
  }, []);

  return { state, setDay, bookInterview, cancelInterview };
}