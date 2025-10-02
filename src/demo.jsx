// import React, { useState, useRef } from 'react';
// import { Upload, RotateCcw, Download, ChevronDown, User, Briefcase, Palette, Image } from 'lucide-react';

// // Add custom CSS for animations
// const animationStyles = `
//   @keyframes float {
//     0%, 100% { 
//       transform: translateY(0px) rotate(0deg); 
//       opacity: 0.3; 
//     }
//     25% { 
//       transform: translateY(-20px) rotate(90deg); 
//       opacity: 0.8; 
//     }
//     50% { 
//       transform: translateY(-10px) rotate(180deg); 
//       opacity: 0.5; 
//     }
//     75% { 
//       transform: translateY(-30px) rotate(270deg); 
//       opacity: 0.9; 
//     }
//   }
  
//   @keyframes slide {
//     0% { 
//       transform: translateX(-100%) skewX(-12deg); 
//     }
//     100% { 
//       transform: translateX(200vw) skewX(-12deg); 
//     }
//   }
  
//   @keyframes gentlePulse {
//     0%, 100% { 
//       transform: scale(1) rotate(0deg); 
//       opacity: 0.3; 
//     }
//     50% { 
//       transform: scale(1.1) rotate(180deg); 
//       opacity: 0.6; 
//     }
//   }
  
//   .animate-float {
//     animation: float linear infinite;
//   }
  
//   .animate-slide {
//     animation: slide 20s linear infinite;
//   }
  
//   .animate-gentle-pulse {
//     animation: gentlePulse 8s ease-in-out infinite;
//   }
// `;

// const IrysCardCreator = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     role: 'Deshi',
//     templateColor: 'White',
//     artwork: null
//   });
  
//   const [dragActive, setDragActive] = useState(false);
//   const fileInputRef = useRef(null);

//   const roles = [
//     'Deshi', 'Sensei', 'Master', 'Guardian', 'Apprentice', 
//     'Scholar', 'Warrior', 'Sage', 'Novice', 'Expert'
//   ];

//   const handleInputChange = (field, value) => {
//     setFormData(prev => ({ ...prev, [field]: value }));
//   };

//   const handleDrag = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     if (e.type === "dragenter" || e.type === "dragover") {
//       setDragActive(true);
//     } else if (e.type === "dragleave") {
//       setDragActive(false);
//     }
//   };

//   const handleDrop = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setDragActive(false);
    
//     if (e.dataTransfer.files && e.dataTransfer.files[0]) {
//       handleFile(e.dataTransfer.files[0]);
//     }
//   };

