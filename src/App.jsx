import React from 'react';
import { GlobalStyle } from './Styles/Global';
import RoutesApp from './Routes/MainRoutes';
import { AuthProvider } from './Context/auth';

function App() {
  return (
    <AuthProvider>
      <RoutesApp />
      <GlobalStyle />
    </AuthProvider>
  );
}

export default App;
