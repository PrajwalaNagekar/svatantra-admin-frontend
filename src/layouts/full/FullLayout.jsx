import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar';

const FullLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Page Content */}
      <div className="flex-1 overflow-y-auto bg-gray-50 p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default FullLayout;
