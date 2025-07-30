import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaHome, FaUser, FaSignOutAlt } from "react-icons/fa";

const Navbar = () => {
    const navigate = useNavigate();
    const [isScrolled, setIsScrolled] = useState(false);
    const [showProfileMenu, setShowProfileMenu] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={`fixed w-full top-0 z-50 transition-all duration-300 ${
                isScrolled 
                ? "bg-white/80 backdrop-blur-md shadow-lg"
                : "bg-white shadow"
            }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <motion.div 
                        className="flex items-center"
                        whileHover={{ scale: 1.02 }}
                    >
                        <h1
                            onClick={() => navigate("/dashboard")}
                            className="flex items-center space-x-2 text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500 cursor-pointer"
                        >
                            <FaHome className="text-blue-600" />
                            <span>Arvyax</span>
                        </h1>
                    </motion.div>

                    <div className="flex items-center">
                        <div className="relative">
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                className="p-2 text-gray-600 hover:text-blue-600 rounded-full hover:bg-blue-50 transition-colors cursor-pointer"
                                onClick={() => setShowProfileMenu(!showProfileMenu)}
                            >
                                <FaUser size={20} />
                            </motion.button>

                            <AnimatePresence>
                                {showProfileMenu && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border py-1.5"
                                    >
                                        <button
                                            onClick={handleLogout}
                                            className="w-full px-2 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center justify-center space-x-2 cursor-pointer transition-colors"
                                        >
                                            <FaSignOutAlt />
                                            <span>Logout</span>
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </motion.nav>
    );
};

export default Navbar;