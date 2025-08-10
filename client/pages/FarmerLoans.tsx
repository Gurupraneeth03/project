import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { 
  DollarSign, 
  Calendar,
  AlertTriangle,
  CheckCircle,
  Clock,
  Plus,
  FileText,
  TrendingDown
} from 'lucide-react';
import { getFarmingData } from '@/services/authService';

export default function FarmerLoans() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [farmingData, setFarmingData] = useState<any>(null);
  const [showApplication, setShowApplication] = useState(false);
  const [applicationForm, setApplicationForm] = useState({
    amount: '',
    purpose: '',
    duration: '12',
    cropType: '',
    expectedYield: '',
    description: ''
  });

  useEffect(() => {
    if (user) {
      const data = getFarmingData(user.id);
      setFarmingData(data);
    }
  }, [user]);

  const loans = farmingData?.loans || [];

  // Enhanced loan data
  const enhancedLoans = [
    {
      id: 'LOAN-001',
      amount: 75000,
      remainingAmount: 45000,
      purpose: 'Cotton Seed & Equipment',
      interestRate: 8.5,
      dueDate: '2024-06-15',
      status: 'Active',
      disbursedDate: '2023-12-01',
      emiAmount: 6875,
      nextEmiDate: '2024-02-01',
      cropCycle: 'Kharif 2024'
    },
    {
      id: 'LOAN-002',
      amount: 50000,
      remainingAmount: 0,
      purpose: 'Irrigation Setup',
      interestRate: 7.0,
      dueDate: '2023-11-30',
      status: 'Completed',
      disbursedDate: '2023-01-15',
      emiAmount: 4583,
      nextEmiDate: null,
      cropCycle: 'Rabi 2023'
    }
  ];

  const allLoans = [...enhancedLoans, ...loans];

  const handleApplicationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Loan application submitted:', applicationForm);
    setShowApplication(false);
    setApplicationForm({
      amount: '',
      purpose: '',
      duration: '12',
      cropType: '',
      expectedYield: '',
      description: ''
    });
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active': return 'default';
      case 'completed': return 'secondary';
      case 'overdue': return 'destructive';
      case 'pending': return 'outline';
      default: return 'secondary';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active': return <Clock className="h-4 w-4" />;
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'overdue': return <AlertTriangle className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const totalBorrowed = allLoans.reduce((sum, loan) => sum + loan.amount, 0);
  const totalRemaining = allLoans.reduce((sum, loan) => sum + loan.remainingAmount, 0);
  const activeLoanCount = allLoans.filter(loan => loan.status.toLowerCase() === 'active').length;

  return (
    <div className="min-h-screen bg-gray-50">
      
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {t('loanManagement')}
              </h1>
              <p className="text-gray-600 mt-2">
                Manage your agricultural loans and apply for new funding
              </p>
            </div>
            <Button onClick={() => setShowApplication(!showApplication)}>
              <Plus className="h-4 w-4 mr-2" />
              {t('applyForLoan')}
            </Button>
          </div>
        </div>

        {/* Loan Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center space-x-2">
                <DollarSign className="h-4 w-4" />
                <span>Total Borrowed</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{totalBorrowed.toLocaleString()}</div>
              <p className="text-sm text-gray-600">{allLoans.length} loans total</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center space-x-2">
                <TrendingDown className="h-4 w-4 text-orange-600" />
                <span>Outstanding Amount</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">₹{totalRemaining.toLocaleString()}</div>
              <p className="text-sm text-gray-600">{activeLoanCount} active loans</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>Repayment Progress</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {totalBorrowed > 0 ? (((totalBorrowed - totalRemaining) / totalBorrowed) * 100).toFixed(1) : 0}%
              </div>
              <Progress 
                value={totalBorrowed > 0 ? ((totalBorrowed - totalRemaining) / totalBorrowed) * 100 : 0} 
                className="mt-2 h-2" 
              />
            </CardContent>
          </Card>
        </div>

        {/* Loan Application Form */}
        {showApplication && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Apply for New Loan</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleApplicationSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="amount">Loan Amount (₹)</Label>
                    <Input
                      id="amount"
                      type="number"
                      placeholder="50000"
                      value={applicationForm.amount}
                      onChange={(e) => setApplicationForm({...applicationForm, amount: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="duration">Duration (Months)</Label>
                    <Input
                      id="duration"
                      type="number"
                      placeholder="12"
                      value={applicationForm.duration}
                      onChange={(e) => setApplicationForm({...applicationForm, duration: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="purpose">Loan Purpose</Label>
                    <Input
                      id="purpose"
                      placeholder="e.g., Seeds, Equipment, Irrigation"
                      value={applicationForm.purpose}
                      onChange={(e) => setApplicationForm({...applicationForm, purpose: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="cropType">Crop Type</Label>
                    <Input
                      id="cropType"
                      placeholder="e.g., Rice, Cotton, Wheat"
                      value={applicationForm.cropType}
                      onChange={(e) => setApplicationForm({...applicationForm, cropType: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="expectedYield">Expected Yield (Tons)</Label>
                  <Input
                    id="expectedYield"
                    type="number"
                    step="0.1"
                    placeholder="5.5"
                    value={applicationForm.expectedYield}
                    onChange={(e) => setApplicationForm({...applicationForm, expectedYield: e.target.value})}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="description">Additional Details</Label>
                  <Textarea
                    id="description"
                    placeholder="Provide additional information about your loan requirement..."
                    value={applicationForm.description}
                    onChange={(e) => setApplicationForm({...applicationForm, description: e.target.value})}
                    rows={3}
                  />
                </div>

                <div className="flex space-x-4">
                  <Button type="submit">Submit Application</Button>
                  <Button type="button" variant="outline" onClick={() => setShowApplication(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Current Loans */}
        <div className="space-y-6">
          {allLoans.map((loan) => (
            <Card key={loan.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="flex items-center space-x-3">
                      <span>₹{loan.amount.toLocaleString()}</span>
                      <Badge variant={getStatusColor(loan.status)}>
                        {getStatusIcon(loan.status)}
                        <span className="ml-1">{loan.status}</span>
                      </Badge>
                    </CardTitle>
                    <p className="text-gray-600 mt-1">{loan.purpose}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Loan ID</p>
                    <p className="font-mono text-sm">{loan.id}</p>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Loan Progress */}
                {loan.status.toLowerCase() === 'active' && (
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">Repayment Progress</span>
                      <span className="text-sm font-medium">
                        ₹{(loan.amount - loan.remainingAmount).toLocaleString()} / ₹{loan.amount.toLocaleString()}
                      </span>
                    </div>
                    <Progress 
                      value={((loan.amount - loan.remainingAmount) / loan.amount) * 100} 
                      className="h-3" 
                    />
                    <p className="text-sm text-gray-600 mt-1">
                      ₹{loan.remainingAmount.toLocaleString()} remaining
                    </p>
                  </div>
                )}

                {/* Loan Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium text-gray-900">Loan Details</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Interest Rate:</span>
                        <span className="font-medium">{loan.interestRate}% p.a.</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Disbursed:</span>
                        <span className="font-medium">{loan.disbursedDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Due Date:</span>
                        <span className="font-medium">{loan.dueDate}</span>
                      </div>
                    </div>
                  </div>

                  {loan.status.toLowerCase() === 'active' && (
                    <div className="space-y-4">
                      <h4 className="font-medium text-gray-900">EMI Information</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Monthly EMI:</span>
                          <span className="font-medium">₹{loan.emiAmount?.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Next EMI:</span>
                          <span className="font-medium">{loan.nextEmiDate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Crop Cycle:</span>
                          <span className="font-medium">{loan.cropCycle}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="space-y-4">
                    <h4 className="font-medium text-gray-900">Actions</h4>
                    <div className="space-y-2">
                      {loan.status.toLowerCase() === 'active' && (
                        <>
                          <Button size="sm" className="w-full">
                            Make Payment
                          </Button>
                          <Button variant="outline" size="sm" className="w-full">
                            View Statement
                          </Button>
                        </>
                      )}
                      <Button variant="outline" size="sm" className="w-full">
                        <FileText className="h-4 w-4 mr-2" />
                        Download Details
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Upcoming Payment Alert */}
                {loan.status.toLowerCase() === 'active' && loan.nextEmiDate && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="h-5 w-5 text-yellow-600" />
                      <div>
                        <p className="font-medium text-yellow-800">Upcoming Payment</p>
                        <p className="text-sm text-yellow-700">
                          Next EMI of ₹{loan.emiAmount?.toLocaleString()} is due on {loan.nextEmiDate}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {allLoans.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <div className="text-gray-400 mb-4">
                <DollarSign className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No loans found</h3>
              <p className="text-gray-600 mb-6">
                You haven't taken any loans yet. Apply for a loan to fund your farming activities.
              </p>
              <Button onClick={() => setShowApplication(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Apply for First Loan
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
