import React from "react";
import { Routes, Route } from "react-router-dom";
import Create from "../pages/Create";
import Home from "../pages/Home";
import Gallery from "../pages/Gallery";
import ArtHubPage from "../pages/ArtHub";
import Login from "../pages/Login";
import AddArtworks from "../pages/AddArtworks";
import UserGallery from "../pages/UserGallery";
import CreateHub from "../pages/CreateHub";
import Learn from "../pages/Learn";
import Collaborate from "../pages/Collaborate";
import PushIt from "../pages/PushIt";

const PageRoutes: React.FC = () => {
    return (
        <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/discover" element={<Gallery/>} />
        <Route path="/share" element={<ArtHubPage/>} />
        <Route path="/create" element={<Create/>} />
        <Route path="/addwork" element={<AddArtworks/>} />
        <Route path="/userGallery" element={<UserGallery/>} />
        <Route path="/createHub" element={<CreateHub/>} />
        <Route path="/learn" element={<Learn/>} />
        <Route path="/collaborate" element={<Collaborate/>} />
        <Route path="/pushIt" element={<PushIt/>} />
        </Routes>
    );
    };

export default PageRoutes;