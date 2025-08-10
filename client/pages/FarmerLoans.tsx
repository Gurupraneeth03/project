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

  // Enhanced loan data - removed all EMI related fields
  const enhancedLoans = [
    {
      id: 'LOAN-001',
      amount: 75000,
      remainingAmount: 45000,
      purpose: 'Cotton Seed And Equipment',
      interestRate: 8.5,
      dueDate: '2024-06-15',
      status: 'Active',
      disbursedDate: '2023-12-01',
      cropCycle: 'Kharif 2024',
      repaymentStatus: 'On Track'
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
      cropCycle: 'Rabi 2023',
      repaymentStatus: 'Completed'
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
    <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {t('loanManagement')}
              </h1>
              <p className="text-gray-600 mt-2">
                Manage Your Agricultural Loans And Apply For New Funding
              </p>
            </div>
            <Button onClick={() => setShowApplication(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Apply For New Loan
            </Button>
          </div>
        </div>

        {/* Loan Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Borrowed</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{totalBorrowed.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                Across {allLoans.length} Loans
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Remaining Amount</CardTitle>
              <TrendingDown className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{totalRemaining.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                Amount Yet To Be Repaid
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Loans</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeLoanCount}</div>
              <p className="text-xs text-muted-foreground">
                Currently Active
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Loans List */}
        <div className="space-y-6 mb-8">
          {allLoans.map((loan) => (
            <Card key={loan.id}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-start space-x-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      {getStatusIcon(loan.status)}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">₹{loan.amount.toLocaleString()}</h3>
                      <p className="text-gray-600">{loan.purpose}</p>
                      <p className="text-sm text-gray-500">
                        Loan ID: {loan.id} • Disbursed: {loan.disbursedDate}
                      </p>
                    </div>
                  </div>
                  <Badge variant={getStatusColor(loan.status)}>
                    {loan.status}
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-600">Interest Rate</p>
                    <p className="font-medium">{loan.interestRate}% Per Annum</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Crop Cycle</p>
                    <p className="font-medium">{loan.cropCycle}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Due Date</p>
                    <p className="font-medium">{loan.dueDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Repayment Status</p>
                    <p className="font-medium text-green-600">{loan.repaymentStatus}</p>
                  </div>
                </div>

                {/* Repayment Progress */}
                {loan.status.toLowerCase() === 'active' && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Repayment Progress</span>
                      <span>{((loan.amount - loan.remainingAmount) / loan.amount * 100).toFixed(1)}%</span>
                    </div>
                    <Progress value={(loan.amount - loan.remainingAmount) / loan.amount * 100} className="h-2" />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Paid: ₹{(loan.amount - loan.remainingAmount).toLocaleString()}</span>
                      <span>Remaining: ₹{loan.remainingAmount.toLocaleString()}</span>
                    </div>
                  </div>
                )}

                {/* Loan Details */}
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-4">
                      <h4 className="font-medium text-gray-900">Loan Information</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Principal Amount:</span>
                          <span className="font-medium">₹{loan.amount.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Interest Rate:</span>
                          <span className="font-medium">{loan.interestRate}% Per Annum</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Loan Purpose:</span>
                          <span className="font-medium">{loan.purpose}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="font-medium text-gray-900">Repayment Information</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Total Repaid:</span>
                          <span className="font-medium">₹{(loan.amount - loan.remainingAmount).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Remaining:</span>
                          <span className="font-medium">₹{loan.remainingAmount.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Final Due Date:</span>
                          <span className="font-medium">{loan.dueDate}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Loans State */}
        {allLoans.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <div className="text-gray-400 mb-4">
                <DollarSign className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Loans Yet</h3>
              <p className="text-gray-600 mb-4">
                Apply for your first agricultural loan to get started
              </p>
              <Button onClick={() => setShowApplication(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Apply For First Loan
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Loan Application Modal/Form */}
        {showApplication && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Apply For New Loan</h2>
                <Button variant="ghost" onClick={() => setShowApplication(false)}>×</Button>
              </div>

              <form onSubmit={handleApplicationSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="amount">Loan Amount (₹)</Label>
                    <Input
                      id="amount"
                      type="number"
                      value={applicationForm.amount}
                      onChange={(e) => setApplicationForm({...applicationForm, amount: e.target.value})}
                      placeholder="50000"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="duration">Duration (Months)</Label>
                    <Input
                      id="duration"
                      type="number"
                      value={applicationForm.duration}
                      onChange={(e) => setApplicationForm({...applicationForm, duration: e.target.value})}
                      placeholder="12"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="purpose">Loan Purpose</Label>
                  <Input
                    id="purpose"
                    value={applicationForm.purpose}
                    onChange={(e) => setApplicationForm({...applicationForm, purpose: e.target.value})}
                    placeholder="Seeds, Equipment, Irrigation, etc."
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="cropType">Crop Type</Label>
                  <Input
                    id="cropType"
                    value={applicationForm.cropType}
                    onChange={(e) => setApplicationForm({...applicationForm, cropType: e.target.value})}
                    placeholder="Cotton, Rice, Wheat, etc."
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="expectedYield">Expected Yield</Label>
                  <Input
                    id="expectedYield"
                    value={applicationForm.expectedYield}
                    onChange={(e) => setApplicationForm({...applicationForm, expectedYield: e.target.value})}
                    placeholder="2.5 tons, 15 quintals, etc."
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="description">Additional Details</Label>
                  <Textarea
                    id="description"
                    value={applicationForm.description}
                    onChange={(e) => setApplicationForm({...applicationForm, description: e.target.value})}
                    placeholder="Provide any additional information about your loan requirement..."
                    rows={3}
                  />
                </div>

                <div className="flex justify-end space-x-4 pt-4">
                  <Button type="button" variant="outline" onClick={() => setShowApplication(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    Submit Application
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
    </div>
  );
}