//   const handleFile = (file) => {
//     if (file && file.size <= 5 * 1024 * 1024) { // 5MB limit
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         setFormData(prev => ({ ...prev, artwork: e.target.result }));
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleFileSelect = (e) => {
//     if (e.target.files && e.target.files[0]) {
//       handleFile(e.target.files[0]);
//     }
//   };

//   const handleReset = () => {
//     setFormData({
//       name: '',
//       role: 'Deshi',
//       templateColor: 'White',
//       artwork: null
//     });
//     if (fileInputRef.current) {
//       fileInputRef.current.value = '';
//     }
//   };

//   const handleDownload = () => {
//     // In a real app, this would generate and download the card
//     alert('Card download functionality would be implemented here!');
//   };

//   return (
//     <div>      
//       <style>{animationStyles}</style>
//       <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-black relative overflow-hidden">
//       {/* Animated Background */}
//       <div className="absolute inset-0 opacity-30">
//         {/* Floating Orbs */}
//         <div className="absolute w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-gentle-pulse" 
//              style={{
//                top: '10%',
//                left: '10%',
//                animationDelay: '0s'
//              }}></div>
//         <div className="absolute w-80 h-80 bg-purple-500/15 rounded-full blur-3xl animate-gentle-pulse" 
//              style={{
//                top: '50%',
//                right: '15%',
//                animationDelay: '3s'
//              }}></div>
//         <div className="absolute w-72 h-72 bg-teal-400/10 rounded-full blur-3xl animate-gentle-pulse" 
//              style={{
//                bottom: '20%',
//                left: '20%',
//                animationDelay: '6s'
//              }}></div>
        
//         {/* Moving Gradient Overlay */}
//         <div className="absolute inset-0 opacity-20">
//           <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/10 to-transparent transform -skew-x-12 animate-slide"></div>
//         </div>
        
//         {/* Floating Particles */}
//         <div className="absolute inset-0">
//           {[...Array(20)].map((_, i) => (
//             <div
//               key={i}
//               className="absolute w-1 h-1 bg-white/20 rounded-full animate-float"
//               style={{
//                 left: `${Math.random() * 100}%`,
//                 top: `${Math.random() * 100}%`,
//                 animationDelay: `${Math.random() * 10}s`,
//                 animationDuration: `${15 + Math.random() * 10}s`
//               }}
//             ></div>
//           ))}
//         </div>
//       </div>

//       {/* Content with higher z-index */}
//       <div className="relative z-10">
//       {/* Header */}
//       <div className="bg-slate-800 border-b border-slate-700 px-6 py-4">
//         <div className="flex items-center space-x-3">
//           <div className="w-8 h-8 bg-teal-400 rounded-lg flex items-center justify-center">
//             <div className="w-4 h-6 bg-white rounded-sm"></div>
//           </div>
//           <div>
//             <h1 className="text-white text-xl font-semibold">Irys Cards</h1>
//             <p className="text-gray-400 text-sm">Futuristic Membership Cards</p>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="px-6 py-8">
//         <h2 className="text-white text-3xl font-bold text-center mb-8">Create Your Card</h2>
        
//         <div className="max-w-2xl mx-auto space-y-6">
//           {/* Name Input */}
//           <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
//             <div className="flex items-center space-x-3 mb-4">
//               <User className="w-5 h-5 text-teal-400" />
//               <h3 className="text-white text-lg font-medium">Your Name</h3>
//             </div>
//             <input
//               type="text"
//               value={formData.name}
//               onChange={(e) => handleInputChange('name', e.target.value)}
//               placeholder="Enter your name"
//               maxLength={20}
//               className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
//             />
//             <p className="text-blue-400 text-sm mt-2 flex items-center">
//               <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
//               This will appear on your card (max 20 characters)
//             </p>
//           </div>

//           {/* Role Selection */}
//           <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
//             <div className="flex items-center space-x-3 mb-4">
//               <Briefcase className="w-5 h-5 text-teal-400" />
//               <h3 className="text-white text-lg font-medium">Select Role</h3>
//             </div>
//             <div className="relative">
//               <select
//                 value={formData.role}
//                 onChange={(e) => handleInputChange('role', e.target.value)}
//                 className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent cursor-pointer"
//               >
//                 {roles.map((role) => (
//                   <option key={role} value={role} className="bg-slate-900">
//                     {role}
//                   </option>
//                 ))}
//               </select>
//               <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
//             </div>
//             <p className="text-blue-400 text-sm mt-2 flex items-center">
//               <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
//               Choose your role type
//             </p>
//           </div>

//           {/* Template Color */}
//           <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
//             <div className="flex items-center space-x-3 mb-4">
//               <Palette className="w-5 h-5 text-teal-400" />
//               <h3 className="text-white text-lg font-medium">Template Color</h3>
//             </div>
//             <div className="relative">
//               <select
//                 value={formData.templateColor}
//                 onChange={(e) => handleInputChange('templateColor', e.target.value)}
//                 className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent cursor-pointer"
//               >
//                 <option value="White" className="bg-slate-900">White</option>
//                 <option value="Black" className="bg-slate-900">Black</option>
//               </select>
//               <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
//             </div>
//             <p className="text-blue-400 text-sm mt-2 flex items-center">
//               <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
//               Choose between black or white template style
//             </p>
//           </div>

//           {/* Upload Artwork */}
//           <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
//             <div className="flex items-center space-x-3 mb-4">
//               <Image className="w-5 h-5 text-teal-400" />
//               <h3 className="text-white text-lg font-medium">Upload Artwork</h3>
//             </div>
            
//             <div 
//               className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
//                 dragActive 
//                   ? 'border-teal-400 bg-teal-400/10' 
//                   : 'border-slate-600 hover:border-slate-500'
//               }`}
//               onDragEnter={handleDrag}
//               onDragLeave={handleDrag}
//               onDragOver={handleDrag}
//               onDrop={handleDrop}
//               onClick={() => fileInputRef.current?.click()}
//             >
//               {formData.artwork ? (
//                 <div className="space-y-3">
//                   <img 
//                     src={formData.artwork} 
//                     alt="Uploaded artwork" 
//                     className="max-w-32 max-h-32 mx-auto rounded-lg object-cover"
//                   />
//                   <p className="text-teal-400 font-medium">Artwork uploaded successfully!</p>
//                   <button 
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       handleInputChange('artwork', null);
//                     }}
//                     className="text-sm text-gray-400 hover:text-white underline"
//                   >
//                     Remove
//                   </button>
//                 </div>
//               ) : (
//                 <div className="space-y-3">
//                   <div className="mx-auto w-16 h-16 border-2 border-dashed border-gray-500 rounded-lg flex items-center justify-center">
//                     <Upload className="w-6 h-6 text-gray-400" />
//                   </div>
//                   <div>
//                     <p className="text-white font-medium">Upload a file</p>
//                     <p className="text-gray-400 text-sm">or drag and drop</p>
//                     <p className="text-gray-500 text-xs mt-1">PNG, JPG, GIF up to 5MB</p>
//                   </div>
//                 </div>
//               )}
              
//               <input
//                 ref={fileInputRef}
//                 type="file"
//                 accept=".png,.jpg,.jpeg,.gif"
//                 onChange={handleFileSelect}
//                 className="hidden"
//               />
//             </div>
//           </div>

//           {/* Action Buttons */}
//           <div className="flex space-x-4">
//             <button
//               onClick={handleReset}
//               className="flex items-center space-x-2 px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
//             >
//               <RotateCcw className="w-4 h-4" />
//               <span>Reset</span>
//             </button>
            
//             <button
//               onClick={handleDownload}
//               className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg transition-all shadow-lg"
//             >
//               <Download className="w-4 h-4" />
//               <span>Download PNG</span>
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default IrysCardCreator;