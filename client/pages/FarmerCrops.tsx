import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Sprout, 
  Droplets, 
  Sun, 
  Thermometer,
  Calendar,
  AlertTriangle,
  TrendingUp,
  Camera,
  Plus,
  RefreshCw
} from 'lucide-react';
import { getFarmingData } from '@/services/authService';

export default function FarmerCrops() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [farmingData, setFarmingData] = useState<any>(null);

  useEffect(() => {
    if (user) {
      const data = getFarmingData(user.id);
      // Add some additional mock crop data
      const extendedData = {
        ...data,
        currentCrops: [
          {
            id: 'crop_1',
            name: 'Organic Tomatoes',
            plantedDate: '2024-01-15',
            expectedHarvest: '2024-05-15',
            area: '2 acres',
            progress: 65,
            healthStatus: 'Excellent',
            waterLevel: 'Optimal',
            nutrients: 'Good',
            temperature: '28°C',
            humidity: '65%',
            soilPh: '6.5',
            image: '🍅',
            notes: 'Plants showing excellent growth. Regular watering maintained.',
            alerts: [],
            growthStages: [
              { stage: 'Seedling', completed: true, date: '2024-01-20' },
              { stage: 'Flowering', completed: true, date: '2024-02-15' },
              { stage: 'Fruit Development', completed: false, date: '2024-03-15' },
              { stage: 'Maturation', completed: false, date: '2024-04-15' }
            ]
          },
          {
            id: 'crop_2',
            name: 'Organic Chili',
            plantedDate: '2024-02-01',
            expectedHarvest: '2024-06-01',
            area: '1.5 acres',
            progress: 45,
            healthStatus: 'Good',
            waterLevel: 'Good',
            nutrients: 'Fair',
            temperature: '29°C',
            humidity: '60%',
            soilPh: '6.8',
            image: '🌶️',
            notes: 'Need to increase potassium levels. Some leaves showing yellowing.',
            alerts: [
              { type: 'warning', message: 'Nutrient deficiency detected' }
            ],
            growthStages: [
              { stage: 'Seedling', completed: true, date: '2024-02-05' },
              { stage: 'Flowering', completed: false, date: '2024-03-05' },
              { stage: 'Fruit Development', completed: false, date: '2024-04-05' },
              { stage: 'Maturation', completed: false, date: '2024-05-05' }
            ]
          }
        ]
      };
      setFarmingData(extendedData);
    }
  }, [user]);

  const getHealthColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'excellent': return 'text-green-600 bg-green-100';
      case 'good': return 'text-blue-600 bg-blue-100';
      case 'fair': return 'text-yellow-600 bg-yellow-100';
      case 'poor': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getWaterLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'optimal': return 'text-blue-600';
      case 'good': return 'text-green-600';
      case 'low': return 'text-yellow-600';
      case 'critical': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {t('currentCropStatus')}
            </h1>
            <p className="text-gray-600 mt-2">
              Monitor your crops' health and growth progress
            </p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh Data
            </Button>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add New Crop
            </Button>
          </div>
        </div>

        {/* Crops Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {farmingData?.currentCrops?.map((crop: any) => (
            <Card key={crop.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="text-4xl">{crop.image}</div>
                    <div>
                      <CardTitle className="text-xl">{crop.name}</CardTitle>
                      <p className="text-sm text-gray-600">Area: {crop.area}</p>
                    </div>
                  </div>
                  <Badge className={getHealthColor(crop.healthStatus)}>
                    {crop.healthStatus}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent>
                <Tabs defaultValue="overview" className="space-y-4">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="conditions">Conditions</TabsTrigger>
                    <TabsTrigger value="progress">Progress</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="overview" className="space-y-4">
                    {/* Growth Progress */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Growth Progress</span>
                        <span className="text-sm text-gray-600">{crop.progress}%</span>
                      </div>
                      <Progress value={crop.progress} className="h-3" />
                    </div>

                    {/* Key Metrics */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-600">Planted</span>
                        </div>
                        <p className="font-medium">{crop.plantedDate}</p>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-600">Harvest</span>
                        </div>
                        <p className="font-medium">{crop.expectedHarvest}</p>
                      </div>
                    </div>

                    {/* Alerts */}
                    {crop.alerts && crop.alerts.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="font-medium text-orange-600 flex items-center">
                          <AlertTriangle className="h-4 w-4 mr-2" />
                          Alerts
                        </h4>
                        {crop.alerts.map((alert: any, index: number) => (
                          <div key={index} className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                            <p className="text-sm text-orange-800">{alert.message}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Notes */}
                    <div className="space-y-2">
                      <h4 className="font-medium">Notes</h4>
                      <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                        {crop.notes}
                      </p>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="conditions" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Droplets className="h-4 w-4 text-blue-500" />
                            <span className="text-sm">Water Level</span>
                          </div>
                          <span className={`text-sm font-medium ${getWaterLevelColor(crop.waterLevel)}`}>
                            {crop.waterLevel}
                          </span>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Sprout className="h-4 w-4 text-green-500" />
                            <span className="text-sm">Nutrients</span>
                          </div>
                          <span className="text-sm font-medium">{crop.nutrients}</span>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Thermometer className="h-4 w-4 text-red-500" />
                            <span className="text-sm">Temperature</span>
                          </div>
                          <span className="text-sm font-medium">{crop.temperature}</span>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Sun className="h-4 w-4 text-yellow-500" />
                            <span className="text-sm">Humidity</span>
                          </div>
                          <span className="text-sm font-medium">{crop.humidity}</span>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Soil pH</span>
                          <span className="text-sm font-medium">{crop.soilPh}</span>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="progress" className="space-y-4">
                    <div className="space-y-3">
                      {crop.growthStages?.map((stage: any, index: number) => (
                        <div key={index} className={`flex items-center space-x-3 p-3 rounded-lg ${
                          stage.completed ? 'bg-green-50 border border-green-200' : 'bg-gray-50'
                        }`}>
                          <div className={`w-3 h-3 rounded-full ${
                            stage.completed ? 'bg-green-500' : 'bg-gray-300'
                          }`} />
                          <div className="flex-1">
                            <p className={`font-medium ${stage.completed ? 'text-green-800' : 'text-gray-600'}`}>
                              {stage.stage}
                            </p>
                            {stage.completed && (
                              <p className="text-xs text-green-600">Completed on {stage.date}</p>
                            )}
                          </div>
                          {stage.completed && (
                            <div className="text-green-500">✓</div>
                          )}
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>

                {/* Action Buttons */}
                <div className="flex space-x-2 pt-4 border-t">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Camera className="h-4 w-4 mr-2" />
                    Add Photo
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    Update Status
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {(!farmingData?.currentCrops || farmingData.currentCrops.length === 0) && (
          <Card className="text-center py-12">
            <CardContent>
              <div className="text-gray-400 mb-4">
                <Sprout className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No crops planted yet</h3>
              <p className="text-gray-600 mb-6">
                Start your farming journey by planting your first crop
              </p>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Plant New Crop
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Weather and Environmental Info */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Environmental Conditions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl mb-2">☀️</div>
                <p className="text-sm text-gray-600">Weather</p>
                <p className="font-semibold">Sunny</p>
                <p className="text-xs text-gray-500">29°C</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">💧</div>
                <p className="text-sm text-gray-600">Rainfall</p>
                <p className="font-semibold">5mm</p>
                <p className="text-xs text-gray-500">Last 24hrs</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">🌪️</div>
                <p className="text-sm text-gray-600">Wind</p>
                <p className="font-semibold">12 km/h</p>
                <p className="text-xs text-gray-500">NE direction</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">💨</div>
                <p className="text-sm text-gray-600">Humidity</p>
                <p className="font-semibold">68%</p>
                <p className="text-xs text-gray-500">Optimal range</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
