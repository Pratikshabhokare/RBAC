import React, { useEffect, useState } from 'react';
import { getAdminContent } from '../api/content';
import { useAuth } from '../context/AuthContext';

export default function Admin() {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getAdminContent()
      .then((data) => {
        setContent(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.response?.status === 403 
          ? "Forbidden: You don't have ADMIN role." 
          : err.message || 'Error fetching admin content'
        );
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Admin Control Panel</h1>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg border border-red-200">
          <div className="px-4 py-5 sm:px-6 bg-red-50 border-b border-red-100">
            <h3 className="text-lg leading-6 font-medium text-red-900">Restricted Admin Content</h3>
            <p className="mt-1 max-w-2xl text-sm text-red-700">
              Only users with the ROLE_ADMIN can view this data from /api/admin.
            </p>
          </div>
          <div className="px-4 py-5 sm:p-6">
            {loading ? (
              <div className="flex justify-center items-center h-32">
                <p className="text-gray-500">Loading admin content...</p>
              </div>
            ) : error ? (
              <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded shadow-sm">
                <p className="font-bold">Access Denied</p>
                <p>{error}</p>
              </div>
            ) : (
              <div className="flex items-center space-x-3 text-red-700 p-4 bg-red-50 rounded-lg">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <div>
                  <h4 className="text-xl font-bold">{content}</h4>
                  <p className="text-sm mt-1">Authorized request successfully processed.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
