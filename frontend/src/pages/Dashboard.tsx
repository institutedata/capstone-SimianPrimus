import React from 'react';
import Dash from '../components/user/Dash';
import { useUserContext } from '../components/UserContext';

const Dashboard: React.FC = () => {
    const { userData } = useUserContext();
    return (
        <div>
            <Dash userData={userData} />
        </div>
    );
};

export default Dashboard;