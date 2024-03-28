import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

interface ProtectedLinkProps {
  to: string;
  children: React.ReactNode;
}

const ProtectedLink: React.FC<ProtectedLinkProps> = ({ to, children }) => {
  const navigate = useNavigate();
  const [showSnackbar, setShowSnackbar] = useState(false);

  const isAuthenticated = (): boolean => {
    const token: string | null = localStorage.getItem("token");
    return Boolean(token);
  };

  const handleNavigation = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ): void => {
    event.preventDefault();
    if (isAuthenticated()) {
      navigate(to);
    } else {
      setShowSnackbar(true);
      setTimeout(() => {
        navigate("/login");
      }, 1500); // Redirect to login after showing the Snackbar for 5 seconds
    }
  };

  const closeSnackbar = () => {
    setShowSnackbar(false);
  };

  return (
    <>
      <a
        href={to}
        onClick={handleNavigation}
        style={{ textDecoration: "none" }}
      >
        {children}
      </a>
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
