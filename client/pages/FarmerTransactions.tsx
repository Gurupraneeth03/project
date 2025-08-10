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
  Filter,
  TrendingUp,
  TrendingDown,
  Sprout,
  FileText
} from 'lucide-react';
import { getFarmingData } from '@/services/authService';

export default function FarmerTransactions() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [farmingData, setFarmingData] = useState<any>(null);
  const [selectedPeriod, setSelectedPeriod] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (user) {
      const data = getFarmingData(user.id);
      setFarmingData(data);
    }
  }, [user]);

  // Enhanced transaction data - removed all EMI references
  const transactions = [
    {
      id: 'TXN-F001',
      type: 'income',
      description: 'Tomato Sale To Local Market',
      amount: 45000,
      date: '2024-01-20',
      status: 'completed',
      category: 'crop_sale',
      buyer: 'Vegetable Market Hyderabad',
      quantity: '800 kg',
      pricePerKg: 56.25
    },
    {
      id: 'TXN-F002',
      type: 'expense',
      description: 'Fertilizer Purchase - Organic',
      amount: -8500,
      date: '2024-01-18',
      status: 'completed',
      category: 'input_cost',
      vendor: 'Green Earth Organic',
      quantity: '5 bags',
      cropType: 'Vegetables'
    },
    {
      id: 'TXN-F003',
      type: 'income',
      description: 'Government Subsidy Payment',
      amount: 12000,
      date: '2024-01-15',
      status: 'completed',
      category: 'subsidy',
      scheme: 'PM KISAN Benefit',
      benefitPeriod: 'Jan-Apr 2024'
    },
    {
      id: 'TXN-F004',
      type: 'expense',
      description: 'Equipment Maintenance',
      amount: -3200,
      date: '2024-01-12',
      status: 'completed',
      category: 'maintenance',
      equipment: 'Tractor Service',
      serviceType: 'Regular Maintenance'
    },
    {
      id: 'TXN-F005',
      type: 'income',
      description: 'Carrot Sale To Processing Unit',
      amount: 28000,
      date: '2024-01-10',
      status: 'completed',
      category: 'crop_sale',
      buyer: 'Fresh Foods Processing',
      quantity: '500 kg',
      pricePerKg: 56
    },
    {
      id: 'TXN-F006',
      type: 'expense',
      description: 'Loan Repayment - Agricultural Loan',
      amount: -15000,
      date: '2023-12-15',
      status: 'completed',
      category: 'loan_repayment',
      loanId: 'LOAN-001',
      repaymentType: 'Seasonal Payment'
    },
    {
      id: 'TXN-F007',
      type: 'expense',
      description: 'Seeds Purchase - Organic Variety',
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
      description: 'State Agricultural Support',
      amount: 15000,
      date: '2023-12-05',
      status: 'completed',
      category: 'subsidy',
      scheme: 'Rythu Bandhu Scheme',
      benefitPeriod: 'Kharif 2023'
    },
    {
      id: 'TXN-F009',
      type: 'expense',
      description: 'Water Usage Charges',
      amount: -2800,
      date: '2023-12-01',
      status: 'completed',
      category: 'utility',
      usage: '850 units',
      ratePerUnit: 3.29
    },
    {
      id: 'TXN-F010',
      type: 'income',
      description: 'Onion Sale To Wholesale Market',
      amount: 35000,
      date: '2023-11-28',
      status: 'completed',
      category: 'crop_sale',
      buyer: 'Metro Wholesale Market',
      quantity: '600 kg',
      pricePerKg: 58.33
    }
  ];

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || transaction.type === selectedType;
    
    // Period filtering
    const transactionDate = new Date(transaction.date);
    const now = new Date();
    const matchesPeriod = selectedPeriod === 'all' || 
      (selectedPeriod === '30' && (now.getTime() - transactionDate.getTime()) <= 30 * 24 * 60 * 60 * 1000) ||
      (selectedPeriod === '90' && (now.getTime() - transactionDate.getTime()) <= 90 * 24 * 60 * 60 * 1000) ||
      (selectedPeriod === '365' && (now.getTime() - transactionDate.getTime()) <= 365 * 24 * 60 * 60 * 1000);

    return matchesSearch && matchesType && matchesPeriod;
  });

  const totalIncome = filteredTransactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = filteredTransactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  const netIncome = totalIncome - totalExpense;

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'crop_sale': return <Sprout className="h-4 w-4 text-green-600" />;
      case 'subsidy': return <TrendingUp className="h-4 w-4 text-blue-600" />;
      case 'input_cost': return <ArrowDownRight className="h-4 w-4 text-red-600" />;
      case 'loan_repayment': return <FileText className="h-4 w-4 text-purple-600" />;
      case 'maintenance': return <TrendingDown className="h-4 w-4 text-orange-600" />;
      case 'utility': return <DollarSign className="h-4 w-4 text-gray-600" />;
      default: return <DollarSign className="h-4 w-4 text-gray-600" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'crop_sale': return 'bg-green-50 text-green-700';
      case 'subsidy': return 'bg-blue-50 text-blue-700';
      case 'input_cost': return 'bg-red-50 text-red-700';
      case 'loan_repayment': return 'bg-purple-50 text-purple-700';
      case 'maintenance': return 'bg-orange-50 text-orange-700';
      case 'utility': return 'bg-gray-50 text-gray-700';
      default: return 'bg-gray-50 text-gray-700';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(Math.abs(amount));
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          {t('transactions')}
        </h1>
        <p className="text-gray-600 mt-2">
          {t('trackFinancialDescription')}
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('totalIncome')}</CardTitle>
            <ArrowUpRight className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {formatCurrency(totalIncome)}
            </div>
            <p className="text-xs text-muted-foreground">
              {t('fromSalesSubsidies')}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('totalExpense')}</CardTitle>
            <ArrowDownRight className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {formatCurrency(totalExpense)}
            </div>
            <p className="text-xs text-muted-foreground">
              {t('farmingOtherCosts')}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('netIncome')}</CardTitle>
            <TrendingUp className={`h-4 w-4 ${netIncome >= 0 ? 'text-green-600' : 'text-red-600'}`} />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${netIncome >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {formatCurrency(netIncome)}
            </div>
            <p className="text-xs text-muted-foreground">
              {netIncome >= 0 ? 'Profit' : 'Loss'} For Selected Period
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder={t('searchTransactions')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button 
                variant={selectedType === 'all' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setSelectedType('all')}
              >
                {t('allTypes')}
              </Button>
              <Button 
                variant={selectedType === 'income' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setSelectedType('income')}
              >
                {t('income')}
              </Button>
              <Button 
                variant={selectedType === 'expense' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setSelectedType('expense')}
              >
                {t('expense')}
              </Button>
            </div>

            <div className="flex items-center space-x-2">
              <Button 
                variant={selectedPeriod === 'all' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setSelectedPeriod('all')}
              >
                {t('allTime')}
              </Button>
              <Button 
                variant={selectedPeriod === '30' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setSelectedPeriod('30')}
              >
                {t('last30Days')}
              </Button>
              <Button 
                variant={selectedPeriod === '90' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setSelectedPeriod('90')}
              >
                {t('last3Months')}
              </Button>
            </div>

            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              {t('export')}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Transactions List */}
      <Card>
        <CardHeader>
          <CardTitle>{t('transactionHistory')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredTransactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className={`p-2 rounded-full ${getCategoryColor(transaction.category)}`}>
                    {getCategoryIcon(transaction.category)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium">{transaction.description}</h4>
                      <Badge variant="outline" className="text-xs">
                        {transaction.category.replace('_', ' ')}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                      <span className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <span>{new Date(transaction.date).toLocaleDateString()}</span>
                      </span>
                      <span>ID: {transaction.id}</span>
                      {transaction.quantity && (
                        <span>Qty: {transaction.quantity}</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-lg font-semibold ${
                    transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transaction.amount > 0 ? '+' : ''}{formatCurrency(transaction.amount)}
                  </div>
                  <Badge variant={transaction.status === 'completed' ? 'secondary' : 'default'} className="text-xs">
                    {transaction.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>

          {filteredTransactions.length === 0 && (
            <div className="text-center py-8">
              <div className="text-gray-400 mb-4">
                <FileText className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Transactions Found</h3>
              <p className="text-gray-600">
                {searchTerm ? 'Try adjusting your search or filters' : 'No transactions available for the selected period'}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
