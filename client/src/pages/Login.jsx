import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaEye, FaEyeSlash, FaEnvelope, FaLock } from "react-icons/fa";
import API from "../APIs/api";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const containerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: {
                type: "spring",
                damping: 20,
                stiffness: 100
            }
        },
        exit: { 
            opacity: 0,
            y: -50,
            transition: { duration: 0.2 }
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const res = await API.post("/auth/login", { email, password });
            localStorage.setItem("token", res.data.token);
            setError("");
            setTimeout(() => {
                navigate("/dashboard", { replace: true });
            }, 500);
        } catch (err) {
            setError(err.response?.data?.error || "Login failed");
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-100">
            <AnimatePresence mode="wait">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="w-full max-w-md px-4"
                >
                    <form onSubmit={handleLogin} className="bg-white p-8 shadow-xl rounded-lg space-y-6 relative overflow-hidden">
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 opacity-50"
                            animate={{
                                scale: [1, 1.02, 1],
                                transition: { duration: 3, repeat: Infinity }
                            }}
                        />
                        
                        <motion.h2 
                            className="text-3xl font-bold text-center text-gray-800 relative"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, type: "spring" }}
                        >
                            Welcome Back
                        </motion.h2>
                        
                        <AnimatePresence>
                            {error && (
                                <motion.div 
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="relative"
                                >
                                    <p className="text-red-500 text-center p-3 bg-red-50 rounded-lg border border-red-100">
                                        {error}
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="space-y-4 relative">
                            <motion.div
                                className="relative"
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                            >
                                <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="email"
                                    placeholder="Email"
                                    className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </motion.div>
                            
                            <motion.div
                                className="relative"
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                            >
                                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                    className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <motion.button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                                </motion.button>
                            </motion.div>
                        </div>

                        <motion.button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full relative py-3 rounded-lg font-semibold text-white shadow-md overflow-hidden ${isLoading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'}`}
                            whileHover={!isLoading ? { scale: 1.02 } : {}}
                            whileTap={!isLoading ? { scale: 0.98 } : {}}
                        >
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 cursor-pointer"
                                animate={isLoading ? {
                                    x: ["-100%", "100%"],
                                    transition: { repeat: Infinity, duration: 1.5 }
                                } : {}}
                            />
                            <span className="relative cursor-pointer">
                                {isLoading ? "Logging in..." : "Login"}
                            </span>
                        </motion.button>

                        <motion.p 
                            className="text-sm text-gray-900 text-center"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.8 }}
                            transition={{ delay: 0.3 }}
                        >
                            Don't have an account?{" "}
                            <button 
                                onClick={() => navigate("/register")}
                                className="text-blue-500 hover:text-blue-700 font-medium transition-colors cursor-pointer"
                            >
                                Create one
                            </button>
                        </motion.p>
                    </form>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}

export default Login