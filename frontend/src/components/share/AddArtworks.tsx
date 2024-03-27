import React, { useState, ChangeEvent, FormEvent } from "react";
import { Box, Button, TextField, Snackbar, Alert } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface ResponseData {
    errorMessage: string;
    errorCode: number;
}

interface CustomError extends Error {
    response?: {
        data: ResponseData;
    };
}

interface ArtworkData {
    title: string;
    artist: string;
    yearCreated: string;
    medium: string;
    dimensions: string;
    description: string;
    imageURL: string;
    imageFile: File | null;
}

const AddArtwork: React.FC = () => {
    const [artworkData, setArtworkData] = useState<ArtworkData>({
        title: "",
        artist: "",
        yearCreated: "",
        medium: "",
        dimensions: "",
        description: "",
        imageURL: "",
        imageFile: null,
    });

    const [successMessage, setSuccessMessage] = useState("");
    const navigate = useNavigate();

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setArtworkData({ ...artworkData, [name]: value });
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files && e.target.files[0];
        if (selectedFile) {
            setArtworkData({ ...artworkData, imageFile: selectedFile, imageURL: "" });
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const userId = localStorage.getItem("userId");

        if (!userId) {
            console.error("Error: User ID is null or not found in localStorage");
            return;
        }

        const artworkWithUserId = { ...artworkData, userId };

        try {
            const response = await axios.post<ArtworkData>("http://localhost:8080/api/originalArtwork", artworkWithUserId);

            console.log("Artwork added successfully:", response.data);
            setSuccessMessage("Artwork added successfully!");

            setTimeout(() => {
                navigate("/share");
            }, 2000); // Redirect after 2 seconds
        } catch (error) {
            console.error("Error adding artwork:", (error as Error).message);

            if ((error as CustomError).response) {
                console.error("Server error response:", (error as CustomError).response?.data);
                // Handle server error response
            } else {
                console.error("Request failed:", (error as Error).message);
                // Handle network errors or other types of errors
            }
        }
    };
    
    const handleCloseSnackbar = () => {
        setSuccessMessage("");
    };
    
    return (
        <Box sx={{ maxWidth: 600, m: "auto", p: 2 }}>
            <TextField
                name="title"
                label="Title"
                variant="outlined"
                fullWidth
                onChange={handleInputChange}
            />
            <TextField
                name="artist"
                label="Artist"
                variant="outlined"
                fullWidth
                onChange={handleInputChange}
            />
            <TextField
                name="yearCreated"
                label="Year Created"
                variant="outlined"
                fullWidth
                onChange={handleInputChange}
            />
            <TextField
                name="medium"
                label="Medium"
                variant="outlined"
                fullWidth
                onChange={handleInputChange}
            />
            <TextField
                name="dimensions"
                label="Dimensions"
                variant="outlined"
                fullWidth
                onChange={handleInputChange}
            />
            <TextField
                name="description"
                label="Description"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                onChange={handleInputChange}
            />
            <TextField
                name="imageURL"
                label="Image URL"
                variant="outlined"
                fullWidth
                onChange={handleInputChange}
            />
            <input
                type="file"
                accept=".png,.jpg,.jpeg"
                onChange={handleFileChange}
            />
            <Button variant="contained" color="primary" onClick={handleSubmit}>
                Add Artwork
            </Button>
    
            <Snackbar open={Boolean(successMessage)} autoHideDuration={2000} onClose={handleCloseSnackbar}>
                <Alert severity="success" onClose={handleCloseSnackbar}>
                    {successMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
    };
    
    export default AddArtwork;

    // TODO: Add field to database to store image file