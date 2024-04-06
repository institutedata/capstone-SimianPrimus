import React from "react";
import UnderConstruction from "/public/images/UnderConstruction.png";

const UserGallery: React.FC = () => {
  return (
    <div>
      <h2>User Gallery</h2>
      <h3>Under Construction</h3>
      <img
        src={UnderConstruction}
        alt="Under construction image"
        style={{ width: "90%", height: "auto" }} // Adjust width as needed
      />
    </div>
  );
};

export default UserGallery;
