import React from 'react';
import { 
  Users, ShoppingBag, FileSearch, BarChart2, 
  TrendingUp, AlertCircle, CheckCircle
} from 'lucide-react';
import { useUser } from '../context/UserContext';

const AdminDashboard: React.FC = () => {
  const { user } = useUser();
  
  // Mock statistics
  const stats = [
    { id: 1, title: 'Total Users', value: '156', icon: <Users className="h-6 w-6 text-blue-500" />, change: '+12%' },
    { id: 2, title: 'Marketplace Items', value: '243', icon: <ShoppingBag className="h-6 w-6 text-green-500" />, change: '+8%' },
    { id: 3, title: 'Disease Detections', value: '427', icon: <FileSearch className="h-6 w-6 text-purple-500" />, change: '+23%' },
  ];
  
  // Mock recent users
  const recentUsers = [
    { id: 1, name: 'John Smith', location: 'Karnataka', joinDate: '2 days ago', crops: 'Tomatoes, Rice' },
    { id: 2, name: 'Priya Patel', location: 'Tamil Nadu', joinDate: '3 days ago', crops: 'Wheat, Cotton' },
    { id: 3, name: 'Mohammed Hassan', location: 'Kerala', joinDate: '1 week ago', crops: 'Tea, Spices' },
  ];
  
  // Mock alerts
  const systemAlerts = [
    { id: 1, type: 'warning', message: 'High server load detected', time: '10 minutes ago' },
    { id: 2, type: 'success', message: 'Database backup completed', time: '2 hours ago' },
    { id: 3, type: 'warning', message: 'Storage space running low', time: '1 day ago' },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back, {user.username}</p>
      </div>
      
      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.id} className="bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-sm">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">{stat.value}</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-full">
                {stat.icon}
              </div>
            </div>
            <div className="flex items-center mt-4 text-sm">
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-green-500 font-medium">{stat.change}</span>
              <span className="text-gray-500 ml-1">from last month</span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chart placeholder */}
        <div className="bg-white rounded-xl shadow-md p-6 lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Platform Activity</h2>
            <select className="border border-gray-300 rounded-md px-3 py-1 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 3 months</option>
            </select>
          </div>
          <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg border border-gray-100">
            <div className="text-center">
              <BarChart2 className="h-12 w-12 text-gray-300 mx-auto mb-2" />
              <p className="text-gray-500">Activity chart will be displayed here</p>
            </div>
          </div>
        </div>
        
        {/* System alerts */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">System Alerts</h2>
          <div className="space-y-4">
            {systemAlerts.map((alert) => (
              <div key={alert.id} className="flex items-start space-x-3 pb-3 border-b border-gray-100 last:border-0 last:pb-0">
                <div className="mt-0.5">
                  {alert.type === 'warning' && <AlertCircle className="h-5 w-5 text-amber-500" />}
                  {alert.type === 'success' && <CheckCircle className="h-5 w-5 text-green-500" />}
                </div>
                <div>
                  <p className="text-gray-800">{alert.message}</p>
                  <p className="text-sm text-gray-500">{alert.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Recent users */}
      <div className="mt-8 bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6 pb-0">
          <h2 className="text-xl font-semibold text-gray-800">Recent Users</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Joined
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Crops
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentUsers.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{user.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                    {user.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                    {user.joinDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                    {user.crops}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                    <button className="text-indigo-600 hover:text-indigo-900">View Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;