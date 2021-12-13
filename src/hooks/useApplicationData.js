import { useState, useEffect } from "react";
import axios from "axios";


// API link constants


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
    ]).then((all) => {
      setState(prev => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
      }))
    });
  }, []);


  function bookInterview(id, interview) {
    let spots = 0;
    let dayID = 0;
    let appointmentIDs = [];
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`${"http://localhost:8001/api/appointments"}/${id}`, { interview })
      .then(() => {
        for (const day of state.days) {
          if (day.appointments.includes(id)) {
            dayID = day.id;
            appointmentIDs = day.appointments;
          }
        }
        appointmentIDs.forEach(appointmentID => {
          if (!appointments[appointmentID].interview) {
            spots++;
          }
        });
        const day = { ...state.days[dayID - 1], spots: spots };
        const days = [...state.days];
        days[dayID - 1] = day;
        setState({
          ...state,
          appointments,
          days
        });
      });
  }

  function deleteInterview(id) {
    let spots = 0;
    let dayID = 0;
    let appointmentIDs = [];
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.delete(`${"http://localhost:8001/api/appointments"}/${id}`, appointment)
      .then(() => {
        for (const day of state.days) {
          if (day.appointments.includes(id)) {
            dayID = day.id;
            appointmentIDs = day.appointments;
          }
        }
        appointmentIDs.forEach(appointmentID => {
          if (!appointments[appointmentID].interview) {
            spots++;
          }
        });
        const day = { ...state.days[dayID - 1], spots: spots };
        const days = [...state.days];
        days[dayID - 1] = day;
        setState({
          ...state,
          appointments,
          days
        });
      });
  }

  return { state, setDay, bookInterview, deleteInterview };
}