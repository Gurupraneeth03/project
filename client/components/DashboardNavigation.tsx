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
  ChevronDown
} from 'lucide-react';
import LanguageSelector from './LanguageSelector';

interface NavItem {
  path: string;
  label: string;
  icon: React.ReactNode;
}

export default function DashboardNavigation() {
  const { user, logout } = useAuth();
  const { t, language } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  if (!user) return null;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Navigation items based on user type
  const investorNavItems: NavItem[] = [
    { path: '/investor-dashboard', label: t('home'), icon: <Home className="h-4 w-4" /> },
    { path: '/investor-dashboard/investments', label: t('currentInvestments'), icon: <TrendingUp className="h-4 w-4" /> },
    { path: '/investor-dashboard/progress', label: t('investmentProgress'), icon: <BarChart3 className="h-4 w-4" /> },
    { path: '/investor-dashboard/transactions', label: t('previousTransactions'), icon: <History className="h-4 w-4" /> },
    { path: '/investor-dashboard/profile', label: t('profile'), icon: <User className="h-4 w-4" /> }
  ];

  const farmerNavItems: NavItem[] = [
    { path: '/farmer-dashboard', label: t('home'), icon: <Home className="h-4 w-4" /> },
    { path: '/farmer-dashboard/crops', label: t('currentCropStatus'), icon: <Sprout className="h-4 w-4" /> },
    { path: '/farmer-dashboard/loans', label: t('loanManagement'), icon: <DollarSign className="h-4 w-4" /> },
    { path: '/farmer-dashboard/loan-history', label: t('previousLoans'), icon: <FileText className="h-4 w-4" /> },
    { path: '/farmer-dashboard/crop-history', label: t('previousCrops'), icon: <Wheat className="h-4 w-4" /> },
    { path: '/farmer-dashboard/transactions', label: t('transactions'), icon: <History className="h-4 w-4" /> },
    { path: '/farmer-dashboard/profile', label: t('profile'), icon: <User className="h-4 w-4" /> }
  ];

  const navItems = user.type === 'investor' ? investorNavItems : farmerNavItems;

  const isActivePath = (path: string) => {
    if (path === `/${user.type}-dashboard`) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <img 
                src="https://cdn.builder.io/api/v1/image/assets%2F249eb593ae8042aea627b1f968fdde64%2Fbe6be65d23c9462d99e03edbc31a696e?format=webp&width=800" 
                alt="AgroFina Logo" 
                className="h-8 w-8 object-contain" 
              />
              <span className="text-xl font-bold text-primary">AgroFina</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 rounded-md text-sm font-medium flex items-center space-x-2 transition-colors ${
                  isActivePath(item.path)
                    ? 'bg-primary text-white'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
          </div>

          {/* User Menu and Language Selector */}
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
                    {t('profile')}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                  <LogOut className="h-4 w-4 mr-2" />
                  {t('logout')}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-2">
            <div className="space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`block px-3 py-2 rounded-md text-base font-medium flex items-center space-x-2 ${
                    isActivePath(item.path)
                      ? 'bg-primary text-white'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
