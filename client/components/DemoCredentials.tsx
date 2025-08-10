import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Copy, Users, Sprout } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface DemoCredentialsProps {
  userType: 'investor' | 'farmer';
  onCredentialSelect: (email: string, password: string) => void;
}

export default function DemoCredentials({ userType, onCredentialSelect }: DemoCredentialsProps) {
  const { t } = useLanguage();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const investorAccounts = [
    {
      name: 'Rajesh Kumar',
      email: 'rajesh.kumar@gmail.com',
      password: 'investor123',
      location: 'Hyderabad, Telangana',
      investment: '₹2,50,000'
    }
  ];

  const farmerAccounts = [
    {
      name: 'Ramesh Reddy',
      email: 'ramesh.reddy@gmail.com',
      password: 'farmer123',
      location: 'Guntur, Andhra Pradesh',
      landSize: '5 acres'
    }
  ];

  const accounts = userType === 'investor' ? investorAccounts : farmerAccounts;

  return (
    <Card className="mb-6 border-blue-200 bg-blue-50/50">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center space-x-2">
          {userType === 'investor' ? <Users className="h-5 w-5" /> : <Sprout className="h-5 w-5" />}
          <span>Demo Accounts</span>
          <Badge variant="secondary" className="text-xs">Testing</Badge>
        </CardTitle>
        <p className="text-sm text-gray-600">
          Use these demo accounts to explore the platform
        </p>
      </CardHeader>
      <CardContent className="space-y-3">
        {accounts.map((account, index) => (
          <div key={index} className="bg-white p-3 rounded-lg border">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h4 className="font-medium text-sm">{account.name}</h4>
                <p className="text-xs text-gray-600">{account.location}</p>
                {userType === 'investor' && (
                  <p className="text-xs text-green-600 font-medium">
                    Total Investment: {(account as any).investment}
                  </p>
                )}
                {userType === 'farmer' && (
                  <p className="text-xs text-green-600 font-medium">
                    Land: {(account as any).landSize}
                  </p>
                )}
              </div>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => onCredentialSelect(account.email, account.password)}
                className="text-xs"
              >
                Use Account
              </Button>
            </div>
            <div className="flex items-center space-x-2 text-xs">
              <div className="flex items-center space-x-1">
                <span className="text-gray-500">Email:</span>
                <code className="bg-gray-100 px-1 rounded">{account.email}</code>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="h-4 w-4 p-0"
                  onClick={() => copyToClipboard(account.email)}
                >
                  <Copy className="h-3 w-3" />
                </Button>
              </div>
              <div className="flex items-center space-x-1">
                <span className="text-gray-500">Password:</span>
                <code className="bg-gray-100 px-1 rounded">{account.password}</code>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="h-4 w-4 p-0"
                  onClick={() => copyToClipboard(account.password)}
                >
                  <Copy className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
