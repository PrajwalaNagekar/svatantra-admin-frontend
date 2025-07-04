import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
    Menu,
    LayoutDashboard,
    UserCheck,
    FileText,
    Book,
    MessageCircle,
    Image,
    Calendar,
    LogOut
} from 'lucide-react';
import Logo from '../assets/images/logos/swatantra_logo.png';

const Sidebar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false); // for desktop
    const navigate = useNavigate();

    const navLinks = [
        { name: 'Dashboard', path: '/admin/dashboard', icon: <LayoutDashboard size={20} /> },
        { name: 'Admissions', path: '/admin/applications', icon: <UserCheck size={20} /> },
        { name: 'Teacher Applications', path: '/admin/teacher-applications', icon: <FileText size={20} /> },
        { name: 'Visits Bookings', path: '/admin/visits', icon: <Book size={20} /> },
        { name: 'Contact', path: '/admin/enquiries', icon: <MessageCircle size={20} /> },
        { name: 'Campus', path: '/admin/gallery', icon: <Image size={20} /> },
        { name: 'Events', path: '/admin/events', icon: <Calendar size={20} /> },
    ];

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <>
            {/* DESKTOP SIDEBAR */}
            <aside
                className={`hidden md:flex flex-col bg-gray-100 h-screen shadow-md p-4 justify-between transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'
                    }`}
            >
                {/* Top section */}
                <div>
                    {/* Logo & Toggle Button */}
                    <div className="flex items-center justify-between mb-8">
                        {!isCollapsed && (
                            <img src={Logo} alt="logo" className="h-10 object-contain" />
                        )}
                        <button onClick={() => setIsCollapsed((prev) => !prev)} className={`${isCollapsed ? 'mx-auto' : 'ml-auto'}`}>
                            <Menu className="text-gray-600 hover:text-pink-600 w-5 h-5" />
                        </button>
                    </div>

                    {/* Nav links */}
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
                                {!isCollapsed && <span>{link.name}</span>}
                            </NavLink>
                        ))}
                    </nav>
                </div>

                {/* Logout */}
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 text-gray-700 hover:text-red-600 hover:bg-red-50 px-4 py-2 rounded-lg transition-all"
                >
                    <LogOut size={20} />
                    {!isCollapsed && <span className="font-medium">Logout</span>}
                </button>
            </aside>

            {/* MOBILE HEADER */}
            <div className="md:hidden w-full bg-gray-100 shadow-md px-4 py-2 flex justify-between items-center">
                <img src={Logo} alt="logo" className="h-8 object-contain" />
                <button onClick={() => setIsMobileMenuOpen((prev) => !prev)}>
                    <Menu className="text-gray-700" />
                </button>
            </div>

            {/* MOBILE MENU DROPDOWN */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-white shadow-md px-4 py-2 absolute w-full z-50">
                    <nav className="flex flex-col gap-2 text-gray-700 font-medium">
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.name}
                                to={link.path}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 rounded-lg px-4 py-2 transition-all duration-200 ${isActive
                                        ? 'bg-gray-200 text-pink-600 font-semibold'
                                        : 'hover:bg-gray-100 hover:text-pink-600'
                                    }`
                                }
                            >
                                {link.icon}
                                <span>{link.name}</span>
                            </NavLink>
                        ))}
                        <button
                            onClick={() => {
                                setIsMobileMenuOpen(false);
                                handleLogout();
                            }}
                            className="flex items-center gap-3 text-gray-700 hover:text-red-600 hover:bg-red-50 px-4 py-2 rounded-lg transition-all"
                        >
                            <LogOut size={20} />
                            <span className="font-medium">Logout</span>
                        </button>
                    </nav>
                </div>
            )}
        </>
    );
};

export default Sidebar;
