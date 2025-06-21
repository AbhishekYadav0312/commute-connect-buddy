
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Car, Music } from 'lucide-react';
import { StepProps } from './types';

const musicPreferences = ['Pop', 'Rock', 'Jazz', 'Classical', 'Hip-Hop', 'Electronic', 'Country', 'Silent'];

const VehiclePreferencesStep = ({ formData, updateNestedFormData }: StepProps) => {
  const toggleMusicPreference = (music: string) => {
    const currentMusic = formData.preferences.music;
    const newMusic = currentMusic.includes(music)
      ? currentMusic.filter(m => m !== music)
      : [...currentMusic, music];
    
    updateNestedFormData('preferences', 'music', newMusic);
  };

  if (formData.userType === 'driver') {
    return (
      <div className="space-y-6">
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
      </div>
    );
  }

  return (
    <div className="space-y-6">
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
    </div>
  );
};

export default VehiclePreferencesStep;
