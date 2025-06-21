
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight, ChevronLeft, Users, Shield, MapPin } from 'lucide-react';

interface OnboardingFlowProps {
  onComplete: () => void;
}

const OnboardingFlow = ({ onComplete }: OnboardingFlowProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      icon: Users,
      title: "Get Matched",
      subtitle: "Find your perfect commute companion",
      description: "Our smart matching algorithm connects you with fellow commuters on similar routes and schedules.",
      gradient: "from-blue-500 to-purple-600"
    },
    {
      icon: Shield,
      title: "Commute with Confidence",
      subtitle: "Safe, verified, and trusted rides",
      description: "All users are verified with ratings and reviews. Travel safely with our community of trusted commuters.",
      gradient: "from-purple-500 to-pink-600"
    },
    {
      icon: MapPin,
      title: "Enjoy the Trip",
      subtitle: "Save money, reduce emissions, make friends",
      description: "Share costs, reduce your carbon footprint, and enjoy great conversations during your daily commute.",
      gradient: "from-teal-500 to-blue-600"
    }
  ];

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onComplete();
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const currentSlideData = slides[currentSlide];
  const IconComponent = currentSlideData.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md mx-auto shadow-2xl border-0 overflow-hidden">
        <CardContent className="p-0">
          <div className={`bg-gradient-to-br ${currentSlideData.gradient} p-8 text-white text-center relative`}>
            <div className="absolute top-4 right-4 text-sm opacity-75">
              {currentSlide + 1}/{slides.length}
            </div>
            <div className="mb-6">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                <IconComponent size={40} className="text-white" />
              </div>
              <h2 className="text-2xl font-bold mb-2">{currentSlideData.title}</h2>
              <p className="text-lg opacity-90">{currentSlideData.subtitle}</p>
            </div>
          </div>
          
          <div className="p-8">
            <p className="text-gray-600 text-center mb-8 leading-relaxed">
              {currentSlideData.description}
            </p>
            
            <div className="flex justify-center mb-6">
              <div className="flex space-x-2">
                {slides.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentSlide ? 'bg-blue-500 w-6' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
            
            <div className="flex justify-between">
              <Button
                variant="ghost"
                onClick={prevSlide}
                disabled={currentSlide === 0}
                className="flex items-center space-x-2"
              >
                <ChevronLeft size={16} />
                <span>Back</span>
              </Button>
              
              <Button
                onClick={nextSlide}
                className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              >
                <span>{currentSlide === slides.length - 1 ? 'Get Started' : 'Next'}</span>
                <ChevronRight size={16} />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OnboardingFlow;
