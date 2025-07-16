import React from 'react';
import ItalianFiscalCodeAssistant from './components/ItalianFiscalCodeAssistant';
import AdminDashboard from './components/AdminDashboard';

function App() {
  // Check if the URL contains /admin
  const isAdminPath = window.location.pathname.includes('admin');
  
  return (
    <div className="App">
      {isAdminPath ? <AdminDashboard /> : <ItalianFiscalCodeAssistant />}
    </div>
  );
}

export default App;
