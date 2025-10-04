import React, { forwardRef, useState, useEffect } from 'react';
import NeonCard from './ProfileCard';

const CardPreview = forwardRef(({ formData }, ref) => {
    const [scale, setScale] = useState(1);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const updateScale = () => {
            const width = window.innerWidth;
            const isMobileView = width < 1024;
            setIsMobile(isMobileView);
            
            if (isMobileView) {
                const availableWidth = width - 40;
                const cardWidth = 500;
                const scaleX = availableWidth / cardWidth;
                
                const availableHeight = window.innerHeight * 0.8;
                const cardHeight = 750;
                const scaleY = availableHeight / cardHeight;
                
                const newScale = Math.min(scaleX, scaleY, 1);
                setScale(newScale);
            } else {
                setScale(0.8);
            }
        };
        
        updateScale();
        window.addEventListener('resize', updateScale);
        return () => window.removeEventListener('resize', updateScale);
    }, []);

    return (
        <div className={`lg:sticky lg:top-5 w-full flex justify-center ${isMobile ? 'h-auto my-8' : ''}`}>

            
            <div 
                className="bg-white rounded-2xl p-3 lg:p-4 shadow-2xl border border-gray-200 relative overflow-visible"
                style={{
                    width: '500px',
                    height: '820px',
                    transform: `scale(${scale})`,
                    transformOrigin: 'top center',
                    margin: isMobile ? '0 auto' : '0',
                    // marginBottom: isMobile ? `${50 * (1 - scale) * 0.5}px` : '0'
                }}
            >
                    <div className="text-center mb-4">
                        <h3 className="text-lg font-semibold bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
                            Live Preview
                        </h3>
                        <div className="h-0.5 bg-gradient-to-r from-transparent via-pink-400 to-transparent w-32 mx-auto my-1"></div>
                    </div>

                <div className="flex justify-center">
                    <NeonCard
                        name={formData.name || 'Your Name'}
                        imageUrl={formData.artwork || 'https://avatars.githubusercontent.com/u/175796272?s=200&v=4'}
                        roleLevel={formData.role || 'Level 1'}
                        track={formData.track || 'Builder'}
                        ref={ref}
                    />
                </div>
                <p className="text-center text-sm text-gray-600 mt-4">
                    {formData.name ? 'Your card updates in real-time' : 'Fill in the form to see your card'}
                </p>
            </div>
        </div>
    );
});

export default CardPreview;