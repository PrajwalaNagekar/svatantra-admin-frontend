import React from 'react';
import { Link } from 'react-router-dom';

const Error = () => {
    return (
        <div className="text-center mt-20">
            <h1 className="text-4xl font-bold text-red-500">404</h1>
            <p className="text-gray-600 mt-4">Page not found</p>
            <Link to="/" className="text-blue-600 underline mt-2 block">Go to Login</Link>
        </div>
    );
};

export default Error;
