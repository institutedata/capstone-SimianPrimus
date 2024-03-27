import React from 'react';
import AuthPage from '../components/login/Login'; // Update the path based on the location of your AuthPage file

const App: React.FC = () => {
  return (
    <div>
      <h3>
        Begin Your Masterpiece - Discover, Create, Share.
      </h3>
      <AuthPage />
    </div>
  );
};

export default App;