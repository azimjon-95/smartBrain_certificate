import "./styles/App.css";
import React, { useContext } from "react";
import Admin from "./routes/admin/Admin";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Qr from "./components/Qr";
import ItPdf from "./components/createCertificates/Create";
import HeroBanner from "./components/hero-banner/HeroBanner";
import Login from "./pages/login/Login";
import Draft from "./routes/draft/Draft";
import Single from "./routes/SinglePage";
import { useAuthContext } from './hooks/useAuthContext'
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import LoadingTruck from "./components/loading/LoadingTruck";
import { AuthContext } from "./context/AuthContext";
import Register from "./pages/register/Register";
import History from "./components/TableHistory/History";


function Sertificate() {
  const { user } = useAuthContext()
  const { isLoading } = useContext(AuthContext)

  return (
    <div className="">
      <ToastContainer />
      {isLoading ? <LoadingTruck /> : <></>}
      <Routes>
        <Route exact path="/qrcode/:path" element={<Qr />} />
        <Route exact path="/" element={<HeroBanner />} />
        <Route exact path="check/:id" element={<Draft />} />
        <Route exact path="single/:id" element={user ? < Single /> : <Navigate to="/login" />} />
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/register"
          element={user ? <Register /> : <Navigate to="/login" />}
        />

        <Route
          path="/admin"
          element={user ? <Admin /> : <Navigate to="/login" />}
        >
          <Route exact path={`dasturlash`} element={<ItPdf />} />
          <Route exact path={`historyPdf`} element={<History />} />
        </Route>
      </Routes>
    </div>

  );
}

export default Sertificate;