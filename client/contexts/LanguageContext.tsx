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
    fundingFarmsFeedingFutures: "Funding Farms, Feeding Futures",
    investIn: "Invest In",
    organicFarming: " Organic Farming",
    harvestHealthyBenefits: "Harvest Healthy Benefits",
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
    getInTouch: "Get In Touch",
    contactUsDescription: "Get in touch with our team for support, partnership opportunities, or general inquiries about our loan-to-discount platform.",
    contactInfo: "Contact Information",
    ourOffice: "Reach out to us through any of the following methods",
    companyAddress: "123 Green Valley Road\nOrganic District, Hyderabad\nTelangana, India - 500001",
    contactPhoneNumber: "+91 98765 43210",
    contactEmailAddress: "support@agrofina.com",
    sendMessage: "Send Us A Message",
    contactForm: "Fill out the form below and we'll get back to you as soon as possible",
    name: "Name",
    message: "Message",
    sending: "Sending...",
    sendButton: "Send Message",
    successMessage: "Thank you! Your message has been sent successfully.",
    errorMessage: "Sorry, there was an error sending your message. Please try again.",

    // How It Works Page
    howItWorksDetail: "How Our Loan-To-Discount Model Works",
    howItWorksDetailDescription: "Detailed explanation of how investors provide loans to farmers and receive organic produce discounts instead of traditional interest.",
    ourLoanToDiscountModel: "Our Loan-To-Discount Model",
    theCompleteProcess: "The Complete Process",
    simpleThreeStepProcess: "A simple 3-step process that benefits wealthy investors, needy farmers, and promotes organic agriculture",
    wealthyInvestorProvidesLoan: "Wealthy Investor Provides Loan",
    investorsProvidesLoanDesc: "Investors browse needy farmer applications and provide loans based on crop type, land size, and funding requirements",
    reviewFarmerApplications: "Review farmer loan applications",
    selectFarmersToSupport: "Select farmers to support",
    provideLoanWithoutInterest: "Provide loan without traditional interest",
    trackFarmerProgress: "Track farmer and crop progress",
    farmerGrowsOrganicCrops: "Farmer Grows Organic Crops",
    farmerGrowsDesc: "Needy farmers use the loan to cultivate organic crops, focusing on quality and sustainable farming practices",
    purchaseOrganicSeeds: "Purchase organic seeds and supplies",
    maintainOrganicStandards: "Maintain certified organic standards",
    regularCropUpdates: "Regular crop progress updates",
    harvestQualityProduce: "Harvest quality organic produce",
    investorReceivesDiscounts: "Investor Receives Organic Discounts",
    investorReceivesDesc: "Instead of traditional interest, investors receive substantial discounts on fresh organic produce from supported farmers",
    receiveLoanRepayment: "Receive loan principal repayment",
    getOrganicDiscounts: "Get organic produce discounts",
    accessPremiumVegetables: "Access to premium organic vegetables",
    healthBenefitsFamily: "Health benefits for the family",
    whyThisModelWorks: "Why This Model Works",
    innovativeApproach: "Our innovative approach creates value for all stakeholders while promoting sustainable organic agriculture",
    forWealthyInvestors: "For Wealthy Investors",
    supportNeedyFarmers: "Support needy farmers while getting meaningful health benefits for your family",
    socialImpact: "Social Impact",
    directlyHelpFamilies: "Directly help needy farming families build sustainable livelihoods",
    healthBenefits: "Health Benefits",
    accessPremiumOrganic: "Access to premium organic produce at discounted rates for your family",
    realReturns: "Real Returns",
    valueEquivalentReturns: "Get value equivalent to traditional returns through organic food savings",
    transparency: "Transparency",
    trackSupportedFarmers: "Track your supported farmers and crop progress in real-time",
    forNeedyFarmers: "For Needy Farmers",
    accessFundingWithoutEMI: "Access funding without complex EMI structures and build sustainable organic farming businesses",
    easyFundingAccess: "Easy Funding Access",
    getLoansSimply: "Get loans by simply mentioning crop type, land size, and amount needed",
    flexibleRepayment: "Flexible Repayment",
    noComplexEMI: "No complex EMI schedules - focus on growing quality organic crops",
    investorConnection: "Investor Connection",
    buildRelationships: "Build relationships with supporting investors who care about your success",
    organicPremium: "Organic Premium",
    betterPricesOrganic: "Get better prices for organic produce and build sustainable farming practices",
    howToGetStarted: "How To Get Started",
    simpleRegistrationProcess: "Simple registration process for both investors and farmers",
    forInvestors: "For Investors",
    registerYourAccount: "Register Your Account",
    provideDetailsInvestor: "Provide your details including PAN, occupation, and delivery address for organic produce",
    browseFarmerApplications: "Browse Farmer Applications",
    reviewLoanRequests: "Review loan requests from needy farmers with their crop plans and funding requirements",
    provideLoans: "Provide Loans",
    selectFarmersSupport: "Select farmers to support and provide loans through our secure platform",
    enjoyOrganicBenefits: "Enjoy Organic Benefits",
    receiveDiscountsTrack: "Receive organic produce discounts and track crop progress from your supported farmers",
    startSupportingFarmers: "Start Supporting Farmers",
    forFarmers: "For Farmers",
    registerYourFarm: "Register Your Farm",
    provideDetailsFarmer: "Provide your details including Aadhaar, farm location, land size, and farming type",
    submitLoanApplication: "Submit Loan Application",
    specifyCropRequirements: "Specify your crop type, land area, and required loan amount with farming plan",
    receiveFunding: "Receive Funding",
    getLoanApproval: "Get loan approval and funding from supporting investors through our platform",
    growAndSupply: "Grow & Supply",
    cultivateOrganicCrops: "Cultivate organic crops and supply fresh produce for investor discount benefits",
    applyForFarmingLoan: "Apply for Farming Loan",

    // Dashboard specific terms
    noActiveLoan: "No Active Loan",
    applyForNewLoan: "Apply For New Loan",
    loanStatus: "Loan Status",
    purpose: "Purpose",
    applyForSeasonalLoan: "Apply for a seasonal loan to support your crop cultivation",
    applyForLoan: "Apply For Loan",
    noActiveLoans: "No Active Loans",
    sunlight: "Sunlight",
    goodExposure: "Good Exposure",
    temperature: "Temperature",
    idealRange: "Ideal Range",
    cropHealth: "Crop Health",

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
    currentlyGrowing: "Currently Growing",
    noActiveLoans: "No Active Farming Loans",
    activeLoanAmount: "Active Loan Amount",
    totalLoansHistory: "Total Farming Loans History",
    loanApplicationStatus: "Loan Application Status",
    cropManagement: "Organic Crop Management",
    weatherConditions: "Weather Conditions",
    soilHealth: "Organic Soil Health",
    irrigationStatus: "Irrigation Status",
    fertilizerSchedule: "Organic Fertilizer Schedule",
    harvestPrediction: "Harvest Prediction",
    completedHarvests: "Completed Harvests",
    totalFarmingArea: "Total Farming Area",
    farmingExperience: "Farming Experience",
    viewAll: "View All",
    manageYourLoans: "Manage Your Loans",
    applyForNewLoan: "Apply For New Loan",
    optimal: "Optimal",
    good: "Good",
    excellent: "Excellent",
    area: "Area",
    acres: "acres",
    growthProgress: "Growth Progress",
    manageLoan: "Manage Loan",
    seasonalCropLoan: "Seasonal Crop Loan",
    approved: "Approved",
    disbursed: "Disbursed",
    approvedAndDisbursed: "Approved & Disbursed",
    organicVegetableFarming: "Organic Vegetable Farming",
    applicationDate: "Application Date",
    todaysFarmInsights: "Today's Farm Insights",
    soilMoisture: "Soil Moisture",
    optimalLevel: "Optimal Level",

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

    // Demo Credentials
    demoAccounts: "Demo Accounts",
    testing: "Testing",
    useTheseDemo: "Use these demo accounts to explore the platform",
    totalInvestment: "Total Investment",
    land: "Land",
    useAccount: "Use Account",
    email: "Email",
    password: "Password",

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
    sustainableInvestment: "🌱 సేంద్రీయ వ్యవసాయ పెట్టుబడి వేదిక",
    fundingFarmsFeedingFutures: "వ్యవసాయాలకు నిధులు, భవిష్యత్తుకు ఆహారం",
    investIn: "పెట్టుబడి పెట్టండి",
    organicFarming: " సేంద్రీయ వ్యవసాయంలో",
    harvestHealthyBenefits: "ఆరోగ్యకరమైన ప్రయోజనాలను పొందండి",
    harvestReturns: "ఆరోగ్యకరమైన ప్రయోజనాలను పొందండి",
    heroDescription: "ధనవంతులైన పెట్టుబడిదారులను అవసరంలో ఉన��న సేంద్రీయ రైతులతో కలపండి. పెట్టుబడిదారులు పంట సాగుకు రుణాలు అందించి, సాంప్రదాయిక వడ్డీకి బదులుగా తాజా సేంద్రీయ ఉత్పత్తులపై తగ్గింపులు పొందుతారు.",
    startInvesting: "పెట్టుబడి ప్రారంభించండి",
    applyForFunding: "రుణానికి దరఖాస్తు చేయండి",
    
    // How It Works Section
    howAgroFinaWorks: "అగ్రోఫైనా ఎలా పని చేస్తుంది",
    howItWorksDescription: "మా వేదిక ధనవంతులైన పెట్టుబడిదారులను అవసరంలో ఉన్న రైతులతో వినూత్న రుణ-నుండి-తగ్గింపు మోడల్ ద్వారా కలుపుతుంది.",
    
    // Investment Process
    investmentProcess: "1. పెట్టుబడి ప్రక్రియ",
    investmentProcessDescription: "ధనవంతులైన పెట్టుబడిదారులు మా సురక్షిత వేదిక ద్��ారా అవసరంలో ఉన్న రైతులకు రుణాలు అందిస్తారు, సేంద్రీయ వ్యవసాయ అభివృద్ధికి మద్దతు ఇస్తారు.",
    threeSeasonalTerms: "కాలానుగుణ రుణ పంపిణీ",
    preduringpost: "కోతకు ముందు, సమయంలో మరియు తరువాత మద్దతు",
    transparentTC: "పారదర్శక రుణ నిబంధనలు మరియు సేంద్రీయ తగ్గింపు ప్రయోజనాలు",
    
    // Farmer Support
    farmerSupport: "2. రైతు మద్దతు",
    farmerSupportDescription: "అవసరంలో ఉన్న రైతులు వారి పంట రకం, భూమి పరిమాణం మరియు అవసరమైన నిధుల మొత్తాన్ని పేర్కొంటూ సేంద్రీయ సాగుకు రుణాలకు దరఖాస్తు చేసుకుంటారు.",
    preProductionFunding: "కాలానుకూల రుణ విడుదల",
    duringProductionSupport: "పెరుగుట కాలంలో ఆర్థిక మద్దతు",
    postProductionAssistance: "కోత కాలంలో సహాయం",
    
    // Returns & Benefits
    returnsAndBenefits: "3. రిటర్న్స్ మరియు ప్రయోజనాలు",
    returnsDescription: "సాంప్రదాయిక వడ్డీకి బదులుగా, పెట్టుబడిదారులు వారు మద్దతు చేసిన రైతులు పెంచిన తాజా సేంద్రీయ ఉత్పత్తులపై విలువైన తగ్గింపులు పొందుతారు.",
    exactLoanRepayment: "మూల రుణ మొత్తం తిరిగి చెల్లింపు",
    organicProduceSupply: "తాజా సేంద్రీయ ఉత్పత్తుల అందుబాటు",
    percentageDiscounts: "గణనీయమైన ఉత్పత్తి తగ్గింపులు",
    
    // About page
    aboutAgroFina: "అగ్రోఫైనా గురించి",
    aboutDescription: "స్థిరమైన వ్యవసాయం కోసం ధనవంతులైన పెట్టుబడిదారులను అవసరంలో ఉన్న సేంద్రీయ రైతులతో కలిపే మా మిషన్ గురించి తెలుసుకోండి.",
    aboutUsTitle: "అగ్రోఫైనా గురించి",
    aboutUsIntro: "అగ్రోఫైనా అనేది ధనవంతులైన పె��్టుబడిదారులను అవసరంలో ఉన్న సేంద్రీయ రైతులతో ప్రత్యేకమైన రుణ-నుండి-తగ్గింపు మోడల్ ద్వారా కలిపే వినూత్న వేదిక, స్థిరమైన వ్యవసాయం మరియు ఆరోగ్యకరమైన రిటర్న్‌లను సృష్టిస్తుంది.",
    
    // Core Features
    inclusiveInvestment: "సమన్వితమైన రుణ పంపిణీ",
    inclusiveInvestmentDesc: "ధనవంతులైన పెట్టుబడిదారులు వ్యవసాయ పరిమాణంతో సంబంధం లేకుండా అవసరంలో ఉన్న రైతులకు రుణాలు అందిస్తారు, స్థిరమైన సేంద్రీయ వ్యవసాయ అభివృద్ధికి సమాన ప్రాప్యతను నిర్ధారిస్తారు.",
    phasedDisbursement: "కాలానుగుణ రుణ నిర్మాణం",
    phasedDisbursementDesc: "రుణాలు వ్యవసాయ కాలాలలో - నాటడానికి ముందు, పెరుగుట మరియు కోత దశలలో - పంపిణీ చేయబడతాయి, రైతులకు వారి పంట చక్రంలో స్థిరమైన ఆర్థిక మద్దతును నిర్ధారిస్తుంది.",
    healthyReturns: "సేంద్రీయ ఉత్పత్తి తగ్గింపులు",
    healthyReturnsDesc: "సాంప్రదాయిక వడ్డీ చెల్లింపులకు బదులుగా, పెట్టుబడిదారులు వారు మద్దతు చేసిన రైతులు పెంచిన తాజా సేంద్రీయ ఉత్పత్తులపై గణనీయమైన తగ్గింపులు పొందుతారు, ఆరోగ్యకరమైన జీవనాన్ని ప్రోత్సహిస్తుంది.",
    languageAccessibility: "అందుబాటులో ఉన్న వేదిక",
    languageAccessibilityDesc: "ఇంగ్లీష్ మరియు తెలుగు భాషలకు పూర్తి మద్దతు, మా రుణ-నుండి-తగ్గింపు వేదికను వివిధ ప్రాంతాలలోని పెట్టుబడిదా��ులు మరియు రైతులకు అందుబాటులో ఉంచుతుంది.",
    
    // Dashboard Features
    transparentDashboards: "పారదర్శక ట్రాకింగ్ వ్యవస్థలు",
    transparentDashboardsDesc: "రుణ స్థితి, పంట ప్రగతి మరియు సేంద్రీయ ఉత్పత్తి తగ్గింపు ప్రయోజనాలను ట్రాక్ చేయడానికి పెట్టుబడిదారులు మరియు రైతుల కోసం స్పష్టమైన డ్యాష్‌బోర్డ్‌లు.",
    farmersDashboard: "రైతుల డ్యాష్‌బోర్డ్",
    farmersDashboardDesc: "రుణ దరఖాస్తులు, తిరిగి చెల్లింపు స్థితి, పంట ప్రగతిని ట్రాక్ చేయండి మరియు మద్దతు చేసే పెట్టుబడిదారులతో కనెక్ట్ అవండి.",
    investorsDashboard: "పెట్టుబడిదారుల డ్యాష్‌బోర్డ్",
    investorsDashboardDesc: "మీ రైతు రుణాలను పర్యవేక్షించండి, పంట అభివృద్ధిని ట్రాక్ చేయండి మరియు మీ సేంద్రీయ ఉత్పత్తి తగ్గింపు ప్రయోజనాలను నిర్వహించండి.",
    
    // Mission
    ourMission: "మా మిషన్",
    missionStatement: "ధనవంతులైన పెట్టుబడిదారులు రుణాల ద్వారా అవసరంలో ఉన్న సేంద్రీయ రైతులను మద్దతు చేసే స్థిరమైన పర్యావరణ వ్యవస్థను సృష్టించడం, ప్రతిఫలంగా ఆరోగ్యకరమైన సేంద్రీయ ఉత్పత్తి తగ్గింపులు పొందడం, కమ్యూనిటీ వెల్‌నెస్ మరియు వ్యవసాయ శ్రేయస్సును పెంపొందించడం.",
    
    // Why Choose Us
    whyChooseUs: "మా వేదికను ఎందుకు ఎంచుకోవాలి?",
    fairDistribution: "న్యాయమైన రుణ ప్రాప్యత",
    responsibleGrowth: "స్థిరమైన వ్యవసాయం",
    realBenefits: "నిజమైన ఆరోగ్య ప్రయోజనాలు", 
    fullTransparency: "పూర్ణ పారదర్శకత",
    
    equalAccessForAllFarmers: "అన్ని నేపథ్యాలు మరియు వ్యవసాయ పరిమాణాల రైతులకు సమాన రుణ అవకాశాలు",
    phasedSustainableDevelopment: "స్థిరమైన సేంద్రీయ వ్యవసాయ పద్ధతులను ప్రోత్సహించే కాలానుగుణ ఆర్థిక మద్దతు",
    healthBenefitsOverCash: "సేంద్రీయ ఉత్పత్తి తగ్గింపులు నగదు రిటర్న్‌లకు బదులుగా నిజమైన ఆరోగ్య ప్రయోజనాలను అందిస్తాయి",
    completeVisibilityTrust: "రుణ నిబంధనలు, పంట ప్రగతి మరియు తగ్గింపు ప్రయోజన లెక్కల్లో పూర్ణ పారదర్శకత",
    
    realTimeCropMonitoring: "నిజ-సమయ పంట అభివృద్ధి ట్రాకింగ్",
    transactionHistory: "రుణ మరియు తిరిగి చెల్��ింపు చరిత్ర",
    profitTracking: "వ్యవసాయ లాభం మరియు దిగుబడి ట్రాకింగ్",
    investmentGrowthTracking: "రుణ పోర్ట్‌ఫోలియో మరియు రైతు మద్దతు ట్రాకింగ్",
    discountBenefitsOverview: "సేంద్రీయ ఉత్పత్తి తగ్గింపు ప్రయోజనాల అవలోకనం",
    portfolioAnalytics: "రైతు రుణ పోర్ట్‌ఫోలియో విశ్లేషణలు",
    
    // Contact Page
    contactUs: "మాతో సంప్రదించండి",
    contactDescription: "మా రుణ-నుండి-తగ్గింపు వేదిక గురించి మద్దతు, భాగస్వామ్య అవకాశాలు లేదా సాధారణ విచారణల కోసం మా బృందంతో సంప్రదించండి.",
    getInTouch: "మాతో సంప్రదించండి",
    contactUsDescription: "మా రుణ-నుండి-తగ్గింపు వేదిక గురించి మద్దతు, భాగస్వామ్య అవకాశాలు లేదా సాధార��� విచారణల కోసం మా బృందంతో సంప్రదించండి.",
    contactInfo: "సంప్రదింపు సమాచారం",
    ourOffice: "ఈ క్రింది పద్ధతుల్లో దేనిలోనైనా మాను సంప్రదించండి",
    companyAddress: "123 గ్రీన్ వ్యాలీ రోడ్\nఆర్గానిక్ డిస్ట్రిక్ట్, హైదరాబాద్\nతెలంగాణ, భారతదేశం - 500001",
    contactPhoneNumber: "+91 98765 43210",
    contactEmailAddress: "support@agrofina.com",
    sendMessage: "మాకు సందేశం పంపండి",
    contactForm: "దిగువ ఫారమ్ పూరించండి మరియు మేము వీలైనంత త్వరగా మీకు తిరిగి సందేశం పంపుతాము",
    name: "పేరు",
    message: "సందేశం",
    sending: "పంపుతున్నాము...",
    sendButton: "సందేశం పంపండి",
    successMessage: "ధన్యవాదాలు! మీ సందేశం విజయవంతంగా పంపబడింది.",
    errorMessage: "క్షమించండి, మీ సందేశం పంపడంలో లోపం జరిగింది. దయచేసి మళ్లీ ప్రయత్నించండి.",

    // How It Works Page
    howItWorksDetail: "మా రుణ-నుండి-తగ్గింపు మోడల్ ఎలా పని చేస్తుంది",
    howItWorksDetailDescription: "పెట్టుబడిదారులు రైతులకు రుణాలు ఎలా అందిస్తారు మరియు సాంప్రదాయిక వడ్డీకి బదులుగా సేంద్రీయ ఉత్పత్తి తగ్గింపులు ఎలా పొందుతారు అనే వివరణాత్మక వివరణ.",
    ourLoanToDiscountModel: "మా రుణ-నుండి-తగ్గింపు మోడల్",
    theCompleteProcess: "పూర్తి ప్రక్రియ",
    simpleThreeStepProcess: "ధనవంతులైన పెట్టుబడిదారులు, అవసరంలో ఉన్న రైతులకు ప్రయోజనం చేకూర్చే మరియు సేంద్రీయ వ్యవసాయాన్ని ప్రోత్సహించే సరళమైన 3-దశల ప్రక్రియ",
    wealthyInvestorProvidesLoan: "ధనవంతుడైన పెట్టుబడిదారుడు రుణం అందిస్తాడు",
    investorsProvidesLoanDesc: "పెట్టుబడిదారులు అవసరంలో ఉన్న రైతుల దరఖాస్తులను చూసి పంట రకం, భూమి పరిమాణం మరియు నిధుల అవసరాల ఆధారంగా రుణాలు అందిస్తారు",
    reviewFarmerApplications: "రైతుల రుణ దరఖాస్తులను సమీక్షించండి",
    selectFarmersToSupport: "మద్దతు చేయడానికి రైతులను ఎంచుకోండి",
    provideLoanWithoutInterest: "సాంప్రదాయిక వడ్డీ లేకుండా రుణం అందించండి",
    trackFarmerProgress: "రైతు మరియు పంట పురోగతిని ట్రాక్ చేయండి",
    farmerGrowsOrganicCrops: "రైతు సేంద్రీయ పంటలు పెంచుతాడు",
    farmerGrowsDesc: "అవసరంలో ఉన్న రైతులు రుణాన్ని ఉపయోగించి సే��ద్రీయ పంటలను సాగు చేస్తారు, నాణ్యత మరియు స్థిరమైన వ్యవసాయ పద్ధతులపై దృష్టి సారిస్తారు",
    purchaseOrganicSeeds: "సేంద్రీయ విత్తనాలు మరియు సామగ్రిని కొనండి",
    maintainOrganicStandards: "ధృవీకృత సేంద్రీయ ప్రమాణాలను నిర్వహించండి",
    regularCropUpdates: "రెగ్యులర్ పంట పురోగతి అప్‌డేట్‌లు",
    harvestQualityProduce: "నాణ్యమైన సేంద్రీయ ఉత్పత్తులను పండించండి",
    investorReceivesDiscounts: "పెట్టుబడిదారుడు సేంద్రీయ తగ్గింపులు పొందుతాడు",
    investorReceivesDesc: "సాంప్రదాయిక వడ్డీకి బదులుగా, పెట్టుబడిదారులు మద్దతు చేసిన రైతుల నుండి తాజా సేంద్రీయ ఉత్పత్తులపై గణనీయమైన తగ్గింపులు పొందుతారు",
    receiveLoanRepayment: "రుణ మూలధన తిరిగి చెల్లింపు పొందండి",
    getOrganicDiscounts: "సేంద్రీయ ఉత్పత్తి తగ్గింపులు పొందండి",
    accessPremiumVegetables: "ప్రీమియం సేంద్రీయ కూరగాయలకు ప్రాప్యత",
    healthBenefitsFamily: "కుటుంబానికి ఆరోగ్య ప్రయోజనాలు",
    whyThisModelWorks: "ఈ మోడల్ ఎందుకు పని చేస్తుంది",
    innovativeApproach: "మా వినూత్న విధానం స్థిరమైన సేంద్రీయ వ్యవసాయాన్ని ప్రోత్సహిస్తూ అన్ని వాటాదారులకు విలువను సృష్టిస్తుంది",
    forWealthyInvestors: "ధనవంతులైన పెట్టుబడిదారుల కోసం",
    supportNeedyFarmers: "మీ కుటుంబానికి అర్ధవంతమైన ఆరోగ్య ప్రయోజనాలు పొందుతూ అవసరంలో ఉన్న రైతులను మద్దతు చేయండి",
    socialImpact: "సామాజిక ప్రభావం",
    directlyHelpFamilies: "అవసరంలో ఉన్న వ్యవసాయ కుటుంబాలకు స్థిరమైన జీవనోపాధిని నిర���మించడంలో ప్రత్యక్షంగా సహాయం చేయండి",
    healthBenefits: "ఆరోగ్య ప్రయోజనాలు",
    accessPremiumOrganic: "మీ కుటుంబానికి తగ్గింపు రేట్లలో ప్రీమియం సేంద్రీయ ఉత్పత్తులకు ప్రాప్యత",
    realReturns: "నిజమైన రిటర్న్‌లు",
    valueEquivalentReturns: "సేంద్రీయ ఆహార ఆదా ద్వారా సాంప్రదాయిక రిటర్న్‌లకు సమానమైన విలువను పొందండి",
    transparency: "పారదర్శకత",
    trackSupportedFarmers: "మీరు మద్దతు చేసిన రైతులు మరియు పంట పురోగతిని నిజ-సమయంలో ట్రాక్ చేయండి",
    forNeedyFarmers: "అవసరంలో ఉన్న రైతుల కోసం",
    accessFundingWithoutEMI: "సంక్లిష్టమైన EMI నిర్మాణాలు లేకుండా నిధులను పొందండి మరియు స్థిరమైన సేంద్రీయ వ్యవసాయ వ్యాపారాలను నిర్మించండి",
    easyFundingAccess: "సులభ నిధుల ప్రాప్యత",
    getLoansSimply: "పంట రకం, భూమి పరిమాణం మరియు అవసరమైన మొత్తాన్ని పేర్కొంటూ సరళంగా రుణాలు పొందండి",
    flexibleRepayment: "అనువైన తిరిగి చెల్లింపు",
    noComplexEMI: "సంక్లిష్టమైన EMI షెడ్యూల్‌లు లేవు - నాణ్యమైన సేంద్రీయ పంటలు పెంచడంపై దృష్టి పెట్టండి",
    investorConnection: "పెట్టుబడిదారుల కనెక్షన్",
    buildRelationships: "మీ విజయం గురించి శ్రద్ధ వహించే మద్దతు చేసే పెట్టుబడిదారులతో సంబంధాలను నిర్మించండి",
    organicPremium: "సేంద్రీయ ప్రీమియం",
    betterPricesOrganic: "సేంద్రీయ ఉత్పత్తులకు మెరుగైన ధరలు పొందండి మరియు స్థిరమై��� వ్యవసాయ పద్ధతులను నిర్మించండి",
    howToGetStarted: "ఎలా ప్రారంభించాలి",
    simpleRegistrationProcess: "పెట్టుబడిదారులు మరియు రైతుల కోసం సరళమైన రిజిస్ట్రేషన్ ప్రక్రియ",
    forInvestors: "పెట్టుబడిదారుల కోసం",
    registerYourAccount: "మీ ఖాతాను నమోదు చేసుకోండి",
    provideDetailsInvestor: "సేంద్రీయ ఉత్పత్తుల కోసం PAN, వృత్తి మరియు డెలివరీ చిరునామాతో సహా మీ వివరాలను అందించండి",
    browseFarmerApplications: "రైతుల దరఖాస్తులను బ్రౌజ్ చేయండి",
    reviewLoanRequests: "వారి పంట ప్రణాళికలు మరియు నిధుల అవసరాలతో అవసరంలో ఉన్న రైతుల నుండి రుణ అభ్యర్థనలను సమీక్షించండి",
    provideLoans: "రుణాలు అందించండి",
    selectFarmersSupport: "మద్���తు చేయడానికి రైతులను ఎంచుకోండి మరియు మా సురక్షిత వేదిక ద్వారా రుణాలు అందించండి",
    enjoyOrganicBenefits: "సేంద్రీయ ప్రయోజనాలను ఆస్వాదించండి",
    receiveDiscountsTrack: "సేంద్రీయ ఉత్పత్తి తగ్గింపులు పొందండి మరియు మీరు మద్దతు చేసిన రైతుల నుండి పంట పురోగతిని ట్రాక్ చేయండి",
    startSupportingFarmers: "రైతులను మద్దతు చేయడం ప్రారంభించండి",
    forFarmers: "రైతుల కోసం",
    registerYourFarm: "మీ వ్యవసాయాన్ని నమోదు చేసుకోండి",
    provideDetailsFarmer: "ఆధార్, వ్యవసాయ ప్రాంతం, భూమి పరిమాణం మరియు వ్యవసాయ రకంతో సహా మీ వివరాలను అందించండి",
    submitLoanApplication: "రుణ దరఖాస్తును సమర్పించండి",
    specifyCropRequirements: "వ్యవసాయ ప్రణాళికతో మీ పంట రకం, భూమి ప్రాంతం మరియు అవసరమైన రుణ మొత్తాన్ని పేర్కొనండి",
    receiveFunding: "నిధులు పొందండి",
    getLoanApproval: "మా వేదిక ద్వారా మద్దతు చేసే పెట్టుబడిదారుల నుండి రుణ ఆమోదం మరియు నిధులు పొందండి",
    growAndSupply: "పెంచండి & సరఫరా చేయండి",
    cultivateOrganicCrops: "సేంద్రీయ పంటలను సాగు చేసి పెట్టుబడిదారుల తగ్గింపు ప్రయోజనాల కోసం తాజా ఉత్పత్తులను సరఫరా చేయండি",
    applyForFarmingLoan: "వ్యవసాయ రుణానికి దరఖాస్తు చేయండి",
    
    // Farmer Dashboard - Telugu translations for updated labels
    farmerDashboard: "రైతు డ్యాష్‌బోర్డ్",
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
    activeLoanAmount: "క్రియాశీల రుణ మొత్తం",
    totalLoansHistory: "మొత్తం రుణాల చరిత్ర",
    completedHarvests: "పూర్తయిన పంటలు",
    totalFarmingArea: "మొత్తం వ్యవసాయ ప్రాంతం",
    farmingExperience: "వ్యవసాయ అనుభవం",
    applyForNewLoan: "కొత్త రుణానికి దరఖాస్తు చేయండి",
    manageYourLoans: "మీ రుణాలను నిర్వహించండి",
    viewAll: "అన్నీ చూడండి",
    optimal: "అనుకూలమైన",
    good: "మంచి",
    excellent: "అద్భుతమైన",
    area: "ప్రాంతం",
    acres: "ఎకరాలు",
    growthProgress: "వృద్ధి పురోగతి",
    manageLoan: "రుణాన్ని నిర్వహించండి",
    seasonalCropLoan: "కాలానుగుణ పంట రుణం",
    approved: "ఆమోదించబడింది",
    disbursed: "విడుదల చేయబడింది",
    approvedAndDisbursed: "ఆమోదించబడింది & విడుదల చేయబడింది",
    organicVegetableFarming: "సేంద్రీయ కూరగాయల వ్యవసాయం",
    applicationDate: "దరఖాస్తు తేదీ",
    todaysFarmInsights: "నేటి వ్యవసాయ అంతర్దృష్టులు",
    soilMoisture: "మట్టి తేమ",
    optimalLevel: "అనుకూల స్థాయి",
    
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
    district: "జిల్లా",
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
    
    // Demo Credentials
    demoAccounts: "డెమో ఖాతాలు",
    testing: "టెస్టింగ్",
    useTheseDemo: "వేదికను అన్వేషించడానికి ఈ డెమో ఖాతాలను ఉపయోగించండి",
    totalInvestment: "మొత్తం పెట్టుబడి",
    land: "భూమి",
    useAccount: "ఖాతాను ఉపయోగించండి",
    email: "ఇమెయిల్",
    password: "పాస్‌వర్డ్",
    
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
    
    // Testimonials
    whatOurUsersAreSaying: "మా సమాజం ఏమి చెబుతోంది",
    testimonialsDescription: "రుణాలు అందించే పెట్టుబడిదారులు మరియు మద్దతు పొందే రైతుల నుండి నిజమైన అనుభవాలు",
    organicFarmer: "సే���ద్రీయ రైతు",
    investorFromMumbai: "ముంబై నుండి రుణ అందించేవారు",
    investorFromHyderabad: "హైదరాబాద్ నుండి మద్దతు చేసే పెట్టుబడిదారు",
    testimonial1Text: "అగ్రోఫైనా ద్వారా సేంద్రీయ రైతులకు రుణాలు అందించడం చాలా బహుమతిగా ఉంది. నగదు రిటర్న్స్‌కు బదులుగా, నా కుటుంబం ఇష్టపడే తాజా సేంద్రీయ ఉత్పత్తులపై అద్భుతమైన తగ్గింపులు పొందుతున్నాను. ఇది ఉద్దేశ్యంతో పెట్టుబడి పెట్టడం!",
    testimonial2Text: "అగ్రోఫైనా ద్వారా రుణం పొందడం నా వ్యవసాయాన్ని మార్చేసింది. సంక్లిష్టమైన EMI ఒత్తిడి లేదు - కేవలం నాణ్యమైన సేంద్రీయ పంటలు పెంచడంపై దృష్టి. నా మద్దతు చేసే పెట్టుబడిదారులు నా వ్యవసాయాన్ని సందర్శించి ఉత్పత్తి నాణ్యతను మెచ్చుకుంటారు!",
    testimonial3Text: "అవసరంలో ఉన్న రైతులను మద్దతు చేస్తూ ఆరోగ్యకరమైన సేంద్రీయ కూరగాయలు మరియు పండ్లపై గణనీయమైన తగ్గింపులు పొందడం నాకు ఇష్టం. నా పెట్టుబడి కుటుంబాలకు సహాయపడుతుంది మరియు నా స్వంత కుటుంబాన్ని ఆరోగ్యంగా ఉంచుతుంది. పర్ఫెక్ట్ విన్-విన్ మోడల్!",
    testimonial1Name: "రాజేష్ కుమార్",
    testimonial2Name: "ప్రియా రెడ్డి",
    testimonial3Name: "అమిత్ పటేల్",
    
    // Contact page additional terms
    phone: "ఫోన్",
    email: "ఇమెయిల్",
    address: "చిరునామా",
    workingHours: "పని గంటలు",
    hoursInfo: "సోమవారం - శుక్రవారం: ఉదయం 9:00 - సా��ంత్రం 6:00"
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
