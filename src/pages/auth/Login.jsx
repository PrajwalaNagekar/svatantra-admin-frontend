import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import loginImage from '../../assets/images/image.png';
import PopupModal from '../../components/popupModal/PopupModal';
import { adminLogin } from '../../api';



const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [popup, setPopup] = useState({ visible: false, type: '', message: '' });
    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await adminLogin({ email, password });

            if (res?.data?.success) {
                const token = res.data.token;

                localStorage.setItem('token', token);
                navigate('/admin/dashboard');
            } else {
                setPopup({
                    visible: true,
                    type: 'error',
                    message: res?.data?.message || 'Login failed',
                });
            }
        } catch (error) {
            setPopup({
                visible: true,
                type: 'error',
                message: 'Something went wrong. Please try again.',
            });
            console.error("Login error:", error);
        }
    };

    return (
        <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-gray-100 font-sans">
            {/* Left Image Section */}
            <div className="hidden md:block">
                <img
                    src={loginImage}
                    alt="Login Visual"
                    className=" h-screen object-cover"
                />
            </div>

            {/* Right Form Section */}
            <div className="flex items-center justify-center p-8 bg-white">
                {popup.visible && (
                    <PopupModal
                        type={popup.type}
                        message={popup.message}
                        onClose={() => setPopup({ visible: false, type: '', message: '' })}
                    />
                )}
                <form
                    onSubmit={handleLogin}
                    className="w-full max-w-md space-y-6"
                >
                    <h2 className="text-3xl font-bold text-center text-black underline decoration-pink-500 underline-offset-4">
                        Admin Login
                    </h2>

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 bg-gray-100 rounded-lg focus:ring-2 focus:ring-pink-500 outline-none"
                        required
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 bg-gray-100 rounded-lg focus:ring-2 focus:ring-pink-500 outline-none"
                        required
                    />

                    <button
                        type="submit"
                        className="w-full bg-pink-600 text-white py-3 rounded-lg font-bold hover:bg-pink-700 transition"
                    >
                        Login
                    </button>

                    {/* <p className="text-center text-gray-500 text-sm">
                        © {new Date().getFullYear()}  Admin Panel
                    </p> */}
                </form>
            </div>
        </div>
    );
};

export default Login;
