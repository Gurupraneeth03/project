import { User } from '@/contexts/AuthContext';

// Mock user database with realistic Telugu state data
const mockUsers = [
  // Investors
  {
    id: 'inv_001',
    type: 'investor' as const,
    name: 'Rajesh Kumar',
    email: 'rajesh.kumar@gmail.com',
    phone: '+91 98765 43210',
    password: 'investor123', // In real app, this would be hashed
    profileImage: '👨‍💼',
    city: 'Hyderabad',
    state: 'Telangana',
    occupation: 'Software Engineer',
    panNumber: 'ABCDE1234F',
    totalInvestment: 250000,
    activeInvestments: 5,
    portfolioValue: 275000
  },
  {
    id: 'inv_002',
    type: 'investor' as const,
    name: 'Rajesh Varma',
    email: 'rajesh.varma@gmail.com',
    phone: '+91 87654 32109',
    password: 'investor456',
    profileImage: '👨‍💼',
    city: 'Hyderabad',
    state: 'Telangana',
    occupation: 'Business Owner',
    panNumber: 'BCDEF2345G',
    totalInvestment: 180000,
    activeInvestments: 3,
    portfolioValue: 195000
  },
  // Farmers
  {
    id: 'far_001',
    type: 'farmer' as const,
    name: 'Ramesh Reddy',
    email: 'ramesh.reddy@gmail.com',
    phone: '+91 76543 21098',
    password: 'farmer123',
    profileImage: '👨‍🌾',
    village: 'Kondapur',
    district: 'Guntur',
    state: 'Andhra Pradesh',
    aadhaarNumber: '1234 5678 9012',
    landSize: '5 acres',
    farmingType: 'Organic Vegetables',
    bankAccount: 'SBI 12345678901',
    currentLoan: 75000,
    totalLoans: 3,
    cropHistory: 5
  },
  {
    id: 'far_002',
    type: 'farmer' as const,
    name: 'Suresh Reddy',
    email: 'suresh.reddy@gmail.com',
    phone: '+91 65432 10987',
    password: 'farmer456',
    profileImage: '👨‍🌾',
    village: 'Kondapur',
    district: 'Guntur',
    state: 'Andhra Pradesh',
    aadhaarNumber: '2345 6789 0123',
    landSize: '3 hectares',
    farmingType: 'Cotton',
    bankAccount: 'HDFC 23456789012',
    currentLoan: 0,
    totalLoans: 2,
    cropHistory: 8
  }
];

export interface AuthResponse {
  success: boolean;
  user?: User & { [key: string]: any };
  error?: string;
}

export const authenticateUser = async (email: string, password: string): Promise<AuthResponse> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const user = mockUsers.find(u => u.email === email && u.password === password);
  
  if (!user) {
    return {
      success: false,
      error: 'Invalid email or password'
    };
  }

  // Remove password from response
  const { password: _, ...userWithoutPassword } = user;
  
  return {
    success: true,
    user: userWithoutPassword as User & { [key: string]: any }
  };
};

export const registerUser = async (userData: any): Promise<AuthResponse> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Check if user already exists
  const existingUser = mockUsers.find(u => u.email === userData.email);
  if (existingUser) {
    return {
      success: false,
      error: 'User with this email already exists'
    };
  }

  // Create new user
  const newUser = {
    id: `${userData.type}_${Date.now()}`,
    type: userData.type,
    name: userData.fullName,
    email: userData.email,
    phone: userData.phone,
    password: userData.password,
    profileImage: userData.type === 'investor' ? '👤' : '🌾',
    ...userData
  };

  // Add to mock database
  mockUsers.push(newUser);

  // Remove password from response
  const { password: _, ...userWithoutPassword } = newUser;

  return {
    success: true,
    user: userWithoutPassword as User & { [key: string]: any }
  };
};

// Get mock investment data for investors
export const getInvestmentData = (userId: string) => {
  return {
    currentInvestments: [
      {
        id: 'inv_1',
        farmerName: 'Ramesh Reddy',
        location: 'Guntur, Andhra Pradesh',
        cropType: 'Organic Tomatoes',
        amount: 50000,
        duration: '4 months',
        progress: 65,
        expectedReturn: 58000,
        status: 'Active',
        startDate: '2024-01-15',
        harvestDate: '2024-05-15',
        image: '🍅'
      },
      {
        id: 'inv_2',
        farmerName: 'Suresh Reddy',
        location: 'Guntur, Andhra Pradesh',
        cropType: 'Cotton',
        amount: 75000,
        duration: '6 months',
        progress: 40,
        expectedReturn: 87000,
        status: 'Active',
        startDate: '2024-02-01',
        harvestDate: '2024-08-01',
        image: '🌾'
      }
    ],
    transactions: [
      {
        id: 'txn_1',
        date: '2024-01-15',
        description: 'Investment in Organic Tomatoes - Ramesh Reddy',
        amount: -50000,
        type: 'investment',
        status: 'Completed'
      },
      {
        id: 'txn_2',
        date: '2024-02-01',
        description: 'Investment in Cotton - Suresh Reddy',
        amount: -75000,
        type: 'investment',
        status: 'Completed'
      }
    ]
  };
};

// Get mock farming data for farmers
export const getFarmingData = (userId: string) => {
  return {
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
        image: '🍅'
      }
    ],
    loans: [
      {
        id: 'loan_1',
        amount: 75000,
        remainingAmount: 45000,
        interestRate: 3.5,
        dueDate: '2024-12-31',
        status: 'Active',
        purpose: 'Seed purchase and irrigation',
        lender: 'Investor Pool'
      }
    ],
    cropHistory: [
      {
        id: 'hist_1',
        cropName: 'Cotton',
        season: 'Kharif 2023',
        area: '3 acres',
        yield: '15 quintals',
        revenue: 85000,
        profit: 35000
      },
      {
        id: 'hist_2',
        cropName: 'Rice',
        season: 'Rabi 2023',
        area: '2 acres',
        yield: '25 quintals',
        revenue: 65000,
        profit: 28000
      }
    ]
  };
};
