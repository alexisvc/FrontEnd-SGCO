import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
  Box
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';

const TreatmentList = ({ treatments, onEdit, onDelete }) => {
  if (!treatments.length) {
    return (
      <Box textAlign="center" py={3}>
        <Typography variant="body1" color="textSecondary">
          No hay tratamientos registrados
        </Typography>
      </Box>
    );
  }

  const handleDelete = (treatment) => {
    if (window.confirm('¿Está seguro de eliminar este tratamiento?')) {
      onDelete(treatment.id);
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography variant="subtitle1" fontWeight="bold">
                Cita
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle1" fontWeight="bold">
                Actividad
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle1" fontWeight="bold">
                Fecha
              </Typography>
            </TableCell>
            <TableCell align="right">
              <Typography variant="subtitle1" fontWeight="bold">
                Monto Abono
              </Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="subtitle1" fontWeight="bold">
                Acciones
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {treatments.map((treatment) => (
            <TableRow key={treatment.id}>
              <TableCell>{treatment.cita}</TableCell>
              <TableCell 
                style={{ 
                  maxWidth: '300px',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}
              >
                {treatment.actividadPlanTrat}
              </TableCell>
              <TableCell>
                {new Date(treatment.fechaPlanTrat).toLocaleDateString('es-ES', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit'
                })}
              </TableCell>
              <TableCell align="right">
                ${Number(treatment.montoAbono).toFixed(2)}
              </TableCell>
              <TableCell align="center">
                <IconButton
                  onClick={() => onEdit(treatment)}
                  color="primary"
                  title="Editar"
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  onClick={() => handleDelete(treatment)}
                  color="error"
                  title="Eliminar"
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell colSpan={3} align="right">
              <Typography variant="subtitle1" fontWeight="bold">
                Total Abonado:
              </Typography>
            </TableCell>
            <TableCell align="right">
              <Typography variant="subtitle1" fontWeight="bold" color="primary">
                ${treatments.reduce((sum, t) => sum + Number(t.montoAbono), 0).toFixed(2)}
              </Typography>
            </TableCell>
            <TableCell />
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TreatmentList;