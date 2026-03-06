import { useEffect, useState } from 'react';
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
    <div className="min-h-[calc(100vh-80px)] bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Dashboard Overview</h1>
          <p className="mt-2 text-slate-500 font-medium">Manage your personal information and view secured content.</p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {/* User Profile Card */}
          <div className="lg:col-span-1 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden self-start">
            <div className="p-6 bg-gradient-to-br from-indigo-500 to-purple-600 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-20">
                <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
              </div>
              <h3 className="text-xl font-bold relative z-10">Profile Identifiers</h3>
              <p className="mt-1 text-indigo-100 text-sm relative z-10">Active session payload</p>
            </div>
            
            <div className="p-6 space-y-5">
              <div>
                <dt className="text-xs font-bold text-slate-400 uppercase tracking-wider">Full Name</dt>
                <dd className="mt-1 text-base font-semibold text-slate-900">{user?.name}</dd>
              </div>
              <div>
                <dt className="text-xs font-bold text-slate-400 uppercase tracking-wider">Email Address</dt>
                <dd className="mt-1 text-base font-semibold text-slate-900">{user?.email}</dd>
              </div>
              <div>
                <dt className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Assigned Roles</dt>
                <dd className="flex flex-wrap gap-2">
                  {user?.roles.map(role => (
                    <span key={role} className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-100">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mr-2"></span>
                      {role.replace('ROLE_', '')}
                    </span>
                  ))}
                </dd>
              </div>
            </div>
          </div>

          {/* User Content Card */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    Protected Resource
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    Fetched from the authenticated <code className="text-xs bg-slate-100 px-1 py-0.5 rounded text-pink-500">/api/user</code> endpoint.
                  </p>
                </div>
              </div>
              
              <div className="p-8">
                {loading ? (
                  <div className="flex animate-pulse space-x-4">
                    <div className="flex-1 space-y-4 py-1">
                      <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                      <div className="space-y-2">
                        <div className="h-4 bg-slate-200 rounded"></div>
                        <div className="h-4 bg-slate-200 rounded w-5/6"></div>
                      </div>
                    </div>
                  </div>
                ) : error ? (
                  <div className="rounded-xl bg-red-50 p-4 border border-red-100">
                    <p className="text-sm font-medium text-red-800">{error}</p>
                  </div>
                ) : (
                  <div className="flex items-center gap-4 bg-emerald-50/50 border border-emerald-100 rounded-xl p-6">
                    <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <div>
                      <h4 className="text-2xl font-black text-emerald-800 tracking-tight">{content}</h4>
                      <p className="text-emerald-600/80 text-sm font-medium mt-1">Token validation succeeded.</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
