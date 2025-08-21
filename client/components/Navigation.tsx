import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Users, Sprout } from "lucide-react";
import LanguageSelector from "@/components/LanguageSelector";
import MobileMenu from "@/components/MobileMenu";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Navigation() {
  const { t } = useLanguage();

  return (
    <nav className="border-b border-gray-200 bg-white/95 backdrop-blur-md supports-[backdrop-filter]:bg-white/80 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 p-2 group-hover:scale-110 transition-transform duration-300">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F249eb593ae8042aea627b1f968fdde64%2Fbe6be65d23c9462d99e03edbc31a696e?format=webp&width=800"
                alt="AgroFina Logo"
                className="h-8 w-8 object-contain"
              />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              AgroFina
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-600 hover:text-primary transition-colors duration-200 font-medium">
              {t('home')}
            </Link>
            <Link to="/about" className="text-gray-600 hover:text-primary transition-colors duration-200 font-medium">
              {t('about')}
            </Link>
            <Link to="/contact" className="text-gray-600 hover:text-primary transition-colors duration-200 font-medium">
              {t('contact')}
            </Link>
          </div>

          {/* Language Selector and Login Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <LanguageSelector />
            <Link to="/investor-login">
              <Button variant="outline" size="sm" className="flex items-center space-x-2 border-2 hover:bg-primary hover:text-white hover:border-primary transition-all duration-200">
                <Users className="h-4 w-4" />
                <span className="hidden sm:inline">{t('investorLogin')}</span>
              </Button>
            </Link>
            <Link to="/farmer-login">
              <Button size="sm" className="flex items-center space-x-2 bg-gradient-to-r from-primary to-green-600 hover:from-primary/90 hover:to-green-600/90 shadow-md hover:shadow-lg transition-all duration-200">
                <Sprout className="h-4 w-4" />
                <span className="hidden sm:inline">{t('farmerLogin')}</span>
              </Button>
            </Link>
          </div>

          {/* Mobile Menu */}
          <MobileMenu />
        </div>
      </div>
    </nav>
  );
}
