
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin } from 'lucide-react';
import { StepProps } from './types';

const CommuteRouteStep = ({ formData, updateFormData, updateNestedFormData }: StepProps) => {
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
};

export default CommuteRouteStep;
