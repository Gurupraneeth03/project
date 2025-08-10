import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Building,
  Edit,
  Save,
  X,
  Camera,
  Shield,
  CreditCard,
  FileText,
  Banknote,
  Building2,
  Sprout,
  TrendingUp,
  Calendar
} from 'lucide-react';

export default function Profile() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    // Common fields
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    
    // Location details
    city: (user as any)?.city || '',
    state: (user as any)?.state || '',
    village: (user as any)?.village || '',
    district: (user as any)?.district || '',
    pincode: (user as any)?.pincode || '',
    address: (user as any)?.address || '',
    
    // Farmer specific fields
    aadhaarNumber: (user as any)?.aadhaarNumber || '',
    landSize: (user as any)?.landSize || '',
    farmingType: (user as any)?.farmingType || '',
    bankAccountNumber: (user as any)?.bankAccountNumber || '',
    ifscCode: (user as any)?.ifscCode || '',
    bankName: (user as any)?.bankName || '',
    
    // Investor specific fields
    panNumber: (user as any)?.panNumber || '',
    occupation: (user as any)?.occupation || '',
    upiId: (user as any)?.upiId || '',
    paymentMethod: (user as any)?.paymentMethod || '',
    
    // Profile details
    profileImage: (user as any)?.profileImage || '',
    language: (user as any)?.language || 'English'
  });

  const handleSave = () => {
    // In a real app, this would update the user profile
    console.log('Saving profile:', formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      city: (user as any)?.city || '',
      state: (user as any)?.state || '',
      village: (user as any)?.village || '',
      district: (user as any)?.district || '',
      pincode: (user as any)?.pincode || '',
      address: (user as any)?.address || '',
      aadhaarNumber: (user as any)?.aadhaarNumber || '',
      landSize: (user as any)?.landSize || '',
      farmingType: (user as any)?.farmingType || '',
      bankAccountNumber: (user as any)?.bankAccountNumber || '',
      ifscCode: (user as any)?.ifscCode || '',
      bankName: (user as any)?.bankName || '',
      panNumber: (user as any)?.panNumber || '',
      occupation: (user as any)?.occupation || '',
      upiId: (user as any)?.upiId || '',
      paymentMethod: (user as any)?.paymentMethod || '',
      profileImage: (user as any)?.profileImage || '',
      language: (user as any)?.language || 'English'
    });
    setIsEditing(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          {t('profile')}
        </h1>
        <p className="text-gray-600 mt-2">
          Manage Your Account Information And Settings
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Overview */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="relative w-24 h-24 mx-auto mb-4">
                <div className="w-24 h-24 bg-primary text-white rounded-full flex items-center justify-center text-3xl">
                  {formData.profileImage || (user?.type === 'investor' ? '👤' : '🌾')}
                </div>
                <Button size="sm" variant="outline" className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full p-0">
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
                
              <h3 className="text-xl font-semibold">{user?.name}</h3>
              <Badge variant={user?.type === 'investor' ? 'default' : 'secondary'} className="mt-2">
                {user?.type === 'investor' ? 'Investor' : 'Farmer'}
              </Badge>

              <div className="mt-6 space-y-2 text-sm">
                <div className="flex items-center justify-center space-x-2">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <span>{user?.email}</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <span>{formData.phone || 'Not Provided'}</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span>{formData.city || formData.village || 'Location Not Set'}</span>
                </div>
              </div>

              {/* Profile Statistics */}
              <div className="mt-6 pt-6 border-t">
                {user?.type === 'farmer' ? (
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="flex items-center justify-center mb-2">
                        <Sprout className="h-5 w-5 text-green-600" />
                      </div>
                      <p className="text-2xl font-bold text-green-600">3</p>
                      <p className="text-xs text-gray-600">Active Crops</p>
                    </div>
                    <div>
                      <div className="flex items-center justify-center mb-2">
                        <TrendingUp className="h-5 w-5 text-blue-600" />
                      </div>
                      <p className="text-2xl font-bold text-blue-600">8</p>
                      <p className="text-xs text-gray-600">Harvests</p>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="flex items-center justify-center mb-2">
                        <TrendingUp className="h-5 w-5 text-primary" />
                      </div>
                      <p className="text-2xl font-bold text-primary">5</p>
                      <p className="text-xs text-gray-600">Investments</p>
                    </div>
                    <div>
                      <div className="flex items-center justify-center mb-2">
                        <Calendar className="h-5 w-5 text-purple-600" />
                      </div>
                      <p className="text-2xl font-bold text-purple-600">2+</p>
                      <p className="text-xs text-gray-600">Years Active</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Profile Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>Personal Information</span>
              </CardTitle>
              {!isEditing && (
                <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              )}
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    disabled={!isEditing}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <Label htmlFor="language">Preferred Language</Label>
                  <Input
                    id="language"
                    value={formData.language}
                    onChange={(e) => setFormData({...formData, language: e.target.value})}
                    disabled={!isEditing}
                  />
                </div>
              </div>

              {/* Identity Documents */}
              <Separator />
              <div>
                <h4 className="font-medium mb-3">Identity Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {user?.type === 'farmer' ? (
                    <div>
                      <Label htmlFor="aadhaar">Aadhaar Number</Label>
                      <Input
                        id="aadhaar"
                        value={formData.aadhaarNumber}
                        onChange={(e) => setFormData({...formData, aadhaarNumber: e.target.value})}
                        disabled={!isEditing}
                        placeholder="XXXX XXXX XXXX"
                      />
                    </div>
                  ) : (
                    <div>
                      <Label htmlFor="pan">PAN Number</Label>
                      <Input
                        id="pan"
                        value={formData.panNumber}
                        onChange={(e) => setFormData({...formData, panNumber: e.target.value})}
                        disabled={!isEditing}
                        placeholder="ABCDE1234F"
                      />
                    </div>
                  )}
                  {user?.type === 'investor' && (
                    <div>
                      <Label htmlFor="occupation">Occupation</Label>
                      <Input
                        id="occupation"
                        value={formData.occupation}
                        onChange={(e) => setFormData({...formData, occupation: e.target.value})}
                        disabled={!isEditing}
                      />
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Location Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="h-5 w-5" />
                <span>Location Details</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {user?.type === 'farmer' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="village">Village</Label>
                    <Input
                      id="village"
                      value={formData.village}
                      onChange={(e) => setFormData({...formData, village: e.target.value})}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="district">District</Label>
                    <Input
                      id="district"
                      value={formData.district}
                      onChange={(e) => setFormData({...formData, district: e.target.value})}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      value={formData.state}
                      onChange={(e) => setFormData({...formData, state: e.target.value})}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="pincode">Pincode</Label>
                    <Input
                      id="pincode"
                      value={formData.pincode}
                      onChange={(e) => setFormData({...formData, pincode: e.target.value})}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => setFormData({...formData, address: e.target.value})}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => setFormData({...formData, city: e.target.value})}
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <Label htmlFor="state">State</Label>
                      <Input
                        id="state"
                        value={formData.state}
                        onChange={(e) => setFormData({...formData, state: e.target.value})}
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <Label htmlFor="pincode">Pincode</Label>
                      <Input
                        id="pincode"
                        value={formData.pincode}
                        onChange={(e) => setFormData({...formData, pincode: e.target.value})}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Professional/Farming Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                {user?.type === 'farmer' ? <Sprout className="h-5 w-5" /> : <Building className="h-5 w-5" />}
                <span>{user?.type === 'farmer' ? 'Farming Details' : 'Professional Information'}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {user?.type === 'farmer' ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="landSize">Land Size</Label>
                      <Input
                        id="landSize"
                        value={formData.landSize}
                        onChange={(e) => setFormData({...formData, landSize: e.target.value})}
                        disabled={!isEditing}
                        placeholder="5 acres"
                      />
                    </div>
                    <div>
                      <Label htmlFor="farmingType">Type Of Farming</Label>
                      <Input
                        id="farmingType"
                        value={formData.farmingType}
                        onChange={(e) => setFormData({...formData, farmingType: e.target.value})}
                        disabled={!isEditing}
                        placeholder="Organic Vegetables"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="occupation">Occupation</Label>
                    <Input
                      id="occupation"
                      value={formData.occupation}
                      onChange={(e) => setFormData({...formData, occupation: e.target.value})}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Financial Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                {user?.type === 'farmer' ? <Banknote className="h-5 w-5" /> : <CreditCard className="h-5 w-5" />}
                <span>{user?.type === 'farmer' ? 'Bank Account Details' : 'Payment Information'}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {user?.type === 'farmer' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="bankName">Bank Name</Label>
                    <Input
                      id="bankName"
                      value={formData.bankName}
                      onChange={(e) => setFormData({...formData, bankName: e.target.value})}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="accountNumber">Account Number</Label>
                    <Input
                      id="accountNumber"
                      value={formData.bankAccountNumber}
                      onChange={(e) => setFormData({...formData, bankAccountNumber: e.target.value})}
                      disabled={!isEditing}
                      placeholder="XXXX XXXX XXXX"
                    />
                  </div>
                  <div>
                    <Label htmlFor="ifsc">IFSC Code</Label>
                    <Input
                      id="ifsc"
                      value={formData.ifscCode}
                      onChange={(e) => setFormData({...formData, ifscCode: e.target.value})}
                      disabled={!isEditing}
                      placeholder="ABCD0123456"
                    />
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="paymentMethod">Preferred Payment Method</Label>
                    <Input
                      id="paymentMethod"
                      value={formData.paymentMethod}
                      onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="upi">UPI ID</Label>
                    <Input
                      id="upi"
                      value={formData.upiId}
                      onChange={(e) => setFormData({...formData, upiId: e.target.value})}
                      disabled={!isEditing}
                      placeholder="user@paytm"
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Account Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span>Account Status</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center justify-center mb-2">
                    <Shield className="h-6 w-6 text-green-600" />
                  </div>
                  <p className="font-medium text-green-700">Verified</p>
                  <p className="text-sm text-green-600">Identity Verified</p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center justify-center mb-2">
                    <FileText className="h-6 w-6 text-blue-600" />
                  </div>
                  <p className="font-medium text-blue-700">KYC Complete</p>
                  <p className="text-sm text-blue-600">Documents Approved</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="flex items-center justify-center mb-2">
                    <Badge variant="default">Verified</Badge>
                  </div>
                  <p className="font-medium text-purple-700">Active</p>
                  <p className="text-sm text-purple-600">Account Status</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Edit Actions */}
          {isEditing && (
            <div className="flex justify-end space-x-4">
              <Button variant="outline" onClick={handleCancel}>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
              <Button onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
