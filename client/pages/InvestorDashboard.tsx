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
  Plus,
  Sprout,
  Calendar
} from 'lucide-react';
import { getInvestmentData } from '@/services/authService';
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
    activeInvestments: (user as any)?.activeInvestments || 5,
    organicProduceValue: (user as any)?.organicProduceValue || 12500,
    monthlyBenefits: (user as any)?.monthlyBenefits || 3200
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          {t('welcomeBack')}, {user?.name}! 👋
        </h1>
        <p className="text-gray-600 mt-2">
          {t('investorDashboardDescription')}
        </p>
      </div>

      {/* Investment Statistics - Removed Portfolio Value and Total Returns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
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
            <CardTitle className="text-sm font-medium">{t('activeInvestments')}</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{portfolioStats.activeInvestments}</div>
            <p className="text-xs text-muted-foreground">
              {t('acrossMultipleCrops')}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('organicProduceValue')}</CardTitle>
            <Sprout className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{portfolioStats.organicProduceValue.toLocaleString()}</div>
            <p className="text-xs text-green-600">
              {t('monthlyBenefitsAvailable')}
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
                      {t(investment.status.toLowerCase())}
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
              {[
                {
                  type: 'Investment',
                  description: 'New Investment In Tomato Farming',
                  amount: '+₹25,000',
                  date: '2 Days Ago',
                  status: 'Completed'
                },
                {
                  type: 'Benefit',
                  description: 'Organic Produce Discount Used',
                  amount: '-₹850',
                  date: '1 Week Ago',
                  status: 'Completed'
                },
                {
                  type: 'Update',
                  description: 'Crop Progress Update Received',
                  amount: '',
                  date: '3 Days Ago',
                  status: 'Info'
                }
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between py-2">
                  <div className="flex items-start space-x-3">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      activity.status === 'Completed' ? 'bg-green-500' : 'bg-blue-500'
                    }`} />
                    <div>
                      <p className="text-sm font-medium">{activity.description}</p>
                      <p className="text-xs text-gray-500">{activity.date}</p>
                    </div>
                  </div>
                  {activity.amount && (
                    <p className={`text-sm font-medium ${
                      activity.amount.startsWith('+') ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {activity.amount}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Investment Opportunities */}
      <div className="mt-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>New Investment Opportunities</CardTitle>
            <Button variant="outline" size="sm">
              Browse All
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  cropType: 'Organic Carrots',
                  farmer: 'Suresh Kumar',
                  location: 'Guntur, AP',
                  fundingNeeded: 35000,
                  season: 'Rabi Season',
                  duration: '4 Months',
                  image: '🥕'
                },
                {
                  cropType: 'Organic Spinach',
                  farmer: 'Priya Reddy',
                  location: 'Warangal, TS',
                  fundingNeeded: 22000,
                  season: 'Winter Season',
                  duration: '3 Months',
                  image: '🥬'
                },
                {
                  cropType: 'Organic Onions',
                  farmer: 'Ravi Sharma',
                  location: 'Kurnool, AP',
                  fundingNeeded: 45000,
                  season: 'Kharif Season',
                  duration: '5 Months',
                  image: '🧅'
                }
              ].map((opportunity, index) => (
                <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="text-2xl">{opportunity.image}</div>
                    <div>
                      <h4 className="font-medium">{opportunity.cropType}</h4>
                      <p className="text-sm text-gray-600">{opportunity.farmer}</p>
                      <p className="text-xs text-gray-500">{opportunity.location}</p>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Funding Needed:</span>
                      <span className="font-medium">₹{opportunity.fundingNeeded.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Season:</span>
                      <span>{opportunity.season}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Duration:</span>
                      <span>{opportunity.duration}</span>
                    </div>
                  </div>
                  <Button size="sm" className="w-full mt-3">
                    Invest Now
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function InvestorDashboard() {
  const location = useLocation();

  return (
    <DashboardNavigation>
      <Routes>
        <Route path="/" element={<InvestorDashboardHome />} />
        <Route path="/investments" element={<InvestorInvestments />} />
        <Route path="/progress" element={<InvestorProgress />} />
        <Route path="/transactions" element={<InvestorTransactions />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </DashboardNavigation>
  );
}
