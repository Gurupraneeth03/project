import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  Calendar, 
  BarChart3,
  Activity,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { getInvestmentData } from '@/services/authService';

export default function InvestorProgress() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [investmentData, setInvestmentData] = useState<any>(null);

  useEffect(() => {
    if (user) {
      const data = getInvestmentData(user.id);
      setInvestmentData(data);
    }
  }, [user]);

  const progressData = investmentData?.currentInvestments || [];

  const getProgressStatus = (progress: number) => {
    if (progress >= 80) return { variant: 'default', text: 'Excellent' };
    if (progress >= 60) return { variant: 'secondary', text: 'Good' };
    if (progress >= 40) return { variant: 'outline', text: 'Fair' };
    return { variant: 'destructive', text: 'Needs Attention' };
  };

  const getTimelineStatus = (startDate: string, harvestDate: string) => {
    const start = new Date(startDate);
    const harvest = new Date(harvestDate);
    const now = new Date();
    const totalDuration = harvest.getTime() - start.getTime();
    const elapsed = now.getTime() - start.getTime();
    const timeProgress = Math.max(0, Math.min(100, (elapsed / totalDuration) * 100));
    
    return {
      timeProgress,
      daysRemaining: Math.max(0, Math.ceil((harvest.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)))
    };
  };

  return (
    <div className="min-h-screen bg-gray-50">
      
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {t('investmentProgress')}
          </h1>
          <p className="text-gray-600 mt-2">
            Track the development and growth of your agricultural investments
          </p>
        </div>

        {/* Overall Progress Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Overall Portfolio Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Average Progress</span>
                  <span className="text-lg font-semibold">
                    {progressData.length > 0 
                      ? (progressData.reduce((sum: number, inv: any) => sum + inv.progress, 0) / progressData.length).toFixed(1)
                      : 0}%
                  </span>
                </div>
                <Progress 
                  value={progressData.length > 0 
                    ? progressData.reduce((sum: number, inv: any) => sum + inv.progress, 0) / progressData.length
                    : 0} 
                  className="h-3" 
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Active Investments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{progressData.length}</div>
              <p className="text-sm text-gray-600">Currently growing</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Projected Returns</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                ₹{progressData.reduce((sum: number, inv: any) => sum + (inv.expectedReturn - inv.amount), 0).toLocaleString()}
              </div>
              <p className="text-sm text-gray-600">Expected profit</p>
            </CardContent>
          </Card>
        </div>

        {/* Individual Investment Progress */}
        <div className="space-y-6">
          {progressData.map((investment: any) => {
            const { timeProgress, daysRemaining } = getTimelineStatus(investment.startDate, investment.harvestDate);
            const progressStatus = getProgressStatus(investment.progress);
            
            return (
              <Card key={investment.id} className="overflow-hidden">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="text-3xl">{investment.image}</div>
                      <div>
                        <CardTitle className="text-xl">{investment.cropType}</CardTitle>
                        <p className="text-gray-600">{investment.farmerName} • {investment.location}</p>
                        <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                          <span>₹{investment.amount.toLocaleString()} invested</span>
                          <span>•</span>
                          <span>Expected: ₹{investment.expectedReturn.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                    <Badge variant={progressStatus.variant as any}>
                      {progressStatus.text}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  {/* Growth Progress */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium flex items-center space-x-2">
                        <Activity className="h-4 w-4" />
                        <span>Crop Growth Progress</span>
                      </h4>
                      <span className="text-lg font-semibold">{investment.progress}%</span>
                    </div>
                    <Progress value={investment.progress} className="h-3" />
                    <p className="text-sm text-gray-600 mt-2">
                      {investment.progress < 25 ? 'Seedling stage' :
                       investment.progress < 50 ? 'Vegetative growth' :
                       investment.progress < 75 ? 'Flowering stage' :
                       investment.progress < 95 ? 'Fruit development' : 'Ready for harvest'}
                    </p>
                  </div>

                  {/* Timeline Progress */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium flex items-center space-x-2">
                        <Calendar className="h-4 w-4" />
                        <span>Timeline Progress</span>
                      </h4>
                      <span className="text-lg font-semibold">{timeProgress.toFixed(1)}%</span>
                    </div>
                    <Progress value={timeProgress} className="h-3" />
                    <div className="flex justify-between text-sm text-gray-600 mt-2">
                      <span>Started: {investment.startDate}</span>
                      <span>{daysRemaining} days remaining</span>
                      <span>Harvest: {investment.harvestDate}</span>
                    </div>
                  </div>

                  {/* ROI Tracking */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <TrendingUp className="h-4 w-4 text-blue-600" />
                        <span className="text-sm font-medium text-blue-700">Current Value</span>
                      </div>
                      <p className="text-xl font-bold text-blue-700">
                        ₹{(investment.amount + (investment.expectedReturn - investment.amount) * (investment.progress / 100)).toLocaleString()}
                      </p>
                    </div>
                    
                    <div className="bg-green-50 p-4 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <ArrowUpRight className="h-4 w-4 text-green-600" />
                        <span className="text-sm font-medium text-green-700">Projected ROI</span>
                      </div>
                      <p className="text-xl font-bold text-green-700">
                        {(((investment.expectedReturn - investment.amount) / investment.amount) * 100).toFixed(1)}%
                      </p>
                    </div>
                    
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <BarChart3 className="h-4 w-4 text-purple-600" />
                        <span className="text-sm font-medium text-purple-700">Risk Level</span>
                      </div>
                      <p className="text-xl font-bold text-purple-700">
                        {investment.progress > 75 ? 'Low' : 
                         investment.progress > 50 ? 'Medium' : 'High'}
                      </p>
                    </div>
                  </div>

                  {/* Recent Updates */}
                  <div>
                    <h4 className="font-medium mb-3">Recent Updates</h4>
                    <div className="space-y-2">
                      {[
                        { date: '2 days ago', update: 'Crop health inspection completed - Excellent condition', type: 'positive' },
                        { date: '1 week ago', update: 'Regular watering and fertilization applied', type: 'neutral' },
                        { date: '2 weeks ago', update: 'Growth milestone reached - 70% complete', type: 'positive' }
                      ].map((update, index) => (
                        <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                          <div className={`w-2 h-2 rounded-full mt-2 ${
                            update.type === 'positive' ? 'bg-green-500' : 
                            update.type === 'neutral' ? 'bg-blue-500' : 'bg-red-500'
                          }`} />
                          <div className="flex-1">
                            <p className="text-sm">{update.update}</p>
                            <p className="text-xs text-gray-500">{update.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Empty State */}
        {progressData.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <div className="text-gray-400 mb-4">
                <BarChart3 className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No investments to track</h3>
              <p className="text-gray-600">Start investing to see progress tracking here</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
