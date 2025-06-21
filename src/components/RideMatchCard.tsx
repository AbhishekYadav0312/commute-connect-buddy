
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star, MapPin, Clock, Users, DollarSign } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface RideMatchCardProps {
  ride: {
    id: number;
    driver: { name: string; rating: number; car: string };
    from: string;
    to: string;
    time: string;
    date: string;
    seats: number;
    price: string;
    matchScore: number;
  };
}

const RideMatchCard = ({ ride }: RideMatchCardProps) => {
  const { toast } = useToast();

  const handleBookRide = () => {
    toast({
      title: "Ride Request Sent!",
      description: `Your request to join ${ride.driver.name}'s ride has been sent.`,
    });
  };

  const getMatchScoreColor = (score: number) => {
    if (score >= 90) return "bg-green-100 text-green-800";
    if (score >= 80) return "bg-yellow-100 text-yellow-800";
    return "bg-gray-100 text-gray-800";
  };

  return (
    <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center space-x-3">
            <Avatar>
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                {ride.driver.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-gray-900">{ride.driver.name}</h3>
              <div className="flex items-center space-x-1">
                <Star size={14} className="text-yellow-400 fill-current" />
                <span className="text-sm text-gray-600">{ride.driver.rating}</span>
              </div>
              <p className="text-xs text-gray-500">{ride.driver.car}</p>
            </div>
          </div>
          <Badge className={`${getMatchScoreColor(ride.matchScore)} border-0`}>
            {ride.matchScore}% match
          </Badge>
        </div>

        <div className="space-y-3 mb-4">
          <div className="flex items-center space-x-2 text-sm">
            <MapPin size={16} className="text-gray-400" />
            <span className="text-gray-600">From:</span>
            <span className="font-medium text-gray-900">{ride.from}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <MapPin size={16} className="text-gray-400" />
            <span className="text-gray-600">To:</span>
            <span className="font-medium text-gray-900">{ride.to}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <Clock size={16} className="text-gray-400" />
            <span className="font-medium text-gray-900">{ride.time}</span>
            <span className="text-gray-600">• {ride.date}</span>
          </div>
        </div>

        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1 text-sm">
              <Users size={16} className="text-gray-400" />
              <span className="text-gray-600">{ride.seats} seats</span>
            </div>
            <div className="flex items-center space-x-1 text-sm">
              <DollarSign size={16} className="text-gray-400" />
              <span className="font-semibold text-green-600">{ride.price}</span>
            </div>
          </div>
        </div>

        <Button 
          onClick={handleBookRide}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
        >
          Request to Join
        </Button>
      </CardContent>
    </Card>
  );
};

export default RideMatchCard;
