import React, { useEffect, useState } from 'react';
import { getUserContent } from '../api/content';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { user } = useAuth();
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getUserContent()
      .then((data) => {
        setContent(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || 'Error fetching user content');
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        
        <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
          <div className="px-4 py-5 sm:px-6 bg-indigo-50 border-b border-indigo-100">
            <h3 className="text-lg leading-6 font-medium text-indigo-900">User Profile Card</h3>
            <p className="mt-1 max-w-2xl text-sm text-indigo-700">
              Personal details and current session information.
            </p>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Full name</dt>
                <dd className="mt-1 text-sm text-gray-900">{user?.name}</dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Email address</dt>
                <dd className="mt-1 text-sm text-gray-900">{user?.email}</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-sm font-medium text-gray-500">Assigned Roles</dt>
                <dd className="mt-1 text-sm text-gray-900 border border-gray-200 p-3 rounded-md bg-gray-50">
                   <ul className="list-disc pl-5">
                     {user?.roles.map(role => (
                       <li key={role} className="font-semibold">{role.replace('ROLE_', '')}</li>
                     ))}
                   </ul>
                </dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 bg-green-50 border-b border-green-100">
            <h3 className="text-lg leading-6 font-medium text-green-900">User Content</h3>
            <p className="mt-1 max-w-2xl text-sm text-green-700">
              Data fetched from the protected /api/user endpoint.
            </p>
          </div>
          <div className="px-4 py-5 sm:p-6">
            {loading ? (
              <p className="text-gray-500">Loading protected content...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              <div className="flex items-center space-x-3 text-green-700">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-xl font-bold">{content}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
