import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Users, Sprout } from "lucide-react";
import LanguageSelector from "@/components/LanguageSelector";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Navigation() {
  const { t } = useLanguage();

  return (
    <nav className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="rounded-lg">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F249eb593ae8042aea627b1f968fdde64%2Fbe6be65d23c9462d99e03edbc31a696e?format=webp&width=800"
                alt="AgroFina Logo"
                className="h-10 w-10 object-contain"
              />
            </div>
            <span className="text-xl font-bold text-gray-900">
              AgroFina
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-600 hover:text-primary transition-colors">
              {t('home')}
            </Link>
            <Link to="/about" className="text-gray-600 hover:text-primary transition-colors">
              {t('about')}
            </Link>
            <Link to="/contact" className="text-gray-600 hover:text-primary transition-colors">
              {t('contact')}
            </Link>
          </div>

          {/* Language Selector and Login Buttons */}
          <div className="flex items-center space-x-3">
            <LanguageSelector />
            <Link to="/investor-login">
              <Button variant="outline" size="sm" className="flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <span>{t('investorLogin')}</span>
              </Button>
            </Link>
            <Link to="/farmer-login">
              <Button size="sm" className="flex items-center space-x-2">
                <Sprout className="h-4 w-4" />
                <span>{t('farmerLogin')}</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
