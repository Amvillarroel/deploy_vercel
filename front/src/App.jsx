import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Header } from './components/Header';
import Login from './components/Login';
import Home from './components/Home';
import Details from './components/Details';
import { AuthProvider, useAuth } from './contexts/AuthContext';


function App() {
  
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

function AppContent() {
  const { authenticated } = useAuth();

  return (
    <>
      <Header />    
      <Router>
        <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={authenticated ? <Navigate to="/home" replace/> : <Login />} />
          <Route exact path="/home" element={authenticated ? <Home /> : <Navigate to="/login" replace />}/>
          <Route exact path="/details" element={authenticated ? <Details /> : <Navigate to="/login" replace />}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
