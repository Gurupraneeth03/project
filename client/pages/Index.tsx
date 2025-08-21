import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { 
  Leaf, 
  TrendingUp, 
  Shield, 
  Users, 
  Sprout, 
  ArrowRight, 
  CheckCircle,
  Calendar,
  DollarSign,
  ShoppingCart
} from "lucide-react";

export default function Index() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-yellow-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-green-100/30 rounded-full blur-3xl"></div>
      </div>
      
      <Navigation />
      
      {/* Enhanced Hero Section */}
      <section className="relative py-24 px-4">
        <div className="container mx-auto text-center relative z-10">
          <Badge className="mb-8 bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20 px-4 py-2 text-sm font-medium animate-fade-in">
            <p>{t('fundingFarmsFeedingFutures')}</p>
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight">
            <span className="block">{t('investIn')}</span>
            <span className="text-primary gradient-text">{t('organicFarming')}</span>
            <span className="block text-2xl md:text-3xl text-gray-700 mt-4 font-normal">
              {t('harvestHealthyBenefits')}
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-4xl mx-auto leading-relaxed">
            {t('heroDescription')}
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link to="/investor-login">
              <Button size="lg" className="text-lg px-10 py-6 bg-gradient-to-r from-primary to-green-600 hover:from-primary/90 hover:to-green-600/90 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                <Users className="mr-3 h-6 w-6" />
                {t('startInvesting')}
              </Button>
            </Link>
            <Link to="/farmer-login">
              <Button variant="outline" size="lg" className="text-lg px-10 py-6 border-2 hover:bg-primary hover:text-white hover:border-primary shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                <Sprout className="mr-3 h-6 w-6" />
                {t('applyForFunding')}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Enhanced How It Works Section */}
      <section className="py-24 px-4 bg-white relative">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white"></div>
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">{t('howAgroFinaWorks')}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {t('howItWorksDescription')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="card-hover border-l-4 border-l-primary shadow-lg hover:shadow-2xl group">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <DollarSign className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl mb-3">{t('investmentProcess')}</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  {t('investmentProcessDescription')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-gray-600">
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>{t('threeSeasonalTerms')}</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>{t('preduringpost')}</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>{t('transparentTC')}</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="card-hover border-l-4 border-l-accent shadow-lg hover:shadow-2xl group">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-accent/20 to-accent/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Sprout className="h-8 w-8 text-accent" />
                </div>
                <CardTitle className="text-xl mb-3">{t('farmerSupport')}</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  {t('farmerSupportDescription')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-gray-600">
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>{t('preProductionFunding')}</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>{t('duringProductionSupport')}</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>{t('postProductionAssistance')}</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="card-hover border-l-4 border-l-green-500 shadow-lg hover:shadow-2xl group">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <ShoppingCart className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-xl mb-3">{t('returnsAndBenefits')}</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  {t('returnsDescription')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-gray-600">
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>{t('exactLoanRepayment')}</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>{t('organicProduceSupply')}</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>{t('percentageDiscounts')}</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section className="py-24 px-4 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">{t('whyChooseAgroFina')}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {t('whyChooseDescription')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Shield className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">{t('secureInvestments')}</h3>
              <p className="text-gray-600 leading-relaxed">{t('secureInvestmentsDesc')}</p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-accent/20 to-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Calendar className="h-10 w-10 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">{t('seasonalStructure')}</h3>
              <p className="text-gray-600 leading-relaxed">{t('seasonalStructureDesc')}</p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-green-50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Leaf className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">{t('hundredPercentOrganic')}</h3>
              <p className="text-gray-600 leading-relaxed">{t('organicDesc')}</p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <TrendingUp className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">{t('mutualBenefits')}</h3>
              <p className="text-gray-600 leading-relaxed">{t('mutualBenefitsDesc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Stats Section */}
      <section className="py-24 px-4 bg-gradient-to-r from-primary via-green-600 to-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto relative z-10">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="group">
              <div className="text-5xl md:text-6xl font-bold mb-3 group-hover:scale-110 transition-transform duration-300">500+</div>
              <div className="text-primary-foreground/90 text-lg font-medium">{t('activeFarmers')}</div>
            </div>
            <div className="group">
              <div className="text-5xl md:text-6xl font-bold mb-3 group-hover:scale-110 transition-transform duration-300">1,200+</div>
              <div className="text-primary-foreground/90 text-lg font-medium">{t('investors')}</div>
            </div>
            <div className="group">
              <div className="text-5xl md:text-6xl font-bold mb-3 group-hover:scale-110 transition-transform duration-300">₹50M+</div>
              <div className="text-primary-foreground/90 text-lg font-medium">{t('fundsDispersed')}</div>
            </div>
            <div className="group">
              <div className="text-5xl md:text-6xl font-bold mb-3 group-hover:scale-110 transition-transform duration-300">95%</div>
              <div className="text-primary-foreground/90 text-lg font-medium">{t('repaymentRate')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials Section */}
      <section className="py-24 px-4 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">{t('whatOurUsersAreSaying')}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {t('testimonialsDescription')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Investor Testimonial 1 */}
            <Card className="card-hover p-8 border-l-4 border-l-primary shadow-lg hover:shadow-2xl group">
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <span className="text-3xl font-bold text-primary">R</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-xl text-gray-900">{t('testimonial1Name')}</h4>
                    <p className="text-sm text-gray-600 mb-2">{t('investorFromMumbai')}</p>
                    <div className="flex text-yellow-400 text-sm">
                      ⭐⭐⭐⭐⭐
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 italic text-lg leading-relaxed">
                  "{t('testimonial1Text')}"
                </p>
              </CardContent>
            </Card>

            {/* Farmer Testimonial */}
            <Card className="card-hover p-8 border-l-4 border-l-green-500 shadow-lg hover:shadow-2xl group">
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-green-50 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <span className="text-3xl font-bold text-green-600">P</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-xl text-gray-900">{t('testimonial2Name')}</h4>
                    <p className="text-sm text-gray-600 mb-2">{t('organicFarmer')}</p>
                    <div className="flex text-yellow-400 text-sm">
                      ⭐⭐⭐⭐⭐
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 italic text-lg leading-relaxed">
                  "{t('testimonial2Text')}"
                </p>
              </CardContent>
            </Card>

            {/* Investor Testimonial 2 */}
            <Card className="card-hover p-8 border-l-4 border-l-accent shadow-lg hover:shadow-2xl group">
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-accent/20 to-accent/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <span className="text-3xl font-bold text-accent">A</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-xl text-gray-900">{t('testimonial3Name')}</h4>
                    <p className="text-sm text-gray-600 mb-2">{t('investorFromHyderabad')}</p>
                    <div className="flex text-yellow-400 text-sm">
                      ⭐⭐⭐⭐⭐
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 italic text-lg leading-relaxed">
                  "{t('testimonial3Text')}"
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>


      {/* Enhanced Footer */}
      <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto relative z-10">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="rounded-xl bg-white/10 p-2">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets%2F249eb593ae8042aea627b1f968fdde64%2Fbe6be65d23c9462d99e03edbc31a696e?format=webp&width=800"
                    alt="AgroFina Logo"
                    className="h-10 w-10 object-contain"
                  />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">AgroFina</span>
              </div>
              <p className="text-gray-300 text-base leading-relaxed">
                {t('footerDescription')}
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-6 text-lg">{t('platform')}</h4>
              <ul className="space-y-3 text-sm text-gray-300">
                <li><Link to="/how-it-works" className="hover:text-primary transition-colors duration-200">{t('howItWorks')}</Link></li>
                <li><Link to="/investor-login" className="hover:text-primary transition-colors duration-200">{t('forInvestors')}</Link></li>
                <li><Link to="/farmer-login" className="hover:text-primary transition-colors duration-200">{t('forFarmers')}</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-6 text-lg">{t('company')}</h4>
              <ul className="space-y-3 text-sm text-gray-300">
                <li><Link to="/about" className="hover:text-primary transition-colors duration-200">{t('aboutUs')}</Link></li>
                <li><Link to="/contact" className="hover:text-primary transition-colors duration-200">{t('contact')}</Link></li>
                <li><Link to="/terms" className="hover:text-primary transition-colors duration-200">{t('termsConditions')}</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-6 text-lg">{t('support')}</h4>
              <ul className="space-y-3 text-sm text-gray-300">
                <li><Link to="/help" className="hover:text-primary transition-colors duration-200">{t('helpCenter')}</Link></li>
                <li><Link to="/faq" className="hover:text-primary transition-colors duration-200">{t('faq')}</Link></li>
                <li><Link to="/privacy" className="hover:text-primary transition-colors duration-200">{t('privacyPolicy')}</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center">
            <p className="text-gray-400 text-sm">{t('copyright')}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
