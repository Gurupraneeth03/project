import { useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock,
  Send,
  CheckCircle,
  AlertCircle
} from "lucide-react";

export default function Contact() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate form submission - in real implementation, send to your backend
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // For now, we'll just show success message
      setSubmitStatus('success');
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      
      // Clear status after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-yellow-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Badge className="mb-6 bg-primary/10 text-primary hover:bg-primary/20">
            {t('contactUs')}
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            {t('getInTouch')}
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            {t('contactUsDescription')}
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('contactInfo')}</h2>
                <p className="text-gray-600 mb-8">
                  {t('ourOffice')}
                </p>
              </div>

              <div className="space-y-6">
                {/* Address */}
                <Card className="p-6 border-l-4 border-l-primary">
                  <CardContent className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">{t('address')}</h3>
                      <p className="text-gray-600 whitespace-pre-line">
                        {t('companyAddress')}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Phone */}
                <Card className="p-6 border-l-4 border-l-green-500">
                  <CardContent className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">{t('phone')}</h3>
                      <p className="text-gray-600">
                        <a href={`tel:${t('contactPhoneNumber')}`} className="hover:text-primary transition-colors">
                          {t('contactPhoneNumber')}
                        </a>
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Email */}
                <Card className="p-6 border-l-4 border-l-accent">
                  <CardContent className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">{t('email')}</h3>
                      <p className="text-gray-600">
                        <a href={`mailto:${t('contactEmailAddress')}`} className="hover:text-primary transition-colors">
                          {t('contactEmailAddress')}
                        </a>
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Working Hours */}
                <Card className="p-6 border-l-4 border-l-blue-500">
                  <CardContent className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">{t('workingHours')}</h3>
                      <p className="text-gray-600">{t('hoursInfo')}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <Card className="p-8 shadow-lg">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{t('sendMessage')}</CardTitle>
                  <CardDescription>
                    {t('contactForm')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Status Messages */}
                  {submitStatus === 'success' && (
                    <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <p className="text-green-800 text-sm">{t('successMessage')}</p>
                    </div>
                  )}
                  
                  {submitStatus === 'error' && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-3">
                      <AlertCircle className="h-5 w-5 text-red-600" />
                      <p className="text-red-800 text-sm">{t('errorMessage')}</p>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name */}
                    <div>
                      <Label htmlFor="name">{t('name')} *</Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Ramesh"
                        required
                        className="mt-1"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <Label htmlFor="email">{t('emailAddress')} *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your.email@example.com"
                        required
                        className="mt-1"
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <Label htmlFor="phone">{t('phoneNumber')}</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+91 98765 43210"
                        className="mt-1"
                      />
                    </div>

                    {/* Message */}
                    <div>
                      <Label htmlFor="message">{t('message')} *</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Tell us how we can help you..."
                        required
                        rows={5}
                        className="mt-1"
                      />
                    </div>

                    {/* Submit Button */}
                    <Button 
                      type="submit" 
                      className="w-full" 
                      size="lg"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>{t('sending')}</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <Send className="h-4 w-4" />
                          <span>{t('sendButton')}</span>
                        </div>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
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
