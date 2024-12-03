const mongoose = require('mongoose');

const PromptSchema = new mongoose.Schema({
  promptText: { type: String, required: true },
  category: { type: String, required: true },
  status: { type: String, default: 'pending' }, // "pending", "approved", "rejected"
  submittedBy: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Prompt', PromptSchema);
