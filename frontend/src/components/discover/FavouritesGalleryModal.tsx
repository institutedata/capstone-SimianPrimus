import React, { useState, useEffect } from "react";
import {
  Modal,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  IconButton,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import { useUserContext, UserContextType } from "../UserContext";
import CloseIcon from "@mui/icons-material/Close";

interface Constituent {
  name: string;
  role: string;
  gender: string;
  constituentID: number;
  constituentULAN_URL: string;
  constituentWikidata_URL: string;
}

interface IArtwork {
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
  artwork: IArtwork;
}

interface IFavouritesGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: number;
  token: string | null;
  likedArtworks: IArtwork[];
  currentIndex: number;
}

const FavouritesGalleryModal: React.FC<IFavouritesGalleryModalProps> = ({
  isOpen,
  onClose,
  token,
}) => {
  const [likedArtworks, setLikedArtworks] = useState<IArtwork[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { userData }: UserContextType = useUserContext(); // Destructure the userData object
  const userId: number = userData ? userData.userId : -1; // Use the userData object to get the userId

  console.log(userId);
  useEffect(() => {
    const fetchLikedArtworks = async () => {
      try {
        if (token && userId) {
          setIsLoading(true);
          const response = await axios.get<IArtwork[]>(
            `http://localhost:8080/api/galleryLike/like/${userId}`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          console.log("Fetched artworks", response.data);
          const artworks = response.data.map((item) => item.artwork);
          setLikedArtworks(artworks); // Assuming the backend returns an array directly
          setIsLoading(false);
        }
      } catch (error: unknown) {
        console.error("Error fetching liked artworks:", error);
        setIsLoading(false);
      }
    };

    if (isOpen) {
      fetchLikedArtworks();
    }
  }, [userId, token, isOpen]);

  useEffect(() => {
    console.log(likedArtworks);
  }, [likedArtworks]); // Log the likedArtworks whenever it changes

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < likedArtworks.length - 1 ? prevIndex + 1 : prevIndex
    );
  };

  const currentArtwork = likedArtworks?.[currentIndex] ?? null;
  // Extract artist names using the constituents array from the current artwork
  const artistLinks = currentArtwork?.constituents?.map((c, index) => (
    <a
      key={c.constituentID}
      href={c.constituentULAN_URL}
      target="_blank"
      rel="noopener noreferrer"
    >
      {c.name}
      {index < currentArtwork.constituents.length - 1 ? ", " : ""}
    </a>
  ));

  return (
    <Modal open={isOpen} onClose={onClose}>
      <div
        className="modal-container"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "95%",
          maxHeight: "95%",
          maxWidth: "1000px",
          padding: "16px",
          borderRadius: "4px",
          outline: "none",
          overflow: "auto",
          margin: "1rem auto",
        }}
      >
        {isLoading ? (
          <div style={{ textAlign: "center" }}>
            <CircularProgress />
          </div>
        ) : currentArtwork ? (
          <Card>
            <IconButton
              style={{ position: "absolute", right: "8px", top: "8px" }}
              onClick={onClose}
            >
              <CloseIcon />
            </IconButton>
            <CardMedia
              component="img"
              sx={{
                height: 500,
                objectFit: "contain",
                width: "100%",
                maxHeight: "100%",
                padding: "10px",
                cursor: "pointer",
              }}
              image={currentArtwork.primaryImage}
              alt={currentArtwork.title || "Artwork image"}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {currentArtwork.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Department: {currentArtwork.department}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Artist:{" "}
                {artistLinks ||
                  currentArtwork.artistDisplayName ||
                  "Unknown artist"}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Medium: {currentArtwork.medium}
              </Typography>
              {/* Additional artwork details can be added here */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "0px 16px 16px 16px",
                  marginBottom: "20px",
                }}
              >
                <Button onClick={handlePrevious} disabled={currentIndex === 0}>
                  Previous
                </Button>
                <Button
                  onClick={handleNext}
                  disabled={currentIndex === likedArtworks.length - 1}
                >
                  Next
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Typography variant="h6" component="p">
            No artwork selected or available to display.
          </Typography>
        )}
      </div>
    </Modal>
  );
};

export default FavouritesGalleryModal;
