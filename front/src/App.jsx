import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Header } from './components/Header';
import Login from './components/Login';
import Home from './components/Home';
import Details from './components/Details';

function App() {
  
  const [authenticated, setAuthenticated] = useState(false);
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log('este es el token ' + token)  
    if (token) {
      // Aquí puedes verificar si el token es válido utilizando jwt.verify
      // Si el token es válido, establece el estado 'authenticated' en true
      // De lo contrario, déjalo como false
      // Puedes utilizar un try-catch para manejar errores de verificación del token
      setAuthenticated(true);      
      <Navigate to="/home" replace />;
    }
  }, []);
  
  const auntenticado = authenticated
  console.log('este es el estado del autenticado después de useEffect ' + auntenticado)

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
