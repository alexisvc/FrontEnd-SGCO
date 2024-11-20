import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import {
  Button,
  Typography,
  Paper,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Chip
} from '@mui/material';
import { PrintOutlined } from '@mui/icons-material';

// Componente para la versión imprimible
const BudgetContent = React.forwardRef(({ budget, isPrintMode }, ref) => (
  <div ref={ref} className={isPrintMode ? 'print-mode' : ''}>
    {/* Cabecera */}
    <Box mb={3} className={isPrintMode ? 'print-header' : ''}>
      <Typography variant="h4" gutterBottom align="center">
        Presupuesto Dental
      </Typography>
      <Grid container spacing={2} justifyContent="space-between">
        <Grid item xs={12} sm={6}>
          <Typography><strong>Paciente:</strong> {budget.paciente.nombrePaciente}</Typography>
          <Typography><strong>Cédula:</strong> {budget.paciente.numeroCedula}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} textAlign="right">
          <Typography><strong>Fecha:</strong> {new Date(budget.fecha).toLocaleDateString()}</Typography>
          <Typography><strong>Especialidad:</strong> {budget.especialidad}</Typography>
        </Grid>
      </Grid>
    </Box>

    {/* Fases y Procedimientos */}
    {budget.fases.map((fase, faseIndex) => (
      <Box key={faseIndex} mb={4}>
        <Typography variant="h6" gutterBottom>
          {fase.nombre}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          {fase.descripcion}
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>N° de piezas</TableCell>
                <TableCell>Procedimientos</TableCell>
                <TableCell align="right">Costo por unidad</TableCell>
                <TableCell align="right">Costo total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {fase.procedimientos.map((proc, procIndex) => (
                <TableRow key={procIndex}>
                  <TableCell>{proc.numeroPiezas}</TableCell>
                  <TableCell>{proc.nombre}</TableCell>
                  <TableCell align="right">
                    ${proc.costoPorUnidad.toFixed(2)}
                  </TableCell>
                  <TableCell align="right">
                    ${proc.costoTotal.toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell colSpan={3} align="right">
                  <strong>Total de la fase:</strong>
                </TableCell>
                <TableCell align="right">
                  <strong>${fase.total.toFixed(2)}</strong>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    ))}

    {/* Total General */}
    <Box mt={3} mb={3}>
      <Typography variant="h5" align="right">
        Total General: ${budget.totalGeneral.toFixed(2)}
      </Typography>
    </Box>

    {/* Nota al pie */}
    {isPrintMode && (
      <Box mt={4} className="print-footer">
        <Typography variant="body2" align="center">
          Este presupuesto tiene una validez de 30 días a partir de la fecha de emisión.
        </Typography>
        <Typography variant="body2" align="center">
          Los precios pueden estar sujetos a cambios según la evaluación del caso.
        </Typography>
      </Box>
    )}
  </div>
));

const BudgetDetails = ({ budget, updateBudgetStatus }) => {
  const componentRef = useRef();
  const [isPrintMode, setIsPrintMode] = React.useState(false);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    onBeforeGetContent: () => setIsPrintMode(true),
    onAfterPrint: () => setIsPrintMode(false),
  });

  const handleStatusChange = async (newStatus) => {
    try {
      await updateBudgetStatus(budget._id, newStatus);
    } catch (error) {
      console.error('Error al actualizar el estado:', error);
    }
  };

  const getStatusColor = (status) => {
    const statusColors = {
      borrador: 'default',
      emitido: 'primary',
      aceptado: 'success',
      rechazado: 'error'
    };
    return statusColors[status] || 'default';
  };

  return (
    <Box>
      {/* Encabezado con estado y acciones */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box display="flex" alignItems="center" gap={2}>
          <Typography variant="subtitle1">
            Estado:
          </Typography>
          <Chip
            label={budget.estado.toUpperCase()}
            color={getStatusColor(budget.estado)}
          />
        </Box>
        <Box display="flex" gap={2}>
          {budget.estado === 'borrador' && (
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleStatusChange('emitido')}
            >
              Emitir Presupuesto
            </Button>
          )}
          {budget.estado === 'emitido' && (
            <>
              <Button
                variant="contained"
                color="success"
                onClick={() => handleStatusChange('aceptado')}
              >
                Aceptar
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={() => handleStatusChange('rechazado')}
              >
                Rechazar
              </Button>
            </>
          )}
          <Button
            startIcon={<PrintOutlined />}
            onClick={handlePrint}
            variant="outlined"
          >
            Imprimir
          </Button>
        </Box>
      </Box>

      {/* Contenido del presupuesto */}
      <BudgetContent 
        ref={componentRef}
        budget={budget}
        isPrintMode={isPrintMode}
      />

      <style>
        {`
          @media print {
            .print-mode {
              padding: 20px;
            }
            .print-header {
              margin-bottom: 30px;
            }
            .print-footer {
              margin-top: 50px;
              border-top: 1px solid #ddd;
              padding-top: 20px;
            }
          }
        `}
      </style>
    </Box>
  );
};

export default BudgetDetails;