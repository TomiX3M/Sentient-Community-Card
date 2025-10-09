import React, { useState, useEffect, useRef } from 'react';
import { Upload, RotateCcw, Download, ChevronDown, User, Briefcase, Image, Book, X, Check, ExternalLink } from 'lucide-react';
import Sparkles from './Sparkles';
import CardPreview from './CardPreview';
import { toPng } from 'html-to-image';



const SentientCardCreator = () => {
  const [formData, setFormData] = useState({
    name: '',
    role: 'Level 1',
    track: 'Builder',
    artwork: null
  });

  const [dragActive, setDragActive] = useState(false);
  const [showFollowModal, setShowFollowModal] = useState(false);
  const [canDownload, setCanDownload] = useState(false);
  const [bgShade, setBgShade] = useState(0);
  const fileInputRef = useRef(null);
  const cardRef = useRef();

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

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!formData.artwork) {
      newErrors.artwork = 'Artwork is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleDownloadClick = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setShowFollowModal(true);
    }
  };

  const handleDownload = async () => {
    if (!canDownload || !cardRef.current) return;

    try {



      // Convert the card to an image using html-to-image
      const dataUrl = await toPng(cardRef.current, {
        pixelRatio: 1,
        backgroundColor: "#0d0d0d",
        cacheBust: true, // Bypass cache
        includeQueryParams: true, 
        width: 800, // Add explicit width
        height: 1000, // A// Include any query parameters in image URLs
      });

      // Create a download link
      const link = document.createElement('a');
      const fileName = `sentient-card-${formData.name ? formData.name.replace(/\s+/g, '-').toLowerCase() : 'my-card'}.png`;

      link.download = fileName;
      link.href = dataUrl;

      // Append to body, trigger click, and remove
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Revoke the object URL to free up memory
      setTimeout(() => URL.revokeObjectURL(link.href), 100);

      // Close the modal and reset state
      setShowFollowModal(false);
      setCanDownload(false);

    } catch (error) {
      console.error('Error generating image:', error);
      alert('Error generating the card. Please try again.');
    }
  };

  const handleTwitterRedirect = () => {
    // Open Twitter in a new tab
    window.open('https://x.com/Cryptee03', '_blank');
    // Enable download button after a short delay
    setCanDownload(true);
  };
  return (
    <div className={`min-h-screen relative overflow-hidden transition-all duration-[2000] ease-in ${bgShades[bgShade]}`}>
      {/* Background sparkles with logo */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <Sparkles
          useImage={true}
          imageUrl="/logo_transparent.png"
          sparkleCount={30}
          minSize={15}
          maxSize={40}
          className="w-full h-full"
        />
      </div>

      {/* Header with sparkles */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm relative z-10">
        <div className="flex items-center space-x-3">
          <Sparkles useImage={false}
           color="pink"  // 'pink', 'blue', 'gold', or 'purple'
           intensity={0.5} // Adjust the overall effect intensity
           sparkleCount={5} // Number of sparkles
           minSize={5}   // Minimum sparkle size
           maxSize={20} 
          >
            <div className="w-8 h-8 bg-pink-400 rounded-lg flex items-center justify-center relative z-10">
              <img
                src="/logo_transparent.png"
                alt="Logo"
                className="w-8 h-8 object-contain"
              />
            </div>
          </Sparkles>
          <div>
            <h1 className="text-black text-xl font-semibold">Sentient Community Card</h1>
            <p className="text-gray-600 text-sm">Create community role cards</p>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="relative z-10">
        <div className="container mx-auto px-6 py-8">
          <h2 className="text-white text-3xl font-bold text-center mb-8">Create Your Card</h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Name Input */}
              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-[0_10px_40px_rgba(0,0,0,0.15),0_4px_20px_rgba(236,72,153,0.12)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.25),0_8px_30px_rgba(236,72,153,0.18)] hover:border-pink-200 transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center space-x-3 mb-4">
                  <User className="w-5 h-5 text-pink-500" />
                  <h3 className="text-gray-800 font-medium">Your Name</h3>
                </div>
                <div>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => {
                      handleInputChange('name', e.target.value);
                      if (errors.name) {
                        setErrors(prev => ({ ...prev, name: '' }));
                      }
                    }}
                    className={`w-full px-4 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent`}
                    placeholder="Enter your name"
                    required
                  />
                  {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                </div>
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
              <div className="bg-white rounded-xl p-6 border border-white/10 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <Image className="w-5 h-5 text-pink-400" />
                    <h3 className="text-gray-800 font-medium">Upload Profile Image</h3>
                  </div>
                  {errors.artwork && <p className="text-sm text-red-500">{errors.artwork}</p>}
                </div>

                <div
                  className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-colors ${dragActive
                    ? 'border-pink-500 bg-pink-500'
                    : 'border-pink/20 hover:border-white/40'
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
                      <p className="text-pink-400 font-medium">Artwork uploaded successfully!</p>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleInputChange('artwork', null);
                        }}
                        className="text-sm text-gray-300 hover:text-white underline"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="mx-auto flex flex-col items-center justify-center space-y-4">
                        <div className="w-12 h-12 rounded-full bg-pink-500/20 flex items-center justify-center">
                          <Upload className="w-5 h-5 text-pink-400" />
                        </div>
                        <div className="text-center">
                          <p className={`text-sm ${errors.artwork ? 'text-red-500' : 'text-gray-300'}`}>
                            <span className={`font-medium ${errors.artwork ? 'text-red-500' : 'text-pink-400'}`}>
                              {errors.artwork ? 'Artwork is required - ' : 'Click to upload'}
                            </span>
                            {!errors.artwork && 'or drag and drop'}
                          </p>
                          <p className={`text-xs ${errors.artwork ? 'text-red-400' : 'text-gray-400'}`}>
                            {errors.artwork ? 'Please upload an image to continue' : 'PNG, JPG, GIF (max. 5MB)'}
                          </p>
                        </div>
                      </div>
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={(e) => {
                          handleFileSelect(e);
                          if (errors.artwork) {
                            setErrors(prev => ({ ...prev, artwork: '' }));
                          }
                        }}
                        accept="image/*"
                        className="hidden"
                        required
                      />
                    </div>
                  )}
                </div>
              </div>
              {/* Action Buttons */}
              <div className="flex space-x-4 mt-6 pb-8">
                <button
                  onClick={handleReset}
                  className="flex items-center space-x-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Reset</span>
                </button>

                <button
                  onClick={handleDownloadClick}
                  className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white rounded-lg transition-all shadow-lg"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Card</span>
                </button>
              </div>
            </div>

            {/* Preview Section */}
            <div className="hidden lg:flex items-top justify-center p-2">

              <div className="hidden lg:block lg:col-span-1">
                <CardPreview ref={cardRef} formData={formData} />
              </div>
            </div>

          </div>

          {/* Show preview at bottom on mobile */}
          <div className="lg:hidden mt-8">
            <CardPreview ref={cardRef} formData={formData} />
          </div>
        </div>
      </main>








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
                {canDownload ? (
                  <Check className="h-8 w-8 text-green-500" />
                ) : (
                  <ExternalLink className="h-8 w-8 text-pink-500" />
                )}
              </div>

              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {canDownload ? 'Thanks for following!' : 'Follow to Download'}
              </h3>

              <p className="text-gray-600 mb-6">
                {canDownload
                  ? 'Thank you for following! You can now download your card.'
                  : 'Please follow us on Twitter to unlock your download.'
                }
              </p>

              <div className="space-y-3">
                {/* Twitter Button */}
                <button
                  onClick={handleTwitterRedirect}
                  className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                >
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
                  </svg>
                  Follow on Twitter
                </button>

                {/* Download Button */}
                <button
                  onClick={handleDownload}
                  disabled={!canDownload}
                  className={`w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${canDownload ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-400 cursor-not-allowed'} focus:outline-none focus:ring-2 focus:ring-offset-2 ${canDownload ? 'focus:ring-green-500' : 'focus:ring-gray-500'}`}
                >
                  <Download className="w-4 h-4 mr-2" />
                  {canDownload ? 'Download Your Card' : 'Please click Twitter button first'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-200 py-4 shadow-lg z-50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-gray-600 text-sm">
            Crafted with <span className="text-pink-500">❤️</span> by
            <a
              href="https://x.com/Cryptee03"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-500 hover:text-pink-600 font-medium transition-colors ml-1"
            >
              Cryptee
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default SentientCardCreator;