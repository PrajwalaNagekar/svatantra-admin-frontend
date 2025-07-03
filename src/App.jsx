import React from 'react';
import { useRoutes } from 'react-router-dom';
import Router from './routes/Router'; // Adjust path as needed

function App() {
  
  const routing = useRoutes(Router);
  return routing;
}

export default App;
