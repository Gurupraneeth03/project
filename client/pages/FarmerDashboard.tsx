import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import DashboardNavigation from '@/components/DashboardNavigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Sprout, 
  DollarSign, 
  Calendar, 
  TrendingUp,
  Droplets,
  Sun,
  AlertTriangle,
  Plus,
  FileText,
  Activity,
  Thermometer
} from 'lucide-react';
import { getFarmingData } from '@/services/authService';
import FarmerCrops from './FarmerCrops';
import FarmerLoans from './FarmerLoans';
import FarmerTransactions from './FarmerTransactions';
import Profile from './Profile';

function FarmerDashboardHome() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [farmingData, setFarmingData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      const data = getFarmingData(user.id);
      setFarmingData(data);
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

  const farmerStats = {
    currentLoan: (user as any)?.currentLoan || 0, // Set to 0 if no active loan
    totalLoans: (user as any)?.totalLoansHistory || 2, // Previous loans count
    activeCrops: farmingData?.currentCrops?.length || 1,
    completedCrops: (user as any)?.completedCropsHistory || 8, // Previous crops count
    landSize: (user as any)?.landSize || '5 acres'
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          {t('welcomeBack')}, {user?.name}! 🌾
        </h1>
        <p className="text-gray-600 mt-2">
          {t('farmerDashboardDescription')}
        </p>
      </div>

      {/* Farm Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('currentLoan')}</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {farmerStats.currentLoan > 0 ? `₹${farmerStats.currentLoan.toLocaleString()}` : t('noActiveLoan')}
            </div>
            <p className="text-xs text-muted-foreground">
              {farmerStats.currentLoan > 0 ? t('activeLoanAmount') : t('applyForNewLoan')}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('activeCrops')}</CardTitle>
            <Sprout className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{farmerStats.activeCrops}</div>
            <p className="text-xs text-muted-foreground">
              {t('currentlyGrowing')}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('landSize')}</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{farmerStats.landSize}</div>
            <p className="text-xs text-muted-foreground">
              {t('totalFarmingArea')}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('farmingExperience')}</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{farmerStats.completedCrops}</div>
            <p className="text-xs text-muted-foreground">
              {t('completedHarvests')}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Current Crops */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>{t('currentCropStatus')}</CardTitle>
            <Button variant="outline" size="sm" onClick={() => navigate('/farmer-dashboard/crops')}>
              {t('viewAll')}
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {farmingData?.currentCrops?.map((crop: any) => (
                <div key={crop.id} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">{crop.image}</div>
                      <div>
                        <h4 className="font-medium">{crop.name}</h4>
                        <p className="text-sm text-gray-600">{t('area')}: {crop.area}</p>
                      </div>
                    </div>
                    <Badge variant={
                      crop.healthStatus === 'Excellent' ? 'default' :
                      crop.healthStatus === 'Good' ? 'secondary' : 'destructive'
                    }>
                      {t(crop.healthStatus.toLowerCase())}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{t('growthProgress')}</span>
                      <span>{crop.progress}%</span>
                    </div>
                    <Progress value={crop.progress} className="h-2" />
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 mt-3 text-sm">
                    <div className="flex items-center space-x-2">
                      <Droplets className="h-4 w-4 text-blue-500" />
                      <span className="text-gray-600">{crop.waterLevel}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Sun className="h-4 w-4 text-yellow-500" />
                      <span className="text-gray-600">{crop.nutrients}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-green-500" />
                      <span className="text-gray-600">{t('may15')}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Loan Management - No EMI Details */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>{t('loanManagement')}</CardTitle>
            <Button variant="outline" size="sm" onClick={() => navigate('/farmer-dashboard/loans')}>
              {farmerStats.currentLoan > 0 ? t('manageLoan') : t('applyForLoan')}
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {farmerStats.currentLoan > 0 ? (
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-medium">₹{farmerStats.currentLoan.toLocaleString()}</h4>
                      <p className="text-sm text-gray-600">{t('seasonalCropLoan')}</p>
                    </div>
                    <Badge variant="default">{t('active')}</Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{t('loanStatus')}</span>
                      <span className="text-green-600">{t('approvedAndDisbursed')}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>{t('purpose')}</span>
                      <span>{t('organicVegetableFarming')}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>{t('applicationDate')}</span>
                      <span>{t('jan15_2024')}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-6 text-center border rounded-lg">
                  <div className="text-gray-400 mb-3">
                    <DollarSign className="h-12 w-12 mx-auto" />
                  </div>
                  <h4 className="font-medium text-gray-900 mb-2">{t('noActiveLoans')}</h4>
                  <p className="text-sm text-gray-600 mb-4">
                    {t('applyForSeasonalLoan')}
                  </p>
                  <Button size="sm" onClick={() => navigate('/farmer-dashboard/loans')}>
                    {t('applyForLoan')}
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Weather & Farm Insights */}
      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>{t('todaysFarmInsights')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg">
                <Droplets className="h-8 w-8 text-blue-600" />
                <div>
                  <p className="text-sm text-blue-700 font-medium">{t('soilMoisture')}</p>
                  <p className="text-xl font-bold text-blue-700">68%</p>
                  <p className="text-xs text-blue-600">{t('optimalLevel')}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-4 bg-yellow-50 rounded-lg">
                <Sun className="h-8 w-8 text-yellow-600" />
                <div>
                  <p className="text-sm text-yellow-700 font-medium">{t('sunlight')}</p>
                  <p className="text-xl font-bold text-yellow-700">7.2 hrs</p>
                  <p className="text-xs text-yellow-600">{t('goodExposure')}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg">
                <Thermometer className="h-8 w-8 text-green-600" />
                <div>
                  <p className="text-sm text-green-700 font-medium">{t('temperature')}</p>
                  <p className="text-xl font-bold text-green-700">28°C</p>
                  <p className="text-xs text-green-600">{t('idealRange')}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-4 bg-purple-50 rounded-lg">
                <Activity className="h-8 w-8 text-purple-600" />
                <div>
                  <p className="text-sm text-purple-700 font-medium">{t('cropHealth')}</p>
                  <p className="text-xl font-bold text-purple-700">95%</p>
                  <p className="text-xs text-purple-600">{t('excellent')}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Dynamic route components for Previous Crops and Previous Loans
function PreviousCropsHistory() {
  const { user } = useAuth();
  const { t } = useLanguage();
  
  const previousCrops = [
    { id: 1, name: 'Organic Tomatoes', season: 'Rabi 2023', yield: '2.5 tons', profit: '₹45,000', image: '🍅' },
    { id: 2, name: 'Organic Carrots', season: 'Winter 2023', yield: '1.8 tons', profit: '₹32,000', image: '🥕' },
    { id: 3, name: 'Organic Spinach', season: 'Kharif 2023', yield: '0.8 tons', profit: '₹18,000', image: '🥬' },
    { id: 4, name: 'Organic Onions', season: 'Summer 2022', yield: '3.2 tons', profit: '₹58,000', image: '🧅' },
    { id: 5, name: 'Organic Potatoes', season: 'Winter 2022', yield: '2.1 tons', profit: '₹38,000', image: '🥔' }
  ];

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">{t('previousCropsHistory')}</h1>
        <p className="text-gray-600 mt-2">{t('trackFarmingJourney')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {previousCrops.map((crop) => (
          <Card key={crop.id}>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="text-3xl">{crop.image}</div>
                <div>
                  <h3 className="font-semibold">{crop.name}</h3>
                  <p className="text-sm text-gray-600">{crop.season}</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">{t('yield')}:</span>
                  <span className="font-medium">{crop.yield}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">{t('profit')}:</span>
                  <span className="font-medium text-green-600">{crop.profit}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function PreviousLoansHistory() {
  const { user } = useAuth();
  const { t } = useLanguage();
  
  const previousLoans = [
    { id: 1, amount: 75000, purpose: 'Seasonal Crop Loan', status: 'Completed', date: 'Jan 2023', repaymentDate: 'Jun 2023' },
    { id: 2, amount: 45000, purpose: 'Equipment Purchase', status: 'Completed', date: 'Aug 2022', repaymentDate: 'Dec 2022' }
  ];

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">{t('previousLoansHistory')}</h1>
        <p className="text-gray-600 mt-2">{t('reviewLoanHistory')}</p>
      </div>

      <div className="space-y-4">
        {previousLoans.map((loan) => (
          <Card key={loan.id}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg">₹{loan.amount.toLocaleString()}</h3>
                  <p className="text-gray-600">{loan.purpose}</p>
                  <p className="text-sm text-gray-500">{t('appliedDate')}: {loan.date} | {t('repaidDate')}: {loan.repaymentDate}</p>
                </div>
                <Badge variant="secondary">{loan.status}</Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default function FarmerDashboard() {
  return (
    <DashboardNavigation>
      <Routes>
        <Route path="/" element={<FarmerDashboardHome />} />
        <Route path="/crops" element={<FarmerCrops />} />
        <Route path="/loans" element={<FarmerLoans />} />
        <Route path="/loan-history" element={<PreviousLoansHistory />} />
        <Route path="/crop-history" element={<PreviousCropsHistory />} />
        <Route path="/transactions" element={<FarmerTransactions />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </DashboardNavigation>
  );
}
