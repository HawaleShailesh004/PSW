const express = require('express');
const router = express.Router();
const Prompt = require("../models/promptModel");

// Submit a new prompt
router.post('/submit', async (req, res) => {
  try {
    const { promptText, category, submittedBy } = req.body;
    const newPrompt = new Prompt({ promptText, category, submittedBy });
    await newPrompt.save();
    res.status(201).json({ message: 'Prompt submitted successfully!' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to submit prompt.' });
  }
});

// Get pending prompts for moderation
router.get('/pending', async (req, res) => {
  try {
    const pendingPrompts = await Prompt.find({ status: 'pending' });
    res.json(pendingPrompts);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch pending prompts.' });
  }
});

// Approve or reject a prompt
router.put('/moderate/:id', async (req, res) => {
  try {
    const { status } = req.body; // "approved" or "rejected"
    await Prompt.findByIdAndUpdate(req.params.id, { status });
    res.json({ message: 'Prompt status updated successfully!' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update prompt status.' });
  }
});

// List approved prompts
router.get('/approved', async (req, res) => {
  try {
    const approvedPrompts = await Prompt.find({ status: 'approved' });
    res.json(approvedPrompts);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch approved prompts.' });
  }
});

module.exports = router;
