import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { authenticateUser, registerUser } from "@/services/authService";
import DemoCredentials from "@/components/DemoCredentials";
import { Eye, EyeOff, Upload, Users, ArrowLeft, AlertCircle, Loader2 } from "lucide-react";

export default function InvestorLogin() {
  const { t } = useLanguage();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: ""
  });
  const [registerForm, setRegisterForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    panNumber: "",
    occupation: "",
    language: "en",
    address: "",
    city: "",
    state: "",
    pincode: "",
    upiId: "",
    password: "",
    confirmPassword: ""
  });

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await authenticateUser(loginForm.email, loginForm.password);

      if (response.success && response.user) {
        // Check if user is an investor
        if (response.user.type !== 'investor') {
          setError(t('accessDeniedInvestor'));
          setIsLoading(false);
          return;
        }

        login(response.user);
        navigate('/investor-dashboard');
      } else {
        setError(response.error || "Login failed");
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    // Validation
    if (registerForm.password !== registerForm.confirmPassword) {
      setError("Passwords don't match");
      setIsLoading(false);
      return;
    }

    if (registerForm.password.length < 6) {
      setError("Password must be at least 6 characters");
      setIsLoading(false);
      return;
    }

    try {
      const response = await registerUser({
        ...registerForm,
        type: 'investor'
      });

      if (response.success) {
        setSuccess("Registration successful! You can now login.");
        setIsRegistering(false);
        setRegisterForm({
          fullName: "",
          email: "",
          phone: "",
          panNumber: "",
          occupation: "",
          language: "en",
          address: "",
          city: "",
          state: "",
          pincode: "",
          upiId: "",
          password: "",
          confirmPassword: ""
        });
      } else {
        setError(response.error || "Registration failed");
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoCredentials = (email: string, password: string) => {
    setLoginForm({ email, password });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-yellow-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link to="/">
            <Button variant="outline" className="flex items-center space-x-2">
              <ArrowLeft className="h-4 w-4" />
              <span>{t('home')}</span>
            </Button>
          </Link>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Demo Credentials */}
          {!isRegistering && (
            <DemoCredentials
              userType="investor"
              onCredentialSelect={handleDemoCredentials}
            />
          )}

          <Card>
            <CardHeader className="text-center" style={{marginBottom: "-5px"}}>
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">
                {isRegistering ? t('investorRegistrationTitle') : t('investorLoginTitle')}
              </CardTitle>
              <CardDescription>
                {isRegistering ? t('completeRegistrationDetails') : t('investorDashboardDescription')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Error and Success Messages */}
              {error && (
                <Alert variant="destructive" className="mb-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {success && (
                <Alert className="mb-4 border-green-200 bg-green-50">
                  <AlertCircle className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800">{success}</AlertDescription>
                </Alert>
              )}

              {!isRegistering ? (
                <div className="space-y-6">
                  <form onSubmit={handleLoginSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="email">{t('emailAddress')} *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={loginForm.email}
                        onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                        placeholder="investor@example.com"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="password">{t('password')} *</Label>
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          value={loginForm.password}
                          onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                          placeholder="••••••••"
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>

                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          {t('signIn')}...
                        </>
                      ) : (
                        t('signIn')
                      )}
                    </Button>

                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">{t('or')}</span>
                      </div>
                    </div>

                    <Button type="button" variant="outline" className="w-full">
                      {t('otpLogin')}
                    </Button>
                  </form>

                  <div className="text-center">
                    <p className="text-sm text-gray-600">
                      {t('dontHaveAccount')}{" "}
                      <Button
                        variant="link"
                        className="p-0 h-auto"
                        onClick={() => setIsRegistering(true)}
                      >
                        {t('signUp')}
                      </Button>
                    </p>
                  </div>
                </div>
              ) : (

                <div className="space-y-6">

                  <form onSubmit={handleRegisterSubmit} className="space-y-4">
                    {/* Personal Information */}
                    <div className="space-y-4">
                      <h4 className="font-medium text-gray-900">{t('personalInformation')}</h4>
                      
                      <div>
                        <Label htmlFor="fullName">{t('fullName')} *</Label>
                        <Input
                          id="fullName"
                          value={registerForm.fullName}
                          onChange={(e) => setRegisterForm({...registerForm, fullName: e.target.value})}
                          placeholder="Ramesh"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="regEmail">{t('emailAddress')} *</Label>
                          <Input
                            id="regEmail"
                            type="email"
                            value={registerForm.email}
                            onChange={(e) => setRegisterForm({...registerForm, email: e.target.value})}
                            placeholder="investor@example.com"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone">{t('phoneNumber')} *</Label>
                          <Input
                            id="phone"
                            type="tel"
                            value={registerForm.phone}
                            onChange={(e) => setRegisterForm({...registerForm, phone: e.target.value})}
                            placeholder="+91 9876543210"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="panNumber">{t('panNumber')} *</Label>
                          <Input
                            id="panNumber"
                            value={registerForm.panNumber}
                            onChange={(e) => setRegisterForm({...registerForm, panNumber: e.target.value.toUpperCase()})}
                            placeholder="ABCDE1234F"
                            maxLength={10}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="occupation">{t('occupation')} *</Label>
                          <Input
                            id="occupation"
                            value={registerForm.occupation}
                            onChange={(e) => setRegisterForm({...registerForm, occupation: e.target.value})}
                            placeholder="Software Engineer"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="language">{t('preferredLanguage')}</Label>
                        <Select value={registerForm.language} onValueChange={(value) => setRegisterForm({...registerForm, language: value})}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="en">English</SelectItem>
                            <SelectItem value="te">తెలుగు</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <Separator />

                    {/* Address Information */}
                    <div className="space-y-4">
                      <h4 className="font-medium text-gray-900">{t('billingAddress')}</h4>
                      
                      <div>
                        <Label htmlFor="address">{t('address')} *</Label>
                        <Input
                          id="address"
                          value={registerForm.address}
                          onChange={(e) => setRegisterForm({...registerForm, address: e.target.value})}
                          placeholder="Street address, Building name, etc."
                          required
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="city">{t('city')} *</Label>
                          <Input
                            id="city"
                            value={registerForm.city}
                            onChange={(e) => setRegisterForm({...registerForm, city: e.target.value})}
                            placeholder="Hyderabad"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="state">{t('state')} *</Label>
                          <Input
                            id="state"
                            value={registerForm.state}
                            onChange={(e) => setRegisterForm({...registerForm, state: e.target.value})}
                            placeholder="Telangana"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="pincode">{t('pincode')} *</Label>
                          <Input
                            id="pincode"
                            value={registerForm.pincode}
                            onChange={(e) => setRegisterForm({...registerForm, pincode: e.target.value})}
                            placeholder="500001"
                            maxLength={6}
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <Separator />

                    {/* Payment Information */}
                    <div className="space-y-4">
                      <h4 className="font-medium text-gray-900">{t('paymentMethod')}</h4>
                      
                      <div>
                        <Label htmlFor="upiId">{t('upiId')} ({t('optional')})</Label>
                        <Input
                          id="upiId"
                          value={registerForm.upiId}
                          onChange={(e) => setRegisterForm({...registerForm, upiId: e.target.value})}
                          placeholder="investor@upi"
                        />
                      </div>
                    </div>

                    <Separator />

                    {/* Password */}
                    <div className="space-y-4">
                      <h4 className="font-medium text-gray-900">{t('accountSecurity')}</h4>
                      
                      <div>
                        <Label htmlFor="regPassword">{t('password')} *</Label>
                        <div className="relative">
                          <Input
                            id="regPassword"
                            type={showPassword ? "text" : "password"}
                            value={registerForm.password}
                            onChange={(e) => setRegisterForm({...registerForm, password: e.target.value})}
                            placeholder="••••••••"
                            required
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="confirmPassword">{t('confirmPassword')} *</Label>
                        <div className="relative">
                          <Input
                            id="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            value={registerForm.confirmPassword}
                            onChange={(e) => setRegisterForm({...registerForm, confirmPassword: e.target.value})}
                            placeholder="••••••••"
                            required
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          >
                            {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          {t('register')}...
                        </>
                      ) : (
                        t('register')
                      )}
                    </Button>
                  </form>

                  <div className="text-center">
                    <p className="text-sm text-gray-600">
                      {t('alreadyHaveAccount')}{" "}
                      <Button
                        variant="link"
                        className="p-0 h-auto"
                        onClick={() => setIsRegistering(false)}
                      >
                        {t('signIn')}
                      </Button>
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
