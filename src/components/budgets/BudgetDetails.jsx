import React, { useState } from 'react';
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
  Container,
  Dialog,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useReactToPrint } from 'react-to-print';
import { useNavigate } from 'react-router-dom';
import { PrintOutlined, ArrowBack } from '@mui/icons-material';

const BudgetDetails = ({ budget, onStatusChange }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [isPrintMode, setIsPrintMode] = useState(false);
  const componentRef = React.useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    onBeforeGetContent: () => {
      setIsPrintMode(true);
    },
    onAfterPrint: () => {
      setIsPrintMode(false);
    },
  });

  const BudgetContent = React.forwardRef((props, ref) => (
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

  return (
    <Container maxWidth="lg">
      {!isPrintMode && (
        <Box mb={2} display="flex" justifyContent="space-between">
          <Button
            startIcon={<ArrowBack />}
            onClick={() => navigate(-1)}
            variant="outlined"
          >
            Volver
          </Button>
          <Button
            startIcon={<PrintOutlined />}
            onClick={handlePrint}
            variant="contained"
            color="primary"
          >
            Imprimir Presupuesto
          </Button>
        </Box>
      )}

      <BudgetContent ref={componentRef} />

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
    </Container>
  );
};

export default BudgetDetails;