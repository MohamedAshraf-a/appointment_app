// app/_utils/DataAppointments.js
let appointments = []; 

export const getAppointments = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(appointments);
    }, 300);
  });
};

export const addAppointment = async (appointment) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newAppointment = {
        id: Date.now(),
        ...appointment, 
      };
      appointments.push(newAppointment);
      resolve(newAppointment);
    }, 300);
  });
};

export const deleteAppointment = async (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      appointments = appointments.filter((a) => a.id !== id);
      resolve(true);
    }, 300);
  });
};