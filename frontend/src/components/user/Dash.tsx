import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Typography,
  Grid,
  Box,
  Snackbar,
} from "@mui/material";
import { useUserContext } from "../UserContext";
import { useNavigate } from "react-router-dom";
import "./Login.css";

// Interface for user data
interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
}

// Dashboard component
const Dashboard: React.FC = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const { userData } = useUserContext();
  const [editableFields, setEditableFields] = useState<UserData | null>(null);
  const [isEditing, setIsEditing] = useState<keyof UserData | null>(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user authentication credentials (token, etc.)
    localStorage.removeItem("token");
    localStorage.removeItem("profileImage");
    // Redirect user to the login page
    navigate("/login");

    // Show a Snackbar message for successful logout
    setSnackbarMessage("You have been logged out."); // Set the message for logout
    setSnackbarOpen(true);
  };

  useEffect(() => {
    if (userData) {
      setEditableFields(userData);
    }
  }, [userData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (editableFields) {
      setEditableFields({
        ...editableFields,
        [name]: value,
      });
    }
  };

  const handleEditField = (fieldName: keyof UserData) => {
    setIsEditing(fieldName);
  };

  const handleUpdateDetails = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/user/${userData?.userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editableFields),
        }
      );
      if (response.ok) {
        // Update user data in the context upon successful update
        const updatedUserData = await response.json();
        setEditableFields(updatedUserData);

        // Show a Snackbar message for successful update
        setSnackbarMessage("Changes saved successfully."); // Set the message for update
        setSnackbarOpen(true);
      } else {
        console.error("Error updating user details:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating user details:", error);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/user/${userData?.userId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        console.error("Error deleting user account:", response.statusText);
        return;
      }

      setSnackbarMessage("Account deleted successfully."); // Set the message for account deletion
      setSnackbarOpen(true);

      // Clear user authentication credentials upon account deletion
      localStorage.removeItem("token");
      localStorage.removeItem("profileImage");

      setTimeout(() => {
        navigate("/login"); // Redirect user to login screen after a delay
      }, 3000); // Redirect after 3 seconds
    } catch (error) {
      console.error("Error deleting user account:", error);
    }
  };

  // Snackbar close handler
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  if (!editableFields) {
    return <div>Loading...</div>; // Display a loading message if editableFields is not available yet
  }

  return (
    <div className="formContainer">
      <Typography variant="h4">User Dashboard</Typography>

      <Grid container spacing={2}>
        {Object.keys(editableFields).map((field) => (
          <Grid item xs={12} key={field}>
            <Box className="formElement" display="flex">
              <TextField
                name={field}
                label={field.charAt(0).toUpperCase() + field.slice(1)}
                value={editableFields[field as keyof UserData]}
                onChange={isEditing === field ? handleInputChange : undefined}
                disabled={isEditing !== field}
              />
              <Button
                className="button"
                variant="contained"
                color="secondary"
                onClick={() => handleEditField(field as keyof UserData)}
              >
                {isEditing === field ? "Save" : "Edit"}
              </Button>
            </Box>
          </Grid>
        ))}
      </Grid>

      <Button
        className="button"
        variant="contained"
        color="primary"
        onClick={handleUpdateDetails}
        disabled={!isEditing}
      >
        Save Changes
      </Button>

      <Button
        className="button"
        variant="contained"
        color="error"
        onClick={handleDeleteAccount}
      >
        Delete Account
      </Button>

      <Button
        className="button"
        variant="contained"
        color="secondary"
        onClick={handleLogout}
      >
        Logout
      </Button>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
      />
    </div>
  );
};

export default Dashboard;
