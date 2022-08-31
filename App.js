import * as React from 'react';
import { AuthProvider } from './app/context/AuthContext';
import AppNav from './app/navigation/AppNav';

function App() {
  return (
    <AuthProvider>
      <AppNav></AppNav>
    </AuthProvider>
  );
}

export default App;