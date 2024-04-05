import React, { useState, useEffect } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  IconButton,
  Typography,
  Button,
  Modal,
  Box,
  Tooltip,
  CircularProgress,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { useUserContext, UserContextType } from "../UserContext";
import FavouritesGalleryModal from "./FavouritesGalleryModal";
import ErrorBoundary from "../error-handling/ErrorBoundary";

// Define the interfaces for the Artwork and Constituent objects
interface Constituent {
  name: string;
  role: string;
  gender: string;
  constituentID: number;
  constituentULAN_URL: string;
  constituentWikidata_URL: string;
}

interface Artwork {
  objectID: number;
  title: string;
  primaryImage: string;
  artistDisplayName: string;
  artistWikidata_URL?: string;
  medium: string;
  department: string;
  likeCount: number;
  liked?: boolean;
  constituents: Constituent[];
}

// Define the GalleryArt component
const GalleryArt: React.FC = () => {
  const [artwork, setArtwork] = useState<Artwork | null>(null);
  const [liked, setLiked] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<number>(0);
  const [startX, setStartX] = useState<number | null>(null);
  const [endX, setEndX] = useState<number | null>(null);
  const [history, setHistory] = useState<Artwork[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState(false);
  const [isFavouritesModalOpen, setIsFavouritesModalOpen] =
    useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };
  useEffect(() => {
    fetchRandomArtwork();
  }, []);

  const fetchRandomArtwork = async () => {
    try {
      setIsLoading(true); // Set loading state to true
      const response = await axios.get<Artwork>(
        "http://localhost:8080/api/services/random"
      );
      setArtwork(response.data);
      setLiked(response.data.liked || false);
      setLikeCount(response.data.likeCount);
      setIsLoading(false); // Set loading state to false after fetching artwork
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const message = (error.response?.data?.message ||
        "Error fetching artwork.") as string;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      console.error(message, error as any);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle touch events for swipe gestures
  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    setStartX(event.touches[0].clientX);
  };

  const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    setEndX(event.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (startX !== null && endX !== null) {
      const delta = endX - startX;
      // Choose a threshold for swipe sensitivity, adjust as needed
      const threshold = 100;

      if (delta > threshold) {
        // Swiped left-to-right, show previous artwork
        fetchPrev();
      } else if (delta < -threshold) {
        // Swiped right-to-left, show next artwork
        fetchNext();
      }
    }
    // Reset swipe positions
    setStartX(null);
    setEndX(null);
  };

  const fetchPrev = async () => {
    // Ensure there's a previous artwork in the history to fetch
    if (historyIndex > 0) {
      const newHistoryIndex = historyIndex - 1;
      setArtwork(history[newHistoryIndex]); // Set the previous artwork from history
      setHistoryIndex(newHistoryIndex);
      // Update like status and count for the previous artwork
      setLiked(history[newHistoryIndex].liked || false);
      setLikeCount(history[newHistoryIndex].likeCount);
    } else {
      console.log("No previous artwork to fetch");
    }
  };

  const fetchNext = async () => {
    // Check if there's a next artwork in history first
    if (historyIndex < history.length - 1) {
      const newHistoryIndex = historyIndex + 1;
      setArtwork(history[newHistoryIndex]); // Set the next artwork from history
      setHistoryIndex(newHistoryIndex);
      // Update like status and count for the next artwork
      setLiked(history[newHistoryIndex].liked || false);
      setLikeCount(history[newHistoryIndex].likeCount);
    } else {
      // Fetch a new random artwork
      try {
        setIsLoading(true); // Set loading state to true
        const response = await axios.get<Artwork>(
          "http://localhost:8080/api/services/random"
        );
        setArtwork(response.data);
        console.log("Fetched next artwork:", response.data);
        // Update the artwork history with the newly fetched artwork
        const newHistory = [...history, response.data];
        setHistory(newHistory);
        setHistoryIndex(newHistory.length - 1); // The new history index is at the end
        // Update like status and count for the new artwork
        setLiked(response.data.liked || false);
        setLikeCount(response.data.likeCount);
        setIsLoading(false); // Set loading state to false after fetching artwork
      } catch (error) {
        console.error("Error fetching next artwork:", error);
        setIsLoading(false);
      }
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const { userData }: UserContextType = useUserContext(); // Assuming useUserContext provides the userData object
  const userId: number = userData ? userData.userId : -1; // Default -1 if userData is null or undefined

  // Implement the function to handle the like action
  const handleLike = async (objectID: number) => {
    const token: string | null = localStorage.getItem("token");
    if (!token) {
      alert("Please log in or sign up to like artworks.");
      navigate("/login");
      return;
    }

    const requestData = {
      userId: userId,
      objectID: objectID.toString(),
    };

    console.log("Request data:", requestData);

    try {
      if (!liked) {
        // The user has not liked this artwork yet; process the like.
        await processLike(requestData, token);
      } else {
        // The user has already liked this artwork; process the unlike.
        await processUnlike(objectID, token);
      }
    } catch (error) {
      console.error("Error processing like/unlike artwork:", error);
      handleError(error);
    }
  };

  const processLike = async (
    requestData: { userId: number; objectID: string },
    token: string
  ) => {
    const response = await axios.post<{ message: string; likeCount: number }>(
      `http://localhost:8080/api/galleryLike`,
      requestData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setLiked(true);
    setLikeCount(response.data.likeCount);
    console.log("Artwork liked successfully:", response.data.message);
  };

  const processUnlike = async (objectID: number, token: string) => {
    const response = await axios.delete<{ message: string }>(
      `http://localhost:8080/api/galleryLike/deleteByObjectId/${objectID}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setLiked(false);
    // Assuming `likeCount` is a state representing the count of likes, decrement it.
    setLikeCount((prevCount) => prevCount - 1);
    console.log("Artwork unliked successfully:", response.data.message);
  };

  const handleError = (error: unknown) => {
    const errorMessage =
      (error as { response?: { data?: { message?: string } } })?.response?.data
        ?.message ||
      (error as Error).message ||
      "An error occurred while processing your request.";
    setError(errorMessage);
    setOpenSnackbar(true);
  };

  const openFavouritesModal = () => setIsFavouritesModalOpen(true);
  const closeFavouritesModal = () => setIsFavouritesModalOpen(false);
  const token = localStorage.getItem("token");

  console.log("Artwork:", artwork);
  // Render the Gallery component
  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{ touchAction: "none" }} // Disables default browser handling of touch actions
    >
      {/* The Card component displaying the artwork */}
      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            padding: "20px",
            height: "100vh",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography
          variant="h6"
          color="error"
          textAlign="center"
          style={{ padding: "20px" }}
        >
          {error} {/* Display the error message */}
        </Typography>
      ) : artwork ? (
        <Card
          sx={{
            maxWidth: 345,
            margin: "auto",
            marginTop: "20px",
            marginBottom: "20px",
          }}
        >
          <Tooltip title="Click to enlarge" placement="bottom">
            <CardMedia
              component="img"
              sx={{
                height: 400,
                objectFit: "contain",
                width: "100%",
                maxHeight: "100%",
                padding: "20px",
                cursor: "pointer",
              }}
              image={artwork.primaryImage}
              alt={artwork.title || "Artwork image"}
              onClick={handleOpenModal}
            />
          </Tooltip>
          {/* CardContent to display artwork details */}
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {artwork.title}
            </Typography>
            {/* Display artist information */}
            {artwork.constituents &&
              artwork.constituents.some((c) => c.role === "Artist") && (
                <Typography variant="body1" color="text.tertiary">
                  Artist:{" "}
                  {artwork.constituents
                    .filter((c) => c.role === "Artist")
                    .map((artist, index) => {
                      const delimiter = index > 0 ? ", " : ""; // Add delimiter for multiple artists
                      return (
                        <React.Fragment key={artist.constituentID}>
                          {delimiter}
                          {artist.constituentULAN_URL ? (
                            <a
                              href={artist.constituentULAN_URL}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                color: "inherit",
                              }}
                            >
                              {artist.name}
                            </a>
                          ) : (
                            artist.name
                          )}
                        </React.Fragment>
                      );
                    })}
                </Typography>
              )}
            <Typography variant="body2" color="text.tertiary">
              {artwork.medium} - {artwork.department}
            </Typography>
            <IconButton
              aria-label="add to favorites"
              onClick={() => handleLike(artwork.objectID)}
            >
              <FavoriteIcon color={liked ? "secondary" : "action"} />
            </IconButton>
            <Typography component="span">
              {likeCount} {likeCount === 1 ? "Like" : "Likes"}
            </Typography>
            <Button onClick={openFavouritesModal}>Show Favourites</Button>
            <ErrorBoundary>
              <FavouritesGalleryModal
                isOpen={isFavouritesModalOpen}
                onClose={closeFavouritesModal}
                token={token}
                userId={0}
              />
            </ErrorBoundary>
          </CardContent>
        </Card>
      ) : (
        <Typography variant="h6" color="text.tertiary" textAlign="center">
          Could not load artwork. Please try again later.
        </Typography>
      )}
      {/* Modal for the enlarged image */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="image-modal-title"
        aria-describedby="image-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <img
            src={artwork?.primaryImage}
            alt={artwork?.title || "Artwork image"}
            style={{ maxWidth: "100%", maxHeight: "90vh" }}
          />
        </Box>
      </Modal>

      {/* If an error has occurred, show a snackbar with the error message */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="error"
          sx={{ width: "100%" }}
        >
          {error}
        </Alert>
      </Snackbar>

      <div style={{ marginBottom: "10px", textAlign: "center" }}>
        <Button onClick={fetchPrev}>&lt; Previous</Button>
        <Button onClick={fetchNext}>Next &gt;</Button>
      </div>
    </div>
  );
};

export default GalleryArt;

// TODO: Add a loading spinner while fetching artwork (animation?)
// TODO: Add favourites gallery for liked artworks
// TODO: Fix cookie issue
