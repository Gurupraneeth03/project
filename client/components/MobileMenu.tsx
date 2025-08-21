import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, X, Users, Sprout } from 'lucide-react';
import LanguageSelector from './LanguageSelector';
import { useLanguage } from '@/contexts/LanguageContext';

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();

  const closeMenu = () => setIsOpen(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-80">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <div className="rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 p-2">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2F249eb593ae8042aea627b1f968fdde64%2Fbe6be65d23c9462d99e03edbc31a696e?format=webp&width=800"
                  alt="AgroFina Logo"
                  className="h-8 w-8 object-contain"
                />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                AgroFina
              </span>
            </div>
            <Button variant="ghost" size="sm" onClick={closeMenu}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          <nav className="flex-1 space-y-6">
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                Navigation
              </h3>
              <div className="space-y-2">
                <Link
                  to="/"
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors duration-200"
                  onClick={closeMenu}
                >
                  {t('home')}
                </Link>
                <Link
                  to="/about"
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors duration-200"
                  onClick={closeMenu}
                >
                  {t('about')}
                </Link>
                <Link
                  to="/contact"
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors duration-200"
                  onClick={closeMenu}
                >
                  {t('contact')}
                </Link>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                Language
              </h3>
              <div className="px-3">
                <LanguageSelector />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                Access
              </h3>
              <div className="space-y-3">
                <Link to="/investor-login" onClick={closeMenu}>
                  <Button variant="outline" className="w-full justify-start border-2 hover:bg-primary hover:text-white hover:border-primary transition-all duration-200">
                    <Users className="h-4 w-4 mr-3" />
                    {t('investorLogin')}
                  </Button>
                </Link>
                <Link to="/farmer-login" onClick={closeMenu}>
                  <Button className="w-full justify-start bg-gradient-to-r from-primary to-green-600 hover:from-primary/90 hover:to-green-600/90 shadow-md hover:shadow-lg transition-all duration-200">
                    <Sprout className="h-4 w-4 mr-3" />
                    {t('farmerLogin')}
                  </Button>
                </Link>
              </div>
            </div>
          </nav>

          <div className="pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center">
              © 2024 AgroFina. All rights reserved.
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
