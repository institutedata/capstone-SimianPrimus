// Import dependencies and other required types at the top of the file
import React, { useState } from "react";
import axios, { AxiosResponse } from "axios";
import { TextField, Button, Snackbar } from "@mui/material";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";
import "./Login.css";

// Define a type for the server response on successful login/signup
type AuthResponse = {
  token: string;
  user: {
    userId: number;
    firstName: string;
    lastName: string;
    email: string;
    username: string;
  };
};

const AuthPage: React.FC = () => {
  const navigate = useNavigate();
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>("");

  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [username, setUsername] = useState<string>("");

  const handleAuth = async () => {
    try {
      const endpoint = isLogin ? "login" : "signup";
      const userData = {
        email,
        password,
        ...(isLogin ? {} : { firstName, lastName, username }),
      };
      const response: AxiosResponse<AuthResponse> = await axios.post(
        `http://localhost:8080/api/user/${endpoint}`,
        userData
      );

      console.log("Response data:", response.data);

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", response.data.user.userId.toString());
        setAlertMessage(
          isLogin ? "Logged in successfully." : "Signed up successfully."
        );
        setOpenAlert(true);
        navigate("/"); // Navigate after successful login/signup
      } else {
        console.error("Authentication failed: No token received");
        setAlertMessage("Authentication failed.");
        setOpenAlert(true);
      }
    } catch (error) {
      console.error("Error occurred:", error);
      if (axios.isAxiosError(error)) {
        console.error("Error occurred:", error.response?.data);
        // Provide more specific error message if available, use a general one otherwise
        const message =
          error.response?.data.message ||
          "Authentication failed due to an unknown error.";
        setAlertMessage(message);
      } else {
        // Handle non-Axios errors (if any other type of error can occur here, adjust accordingly)
        setAlertMessage("An error occurred that is not from an axios request.");
      }
      setOpenAlert(true);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setAlertMessage("Logged out successfully.");
    setOpenAlert(true);
    navigate("/login"); // Redirect to the login page after logout
  };

  const handleContinueAsGuest = () => {
    navigate("/");
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  return (
    <div className="formContainer">
      {!isLogin && (
        <>
          <TextField
            className="formElement"
            id="firstName"
            label="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            className="formElement"
            id="lastName"
            label="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            fullWidth
            margin="normal"
          />
        </>
      )}
      <TextField
        className="formElement"
        id="email"
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        className="formElement"
        id="password"
        type="password"
        label="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        margin="normal"
      />
      {!isLogin && (
        <TextField
          className="formElement"
          id="username"
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          fullWidth
          margin="normal"
        />
      )}
      <Button
        className="button"
        variant="contained"
        color="primary"
        onClick={handleAuth}
      >
        {isLogin ? "Login" : "Sign Up"}
      </Button>
      <Button className="button" onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "Create New Account" : "Back to Login"}
      </Button>
      {localStorage.getItem("token") && (
        <Button
          className="button"
          variant="contained"
          color="secondary"
          onClick={handleLogout}
        >
          Logout
        </Button>
      )}
      <Button
        className="button"
        variant="contained"
        color="primary"
        onClick={handleContinueAsGuest}
      >
        Continue as Guest
      </Button>

      <Snackbar
        open={openAlert}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
      >
        <Alert
          onClose={handleCloseAlert}
          severity="success"
          sx={{ width: "100%" }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default AuthPage;

// TODO: implement email authentication
// TODO: implement add profile pic on sign up
// TODO: implement forgot password
// TODO: implement reset password
// TODO: implement change password 
// TODO: implement change email
// TODO: implement change username
// TODO: implement change profile pic
