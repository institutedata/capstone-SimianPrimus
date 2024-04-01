import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Box,
  Grid,
  Switch,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import logoImageLight from "../../assets/ArtHubLogoLight.png";
import logoImageDark from "../../assets/ArtHubLogoDark.png";
import "./NavBar.css";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import ProtectedLink from "../ProtectedLink";

// Interface for the Navbar component
interface NavbarProps {
  darkMode: boolean;
  handleThemeChange: () => void;
}

// Navbar component
const Navbar: React.FC<NavbarProps> = ({ darkMode, handleThemeChange }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box
      className="drawer"
      onClick={handleDrawerToggle}
      sx={{ textAlign: "center" }}
    >
      <Typography variant="h4" sx={{ my: 2 }}>
        ArtHub
      </Typography>
      <List>
        <ListItemButton
          component={RouterLink}
          to="/discover"
          className="drawer-item"
        >
          <ListItemText primary="The Art Gallery" />
        </ListItemButton>

        <ListItemButton
          component={RouterLink}
          to="/create"
          className="drawer-item"
        >
          <ListItemText primary="The Creation Hub" />
        </ListItemButton>

        <ProtectedLink to="/share">
          <ListItemButton
            component={RouterLink}
            to="/share"
            className="drawer-item"
          >
            <ListItemText primary="The Art Hub" />
          </ListItemButton>
        </ProtectedLink>

        <ProtectedLink to="/dashboard">
          <ListItemButton
            component={RouterLink}
            to="/dashboard"
            className="drawer-item"
          >
            <ListItemText primary="The User Dashboard" />
          </ListItemButton>
        </ProtectedLink>

        <ListItemButton
          component={RouterLink}
          to="/login"
          className="drawer-item"
        >
          <ListItemText primary="Login" />
        </ListItemButton>

        <Switch
          checked={darkMode}
          onChange={handleThemeChange}
          color="default"
          sx={{
            width: 70,
            height: 50,
            padding: "12px",
            "& .MuiSwitch-track": {
              borderRadius: 20 / 2,
            },
            "& .MuiSwitch-switchBase.Mui-checked": {
              transform: "translateX(24px)",
            },
            "& .MuiSwitch-thumb": {
              width: 24,
              height: 24,
            },
            "& .MuiSwitch-switchBase": {
              padding: "6px",
            },
            "& .MuiSwitch-switchBase .MuiSwitch-icon": {
              // This would target the icon specifically, adjust the size
              width: 20,
              height: 20,
            },
          }}
          icon={<LightModeIcon sx={{ fontSize: "1.5em" }} />}
          checkedIcon={<DarkModeIcon sx={{ fontSize: "1.5em" }} />}
        />
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        position="sticky"
        color="default"
        className="appbar"
        elevation={0}
      >
        <Toolbar className="toolbar">
          <Grid container alignItems="center">
            <Grid item xs={6} sm={3} lg={3} sx={{ padding: 0, margin: 0 }}>
              <RouterLink to="/" className="logo-link">
                {/* Logo */}
                <img
                  src={darkMode ? logoImageDark : logoImageLight}
                  alt="ArtHub logo"
                  className="logo-image"
                />
              </RouterLink>
            </Grid>
            <Grid
              item
              xs={6}
              sm={9}
              container
              justifyContent="flex-end"
              alignItems="center"
            >
              {/* Menu Icon */}
              <IconButton
                color="inherit"
                onClick={handleDrawerToggle}
                className="menu-icon"
              >
                <MenuIcon sx={{ fontSize: 36 }} />
              </IconButton>
              {/* Login Icon */}
              <IconButton
                color="inherit"
                component={RouterLink}
                to="/login"
                className="login-icon"
              >
                <AccountCircleIcon sx={{ fontSize: 36 }} />
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      {/* Drawer for mobile view */}
      <Drawer
        variant="temporary"
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: 240 },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Navbar;
