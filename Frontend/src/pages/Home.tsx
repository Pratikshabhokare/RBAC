import { useEffect, useState } from 'react';
import { getPublicContent } from '../api/content';

import heroImage from '../assets/hero_image.png';

export default function Home() {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getPublicContent()
      .then((data) => {
        setContent(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || 'Error fetching public content');
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-50 flex flex-col items-center">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 grid lg:grid-cols-2 gap-12 items-center">
        
        <div className="space-y-8">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100/50">
            <span className="flex h-2 w-2 rounded-full bg-indigo-500 mr-2 animate-pulse"></span>
            <span className="text-sm font-semibold text-indigo-900">Next-Gen Authentication</span>
          </div>
          <h1 className="text-5xl lg:text-7xl font-black text-slate-900 tracking-tight leading-tight">
            Secure Your <br className="hidden lg:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Digital Identity.</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-xl leading-relaxed">
            Experience the most powerful, frictionless role-based access control system designed specifically for enterprise scale and modern security demands.
          </p>
          
          <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl p-6 relative overflow-hidden group hover:shadow-indigo-500/10 transition-all duration-500">
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-indigo-500 to-purple-500 rounded-l-2xl"></div>
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
              Public API Status
            </h3>
            <p className="mt-2 text-sm text-slate-500 mb-4">
              Real-time ping to the unprotected public endpoint checking backend availability.
            </p>
            <div className="flex items-center gap-3">
              {loading ? (
                <div className="flex items-center space-x-2 text-slate-400 font-medium">
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  <span>Connecting...</span>
                </div>
              ) : error ? (
                <div className="inline-flex items-center px-3 py-1.5 rounded-lg bg-red-50 text-red-600 text-sm font-semibold border border-red-100">
                  <span className="w-2 h-2 rounded-full bg-red-500 mr-2"></span>
                  {error}
                </div>
              ) : (
                <div className="inline-flex items-center px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-600 text-sm font-semibold border border-emerald-100">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse"></span>
                  {content}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="relative lg:h-[600px] flex justify-center items-center">
          <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 rounded-[3rem] blur-3xl transform -rotate-6 scale-110"></div>
          <div className="mt-10 lg:mt-0 relative w-full max-w-md lg:max-w-none">
            <img 
              src={heroImage} 
              alt="Data Security Visualization" 
              className="w-full h-auto rounded-[2rem] shadow-2xl relative z-10 border border-white/20 transform hover:-translate-y-2 transition-transform duration-700 ease-out"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
