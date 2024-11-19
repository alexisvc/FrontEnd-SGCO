import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
  Container
} from '@mui/material';
import { useReactToPrint } from 'react-to-print';
import { PrintOutlined, ArrowBack } from '@mui/icons-material';
import { useBudgets } from '../../hooks/useBudgets';

const BudgetContent = React.forwardRef(({ currentBudget, isPrintMode }, ref) => (
  <div ref={ref} className={isPrintMode ? 'print-mode' : ''}>
    {/* Cabecera */}
    <Box mb={3} className={isPrintMode ? 'print-header' : ''}>
      <Typography variant="h4" gutterBottom align="center">
        Presupuesto Dental
      </Typography>
      <Grid container spacing={2} justifyContent="space-between">
        <Grid item xs={12} sm={6}>
          <Typography><strong>Paciente:</strong> {currentBudget.paciente.nombrePaciente}</Typography>
          <Typography><strong>Cédula:</strong> {currentBudget.paciente.numeroCedula}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} textAlign="right">
          <Typography><strong>Fecha:</strong> {new Date(currentBudget.fecha).toLocaleDateString()}</Typography>
          <Typography><strong>Especialidad:</strong> {currentBudget.especialidad}</Typography>
        </Grid>
      </Grid>
    </Box>

    {/* Fases y Procedimientos */}
    {currentBudget.fases.map((fase, faseIndex) => (
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
        Total General: ${currentBudget.totalGeneral.toFixed(2)}
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

const BudgetDetails = () => {
  // Hooks en orden consistente
  const navigate = useNavigate();
  const { id } = useParams();
  const componentRef = useRef();
  const [isPrintMode, setIsPrintMode] = useState(false);
  const { currentBudget, loading, error, fetchBudgetById } = useBudgets();

  // Efecto para cargar el presupuesto
  useEffect(() => {
    const loadBudget = async () => {
      try {
        await fetchBudgetById(id);
      } catch (error) {
        console.error('Error al cargar el presupuesto:', error);
      }
    };
    
    if (id) {
      loadBudget();
    }
  }, [id, fetchBudgetById]);

  // Configuración de impresión
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    onBeforeGetContent: () => setIsPrintMode(true),
    onAfterPrint: () => setIsPrintMode(false),
  });

  if (loading) return <Typography>Cargando...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!currentBudget) return <Typography>Presupuesto no encontrado</Typography>;

  return (
    <Container maxWidth="lg">
      {!isPrintMode && (
        <Box mb={2} display="flex" justifyContent="space-between">
          <Button
            startIcon={<ArrowBack />}
            onClick={() => navigate("/presupuestos")}
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

      <BudgetContent 
        ref={componentRef}
        currentBudget={currentBudget}
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
    </Container>
  );
};

export default BudgetDetails;