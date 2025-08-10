import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { 
  Users, 
  TrendingUp, 
  Shield, 
  Leaf, 
  Globe,
  BarChart3,
  Heart,
  CheckCircle,
  Target,
  ArrowRight
} from "lucide-react";

export default function About() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-yellow-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Badge className="mb-6 bg-primary/10 text-primary hover:bg-primary/20">
            {t('aboutUsTitle')}
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            {t('aboutAgroFina')}
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
            {t('aboutUsIntro')}
          </p>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t('whyChooseUs')}</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{t('fairDistribution')}</h3>
              <p className="text-gray-600">{t('equalAccessForAllFarmers')}</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{t('responsibleGrowth')}</h3>
              <p className="text-gray-600">{t('phasedSustainableDevelopment')}</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{t('realBenefits')}</h3>
              <p className="text-gray-600">{t('healthBenefitsOverCash')}</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{t('fullTransparency')}</h3>
              <p className="text-gray-600">{t('completeVisibilityTrust')}</p>
            </div>
          </div>

          {/* Detailed Features */}
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-l-4 border-l-primary">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>{t('inclusiveInvestment')}</CardTitle>
                <CardDescription>
                  {t('inclusiveInvestmentDesc')}
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-l-4 border-l-green-500">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle>{t('phasedDisbursement')}</CardTitle>
                <CardDescription>
                  {t('phasedDisbursementDesc')}
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-l-4 border-l-accent">
              <CardHeader>
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <Heart className="h-6 w-6 text-accent" />
                </div>
                <CardTitle>{t('healthyReturns')}</CardTitle>
                <CardDescription>
                  {t('healthyReturnsDesc')}
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-l-4 border-l-blue-500">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Globe className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>{t('languageAccessibility')}</CardTitle>
                <CardDescription>
                  {t('languageAccessibilityDesc')}
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Dashboard Features Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t('transparentDashboards')}</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t('transparentDashboardsDesc')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="p-6 border-2 border-green-200 bg-green-50">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <Leaf className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-green-800">{t('farmersDashboard')}</h3>
                <p className="text-green-700">{t('farmersDashboardDesc')}</p>
                <div className="flex items-center text-green-600">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  <span className="text-sm">{t('realTimeCropMonitoring')}</span>
                </div>
                <div className="flex items-center text-green-600">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  <span className="text-sm">{t('transactionHistory')}</span>
                </div>
                <div className="flex items-center text-green-600">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  <span className="text-sm">{t('profitTracking')}</span>
                </div>
              </CardContent>
            </Card>

            <Card className="p-6 border-2 border-primary bg-primary/5">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <TrendingUp className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-primary">{t('investorsDashboard')}</h3>
                <p className="text-primary/80">{t('investorsDashboardDesc')}</p>
                <div className="flex items-center text-primary">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  <span className="text-sm">{t('investmentGrowthTracking')}</span>
                </div>
                <div className="flex items-center text-primary">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  <span className="text-sm">{t('discountBenefitsOverview')}</span>
                </div>
                <div className="flex items-center text-primary">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  <span className="text-sm">{t('portfolioAnalytics')}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Mission Statement Section */}
      <section className="py-20 px-4 bg-primary text-white">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-8">
              <Target className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-4xl font-bold mb-6">{t('ourMission')}</h2>
            <p className="text-xl text-primary-foreground/90 leading-relaxed">
              {t('missionStatement')}
            </p>
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
                <li><a href="/investor-login" className="hover:text-white">{t('forInvestors')}</a></li>
                <li><a href="/farmer-login" className="hover:text-white">{t('forFarmers')}</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{t('company')}</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="/about" className="hover:text-white">{t('aboutUs')}</a></li>
                <li><a href="/contact" className="hover:text-white">{t('contact')}</a></li>
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
