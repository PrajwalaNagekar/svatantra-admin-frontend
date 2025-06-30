import React from 'react';

const Login = () => {
    return (
        <div className="w-full max-w-sm mx-auto p-6 bg-white rounded-xl shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-center">Admin Login</h2>
            <form>
                <input type="text" placeholder="Username" className="w-full mb-3 p-2 border rounded" />
                <input type="password" placeholder="Password" className="w-full mb-3 p-2 border rounded" />
                <button type="submit" className="w-full bg-pink-600 text-white py-2 rounded hover:bg-pink-700">Login</button>
            </form>
        </div>
    );
};

export default Login;
