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
  Download,
  DollarSign,
  Sprout,
  CreditCard,
  TrendingUp
} from 'lucide-react';
import { getFarmingData } from '@/services/authService';

export default function FarmerTransactions() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [farmingData, setFarmingData] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  useEffect(() => {
    if (user) {
      const data = getFarmingData(user.id);
      setFarmingData(data);
    }
  }, [user]);

  // Enhanced transaction data for farmers
  const enhancedTransactions = [
    {
      id: 'TXN-F001',
      type: 'income',
      description: 'Cotton Harvest Sale',
      amount: 85000,
      date: '2024-01-12',
      status: 'completed',
      category: 'crop_sale',
      buyer: 'Agricultural Market Yard',
      quantity: '15 quintals',
      pricePerUnit: '₹5,667/quintal',
      cropType: 'Cotton'
    },
    {
      id: 'TXN-F002',
      type: 'expense',
      description: 'Fertilizer Purchase',
      amount: -12000,
      date: '2024-01-08',
      status: 'completed',
      category: 'input_cost',
      vendor: 'AgriSupplies Store',
      quantity: '200 kg',
      cropType: 'Wheat'
    },
    {
      id: 'TXN-F003',
      type: 'loan_disbursement',
      description: 'Kisan Credit Card Loan',
      amount: 50000,
      date: '2024-01-05',
      status: 'completed',
      category: 'loan',
      loanId: 'KCC-2024-001',
      interestRate: '7% p.a.',
      tenure: '12 months'
    },
    {
      id: 'TXN-F004',
      type: 'income',
      description: 'Rice Harvest Sale',
      amount: 65000,
      date: '2023-12-28',
      status: 'completed',
      category: 'crop_sale',
      buyer: 'Local Grain Merchant',
      quantity: '20 quintals',
      pricePerUnit: '₹3,250/quintal',
      cropType: 'Rice'
    },
    {
      id: 'TXN-F005',
      type: 'expense',
      description: 'Tractor Rental',
      amount: -8000,
      date: '2023-12-20',
      status: 'completed',
      category: 'machinery',
      vendor: 'Village Equipment Rental',
      duration: '5 days',
      purpose: 'Land preparation'
    },
    {
      id: 'TXN-F006',
      type: 'loan_payment',
      description: 'EMI Payment - Agricultural Loan',
      amount: -6750,
      date: '2023-12-15',
      status: 'completed',
      category: 'loan',
      loanId: 'LOAN-001',
      emiNumber: '8/12'
    },
    {
      id: 'TXN-F007',
      type: 'expense',
      description: 'Seeds Purchase',
      amount: -5500,
      date: '2023-12-10',
      status: 'completed',
      category: 'input_cost',
      vendor: 'Certified Seeds Store',
      quantity: '10 kg',
      cropType: 'Tomato'
    },
    {
      id: 'TXN-F008',
      type: 'income',
      description: 'Government Subsidy',
      amount: 15000,
      date: '2023-12-05',
      status: 'completed',
      category: 'subsidy',
      scheme: 'PM-KISAN Benefit',
      installment: '2/3'
    }
  ];

  const allTransactions = enhancedTransactions;

  const filteredTransactions = allTransactions.filter((transaction: any) => {
    const matchesSearch = 
      transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.cropType?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.vendor?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.buyer?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterType === 'all' || transaction.type === filterType;
    
    return matchesSearch && matchesFilter;
  });

  const getTransactionIcon = (type: string, category?: string) => {
    switch (type) {
      case 'income': 
        if (category === 'crop_sale') return <Sprout className="h-5 w-5 text-green-600" />;
        return <ArrowUpRight className="h-5 w-5 text-green-600" />;
      case 'expense': return <ArrowDownRight className="h-5 w-5 text-red-600" />;
      case 'loan_disbursement': return <DollarSign className="h-5 w-5 text-blue-600" />;
      case 'loan_payment': return <CreditCard className="h-5 w-5 text-orange-600" />;
      default: return <CreditCard className="h-5 w-5 text-gray-600" />;
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

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'crop_sale': return 'text-green-700 bg-green-100';
      case 'input_cost': return 'text-red-700 bg-red-100';
      case 'loan': return 'text-blue-700 bg-blue-100';
      case 'subsidy': return 'text-purple-700 bg-purple-100';
      case 'machinery': return 'text-orange-700 bg-orange-100';
      default: return 'text-gray-700 bg-gray-100';
    }
  };

  const totalIncome = filteredTransactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = filteredTransactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  const loanTransactions = filteredTransactions
    .filter(t => t.type === 'loan_disbursement' || t.type === 'loan_payment')
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNavigation />
      
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {t('transactions')}
          </h1>
          <p className="text-gray-600 mt-2">
            View your complete farming income, expenses, and loan transaction history
          </p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center space-x-2">
                <ArrowUpRight className="h-4 w-4 text-green-600" />
                <span>Total Income</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">₹{totalIncome.toLocaleString()}</div>
              <p className="text-sm text-gray-600">{filteredTransactions.filter(t => t.type === 'income').length} transactions</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center space-x-2">
                <ArrowDownRight className="h-4 w-4 text-red-600" />
                <span>Total Expenses</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">₹{totalExpenses.toLocaleString()}</div>
              <p className="text-sm text-gray-600">{filteredTransactions.filter(t => t.type === 'expense').length} transactions</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center space-x-2">
                <DollarSign className="h-4 w-4 text-blue-600" />
                <span>Loan Activity</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${loanTransactions >= 0 ? 'text-blue-600' : 'text-orange-600'}`}>
                ₹{Math.abs(loanTransactions).toLocaleString()}
              </div>
              <p className="text-sm text-gray-600">
                {loanTransactions >= 0 ? 'Net received' : 'Net paid'}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center space-x-2">
                <TrendingUp className="h-4 w-4 text-purple-600" />
                <span>Net Position</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${totalIncome - totalExpenses >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                ₹{(totalIncome - totalExpenses).toLocaleString()}
              </div>
              <p className="text-sm text-gray-600">
                {totalIncome - totalExpenses >= 0 ? 'Profit' : 'Loss'} this period
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
                  variant={filterType === 'income' ? 'default' : 'outline'} 
                  size="sm"
                  onClick={() => setFilterType('income')}
                >
                  Income
                </Button>
                <Button 
                  variant={filterType === 'expense' ? 'default' : 'outline'} 
                  size="sm"
                  onClick={() => setFilterType('expense')}
                >
                  Expenses
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
                      transaction.type === 'income' ? 'bg-green-100' : 
                      transaction.type === 'expense' ? 'bg-red-100' : 'bg-blue-100'
                    }`}>
                      {getTransactionIcon(transaction.type, transaction.category)}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-1">
                        <h4 className="font-medium">{transaction.description}</h4>
                        {getStatusBadge(transaction.status)}
                        <Badge variant="outline" className={`text-xs ${getCategoryColor(transaction.category)}`}>
                          {transaction.category.replace('_', ' ')}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-3 w-3" />
                          <span>{transaction.date}</span>
                        </div>
                        
                        {transaction.cropType && (
                          <span>Crop: {transaction.cropType}</span>
                        )}
                        
                        {transaction.quantity && (
                          <span>Qty: {transaction.quantity}</span>
                        )}
                      </div>
                      
                      {/* Additional Details */}
                      <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-gray-500">
                        {transaction.vendor && (
                          <span>Vendor: {transaction.vendor}</span>
                        )}
                        {transaction.buyer && (
                          <span>Buyer: {transaction.buyer}</span>
                        )}
                        {transaction.pricePerUnit && (
                          <span>Rate: {transaction.pricePerUnit}</span>
                        )}
                        {transaction.loanId && (
                          <span>Loan ID: {transaction.loanId}</span>
                        )}
                        {transaction.scheme && (
                          <span>Scheme: {transaction.scheme}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className={`text-lg font-semibold ${
                      transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.amount > 0 ? '+' : ''}₹{Math.abs(transaction.amount).toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-500 capitalize">
                      {transaction.type.replace('_', ' ')}
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
                    : 'Your transaction history will appear here as you start farming activities'
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
