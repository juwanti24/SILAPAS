import { Routes, Route } from "react-router-dom";
import "./assets/tailwind.css";
import React, { Suspense } from "react";
import Loading from "./components/Loading";

const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const Kamar = React.lazy(() => import("./pages/Kamar"));
const Pembina = React.lazy(() => import("./pages/Pembina"));
const NotFound = React.lazy(() => import("./pages/NotFound"));
const AuthLayout = React.lazy(() => import("./layouts/AuthLayout"));
const MainLayout = React.lazy(() => import("./layouts/MainLayout"));
const Login = React.lazy(() => import("./pages/auth/Login"));
const Register = React.lazy(() => import("./pages/auth/Register"));
const Forgot = React.lazy(() => import("./pages/auth/Forgot"));
const AnakBinaan = React.lazy(() => import("./pages/AnakBinaan"));
const Pelanggaran = React.lazy(() => import("./pages/Pelanggaran"));
const Penempatan = React.lazy(() => import("./pages/Penempatan"));


function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/kamar" element={<Kamar />} />
       
          <Route path="/pembina" element={<Pembina />} />
         
          <Route path="/anak-binaan" element={<AnakBinaan />} />
          <Route path="/pelanggaran" element={<Pelanggaran />} />
          <Route path="/penempatan" element={<Penempatan />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot" element={<Forgot />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
