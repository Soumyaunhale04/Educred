import { useState } from 'react';
import { LoginPage } from './components/pages/LoginPage';
import { Navigation } from './components/common/Navigation';
import { StudentDashboard } from './components/pages/StudentDashboard';
import { CertificatesPage } from './components/pages/CertificatesPage';
import { AnalyticsPage } from './components/pages/AnalyticsPage';
import { WalletPage } from './components/pages/WalletPage';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage('dashboard');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <StudentDashboard />;
      case 'certificates':
        return <CertificatesPage />;
      case 'analytics':
        return <AnalyticsPage />;
      case 'wallet':
        return <WalletPage />;
      default:
        return <StudentDashboard />;
    }
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="flex h-screen w-full bg-[#F9FAFB] overflow-hidden">
      <Navigation 
        currentPage={currentPage} 
        onNavigate={setCurrentPage}
        onLogout={handleLogout}
      />
      {renderPage()}
    </div>
  );
}
