import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'te';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translation object
const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    home: "Home",
    howItWorks: "How It Works",
    about: "About",
    contact: "Contact",
    investorLogin: "Investor Login",
    farmerLogin: "Farmer Login",
    
    // Hero Section
    sustainableInvestment: "🌱 Sustainable Investment Platform",
    investIn: "Invest in",
    organicFarming: " Organic Farming",
    harvestReturns: "Harvest Returns",
    heroDescription: "Connect investors with organic farmers through our innovative platform. Support sustainable agriculture while earning returns through fresh produce and loan repayments.",
    startInvesting: "Start Investing",
    applyForFunding: "Apply for Funding",
    
    // How It Works Section
    howAgroFinaWorks: "How AgroFina Works",
    howItWorksDescription: "Our platform bridges the gap between investors and organic farmers through a structured, seasonal investment model.",
    
    // Investment Process
    investmentProcess: "1. Investment Process",
    investmentProcessDescription: "Investors fund organic farming projects through our platform with structured seasonal investments.",
    threeSeasonalTerms: "Three seasonal terms yearly",
    preduringpost: "Pre, during, and post production",
    transparentTC: "Transparent T&C and returns",
    
    // Farmer Support
    farmerSupport: "2. Farmer Support",
    farmerSupportDescription: "Organic farmers receive funding in three phases to support their complete production cycle.",
    preProductionFunding: "Pre-production funding",
    duringProductionSupport: "During-production support",
    postProductionAssistance: "Post-production assistance",
    
    // Returns & Benefits
    returnsAndBenefits: "3. Returns & Benefits",
    returnsDescription: "Investors receive loan repayments plus organic produce discounts, creating mutual benefits.",
    exactLoanRepayment: "Exact loan amount repayment",
    organicProduceSupply: "Organic produce supply",
    percentageDiscounts: "Percentage discounts",
    
    // Why Choose Section
    whyChooseAgroFina: "Why Choose AgroFina?",
    whyChooseDescription: "Experience the benefits of sustainable investing with our innovative platform.",
    
    // Features
    secureInvestments: "Secure Investments",
    secureInvestmentsDesc: "Transparent terms and conditions with guaranteed returns through produce supply.",
    seasonalStructure: "Seasonal Structure",
    seasonalStructureDesc: "Three-season annual investment cycle aligned with farming seasons.",
    hundredPercentOrganic: "100% Organic",
    organicDesc: "Supporting only certified organic farming practices and sustainable agriculture.",
    mutualBenefits: "Mutual Benefits",
    mutualBenefitsDesc: "Investors get returns, farmers get funding, consumers get organic produce.",
    
    // Stats
    activeFarmers: "Active Farmers",
    investors: "Investors",
    fundsDispersed: "Funds Disbursed",
    repaymentRate: "Repayment Rate",
    
    // CTA Section
    readyToStart: "Ready to Get Started?",
    ctaDescription: "Join our platform today and be part of the sustainable agriculture revolution.",
    becomeInvestor: "Become an Investor",
    
    // Footer
    footerDescription: "Connecting investors and farmers for sustainable organic agriculture.",
    platform: "Platform",
    forInvestors: "For Investors",
    forFarmers: "For Farmers",
    company: "Company",
    aboutUs: "About Us",
    termsConditions: "Terms & Conditions",
    support: "Support",
    helpCenter: "Help Center",
    faq: "FAQ",
    privacyPolicy: "Privacy Policy",
    copyright: "© 2024 AgroFina. All rights reserved.",
    
    // About Page
    aboutAgroFina: "About AgroFina",
    aboutDescription: "Learn about our mission to connect investors with organic farmers for sustainable agriculture.",

    // Contact Page
    contactUs: "Contact Us",
    contactDescription: "Get in touch with our team for support, partnerships, or general inquiries.",

    // How It Works Page
    howItWorksDetail: "How It Works",
    howItWorksDetailDescription: "Detailed explanation of our three-season investment model, farmer funding process, and return structure.",

    // Farmer Dashboard
    farmerDashboard: "Farmer Dashboard",
    farmerDashboardDescription: "Apply for organic farming loans and manage your funding across three seasonal terms.",
    farmerRegistrationDescription: "Apply for organic farming loans and manage your funding across three seasonal terms.",
    farmerSuggestedAction: "This farmer interface will include loan applications, funding status tracking, repayment schedules, and seasonal term management. Continue prompting to build out this dashboard!",

    // Investor Dashboard
    investorDashboard: "Investor Dashboard",
    investorDashboardDescription: "Manage your organic farming investments and track returns",
    totalInvested: "Total Invested",
    currentValue: "Current Value",
    totalReturns: "Total Returns",
    activeInvestments: "Active Investments",
    organicProduceValue: "Organic Produce Value",
    myPortfolio: "My Portfolio",
    newOpportunities: "New Opportunities",
    organicBenefits: "Organic Benefits",
    termsAndConditions: "Terms & Conditions",
    cropType: "Crop Type",
    investmentAmount: "Investment Amount",
    currentSeason: "Current Season",
    expectedReturn: "Expected Return",
    progress: "Progress",
    viewDetails: "View Details",
    investmentDetails: "Investment Details",
    completeInformation: "Complete information about your investment in",
    investmentInformation: "Investment Information",
    amount: "Amount",
    duration: "Duration",
    startDate: "Start Date",
    farmerCropDetails: "Farmer & Crop Details",
    farmer: "Farmer",
    location: "Location",
    crop: "Crop",
    season: "Season",
    seasonalPaymentSchedule: "Seasonal Payment Schedule",
    preProductionPayment: "Pre-Production Payment",
    duringProductionPayment: "During-Production Payment",
    postProductionPayment: "Post-Production Payment",
    fundingNeeded: "Funding Needed",
    description: "Description",
    investNow: "Invest Now",
    yourOrganicProduceBenefits: "Your Organic Produce Benefits",
    enjoyDiscounted: "Enjoy discounted organic produce as part of your investment returns",
    monthlyQuota: "Monthly quota",
    usageThisMonth: "Usage this month",
    savingsThisMonth: "Savings this month",
    orderNow: "Order Now",
    importantInformation: "Important information about your investments and returns",
    investmentStructure: "Investment Structure",
    returnsRepayment: "Returns & Repayment",
    riskFactors: "Risk Factors",
    organicProduceBenefits: "Organic Produce Benefits",
    downloadCompleteTC: "Download Complete T&C Document",
    active: "Active",
    inactive: "Inactive",
    deadline: "Deadline",

    // Login & Registration
    login: "Login",
    register: "Register",
    dontHaveAccount: "Don't have an account?",
    alreadyHaveAccount: "Already have an account?",
    signUp: "Sign Up",
    signIn: "Sign In",

    // Common Fields
    fullName: "Full Name",
    emailAddress: "Email Address",
    phoneNumber: "Phone Number",
    password: "Password",
    confirmPassword: "Confirm Password",
    or: "OR",
    otpLogin: "Login with OTP",

    // Farmer Fields
    farmerLoginTitle: "Farmer Login",
    farmerRegistrationTitle: "Farmer Registration",
    aadhaarNumber: "Aadhaar Number",
    mobileNumber: "Mobile Number",
    emailOptional: "Email ID (Optional)",
    village: "Village",
    district: "District",
    state: "State",
    typeOfFarming: "Type of Farming",
    landSize: "Land Size (acres/hectares)",
    bankAccountDetails: "Bank Account Details",
    accountNumber: "Account Number",
    ifscCode: "IFSC Code",
    bankName: "Bank Name",
    photoIdUpload: "Photo ID Upload",
    uploadPhotoId: "Upload Aadhaar/PAN/Voter ID",
    farmPhotos: "Farm Photos (Optional)",
    uploadFarmPhotos: "Upload Farm/Geo-tagged Images",

    // Investor Fields
    investorLoginTitle: "Investor Login",
    investorRegistrationTitle: "Investor Registration",
    panNumber: "PAN Number",
    occupation: "Occupation/Profession",
    preferredLanguage: "Preferred Language",
    billingAddress: "Billing Address",
    address: "Address",
    city: "City",
    pincode: "Pincode",
    paymentMethod: "Payment Method",
    upiId: "UPI ID",

    // Form Actions
    submit: "Submit",
    cancel: "Cancel",
    upload: "Upload",
    choose: "Choose File",
    required: "Required",
    optional: "Optional",

    // Validation Messages
    fieldRequired: "This field is required",
    invalidEmail: "Please enter a valid email",
    invalidPhone: "Please enter a valid phone number",
    passwordTooShort: "Password must be at least 6 characters",
    passwordsDontMatch: "Passwords don't match",

    // Farming Types
    vegetables: "Vegetables",
    grains: "Grains",
    fruits: "Fruits",
    cotton: "Cotton",
    sugarcane: "Sugarcane",
    mixed: "Mixed Farming",

    // Additional translations for login forms
    personalInformation: "Personal Information",
    locationDetails: "Location Details",
    farmingDetails: "Farming Details",
    documentUpload: "Document Upload",
    accountSecurity: "Account Security",
    supportedFormats: "Supported formats",
    multipleFiles: "Multiple files supported",
    maxSize: "Max size",
    chooseFile: "Choose File",
    uploadDocument: "Upload Document",
    completeRegistrationDetails: "Complete registration details",
    selectFarmingType: "Select farming type",

    // Testimonials
    testimonials: "Testimonials",
    whatOurUsersAreSaying: "What Our Users Are Saying",
    testimonialsDescription: "Real experiences from farmers and investors",
    organicFarmer: "Organic Farmer",
    investorFromMumbai: "Investor from Mumbai",
    investorFromHyderabad: "Investor from Hyderabad",
    testimonial1Text: "I found AgroFina's investment process simple and rewarding. The transparency and regular updates give me confidence in my investments.",
    testimonial2Text: "This platform helped me grow my crops without worrying about unstable markets. The seasonal funding structure works perfectly for my farming cycle.",
    testimonial3Text: "I enjoy supporting farmers while getting healthy organic produce at a discount. It's a win-win situation for everyone involved.",
    testimonial1Name: "Rajesh Kumar",
    testimonial2Name: "Rajesh Varma",
    testimonial3Name: "Amit Patel",

    // About Page Content
    aboutUsTitle: "About Us",
    aboutUsIntro: "AgroFina is an inclusive circular investment platform connecting investors and organic farmers in a fair, transparent, and sustainable way.",
    inclusiveInvestment: "Inclusive Investment Model",
    inclusiveInvestmentDesc: "Unlike traditional agri-fintech models that focus only on high-yield farms, we pool all investments into a single common fund. This fund is fairly distributed to small, medium, and large-scale farmers, ensuring equal financial access for all.",
    phasedDisbursement: "Phased Disbursement System",
    phasedDisbursementDesc: "Our phased disbursement model releases funds in three stages per crop season — helping farmers use resources responsibly while maintaining steady growth.",
    healthyReturns: "Healthy Returns",
    healthyReturnsDesc: "Instead of cash-based interest, investors receive discounts on organic food, turning financial returns into real health benefits.",
    languageAccessibility: "Language Accessibility",
    languageAccessibilityDesc: "We are committed to language accessibility with full support for both English and Telugu, so everyone can benefit without barriers.",
    transparentDashboards: "Transparent Dashboards",
    transparentDashboardsDesc: "Our dual-dashboard system ensures transparency for all stakeholders.",
    farmersDashboard: "Farmers' Dashboard",
    farmersDashboardDesc: "View past transactions, profits, and live crop progress.",
    investorsDashboard: "Investors' Dashboard",
    investorsDashboardDesc: "Track the growth of your investment and the discounts you've earned.",
    ourMission: "Our Mission",
    missionStatement: "With AgroFina, farmers thrive, investors benefit, and communities enjoy better access to fresh, organic produce — creating a healthier and more equitable future.",
    whyChooseUs: "Why Choose AgroFina?",
    fairDistribution: "Fair Distribution",
    responsibleGrowth: "Responsible Growth",
    realBenefits: "Real Benefits",
    fullTransparency: "Full Transparency",
    realTimeCropMonitoring: "Real-time crop monitoring",
    transactionHistory: "Transaction history",
    profitTracking: "Profit tracking",
    investmentGrowthTracking: "Investment growth tracking",
    discountBenefitsOverview: "Discount benefits overview",
    portfolioAnalytics: "Portfolio analytics",
    equalAccessForAllFarmers: "Equal access for all farmers",
    phasedSustainableDevelopment: "Phased, sustainable development",
    healthBenefitsOverCash: "Health benefits over cash returns",
    completeVisibilityTrust: "Complete visibility and trust",

    // Form Placeholders
    johnDoePlaceholder: "John Doe",
    softwareEngineerPlaceholder: "Software Engineer",
    rajeshKumarPlaceholder: "Rajesh Kumar",
    villageNamePlaceholder: "Village name",
    districtNamePlaceholder: "District name",
    stateNamePlaceholder: "State name",
    accountNumberPlaceholder: "Account number",
    bankNamePlaceholder: "Bank name",

    // Contact Page
    getInTouch: "Get In Touch",
    contactUsDescription: "We'd love to hear from you. Send us a message and we'll respond as soon as possible.",
    ourOffice: "Our Office",
    contactInfo: "Contact Information",
    address: "Address",
    companyAddress: "AgroFina Private Limited\nPlot No. 112, Greenfield Business Park\nGachibowli, Hyderabad, Telangana – 500032, India",
    phone: "Phone",
    contactPhoneNumber: "+91 98765 43210",
    email: "Email",
    contactEmailAddress: "contact@agrofina.in",
    workingHours: "Working Hours",
    hoursInfo: "Open 24/7",
    contactForm: "Contact Form",
    sendMessage: "Send us a Message",
    name: "Name",
    namePlaceholder: "Your full name",
    emailPlaceholder: "your.email@example.com",
    phonePlaceholder: "+91 98765 43210",
    message: "Message",
    messagePlaceholder: "Tell us how we can help you...",
    sendButton: "Send Message",
    sending: "Sending...",
    successMessage: "Thank you! Your message has been sent successfully. We'll get back to you soon.",
    errorMessage: "Sorry, there was an error sending your message. Please try again.",
  },
  te: {
    // Navigation
    home: "హోమ్",
    howItWorks: "ఎలా పనిచేస్తుంది",
    about: "మా గురించి",
    contact: "సంప్రదించండి",
    investorLogin: "పె���్టుబడిదారుల లాగిన్",
    farmerLogin: "రైతుల లాగిన్",
    
    // Hero Section
    sustainableInvestment: "🌱 స్థిరమైన పెట్టుబడి ప్లాట్‌ఫామ్",
    investIn: "పెట్టుబడి పెట్టండి",
    organicFarming: " సేంద్రీయ వ్యవసాయంలో",
    harvestReturns: "లాభాలను కోయండి",
    heroDescription: "మా వినూత్న ప్లాట�����ఫామ్ ద్వారా పెట్టుబడిదారులను సే�����ద���రీయ రైతులతో అనుసంధానించండి. తాజా ఉత్పత్తులు మరియు రుణ తిరిగి చెల్లింపుల ద్వారా రాబందులను ���ొందు���ూ స్థిరమైన వ్యవసాయానికి మద్దతు ఇవ్వండి.",
    startInvesting: "పెట్టుబడి మొదలుపెట్టండి",
    applyForFunding: "నిధుల కోసం దరఖాస్తు చేయండి",
    
    // How It Works Section
    howAgroFinaWorks: "అగ్రో���ైనా ���లా పనిచేస్తుంది",
    howItWorksDescription: "మా ప్లాట్‌ఫామ్ నిర్మ��ణాత్మక, కాలానుగుణ పెట్టుబడి మోడల్ ద్వారా పెట్టుబడిదారులు మరియు సేంద్రీయ రైతుల మధ్య అంతరా��్ని తగ్గిస్తుంది.",
    
    // Investment Process
    investmentProcess: "1. పెట్టుబడి ప్రక���రియ",
    investmentProcessDescription: "పెట్టుబడిదారులు మా �����లాట్��ఫామ్ ద్వ���రా నిర్మాణాత్మక కాలానుగుణ పెట్టుబడులతో సేంద్రీయ వ్యవసాయ ప్రాజెక్టులకు నిధులు అం��ిస్��ారు.",
    threeSeasonalTerms: "సంవత్సరానికి మూడు కాలానుగుణ కాలాలు",
    preduringpost: "ముందు, సమయంలో మరియు ఉత్పత్తి తర్వాత",
    transparentTC: "పారదర్శక నిబంధనలు మరియు రాబందులు",
    
    // Farmer Support
    farmerSupport: "2. రైతుల మద్దతు",
    farmerSupportDescription: "సేంద్రీయ రైతు���ు వార�� పూర్తి ఉత్పత్తి చక్రానికి మద్దతు ఇవ్వడానికి మూడు దశలలో నిధులను పొందుతారు.",
    preProductionFunding: "ఉత్పత్తి పూర్వ నిధులు",
    duringProductionSupport: "ఉత్పత్తి సమయంలో మద్దతు",
    postProductionAssistance: "ఉత్పత్తి తర్వాత సహాయ���",
    
    // Returns & Benefits
    returnsAndBenefits: "3. రాబందులు మరియు ప్రయోజనాలు",
    returnsDescription: "పెట్టుబడిదారులు రుణ తిరిగి చెల్ల���ంప��లతో ప��ట�� సేంద్రీయ ��త్పత్తుల తగ్గి����ులను పొందుతారు, ప��స్��ర ప్రయోజనాల���ు సృష్టిస్తారు.",
    exactLoanRepayment: "ఖచ్చితమైన రుణ మొత్తం తిరిగి చెల్లింపు",
    organicProduceSupply: "సేంద్రీయ ఉత్పత్తుల సరఫరా",
    percentageDiscounts: "శాతం తగ్గింపులు",
    
    // Why Choose Section
    whyChooseAgroFina: "అగ్రోఫైనాను ఎందుకు ఎంచుకోవాలి?",
    whyChooseDescription: "మా వినూత్న ప్లాట్‌ఫామ్‌తో స్థిరమైన పెట్టుబడి యొక్క ప్రయోజనాలను అనుభవించండి.",
    
    // Features
    secureInvestments: "సురక్షిత పెట్టుబడుల���",
    secureInvestmentsDesc: "ఉత్పత్తుల సరఫరా ద్వారా హామీతో కూడిన రాబందులతో పారదర్శక నిబంధనలు మరియు షరతులు.",
    seasonalStructure: "కాల��ను��ుణ నిర్మాణం",
    seasonalStructureDesc: "వ్యవసాయ కాలాలతో సమలేఖనం చేయబడిన మూడు-కాలాల వార్షిక పెట్టుబడి చక్రం.",
    hundredPercentOrganic: "100% సేంద్రీయ",
    organicDesc: "కేవలం ధృవీకరించబడిన ��ేంద్రీయ వ్యవసాయ పద్ధతులు మరియు స్థిరమైన వ్యవసాయాన���కి మద్దతు ఇవ్వడం.",
    mutualBenefits: "పరస్పర ప్రయోజనాలు",
    mutualBenefitsDesc: "పెట్టుబడిదారులకు రాబందులు, రైతులకు నిధులు, వినియోగదారులకు సేంద్రీయ ఉత్పత్తులు లభిస్తాయి.",
    
    // Stats
    activeFarmers: "క్రియాశీల రైత���లు",
    investors: "పెట్టుబడిదారులు",
    fundsDispersed: "పంపిణీ చేయబడిన నిధులు",
    repaymentRate: "తిరిగి చెల్లింపు రేటు",
    
    // CTA Section
    readyToStart: "మొదలుపె������టడానికి సిద్ధంగా ఉన్నారా?",
    ctaDescription: "ఈ రోజే మా ప్లాట్‌ఫామ్‌లో చేరండి మరియు స్థిరమైన వ్యవసాయ విప్లవంలో భాగం అవ్వండి.",
    becomeInvestor: "పెట్టుబడిదారు అవ్వండి",
    
    // Footer
    footerDescription: "స్థిరమైన సేంద్రీయ వ్యవసాయం కోసం పెట్టుబడిదారులు మరియు రైతులను అనుసంధానించడం.",
    platform: "ప్లాట్‌ఫామ్",
    forInvestors: "పెట్టుబడిదారుల కోసం",
    forFarmers: "రైతుల కోసం",
    company: "కంపెనీ",
    aboutUs: "మా గురించి",
    termsConditions: "నిబంధనలు మర���యు ష��తులు",
    support: "మద్దతు",
    helpCenter: "సహాయ కేంద్రం",
    faq: "తరచుగా అడిగే ప్రశ్నలు",
    privacyPolicy: "గోప్యతా విధానం",
    copyright: "© 2024 అగ్రోఫైనా. అన్ని హక�����కులు రక్షించబడ్డాయి.",
    
    // About Page
    aboutAgroFina: "అగ్రోఫైనా గురించి",
    aboutDescription: "స్థిరమైన వ్యవసాయం కోసం పెట్టుబడి��ారులను సేంద్రీయ రైతులతో అనుసంధానించాలని మా లక���ష్యం గురించి తెలుసుకోండి.",

    // Contact Page
    contactUs: "మాతో సంప్రదించండి",
    contactDescription: "మద్దతు, భాగస్వామ్యాలు లేదా సాధారణ విచారణల కోసం మా బృందంతో సంప్రదించండి.",

    // How It Works Page
    howItWorksDetail: "ఎలా పని��ేస్తుంది",
    howItWorksDetailDescription: "మా మూడు-కాలాల పెట్టు��డి మోడ��్, రైతుల నిధుల ప్రక్రియ మరియు రాబంది నిర్మాణం యొక్క వివరణాత్మక వివరణ.",

    // Farmer Dashboard
    farmerDashboard: "రైతుల డాష్‌బోర్డ్",
    farmerRegistrationDescription: "సేంద్రీయ వ్యవసాయ రుణాలకు దరఖాస్తు చేయండి మరియు మూడు కాలానుగుణ కాలాలలో మీ నిధులను నిర్వహించండి.",
    farmerDashboardDescription: "సేంద్రీయ వ్యవసాయ రుణాలకు దరఖాస్తు చేయండ��� మరియు మూడు కాలానుగుణ కాలాలలో మీ నిధ��లను నిర్వహించండి.",
    farmerSuggestedAction: "ఈ రైతుల ఇంటర్‌ఫేస్‌లో రుణ దరఖాస్తులు, నిధుల స్థితి ట్రాకింగ్, తిరిగి చెల్లింపు షెడ్యూల్‌లు మరియు కా���ాన��గుణ కాలాల నిర్వహణ ఉంటుంది. ఈ డాష్‌బోర్డ్��ను రూప���ందించడానికి ప్రాంప్ట్ చేయడం కొనసాగించండి!",

    // Investor Dashboard
    investorDashboard: "పెట్టుబడిదారుల డాష్‌బోర్డ్",
    investorDashboardDescription: "మీ సేంద్రీయ వ్యవసాయ పెట్టుబడులను నిర్వహించండి మరియు రాబందులను ట్రాక్ చేయండి",
    totalInvested: "మొత్తం పెట్టుబడి",
    currentValue: "ప్ర��్తుత విలువ",
    totalReturns: "మొత్తం రాబందులు",
    activeInvestments: "క్రియాశీల పెట్టుబడులు",
    organicProduceValue: "సేంద్���ీయ ఉత్పత్తుల విలువ",
    myPortfolio: "నా పోర్ట్‌ఫోలియో",
    newOpportunities: "కొత్త అవకాశాలు",
    organicBenefits: "సేంద���రీయ ప్రయోజనాలు",
    termsAndConditions: "నిబంధనలు మ���ియు షరతులు",
    cropType: "పంట రకం",
    investmentAmount: "పెట్టుబడి మొత్తం",
    currentSeason: "ప్రస్తుత కాలం",
    expectedReturn: "అంచనా రాబంది",
    progress: "పురోగతి",
    viewDetails: "వివరాలు చూడండి",
    investmentDetails: "పెట్టుబడి వివరాలు",
    completeInformation: "���� పెట్టుబడిపై పూర్తి సమాచారం",
    investmentInformation: "పెట్టుబడి సమాచారం",
    amount: "మొత్తం",
    duration: "వ్యవధి",
    startDate: "ప్రార���భ తేదీ",
    farmerCropDetails: "రైతు మరియు పంట వివరాలు",
    farmer: "రైతు",
    location: "స్థానం",
    crop: "పంట",
    season: "కా���ం",
    seasonalPaymentSchedule: "కాలానుగుణ చెల్లింపు షెడ్యూల్",
    preProductionPayment: "ఉత్పత్తి పూర్వ ��ెల్లింపు",
    duringProductionPayment: "ఉత్పత్తి సమయంలో చెల్లింపు",
    postProductionPayment: "ఉత్ప��్తి తర్వాత చెల్లింపు",
    fundingNeeded: "అవసరమై�� నిధులు",
    description: "వర్ణన",
    investNow: "ఇప్పుడే పెట్టుబడి పెట్టండి",
    yourOrganicProduceBenefits: "మీ సేంద్రీయ ఉత్పత్తుల ప్రయోజనాలు",
    enjoyDiscounted: "మీ పెట్టుబడి ర���బ���దుల భాగంగా రాయితీ ధరలతో సేంద్రీయ ఉత్పత్తులను ఆస్వాదించండి",
    monthlyQuota: "నెలవారీ కోటా",
    usageThisMonth: "ఈ నెల వినియోగం",
    savingsThisMonth: "ఈ నెల ఆదా",
    orderNow: "ఇప్పుడే ఆర్డర్ చేయండి",
    importantInformation: "మీ పెట్టుబడులు మరియు రాబందుల గురించి ముఖ్యమైన సమాచారం",
    investmentStructure: "పెట్టుబడి నిర్మాణం",
    returnsRepayment: "రాబందులు మరియు తిరిగి చెల్లింపు",
    riskFactors: "���్రమాద కారకాలు",
    organicProduceBenefits: "సేంద్రీయ ఉత్పత్తుల ప్రయోజనాల���",
    downloadCompleteTC: "పూర్తి T&C డాక్యుమెంట్ డౌన్‌లోడ్ చేయండి",
    active: "క్రియాశీల",
    inactive: "నిష్క్రియ",
    deadline: "గడువు",

    // Login & Registration
    login: "లాగిన్",
    register: "రిజిస్టర్",
    dontHaveAccount: "ఖాతా లేదా?",
    alreadyHaveAccount: "ఇప్పటికే ఖాతా ఉందా?",
    signUp: "సైన్ అప్",
    signIn: "���ైన్ ఇన్",

    // Common Fields
    fullName: "పూర్తి పేరు",
    emailAddress: "ఇమెయిల్ చిరునామా",
    phoneNumber: "ఫోన్ న���బర్",
    password: "పాస్‌వర్డ��",
    confirmPassword: "పా��్‌వర్డ్ నిర్ధారించండి",
    or: "లేదా",
    otpLogin: "OTP తో లాగిన్",

    // Farmer Fields
    farmerLoginTitle: "రైతుల లాగిన్",
    farmerRegistrationTitle: "రైతుల ర���జిస్ట్రేషన్",
    aadhaarNumber: "ఆధార్ నంబర్",
    mobileNumber: "మొబ���ల్ నంబర్",
    emailOptional: "ఇమెయిల్ ID (ఐచ్ఛికం)",
    village: "గ్రామ���",
    district: "జిల్లా",
    state: "రాష్ట్రం",
    typeOfFarming: "వ్యవసాయ ��కం",
    landSize: "భూమి పరిమాణం (ఎకరాలు/హె��్టార్లు)",
    bankAccountDetails: "బ్యాంక్ ఖాతా వివరాలు",
    accountNumber: "ఖాతా నంబర్",
    ifscCode: "IFSC కోడ్",
    bankName: "బ్యాంక్ పేరు",
    photoIdUpload: "ఫోటో ID అప్‌లోడ్",
    uploadPhotoId: "ఆధార్/PAN/ఓటర్ ID అప్‌లోడ్ చేయండి",
    farmPhotos: "వ్యవసాయ భూమి ఫోటోలు (ఐచ్ఛికం)",
    uploadFarmPhotos: "వ్యవ���ాయ భూమి/జియో-ట్యాగ్ చేసిన చిత్రాలను అప్‌లోడ్ చేయండి",

    // Investor Fields
    investorLoginTitle: "పెట్టుబ��ిదారుల లాగిన్",
    investorRegistrationTitle: "పెట్టుబడిదారుల రిజిస్ట్రేషన్",
    panNumber: "PAN నంబర్",
    occupation: "వృత్తి/పేజీ",
    preferredLanguage: "ప్రాధాన్య భాష",
    billingAddress: "బిల్లింగ్ చిరునామా",
    address: "చిరునామా",
    city: "నగరం",
    pincode: "పిన్‌కోడ్",
    paymentMethod: "చ���ల్లింపు పద్ధతి",
    upiId: "UPI ID",

    // Form Actions
    submit: "సమర్పించండి",
    cancel: "రద్దు చేయండి",
    upload: "అప్‌లోడ్",
    choose: "���ైల్ ఎంచుకోం���ి",
    required: "అవసరం",
    optional: "ఐచ్ఛికం",

    // Validation Messages
    fieldRequired: "ఈ ఫీల్డ్ అవసరం",
    invalidEmail: "దయచేసి చెల్లుబాటు అయ్యే ఇమెయిల్ నమోదు చేయండి",
    invalidPhone: "దయచేసి చెల్లుబాటు అయ్యే ఫోన్ నంబర్ న���ోదు చేయండి",
    passwordTooShort: "పాస్‌వర్డ్ కనీసం 6 అక్షరాలు ఉండాలి",
    passwordsDontMatch: "పాస్‌వర్డ్‌లు సరిపోలలేదు",

    // Farming Types
    vegetables: "కూరగాయలు",
    grains: "��ాన్యాలు",
    fruits: "పండ్లు",
    cotton: "పత్తి",
    sugarcane: "చెరకు",
    mixed: "మిశ్రమ వ్యవసాయం",

    // Additional translations for login forms
    personalInformation: "వ్యక్తిగత సమాచారం",
    locationDetails: "స్థాన వివరాలు",
    farmingDetails: "వ్యవసాయ వివరాలు",
    documentUpload: "పత్రం అప్‌��ోడ్",
    accountSecurity: "ఖాతా భద్రత",
    supportedFormats: "మద్దతు ఉన్న ఫార్మాట్‌లు",
    multipleFiles: "అనేక ఫైళ్లకు మద్దతు",
    maxSize: "గరిష్ట పరిమాణ��",
    chooseFile: "ఫైల్ ఎంచుకోండి",
    uploadDocument: "పత్రం అప్‌లోడ్ చేయండి",
    completeRegistrationDetails: "రిజిస్ట్ర���షన్ వివరాలను పూర్తి చేయండి",
    selectFarmingType: "వ్యవసాయ రకాన్ని ఎంచుకోండి",

    // Testimonials
    testimonials: "సాక్ష్యాలు",
    whatOurUsersAreSaying: "మా విన���యోగదారులు ఏమి చెబుతున్నారు",
    testimonialsDescription: "రైతులు మ��ియు పెట్టుబడిదారుల నిజమైన అనుభవాలు",
    organicFarmer: "సేంద్రీయ రైతు",
    investorFromMumbai: "ముంబైకి చెందిన పెట్టుబడిదారుడు",
    investorFromHyderabad: "హైదరాబాదుకు చెందిన పెట్టుబడ��దారుడు",
    testimonial1Text: "అగ్రోఫైనా యొక్క పెట్టుబడి ప్రక్రియ చాలా సరళంగా మరియు లాభదాయకంగా ఉంది. పారదర్శకత మరియు క్రమ��� తప్పకుండా వచ్చే నవీకరణలు నా పెట్టుబడులపై నాకు విశ్వాసం కలిగిస్తున్నాయి.",
    testimonial2Text: "అస్థిర మార్కెట్ల గురించి చింతించకుండా నా పంటలను పెంచడంలో ఈ ప్లాట్‌ఫామ్ నాకు సహాయపడింది. కాలానుగుణ నిధుల నిర్మాణం నా వ్యవసాయ చక్రానికి సంపూర్ణంగా సరిపోతుం��ి.",
    testimonial3Text: "రాయితీ ధరలతో ఆరోగ్యకరమైన సేంద్రీయ ఉత్పత్తులను పొందుతూ రైతులకు మద్దతు ఇవ్వడంలో నేను ఆనందిస్తున్నాను. ఇది అందరికీ లాభదాయకమైన పరిస్థిత��.",
    testimonial1Name: "రాజేష్ కుమార్",
    testimonial2Name: "రాజేష్ వర్మ",
    testimonial3Name: "అమిత్ పటేల్",

    // About Page Content
    aboutUsTitle: "మా గురించి",
    aboutUsIntro: "అగ్రోఫైనా అనేది న్యాయమైన, పారదర్శక మరియు స్థిరమైన మార్గంలో పెట్టుబడిదారులను మరియు సేంద్రీయ రైతులను అనుసంధానించే సమగ్ర వృత్తాకార పెట్టుబడి ప్లాట్‌ఫామ్.",
    inclusiveInvestment: "సమగ్ర పెట్టుబడి మోడల్",
    inclusiveInvestmentDesc: "అధిక దిగుబడి వ్యవసాయ క్షేత���రాలపై మాత్రమే దృష్టి సారించే సాంప్రదాయ వ్యవసాయ-ఫిన్‌టెక్ మోడల్‌లకు విరుద్ధంగా, మేము అన్ని పెట్టుబడులను ఒకే సాధారణ ఫండ్‌లో కలుపుతాము. ఈ ఫండ్ చిన్న, మధ్యస్థ మరియ�� పెద్ద-స���థాయి రైతులకు న్యాయంగా పంపిణీ చేయబడుతుంది, అందరికీ సమాన ఆర్థిక ప్రాప్యతను నిర్ధారిస్తుంది.",
    phasedDisbursement: "దశల వారీ పంపిణీ వ్యవస్థ",
    phasedDisbursementDesc: "మా దశల వారీ పంపిణీ మోడల్ ప్రతి పంట కాలంలో మూడు దశలలో నిధులను విడుదల చేస్తుంది — రైతులు వనరులను బాధ్యతాయుతంగా ఉపయోగించుకోవడంలో మరియు స్థిరమైన వృద్ధిని కొనసాగించడంలో సహాయపడుతుంది.",
    healthyReturns: "ఆరోగ్య���రమైన రాబందులు",
    healthyReturnsDesc: "నగదు-ఆధారిత వడ్డీకి బదులుగా, పెట్టుబడిదారులు సేంద్రీయ ఆహారంపై తగ్గింపులను పొందుతారు, ఆర్థిక రాబందులను నిజమైన ఆరోగ్య ప్రయోజనాల��గా మార��స్తారు.",
    languageAccessibility: "భాషా అందుబాటు",
    languageAccessibilityDesc: "ఇంగ్లీష్ మరియు తెలుగు రెండింటికీ పూర్తి మద్దతు���ో భాషా అందుబాటుకు మేము కట్టుబడి ఉన్నాము, తద్వారా అందరూ అడ్డంకులు లేకుండా ప్���యోజనం పొందవచ్చు.",
    transparentDashboards: "పారదర్శక డాష్‌బోర్డ్‌లు",
    transparentDashboardsDesc: "మా ద్వంద్వ-డాష్‌బోర్డ్ వ్యవస్థ అన్���ి వాటాదారులకు పారదర్శకతను నిర్ధారిస్తుంది.",
    farmersDashboard: "రైతుల డాష్‌బోర్డ్",
    farmersDashboardDesc: "గత లావాదేవీలు, లాభాలు మరియు ప్రత్యక్ష పంట పురోగతిని చూడండి.",
    investorsDashboard: "పెట్టుబడిదారుల డాష్‌బోర్డ్",
    investorsDashboardDesc: "మీ పెట్టుబడి వృద్ధ��� మరి���ు మీరు సంపాదించిన తగ్గింపులను ట్రాక్ చేయండి.",
    ourMission: "మా లక్ష్యం",
    missionStatement: "అగ్రోఫైనాతో, రైతులు అభివృద్ధి చెందుతారు, పెట్టుబడిదారులు ప్రయోజనం పొందుతారు మరియు సంఘాలు తాజ��, సేంద్రీయ ఉత్పత్తులకు మెరుగైన ప్రాప్యతను ఆస్వాదిస్తాయి — ఆరోగ్యకరమైన మరియు మరింత సమానమైన భవిష్యత్తును సృష్టిస్తుంది.",
    whyChooseUs: "మమ్మల్ని ఎందుకు ఎంచుకోవాలి?",
    fairDistribution: "న్యాయమైన పంపిణీ",
    responsibleGrowth: "బాధ్యతాయుత వృద్ధి",
    realBenefits: "నిజమైన ప్రయోజనాలు",
    fullTransparency: "పూర్తి పారదర్శకత",
    realTimeCropMonitoring: "రియల్ టైమ్ పంట పర్యవేక్షణ",
    transactionHistory: "లావాదేవీల ��రిత్ర",
    profitTracking: "లాభ ట్రాకింగ్",
    investmentGrowthTracking: "పెట్టుబడి వృద్ధి ట్రాకింగ్",
    discountBenefitsOverview: "తగ్గింపు ప్రయోజనాల అవలోకనం",
    portfolioAnalytics: "పోర్ట్‌ఫోలియో విశ్లేషణలు",
    equalAccessForAllFarmers: "అన్ని రైతులకు సమాన ప్రాప్యత",
    phasedSustainableDevelopment: "దశల వారీ, స్థిరమైన అభివృద్ధి",
    healthBenefitsOverCash: "నగదుకు బదులుగా ఆరోగ్య ప��రయోజనాలు",
    completeVisibilityTrust: "పూర్తి దృశ్యత మరియు నమ్మకం",

    // Form Placeholders - Keep in English
    johnDoePlaceholder: "Ramesh",
    softwareEngineerPlaceholder: "Software Engineer",
    rajeshKumarPlaceholder: "Ramesh",
    villageNamePlaceholder: "Village name",
    districtNamePlaceholder: "District name",
    stateNamePlaceholder: "State name",
    accountNumberPlaceholder: "Account number",
    bankNamePlaceholder: "Bank name",

    // Contact Page
    getInTouch: "సంప్రదించండి",
    contactUsDescription: "మీ నుండి వినడానికి మేము ఆసక్తిగా ఉన్నాము. మాకు సందేశం పంపండి మరియు మేము వీలైనంత త్వరగా స్పందిస్తాము.",
    ourOffice: "మా కార్యాలయం",
    contactInfo: "సంప్రదింపు సమాచారం",
    address: "చిరునామా",
    companyAddress: "అగ్రోఫైనా ప్రైవేట్ లిమిటెడ్\nప్లాట్ నంబర్. 112, గ్రీన్‌ఫీల్డ్ బిజినెస్ పార్క్\nగచ్చిబౌలి, హైదరాబాద్, తెలంగాణ – 500032, భారతదేశం",
    phone: "ఫోన్",
    contactPhoneNumber: "+91 98765 43210",
    email: "ఇమెయిల్",
    contactEmailAddress: "contact@agrofina.in",
    workingHours: "పని సమయాలు",
    hoursInfo: "24/7 తెరిచి ఉంటుంది",
    contactForm: "సంప్రదింపు ఫారం",
    sendMessage: "మాకు సందేశం పంపండి",
    name: "పేరు",
    namePlaceholder: "Ramesh",
    emailPlaceholder: "your.email@example.com",
    phonePlaceholder: "+91 98765 43210",
    message: "సందేశం",
    messagePlaceholder: "Tell us how we can help you...",
    sendButton: "సందేశం పంపండి",
    sending: "పంపుతున్నాము...",
    successMessage: "ధన్యవాదాలు! మీ సందేశం విజయవంతంగా పంపబడింది. మేము త్వరలో మిమ్మల్ని సంప్రదిస్తాము.",
    errorMessage: "క్షమించండి, మీ సందేశాన్ని పంపడంలో లోపం ఉంది. దయచేసి మళ్లీ ప్రయత్నించండి.",

    // Dashboard Navigation
    currentInvestments: "Current Investments",
    investmentProgress: "Investment Progress",
    previousTransactions: "Previous Transactions",
    currentCropStatus: "Current Crop Status",
    loanManagement: "Loan Management",
    previousLoans: "Previous Loans",
    previousCrops: "Previous Crops",
    logout: "Logout",

    // Dashboard Content
    welcomeBack: "Welcome back",
    totalInvestment: "Total Investment",
    portfolioValue: "Portfolio Value",
    totalReturns: "Total Returns",
    activeInvestments: "Active Investments",
    recentActivity: "Recent Activity",
    quickActions: "Quick Actions",
    viewAll: "View All",
    currentLoan: "Current Loan",
    activeCrops: "Active Crops",
    loanApplications: "Loan Applications",
    applyForLoan: "Apply for Loan",
    cropHealth: "Crop Health",
    harvestSchedule: "Harvest Schedule",

    // Status
    excellent: "Excellent",
    good: "Good",
    fair: "Fair",
    poor: "Poor",
    active: "Active",
    completed: "Completed",
    pending: "Pending",
    approved: "Approved",
    rejected: "Rejected"
  },
  te: {
    // Navigation
    home: "హోమ్",
    howItWorks: "ఎలా పన��చేస్తుంది",
    about: "మా గురించి",
    contact: "సంప్రదించండి",
    investorLogin: "పెట్టుబడిదారుల లాగ���న్",
    farmerLogin: "రైతుల లాగిన్",

    // Hero Section
    sustainableInvestment: "🌱 స్థిరమ��న పెట్టుబడి ప్లాట్‌ఫామ్",
    investIn: "పెట్టుబడి పెట్టండి",
    organicFarming: " సేంద్రీయ వ్యవసాయంలో",
    harvestReturns: "లాభాలను కోయండి",
    heroDescription: "మా వినూత్న ప్లాట్‌ఫామ్ ద్వారా పెట్టుబడిదారులను సేంద్రీయ రైతులతో అనుసంధానించండి. తాజా ఉత్పత్తులు మరియు రుణ తిరిగి చెల్లింపుల ద్వారా రాబందులను పొందుతూ స్థిరమైన వ్యవసాయానికి మ���్దతు ఇవ్వండి.",
    startInvesting: "పెట్టుబడి మొదలుపెట్టండి",
    applyForFunding: "నిధుల కోసం దరఖాస్తు చేయండి",

    // How It Works Section
    howAgroFinaWorks: "అగ్రోఫైనా ఎలా పనిచేస్తుంది",
    howItWorksDescription: "మా ప్లాట్‌ఫామ్ నిర్మాణాత్మక, కాలానుగుణ పెట్టుబడి మోడల్ ద్వారా పెట్టుబడిదారులు మరియు సేంద్రీయ రైతుల మధ్య అంతరాన్ని తగ్గిస్తుంది.",

    // Investment Process
    investmentProcess: "1. పెట్టుబడి ప్రక్రియ",
    investmentProcessDescription: "పెట్టుబడిదారులు మా ప్లాట్‌ఫామ్ ద్వారా నిర్మాణాత్మక కాలానుగుణ పెట్టుబడులతో సేంద్రీయ వ్యవసాయ ప్రాజెక్టులకు నిధులు అందిస్తారు.",
    threeSeasonalTerms: "సంవత్సరానికి మూడు కాలానుగుణ కాలాలు",
    preduringpost: "ముందు, సమయంలో మరియు ఉత్పత్తి తర్వాత",
    transparentTC: "పారదర్శక నిబంధనలు మరియు రాబందులు",

    // Farmer Support
    farmerSupport: "2. రైతుల మద్దతు",
    farmerSupportDescription: "సేంద్రీయ రైతులు వారి పూర్తి ఉత్పత్తి చక్రానికి మద్దతు ఇవ్వడానికి మూడు దశలలో నిధులను పొందుతారు.",
    preProductionFunding: "ఉత్పత్తి పూర్వ నిధులు",
    duringProductionSupport: "ఉత్పత్తి సమయంలో మద్దతు",
    postProductionAssistance: "ఉత్పత్తి తర్వాత సహాయం",

    // Returns & Benefits
    returnsAndBenefits: "3. రాబందులు మరియు ప్రయోజనాలు",
    returnsDescription: "పెట్టుబడిదారులు రుణ తిరిగి చెల్లింపులతో పాటు సేంద్రీయ ఉత్పత్తుల తగ్గింపులను పొందుతారు, పరస్పర ప్రయోజనాలను సృష్టిస్తారు.",
    exactLoanRepayment: "ఖచ్చితమైన రుణ మొత్తం తిరిగి చెల్లింపు",
    organicProduceSupply: "సేంద్రీయ ఉత్పత్తుల సరఫరా",
    percentageDiscounts: "శాతం తగ్గింప���లు",

    // Why Choose Section
    whyChooseAgroFina: "అగ్రోఫైనాను ఎందుకు ఎంచుకోవాలి?",
    whyChooseDescription: "మా వినూత్న ప్లాట్‌ఫామ్‌తో స్థిరమైన పెట్టుబడి యొక్క ప్రయోజనాలను అనుభవించండి.",

    // Features
    secureInvestments: "సురక్షిత పెట్టుబడులు",
    secureInvestmentsDesc: "ఉత్పత్తుల సరఫరా ద్వారా హామీతో కూడిన రాబందులతో పారదర్శక నిబంధనలు మరియు షరతులు.",
    seasonalStructure: "కాలానుగుణ నిర్మాణం",
    seasonalStructureDesc: "వ్యవసాయ కాలాలతో సమలేఖనం చేయబడిన మూ��ు-కాలాల వార్షిక పెట్టుబడి చక్రం.",
    hundredPercentOrganic: "100% సేంద్రీయ",
    organicDesc: "కేవలం ధృవీకరించబడిన సేంద్రీయ వ్యవసాయ పద్ధతులు మరియు స్థిరమైన వ్యవసాయానికి మద్దతు ఇవ్వడం.",
    mutualBenefits: "పరస్పర ప్రయోజనాలు",
    mutualBenefitsDesc: "పెట్టుబడిదారులకు రాబందులు, రైతులకు నిధులు, వినియోగదారులకు సేంద్రీయ ఉత్పత్తులు లభిస్తాయి.",

    // Stats
    activeFarmers: "క్రియాశీల రైతులు",
    investors: "పెట్టుబడిదారులు",
    fundsDispersed: "పంపిణీ చేయబడిన నిధులు",
    repaymentRate: "తిరిగి చెల్లింపు రేటు",

    // CTA Section
    readyToStart: "మొదలుపెట్టడానికి సిద్ధంగా ఉన్నారా?",
    ctaDescription: "ఈ రోజే మా ప్లాట్‌ఫామ్‌లో చేరం��ి మరియు స్థిరమైన వ్యవసాయ విప్లవంలో భాగం అవ్వండి.",
    becomeInvestor: "పెట్టుబడిదారు అవ్వండి",

    // Footer
    footerDescription: "స్థిరమైన సేంద్రీయ వ్యవసాయం కోసం పెట్టుబడి��ారులు మరియు రైతులను అనుసంధానించడం.",
    platform: "ప్లాట్‌ఫామ్",
    forInvestors: "పెట్టుబడిదారుల కోసం",
    forFarmers: "రైతుల కోసం",
    company: "కంపెనీ",
    aboutUs: "మా గురించి",
    termsConditions: "నిబంధనలు మరియు షరతులు",
    support: "మద్దతు",
    helpCenter: "సహాయ కేంద్రం",
    faq: "తరచుగా అడిగే ప్రశ్నలు",
    privacyPolicy: "గోప్యతా విధానం",
    copyright: "© 2024 అగ్రోఫైనా. అన్ని హక్కులు రక్షించబడ్డాయి.",

    // About Page
    aboutAgroFina: "అగ్రోఫైనా గురించి",
    aboutDescription: "స్థిరమైన వ్యవసాయం కోసం పెట్టుబడిదారులను సేంద్రీయ రైతులతో అనుసంధానించాలని మా లక్ష్యం గురించి తెలుసుకోండి.",

    // Contact Page
    contactUs: "మాతో సంప్రదించండి",
    contactDescription: "మద్దతు, భాగస్వామ్యాలు లేదా సాధారణ విచారణల కోసం ���ా బృందంతో సంప్రదించండి.",

    // How It Works Page
    howItWorksDetail: "ఎలా పనిచేస్తుంది",
    howItWorksDetailDescription: "మా మూడు-కాలాల పెట్టుబడి మోడల్, రైతుల నిధుల ప్రక్రియ మరియు రాబంది నిర్మాణం యొక్క వివరణాత్మక వివరణ.",

    // Farmer Dashboard
    farmerDashboard: "రైతుల డాష్‌బోర్డ్",
    farmerRegistrationDescription: "సేంద్రీయ వ్యవసాయ రుణాలకు దరఖాస్తు చేయండి మరియు మూడు కాలానుగుణ కాలాలలో మ�� నిధులను నిర్వహించండి.",
    farmerDashboardDescription: "సేంద్రీయ వ్యవసాయ రుణాలకు దరఖాస్తు చేయండి మరియు మూడు కాలానుగుణ కాలాలలో మీ నిధులను నిర్వహించండి.",
    farmerSuggestedAction: "ఈ రైతుల ఇంటర్‌ఫేస్‌లో రుణ దరఖాస్తులు, నిధుల స్థితి ��్రాకింగ్, తిరిగి చెల్లింపు షెడ్యూల్‌లు మరియు కాలానుగుణ కాలాల నిర్వహణ ఉంటుంది. ఈ డాష్‌బోర్డ్‌ను రూపొందించడానికి ప్రాంప్ట్ చేయడం కొనసాగించండి!",

    // Investor Dashboard
    investorDashboard: "పెట్టుబడిదారుల డాష్‌బోర్డ్",
    investorDashboardDescription: "మీ సేంద్రీయ వ్యవసాయ పెట్టుబడులను నిర్వహించండి మరియు రాబందులను ట్రాక్ చేయండి",
    totalInvested: "మొత్త�� పెట్టుబడి",
    currentValue: "ప్రస్తుత విలువ",
    totalReturns: "మొత్తం రాబందులు",
    activeInvestments: "క్రియాశీల పెట్టుబడులు",
    organicProduceValue: "సేంద్రీయ ఉత్పత్తుల విలువ",
    myPortfolio: "నా పోర్ట్‌ఫోలియో",
    newOpportunities: "కొత్త అవకాశాలు",
    organicBenefits: "సే��ద్రీయ ప్రయోజనాలు",
    termsAndConditions: "నిబంధనలు మరియు షరతులు",
    cropType: "పంట రకం",
    investmentAmount: "పెట్టుబడి మొత్తం",
    currentSeason: "ప్రస్తుత కాలం",
    expectedReturn: "అంచనా రాబంది",
    progress: "పురోగతి",
    viewDetails: "వివరాలు చూడండి",
    investmentDetails: "పెట్టుబడి వివరాలు",
    completeInformation: "మీ పెట్టుబడిపై పూర్తి సమాచారం",
    investmentInformation: "పెట్టుబడి సమాచారం",
    amount: "మొత్తం",
    duration: "వ్యవధి",
    startDate: "ప్రారంభ తేదీ",
    farmerCropDetails: "రైతు మరియు పంట వివరాలు",
    farmer: "రైతు",
    location: "స్థానం",
    crop: "పంట",
    season: "కాలం",
    seasonalPaymentSchedule: "కాలానుగుణ చెల్���ింపు షెడ్యూల్",
    preProductionPayment: "ఉత్పత్తి పూర్వ చెల్లింపు",
    duringProductionPayment: "ఉత్పత్తి సమయంలో చెల్లింపు",
    postProductionPayment: "ఉత్పత్తి తర్వాత చెల్లింపు",
    fundingNeeded: "అవసరమైన నిధులు",
    description: "వర్ణన",
    investNow: "ఇప్పుడే పెట్టుబడి పెట్టండి",
    yourOrganicProduceBenefits: "మీ సేంద్రీయ ఉత్పత్తుల ప్రయోజనాలు",
    enjoyDiscounted: "మీ పెట్టుబడి రాబందుల భాగంగా రాయితీ ధరలతో సేంద్రీయ ఉత్పత్తులను ఆస్వాదించండి",
    monthlyQuota: "నెలవారీ కోటా",
    usageThisMonth: "ఈ నెల వినియోగం",
    savingsThisMonth: "ఈ నెల ఆదా",
    orderNow: "ఇప్పుడే ఆర్డర్ చేయండి",
    importantInformation: "మీ పెట్టుబడులు మరియు రాబందుల గురించి ముఖ్యమైన సమాచారం",
    investmentStructure: "పెట్టుబడి నిర్మాణం",
    returnsRepayment: "రాబందులు మరియు తిరిగి చెల్లింపు",
    riskFactors: "ప్రమాద కారకాలు",
    organicProduceBenefits: "సేంద్రీయ ఉత్పత్తుల ప్రయోజనాలు",
    downloadCompleteTC: "పూర్తి T&C డాక్యుమెంట్ డౌన్‌లోడ్ చేయండి",
    active: "క్రియాశీల",
    inactive: "నిష్క్రియ",
    deadline: "గడువు",

    // Login & Registration
    login: "లాగిన్",
    register: "రిజిస్టర్",
    dontHaveAccount: "ఖాతా లేదా?",
    alreadyHaveAccount: "ఇప్పటికే ఖాతా ఉందా?",
    signUp: "సైన్ అప్",
    signIn: "సైన్ ఇ��్",

    // Common Fields
    fullName: "పూర్తి పేరు",
    emailAddress: "ఇమెయిల్ చిరునామా",
    phoneNumber: "ఫోన్ నంబర్",
    password: "పాస్��వర్డ్",
    confirmPassword: "పాస్‌వర్డ్ నిర్ధారించండి",
    or: "లేదా",
    otpLogin: "OTP తో లాగిన్",

    // Farmer Fields
    farmerLoginTitle: "రైతుల లాగిన్",
    farmerRegistrationTitle: "రైతుల రిజిస్ట్రేషన్",
    aadhaarNumber: "ఆధార్ నంబర్",
    mobileNumber: "మొబైల్ నంబర్",
    emailOptional: "ఇమెయిల్ ID (ఐచ్ఛికం)",
    village: "గ్రామం",
    district: "జిల్లా",
    state: "రాష్ట్రం",
    typeOfFarming: "వ్యవసాయ రకం",
    landSize: "భూమి పరిమాణం (ఎకరాలు/హెక్టార్లు)",
    bankAccountDetails: "బ్యాంక్ ఖాతా వివరాలు",
    accountNumber: "ఖాతా నంబర్",
    ifscCode: "IFSC కోడ్",
    bankName: "బ్యాంక్ పేరు",
    photoIdUpload: "ఫోటో ID అప్‌లోడ్",
    uploadPhotoId: "ఆధార్/PAN/ఓటర్ ID అప్‌లోడ్ చేయండి",
    farmPhotos: "వ్యవసాయ భూమి ఫోటోలు (ఐచ్ఛికం)",
    uploadFarmPhotos: "వ్యవసాయ భూమి/జియో-ట్యాగ్ చేసిన చి��్రాలను అప్‌లోడ్ చేయండి",

    // Investor Fields
    investorLoginTitle: "పెట్టుబడిదారుల లాగిన్",
    investorRegistrationTitle: "పెట్టుబడిదారుల ర��జిస్ట్రేషన్",
    panNumber: "PAN నంబర్",
    occupation: "వృత్తి/పేజీ",
    preferredLanguage: "ప���రాధాన్య భాష",
    billingAddress: "బిల్లింగ్ చిరునామా",
    address: "చిరునామా",
    city: "నగరం",
    pincode: "పిన్‌కోడ్",
    paymentMethod: "చెల్లింపు పద్ధతి",
    upiId: "UPI ID",

    // Form Actions
    submit: "సమర్పించండి",
    cancel: "రద్దు చేయండి",
    upload: "అప్‌లోడ్",
    choose: "ఫైల్ ఎంచుకోండి",
    required: "అవసరం",
    optional: "ఐచ్ఛికం",

    // Validation Messages
    fieldRequired: "ఈ ఫీల్డ్ అవసరం",
    invalidEmail: "దయచేసి చెల్లుబాటు అయ్యే ఇమెయిల్ నమోదు చేయండి",
    invalidPhone: "దయచేసి చెల్లుబాటు అయ్యే ఫోన్ నంబర్ నమోదు చేయండి",
    passwordTooShort: "పాస్‌వర్డ్ కనీసం 6 అక్షరాలు ఉండాలి",
    passwordsDontMatch: "పాస్‌వర్డ్‌లు సరిపోలలేదు",

    // Farming Types
    vegetables: "కూరగాయలు",
    grains: "ధాన్యాలు",
    fruits: "పండ్లు",
    cotton: "పత్తి",
    sugarcane: "చెరకు",
    mixed: "మిశ్రమ వ్యవసాయం",

    // Additional translations for login forms
    personalInformation: "వ్యక్తిగత సమాచారం",
    locationDetails: "స్థాన వివరాలు",
    farmingDetails: "వ్యవసాయ వివరాలు",
    documentUpload: "పత్రం అప్‌లోడ్",
    accountSecurity: "ఖాతా భద్రత",
    supportedFormats: "మద్దతు ఉన్న ఫార్మాట్‌లు",
    multipleFiles: "అనేక ఫైళ్లకు మద్దతు",
    maxSize: "గరిష్�� పరిమాణం",
    chooseFile: "ఫైల్ ఎంచుకోండి",
    uploadDocument: "పత్రం అప్‌లోడ్ చేయండి",
    completeRegistrationDetails: "రిజిస్ట్రేషన్ వివరాలను పూర్తి చేయండి",
    selectFarmingType: "వ్యవసాయ రకాన���ని ఎంచుకోండి",

    // Testimonials
    testimonials: "సాక్ష్యాలు",
    whatOurUsersAreSaying: "మా విని��ోగదారులు ఏమి చెబుతున్నారు",
    testimonialsDescription: "రైతులు మరియు పెట్టుబడిదారుల నిజమైన అనుభవాలు",
    organicFarmer: "సేంద్రీయ రైతు",
    investorFromMumbai: "ముంబైకి చెందిన పెట్టుబడిదారుడు",
    investorFromHyderabad: "హైదరాబాదుకు చెందిన పెట్టుబడిదారుడు",
    testimonial1Text: "అగ్రోఫైనా యొక్క పెట్టుబడి ప్రక్రియ చాలా సరళంగా మరియు లాభదాయకంగా ఉంది. పారదర్శకత మరి���ు క్రమం తప్పకుండా వచ్చే నవీకరణలు నా పెట్టుబడులపై నాకు విశ్వాసం కలిగిస్తున్నాయి.",
    testimonial2Text: "అస్థిర మార్కెట్ల గురించి చింతించకుండా నా పంటలను పెంచడంలో ఈ ప్లాట్‌ఫామ్ నాకు సహాయపడింది. కాలానుగుణ నిధుల నిర���మాణం నా వ్యవసాయ చక్రానికి సంపూర్ణంగా సరిపోతుంది.",
    testimonial3Text: "రాయితీ ధరలతో ఆరోగ్యకరమైన సేంద్రీయ ఉత్పత్తులను పొందుతూ రైతులకు మద్దతు ఇవ్వడంలో నేను ఆనందిస్తున్నాను. ఇది అందరికీ లాభదాయకమైన పరిస్థితి.",
    testimonial1Name: "రాజేష్ కుమార్",
    testimonial2Name: "రాజేష్ వర్మ",
    testimonial3Name: "అమిత్ పటేల్",

    // About Page Content
    aboutUsTitle: "మా గురించి",
    aboutUsIntro: "అగ్రోఫైనా అనేది న్యాయమైన, పారదర్శక మరియు స్థిరమైన మార్గంలో పెట్టుబడిదారులను మరియు సేంద్రీయ రైతులను అనుసంధానించే సమగ్ర వృత్తా���ార పెట్టుబడి ప్లాట్‌ఫామ్.",
    inclusiveInvestment: "సమగ్ర పెట్టుబడి మోడల్",
    inclusiveInvestmentDesc: "అధిక దిగుబడి వ్యవసాయ క్షేత్రాలపై మాత్రమే దృష్టి సారించే సాంప్రదాయ వ్యవసాయ-ఫిన్‌టెక్ మోడల్‌లకు విరుద్ధంగా, మేము అన్ని పెట్టుబడులను ఒకే సాధారణ ఫండ్‌లో కలుపుతాము. ఈ ఫండ్ చిన్న, మధ్యస్థ మరియు పెద్ద-స్థాయి రైతులకు న్యాయంగా పంపిణీ చేయబడుతుంది, అందరికీ సమాన ఆర్థిక ప్రాప్యతను నిర్ధారిస్తుంది.",
    phasedDisbursement: "దశల వారీ పంపిణీ వ్యవస్థ",
    phasedDisbursementDesc: "మా దశల వారీ పంపిణీ మోడల్ ప్రతి పంట కాలంలో మూడు దశలలో నిధులను విడుదల చేస్తుంది — రైతులు వనర��లను బాధ్యతాయుతంగా ఉపయోగించుకోవడంలో మరియు స్థిరమైన వృద్ధిని కొనసాగించడంలో సహాయపడుతుంది.",
    healthyReturns: "ఆరోగ్యకరమైన రాబందులు",
    healthyReturnsDesc: "నగదు-ఆధారిత వడ్డీకి బదులుగా, పెట్టుబడిదారులు సేంద్రీయ ఆహారంపై తగ్గింపులను పొందుతారు, ఆర్థిక రాబందులను నిజమైన ఆరోగ్య ప్రయోజనాలుగా మారుస్తారు.",
    languageAccessibility: "భాషా అందుబాటు",
    languageAccessibilityDesc: "ఇంగ్లీష్ మరియు తెలుగు రెండింటికీ పూర్తి మద్దతుతో భాషా అందుబాటుకు మేము కట్టుబడి ఉన్నాము, తద్వారా అందరూ అడ్డంకులు లేకుండా ప్రయోజనం పొందవచ్చు.",
    transparentDashboards: "పారదర్శక డాష్‌బోర్డ్‌లు",
    transparentDashboardsDesc: "మా ద్వంద్వ-డాష్‌బోర్డ్ వ్యవస్థ అన్ని వాటాదారులకు పారదర్శకతను నిర్ధారిస్తుంది.",
    farmersDashboard: "రైతుల డాష్‌బోర్డ్",
    farmersDashboardDesc: "గత లావాదేవీలు, లాభాలు మరియు ప్రత్యక్ష పంట పురోగతిని చూడండి.",
    investorsDashboard: "పెట్టుబడిదారుల డాష్‌బోర్డ్",
    investorsDashboardDesc: "మీ పెట్టుబడి వృద్ధి మరియు మీరు సంపాదించిన తగ్గింపులను ట్రాక్ చేయండి.",
    ourMission: "మా లక్ష్యం",
    missionStatement: "అగ్రోఫైనాతో, రైతులు అభ���వృద్ధి చెందుతారు, పెట్టుబడిదారులు ప్రయోజనం పొందుతారు మరియు సంఘాలు తాజా, సేంద్రీయ ఉత్పత్తులకు మెరుగైన ప్రాప్యతను ఆస్వాదిస్తాయి — ఆ���ోగ్యకరమైన మరియు మరింత సమానమైన భవిష్యత్తును సృష్టిస్తుంది.",
    whyChooseUs: "మమ్మల్ని ఎందుకు ఎంచుకోవాలి?",
    fairDistribution: "న్యాయమైన పంపిణీ",
    responsibleGrowth: "బాధ్యతాయుత వృద్ధి",
    realBenefits: "నిజమైన ప్రయోజనాలు",
    fullTransparency: "పూర్తి పారదర్శకత",
    realTimeCropMonitoring: "రియల్ టైమ్ పంట పర్యవేక్షణ",
    transactionHistory: "లావాదేవీల చరిత్ర",
    profitTracking: "లాభ ట్రాకింగ్",
    investmentGrowthTracking: "పెట్టుబడి వృద్ధి ట్రాకింగ్",
    discountBenefitsOverview: "తగ్గింపు ప్ర���ోజనాల అవలోకనం",
    portfolioAnalytics: "పోర్ట్‌ఫోలియో విశ్లేషణలు",
    equalAccessForAllFarmers: "అన్ని రైతులకు సమాన ప్రాప్యత",
    phasedSustainableDevelopment: "దశల వారీ, స్థిరమైన అభి���ృద్ధి",
    healthBenefitsOverCash: "నగదుకు బదులుగా ఆరోగ్య ప్రయోజనాలు",
    completeVisibilityTrust: "పూర్తి దృశ్యత మరియు నమ్మకం",

    // Form Placeholders - Keep in English
    johnDoePlaceholder: "Ramesh",
    softwareEngineerPlaceholder: "Software Engineer",
    rajeshKumarPlaceholder: "Ramesh",
    villageNamePlaceholder: "Village name",
    districtNamePlaceholder: "District name",
    stateNamePlaceholder: "State name",
    accountNumberPlaceholder: "Account number",
    bankNamePlaceholder: "Bank name",

    // Contact Page
    getInTouch: "సంప్రదించండి",
    contactUsDescription: "మీ నుండి వినడానికి మేము ఆసక్తిగా ఉన్నాము. మాకు సందేశం పంపండి మరియు మేము వీలైనంత త్వరగా స్పందిస్తాము.",
    ourOffice: "మా కార్యాలయం",
    contactInfo: "సంప్రదింపు సమాచారం",
    address: "చిరునామా",
    companyAddress: "అగ్రోఫైనా ప్రైవేట్ లిమిటెడ్\nప్లాట��� నంబర్. 112, గ్రీన్‌ఫీల్డ్ బిజినెస్ పార్క్\nగచ్చిబౌలి, హైదరాబాద్, తెలంగాణ – 500032, భారతదేశం",
    phone: "ఫోన్",
    contactPhoneNumber: "+91 98765 43210",
    email: "ఇమెయిల్",
    contactEmailAddress: "contact@agrofina.in",
    workingHours: "పని సమయాలు",
    hoursInfo: "24/7 తెరిచి ఉంటుంది",
    contactForm: "సంప్రదింపు ఫారం",
    sendMessage: "మాకు సందేశం పంపండి",
    name: "పేరు",
    namePlaceholder: "Ramesh",
    emailPlaceholder: "your.email@example.com",
    phonePlaceholder: "+91 98765 43210",
    message: "సందేశం",
    messagePlaceholder: "Tell us how we can help you...",
    sendButton: "సందేశం పంపండి",
    sending: "పంపుతున్నాము...",
    successMessage: "ధన్యవాదాలు! మీ సందేశం విజయవంతంగా పంపబడింది. మేము త్వరలో మిమ్మల్ని సంప్రదిస్తాము.",
    errorMessage: "క్షమించండి, మీ సం���ేశాన్ని పంపడంలో లోపం ఉంది. దయచేసి మళ్లీ ప్రయత్నించండి.",

    // Dashboard Navigation Telugu translations
    currentInvestments: "ప్రస్తుత పెట్టుబడులు",
    investmentProgress: "పెట్టుబడి పురోగతి",
    previousTransactions: "మునుపటి లావాదేవీలు",
    currentCropStatus: "ప్రస్తుత పంట స్థితి",
    loanManagement: "రుణ నిర్వహణ",
    previousLoans: "మునుపటి రుణాలు",
    previousCrops: "మునుపటి పంటలు",
    logout: "లాగౌట్",

    // Dashboard Content Telugu translations
    welcomeBack: "తిరిగి స్వాగతం",
    totalInvestment: "మొత్తం పెట్టుబడి",
    portfolioValue: "పోర్ట్‌ఫోలియో విలువ",
    totalReturns: "మొత్తం రాబందులు",
    activeInvestments: "క్రియాశీల పెట్టుబడులు",
    recentActivity: "ఇటీవలి కార్యకలాపాలు",
    quickActions: "త్వరిత చర్యలు",
    viewAll: "అన్నీ చూడండి",
    currentLoan: "ప్రస్తుత రుణం",
    activeCrops: "క్రియాశీల పంటలు",
    loanApplications: "రుణ దరఖాస్తులు",
    applyForLoan: "రుణం కోసం దరఖాస్తు చేయండి",
    cropHealth: "పంట ఆరోగ్యం",
    harvestSchedule: "పంట కోత షెడ్యూల్",

    // Status Telugu translations
    excellent: "అద్భుతం",
    good: "మంచిది",
    fair: "సరైనది",
    poor: "దయనీయం",
    active: "క్రియాశీల",
    completed: "పూర్తయింది",
    pending: "వేచివున్న",
    approved: "ఆమోదించబడింది",
    rejected: "తిరస్కరించబడింది"
  }
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    // Check localStorage for saved language preference
    if (typeof window !== 'undefined') {
      const savedLang = localStorage.getItem('language') as Language;
      return savedLang || 'en';
    }
    return 'en';
  });

  // Save language preference to localStorage and update document lang
  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.lang = language;

    // Add Telugu class for better font rendering
    if (language === 'te') {
      document.body.classList.add('telugu-text');
    } else {
      document.body.classList.remove('telugu-text');
    }
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

// Translation validation utility for development
export const validateTranslations = () => {
  const englishKeys = Object.keys(translations.en);
  const teluguKeys = Object.keys(translations.te);

  const missingInTelugu = englishKeys.filter(key => !teluguKeys.includes(key));
  const missingInEnglish = teluguKeys.filter(key => !englishKeys.includes(key));

  if (missingInTelugu.length > 0) {
    console.warn('Missing Telugu translations:', missingInTelugu);
  }

  if (missingInEnglish.length > 0) {
    console.warn('Missing English translations:', missingInEnglish);
  }

  return {
    englishCount: englishKeys.length,
    teluguCount: teluguKeys.length,
    missingInTelugu,
    missingInEnglish,
    isComplete: missingInTelugu.length === 0 && missingInEnglish.length === 0
  };
};
