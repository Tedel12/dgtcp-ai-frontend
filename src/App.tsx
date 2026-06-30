import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Auth from './pages/Auth';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Anomalies from './pages/Anomalies';
import Transactions from './pages/Transactions';
import Previsions from './pages/Previsions';
import Gouvernance from './pages/Gouvernance';
import Settings from './pages/Settings';
import DataImport from './pages/DataImport';
import DecisionAid from './pages/DecisionAid';
import MainLayout from './layouts/MainLayout';
import Audit from './pages/Audit';
import AnomalieDetail from './pages/AnomalieDetail';
import TransactionDetail from './pages/TransactionDetail';

interface ProtectedRouteProps {
  children: React.ReactNode;
  roles?: string[];
}

const ProtectedRoute = ({ children, roles }: ProtectedRouteProps) => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  
  if (!token) return <Navigate to="/auth" replace />;
  
  if (roles && !roles.includes(user.role)) {
    const redirectPath = user.role === 'admin' ? '/gouvernance' : '/dashboard';
    return <Navigate to={redirectPath} replace />;
  }
  
  return <MainLayout>{children}</MainLayout>;
};

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute roles={['directeur', 'comptable', 'auditeur', 'analyste_financier', 'controleur_financier', 'budgetaire']}>
              <Dashboard />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/transactions" 
          element={<ProtectedRoute roles={['directeur', 'comptable', 'auditeur', 'analyste_financier', 'controleur_financier', 'budgetaire']}><Transactions /></ProtectedRoute>} 
        />
        <Route 
          path="/transactions/:id" 
          element={<ProtectedRoute roles={['directeur', 'comptable', 'auditeur', 'analyste_financier', 'controleur_financier', 'budgetaire']}><TransactionDetail /></ProtectedRoute>} 
        />

        <Route 
          path="/anomalies" 
          element={<ProtectedRoute roles={['directeur', 'auditeur', 'comptable', 'analyste_financier', 'controleur_financier', 'budgetaire']}><Anomalies /></ProtectedRoute>} 
        />
        <Route 
          path="/anomalies/:id" 
          element={<ProtectedRoute roles={['directeur', 'auditeur', 'comptable', 'analyste_financier', 'controleur_financier', 'budgetaire']}><AnomalieDetail /></ProtectedRoute>} 
        />

        <Route 
          path="/analyses" 
          element={
            <ProtectedRoute roles={['directeur', 'auditeur', 'comptable', 'analyste_financier', 'controleur_financier', 'budgetaire']}>
              <Previsions />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/audit" 
          element={
            <ProtectedRoute roles={['directeur', 'auditeur', 'comptable', 'analyste_financier', 'controleur_financier', 'budgetaire']}>
              <Audit />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/gouvernance" 
          element={
            <ProtectedRoute roles={['admin', 'directeur']}>
              <Gouvernance />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/import" 
          element={
            <ProtectedRoute roles={['directeur', 'controleur_financier']}>
              <DataImport />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/settings" 
          element={
            <ProtectedRoute roles={['admin']}>
              <Settings />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/import" 
          element={
            <ProtectedRoute roles={['directeur', 'controleur_financier']}>
              <DataImport />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  );
};

export default App;
