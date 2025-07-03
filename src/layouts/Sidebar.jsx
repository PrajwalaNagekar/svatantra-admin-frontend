import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Menu, LayoutDashboard, Users, Book, Mail, LogOut, Image, FileText, MessageCircle, UserCheck, Calendar } from 'lucide-react';
import Logo from '../assets/images/logos/swatantra_logo.png';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(true);
    const navigate = useNavigate();

    const toggleSidebar = () => setIsOpen(!isOpen);

    const navLinks = [
        { name: 'Dashboard', path: '/admin/dashboard', icon: <LayoutDashboard size={20} /> },
        { name: 'Applications', path: '/admin/applications', icon: <UserCheck size={20} /> },
        { name: 'Teacher Applications', path: '/admin/teacher-applications', icon: <FileText size={20} /> },
        { name: 'Visits', path: '/admin/visits', icon: <Book size={20} /> },
        { name: 'Enquiries', path: '/admin/enquiries', icon: <MessageCircle size={20} /> },
        { name: 'Gallery', path: '/admin/gallery', icon: <Image size={20} /> },
        { name: 'Events', path: '/admin/events', icon: <Calendar size={20} /> },

    ];

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <aside
            className={`bg-gray-100 shadow-md transition-all duration-300 ${isOpen ? 'w-64' : 'w-20'
                } h-screen p-4 flex flex-col justify-between`}
        >
            {/* Top Section */}
            <div>
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    {isOpen && (
                        <div className="flex items-center justify-center w-full">
                            <img
                                src={Logo}
                                alt="logo"
                                className="transition-all duration-300 object-contain w-30 h-10"
                            />
                        </div>
                    )}
                    <button onClick={toggleSidebar} className={`${isOpen ? 'ml-auto' : 'mx-auto'}`}>
                        <Menu className="text-gray-600 hover:text-pink-600 w-5 h-5" />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex flex-col gap-2 text-gray-700 font-medium">
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.name}
                            to={link.path}
                            className={({ isActive }) =>
                                `flex items-center gap-3 rounded-lg px-4 py-2 transition-all duration-200 ${isActive
                                    ? 'bg-gray-200 text-pink-600 font-semibold'
                                    : 'hover:bg-gray-100 hover:text-pink-600'
                                }`
                            }
                        >
                            {link.icon}
                            {isOpen && <span>{link.name}</span>}
                        </NavLink>
                    ))}
                </nav>
            </div>

            {/* Logout Button */}
            <button
                onClick={handleLogout}
                className="flex items-center gap-3 text-gray-700 hover:text-red-600 hover:bg-red-50 px-4 py-2 rounded-lg transition-all"
            >
                <LogOut size={20} />
                {isOpen && <span className="font-medium">Logout</span>}
            </button>
        </aside>
    );
};

export default Sidebar;
