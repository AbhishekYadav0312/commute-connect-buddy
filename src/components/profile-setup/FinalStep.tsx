
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { User } from 'lucide-react';
import { StepProps } from './types';

const FinalStep = ({ formData, updateFormData, updateNestedFormData }: StepProps) => {
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
};

export default FinalStep;
