
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Car, User, Users } from 'lucide-react';
import { StepProps } from './types';

const UserTypeStep = ({ formData, updateFormData }: StepProps) => {
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
          <RadioGroupItem value="driver" id="driver" />
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
          <RadioGroupItem value="rider" id="rider" />
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
};

export default UserTypeStep;
