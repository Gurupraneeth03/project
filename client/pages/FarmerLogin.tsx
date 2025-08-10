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
import { Eye, EyeOff, Upload, Sprout, ArrowLeft, Camera, AlertCircle, Loader2 } from "lucide-react";

export default function FarmerLogin() {
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
    contact: "",
    password: ""
  });
  const [registerForm, setRegisterForm] = useState({
    fullName: "",
    aadhaarNumber: "",
    mobile: "",
    email: "",
    village: "",
    district: "",
    state: "",
    farmingType: "",
    landSize: "",
    accountNumber: "",
    ifscCode: "",
    bankName: "",
    password: "",
    confirmPassword: ""
  });

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await authenticateUser(loginForm.contact, loginForm.password);

      if (response.success && response.user) {
        // Check if user is a farmer
        if (response.user.type !== 'farmer') {
          setError(t('accessDenied'));
          setIsLoading(false);
          return;
        }

        login(response.user);
        navigate('/farmer-dashboard');
      } else {
        setError(response.error || t('loginFailed'));
      }
    } catch (err) {
      setError(t('unexpectedError'));
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
      setError(t('passwordsDontMatch'));
      setIsLoading(false);
      return;
    }

    if (registerForm.password.length < 6) {
      setError(t('passwordTooShort'));
      setIsLoading(false);
      return;
    }

    try {
      const response = await registerUser({
        ...registerForm,
        type: 'farmer',
        email: registerForm.email || registerForm.mobile + '@farmers.agrofina.in'
      });

      if (response.success) {
        setSuccess(t('registrationSuccessful'));
        setIsRegistering(false);
        setRegisterForm({
          fullName: "",
          aadhaarNumber: "",
          mobile: "",
          email: "",
          village: "",
          district: "",
          state: "",
          farmingType: "",
          landSize: "",
          accountNumber: "",
          ifscCode: "",
          bankName: "",
          password: "",
          confirmPassword: ""
        });
      } else {
        setError(response.error || t('registrationFailed'));
      }
    } catch (err) {
      setError(t('unexpectedError'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoCredentials = (email: string, password: string) => {
    setLoginForm({ contact: email, password });
  };

  const handleFileUpload = (type: string) => {
    // Handle file upload logic
    console.log("Uploading", type);
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
              userType="farmer"
              onCredentialSelect={handleDemoCredentials}
            />
          )}

          <Card>
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sprout className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl">
                {isRegistering ? t('farmerRegistrationTitle') : t('farmerLoginTitle')}
              </CardTitle>
              <CardDescription>
                {isRegistering ? t('farmerRegistrationDescription') : t('farmerDashboardDescription')}
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
                      <Label htmlFor="contact">{t('phoneNumber')} / {t('emailAddress')} *</Label>
                      <Input
                        id="contact"
                        value={loginForm.contact}
                        onChange={(e) => setLoginForm({...loginForm, contact: e.target.value})}
                        placeholder="9876543210 or farmer@example.com"
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
                          <Label htmlFor="aadhaarNumber">{t('aadhaarNumber')} *</Label>
                          <Input
                            id="aadhaarNumber"
                            value={registerForm.aadhaarNumber}
                            onChange={(e) => setRegisterForm({...registerForm, aadhaarNumber: e.target.value})}
                            placeholder="1234 5678 9012"
                            maxLength={14}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="mobile">{t('mobileNumber')} *</Label>
                          <Input
                            id="mobile"
                            type="tel"
                            value={registerForm.mobile}
                            onChange={(e) => setRegisterForm({...registerForm, mobile: e.target.value})}
                            placeholder="+91 9876543210"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="email">{t('emailOptional')}</Label>
                        <Input
                          id="email"
                          type="email"
                          value={registerForm.email}
                          onChange={(e) => setRegisterForm({...registerForm, email: e.target.value})}
                          placeholder="farmer@example.com"
                        />
                      </div>
                    </div>

                    <Separator />

                    {/* Location Information */}
                    <div className="space-y-4">
                      <h4 className="font-medium text-gray-900">{t('locationDetails')}</h4>
                      
                      <div>
                        <Label htmlFor="village">{t('village')} *</Label>
                        <Input
                          id="village"
                          value={registerForm.village}
                          onChange={(e) => setRegisterForm({...registerForm, village: e.target.value})}
                          placeholder={t('villageName')}
                          required
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="district">{t('district')} *</Label>
                          <Input
                            id="district"
                            value={registerForm.district}
                            onChange={(e) => setRegisterForm({...registerForm, district: e.target.value})}
                            placeholder={t('districtName')}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="state">{t('state')} *</Label>
                          <Input
                            id="state"
                            value={registerForm.state}
                            onChange={(e) => setRegisterForm({...registerForm, state: e.target.value})}
                            placeholder={t('stateName')}
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <Separator />

                    {/* Farming Information */}
                    <div className="space-y-4">
                      <h4 className="font-medium text-gray-900">{t('farmingDetails')}</h4>
                      
                      <div>
                        <Label htmlFor="farmingType">{t('typeOfFarming')} *</Label>
                        <Select value={registerForm.farmingType} onValueChange={(value) => setRegisterForm({...registerForm, farmingType: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder={t('selectFarmingType')} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="vegetables">{t('vegetables')}</SelectItem>
                            <SelectItem value="grains">{t('grains')}</SelectItem>
                            <SelectItem value="fruits">{t('fruits')}</SelectItem>
                            <SelectItem value="cotton">{t('cotton')}</SelectItem>
                            <SelectItem value="sugarcane">{t('sugarcane')}</SelectItem>
                            <SelectItem value="mixed">{t('mixed')}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="landSize">{t('landSize')} *</Label>
                        <Input
                          id="landSize"
                          value={registerForm.landSize}
                          onChange={(e) => setRegisterForm({...registerForm, landSize: e.target.value})}
                          placeholder="5 acres / 2 hectares"
                          required
                        />
                      </div>
                    </div>

                    <Separator />

                    {/* Bank Details */}
                    <div className="space-y-4">
                      <h4 className="font-medium text-gray-900">{t('bankAccountDetails')}</h4>
                      
                      <div>
                        <Label htmlFor="accountNumber">{t('accountNumber')} *</Label>
                        <Input
                          id="accountNumber"
                          value={registerForm.accountNumber}
                          onChange={(e) => setRegisterForm({...registerForm, accountNumber: e.target.value})}
                          placeholder={t('accountNumber')}
                          required
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="ifscCode">{t('ifscCode')} *</Label>
                          <Input
                            id="ifscCode"
                            value={registerForm.ifscCode}
                            onChange={(e) => setRegisterForm({...registerForm, ifscCode: e.target.value.toUpperCase()})}
                            placeholder="IFSC0001234"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="bankName">{t('bankName')} *</Label>
                          <Input
                            id="bankName"
                            value={registerForm.bankName}
                            onChange={(e) => setRegisterForm({...registerForm, bankName: e.target.value})}
                            placeholder={t('bankName')}
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <Separator />

                    {/* File Uploads */}
                    <div className="space-y-4">
                      <h4 className="font-medium text-gray-900">{t('documentUpload')}</h4>
                      
                      <div>
                        <Label>{t('photoIdUpload')} *</Label>
                        <div className="mt-2">
                          <Button 
                            type="button" 
                            variant="outline" 
                            className="w-full"
                            onClick={() => handleFileUpload('photoId')}
                          >
                            <Upload className="h-4 w-4 mr-2" />
                            {t('uploadPhotoId')}
                          </Button>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          {t('supportedFormats')}: JPG, PNG, PDF ({t('maxSize')} 5MB)
                        </p>
                      </div>

                      <div>
                        <Label>{t('farmPhotos')}</Label>
                        <div className="mt-2">
                          <Button 
                            type="button" 
                            variant="outline" 
                            className="w-full"
                            onClick={() => handleFileUpload('farmPhotos')}
                          >
                            <Camera className="h-4 w-4 mr-2" />
                            {t('uploadFarmPhotos')}
                          </Button>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          {t('optional')} - {t('multipleFiles')}
                        </p>
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
