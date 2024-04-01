import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

// ProtectedLink component redirects to login page if user is not authenticated
// ProtectedLink props
interface ProtectedLinkProps {
  to: string;
  children: React.ReactNode;
}

// ProtectedLink component
const ProtectedLink: React.FC<ProtectedLinkProps> = ({ to, children }) => {
  const navigate = useNavigate();
  const [showSnackbar, setShowSnackbar] = useState(false);
  // Check if user is authenticated
  const isAuthenticated = (): boolean => {
    const token: string | null = localStorage.getItem("token");
    return Boolean(token);
  };

  const handleNavigation = (): void => {
    if (isAuthenticated()) {
      navigate(to);
    } else {
      setShowSnackbar(true);
      setTimeout(() => {
        navigate("/login");
      }, 1500); // Redirect to login after showing the Snackbar for 1.5 seconds
    }
  };

  const closeSnackbar = () => {
    setShowSnackbar(false);
  };

  return (
    <>
      <div
        onClick={handleNavigation}
        style={{ cursor: "pointer", textDecoration: "none" }}
      >
        {children}
      </div>
      <Snackbar
        open={showSnackbar}
        autoHideDuration={5000}
        onClose={closeSnackbar}
      >
        <Alert severity="info" onClose={closeSnackbar}>
          Please log in to access this feature.
        </Alert>
      </Snackbar>
    </>
  );
};

export default ProtectedLink;
