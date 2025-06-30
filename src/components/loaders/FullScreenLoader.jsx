import React from 'react';

const FullScreenLoader = () => {
    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white bg-opacity-70 backdrop-blur-sm space-y-4">
            <div className="w-16 h-16 border-4 border-pink-500 border-dashed rounded-full animate-spin"></div>
            <p className="text-gray-700 text-lg font-medium" style={{ fontFamily: 'Nunito, sans-serif' }}>
                Please wait while we load your information...
            </p>
        </div>
    );
};

export default FullScreenLoader;
