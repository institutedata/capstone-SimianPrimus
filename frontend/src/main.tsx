import React from 'react';
import { createRoot } from 'react-dom/client'; 
import App from './App.tsx';
import { ThemeProvider } from './components/themes/ThemeProvider.tsx'; // Import the ThemeProvider component

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = createRoot(rootElement);

  root.render(
    <React.StrictMode>
      <ThemeProvider> {/* Wrap the App component with the ThemeProvider */}
        <App />
      </ThemeProvider>
    </React.StrictMode>
  );
}

