import React from "react";
import Dash from "../components/user/Dash";
import { useUserContext } from "../components/UserContext";
import { UserData } from "../components/UserContext";

// Dash component
interface DashProps {
  userData: UserData | null;
}

const Dashboard: React.FC<DashProps> = () => {
  const { userData } = useUserContext();

  return (
    <div>
      <Dash userData={userData} />
    </div>
  );
};

export default Dashboard;
