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
  Activity
} from 'lucide-react';
import { getFarmingData } from '@/services/authService';
import FeatureOverview from '@/components/FeatureOverview';
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
    currentLoan: (user as any)?.currentLoan || 75000,
    totalLoans: (user as any)?.totalLoans || 3,
    activeCrops: farmingData?.currentCrops?.length || 1,
    cropHistory: (user as any)?.cropHistory || 5,
    landSize: (user as any)?.landSize || '5 acres'
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Feature Overview */}
      <FeatureOverview userType="farmer" />

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
            <div className="text-2xl font-bold">₹{farmerStats.currentLoan.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {farmerStats.currentLoan > 0 ? 'Active loan amount' : 'No active loans'}
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
              Currently growing
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Land Size</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{farmerStats.landSize}</div>
            <p className="text-xs text-muted-foreground">
              Total farming area
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Loan History</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{farmerStats.totalLoans}</div>
            <p className="text-xs text-muted-foreground">
              Total loans taken
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
                        <p className="text-sm text-gray-600">Area: {crop.area}</p>
                      </div>
                    </div>
                    <Badge variant={
                      crop.healthStatus === 'Excellent' ? 'default' : 
                      crop.healthStatus === 'Good' ? 'secondary' : 'destructive'
                    }>
                      {crop.healthStatus}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Growth Progress</span>
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
                      <span className="text-gray-600">May 15</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Loan Management */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>{t('loanManagement')}</CardTitle>
            <Button variant="outline" size="sm" onClick={() => navigate('/farmer-dashboard/loans')}>
              {t('applyForLoan')}
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {farmingData?.loans?.map((loan: any) => (
                <div key={loan.id} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-medium">₹{loan.amount.toLocaleString()}</h4>
                      <p className="text-sm text-gray-600">{loan.purpose}</p>
                    </div>
                    <Badge variant={loan.status === 'Active' ? 'default' : 'secondary'}>
                      {loan.status}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Remaining</span>
                      <span>₹{loan.remainingAmount.toLocaleString()}</span>
                    </div>
                    <Progress value={(loan.remainingAmount / loan.amount) * 100} className="h-2" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mt-3 text-sm">
                    <div>
                      <span className="text-gray-600">Interest Rate:</span>
                      <p className="font-medium">{loan.interestRate}%</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Due Date:</span>
                      <p className="font-medium">{loan.dueDate}</p>
                    </div>
                  </div>
                </div>
              ))}
              
              {(!farmingData?.loans || farmingData.loans.length === 0) && (
                <div className="text-center py-8">
                  <div className="text-gray-400 mb-4">
                    <DollarSign className="h-12 w-12 mx-auto" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Active Loans</h3>
                  <p className="text-gray-600 mb-4">You don't have any active loans at the moment.</p>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    {t('applyForLoan')}
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Crop History Preview */}
      <Card className="mt-6">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>{t('previousCrops')}</CardTitle>
          <Button variant="outline" size="sm" onClick={() => navigate('/farmer-dashboard/crop-history')}>
            {t('viewAll')}
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {farmingData?.cropHistory?.slice(0, 3).map((crop: any) => (
              <div key={crop.id} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{crop.cropName}</h4>
                  <Badge variant="secondary">{crop.season}</Badge>
                </div>
                <div className="space-y-1 text-sm text-gray-600">
                  <p>Area: {crop.area}</p>
                  <p>Yield: {crop.yield}</p>
                  <p className="text-green-600 font-medium">Profit: ₹{crop.profit.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>{t('quickActions')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button className="flex items-center justify-center space-x-2 h-12">
              <Plus className="h-4 w-4" />
              <span>Add New Crop</span>
            </Button>
            <Button variant="outline" className="flex items-center justify-center space-x-2 h-12"
                    onClick={() => navigate('/farmer-dashboard/loans')}>
              <DollarSign className="h-4 w-4" />
              <span>{t('applyForLoan')}</span>
            </Button>
            <Button variant="outline" className="flex items-center justify-center space-x-2 h-12"
                    onClick={() => navigate('/farmer-dashboard/crops')}>
              <Activity className="h-4 w-4" />
              <span>Update Crop Status</span>
            </Button>
            <Button variant="outline" className="flex items-center justify-center space-x-2 h-12">
              <FileText className="h-4 w-4" />
              <span>View Reports</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function FarmerDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNavigation />
      
      <Routes>
        <Route path="/" element={<FarmerDashboardHome />} />
        <Route path="/crops" element={<FarmerCrops />} />
        <Route path="/loans" element={<FarmerLoans />} />
        <Route path="/loan-history" element={<div className="p-6"><h1>Previous Loans</h1></div>} />
        <Route path="/crop-history" element={<div className="p-6"><h1>Previous Crops</h1></div>} />
        <Route path="/transactions" element={<FarmerTransactions />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}
