import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'te';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Helper function to convert camelCase and lowercase to Title Case
const formatToTitleCase = (text: string): string => {
  return text
    .replace(/([a-z])([A-Z])/g, '$1 $2') // Add space before capital letters
    .replace(/^./, str => str.toUpperCase()) // Capitalize first letter
    .replace(/\b\w/g, char => char.toUpperCase()) // Capitalize each word
    .trim();
};

// Translation object with accurate business model information
const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation - All converted to Title Case
    home: "Home",
    howItWorks: "How It Works",
    about: "About",
    contact: "Contact",
    investorLogin: "Investor Login",
    farmerLogin: "Farmer Login",
    
    // Hero Section - Updated to reflect actual business model
    sustainableInvestment: "🌱 Organic Farming Investment Platform",
    investIn: "Invest In",
    organicFarming: " Organic Farmers",
    harvestReturns: "Harvest Organic Benefits",
    heroDescription: "Connect wealthy investors with needy organic farmers. Investors provide loans for crop cultivation and receive discounts on fresh organic produce instead of traditional interest payments.",
    startInvesting: "Start Investing",
    applyForFunding: "Apply For Farming Loan",
    
    // How It Works Section - Accurate business model explanation
    howAgroFinaWorks: "How AgroFina Works",
    howItWorksDescription: "Our platform connects wealthy investors with needy farmers through an innovative loan-to-discount model that benefits everyone.",
    
    // Investment Process - Updated to reflect loan-based model
    investmentProcess: "1. Investment Process",
    investmentProcessDescription: "Wealthy investors provide loans to needy farmers through our secure platform, supporting organic agriculture development.",
    threeSeasonalTerms: "Seasonal Loan Distribution",
    preduringpost: "Pre, During, And Post Harvest Support",
    transparentTC: "Transparent Loan Terms And Organic Discount Benefits",
    
    // Farmer Support - Updated to reflect loan application process
    farmerSupport: "2. Farmer Support",
    farmerSupportDescription: "Needy farmers apply for loans by specifying their crop type, land size, and required funding amount for organic cultivation.",
    preProductionFunding: "Pre Season Loan Disbursement",
    duringProductionSupport: "Growing Season Financial Support",
    postProductionAssistance: "Harvest Season Assistance",
    
    // Returns & Benefits - Updated to reflect organic discount model
    returnsAndBenefits: "3. Returns And Benefits",
    returnsDescription: "Instead of traditional interest, investors receive valuable discounts on fresh organic produce grown by the farmers they supported.",
    exactLoanRepayment: "Principal Loan Amount Repayment",
    organicProduceSupply: "Fresh Organic Produce Access",
    percentageDiscounts: "Significant Produce Discounts",
    
    // Why Choose Section
    whyChooseAgroFina: "Why Choose AgroFina?",
    whyChooseDescription: "Experience the benefits of supporting organic farming while receiving healthy returns through fresh produce discounts.",
    
    // Features - Updated to reflect actual business model
    secureInvestments: "Secure Loan Platform",
    secureInvestmentsDesc: "Transparent loan terms with guaranteed repayment plus organic produce discount benefits.",
    seasonalStructure: "Seasonal Loan Support",
    seasonalStructureDesc: "Comprehensive financial support for farmers throughout their complete crop growing cycle.",
    hundredPercentOrganic: "100% Organic Focus",
    organicDesc: "Supporting only certified organic farming practices, ensuring healthy produce for investor benefits.",
    mutualBenefits: "Win-Win-Win Model",
    mutualBenefitsDesc: "Investors get healthy organic discounts, farmers get funding, communities get sustainable agriculture.",
    
    // Stats
    activeFarmers: "Supported Farmers",
    investors: "Contributing Investors",
    fundsDispersed: "Loans Distributed",
    repaymentRate: "Loan Repayment Rate",
    
    // CTA Section
    readyToStart: "Ready To Make A Difference?",
    ctaDescription: "Join our platform today and support organic farming while enjoying fresh, healthy produce benefits.",
    becomeInvestor: "Become A Supporting Investor",
    
    // Footer
    footerDescription: "Connecting wealthy investors with needy organic farmers through innovative loan-to-discount benefits.",
    platform: "Platform",
    forInvestors: "For Investors",
    forFarmers: "For Farmers",
    company: "Company",
    aboutUs: "About Us",
    termsConditions: "Terms And Conditions",
    support: "Support",
    helpCenter: "Help Center",
    faq: "FAQ",
    privacyPolicy: "Privacy Policy",
    copyright: "© 2024 AgroFina. All rights reserved.",
    
    // About Page - Completely updated to reflect business model
    aboutAgroFina: "About AgroFina",
    aboutDescription: "Learn about our mission to connect wealthy investors with needy organic farmers through our innovative loan-to-discount platform.",
    aboutUsTitle: "About AgroFina",
    aboutUsIntro: "AgroFina is an innovative platform that connects wealthy investors with needy organic farmers through a unique loan-to-discount model, creating sustainable agriculture and healthy returns.",
    
    // Core Business Model Explanations
    inclusiveInvestment: "Inclusive Loan Distribution",
    inclusiveInvestmentDesc: "Wealthy investors provide loans to needy farmers regardless of farm size, ensuring equal access to funding for sustainable organic agriculture development.",
    
    phasedDisbursement: "Seasonal Loan Structure",
    phasedDisbursementDesc: "Loans are distributed across farming seasons - pre-planting, growing, and harvest phases - ensuring farmers have consistent financial support throughout their crop cycle.",
    
    healthyReturns: "Organic Produce Discounts",
    healthyReturnsDesc: "Instead of traditional interest payments, investors receive substantial discounts on fresh organic produce grown by the farmers they supported, promoting healthy living.",
    
    languageAccessibility: "Accessible Platform",
    languageAccessibilityDesc: "Full support for English and Telugu languages, making our loan-to-discount platform accessible to investors and farmers across different regions.",
    
    transparentDashboards: "Transparent Tracking Systems",
    transparentDashboardsDesc: "Clear dashboards for both investors and farmers to track loan status, crop progress, and organic produce discount benefits.",
    
    farmersDashboard: "Farmers' Dashboard",
    farmersDashboardDesc: "Track loan applications, repayment status, crop progress, and connect with supporting investors.",
    
    investorsDashboard: "Investors' Dashboard",
    investorsDashboardDesc: "Monitor your farmer loans, track crop development, and manage your organic produce discount benefits.",
    
    ourMission: "Our Mission",
    missionStatement: "To create a sustainable ecosystem where wealthy investors support needy organic farmers through loans, receiving healthy organic produce discounts in return, fostering community wellness and agricultural prosperity.",
    
    whyChooseUs: "Why Choose Our Platform?",
    fairDistribution: "Fair Loan Access",
    responsibleGrowth: "Sustainable Agriculture",
    realBenefits: "Real Health Benefits", 
    fullTransparency: "Complete Transparency",
    
    equalAccessForAllFarmers: "Equal loan opportunities for farmers of all backgrounds and farm sizes",
    phasedSustainableDevelopment: "Seasonal financial support promoting sustainable organic farming practices",
    healthBenefitsOverCash: "Organic produce discounts provide real health benefits instead of cash returns",
    completeVisibilityTrust: "Full transparency in loan terms, crop progress, and discount benefit calculations",
    
    realTimeCropMonitoring: "Real-time crop development tracking",
    transactionHistory: "Loan and repayment history",
    profitTracking: "Farming profit and yield tracking",
    investmentGrowthTracking: "Loan portfolio and farmer support tracking",
    discountBenefitsOverview: "Organic produce discount benefits overview",
    portfolioAnalytics: "Farmer loan portfolio analytics",

    // Contact Page
    contactUs: "Contact Us",
    contactDescription: "Get in touch with our team for support, partnership opportunities, or general inquiries about our loan-to-discount platform.",

    // How It Works Page
    howItWorksDetail: "How Our Loan-To-Discount Model Works",
    howItWorksDetailDescription: "Detailed explanation of how investors provide loans to farmers and receive organic produce discounts instead of traditional interest.",

    // Farmer Dashboard - Updated to reflect loan application process
    farmerDashboard: "Farmer Dashboard",
    farmerDashboardDescription: "Apply for organic farming loans by specifying your crop, land size, and funding requirements.",
    farmerRegistrationDescription: "Register to apply for farming loans and manage your organic crop cultivation funding.",
    farmerSuggestedAction: "Apply for loans, track funding status, manage crop development, and connect with your supporting investors through our comprehensive farmer dashboard.",
    currentLoan: "Active Loan",
    activeCrops: "Current Crops",
    cropHistory: "Previous Harvest History",
    loanHistory: "Previous Loan History", 
    landSize: "Farm Land Size",
    currentCropStatus: "Crop Status",
    loanManagement: "Loans Section",
    previousLoans: "Previous Loan History",
    previousCrops: "Previous Crop Yields",
    transactions: "Transactions",

    // Investor Dashboard - Updated to reflect loan-to-discount model
    investorDashboard: "Investor Dashboard", 
    investorDashboardDescription: "Manage your farmer loans and track your organic produce discount benefits",
    totalInvestment: "Total Farmer Loans",
    currentValue: "Active Loan Value",
    totalReturns: "Organic Discount Value",
    portfolioValue: "Loan Portfolio Value", 
    activeInvestments: "Supported Farmers",
    organicProduceValue: "Available Organic Discounts",
    myPortfolio: "My Farmer Portfolio",
    newOpportunities: "New Loan Applications",
    organicBenefits: "Organic Produce Benefits",
    termsAndConditions: "Loan Terms And Conditions",
    cropType: "Farmer's Crop Type",
    investmentAmount: "Loan Amount",
    currentSeason: "Growing Season",
    expectedReturn: "Expected Organic Discounts",
    progress: "Crop Development Progress",
    viewDetails: "View Farmer Details",
    investmentDetails: "Loan Details",
    completeInformation: "Complete information about your loan to",
    investmentInformation: "Loan Information",
    amount: "Loan Amount",
    duration: "Loan Duration",
    startDate: "Disbursement Date",
    farmerCropDetails: "Farmer And Crop Details",
    farmer: "Supported Farmer",
    location: "Farm Location",
    crop: "Organic Crop",
    season: "Growing Season",
    seasonalPaymentSchedule: "Seasonal Disbursement Schedule",
    preProductionPayment: "Pre-Season Disbursement",
    duringProductionPayment: "Growing Season Support",
    postProductionPayment: "Harvest Season Support",
    fundingNeeded: "Loan Amount Needed",
    description: "Farming Plan Description",
    investNow: "Provide Loan Now",
    yourOrganicProduceBenefits: "Your Organic Produce Discount Benefits",
    enjoyDiscounted: "Enjoy discounted organic produce as returns on your farmer loans",
    monthlyQuota: "Monthly Discount Quota",
    usageThisMonth: "Discounts Used This Month",
    savingsThisMonth: "Savings From Discounts",
    orderNow: "Order Organic Produce",
    importantInformation: "Important information about loan terms and organic discount benefits",
    investmentStructure: "Loan Structure",
    returnsRepayment: "Repayment And Discount Benefits",
    riskFactors: "Farming Risk Factors",
    organicProduceBenefits: "Organic Produce Discount Benefits",
    downloadCompleteTC: "Download Complete Loan Terms And Conditions",
    active: "Active",
    inactive: "Inactive", 
    deadline: "Repayment Deadline",
    currentInvestments: "Current Investment",
    investmentProgress: "Investment Status",
    previousTransactions: "Previous Loan Transactions",

    // Login & Registration
    login: "Login",
    register: "Register",
    dontHaveAccount: "Don't Have An Account?",
    alreadyHaveAccount: "Already Have An Account?",
    signUp: "Sign Up",
    signIn: "Sign In",
    logout: "Logout",
    profile: "Profile",
    welcomeBack: "Welcome Back",

    // Common Fields - All Title Case
    fullName: "Full Name",
    emailAddress: "Email Address",
    phoneNumber: "Phone Number",
    password: "Password",
    confirmPassword: "Confirm Password",
    or: "OR",
    otpLogin: "Login With OTP",

    // Farmer Fields - Updated to reflect loan application context
    farmerLoginTitle: "Farmer Login",
    farmerRegistrationTitle: "Farmer Registration - Apply For Loans",
    aadhaarNumber: "Aadhaar Number",
    mobileNumber: "Mobile Number",
    emailOptional: "Email ID (Optional)",
    village: "Village",
    district: "District", 
    state: "State",
    typeOfFarming: "Type Of Organic Farming",
    bankAccountDetails: "Bank Account Details For Loan Disbursement",
    accountNumber: "Account Number",
    ifscCode: "IFSC Code",
    bankName: "Bank Name",
    photoIdUpload: "Identity Verification Upload",
    uploadPhotoId: "Upload Aadhaar/PAN/Voter ID",
    farmPhotos: "Farm Photos (For Loan Verification)",
    uploadFarmPhotos: "Upload Farm/Geo-tagged Images",

    // Investor Fields - Updated to reflect loan provider context
    investorLoginTitle: "Investor Login",
    investorRegistrationTitle: "Investor Registration - Provide Farmer Loans",
    panNumber: "PAN Number",
    occupation: "Occupation/Profession",
    preferredLanguage: "Preferred Language",
    billingAddress: "Address For Organic Produce Delivery",
    address: "Delivery Address",
    city: "City",
    pincode: "Pincode",
    paymentMethod: "Preferred Payment Method",
    upiId: "UPI ID",

    // Form Actions
    submit: "Submit",
    cancel: "Cancel",
    upload: "Upload",
    choose: "Choose File",
    required: "Required",
    optional: "Optional",

    // Validation Messages
    fieldRequired: "This Field Is Required",
    invalidEmail: "Please Enter A Valid Email",
    invalidPhone: "Please Enter A Valid Phone Number",
    passwordTooShort: "Password Must Be At Least 6 Characters",
    passwordsDontMatch: "Passwords Don't Match",

    // Farming Types
    vegetables: "Organic Vegetables",
    grains: "Organic Grains",
    fruits: "Organic Fruits",
    cotton: "Organic Cotton",
    sugarcane: "Organic Sugarcane",
    mixed: "Mixed Organic Farming",

    // Additional translations for loan applications
    personalInformation: "Personal Information",
    locationDetails: "Farm Location Details",
    farmingDetails: "Organic Farming Details",
    documentUpload: "Document Upload For Verification",
    accountSecurity: "Account Security",
    supportedFormats: "Supported Formats",
    multipleFiles: "Multiple Files Supported",
    maxSize: "Max Size",
    chooseFile: "Choose File",
    uploadDocument: "Upload Document",
    completeRegistrationDetails: "Complete Registration To Apply For Loans",
    selectFarmingType: "Select Organic Farming Type",

    // Additional dashboard terms
    currentlyGrowing: "Currently Growing Organic Crops",
    noActiveLoans: "No Active Farming Loans",
    activeLoadAmount: "Active Loan Amount",
    totalLoansHistory: "Total Farming Loans History",
    loanApplicationStatus: "Loan Application Status",
    cropManagement: "Organic Crop Management",
    weatherConditions: "Weather Conditions",
    soilHealth: "Organic Soil Health",
    irrigationStatus: "Irrigation Status",
    fertilizerSchedule: "Organic Fertilizer Schedule",
    harvestPrediction: "Harvest Prediction",

    // Additional loan and farming terms
    loanApproved: "Loan Approved And Disbursed",
    cropYieldExpected: "Expected Organic Yield",
    supportingInvestors: "Supporting Investors",
    organicCertification: "Organic Certification Status",
    farmingExperience: "Organic Farming Experience",
    previousHarvests: "Previous Organic Harvests",
    loanRepaymentStatus: "Loan Repayment Status",
    organicProduceQuality: "Organic Produce Quality",
    investorBenefits: "Investor Discount Benefits",
    farmToTable: "Farm To Table Organic Supply",

    // Testimonials - Reflecting loan-to-discount business model
    testimonials: "Success Stories",
    whatOurUsersAreSaying: "What Our Community Is Saying",
    testimonialsDescription: "Real experiences from investors providing loans and farmers receiving support",
    organicFarmer: "Organic Farmer",
    investorFromMumbai: "Loan Provider from Mumbai",
    investorFromHyderabad: "Supporting Investor from Hyderabad", 
    testimonial1Text: "Providing loans to organic farmers through AgroFina has been incredibly rewarding. Instead of cash returns, I receive amazing discounts on fresh organic produce that my family loves. It's investing with a purpose!",
    testimonial2Text: "Getting a loan through AgroFina transformed my farming. No complex EMI pressure - just focus on growing quality organic crops. My supporting investors even visit my farm and appreciate the produce quality!",
    testimonial3Text: "I love supporting needy farmers while getting substantial discounts on the healthiest organic vegetables and fruits. My investment helps families while keeping my own family healthy. Perfect win-win model!",
    testimonial1Name: "Rajesh Kumar",
    testimonial2Name: "Priya Reddy",
    testimonial3Name: "Amit Patel",

    // Contact page additional terms
    phone: "Phone",
    email: "Email", 
    address: "Address",
    workingHours: "Working Hours",
    hoursInfo: "Monday - Friday: 9:00 AM - 6:00 PM"
  },
  
  // Telugu translations - Comprehensive coverage for all dashboard and application content
  te: {
    // Navigation
    home: "హోమ్",
    howItWorks: "ఎలా పని చేస్తుంది",
    about: "మా గురించి",
    contact: "మాతో సంప్రదించండి",
    investorLogin: "పెట్టుబడిదారుల లాగిన్",
    farmerLogin: "రైతుల లాగిన్",
    
    // Hero Section
    sustainableInvestment: "🌱 సేంద్రీయ వ్యవసాయ పెట్టు��డి వేదిక",
    investIn: "పెట్టుబడి పెట్టండి",
    organicFarming: " సేంద్రీయ వ్యవసాయంలో",
    harvestReturns: "ఆరోగ్యకరమైన ప్రయోజనాలను పొందండి",
    heroDescription: "ధనవంతులైన పెట్టుబడిదారులను అవసరంలో ఉన్న సేంద్రీయ రైతులతో కలపండి. పెట్టుబడిదారులు పంట సాగుకు రుణాలు అందించి, సాంప్రదాయిక వడ్డీకి బదులుగా తాజా సేంద్రీయ ఉత్పత్తులపై తగ్గింపులు పొందుతారు.",
    startInvesting: "పెట్టుబడి ప్రారంభించండి",
    applyForFunding: "రుణానికి దరఖాస్తు చేయండి",
    
    // How It Works Section
    howAgroFinaWorks: "అగ్రోఫైనా ఎలా పని చేస్తుంది",
    howItWorksDescription: "మా వేదిక ధనవంతులైన పెట్టుబడిదారులను అవసరంలో ఉన్న రైతులత�� వినూత్న రుణ-నుండి-తగ్గింపు మోడల్ ద్వారా కలుపుతుంది.",
    
    // About page
    aboutAgroFina: "అగ్రోఫైనా గురించి",
    aboutDescription: "స్థిరమైన వ్యవసాయం కోసం ధనవంతులైన పెట్టుబడిదారులను అవసరంలో ఉన్న సేంద్రీయ రైతులతో కలిపే మా మిషన్ గురించి తెలుసుకోండి.",
    aboutUsTitle: "అగ్రోఫైనా గురించి",
    aboutUsIntro: "అగ్రోఫైనా అనేది ధనవంతులైన పెట్టుబడిదారులను అవసరంలో ఉన్న సేంద్రీయ రైతులతో ప్రత్యేకమైన రుణ-నుండి-తగ్గింపు మోడల్ ద్వారా కలిపే వినూత్న వేదిక, స్థిరమైన వ్యవసాయం మరియు ఆరోగ్యకరమైన రిటర్న్‌లను సృష్టిస్తుంది.",
    
    // Farmer Dashboard - Telugu translations for updated labels
    farmerDashboard: "రై��ు డ్యాష్‌బోర్డ్",
    farmerDashboardDescription: "మీ పంట, భూమి పరిమాణం మరియు నిధుల అవసరాలను పేర్కొంటూ సేంద్రీయ వ్యవసాయ రుణాలకు దరఖాస్తు చేసుకోండి.",
    currentLoan: "ప్రస్తుత రుణం",
    activeCrops: "ప్రస్తుత పంటలు",
    landSize: "వ్యవసాయ భూమి పరిమాణం",
    currentCropStatus: "క్రాప్ స్టేటస్",
    loanManagement: "లోన్స్ సెక్షన్",
    previousLoans: "ప్రివియస్ లోన్ హిస్టరీ",
    previousCrops: "మునుపటి పంట దిగుబడులు",
    transactions: "లెక్కలు",
    profile: "ప్రొఫైల్",
    logout: "లాగ్ అవుట్",
    welcomeBack: "తిరిగి స్వాగతం",
    
    // Investor Dashboard - Telugu translations for updated labels
    investorDashboard: "పెట్టుబడిదారుల డ్యాష్‌బోర్డ్",
    investorDashboardDescription: "మీ రైతు రుణాలను నిర్వహించండి మరియు మీ సేంద్రీయ ఉత్పత్తి తగ్గింపు ప్రయోజనాలను ట్రాక్ చేయండి",
    totalInvestment: "మొత్తం రైతు రుణాలు",
    activeInvestments: "మద్దతు పొందిన రైతులు",
    organicProduceValue: "అందుబాటులో ఉన్న సేంద్రీయ తగ్గింపులు",
    currentInvestments: "కరెంట్ ఇన్వెస్ట్‌మెంట్",
    investmentProgress: "ఇన్వెస్ట్‌మెంట్ స్టేటస్",
    previousTransactions: "మునుపటి రుణ లెక్కలు",
    
    // Common Dashboard Terms
    currentlyGrowing: "ప్రస్తుతం పెంచుతున్నారు",
    noActiveLoans: "క్రియాశీల రుణాలు లేవు",
    activeLoadAmount: "క్రియాశీల రుణ మొత్తం",
    totalLoansHistory: "మొత్తం రుణాల చరిత్ర",
    completedHarvests: "పూర్తయిన పంటలు",
    totalFarmingArea: "మొత్తం వ్యవసాయ ప్రాంతం",
    farmingExperience: "వ్య���సాయ అనుభవం",
    applyForNewLoan: "కొత్త రుణానికి దరఖాస్తు చేయండి",
    manageYourLoans: "మీ రుణాలను నిర్వహించండి",
    viewAll: "అన్నీ చూడండి",
    
    // Login & Registration
    login: "లాగిన్",
    register: "రిజిస్టర్",
    dontHaveAccount: "ఖాతా లేదా?",
    alreadyHaveAccount: "ఇప్పటికే ఖాతా ఉందా?",
    signUp: "సైన్ అప్",
    signIn: "సైన్ ఇన్",
    
    // Common Fields
    fullName: "పూర్తి పేరు",
    emailAddress: "ఇమెయిల్ చిరునామా",
    phoneNumber: "ఫోన్ నంబర్",
    password: "పాస్‌వర్డ్",
    confirmPassword: "పాస్‌వర్డ్ నిర్ధారించండి",
    
    // Farmer Fields
    farmerLoginTitle: "రైతు లాగిన్",
    farmerRegistrationTitle: "రైతు రిజిస్ట్రేషన్",
    aadhaarNumber: "ఆధార్ నంబర్",
    mobileNumber: "మొబైల్ నంబర్",
    village: "గ్రామం",
    district: "జిల్ల��",
    state: "రాష్ట్రం",
    typeOfFarming: "సేంద్రీయ వ్యవసాయ రకం",
    bankAccountDetails: "బ్యాంక్ ఖాతా వివరాలు",
    accountNumber: "ఖాతా నంబర్",
    ifscCode: "IFSC కోడ్",
    bankName: "బ్యాంక్ పేరు",
    
    // Investor Fields
    investorLoginTitle: "పెట్టుబడిదారుల లాగిన్",
    investorRegistrationTitle: "పెట్టుబడిదారుల రిజిస్ట్రేషన్",
    panNumber: "PAN నంబర్",
    occupation: "వృత్తి",
    city: "నగరం",
    pincode: "పిన్‌కోడ్",
    
    // Form Actions
    submit: "సమర్పించండి",
    cancel: "రద్దు చేయండి",
    required: "అవసరం",
    optional: "ఐచ్ఛికం",
    
    // Farming Types
    vegetables: "సేంద్రీయ కూరగాయలు",
    grains: "సేంద్రీయ ధాన్యాలు",
    fruits: "సేంద్రీయ పండ్లు",
    cotton: "సేంద్రీయ పత్తి",
    mixed: "మిశ్రమ సేంద్రీయ వ్యవసాయం",
    
    // Footer
    footerDescription: "వినూత్న రుణ-నుండి-తగ్గింపు ప్రయోజనాల ద్వారా ధనవంతులైన పెట్టుబడిదారులను అవసరంలో ఉన్న సేంద్రీయ రైతులతో కలుపుతుంది.",
    platform: "వేదిక",
    forInvestors: "పెట్టుబడిదారుల కోసం",
    forFarmers: "రైతుల కోసం",
    company: "కంపెనీ",
    aboutUs: "మా గురించి",
    support: "మద్దతు",
    helpCenter: "సహాయ కేంద్రం",
    copyright: "© 2024 అగ్రోఫైనా. అన్ని హక్కులు రిజర్వ్ చేయబడ్డాయి.",
    
    // Contact page
    contactUs: "మాతో సంప్రదించండి",
    contactDescription: "మా రుణ-నుండి-తగ్గింపు వేదిక గురించి మద్దతు, భాగస్వామ్య అవకాశాలు లేదా సాధారణ విచారణల కోసం మా బృందంతో సంప్రదించండి.",
    phone: "ఫోన్",
    email: "ఇమ���యిల్",
    address: "చిరునామా",
    
    // Testimonials
    whatOurUsersAreSaying: "మా సమాజం ఏమి చెబుతోంది",
    testimonialsDescription: "రుణాలు అందించే పెట్టుబడిదారులు మరియు మద్దతు పొందే రైతుల నుండి నిజమైన అనుభవాలు",
    organicFarmer: "సేంద్రీయ రైతు",
    investorFromMumbai: "ముంబై నుండి రుణ అందించేవారు",
    investorFromHyderabad: "హైదరాబాద్ నుండి మద్దతు చేసే పెట్టుబడిదారు",
    testimonial1Text: "అగ్రోఫైనా ద్వారా సేంద్రీయ రైతులకు రుణాలు అందించడం చాలా బహుమతిగా ఉంది. నగదు రిటర్న్స్‌కు బదులుగా, నా కుటుంబం ఇష్టపడే తాజా సేంద్రీయ ఉత్పత్తులపై అద్భుతమైన తగ్గింపులు పొందుతున్నాను. ఇది ఉద్దేశ్యంతో పెట్టుబడి పెట్���డం!",
    testimonial2Text: "అగ్రోఫైనా ద్వారా రుణం పొందడం నా వ్యవసాయాన్ని మార్చేసింది. సంక్లిష్టమైన EMI ఒత్తిడి లేదు - కేవలం నాణ్యమైన సేంద్రీయ పంటలు పెంచడంపై దృష్టి. నా మద్దతు చేసే పెట్టుబడిదారులు నా వ్యవసాయాన్ని సందర్శించి ఉత్పత్తి నాణ్యతను మెచ్చుకుంటారు!",
    testimonial3Text: "అవసరంలో ఉన్న రైతులను మద్దతు చేస్తూ ఆరోగ్యకరమైన సేంద్రీయ కూరగాయలు మరియు పండ్లపై గణనీయమైన తగ్గింపులు పొందడం నాకు ఇష్టం. నా పెట్టుబడి కుటుంబాలకు సహాయపడుతుంది మరియు నా స్వంత కుటుంబాన్ని ఆరోగ్యంగా ఉంచుతుంది. పర్ఫెక్ట్ విన్-విన్ మోడల్!",
    testimonial1Name: "రాజేష్ కుమార్",
    testimonial2Name: "ప్రియా రెడ్డి",
    testimonial3Name: "అమిత్ పటేల్"
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && ['en', 'te'].includes(savedLanguage)) {
      setLanguage(savedLanguage);
    }
  }, []);

  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    const translation = translations[language][key];
    if (translation) {
      return translation;
    }
    
    // Fallback: format the key itself to Title Case if translation not found
    return formatToTitleCase(key);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
