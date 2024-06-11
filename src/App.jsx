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
import MedicalRecordDetails from "./components/medicalRecords/MedicalRecordsDetails";
import useMedicalRecords from "./hooks/useMedicalRecords";

function App() {
  const { user, logout, login } = useUser();
  const { medicalRecords } = useMedicalRecords();
  const isLoggedIn = !!user;
  const isGuestUser = isLoggedIn && user.username === "invitado@correo.com";

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
              element={isLoggedIn ? <Patients user={user} /> : <Home />}
            />

            <Route 
              path="/prueba/:patientId"
              element={isLoggedIn ? <MedicalRecordDetails user={user} medicalRecords={medicalRecords} /> : <Home />}
            />

            <Route
              path="/register"
              element={isLoggedIn ? <Navigate to="/" /> : <RegistrationForm />}
            />
            <Route
            path="/edit-user"
            element={ isLoggedIn ? <EditUser user={user} /> : <Home /> }
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
            <Route
              path="/about-us"
              element={ <AboutUs />}
            />
            <Route
              path="/main-menu"
              element={
                isLoggedIn ? (
                  <Welcome user={user} logout={logout} isGuestUser={isGuestUser} />
                ) : (
                  <Home />
                )
              }
            />
            <Route path="/" element={<Home user={user} logout={logout} login={login} />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
