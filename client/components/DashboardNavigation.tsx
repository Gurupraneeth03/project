import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { 
  Home, 
  TrendingUp, 
  BarChart3, 
  History, 
  User, 
  Sprout, 
  Wheat, 
  DollarSign, 
  FileText, 
  Menu,
  LogOut,
  ChevronDown,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import LanguageSelector from './LanguageSelector';

interface NavItem {
  path: string;
  label: string;
  icon: React.ReactNode;
}

interface DashboardNavigationProps {
  children: React.ReactNode;
}

// Helper function to convert camelCase to Title Case
const formatLabel = (text: string): string => {
  return text
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, str => str.toUpperCase())
    .trim();
};

export default function DashboardNavigation({ children }: DashboardNavigationProps) {
  const { user, logout } = useAuth();
  const { t, language } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  if (!user) return null;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Navigation items based on user type
  const investorNavItems: NavItem[] = [
    { path: '/investor-dashboard', label: formatLabel(t('home')), icon: <Home className="h-5 w-5" /> },
    { path: '/investor-dashboard/investments', label: formatLabel(t('currentInvestments')), icon: <TrendingUp className="h-5 w-5" /> },
    { path: '/investor-dashboard/progress', label: formatLabel(t('investmentProgress')), icon: <BarChart3 className="h-5 w-5" /> },
    { path: '/investor-dashboard/transactions', label: formatLabel(t('previousTransactions')), icon: <History className="h-5 w-5" /> },
    { path: '/investor-dashboard/profile', label: formatLabel(t('profile')), icon: <User className="h-5 w-5" /> }
  ];

  const farmerNavItems: NavItem[] = [
    { path: '/farmer-dashboard', label: formatLabel(t('home')), icon: <Home className="h-5 w-5" /> },
    { path: '/farmer-dashboard/crops', label: formatLabel(t('currentCropStatus')), icon: <Sprout className="h-5 w-5" /> },
    { path: '/farmer-dashboard/loans', label: formatLabel(t('loanManagement')), icon: <DollarSign className="h-5 w-5" /> },
    { path: '/farmer-dashboard/loan-history', label: formatLabel(t('previousLoans')), icon: <FileText className="h-5 w-5" /> },
    { path: '/farmer-dashboard/crop-history', label: formatLabel(t('previousCrops')), icon: <Wheat className="h-5 w-5" /> },
    { path: '/farmer-dashboard/transactions', label: formatLabel(t('transactions')), icon: <History className="h-5 w-5" /> },
    { path: '/farmer-dashboard/profile', label: formatLabel(t('profile')), icon: <User className="h-5 w-5" /> }
  ];

  const navItems = user.type === 'investor' ? investorNavItems : farmerNavItems;

  const isActivePath = (path: string) => {
    if (path === `/${user.type}-dashboard`) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`bg-white border-r border-gray-200 transition-all duration-300 ease-in-out ${
        isSidebarCollapsed ? 'w-16' : 'w-64'
      } fixed h-full z-40 lg:relative lg:translate-x-0 ${
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <Link to="/" className={`flex items-center space-x-2 ${isSidebarCollapsed ? 'justify-center' : ''}`}>
            <img 
              src="https://cdn.builder.io/api/v1/image/assets%2F249eb593ae8042aea627b1f968fdde64%2Fbe6be65d23c9462d99e03edbc31a696e?format=webp&width=800" 
              alt="AgroFina Logo" 
              className="h-8 w-8 object-contain flex-shrink-0" 
            />
            {!isSidebarCollapsed && (
              <span className="text-xl font-bold text-primary">AgroFina</span>
            )}
          </Link>
          
          {/* Collapse button for desktop */}
          <Button
            variant="ghost"
            size="sm"
            className="hidden lg:flex"
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          >
            {isSidebarCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 p-4">
          <div className="space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActivePath(item.path)
                    ? 'bg-primary text-white'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                } ${isSidebarCollapsed ? 'justify-center' : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
                title={isSidebarCollapsed ? item.label : ''}
              >
                <div className="flex-shrink-0">
                  {item.icon}
                </div>
                {!isSidebarCollapsed && (
                  <span className="truncate">{item.label}</span>
                )}
              </Link>
            ))}
          </div>
        </nav>

        {/* Logout Button at Bottom */}
        <div className="border-t border-gray-200 p-4">
          <Button
            variant="ghost"
            onClick={handleLogout}
            className={`w-full text-red-600 hover:text-red-700 hover:bg-red-50 ${
              isSidebarCollapsed ? 'px-2 justify-center' : 'justify-start px-3'
            }`}
            title={isSidebarCollapsed ? 'Logout' : ''}
          >
            <LogOut className="h-5 w-5 flex-shrink-0" />
            {!isSidebarCollapsed && (
              <span className="ml-3">Logout</span>
            )}
          </Button>
        </div>
      </div>

      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation Bar */}
        <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between z-50">
          {/* Left side - Mobile menu button + Logo (mobile only) */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            
            {/* Mobile Logo */}
            <Link to="/" className="lg:hidden flex items-center space-x-2">
              <img 
                src="https://cdn.builder.io/api/v1/image/assets%2F249eb593ae8042aea627b1f968fdde64%2Fbe6be65d23c9462d99e03edbc31a696e?format=webp&width=800" 
                alt="AgroFina Logo" 
                className="h-8 w-8 object-contain" 
              />
              <span className="text-xl font-bold text-primary">AgroFina</span>
            </Link>
          </div>

          {/* Right side - Language selector and User profile */}
          <div className="flex items-center space-x-4">
            <LanguageSelector />
            
            {/* User Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-lg">
                    {(user as any).profileImage || (user.type === 'investor' ? '👤' : '🌾')}
                  </div>
                  <span className="hidden sm:block text-sm font-medium">{user.name}</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="px-2 py-1.5">
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to={`/${user.type}-dashboard/profile`} className="flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    {formatLabel(t('profile'))}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Main content */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
