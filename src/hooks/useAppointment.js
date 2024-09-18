import { useState, useEffect } from 'react';
import appointmentsService from '../services/appointmentsService';

export function useAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Obtener todas las citas
  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const data = await appointmentsService.getAllAppointments();
      setAppointments(data);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  // Obtener citas por odontólogo
  const fetchAppointmentsByOdontologo = async (odontologoId) => {
    try {
      setLoading(true);
      const data = await appointmentsService.getAppointmentsByOdontologo(odontologoId);
      setAppointments(data);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  // Crear una nueva cita
  const createAppointment = async (newAppointment) => {
    try {
      setLoading(true);
      const data = await appointmentsService.createAppointment(newAppointment);
      setAppointments([...appointments, data]);
      setLoading(false);
      return data;
    } catch (err) {
      setError(err);
      setLoading(false);
      throw err;
    }
  };

  // Eliminar una cita
  const deleteAppointment = async (id) => {
    try {
      setLoading(true);
      await appointmentsService.deleteAppointment(id);
      setAppointments(appointments.filter((appointment) => appointment.id !== id));
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  return {
    appointments,
    loading,
    error,
    fetchAppointments,
    fetchAppointmentsByOdontologo,
    createAppointment,
    deleteAppointment,
  };
}
