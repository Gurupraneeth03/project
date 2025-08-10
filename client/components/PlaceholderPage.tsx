import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Construction } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

interface PlaceholderPageProps {
  title: string;
  description: string;
  suggestedAction?: string;
}

export default function PlaceholderPage({ title, description, suggestedAction }: PlaceholderPageProps) {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-yellow-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-2xl mx-auto text-center">
          <Card>
            <CardHeader className="pb-4">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Construction className="h-8 w-8 text-yellow-600" />
              </div>
              <CardTitle className="text-2xl">{title}</CardTitle>
              <CardDescription className="text-base">
                {description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-6">
                {suggestedAction || (t('language') === 'te' ? 'ఈ పేజీ ప్రస్తుతం అభివృద్ధిలో ఉంది. ప్లాట్‌ఫామ్ యొక్క ఈ విభాగాన్ని నిర్మించడంలో సహాయపడటానికి దయచేసి ప్రాంప్ట్ చేయడం కొనసాగించండి.' : 'This page is currently under development. Please continue prompting to help us build out this section of the platform.')}
              </p>
              <Link to="/">
                <Button className="flex items-center space-x-2">
                  <ArrowLeft className="h-4 w-4" />
                  <span>{t('home')}</span>
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
