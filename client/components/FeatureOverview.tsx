import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Shield, 
  Users, 
  TrendingUp, 
  Sprout,
  DollarSign,
  BarChart3,
  Eye,
  Globe,
  Smartphone
} from 'lucide-react';

interface FeatureOverviewProps {
  userType: 'investor' | 'farmer';
}

export default function FeatureOverview({ userType }: FeatureOverviewProps) {
  const investorFeatures = [
    {
      icon: <DollarSign className="h-6 w-6 text-green-600" />,
      title: 'Investment Portfolio',
      description: 'Track your investments across multiple organic farming projects with real-time updates.'
    },
    {
      icon: <BarChart3 className="h-6 w-6 text-blue-600" />,
      title: 'Performance Analytics',
      description: 'Monitor investment progress, returns, and portfolio performance with detailed analytics.'
    },
    {
      icon: <TrendingUp className="h-6 w-6 text-purple-600" />,
      title: 'Transparent Returns',
      description: 'Receive loan repayments plus organic produce discounts as investment returns.'
    },
    {
      icon: <Eye className="h-6 w-6 text-orange-600" />,
      title: 'Real-time Monitoring',
      description: 'View crop progress, farmer updates, and investment milestones in real-time.'
    }
  ];

  const farmerFeatures = [
    {
      icon: <Sprout className="h-6 w-6 text-green-600" />,
      title: 'Crop Management',
      description: 'Monitor crop health, growth stages, and environmental conditions with detailed tracking.'
    },
    {
      icon: <DollarSign className="h-6 w-6 text-blue-600" />,
      title: 'Loan Management',
      description: 'Apply for agricultural loans and manage repayments with flexible seasonal terms.'
    },
    {
      icon: <BarChart3 className="h-6 w-6 text-purple-600" />,
      title: 'Agricultural Analytics',
      description: 'Track crop yields, profitability, and farming performance over multiple seasons.'
    },
    {
      icon: <Shield className="h-6 w-6 text-orange-600" />,
      title: 'Financial Security',
      description: 'Access three-phase funding support: pre-production, during production, and post-harvest.'
    }
  ];

  const commonFeatures = [
    {
      icon: <Globe className="h-5 w-5 text-green-600" />,
      title: 'Telugu & English Support',
      description: 'Full bilingual interface for better accessibility'
    },
    {
      icon: <Smartphone className="h-5 w-5 text-blue-600" />,
      title: 'Mobile Responsive',
      description: 'Access your dashboard from any device'
    },
    {
      icon: <Shield className="h-5 w-5 text-purple-600" />,
      title: 'Secure & Verified',
      description: 'End-to-end security with verified user accounts'
    }
  ];

  const features = userType === 'investor' ? investorFeatures : farmerFeatures;

  return (
    <Card className="mb-6 border-green-200 bg-gradient-to-r from-green-50 to-blue-50">
      <CardHeader>
        <CardTitle className="text-xl flex items-center space-x-2">
          {userType === 'investor' ? <Users className="h-6 w-6" /> : <Sprout className="h-6 w-6" />}
          <span>
            {userType === 'investor' ? 'Investor Dashboard Features' : 'Farmer Dashboard Features'}
          </span>
          <Badge variant="default" className="ml-2">
            {userType === 'investor' ? 'Investment Platform' : 'Farm Management'}
          </Badge>
        </CardTitle>
        <p className="text-gray-600">
          {userType === 'investor' 
            ? 'Manage your agricultural investments with transparency and real-time insights'
            : 'Comprehensive farm management with financial support and crop monitoring'
          }
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 bg-white rounded-lg">
              <div className="flex-shrink-0">
                {feature.icon}
              </div>
              <div>
                <h4 className="font-medium text-sm">{feature.title}</h4>
                <p className="text-xs text-gray-600 mt-1">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t pt-4">
          <h4 className="font-medium text-sm mb-3 text-gray-700">Platform Features</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {commonFeatures.map((feature, index) => (
              <div key={index} className="flex items-center space-x-2 text-xs">
                {feature.icon}
                <div>
                  <p className="font-medium">{feature.title}</p>
                  <p className="text-gray-500">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
