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
import PictogramForm from "./components/pictograms/PictogramForm";
import RegistrationForm from "./components/user/RegistrationForm";
import { PictogramDisplay } from "./components/acc/PictogramDisplay";
import PictogramList from "./components/pictograms/PictogramList";
import { useUser } from "./hooks/useUser";
import { usePictograms } from "./hooks/usePictograms";
import Home from "./components/Home";
import { FaHome, FaUserPlus, FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import "./App.css";
import RecognitionGame from "./components/games/recognition-game/RecognitionGame";
import PictogramMenu from "./components/pictograms/PictogramMenu";
import GameMenu from "./components/games/GameMenu";
import PictogramAccMenu from "./components/acc/PictogramACCMenu";
import GameOptions from "./components/games/recognition-game/GameOptions";
import Welcome from "./components/Welcome";
import AboutUs from "./components/extras/AboutUs";
import EditUser from "./components/user/EditUser";

function App() {
  const { user, logout, login } = useUser();
  const { pictograms, createPictogram, updatePictogram, deletePictogram } =
    usePictograms(user);

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
              path="/saac"
              element={
                isLoggedIn ? <PictogramDisplay images={pictograms} /> : <Home />
              }
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
              path="/recognition-game/:difficulty"
              element={
                isLoggedIn ? (
                  <RecognitionGame pictograms={pictograms} />
                ) : (
                  <Home />
                )
              }
            />
            <Route
              path="/pictogram-menu"
              element={isLoggedIn ? <PictogramMenu /> : <Home />}
            />
            <Route
              path="/pictogram-form"
              element={
                isLoggedIn ? (
                  <PictogramForm createPictogram={createPictogram} pictograms={pictograms}/>
                ) : (
                  <Home />
                )
              }
            />
            <Route
              path="/pictogram-list"
              element={
                isLoggedIn ? (
                  <PictogramList
                    pictograms={pictograms}
                    updatePictogram={updatePictogram}
                    deletePictogram={deletePictogram}
                  />
                ) : (
                  <Home />
                )
              }
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
