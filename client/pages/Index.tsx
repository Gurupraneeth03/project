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
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-yellow-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Badge className="mb-6 bg-primary/10 text-primary hover:bg-primary/20">
            <p>{t('fundingFarmsFeedingFutures')}</p>
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            {t('investIn')}
            <span className="text-primary">{t('organicFarming')}</span>
            <br />
            <p>{t('harvestHealthyBenefits')}</p>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            {t('heroDescription')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/investor-login">
              <Button size="lg" className="text-lg px-8 py-4">
                <Users className="mr-2 h-5 w-5" />
                {t('startInvesting')}
              </Button>
            </Link>
            <Link to="/farmer-login">
              <Button variant="outline" size="lg" className="text-lg px-8 py-4">
                <Sprout className="mr-2 h-5 w-5" />
                {t('applyForFunding')}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t('howAgroFinaWorks')}</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t('howItWorksDescription')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-l-4 border-l-primary">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <DollarSign className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>{t('investmentProcess')}</CardTitle>
                <CardDescription>
                  {t('investmentProcessDescription')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-primary mr-2" />{t('threeSeasonalTerms')}</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-primary mr-2" />{t('preduringpost')}</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-primary mr-2" />{t('transparentTC')}</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-accent">
              <CardHeader>
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <Sprout className="h-6 w-6 text-accent" />
                </div>
                <CardTitle>{t('farmerSupport')}</CardTitle>
                <CardDescription>
                  {t('farmerSupportDescription')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-primary mr-2" />{t('preProductionFunding')}</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-primary mr-2" />{t('duringProductionSupport')}</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-primary mr-2" />{t('postProductionAssistance')}</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-green-500">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <ShoppingCart className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle>{t('returnsAndBenefits')}</CardTitle>
                <CardDescription>
                  {t('returnsDescription')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-primary mr-2" />{t('exactLoanRepayment')}</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-primary mr-2" />{t('organicProduceSupply')}</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-primary mr-2" />{t('percentageDiscounts')}</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t('whyChooseAgroFina')}</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t('whyChooseDescription')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{t('secureInvestments')}</h3>
              <p className="text-gray-600">{t('secureInvestmentsDesc')}</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{t('seasonalStructure')}</h3>
              <p className="text-gray-600">{t('seasonalStructureDesc')}</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{t('hundredPercentOrganic')}</h3>
              <p className="text-gray-600">{t('organicDesc')}</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{t('mutualBenefits')}</h3>
              <p className="text-gray-600">{t('mutualBenefitsDesc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 bg-primary text-white">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-primary-foreground/80">{t('activeFarmers')}</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">1,200+</div>
              <div className="text-primary-foreground/80">{t('investors')}</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">₹50M+</div>
              <div className="text-primary-foreground/80">{t('fundsDispersed')}</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">95%</div>
              <div className="text-primary-foreground/80">{t('repaymentRate')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t('whatOurUsersAreSaying')}</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t('testimonialsDescription')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Investor Testimonial 1 */}
            <Card className="p-6 border-l-4 border-l-primary">
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-primary">R</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">{t('testimonial1Name')}</h4>
                    <p className="text-sm text-gray-600">{t('investorFromMumbai')}</p>
                    <div className="flex text-yellow-400 text-sm">
                      ⭐⭐⭐⭐⭐
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "{t('testimonial1Text')}"
                </p>
              </CardContent>
            </Card>

            {/* Farmer Testimonial */}
            <Card className="p-6 border-l-4 border-l-green-500">
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-green-600">P</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">{t('testimonial2Name')}</h4>
                    <p className="text-sm text-gray-600">{t('organicFarmer')}</p>
                    <div className="flex text-yellow-400 text-sm">
                      ⭐⭐⭐⭐⭐
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "{t('testimonial2Text')}"
                </p>
              </CardContent>
            </Card>

            {/* Investor Testimonial 2 */}
            <Card className="p-6 border-l-4 border-l-accent">
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-accent">A</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">{t('testimonial3Name')}</h4>
                    <p className="text-sm text-gray-600">{t('investorFromHyderabad')}</p>
                    <div className="flex text-yellow-400 text-sm">
                      ⭐⭐⭐⭐⭐
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "{t('testimonial3Text')}"
                </p>
              </CardContent>
            </Card>
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
                <li><Link to="/how-it-works" className="hover:text-white">{t('howItWorks')}</Link></li>
                <li><Link to="/investor-login" className="hover:text-white">{t('forInvestors')}</Link></li>
                <li><Link to="/farmer-login" className="hover:text-white">{t('forFarmers')}</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{t('company')}</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link to="/about" className="hover:text-white">{t('aboutUs')}</Link></li>
                <li><Link to="/contact" className="hover:text-white">{t('contact')}</Link></li>
                <li><Link to="/terms" className="hover:text-white">{t('termsConditions')}</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{t('support')}</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link to="/help" className="hover:text-white">{t('helpCenter')}</Link></li>
                <li><Link to="/faq" className="hover:text-white">{t('faq')}</Link></li>
                <li><Link to="/privacy" className="hover:text-white">{t('privacyPolicy')}</Link></li>
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
