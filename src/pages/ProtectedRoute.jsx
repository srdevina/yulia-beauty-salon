import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const role = localStorage.getItem("role");

  if (role !== "admin") {
    return <Navigate to="/login" replace />;
  }

  return children;
}
