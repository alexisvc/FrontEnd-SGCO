import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Tabs,
  Tab,
  Typography,
  Button,
  Paper,
  CircularProgress
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { toast } from 'react-toastify';
import BudgetDetails from './BudgetDetails';
import PaymentDetails from './PaymentDetails';
import PlanningDetails from './PlanningDetails';
import patientTreatmentService from '../../services/patientTreatmentService';

function CustomTabPanel({ children, value, index }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`budget-tabpanel-${index}`}
      aria-labelledby={`budget-tab-${index}`}
    >
      {value === index && (
        <Box sx={{ py: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `budget-tab-${index}`,
    'aria-controls': `budget-tabpanel-${index}`,
  };
}

const BudgetManagement = ({
  fetchBudgetById,
  paymentSummary,
  fetchPaymentSummary,
  registerPayment,
  cancelPayment,
  formatters,
  helpers
}) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [treatmentDetails, setTreatmentDetails] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [localBudget, setLocalBudget] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      if (!id) return;
      
      setLoading(true);
      setError(null);
      
      try {
        console.log('Loading budget data for ID:', id);
        const result = await fetchBudgetById(id);
        console.log('Budget data loaded:', result.data);
  
        setLocalBudget(result.data);
  
        // Verificar si hay treatmentPlan
        console.log('TreatmentPlan ID:', result.data.treatmentPlan);
  
        if (result.data.treatmentPlan) {
          try {
            console.log('Fetching treatment plan:', result.data.treatmentPlan);
            const treatmentData = await patientTreatmentService.getById(result.data.treatmentPlan);
            console.log('Treatment data loaded:', treatmentData);
            setTreatmentDetails(treatmentData);
          } catch (treatmentError) {
            console.error('Error loading treatment:', treatmentError);
          }
        } else {
          console.log('No treatment plan associated with this budget');
        }
  
      } catch (err) {
        setError(err.message || 'Error al cargar datos');
      } finally {
        setLoading(false);
      }
    };
  
    loadData();
  }, [id]);


  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleUpdateActivityStatus = async (index, currentStatus) => {
    const newStatus = currentStatus === 'pendiente' ? 'en-proceso' : 
                     currentStatus === 'en-proceso' ? 'completado' : 
                     currentStatus;
    
    try {
      await onUpdateActivity(index, newStatus);
      toast.success('Estado actualizado correctamente');
    } catch (error) {
      toast.error('Error al actualizar el estado');
    }
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg">
        <Button
          variant="outlined"
          startIcon={<ArrowBack />}
          onClick={() => navigate("/presupuestos")}
          sx={{ mb: 2 }}
        >
          Volver
        </Button>
        <Paper sx={{ p: 3 }}>
          <Typography color="error" align="center">
            {error}
          </Typography>
        </Paper>
      </Container>
    );
  }

  if (!localBudget) {
    return (
      <Container maxWidth="lg">
        <Typography color="error">Presupuesto no encontrado</Typography>
      </Container>
    );
  }

  return (
    <div style={{ backgroundColor: '#f5f1ef', minHeight: '100vh', padding: '20px' }}>
      <Container maxWidth="lg">
        <Button
          variant="outlined"
          startIcon={<ArrowBack />}
          onClick={() => navigate("/presupuestos")}
          sx={{ mb: 2 }}
        >
          Volver
        </Button>

        <Paper sx={{ p: 2, mb: 3 }}>
          <Box sx={{ mb: 3 }}>
            <Typography variant="h5" gutterBottom>
              Presupuesto - {localBudget.paciente.nombrePaciente}
            </Typography>

            {treatmentDetails && (
            <Typography variant="subtitle1" color="text.secondary">
              Planificación: {treatmentDetails.especialidad} - 
              {treatmentDetails.actividades.length} actividades
            </Typography>
          )}
            <Typography variant="subtitle1" color="text.secondary">
              Fecha: {new Date(localBudget.fecha).toLocaleDateString()}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Especialidad: {localBudget.especialidad}
            </Typography>
          </Box>

          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              aria-label="budget management tabs"
            >
              <Tab label="Presupuesto" {...a11yProps(0)} />
              <Tab label="Planificación" {...a11yProps(1)} />
              <Tab label="Pagos" {...a11yProps(2)} />
            </Tabs>
          </Box>

          <CustomTabPanel value={tabValue} index={0}>
            <BudgetDetails
              budget={localBudget}
              treatmentDetails={treatmentDetails}
            />
          </CustomTabPanel>

          <CustomTabPanel value={tabValue} index={1}>
            <PlanningDetails
              budget={localBudget}
              treatmentDetails={treatmentDetails}
            />
          </CustomTabPanel>

          <CustomTabPanel value={tabValue} index={2}>
            <PaymentDetails
              budget={localBudget}
              paymentSummary={paymentSummary}
              registerPayment={registerPayment}
              cancelPayment={cancelPayment}
              formatters={formatters}
              helpers={helpers}
              treatmentDetails={treatmentDetails}
              fetchPaymentSummary={fetchPaymentSummary}
            />
          </CustomTabPanel>
        </Paper>
      </Container>
    </div>
  );
};

export default BudgetManagement;