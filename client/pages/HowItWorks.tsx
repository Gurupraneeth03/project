import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";
import { 
  DollarSign, 
  Sprout, 
  ShoppingCart,
  Users,
  ArrowRight,
  CheckCircle,
  Heart,
  Leaf,
  TrendingUp,
  FileText,
  Calendar,
  MapPin
} from "lucide-react";

export default function HowItWorks() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-yellow-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Badge className="mb-6 bg-primary/10 text-primary hover:bg-primary/20">
            {t('howItWorksDetail')}
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            {t('ourLoanToDiscountModel')}
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
            {t('howItWorksDetailDescription')}
          </p>
        </div>
      </section>

      {/* Main Process Flow */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">The Complete Process</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A simple 3-step process that benefits wealthy investors, needy farmers, and promotes organic agriculture
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* Step 1: Investor Provides Loan */}
            <Card className="relative border-2 border-primary/20 hover:border-primary/40 transition-colors">
              <div className="absolute -top-4 left-4">
                <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                  1
                </div>
              </div>
              <CardHeader className="pt-8">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-center">Wealthy Investor Provides Loan</CardTitle>
                <CardDescription className="text-center">
                  Investors browse needy farmer applications and provide loans based on crop type, land size, and funding requirements
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-primary mr-2" />Review farmer loan applications</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-primary mr-2" />Select farmers to support</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-primary mr-2" />Provide loan without traditional interest</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-primary mr-2" />Track farmer and crop progress</li>
                </ul>
              </CardContent>
            </Card>

            {/* Step 2: Farmer Uses Loan */}
            <Card className="relative border-2 border-green-200 hover:border-green-400 transition-colors">
              <div className="absolute -top-4 left-4">
                <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">
                  2
                </div>
              </div>
              <CardHeader className="pt-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sprout className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-center">Farmer Grows Organic Crops</CardTitle>
                <CardDescription className="text-center">
                  Needy farmers use the loan to cultivate organic crops, focusing on quality and sustainable farming practices
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-600 mr-2" />Purchase organic seeds and supplies</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-600 mr-2" />Maintain certified organic standards</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-600 mr-2" />Regular crop progress updates</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-600 mr-2" />Harvest quality organic produce</li>
                </ul>
              </CardContent>
            </Card>

            {/* Step 3: Investor Gets Discounts */}
            <Card className="relative border-2 border-accent/20 hover:border-accent/40 transition-colors">
              <div className="absolute -top-4 left-4">
                <div className="w-8 h-8 bg-accent text-white rounded-full flex items-center justify-center font-bold">
                  3
                </div>
              </div>
              <CardHeader className="pt-8">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShoppingCart className="h-8 w-8 text-accent" />
                </div>
                <CardTitle className="text-center">Investor Receives Organic Discounts</CardTitle>
                <CardDescription className="text-center">
                  Instead of traditional interest, investors receive substantial discounts on fresh organic produce from supported farmers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-accent mr-2" />Receive loan principal repayment</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-accent mr-2" />Get organic produce discounts</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-accent mr-2" />Access to premium organic vegetables</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-accent mr-2" />Health benefits for the family</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Flow Arrows for Desktop */}
          <div className="hidden md:flex justify-center items-center space-x-8 mb-16">
            <ArrowRight className="h-8 w-8 text-primary" />
            <ArrowRight className="h-8 w-8 text-green-600" />
            <ArrowRight className="h-8 w-8 text-accent" />
          </div>
        </div>
      </section>

      {/* Detailed Benefits Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why This Model Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our innovative approach creates value for all stakeholders while promoting sustainable organic agriculture
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* For Investors */}
            <Card className="p-8 border-2 border-primary/20 bg-primary/5">
              <CardHeader>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-2xl">For Wealthy Investors</CardTitle>
                <CardDescription className="text-lg">
                  Support needy farmers while getting meaningful health benefits for your family
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Heart className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-semibold">Social Impact</h4>
                    <p className="text-sm text-gray-600">Directly help needy farming families build sustainable livelihoods</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Leaf className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-semibold">Health Benefits</h4>
                    <p className="text-sm text-gray-600">Access to premium organic produce at discounted rates for your family</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <TrendingUp className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-semibold">Real Returns</h4>
                    <p className="text-sm text-gray-600">Get value equivalent to traditional returns through organic food savings</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <FileText className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-semibold">Transparency</h4>
                    <p className="text-sm text-gray-600">Track your supported farmers and crop progress in real-time</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* For Farmers */}
            <Card className="p-8 border-2 border-green-200 bg-green-50">
              <CardHeader>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <Sprout className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-2xl">For Needy Farmers</CardTitle>
                <CardDescription className="text-lg">
                  Access funding without complex EMI structures and build sustainable organic farming businesses
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <DollarSign className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold">Easy Funding Access</h4>
                    <p className="text-sm text-gray-600">Get loans by simply mentioning crop type, land size, and amount needed</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Calendar className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold">Flexible Repayment</h4>
                    <p className="text-sm text-gray-600">No complex EMI schedules - focus on growing quality organic crops</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Users className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold">Investor Connection</h4>
                    <p className="text-sm text-gray-600">Build relationships with supporting investors who care about your success</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Leaf className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold">Organic Premium</h4>
                    <p className="text-sm text-gray-600">Get better prices for organic produce and build sustainable farming practices</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How To Get Started</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Simple registration process for both investors and farmers
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* For Investors */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-primary">For Investors</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">1</div>
                  <div>
                    <h4 className="font-semibold">Register Your Account</h4>
                    <p className="text-sm text-gray-600">Provide your details including PAN, occupation, and delivery address for organic produce</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">2</div>
                  <div>
                    <h4 className="font-semibold">Browse Farmer Applications</h4>
                    <p className="text-sm text-gray-600">Review loan requests from needy farmers with their crop plans and funding requirements</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">3</div>
                  <div>
                    <h4 className="font-semibold">Provide Loans</h4>
                    <p className="text-sm text-gray-600">Select farmers to support and provide loans through our secure platform</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">4</div>
                  <div>
                    <h4 className="font-semibold">Enjoy Organic Benefits</h4>
                    <p className="text-sm text-gray-600">Receive organic produce discounts and track crop progress from your supported farmers</p>
                  </div>
                </div>
              </div>
              <Link to="/investor-login">
                <Button size="lg" className="w-full">
                  Start Supporting Farmers
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>

            {/* For Farmers */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-green-600">For Farmers</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm">1</div>
                  <div>
                    <h4 className="font-semibold">Register Your Farm</h4>
                    <p className="text-sm text-gray-600">Provide your details including Aadhaar, farm location, land size, and farming type</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm">2</div>
                  <div>
                    <h4 className="font-semibold">Submit Loan Application</h4>
                    <p className="text-sm text-gray-600">Specify your crop type, land area, and required loan amount with farming plan</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm">3</div>
                  <div>
                    <h4 className="font-semibold">Receive Funding</h4>
                    <p className="text-sm text-gray-600">Get loan approval and funding from supporting investors through our platform</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm">4</div>
                  <div>
                    <h4 className="font-semibold">Grow & Supply</h4>
                    <p className="text-sm text-gray-600">Cultivate organic crops and supply fresh produce for investor discount benefits</p>
                  </div>
                </div>
              </div>
              <Link to="/farmer-login">
                <Button size="lg" variant="outline" className="w-full border-green-600 text-green-600 hover:bg-green-600 hover:text-white">
                  Apply for Farming Loan
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="rounded-lg">
                  <img 
                    src="https://cdn.builder.io/api/v1/image/assets%2F249eb593ae8042aea627b1f968fdde64%2Fbe6be65d23c9462d99e03edbc31a696e?format=webp&width=800" 
                    alt="AgroFina Logo" 
                    className="h-8 w-8 object-contain"
                  />
                </div>
                <span className="text-xl font-bold">AgroFina</span>
              </div>
              <p className="text-gray-400 text-sm">
                {t('footerDescription')}
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{t('platform')}</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link to="/investor-login" className="hover:text-white">{t('forInvestors')}</Link></li>
                <li><Link to="/farmer-login" className="hover:text-white">{t('forFarmers')}</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{t('company')}</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link to="/about" className="hover:text-white">{t('aboutUs')}</Link></li>
                <li><Link to="/contact" className="hover:text-white">{t('contact')}</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{t('support')}</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="/help" className="hover:text-white">{t('helpCenter')}</a></li>
                <li><a href="/faq" className="hover:text-white">{t('faq')}</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>{t('copyright')}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
