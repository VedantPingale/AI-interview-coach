import React from 'react';
import { useAuth } from '../hooks/useAuth';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const ProfilePage: React.FC = () => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="text-center py-16">
        <i className="fas fa-lock text-6xl text-gray-600 mb-4"></i>
        <h1 className="text-4xl font-bold mb-2">Access Denied</h1>
        <p className="text-gray-400">Please log in to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-200">
        Your Profile
      </h1>
      <Card>
        <div className="p-4">
          <div className="flex items-center space-x-6">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-600 to-cyan-500 flex items-center justify-center text-white font-bold text-4xl">
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div>
              <h2 className="text-3xl font-bold">{user?.name}</h2>
              <p className="text-gray-400">{user?.email}</p>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-700 pt-6">
            <h3 className="text-xl font-semibold text-yellow-400 mb-4">Profile Details</h3>
            <div className="space-y-3">
              <p><span className="font-semibold text-gray-300">Full Name:</span> {user?.name}</p>
              <p><span className="font-semibold text-gray-300">Email Address:</span> {user?.email}</p>
              <p><span className="font-semibold text-gray-300">Account ID:</span> {user?.id}</p>
            </div>
          </div>
          <div className="mt-6 text-right">
            <Button variant="secondary" onClick={() => alert('Edit functionality coming soon!')}>
              Edit Profile <i className="fas fa-pencil-alt ml-2"></i>
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProfilePage;
