
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import RideMatchCard from '@/components/RideMatchCard';
import ProfileSetup from '@/components/ProfileSetup';
import { 
  Car, 
  Users, 
  MapPin, 
  Star, 
  Clock, 
  LogOut, 
  Settings,
  Plus,
  Navigation
} from 'lucide-react';

interface DashboardProps {
  user: any;
  onLogout: () => void;
}

const Dashboard = ({ user, onLogout }: DashboardProps) => {
  const [activeTab, setActiveTab] = useState('matches');
  const [showProfileSetup, setShowProfileSetup] = useState(!user.profileComplete);

  const mockRides = [
    {
      id: 1,
      driver: { name: "Sarah Chen", rating: 4.9, car: "Toyota Prius" },
      from: "Downtown Seattle",
      to: "Bellevue Tech Hub",
      time: "8:00 AM",
      date: "Tomorrow",
      seats: 2,
      price: "$8",
      matchScore: 95
    },
    {
      id: 2,
      driver: { name: "Mike Rodriguez", rating: 4.8, car: "Honda Civic" },
      from: "Capitol Hill",
      to: "Amazon Campus",
      time: "8:30 AM",
      date: "Tomorrow",
      seats: 1,
      price: "$6",
      matchScore: 87
    },
    {
      id: 3,
      driver: { name: "Emma Johnson", rating: 5.0, car: "Tesla Model 3" },
      from: "Fremont",
      to: "Microsoft Campus",
      time: "7:45 AM",
      date: "Tomorrow",
      seats: 3,
      price: "$10",
      matchScore: 92
    }
  ];

  if (showProfileSetup) {
    return (
      <ProfileSetup 
        user={user} 
        onComplete={() => setShowProfileSetup(false)} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <Car size={20} className="text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">CommuteMate</h1>
                <p className="text-sm text-gray-600">Welcome back, {user.name}!</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                  {user.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <Button variant="ghost" size="sm" onClick={onLogout}>
                <LogOut size={16} className="mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Trips</p>
                  <p className="text-2xl font-bold text-gray-900">{user.totalTrips}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Navigation size={24} className="text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Rating</p>
                  <div className="flex items-center space-x-1">
                    <p className="text-2xl font-bold text-gray-900">{user.rating}</p>
                    <Star size={20} className="text-yellow-400 fill-current" />
                  </div>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                  <Star size={24} className="text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Money Saved</p>
                  <p className="text-2xl font-bold text-gray-900">$124</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <MapPin size={24} className="text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">CO₂ Saved</p>
                  <p className="text-2xl font-bold text-gray-900">42kg</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Users size={24} className="text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 max-w-md">
            <TabsTrigger value="matches">Find Rides</TabsTrigger>
            <TabsTrigger value="my-rides">My Rides</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>
          
          <TabsContent value="matches" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Available Rides</h2>
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                <Plus size={16} className="mr-2" />
                Post a Ride
              </Button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {mockRides.map((ride) => (
                <RideMatchCard key={ride.id} ride={ride} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="my-rides">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>My Upcoming Rides</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Car size={48} className="mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600">No upcoming rides scheduled</p>
                  <Button className="mt-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                    Find a Ride
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="profile">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Profile Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <Avatar className="w-20 h-20">
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-2xl">
                        {user.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-xl font-semibold">{user.name}</h3>
                      <p className="text-gray-600">{user.email}</p>
                      <div className="flex items-center space-x-1 mt-1">
                        <Star size={16} className="text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600">{user.rating} rating</span>
                      </div>
                    </div>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    onClick={() => setShowProfileSetup(true)}
                    className="w-full"
                  >
                    <Settings size={16} className="mr-2" />
                    Edit Profile & Preferences
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
