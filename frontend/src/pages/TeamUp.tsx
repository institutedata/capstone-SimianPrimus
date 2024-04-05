import React from "react";
import UnderConstruction from "/public/images/UnderConstruction.png";

const Collaborate: React.FC = () => {
  return (
    <div>
      <h2>Team Up</h2>
      <h3>Under Construction</h3>
      <img
        src={UnderConstruction}
        alt="Under construction image"
        style={{ width: "90%", height: "auto" }} // Adjust width as needed
      />
    </div>
  );
};

export default Collaborate;
