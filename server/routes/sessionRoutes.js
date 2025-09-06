const express = require('express');
const Session = require('../models/Session');
const authMiddleware = require("../middleware/authmiddlewares")
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const sessions = await Session.find({ status: 'published' }).sort({ createdAt: -1 });
        return res.status(200).json(sessions);
    } catch (err) {
        console.error("Error fetching sessions:", err);
        return res.status(500).json({ error: "Server Down" });
    }
});

router.get('/my-sessions', authMiddleware, async (req, res) => {
    try {
        const sessions = await Session.find({ user_Id: req.user.id }).sort({ createdAt: -1 });
        return res.status(200).json(sessions);
    } catch (err) {
        console.error("Error fetching user sessions:", err);
        return res.status(500).json({ error: "Server Down" });
    }
});


router.get('/my-sessions/:id', authMiddleware, async (req, res) => {
    try {
        const session = await Session.findOne({ _id: req.params.id, user_Id: req.user.id });
        if (!session) 
            return res.status(404).json({ message: "Session not found" });
        return res.status(200).json(session);
    } catch (err) {
        console.error("Error fetching session:", err);
        return res.status(500).json({ error: "Something went wrong" });
    }
});

router.post('/my-sessions/save-draft', authMiddleware, async (req, res) => {
    try {
        const { id, title, tags, json_file_url } = req.body;
        if (!title) 
            return res.status(400).json({ error: "Title is required" });

        let session;
        if (id) {
            session = await Session.findOneAndUpdate(
                { _id: id, user_Id: req.user.id },
                { title, tags, json_file_url, status: "draft", updatedAt: Date.now() },
                { new: true, runValidators: true }
            );
        } else {
            session = new Session({
                user_Id: req.user.id,
                title,
                tags,
                json_file_url,
                status: "draft"
            });
            await session.save();
        }
        return res.status(200).json({ message: "Session saved as draft", session });
    } catch (err) {
        console.error("Error saving draft:", err);
        return res.status(500).json({ error: "Failed to save draft" });
    }
});

router.post('/my-sessions/publish', authMiddleware, async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) 
            return res.status(400).json({ error: "Session ID is required" });

        const session = await Session.findOneAndUpdate(
            { _id: id, user_Id: req.user.id },
            { status: "published", updatedAt: Date.now() },
            { new: true }
        );
        if (!session) 
            return res.status(404).json({ message: "Session not found" });
        return res.status(200).json({ message: "Session published successfully", session });
    } catch (err) {
        console.error("Error publishing session:", err);
        return res.status(500).json({ error: "Failed to publish session" });
    }
});

module.exports = router;