import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import DashboardNavigation from '@/components/DashboardNavigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  DollarSign, 
  BarChart3, 
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  Plus
} from 'lucide-react';
import { getInvestmentData } from '@/services/authService';
import FeatureOverview from '@/components/FeatureOverview';
import InvestorInvestments from './InvestorInvestments';
import InvestorProgress from './InvestorProgress';
import InvestorTransactions from './InvestorTransactions';
import Profile from './Profile';

function InvestorDashboardHome() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [investmentData, setInvestmentData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      const data = getInvestmentData(user.id);
      setInvestmentData(data);
      setIsLoading(false);
    }
  }, [user]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const portfolioStats = {
    totalInvestment: (user as any)?.totalInvestment || 250000,
    portfolioValue: (user as any)?.portfolioValue || 275000,
    totalReturns: ((user as any)?.portfolioValue || 275000) - ((user as any)?.totalInvestment || 250000),
    activeInvestments: (user as any)?.activeInvestments || 5
  };

  const returnPercentage = (portfolioStats.totalReturns / portfolioStats.totalInvestment) * 100;

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Feature Overview */}
      <FeatureOverview userType="investor" />

      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          {t('welcomeBack')}, {user?.name}! 👋
        </h1>
        <p className="text-gray-600 mt-2">
          {t('investorDashboardDescription')}
        </p>
      </div>

      {/* Portfolio Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('totalInvestment')}</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{portfolioStats.totalInvestment.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {t('activeInvestments')}: {portfolioStats.activeInvestments}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('portfolioValue')}</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{portfolioStats.portfolioValue.toLocaleString()}</div>
            <p className="text-xs text-green-600 flex items-center">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              +{returnPercentage.toFixed(1)}% {t('totalReturns')}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('totalReturns')}</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              +₹{portfolioStats.totalReturns.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              {returnPercentage > 0 ? 'Profit' : 'Loss'} this period
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('activeInvestments')}</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{portfolioStats.activeInvestments}</div>
            <p className="text-xs text-muted-foreground">
              Across multiple crops
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Current Investments */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>{t('currentInvestments')}</CardTitle>
            <Button variant="outline" size="sm" onClick={() => navigate('/investor-dashboard/investments')}>
              {t('viewAll')}
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {investmentData?.currentInvestments?.slice(0, 2).map((investment: any) => (
                <div key={investment.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="text-2xl">{investment.image}</div>
                    <div>
                      <h4 className="font-medium">{investment.cropType}</h4>
                      <p className="text-sm text-gray-600">{investment.farmerName}</p>
                      <p className="text-xs text-gray-500">{investment.location}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">₹{investment.amount.toLocaleString()}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Progress value={investment.progress} className="w-16 h-2" />
                      <span className="text-xs text-gray-500">{investment.progress}%</span>
                    </div>
                    <Badge variant={investment.status === 'Active' ? 'default' : 'secondary'} className="text-xs mt-1">
                      {investment.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>{t('recentActivity')}</CardTitle>
            <Button variant="outline" size="sm" onClick={() => navigate('/investor-dashboard/transactions')}>
              {t('viewAll')}
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {investmentData?.transactions?.slice(0, 3).map((transaction: any) => (
                <div key={transaction.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      transaction.type === 'investment' ? 'bg-blue-100' : 'bg-green-100'
                    }`}>
                      {transaction.type === 'investment' ? 
                        <ArrowDownRight className="h-4 w-4 text-blue-600" /> : 
                        <ArrowUpRight className="h-4 w-4 text-green-600" />
                      }
                    </div>
                    <div>
                      <p className="text-sm font-medium">{transaction.description}</p>
                      <p className="text-xs text-gray-500">{transaction.date}</p>
                    </div>
                  </div>
                  <div className={`font-medium ${
                    transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transaction.amount > 0 ? '+' : ''}₹{Math.abs(transaction.amount).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>{t('quickActions')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="flex items-center justify-center space-x-2 h-12">
              <Plus className="h-4 w-4" />
              <span>New Investment</span>
            </Button>
            <Button variant="outline" className="flex items-center justify-center space-x-2 h-12" 
                    onClick={() => navigate('/investor-dashboard/investments')}>
              <Eye className="h-4 w-4" />
              <span>{t('viewDetails')}</span>
            </Button>
            <Button variant="outline" className="flex items-center justify-center space-x-2 h-12">
              <BarChart3 className="h-4 w-4" />
              <span>Analytics</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function InvestorDashboard() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNavigation />
      
      <Routes>
        <Route path="/" element={<InvestorDashboardHome />} />
        <Route path="/investments" element={<InvestorInvestments />} />
        <Route path="/progress" element={<InvestorProgress />} />
        <Route path="/transactions" element={<InvestorTransactions />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}
