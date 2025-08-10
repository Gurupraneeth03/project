import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  MapPin, 
  Calendar, 
  DollarSign,
  TrendingUp,
  Search,
  Filter,
  Eye,
  MoreHorizontal
} from 'lucide-react';
import { getInvestmentData } from '@/services/authService';

export default function InvestorInvestments() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [investmentData, setInvestmentData] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    if (user) {
      const data = getInvestmentData(user.id);
      setInvestmentData(data);
    }
  }, [user]);

  const investments = investmentData?.currentInvestments || [];

  const filteredInvestments = investments.filter((investment: any) => {
    const matchesSearch = investment.cropType.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         investment.farmerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         investment.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' || investment.status.toLowerCase() === filterStatus.toLowerCase();
    
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active': return 'default';
      case 'completed': return 'secondary';
      case 'pending': return 'outline';
      default: return 'secondary';
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {t('currentInvestments')}
          </h1>
          <p className="text-gray-600 mt-2">
            Monitor and manage your active agricultural investments
          </p>
        </div>

        {/* Filters and Search */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex items-center space-x-4 w-full md:w-auto">
                <div className="relative flex-1 md:w-80">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search investments..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button 
                  variant={filterStatus === 'all' ? 'default' : 'outline'} 
                  size="sm"
                  onClick={() => setFilterStatus('all')}
                >
                  All
                </Button>
                <Button 
                  variant={filterStatus === 'active' ? 'default' : 'outline'} 
                  size="sm"
                  onClick={() => setFilterStatus('active')}
                >
                  Active
                </Button>
                <Button 
                  variant={filterStatus === 'completed' ? 'default' : 'outline'} 
                  size="sm"
                  onClick={() => setFilterStatus('completed')}
                >
                  Completed
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Investment Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredInvestments.map((investment: any) => (
            <Card key={investment.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="text-3xl">{investment.image}</div>
                    <div>
                      <CardTitle className="text-lg">{investment.cropType}</CardTitle>
                      <p className="text-sm text-gray-600">{investment.farmerName}</p>
                    </div>
                  </div>
                  <Badge variant={getStatusColor(investment.status)}>
                    {investment.status}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Location and Duration */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">{investment.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">{investment.duration}</span>
                  </div>
                </div>

                {/* Investment Amount and Expected Return */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Investment</p>
                    <p className="text-lg font-semibold">₹{investment.amount.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Expected Return</p>
                    <p className="text-lg font-semibold text-green-600">₹{investment.expectedReturn.toLocaleString()}</p>
                  </div>
                </div>

                {/* Progress */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Growth Progress</span>
                    <span className="text-sm font-medium">{investment.progress}%</span>
                  </div>
                  <div className="relative">
                    <Progress value={investment.progress} className="h-2" />
                  </div>
                </div>

                {/* Dates */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Start Date</p>
                    <p className="font-medium">{investment.startDate}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Harvest Date</p>
                    <p className="font-medium">{investment.harvestDate}</p>
                  </div>
                </div>

                {/* ROI Calculation */}
                <div className="bg-green-50 p-3 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-green-700">Expected ROI</span>
                    <div className="flex items-center space-x-1">
                      <TrendingUp className="h-4 w-4 text-green-600" />
                      <span className="font-semibold text-green-700">
                        {(((investment.expectedReturn - investment.amount) / investment.amount) * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-4 border-t">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    {t('viewDetails')}
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredInvestments.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <div className="text-gray-400 mb-4">
                <DollarSign className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {searchTerm || filterStatus !== 'all' ? 'No investments found' : 'No investments yet'}
              </h3>
              <p className="text-gray-600 mb-6">
                {searchTerm || filterStatus !== 'all' 
                  ? 'Try adjusting your search or filter criteria'
                  : 'Start your investment journey by exploring available opportunities'
                }
              </p>
              {(!searchTerm && filterStatus === 'all') && (
                <Button>
                  Explore Opportunities
                </Button>
              )}
            </CardContent>
          </Card>
        )}

        {/* Summary Stats */}
        {filteredInvestments.length > 0 && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Investment Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">
                    ₹{filteredInvestments.reduce((sum: number, inv: any) => sum + inv.amount, 0).toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-600">Total Invested</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">
                    ₹{filteredInvestments.reduce((sum: number, inv: any) => sum + inv.expectedReturn, 0).toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-600">Expected Returns</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-600">
                    {(filteredInvestments.reduce((sum: number, inv: any) => sum + inv.progress, 0) / filteredInvestments.length).toFixed(1)}%
                  </p>
                  <p className="text-sm text-gray-600">Average Progress</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
