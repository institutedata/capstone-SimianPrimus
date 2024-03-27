import React from "react";
import {
  Box,
  Card,
  CardContent,
  CardActionArea,
  CardMedia,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import "./Home.css";

const HomePage: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        p: 5,
      }}
    >
      <Card
        sx={{
          width: "100%",
          minHeight: 200,
          maxWidth: 600,
          mb: 4,
          boxShadow: 3,
        }}
      >
        <Link to="/discover" style={{ textDecoration: "none" }}>
          <CardActionArea>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "stretch", // Stretch the children to full height
              }}
            >
              {/* Content on the left */}
              <CardContent
                sx={{ width: "60%", display: "flex", alignItems: "center" }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    width: "100%",
                  }}
                >
                  <Typography gutterBottom variant="h3" component="div">
                    Discover Art
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Explore a world of creativity from The Metropolitan Museum of Art.
                  </Typography>
                </Box>
              </CardContent>
              {/* Image on the right */}
              <CardMedia
                component="img"
                image="/images/DiscoverImg.png"
                alt="Gallery image"
                sx={{
                  width: "40%",
                  objectFit: "cover",
                }}
              />
            </Box>
          </CardActionArea>
        </Link>
      </Card>

      <Card
        sx={{
          width: "100%",
          minHeight: 200,
          maxWidth: 600,
          mb: 4,
          boxShadow: 3,
        }}
      >
        <Link to="/create" style={{ textDecoration: "none" }}>
          <CardActionArea>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "stretch", // Stretch the children to full height
              }}
            >
              {/* Content on the left */}
              <CardContent
                sx={{ width: "60%", display: "flex", alignItems: "center" }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    width: "100%",
                  }}
                >
                  <Typography gutterBottom variant="h3" component="div">
                    Create Art
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Learn, create, collaborate and push your creative boundaries.
                  </Typography>
                </Box>
              </CardContent>
              {/* Image on the right */}
              <CardMedia
                component="img"
                image="/images/CreateImg.png"
                alt="Gallery image"
                sx={{
                  width: "40%",
                  objectFit: "cover",
                }}
              />
            </Box>
          </CardActionArea>
        </Link>
      </Card>

      <Card
        sx={{
          width: "100%",
          minHeight: 200,
          maxWidth: 600,
          mb: 4,
          boxShadow: 3,
        }}
      >
        <Link to="/share" style={{ textDecoration: "none" }}>
          <CardActionArea>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "stretch", // Stretch the children to full height
              }}
            >
              {/* Content on the left */}
              <CardContent
                sx={{ width: "60%", display: "flex", alignItems: "center" }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    width: "100%",
                  }}
                >
                  <Typography gutterBottom variant="h3" component="div">
                    Share Art
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Share creations, get feedback, and connect with other artists.
                  </Typography>
                </Box>
              </CardContent>
              {/* Image on the right */}
              <CardMedia
                component="img"
                image="/images/ShareImg.png"
                alt="Gallery image"
                sx={{
                  width: "40%",
                  objectFit: "cover",
                }}
              />
            </Box>
          </CardActionArea>
        </Link>
      </Card>
    </Box>
  );
};

export default HomePage;
