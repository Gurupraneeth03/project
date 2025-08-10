import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowUpRight, 
  ArrowDownRight,
  Calendar,
  Search,
  Filter,
  Download,
  CreditCard,
  TrendingUp,
  DollarSign
} from 'lucide-react';
import { getInvestmentData } from '@/services/authService';

export default function InvestorTransactions() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [investmentData, setInvestmentData] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  useEffect(() => {
    if (user) {
      const data = getInvestmentData(user.id);
      setInvestmentData(data);
    }
  }, [user]);

  const transactions = investmentData?.transactions || [];

  // Enhanced transaction data with more details
  const enhancedTransactions = [
    {
      id: 'TXN-001',
      type: 'investment',
      description: 'Investment in Cotton Farming',
      amount: -50000,
      date: '2024-01-15',
      status: 'completed',
      farmer: 'Ramesh Reddy',
      location: 'Guntur, AP',
      cropType: 'Cotton',
      transactionId: 'INV-2024-001'
    },
    {
      id: 'TXN-002',
      type: 'return',
      description: 'Harvest Return - Rice Investment',
      amount: 15000,
      date: '2024-01-10',
      status: 'completed',
      farmer: 'Suresh Reddy',
      location: 'Guntur, AP',
      cropType: 'Rice',
      transactionId: 'RET-2024-001'
    },
    {
      id: 'TXN-003',
      type: 'investment',
      description: 'Investment in Wheat Cultivation',
      amount: -75000,
      date: '2024-01-05',
      status: 'completed',
      farmer: 'Krishna Kumar',
      location: 'Nizamabad, TS',
      cropType: 'Wheat',
      transactionId: 'INV-2024-002'
    },
    {
      id: 'TXN-004',
      type: 'return',
      description: 'Mid-season Profit Share - Cotton',
      amount: 8500,
      date: '2023-12-28',
      status: 'completed',
      farmer: 'Ramesh Reddy',
      location: 'Guntur, AP',
      cropType: 'Cotton',
      transactionId: 'RET-2023-089'
    },
    {
      id: 'TXN-005',
      type: 'investment',
      description: 'Investment in Turmeric Farming',
      amount: -45000,
      date: '2023-12-20',
      status: 'completed',
      farmer: 'Sita Sharma',
      location: 'Warangal, TS',
      cropType: 'Turmeric',
      transactionId: 'INV-2023-088'
    },
    {
      id: 'TXN-006',
      type: 'return',
      description: 'Final Harvest Return - Soybean',
      amount: 32000,
      date: '2023-12-15',
      status: 'completed',
      farmer: 'Ravi Patel',
      location: 'Nizamabad, TS',
      cropType: 'Soybean',
      transactionId: 'RET-2023-087'
    }
  ];

  const allTransactions = [...enhancedTransactions, ...transactions];

  const filteredTransactions = allTransactions.filter((transaction: any) => {
    const matchesSearch = 
      transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.farmer?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.cropType?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.transactionId?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterType === 'all' || transaction.type === filterType;
    
    return matchesSearch && matchesFilter;
  });

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'investment': return <ArrowDownRight className="h-5 w-5 text-red-600" />;
      case 'return': return <ArrowUpRight className="h-5 w-5 text-green-600" />;
      default: return <CreditCard className="h-5 w-5 text-blue-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed': return <Badge variant="default">Completed</Badge>;
      case 'pending': return <Badge variant="outline">Pending</Badge>;
      case 'failed': return <Badge variant="destructive">Failed</Badge>;
      default: return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const totalInvested = filteredTransactions
    .filter(t => t.type === 'investment')
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  const totalReturns = filteredTransactions
    .filter(t => t.type === 'return')
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNavigation />
      
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {t('previousTransactions')}
          </h1>
          <p className="text-gray-600 mt-2">
            View your complete investment and return transaction history
          </p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center space-x-2">
                <ArrowDownRight className="h-4 w-4 text-red-600" />
                <span>Total Invested</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">₹{totalInvested.toLocaleString()}</div>
              <p className="text-sm text-gray-600">{filteredTransactions.filter(t => t.type === 'investment').length} investments</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center space-x-2">
                <ArrowUpRight className="h-4 w-4 text-green-600" />
                <span>Total Returns</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">₹{totalReturns.toLocaleString()}</div>
              <p className="text-sm text-gray-600">{filteredTransactions.filter(t => t.type === 'return').length} returns</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center space-x-2">
                <TrendingUp className="h-4 w-4 text-blue-600" />
                <span>Net Position</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${totalReturns - totalInvested >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                ₹{(totalReturns - totalInvested).toLocaleString()}
              </div>
              <p className="text-sm text-gray-600">
                {totalReturns - totalInvested >= 0 ? 'Profit' : 'Loss'} to date
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex items-center space-x-4 w-full md:w-auto">
                <div className="relative flex-1 md:w-80">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search transactions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button 
                  variant={filterType === 'all' ? 'default' : 'outline'} 
                  size="sm"
                  onClick={() => setFilterType('all')}
                >
                  All
                </Button>
                <Button 
                  variant={filterType === 'investment' ? 'default' : 'outline'} 
                  size="sm"
                  onClick={() => setFilterType('investment')}
                >
                  Investments
                </Button>
                <Button 
                  variant={filterType === 'return' ? 'default' : 'outline'} 
                  size="sm"
                  onClick={() => setFilterType('return')}
                >
                  Returns
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Transaction List */}
        <Card>
          <CardHeader>
            <CardTitle>Transaction History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredTransactions.map((transaction: any) => (
                <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      transaction.type === 'investment' ? 'bg-red-100' : 'bg-green-100'
                    }`}>
                      {getTransactionIcon(transaction.type)}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-1">
                        <h4 className="font-medium">{transaction.description}</h4>
                        {getStatusBadge(transaction.status)}
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-3 w-3" />
                          <span>{transaction.date}</span>
                        </div>
                        {transaction.farmer && (
                          <span>Farmer: {transaction.farmer}</span>
                        )}
                        {transaction.location && (
                          <span>Location: {transaction.location}</span>
                        )}
                        {transaction.transactionId && (
                          <span className="font-mono text-xs">ID: {transaction.transactionId}</span>
                        )}
                      </div>
                      
                      {transaction.cropType && (
                        <div className="mt-2">
                          <Badge variant="outline" className="text-xs">
                            {transaction.cropType}
                          </Badge>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className={`text-lg font-semibold ${
                      transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.amount > 0 ? '+' : ''}₹{Math.abs(transaction.amount).toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-500">
                      {transaction.type === 'investment' ? 'Investment' : 'Return'}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {filteredTransactions.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <DollarSign className="h-16 w-16 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No transactions found</h3>
                <p className="text-gray-600">
                  {searchTerm || filterType !== 'all' 
                    ? 'Try adjusting your search or filter criteria'
                    : 'Your transaction history will appear here once you make investments'
                  }
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
