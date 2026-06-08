import { Routes, Route } from "react-router-dom";
import "./assets/tailwind.css";
import React,{Suspense} from "react";
import Loading from"./components/Loading";
  const Dashboard = React.lazy(() => import("./pages/Dashboard"));
  const Orders = React.lazy(() => import("./pages/Order"));
  const Customers = React.lazy(() => import("./pages/Customer"));
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
         <Route path="/orders" element={<Orders />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/anak-binaan" element={<AnakBinaan />} />
<Route path="/pelanggaran" element={<Pelanggaran />} />
<Route path="/penempatan" element={<Penempatan />} />
        </Route>

        <Route element ={<AuthLayout/>}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot" element={<Forgot />} />
        </Route>
        </Routes>
     </Suspense>
  )
}

export default App