import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar';

const FullLayout = () => {
  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden">
      <Sidebar />

      <main className="flex-1 overflow-y-auto bg-gray-50 p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default FullLayout;
