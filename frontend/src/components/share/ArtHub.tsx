import React from "react";
import {
  Box,
  Card,
  CardContent,
  CardActionArea,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";

const ArtHub: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center", // Center the card vertically
        height: "100vh", // Full height of the viewport
        p: 4, // Padding around the box, shorthand for theme spacing
      }}
    >
      {/* A single card with a Link and styling */}
      <Card
        sx={{
          maxWidth: 600,
          boxShadow: 3,
          marginBottom: 8,
          padding: 2,
        }}
      >
        {" "}
        {/* Maximum card width and shadow */}
        <Link to="/userGallery" style={{ textDecoration: "none" }}>
          <CardActionArea>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {/* Content on the left */}
              <CardContent sx={{ flex: "1 1 auto", p: 3, textAlign: "center" }}>
                {/* Flex property and padding */}
                <Typography gutterBottom variant="h3" component="div">
                  The ArtHub
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Share your creations, appreciate others, and get inspired.
                </Typography>
              </CardContent>
              {/* Image on the right */}
              <CardMedia
                component="img"
                image="/images/ArtHubImg.png"
                alt="Gallery image"
                sx={{ width: 240, height: "auto" }} // Fixed image width, auto-adjust height
              />
            </Box>
          </CardActionArea>
        </Link>
        <Button
          component={Link}
          to="/addwork"
          variant="contained"
          color="primary"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            p: 2, // Padding around the button
            m: 2, // Margin around the button
          }}
        >
          Share your creations here
        </Button>
      </Card>
    </Box>
  );
};

export default ArtHub;
