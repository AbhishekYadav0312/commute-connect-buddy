
import { FormData } from './types';

export const getInitialFormData = (): FormData => ({
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

export const saveProfileData = (user: any, formData: FormData, onComplete: () => void) => {
  const updatedUser = { ...user, profileComplete: true, ...formData };
  localStorage.setItem('commutemate_user', JSON.stringify(updatedUser));
  onComplete();
};
