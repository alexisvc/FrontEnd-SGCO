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
import { useCirugiaPatologia } from "./hooks/useCirugiaPatologia";
import { useOdontologos } from "./hooks/useOdontologos";
import Odontologos from "./components/odontologos/Odontologos";


function App() {
  const { user, logout, login } = useUser();
  const {
    patients,
    patient,
    fetchPatients,
    fetchPatientByCedula,
    fetchPatientByName,
    createPatient,
    updatePatient,
    setPatient,
  } = usePatients();
  const {
    patientTreatments,
    createPatientTreatment,
    updatePatientTreatment,
    getPatientTreatmentsByPatientId,
  } = usePatientTreatments();
  const {
    evolutionCharts,
    createEvolutionChart,
    updateEvolutionChart,
    fetchEvolutionChartsByPatientId,
  } = useEvolutionCharts();
  const {
    endodonticTreatments,
    createEndodonticTreatment,
    updateEndodonticTreatment,
    fetchEndodonticTreatmentsByPatientId
  } = useEndodonticTreatments();
  const {
    cirugiaPatologias,
    createCirugiaPatologia,
    updateCirugiaPatologia,
    fetchCirugiaPatologiaByPatientId,
  } = useCirugiaPatologia();
  const {
    odontologos,
    odontologo,
    fetchOdontologos,
    fetchOdontologoById,
    createOdontologo,
    updateOdontologo,
    setOdontologo
  } = useOdontologos();
  

  const isLoggedIn = !!user;

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
                    patients={patients}
                    patient={patient}
                    fetchPatients={fetchPatients}
                    fetchPatientByCedula={fetchPatientByCedula}
                    fetchPatientByName={fetchPatientByName}
                    createPatient={createPatient}
                    updatePatient={updatePatient}
                    setPatient={setPatient}
                  />
                ) : (
                  <Home />
                )
              }
            />
            <Route
              path="/odontologos"
              element={
                isLoggedIn ? (
                  <Odontologos
                    odontologos={odontologos}
                    odontologo={odontologo}
                    fetchOdontologos={fetchOdontologos}
                    fetchOdontologoById={fetchOdontologoById}
                    createOdontologo={createOdontologo}
                    updateOdontologo={updateOdontologo}
                    setOdontologo={setOdontologo}
                  />
                ) : (
                  <Home />
                )
              }
            />

            <Route
              path="/patients/:patientId"
              element={
                <PatientAndMedicalRecordDetails
                  fetchPatients={fetchPatients}
                  updatePatient={updatePatient}

                  patientTreatments={patientTreatments}
                  createPatientTreatment={createPatientTreatment}
                  updatePatientTreatment={updatePatientTreatment}
                  getPatientTreatmentsByPatientId={getPatientTreatmentsByPatientId}

                  evolutionCharts={evolutionCharts}
                  createEvolutionChart={createEvolutionChart}
                  updateEvolutionChart={updateEvolutionChart}
                  fetchEvolutionChartsByPatientId={fetchEvolutionChartsByPatientId}

                  endodonticTreatments={endodonticTreatments}
                  createEndodonticTreatment={createEndodonticTreatment}
                  updateEndodonticTreatment={updateEndodonticTreatment}
                  fetchEndodonticTreatmentsByPatientId={fetchEndodonticTreatmentsByPatientId}

                  cirugiaPatologias={cirugiaPatologias}
                  createCirugiaPatologia={createCirugiaPatologia}
                  updateCirugiaPatologia={updateCirugiaPatologia}
                  fetchCirugiaPatologiaByPatientId={fetchCirugiaPatologiaByPatientId}

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
                  />
                ) : (
                  <Home />
                )
              }
            />
            <Route
              path="/"
              element={<Home user={user} logout={logout} />}
            />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
