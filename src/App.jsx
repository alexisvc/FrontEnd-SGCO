import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LoginForm } from "./components/user/LoginForm";
import RegistrationForm from "./components/user/RegistrationForm";
import { useUser } from "./hooks/useUser";
import Home from "./components/Home";
import "./App.css";
import PictogramMenu from "./components/pictograms/PictogramMenu";
import GameMenu from "./components/games/GameMenu";
import PictogramAccMenu from "./components/acc/PictogramACCMenu";
import GameOptions from "./components/games/recognition-game/GameOptions";
import Welcome from "./components/Welcome";
import AboutUs from "./components/extras/AboutUs";
import EditUser from "./components/user/EditUser";
import Patients from "./components/patients/Patients";
import PatientAndMedicalRecordDetails from "./components/PatientAndMedicalRecordDetails";
import { usePatients } from "./hooks/usePatients";
import usePatientTreatments from "./hooks/usePatientTreatments";
import useEvolutionCharts from "./hooks/useEvolutionCharts";
import { useEndodonticTreatments } from "./hooks/useEndodonticTreatments";
import { usePeriodonticTreatments } from "./hooks/usePeriodonticTreatments";
import { useOrtodoncia } from "./hooks/useOrtdoncia";


function App() {
  const { user, logout, login } = useUser();
  //const { medicalRecords, createMedicalRecord } = useMedicalRecords();
  const {
    patients,
    patient,
    loading,
    error,
    fetchPatientById,
    fetchPatientByCedula,
    createPatient,
    updatePatient,
  } = usePatients();
  const {
    patientTreatments,
    createPatientTreatment,
    updatePatientTreatment,
    getAllPatientTreatments,
    getPatientTreatmentsByPatientId
  } = usePatientTreatments();
  const {
    evolutionCharts,
    createEvolutionChart,
    updateEvolutionChart,
    fetchEvolutionCharts,
    fetchEvolutionChartsByPatientId,
  } = useEvolutionCharts();

  const {
    endodonticTreatments,
    endodonticTreatment,
    fetchEndodonticTreatmentById,
    fetchEndodonticTreatmentsByPatientId,
    createEndodonticTreatment,
    updateEndodonticTreatment,
    deleteEndodonticTreatment,
  } = useEndodonticTreatments();

  const {
    periodonticTreatments,
    periodonticTreatment,
    fetchPeriodonticTreatmentsByPatientId,
    createPeriodonticTreatment,
    updatePeriodonticTreatment,
    deletePeriodonticTreatment,
  } = usePeriodonticTreatments();

  const {
    ortodoncias,
    ortodoncia,
    fetchOrtodonciasByPatientId,
    createOrtodoncia,
    updateOrtodoncia,
    deleteOrtodoncia
  } = useOrtodoncia();
  

  const isLoggedIn = !!user;
  const isGuestUser = isLoggedIn && user.username === "invitado@correo.com";//

  return (
    <div className="app">
      <Router>
        <ToastContainer />
        <div className="content">
          <Routes>
            <Route
              path="/login"
              element={
                isLoggedIn ? <Navigate to="/" /> : <LoginForm login={login} />
              }
            />

            <Route
              path="/patients"
              element={
                isLoggedIn ? (
                  <Patients
                    user={user}
                    patients={patients}
                    patient={patient}
                    loading={loading}
                    error={error}
                    fetchPatientById={fetchPatientById}
                    fetchPatientByCedula={fetchPatientByCedula}
                    createPatient={createPatient}
                    updatePatient={updatePatient}
                  />
                ) : (
                  <Home />
                )
              }
            />

            <Route
              path="/prueba/:patientId"
              element={
                <PatientAndMedicalRecordDetails
                  updatePatient={updatePatient}
                  patientTreatments={patientTreatments}
                  createPatientTreatment={createPatientTreatment}
                  updatePatientTreatment={updatePatientTreatment}
                  getAllPatientTreatments={getAllPatientTreatments}
                  getPatientTreatmentsByPatientId={getPatientTreatmentsByPatientId}

                  evolutionCharts={evolutionCharts}
                  createEvolutionChart={createEvolutionChart}
                  updateEvolutionChart={updateEvolutionChart}
                  fetchEvolutionCharts={fetchEvolutionCharts}
                  fetchEvolutionChartsByPatientId={fetchEvolutionChartsByPatientId}

                  endodonticTreatments={endodonticTreatments}
                  createEndodonticTreatment={createEndodonticTreatment}
                  updateEndodonticTreatment={updateEndodonticTreatment}
                  fetchEndodonticTreatmentsByPatientId={fetchEndodonticTreatmentsByPatientId}
                
                  periodonticTreatments={periodonticTreatments}
                  createPeriodonticTreatment={createPeriodonticTreatment}
                  updatePeriodonticTreatment={updatePeriodonticTreatment}
                  fetchPeriodonticTreatmentsByPatientId={fetchPeriodonticTreatmentsByPatientId}

                  ortodoncias={ortodoncias}
                  ortodoncia={ortodoncia}
                  fetchOrtodonciasByPatientId={fetchOrtodonciasByPatientId}
                  createOrtodoncia={createOrtodoncia}
                  updateOrtodoncia={updateOrtodoncia}
                />
              }
            />

            <Route
              path="/register"
              element={isLoggedIn ? <Navigate to="/" /> : <RegistrationForm />}
            />
            <Route
              path="/edit-user"
              element={isLoggedIn ? <EditUser user={user} /> : <Home />}
            />
            <Route
              path="/acc-menu"
              element={isLoggedIn ? <PictogramAccMenu /> : <Home />}
            />
            <Route
              path="/game-menu"
              element={isLoggedIn ? <GameMenu /> : <Home />}
            />
            <Route
              path="/game-config"
              element={isLoggedIn ? <GameOptions /> : <Home />}
            />
            <Route
              path="/pictogram-menu"
              element={isLoggedIn ? <PictogramMenu /> : <Home />}
            />
            <Route path="/about-us" element={<AboutUs />} />
            <Route
              path="/main-menu"
              element={
                isLoggedIn ? (
                  <Welcome
                    user={user}
                    logout={logout}
                    isGuestUser={isGuestUser}
                  />
                ) : (
                  <Home />
                )
              }
            />
            <Route
              path="/"
              element={<Home user={user} logout={logout} login={login} />}
            />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
