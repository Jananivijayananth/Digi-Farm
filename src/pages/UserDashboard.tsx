import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FileSearch, ShoppingCart, Leaf, BarChart2, 
  SunMedium, Droplets, Wind
} from 'lucide-react';
import { useUser } from '../context/UserContext';

const UserDashboard: React.FC = () => {
  const { user } = useUser();
  
  // Mock weather data
  const weather = {
    temperature: 24,
    humidity: 65,
    wind: 12,
    condition: 'Sunny'
  };
  
  // Mock recent activities
  const recentActivities = [
    { id: 1, type: 'upload', description: 'Uploaded tomato leaf images for disease detection', time: '2 hours ago' },
    { id: 2, type: 'listing', description: 'Listed 10kg organic apples on marketplace', time: '1 day ago' },
    { id: 3, type: 'purchase', description: 'Purchased farming equipment', time: '3 days ago' },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Welcome, {user.username}!</h1>
        <p className="text-gray-600 mt-2">Access all your farming tools and resources</p>
      </div>
      
      {/* Main feature cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <Link 
          to="/disease-detection"
          className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
        >
          <div className="p-6 flex items-start space-x-4">
            <div className="bg-green-100 p-3 rounded-full">
              <FileSearch className="h-8 w-8 text-green-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Crop Disease Detection</h2>
              <p className="text-gray-600">Upload images of your crops to identify diseases and get treatment recommendations</p>
            </div>
          </div>
        </Link>
        
        <Link 
          to="/marketplace"
          className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
        >
          <div className="p-6 flex items-start space-x-4">
            <div className="bg-amber-100 p-3 rounded-full">
              <ShoppingCart className="h-8 w-8 text-amber-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Marketplace</h2>
              <p className="text-gray-600">Buy and sell farm produce directly with no middlemen</p>
            </div>
          </div>
        </Link>
      </div>
      
      {/* Weather widget */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-10">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Local Weather</h2>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <SunMedium className="h-8 w-8 text-yellow-500" />
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-800">{weather.temperature}°C</p>
              <p className="text-gray-600">{weather.condition}</p>
            </div>
          </div>
          
          <div className="flex space-x-6">
            <div className="text-center">
              <div className="flex items-center justify-center">
                <Droplets className="h-5 w-5 text-blue-500 mr-1" />
                <span className="text-lg font-medium text-gray-700">{weather.humidity}%</span>
              </div>
              <p className="text-sm text-gray-500">Humidity</p>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center">
                <Wind className="h-5 w-5 text-blue-500 mr-1" />
                <span className="text-lg font-medium text-gray-700">{weather.wind} km/h</span>
              </div>
              <p className="text-sm text-gray-500">Wind</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Recent activity */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {recentActivities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
              <div className={`p-2 rounded-full ${
                activity.type === 'upload' ? 'bg-purple-100' : 
                activity.type === 'listing' ? 'bg-green-100' : 'bg-blue-100'
              }`}>
                {activity.type === 'upload' && <FileSearch className="h-5 w-5 text-purple-600" />}
                {activity.type === 'listing' && <Leaf className="h-5 w-5 text-green-600" />}
                {activity.type === 'purchase' && <ShoppingCart className="h-5 w-5 text-blue-600" />}
              </div>
              <div>
                <p className="text-gray-800">{activity.description}</p>
                <p className="text-sm text-gray-500">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;