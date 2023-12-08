import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/login/Login.jsx';
import Home from './components/Home';
import Details from './components/Details';
import { AuthProvider, useAuth } from './contexts/AuthContext.jsx';
import Register from './components/register/Register.jsx';
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
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/register" element = {<Register />}/>
          <Route path="/login" element={authenticated ? <Navigate to="/home" replace/> : <Login />} />
          <Route path="/home" element={authenticated ? <Layout> <Home /> </Layout> : <Navigate to="/" replace />}/>
          <Route exact path="/details" element={authenticated ? <Details /> : <Navigate to="/" replace />}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
