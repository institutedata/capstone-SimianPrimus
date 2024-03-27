import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import PageRoutes from "./routes/PageRoutes";
import NavBar from "./components/nav-bar/NavBar";
import { ThemeProvider } from "@mui/material/styles";
import { lightTheme, darkTheme } from "./components/themes/Theme";
import CssBaseline from "@mui/material/CssBaseline";

const App: React.FC = () => {
  const [darkMode, setDarkMode] = React.useState(false);

  const handleThemeChange = () => {
    setDarkMode(!darkMode); 
  };

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Router>
        <div>
          <NavBar darkMode={darkMode} handleThemeChange={handleThemeChange}/>
          <PageRoutes />
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;
