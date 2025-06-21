
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup,

Content } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Car, User, MapPin, Clock, Music, Users } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface ProfileSetupProps {
  user: any;
  onComplete: () => void;
}

const ProfileSetup = ({ user, onComplete }: ProfileSetupProps) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    userType: '',
    workLocation: '',
    homeLocation: '',
    workHours: { start: '', end: '' },
    vehicleInfo: { make: '', model: '', year: '', color: '', seats: '' },
    preferences: {
      music: [],
      smoking: false,
      pets: false,
      gender: ''
    },
    bio: ''
  });
  const { toast } = useToast();

  const musicPreferences = ['Pop', 'Rock', 'Jazz', 'Classical', 'Hip-Hop', 'Electronic', 'Country', 'Silent'];

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      handleComplete();
    }
  };

  const handleComplete = () => {
    // Save profile data
    const updatedUser = { ...user, profileComplete: true, ...formData };
    localStorage.setItem('commutemate_user', JSON.stringify(updatedUser));
    
    toast({
      title: "Profile Complete!",
      description: "Your profile has been set up successfully.",
    });
    
    onComplete();
  };

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const updateNestedFormData = (parent: string, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [parent]: { ...prev[parent], [field]: value }
    }));
  };

  const toggleMusicPreference = (music: string) => {
    const currentMusic = formData.preferences.music;
    const newMusic = currentMusic.includes(music)
      ? currentMusic.filter(m => m !== music)
      : [...currentMusic, music];
    
    updateNestedFormData('preferences', 'music', newMusic);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <User size={48} className="mx-auto text-blue-500 mb-4" />
              <h2 className="text-2xl font-bold">Tell us about yourself</h2>
              <p className="text-gray-600">Are you looking to drive or catch a ride?</p>
            </div>
            
            <RadioGroup 
              value={formData.userType} 
              onValueChange={(value) => updateFormData('userType', value)}
              className="space-y-4"
            >
              <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <input type="radio" value="driver" id="driver" className="hidden" />
                <div className="flex-1">
                  <Label htmlFor="driver" className="cursor-pointer">
                    <div className="flex items-center space-x-3">
                      <Car size={24} className="text-blue-500" />
                      <div>
                        <h3 className="font-semibold">I'm a Driver</h3>
                        <p className="text-sm text-gray-600">I have a car and want to share rides</p>
                      </div>
                    </div>
                  </Label>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <input type="radio" value="rider" id="rider" className="hidden" />
                <div className="flex-1">
                  <Label htmlFor="rider" className="cursor-pointer">
                    <div className="flex items-center space-x-3">
                      <Users size={24} className="text-purple-500" />
                      <div>
                        <h3 className="font-semibold">I'm a Rider</h3>
                        <p className="text-sm text-gray-600">I need rides to get to work</p>
                      </div>
                    </div>
                  </Label>
                </div>
              </div>
            </RadioGroup>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <MapPin size={48} className="mx-auto text-blue-500 mb-4" />
              <h2 className="text-2xl font-bold">Your commute route</h2>
              <p className="text-gray-600">Help us find the best matches for you</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="home">Home Location</Label>
                <Input
                  id="home"
                  placeholder="Enter your home address"
                  value={formData.homeLocation}
                  onChange={(e) => updateFormData('homeLocation', e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="work">Work Location</Label>
                <Input
                  id="work"
                  placeholder="Enter your work address"
                  value={formData.workLocation}
                  onChange={(e) => updateFormData('workLocation', e.target.value)}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="start-time">Start Time</Label>
                  <Input
                    id="start-time"
                    type="time"
                    value={formData.workHours.start}
                    onChange={(e) => updateNestedFormData('workHours', 'start', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="end-time">End Time</Label>
                  <Input
                    id="end-time"
                    type="time"
                    value={formData.workHours.end}
                    onChange={(e) => updateNestedFormData('workHours', 'end', e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            {formData.userType === 'driver' ? (
              <>
                <div className="text-center mb-6">
                  <Car size={48} className="mx-auto text-blue-500 mb-4" />
                  <h2 className="text-2xl font-bold">Your vehicle</h2>
                  <p className="text-gray-600">Tell us about your car</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="make">Make</Label>
                    <Input
                      id="make"
                      placeholder="Toyota"
                      value={formData.vehicleInfo.make}
                      onChange={(e) => updateNestedFormData('vehicleInfo', 'make', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="model">Model</Label>
                    <Input
                      id="model"
                      placeholder="Prius"
                      value={formData.vehicleInfo.model}
                      onChange={(e) => updateNestedFormData('vehicleInfo', 'model', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="year">Year</Label>
                    <Input
                      id="year"
                      placeholder="2020"
                      value={formData.vehicleInfo.year}
                      onChange={(e) => updateNestedFormData('vehicleInfo', 'year', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="color">Color</Label>
                    <Input
                      id="color"
                      placeholder="Silver"
                      value={formData.vehicleInfo.color}
                      onChange={(e) => updateNestedFormData('vehicleInfo', 'color', e.target.value)}
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="seats">Available seats for passengers</Label>
                  <Input
                    id="seats"
                    type="number"
                    min="1"
                    max="7"
                    placeholder="3"
                    value={formData.vehicleInfo.seats}
                    onChange={(e) => updateNestedFormData('vehicleInfo', 'seats', e.target.value)}
                  />
                </div>
              </>
            ) : (
              <>
                <div className="text-center mb-6">
                  <Music size={48} className="mx-auto text-blue-500 mb-4" />
                  <h2 className="text-2xl font-bold">Your preferences</h2>
                  <p className="text-gray-600">Help us match you with compatible drivers</p>
                </div>
                
                <div>
                  <Label>Music preferences (select all that apply)</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {musicPreferences.map((music) => (
                      <Badge
                        key={music}
                        variant={formData.preferences.music.includes(music) ? "default" : "outline"}
                        className="cursor-pointer justify-center py-2"
                        onClick={() => toggleMusicPreference(music)}
                      >
                        {music}
                      </Badge>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <User size={48} className="mx-auto text-blue-500 mb-4" />
              <h2 className="text-2xl font-bold">Almost done!</h2>
              <p className="text-gray-600">Add a personal touch to your profile</p>
            </div>
            
            <div>
              <Label htmlFor="bio">Tell others about yourself (optional)</Label>
              <Textarea
                id="bio"
                placeholder="I'm a friendly commuter who enjoys good conversation and punctuality..."
                value={formData.bio}
                onChange={(e) => updateFormData('bio', e.target.value)}
                className="mt-2"
              />
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="no-smoking"
                  checked={!formData.preferences.smoking}
                  onCheckedChange={(checked) => updateNestedFormData('preferences', 'smoking', !checked)}
                />
                <Label htmlFor="no-smoking">No smoking preference</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="no-pets"
                  checked={!formData.preferences.pets}
                  onCheckedChange={(checked) => updateNestedFormData('preferences', 'pets', !checked)}
                />
                <Label htmlFor="no-pets">No pets preference</Label>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl mx-auto shadow-2xl border-0">
        <CardHeader className="text-center">
          <div className="flex justify-center space-x-2 mb-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  i <= step
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {i}
              </div>
            ))}
          </div>
          <CardTitle>Profile Setup</CardTitle>
          <p className="text-gray-600">Step {step} of 4</p>
        </CardHeader>
        
        <CardContent>
          {renderStep()}
          
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={() => setStep(step - 1)}
              disabled={step === 1}
            >
              Back
            </Button>
            
            <Button
              onClick={handleNext}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              disabled={step === 1 && !formData.userType}
            >
              {step === 4 ? 'Complete Profile' : 'Next'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileSetup;
