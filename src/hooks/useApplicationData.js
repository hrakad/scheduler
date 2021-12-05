import React, { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8001/api/days"),
      axios.get("http://localhost:8001/api/appointments"),
      axios.get("http://localhost:8001/api/interviewers")
    ])
      .then((all) => {
        setState((prev) => ({
          ...prev,
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data,
        }))
      });
  }, [])
  // console.log(state.days);
  // console.log(state.appointments);
  // console.log(state.interviewers);

  function updateSpots(id, days, value) {
    for (const day of days) {
      if (day.appointments.includes(id)) {
        day.spots = parseInt(day.spots) + value
      }
    }
    return days;
  }

  function bookInterview(id, interview, newRequest) {
    //console.log(id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const updateState = setState({
      ...state,
      appointments
    });
    return axios.put(`http://localhost:8001/api/appointments/${id}`, { interview })
      .then((res) => {
        const days = newRequest ? updateSpots(id, [...state.days], -1) : [...state.days]
        setState(prev => ({
          ...prev,
          appointments,
          days
        }))
      })
  }

  const deleteInterview = (id) => {
    const updateState = setState({
      ...state,
      appointments: {
        ...state.appointments,
        [id]: { ...state.appointments[id], interview: null },
      },
    });
    return axios
      .delete(`http://localhost:8001/api/appointments/${id}`)
      .then((res) => {
        const days = updateSpots(id, [...state.days], 1);
        setState((prev) => {
          const newAppointment = {
            ...prev.appointments[id],
            interview: null
          }
          return {
            ...prev,
            appointments:
            {
              ...prev.appointments,
              [id]: newAppointment
            },
            days
          }
        })
      });
  };

  return { setDay, state, bookInterview, deleteInterview };
}