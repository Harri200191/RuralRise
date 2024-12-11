import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Home } from './pages/Home';
import { Auth } from './pages/Auth';
import { Marketplace } from './pages/Marketplace';
import { Learn } from './pages/Learn';
import { Community } from './pages/Community';
import { PrivateRoute } from './components/routes/PrivateRoute';
import { useAuthStore } from './store/authStore';
import { useInitializeAuth } from './hooks/useInitializeAuth';

export function App() {
  const { isAuthenticated } = useAuthStore();
  useInitializeAuth();

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/login" element={
              isAuthenticated ? <Navigate to="/dashboard" /> : <Auth mode="login" />
            } />
            <Route path="/register" element={
              isAuthenticated ? <Navigate to="/dashboard" /> : <Auth mode="register" />
            } />
            
            <Route path="/" element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            } />
            <Route path="/dashboard" element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            } />
            <Route path="/marketplace" element={
              <PrivateRoute>
                <Marketplace />
              </PrivateRoute>
            } />
            <Route path="/learn" element={
              <PrivateRoute>
                <Learn />
              </PrivateRoute>
            } />
            <Route path="/community" element={
              <PrivateRoute>
                <Community />
              </PrivateRoute>
            } />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;