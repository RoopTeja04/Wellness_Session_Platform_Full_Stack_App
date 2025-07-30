import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import API from "../APIs/api";

const Dashboard = () => {
    const navigate = useNavigate();
    const [publicSessions, setPublicSessions] = useState([]);
    const [mySessions, setMySessions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate("/");
        }
    }, [navigate]);

    useEffect(() => {
        const fetchSessions = async () => {
            try {
                const publicRes = await API.get("/sessions");
                const myRes = await API.get("/sessions/my-sessions");
                setPublicSessions(publicRes.data);
                setMySessions(myRes.data);
            } catch (err) {
                console.error("Error fetching sessions", err);
            } finally {
                setLoading(false);
            }
        };
        fetchSessions();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white p-8 rounded-xl shadow-md border border-gray-100 flex flex-col items-center"
                >
                    <div className="w-14 h-14 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                    <p className="text-gray-600 font-medium">Loading sessions...</p>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <Navbar />
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-20 pb-8"
            >

                <div className="mb-12">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
                        <h2 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500">
                            Public Sessions
                        </h2>
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => navigate("/editor")}
                            className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-blue-600 to-teal-500 text-white rounded-lg hover:shadow-lg transition-all duration-200 font-semibold cursor-pointer"
                        >
                            Create Session
                        </motion.button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
                        {publicSessions.length > 0 ? (
                            publicSessions.map((session) => (
                                <motion.div
                                    key={session._id}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4 }}
                                    whileHover={{ y: -4 }}
                                    onClick={() => navigate("/editor", { state: { session } })}
                                    className="cursor-pointer bg-white shadow-md hover:shadow-xl rounded-xl p-6 transition-all duration-200 border border-gray-100"
                                >
                                    <h3 className="font-bold text-lg sm:text-xl text-gray-800 mb-3">{session.title}</h3>
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {session.tags?.map((tag, index) => (
                                            <span key={index} className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-medium">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-50 text-xs sm:text-sm">
                                        <span className="px-3 py-1 bg-green-50 text-green-600 rounded-full">{session.status}</span>
                                        <span className="text-gray-500">
                                            {new Date(session.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="col-span-3 text-center text-gray-500 py-8 bg-white rounded-xl shadow-sm border border-gray-100"
                            >
                                No public sessions available.
                            </motion.p>
                        )}
                    </div>
                </div>

                <div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500 mb-8">
                        My Sessions
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
                        {mySessions.length > 0 ? (
                            mySessions.map((session) => (
                                <motion.div
                                    key={session._id}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4 }}
                                    whileHover={{ y: -4 }}
                                    onClick={() => navigate("/editor", { state: { session } })}
                                    className="cursor-pointer bg-white shadow-md hover:shadow-xl rounded-xl p-6 transition-all duration-200 border border-gray-100"
                                >
                                    <h3 className="font-bold text-lg sm:text-xl text-gray-800 mb-3">{session.title}</h3>
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {session.tags?.map((tag, index) => (
                                            <span key={index} className="px-3 py-1 bg-purple-50 text-purple-600 rounded-full text-xs font-medium">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-50 text-xs sm:text-sm">
                                        <span className={`px-3 py-1 rounded-full ${session.status === "draft" ? "bg-yellow-50 text-yellow-600" : "bg-green-50 text-green-600"}`}>
                                            {session.status}
                                        </span>
                                        <span className="text-gray-500">
                                            {new Date(session.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="col-span-3 text-center text-gray-500 py-8 bg-white rounded-xl shadow-sm border border-gray-100"
                            >
                                You haven’t created any sessions yet.
                            </motion.p>
                        )}
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Dashboard;