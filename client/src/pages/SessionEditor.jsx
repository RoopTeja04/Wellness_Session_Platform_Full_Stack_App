import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import API from "../APIs/api";
import toast, { Toaster } from "react-hot-toast";

const SessionEditor = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const sessionData = location.state?.session || {};

    const [title, setTitle] = useState(sessionData.title || "");
    const [tags, setTags] = useState(sessionData.tags?.join(", ") || "");
    const [jsonUrl, setJsonUrl] = useState(sessionData.json_file_url || "");
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (title.trim()) handleSaveDraft(false);
        }, 5000);
        return () => clearTimeout(timeout);
    }, [title, tags, jsonUrl]);

    const handleSaveDraft = async (showToast = true) => {
        if (!title.trim()) {
            if (showToast) toast.error("Title is required");
            return;
        }
        try {
            setSaving(true);
            const res = await API.post("/sessions/my-sessions/save-draft", {
                id: sessionData._id,
                title,
                tags: tags.split(",").map(tag => tag.trim()).filter(tag => tag),
                json_file_url: jsonUrl
            });

            if (!sessionData._id && res.data.session?._id) {
                sessionData._id = res.data.session._id;
            }

            if (showToast) toast.success("Draft saved!");

            if (!sessionData._id) {
                setTitle("");
                setTags("");
                setJsonUrl("");
            }
        } catch (err) {
            toast.error("Failed to save draft");
        } finally {
            setSaving(false);
        }
    };

    const handlePublish = async () => {
        try {
            await handleSaveDraft(false);
            await API.post("/sessions/my-sessions/publish", { id: sessionData._id });
            toast.success("Session published!");
            setTimeout(() => navigate("/dashboard"), 1200);
        } catch (err) {
            toast.error("Failed to publish");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <Toaster position="top-center" />
            <Navbar />
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="max-w-3xl mx-auto px-3 sm:px-6 lg:px-8 pt-20 pb-8"
            >
                <div className="bg-white shadow-md rounded-xl p-6 sm:p-8">
                    <h2 className="text-xl sm:text-2xl font-bold mb-6 text-gray-800">
                        {sessionData._id ? "Edit Session" : "Create Session"}
                    </h2>
                    <input
                        type="text"
                        placeholder="Session Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full border rounded-lg px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400 text-base"
                    />
                    <input
                        type="text"
                        placeholder="Tags (comma separated)"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                        className="w-full border rounded-lg px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400 text-base"
                    />
                    <input
                        type="url"
                        placeholder="JSON File URL"
                        value={jsonUrl}
                        onChange={(e) => setJsonUrl(e.target.value)}
                        className="w-full border rounded-lg px-4 py-3 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-400 text-base"
                    />
                    <div className="flex flex-col sm:flex-row gap-4">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleSaveDraft()}
                            disabled={saving}
                            className="w-full sm:w-auto px-6 py-3 bg-yellow-500 text-white rounded-lg shadow hover:shadow-lg disabled:opacity-50"
                        >
                            {saving ? "Saving..." : "Save Draft"}
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handlePublish}
                            className="w-full sm:w-auto px-6 py-3 bg-green-600 text-white rounded-lg shadow hover:shadow-lg"
                        >
                            Publish
                        </motion.button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default SessionEditor;