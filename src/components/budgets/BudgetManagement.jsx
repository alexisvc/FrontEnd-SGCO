/*
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
  budget,
  fetchBudgetById,
  updateBudgetStatus,
  paymentSummary,
  fetchPaymentSummary,
  registerPayment,
  cancelPayment,
  formatters,
  helpers
}) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [localBudget, setLocalBudget] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);
      try {
        console.log('Fetching budget with ID:', id);
        const result = await fetchBudgetById(id);
        console.log('Fetch result:', result);

        if (!result.success) {
          setError(result.error || 'Error al cargar el presupuesto');
          toast.error(result.error || 'Error al cargar el presupuesto');
          return;
        }

        setLocalBudget(result.data);

        // Solo cargar pagos si el presupuesto está aceptado
        if (result.data.estado === 'aceptado') {
          try {
            await fetchPaymentSummary(id);
          } catch (paymentError) {
            console.error('Error loading payments:', paymentError);
            // No mostrar error por pagos si el presupuesto se cargó bien
          }
        }
      } catch (err) {
        console.error('Error loading budget:', err);
        setError('Error al cargar el presupuesto');
        toast.error('Error al cargar el presupuesto');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadData();
    }
  }, [id, fetchBudgetById, fetchPaymentSummary]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
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
              <Tab 
                label="Pagos" 
                {...a11yProps(1)}
                disabled={localBudget.estado !== 'aceptado'}
              />
            </Tabs>
          </Box>

          <CustomTabPanel value={tabValue} index={0}>
            <BudgetDetails
              budget={localBudget}
              updateBudgetStatus={updateBudgetStatus}
            />
          </CustomTabPanel>

          <CustomTabPanel value={tabValue} index={1}>
            <PaymentDetails
              budget={localBudget}
              paymentSummary={paymentSummary}
              registerPayment={registerPayment}
              cancelPayment={cancelPayment}
              formatters={formatters}
              helpers={helpers}
              fetchPaymentSummary={fetchPaymentSummary}
            />
          </CustomTabPanel>
        </Paper>
      </Container>
    </div>
  );
};

export default BudgetManagement;

*/

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
  budget,
  fetchBudgetById,
  //updateBudgetStatus,
  paymentSummary,
  fetchPaymentSummary,
  registerPayment,
  cancelPayment,
  formatters,
  helpers
}) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [localBudget, setLocalBudget] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await fetchBudgetById(id);
        if (!result.success) {
          setError(result.error || 'Error al cargar el presupuesto');
          toast.error(result.error || 'Error al cargar el presupuesto');
          return;
        }

        setLocalBudget(result.data);

        if (result.data.estado === 'aceptado') {
          try {
            await fetchPaymentSummary(id);
          } catch (paymentError) {
            console.error('Error loading payments:', paymentError);
          }
        }
      } catch (err) {
        console.error('Error loading budget:', err);
        setError('Error al cargar el presupuesto');
        toast.error('Error al cargar el presupuesto');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadData();
    }
  }, [id, fetchBudgetById, fetchPaymentSummary]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
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
              <Tab 
                label="Planificación" 
                {...a11yProps(1)}
                //disabled={localBudget.estado !== 'aceptado'}
              />
              <Tab label="Presupuesto" {...a11yProps(0)} />
              
              <Tab 
                label="Pagos" 
                {...a11yProps(2)}
                //disabled={localBudget.estado !== 'aceptado'}
              />
            </Tabs>
          </Box>
          <CustomTabPanel value={tabValue} index={0}>
            <PlanningDetails
              budget={localBudget}
            />
          </CustomTabPanel>
          <CustomTabPanel value={tabValue} index={1}>
            <BudgetDetails
              budget={localBudget}
              //updateBudgetStatus={updateBudgetStatus}
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
              fetchPaymentSummary={fetchPaymentSummary}
            />
          </CustomTabPanel>
        </Paper>
      </Container>
    </div>
  );
};

export default BudgetManagement;