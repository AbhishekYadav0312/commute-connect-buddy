
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import OnboardingFlow from '@/components/OnboardingFlow';
import AuthForm from '@/components/AuthForm';
import Dashboard from '@/components/Dashboard';
import { Car, Users, MapPin, Star } from 'lucide-react';

const Index = () => {
  const [currentStep, setCurrentStep] = useState<'onboarding' | 'auth' | 'dashboard'>('onboarding');
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user has completed onboarding
    const hasCompletedOnboarding = localStorage.getItem('commutemate_onboarding_complete');
    const isLoggedIn = localStorage.getItem('commutemate_user');
    
    if (hasCompletedOnboarding && isLoggedIn) {
      setCurrentStep('dashboard');
      setUser(JSON.parse(isLoggedIn));
    } else if (hasCompletedOnboarding) {
      setCurrentStep('auth');
    }
  }, []);

  const handleOnboardingComplete = () => {
    localStorage.setItem('commutemate_onboarding_complete', 'true');
    setCurrentStep('auth');
  };

  const handleAuthSuccess = (userData: any) => {
    localStorage.setItem('commutemate_user', JSON.stringify(userData));
    setUser(userData);
    setCurrentStep('dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('commutemate_user');
    setUser(null);
    setCurrentStep('auth');
  };

  if (currentStep === 'onboarding') {
    return <OnboardingFlow onComplete={handleOnboardingComplete} />;
  }

  if (currentStep === 'auth') {
    return <AuthForm onAuthSuccess={handleAuthSuccess} />;
  }

  return <Dashboard user={user} onLogout={handleLogout} />;
};

export default Index;
