import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Header } from './components/Header/Header.jsx';
import Login from './components/Login';
import Home from './components/Home';
import Details from './components/Details';
import { AuthProvider, useAuth } from './contexts/AuthContext.jsx';
import Register from './components/Register.jsx';
import { Layout } from './components/Layout/Layout.jsx';


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
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/register" replace />} />
          <Route path="/register" element = {<Register />}/>
          <Route path="/login" element={authenticated ? <Navigate to="/home" replace/> : <Login />} />
          <Route path="/home" element={authenticated ? <><Layout></Layout><Home></Home></> : <Navigate to="/" replace />}/>
          <Route exact path="/details" element={authenticated ? <Details /> : <Navigate to="/" replace />}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
