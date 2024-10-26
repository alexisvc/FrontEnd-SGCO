// components/ProcedimientoCreate.js
import { useState } from 'react';
import { useBudgetProcedimientos } from '../../../hooks/useBudgetProcedimientos';

export function ProcedimientoCreate({ budgetId, onProcedimientoCreated }) {
  const { createProcedimiento, createFase, loading, error } = useBudgetProcedimientos();

  const [procedimientoData, setProcedimientoData] = useState({
    nombreProcedimiento: '',
    showFaseForm: false
  });

  const [faseData, setFaseData] = useState({
    nombreFase: '',
    totalFase: 0
  });

  const [procedimientoId, setProcedimientoId] = useState(null);

  const handleCreateProcedimiento = async (e) => {
    e.preventDefault();
    if (!procedimientoData.nombreProcedimiento) return;

    const { success, data } = await createProcedimiento(budgetId, {
      nombreProcedimiento: procedimientoData.nombreProcedimiento
    });

    if (success) {
      setProcedimientoId(data.procedimientos[data.procedimientos.length - 1].id);
      setProcedimientoData(prev => ({ ...prev, showFaseForm: true }));
      if (onProcedimientoCreated) onProcedimientoCreated(data);
    }
  };

  const handleCreateFase = async (e) => {
    e.preventDefault();
    if (!faseData.nombreFase || !faseData.totalFase) return;

    const { success, data } = await createFase(budgetId, procedimientoId, faseData);
    if (success) {
      setFaseData({
        nombreFase: '',
        totalFase: 0
      });
    }
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="space-y-4">
      {!procedimientoId ? (
        <form onSubmit={handleCreateProcedimiento} className="space-y-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nombre del Procedimiento
            </label>
            <input
              type="text"
              value={procedimientoData.nombreProcedimiento}
              onChange={(e) => setProcedimientoData({
                ...procedimientoData,
                nombreProcedimiento: e.target.value
              })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
              placeholder="Ingrese el nombre del procedimiento"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Crear Procedimiento
          </button>
        </form>
      ) : (
        <form onSubmit={handleCreateFase} className="space-y-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nombre de la Fase
            </label>
            <input
              type="text"
              value={faseData.nombreFase}
              onChange={(e) => setFaseData({
                ...faseData,
                nombreFase: e.target.value
              })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
              placeholder="Ingrese el nombre de la fase"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Total de la Fase
            </label>
            <input
              type="number"
              value={faseData.totalFase}
              onChange={(e) => setFaseData({
                ...faseData,
                totalFase: Number(e.target.value)
              })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
              placeholder="Ingrese el total de la fase"
            />
          </div>
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Agregar Fase
          </button>
        </form>
      )}
    </div>
  );
}