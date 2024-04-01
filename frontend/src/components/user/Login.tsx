import React, { useEffect, useState } from "react";
import axios from "axios";
import { TextField, Button, Snackbar } from "@mui/material";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { useUserContext } from "../UserContext";

// Define a type for the user data
interface UserData {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
}
// Define a type for the server response on successful login/signup
type AuthResponse = {
  token: string;
  user: {
    userId: number;
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    profileImage: string;
  };
};

// Define the AuthPage component
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
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);

  const { setUserData } = useUserContext();
  const hiddenFileInput = React.useRef<HTMLInputElement>(null);

  const handleFileButtonClick = () => {
    hiddenFileInput.current?.click();
  };

  useEffect(() => {
    // Check if the user is already logged in
    const token = localStorage.getItem("token");
    const savedProfileImageUrl = localStorage.getItem("profileImage");
    if (token && savedProfileImageUrl) {
      setProfileImageUrl(savedProfileImageUrl);
    }
  }, []);

  // Function to handle file selection
  const handleFileSelect: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    if (event.target.files && event.target.files[0]) {
      setProfileImage(event.target.files[0]);
    }
  };

  // Function to handle login/signup
  const handleAuth = async () => {
    try {
      const endpoint = isLogin ? "login" : "signup";
      let payload: string | FormData;
      let config: { headers: { "Content-Type": string } };

      if (isLogin) {
        // If logging in, prepare a JSON payload
        payload = JSON.stringify({
          email: email,
          password: password,
        });
        config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
      } else {
        // If signing up, prepare FormData
        const formData = new FormData();
        formData.append("email", email);
        formData.append("password", password);
        formData.append("firstName", firstName);
        formData.append("lastName", lastName);
        formData.append("username", username);
        if (profileImage) {
          formData.append("profileImage", profileImage);
        }
        payload = formData;
        config = {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        };
      }
      // Send the request to the server
      const response = await axios.post<AuthResponse>(
        `http://localhost:8080/api/user/${endpoint}`,
        payload,
        config
      );
      // Handle the server response
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", response.data.user.userId.toString());
        if (response.data.user.profileImage) {
          localStorage.setItem("profileImage", response.data.user.profileImage);
        }
        // Store the token in local storage
        const token = response.data.token;

        const userDataResponse = await axios.get<UserData>(
          `http://localhost:8080/api/user/${response.data.user.userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const userData = userDataResponse.data;
        setUserData(userData); // Store the retrieved userData in state

        // Handle alert message and navigation
        setAlertMessage(
          isLogin ? "Logged in successfully." : "Signed up successfully."
        );
        setOpenAlert(true);
        navigate("/"); // Navigate to the home page or another route as needed
      } else {
        setAlertMessage("Authentication failed: No token received");
        setOpenAlert(true);
      }
    } catch (error) {
      // Error handling
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.message ||
          "Authentication failed due to an unknown error.";
        setAlertMessage(message);
      } else if (error instanceof Error) {
        setAlertMessage(error.message);
      } else {
        setAlertMessage("An unexpected error occurred.");
      }
      setOpenAlert(true);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("profileImage");
    setProfileImageUrl(null);
    setAlertMessage("Logged out successfully.");
    setOpenAlert(true);
    navigate("/login");
  };

  const handleContinueAsGuest = () => {
    navigate("/");
  };

  const handleCloseAlert = (
    _event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(false);
  };

  return (
    <div className="formContainer">
      <h2>{isLogin ? "Login" : "Sign Up Form"}</h2>
      <div className="profileImageContainer">
        <img
          src={profileImageUrl || "./images/DefaultProfile.png"}
          alt="Profile"
          className={`profileImage ${!profileImageUrl && "defaultImage"}`}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null; // prevents looping
            currentTarget.src = "./images/DefaultProfile.png"; // fallback image if the specified src fails to load
          }}
        />
      </div>

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
          <input
            ref={hiddenFileInput}
            className="formElement"
            type="file"
            style={{ display: "none" }}
            onChange={handleFileSelect}
            accept="image/*"
          />
          <Button
            className="button"
            variant="contained"
            color="primary"
            component="span"
            onClick={handleFileButtonClick}
          >
            Upload Profile Image
          </Button>
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
      <Button
        className="button"
        variant="contained"
        color="secondary"
        onClick={() => setIsLogin(!isLogin)}
      >
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
        variant="outlined"
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
// TODO: implement forgotten password reset
