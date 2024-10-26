// components/BudgetCreate.js
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBudgets } from '../../hooks/useBudgets';
import { useBudgetProcedimientos } from '../../hooks/useBudgetProcedimientos';

export function BudgetCreate() {
  const { patientId } = useParams();
  const navigate = useNavigate();
  const { createBudget, loading: budgetLoading, error: budgetError } = useBudgets();
  const { 
    createProcedimiento, 
    createFase, 
    loading: procedimientoLoading, 
    error: procedimientoError 
  } = useBudgetProcedimientos();

  // Estados
  const [budgetId, setBudgetId] = useState(null);
  const [procedimientoId, setProcedimientoId] = useState(null);
  const [showProcedimientoForm, setShowProcedimientoForm] = useState(false);
  const [procedimientoData, setProcedimientoData] = useState({
    nombreProcedimiento: ''
  });
  const [faseData, setFaseData] = useState({
    nombreFase: '',
    totalFase: ''
  });

  // Crear presupuesto
  const handleCreateBudget = async () => {
    const { success, data } = await createBudget({
      paciente: patientId,
      procedimientos: []
    });

    if (success) {
      setBudgetId(data.id);
      setShowProcedimientoForm(true); // Mostrar formulario de procedimiento después de crear presupuesto
    }
  };

  // Crear procedimiento
  const handleCreateProcedimiento = async (e) => {
    e.preventDefault();
    if (!procedimientoData.nombreProcedimiento.trim()) return;

    const { success, data } = await createProcedimiento(budgetId, {
      nombreProcedimiento: procedimientoData.nombreProcedimiento
    });

    if (success) {
      setProcedimientoId(data.procedimientos[data.procedimientos.length - 1].id);
      setProcedimientoData({ nombreProcedimiento: '' });
      // No ocultamos el formulario para permitir añadir más procedimientos
    }
  };

  // Crear fase
  const handleCreateFase = async (e) => {
    e.preventDefault();
    if (!faseData.nombreFase.trim() || !faseData.totalFase) return;

    const { success } = await createFase(budgetId, procedimientoId, {
      nombreFase: faseData.nombreFase,
      totalFase: Number(faseData.totalFase)
    });

    if (success) {
      setFaseData({ nombreFase: '', totalFase: '' });
      // Opcional: aquí podrías decidir si quieres permitir más fases o reiniciar para un nuevo procedimiento
      setProcedimientoId(null); // Si quieres volver al formulario de procedimiento
    }
  };

  const loading = budgetLoading || procedimientoLoading;
  const error = budgetError || procedimientoError;

  if (loading) return <div className="p-4">Cargando...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Crear Presupuesto</h2>

      {!budgetId ? (
        <div className="mb-4">
          <button
            onClick={handleCreateBudget}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition"
          >
            Iniciar Presupuesto
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Formulario de Procedimiento */}
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-semibold mb-4">
              {procedimientoId ? "Agregar Fase" : "Agregar Procedimiento"}
            </h3>

            {!procedimientoId ? (
              <form onSubmit={handleCreateProcedimiento} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre del Procedimiento
                  </label>
                  <input
                    type="text"
                    value={procedimientoData.nombreProcedimiento}
                    onChange={(e) => setProcedimientoData({
                      nombreProcedimiento: e.target.value
                    })}
                    className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Ej: Ortodoncia"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition"
                >
                  Agregar Procedimiento
                </button>
              </form>
            ) : (
              <form onSubmit={handleCreateFase} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre de la Fase
                  </label>
                  <input
                    type="text"
                    value={faseData.nombreFase}
                    onChange={(e) => setFaseData({
                      ...faseData,
                      nombreFase: e.target.value
                    })}
                    className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Ej: Diagnóstico"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Total de la Fase
                  </label>
                  <input
                    type="number"
                    value={faseData.totalFase}
                    onChange={(e) => setFaseData({
                      ...faseData,
                      totalFase: e.target.value
                    })}
                    className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Ej: 150"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition"
                  >
                    Agregar Fase
                  </button>
                  <button
                    type="button"
                    onClick={() => setProcedimientoId(null)}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded transition"
                  >
                    Nuevo Procedimiento
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Botón para finalizar */}
          <div className="mt-6">
            <button
              onClick={() => navigate(`/patients/${patientId}/budgets`)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition"
            >
              Finalizar Presupuesto
            </button>
          </div>
        </div>
      )}
    </div>
  );
}