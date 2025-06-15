require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;
const TIMEOUT = parseInt(process.env.AGENT_TIMEOUT_MS) || 7000; // Timeout for agent responses

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev')); // logs incoming requests

// Root route
app.get('/', (req, res) => {
  res.send('🌐 Multi-Agent Router API is live!');
});

// Validate agent payload
function validateAgents(agents) {
  return Array.isArray(agents) &&
    agents.every(agent => typeof agent.name === 'string' && typeof agent.endpoint === 'string');
}

// Route for multi-agent message handling
app.post('/api/route', async (req, res, next) => {
  const { message, agents } = req.body;

  if (!message || !agents || !validateAgents(agents)) {
    return res.status(400).json({ error: 'Invalid input. Ensure `message` is a string and `agents` is a valid array.' });
  }

  try {
    const results = await Promise.allSettled(
      agents.map(async (agent) => {
        try {
          const response = await axios.post(agent.endpoint, { message }, { timeout: TIMEOUT });
          return { agent: agent.name, success: true, response: response.data };
        } catch (error) {
          return {
            agent: agent.name,
            success: false,
            error: error.code === 'ECONNABORTED' ? 'Timeout' : error.message
          };
        }
      })
    );

    const summary = results.map((r, i) => r.value || { agent: agents[i].name, success: false, error: 'Unhandled error' });

    res.json({
      success: true,
      message: 'Routing complete.',
      results: summary
    });
  } catch (err) {
    next(err); // send to global error handler
  }
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(`[SERVER ERROR] ${err.stack}`);
  res.status(500).json({ error: 'Server error', details: err.message });
});

// Start server
app.listen(PORT, () => {
  console.log(`🛰️  Multi-Agent Router is running on http://localhost:${PORT}`);
});

