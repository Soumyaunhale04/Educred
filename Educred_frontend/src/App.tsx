import { useState } from "react";
import { LoginPage } from "./components/pages/LoginPage";
import { SignupPage } from "./components/pages/SignupPage";
import { Navigation } from "./components/common/Navigation";
import { StudentDashboard } from "./components/pages/StudentDashboard";
import { CertificatesPage } from "./components/pages/CertificatesPage";
import { AnalyticsPage } from "./components/pages/AnalyticsPage";
import { WalletPage } from "./components/pages/WalletPage";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [showSignup, setShowSignup] = useState(false); // 👈 new state

  const handleLogin = () => {
    setIsLoggedIn(true);
    setShowSignup(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage("dashboard");
  };

  // 👇 when user clicks "Sign Up" button
  const handleSwitchToSignup = () => {
    setShowSignup(true);
  };

  // 👇 when user clicks "Login" button on signup page
  const handleSwitchToLogin = () => {
    setShowSignup(false);
  };

  // ✅ Show Signup Page
  if (showSignup) {
    return <SignupPage onSwitchToLogin={handleSwitchToLogin} />;
  }

  // ✅ Show Login Page
  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} onSwitchToSignup={handleSwitchToSignup} />;
  }

  // ✅ Show Dashboard After Login
  return (
    <div className="flex h-screen w-full bg-[#F9FAFB] overflow-hidden">
      <Navigation
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        onLogout={handleLogout}
      />
      {(() => {
        switch (currentPage) {
          case "dashboard":
            return <StudentDashboard />;
          case "certificates":
            return <CertificatesPage />;
          case "analytics":
            return <AnalyticsPage />;
          case "wallet":
            return <WalletPage />;
          default:
            return <StudentDashboard />;
        }
      })()}
    </div>
  );
}
