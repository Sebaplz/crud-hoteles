import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ProtectedAuth } from "./auth/rules/ProtectedAuth";
import { ProtectedRoute } from "./auth/rules/ProtectedRoute";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import DashboardPublic from "./pages/public/DashboardPublic";
import Layout from "./pages/Layout";
import InfoItem from "./pages/public/InfoItem";
import AddAdvertisement from "./pages/private/AddAdvertisement";
import EditAdvertisement from "./pages/private/EditAdvertisement";
import Dashboard from "./pages/private/Dashboard";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<DashboardPublic />} />
            <Route path="/advertisement/:id" element={<InfoItem />} />
          </Route>
          <Route element={<ProtectedAuth />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/add" element={<AddAdvertisement />} />
            <Route path="/edit/:id" element={<EditAdvertisement />} />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
