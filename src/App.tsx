import React from 'react';
import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import DiseaseDetection from './pages/DiseaseDetection';
import Marketplace from './pages/Marketplace';
import ProductDetail from './pages/ProductDetail';
import Header from './components/Header';
import Footer from './components/Footer';
import { UserProvider } from './context/UserContext';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <UserProvider>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute requiredRole="user">
                  <UserDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/disease-detection" 
              element={
                <ProtectedRoute requiredRole="user">
                  <DiseaseDetection />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/marketplace" 
              element={
                <ProtectedRoute requiredRole="user">
                  <Marketplace />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/marketplace/:id" 
              element={
                <ProtectedRoute requiredRole="user">
                  <ProductDetail />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </UserProvider>
  );
}

export default App;