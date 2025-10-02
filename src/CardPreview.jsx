import React from 'react';
import NeonCard from './ProfileCard';

const CardPreview = ({ formData }) => {
  return (
    <div className="lg:sticky lg:top-8">
      <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-2xl border border-gray-200 relative overflow-hidden">
        {/* Overlay to block any background bleed */}
        <div className="absolute inset-0 bg-white -z-10"></div>
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Live Preview</h2>
        <div className="flex justify-center transform scale-90 hover:scale-95 transition-transform duration-300">
          <NeonCard 
            name={formData.name || 'Your Name'}
            imageUrl={formData.artwork || 'https://via.placeholder.com/250'}
            role={formData.role}
            track={formData.track}
          />
        </div>
      
        <p className="text-center text-sm text-gray-600 mt-4">
          {formData.name ? 'Your card updates in real-time' : 'Fill in the form to see your card'}
        </p>
      </div>
    </div>
  );
};

export default CardPreview;
