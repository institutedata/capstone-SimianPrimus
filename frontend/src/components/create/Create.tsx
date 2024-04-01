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

// CreatePage component
const CreatePage: React.FC = () => {
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
        <Link to="/learn" style={{ textDecoration: "none" }}>
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
                    Learn
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Explore the world of art and learn from the best and each
                    other.
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
        {/* Link to the createHub page */}
        <Link to="/createHub" style={{ textDecoration: "none" }}>
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
                    Create
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Harness your inspiration and create art that speaks to you.
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
        {/* Link to the collaborate page */}
        <Link to="/collaborate" style={{ textDecoration: "none" }}>
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
                    Collaborate
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Work together on projects and share your ideas with the
                    world.
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

      <Card
        sx={{
          width: "100%",
          minHeight: 200,
          maxWidth: 600,
          mb: 4,
          boxShadow: 3,
        }}
      >
        {/* Link to the pushIt page */}
        <Link to="/pushIt" style={{ textDecoration: "none" }}>
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
                    Push Yourself
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Monthly challenges to push your creativity to the next
                    level.
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

export default CreatePage;
