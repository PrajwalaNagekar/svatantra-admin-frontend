import React from 'react';

const PopupModal = ({ type = 'success', message, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm bg-black/30">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-[90%] max-w-md text-center">
        <h2 className={`text-2xl font-semibold mb-4 ${type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
          {type === 'success' ? 'Success' : 'Error'}
        </h2>
        <p className="mb-6 text-gray-700">{message}</p>
        <button
          onClick={onClose}
          className="bg-pink-600 hover:bg-pink-700 text-white px-5 py-2 rounded-lg font-semibold transition"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default PopupModal;
