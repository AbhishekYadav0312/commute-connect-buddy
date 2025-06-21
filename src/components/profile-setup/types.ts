
export interface FormData {
  userType: string;
  workLocation: string;
  homeLocation: string;
  workHours: { start: string; end: string };
  vehicleInfo: { make: string; model: string; year: string; color: string; seats: string };
  preferences: {
    music: string[];
    smoking: boolean;
    pets: boolean;
    gender: string;
  };
  bio: string;
}

export interface ProfileSetupProps {
  user: any;
  onComplete: () => void;
}

export interface StepProps {
  formData: FormData;
  updateFormData: (field: string, value: any) => void;
  updateNestedFormData: (parent: string, field: string, value: any) => void;
}
