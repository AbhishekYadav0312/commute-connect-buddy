
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import UserTypeStep from './profile-setup/UserTypeStep';
import CommuteRouteStep from './profile-setup/CommuteRouteStep';
import VehiclePreferencesStep from './profile-setup/VehiclePreferencesStep';
import FinalStep from './profile-setup/FinalStep';
import { ProfileSetupProps, FormData } from './profile-setup/types';
import { getInitialFormData, saveProfileData } from './profile-setup/utils';

const ProfileSetup = ({ user, onComplete }: ProfileSetupProps) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(getInitialFormData());
  const { toast } = useToast();

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      handleComplete();
    }
  };

  const handleComplete = () => {
    saveProfileData(user, formData, onComplete);
    
    toast({
      title: "Profile Complete!",
      description: "Your profile has been set up successfully.",
    });
  };

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const updateNestedFormData = (parent: string, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [parent]: { ...prev[parent as keyof FormData], [field]: value }
    }));
  };

  const renderStep = () => {
    const stepProps = { formData, updateFormData, updateNestedFormData };
    
    switch (step) {
      case 1:
        return <UserTypeStep {...stepProps} />;
      case 2:
        return <CommuteRouteStep {...stepProps} />;
      case 3:
        return <VehiclePreferencesStep {...stepProps} />;
      case 4:
        return <FinalStep {...stepProps} />;
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
