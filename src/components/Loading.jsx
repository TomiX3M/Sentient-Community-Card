import React from 'react';
import { Loader2 } from 'lucide-react';

const Loading = () => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-pink-50 to-pink-100">
      <div className="relative">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-r from-pink-400 via-fuchsia-500 to-rose-500 rounded-full opacity-20 blur-3xl animate-pulse"></div>
        
        {/* Main content */}
        <div className="relative z-10 flex flex-col items-center justify-center p-8 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-pink-100">
          {/* Logo/Icon */}
          <div className="w-24 h-24 bg-gradient-to-br from-pink-400 to-rose-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
            <img
              src="/logo_transparent.png"
              alt="Sentient Logo"
              className="w-16 h-16 object-contain"
            />
          </div>
          
          {/* Loading text */}
          <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mb-4">
            Loading Sentient Cards
          </h1>
          
          {/* Animated loading indicator */}
          <div className="relative w-48 h-2 bg-pink-100 rounded-full overflow-hidden mb-6">
            <div className="absolute top-0 left-0 h-full w-1/3 bg-gradient-to-r from-pink-400 to-rose-500 rounded-full animate-loading"></div>
          </div>
          
          {/* Status text */}
          <p className="text-pink-600 text-sm font-medium flex items-center">
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Preparing your experience...
          </p>
        </div>
      </div>
      
      {/* Footer */}
      <p className="mt-8 text-sm text-pink-400">
        Made with <span className="text-pink-500">❤️</span> by Sentient Community
      </p>
    </div>
  );
};

export default Loading;
