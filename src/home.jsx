import React, { useState, useEffect, useRef } from 'react';
import { Upload, RotateCcw, Download, ChevronDown, User, Briefcase, Image, Book, X, Check, ExternalLink } from 'lucide-react';
import Sparkles from './components/Sparkles';

const IrysCardCreator = () => {
  const [formData, setFormData] = useState({
    name: '',
    role: 'Level 1',
    track: 'Builder',
    templateColor: 'White',
    artwork: null
  });
  
  const [dragActive, setDragActive] = useState(false);
  const [showFollowModal, setShowFollowModal] = useState(false);
  const [hasFollowed, setHasFollowed] = useState(false);
  const [bgShade, setBgShade] = useState(0);
  const fileInputRef = useRef(null);

  // Background color animation
  useEffect(() => {
    const interval = setInterval(() => {
      setBgShade(prev => (prev + 1) % 6); // Cycle through 6 different shades
    }, 5000); // Change every 5 seconds (slower)

    return () => clearInterval(interval);
  }, []);

  const bgShades = [
    'bg-gradient-to-tl from-pink-300 via-pink-400 to-rose-400',
    'bg-gradient-to-tl from-rose-300 via-pink-500 to-pink-400',
    'bg-gradient-to-tl from-pink-400 via-rose-400 to-pink-500',
    'bg-gradient-to-tl from-rose-400 via-pink-400 to-rose-500',
    'bg-gradient-to-tl from-pink-500 via-rose-500 to-pink-400',
    'bg-gradient-to-tl from-rose-500 via-pink-300 to-rose-400'
  ];

  const roles = [
    'Level 1', 'Level 2', 'Level 3', 'Early AGI', 'Advanced AGI', 
    'Sentient AGI'
  ];

  const tracks = [
    'Builder', 'Educator', 'Helper', 'Artist'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFile = (file) => {
    if (file && file.size <= 5 * 1024 * 1024) { // 5MB limit
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({ ...prev, artwork: e.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      role: 'Level 1',
      track: 'Builder',
      artwork: null
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDownload = () => {
    setShowFollowModal(true);
  };

  const handleFollowComplete = () => {
    setHasFollowed(true);
    // In a real app, you would verify the follow action here
    setTimeout(() => {
      setShowFollowModal(false);
      setHasFollowed(false);
      // Actual download logic would go here
      alert('Downloading your card!');
    }, 1500);
  };

  return (
    <div className={`min-h-screen relative overflow-hidden transition-all duration-[2000] ease-in ${bgShades[bgShade]}`}>
      {/* Background sparkles with logo */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <Sparkles 
          useImage={true}
          imageUrl="/logo_transparent.png"
          sparkleCount={45}
          minSize={15}
          maxSize={45}
          className="w-full h-full"
        />
      </div>
      
      {/* Header with sparkles */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm relative z-10">
        <div className="flex items-center space-x-3">
          <Sparkles useImage={false}>
            <div className="w-8 h-8 bg-pink-400 rounded-lg flex items-center justify-center relative z-10">
              <img 
                src="/logo_transparent.png" 
                alt="Logo" 
                className="w-8 h-8 object-contain"
              />
            </div>
          </Sparkles>
          <div>
            <h1 className="text-black text-xl font-semibold">Sentient Role Cards</h1>
            <p className="text-gray-600 text-sm">Create your own role cards</p>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="relative z-10">
        {/* Main Content */}
        <div className="px-6 py-8">
          <h2 className="text-white text-3xl font-bold text-center mb-8">Create Your Card</h2>
          
          <div className="max-w-2xl mx-auto space-y-6">
            {/* Name Input */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-[0_10px_40px_rgba(0,0,0,0.15),0_4px_20px_rgba(236,72,153,0.12)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.25),0_8px_30px_rgba(236,72,153,0.18)] hover:border-pink-200 transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center space-x-3 mb-4">
                <User className="w-5 h-5 text-pink-500" />
                <h3 className="text-gray-800 font-medium">Your Name</h3>
              </div>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                placeholder="Enter your name"
              />
            </div>

            {/* Track Dropdown */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-[0_10px_40px_rgba(0,0,0,0.15),0_4px_20px_rgba(236,72,153,0.12)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.25),0_8px_30px_rgba(236,72,153,0.18)] hover:border-pink-200 transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center space-x-3 mb-4">
                <Book className="w-5 h-5 text-pink-500" />
                <h3 className="text-gray-800 font-medium">Select Track</h3>
              </div>
              <div className="relative">
                <select
                  value={formData.track}
                  onChange={(e) => handleInputChange('track', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg appearance-none focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-white"
                >
                  {tracks.map((track) => (
                    <option key={track} value={track}>
                      {track.charAt(0).toUpperCase() + track.slice(1)}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-5 h-5 text-gray-400 absolute right-3 top-2.5 pointer-events-none" />
              </div>
            </div>

            {/* Role Dropdown */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-[0_10px_40px_rgba(0,0,0,0.15),0_4px_20px_rgba(236,72,153,0.12)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.25),0_8px_30px_rgba(236,72,153,0.18)] hover:border-pink-200 transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center space-x-3 mb-4">
                <Briefcase className="w-5 h-5 text-pink-500" />
                <h3 className="text-gray-800 font-medium">Select Role</h3>
              </div>
              <div className="relative">
                <select
                  value={formData.role}
                  onChange={(e) => handleInputChange('role', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg appearance-none focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-white"
                >
                  {roles.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-5 h-5 text-gray-400 absolute right-3 top-2.5 pointer-events-none" />
              </div>
            </div>

            {/* Upload Artwork */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-[0_10px_40px_rgba(0,0,0,0.15),0_4px_20px_rgba(236,72,153,0.12)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.25),0_8px_30px_rgba(236,72,153,0.18)] hover:border-pink-200 transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center space-x-3 mb-4">
                <Image className="w-5 h-5 text-pink-500" />
                <h3 className="text-gray-800 font-medium">Upload Profile Image</h3>
              </div>
              
              <div 
                className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
                  dragActive 
                    ? 'border-pink-500 bg-pink-500/10' 
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                {formData.artwork ? (
                  <div className="space-y-3">
                    <img 
                      src={formData.artwork} 
                      alt="Uploaded artwork" 
                      className="max-w-32 max-h-32 mx-auto rounded-lg object-cover"
                    />
                    <p className="text-pink-500 font-medium">Artwork uploaded successfully!</p>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleInputChange('artwork', null);
                      }}
                      className="text-sm text-gray-600 hover:text-gray-800 underline"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="mx-auto w-16 h-16 border-2 border-dashed border-gray-400 rounded-lg flex items-center justify-center">
                      <Upload className="w-6 h-6 text-gray-400" />
                    </div>
                    <div>
                      <p className="text-gray-800 font-medium">Upload a file</p>
                      <p className="text-gray-600 text-sm">or drag and drop</p>
                      <p className="text-gray-500 text-xs mt-1">PNG, JPG, GIF up to 5MB</p>
                    </div>
                  </div>
                )}
                
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".png,.jpg,.jpeg,.gif"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <button
                onClick={handleReset}
                className="flex items-center space-x-2 px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset</span>
              </button>
              
              <button
                onClick={handleDownload}
                className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white rounded-lg transition-all shadow-lg"
              >
                <Download className="w-4 h-4" />
                <span>Download PNG</span>
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Download button with sparkles */}
      <div className="fixed bottom-8 right-8 z-20">
        <Sparkles 
          useImage={true}
          imageUrl="/logo192.png"
          sparkleCount={5}
          minSize={5}
          maxSize={15}
        >
          <button
            onClick={handleDownload}
            className="flex items-center justify-center p-3 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
          >
            <Download className="w-6 h-6" />
          </button>
        </Sparkles>
      </div>

      {/* Follow Modal */}
      {showFollowModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 relative">
            <button
              onClick={() => setShowFollowModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-pink-100 mb-4">
                {hasFollowed ? (
                  <Check className="h-8 w-8 text-green-500" />
                ) : (
                  <ExternalLink className="h-8 w-8 text-pink-500" />
                )}
              </div>

              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {hasFollowed ? 'Thanks for following!' : 'Follow to Download'}
              </h3>

              <p className="text-gray-600 mb-6">
                {hasFollowed
                  ? 'Your download will start shortly...'
                  : 'Please follow us on social media to download your card.'
                }
              </p>

              {!hasFollowed && (
                <div className="space-y-3">
                  <a
                    href="https://twitter.com/Sentient"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                    onClick={handleFollowComplete}
                  >
                    Follow on Twitter
                  </a>
                </div>
              )}

              {hasFollowed && (
                <div className="space-y-3">
                  <button
                    onClick={() => {
                      setShowFollowModal(false);
                      alert('🎉 Download started! Thank you for your support!');
                    }}
                    className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Your Card
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-gray-600 text-sm">
            {new Date().getFullYear()} Sentient Role Cards. All rights reserved. | 
            <a 
              href="https://sentient.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-pink-500 hover:text-pink-600 font-medium transition-colors"
            >
              Visit Sentient Website
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default IrysCardCreator;