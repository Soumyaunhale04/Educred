import { 
  LayoutDashboard, 
  Award, 
  BarChart3, 
  Wallet, 
  LogOut 
} from 'lucide-react';

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

export function Navigation({ currentPage, onNavigate, onLogout }: NavigationProps) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'certificates', label: 'Certificates', icon: Award },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'wallet', label: 'Wallet & Profile', icon: Wallet },
  ];

  return (
    <div className="w-64 h-screen bg-white border-r border-[#E5E7EB] flex flex-col p-4 shadow-sm">
      {/* Logo */}
      <div className="mb-8 px-2">
        <h1 className="text-[#1E1E1E] flex items-center gap-2">
          <div 
            className="w-8 h-8 rounded-lg flex items-center justify-center shadow-sm"
            style={{
              background: 'linear-gradient(135deg, #2F80ED 0%, #56CCF2 100%)'
            }}
          >
            <Award className="w-5 h-5 text-white" />
          </div>
          <span>EduCred</span>
        </h1>
        <p className="text-[#6B7280] text-sm mt-1">Blockchain Education</p>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'text-white shadow-md'
                  : 'text-[#6B7280] hover:text-[#1E1E1E] hover:bg-[#F3F4F6]'
              }`}
              style={isActive ? {
                background: 'linear-gradient(135deg, #2F80ED 0%, #56CCF2 100%)'
              } : {}}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Logout Button */}
      <button
        onClick={onLogout}
        className="flex items-center gap-3 px-4 py-3 rounded-lg text-[#6B7280] hover:text-[#F2994A] hover:bg-[#F3F4F6] transition-all duration-200"
      >
        <LogOut className="w-5 h-5" />
        <span>Logout</span>
      </button>
    </div>
  );
}
