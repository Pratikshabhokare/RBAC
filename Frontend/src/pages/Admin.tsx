import { useEffect, useState } from 'react';
import { getAdminContent } from '../api/content';

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
    <div className="min-h-[calc(100vh-80px)] bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Admin Headquarters</h1>
          <p className="mt-2 text-slate-500 font-medium">Elevated privilege zone and system controls.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-rose-500 to-red-600"></div>
          
          <div className="p-6 border-b border-slate-100 bg-red-50/30 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-rose-900 flex items-center gap-2">
                <svg className="w-5 h-5 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8V7a4 4 0 00-8 0v4h8z"></path></svg>
                Restricted Admin Content
              </h3>
              <p className="mt-1 text-sm text-rose-700/70">
                Only users possessing the <code className="bg-rose-100/50 px-1 py-0.5 rounded text-rose-600 text-xs font-bold">ROLE_ADMIN</code> authority can view the <code className="bg-slate-100 px-1 py-0.5 rounded text-pink-500 text-xs">/api/admin</code> data.
              </p>
            </div>
            <div className="hidden sm:block">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-700">
                <span className="w-2 h-2 rounded-full bg-rose-500 mr-2 animate-pulse"></span>
                Secure Tunnel
              </span>
            </div>
          </div>
          
          <div className="p-8 bg-slate-50/50">
            {loading ? (
              <div className="flex flex-col items-center justify-center h-32 space-y-4">
                <svg className="animate-spin h-8 w-8 text-rose-400" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                <p className="text-slate-500 font-medium text-sm">Validating administrative credentials...</p>
              </div>
            ) : error ? (
              <div className="rounded-xl bg-white p-6 border-2 border-red-100 shadow-sm flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-red-900">Access Denied</h4>
                  <p className="text-red-700 mt-1">{error}</p>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-5 bg-white border border-slate-200 shadow-sm rounded-xl p-6 relative overflow-hidden group hover:border-rose-300 transition-colors">
                <div className="absolute right-0 top-0 h-full w-2 bg-rose-500"></div>
                <div className="w-16 h-16 rounded-full bg-rose-50 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                </div>
                <div>
                  <h4 className="text-3xl font-black text-rose-900 tracking-tight">{content}</h4>
                  <p className="text-slate-500 font-medium mt-1">High-clearance data retrieval successful.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
