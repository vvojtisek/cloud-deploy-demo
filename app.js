const express = require('express');
const app = express();

const VERSION = process.env.APP_VERSION || require('./package.json').version;
const SHOULD_FAIL = process.env.FAIL_HEALTH_CHECK === 'true';

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Cloud Deploy Demo</title>
        <style>
          body { font-family: sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; background-color: #f4f4f9; margin: 0; }
          .card { background: white; padding: 2rem; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); text-align: center; }
          .version { font-size: 2rem; font-weight: bold; color: #0066cc; margin-top: 1rem; }
          .status { display: inline-block; padding: 0.25rem 0.75rem; border-radius: 4px; background-color: #d4edda; color: #155724; font-weight: bold; margin-top: 1rem; }
        </style>
      </head>
      <body>
        <div class="card">
          <h1>Application Dashboard</h1>
          <div class="status">System Operational</div>
          <div class="version">Version: ${VERSION}</div>
        </div>
      </body>
    </html>
  `);
});

app.get('/health', (req, res) => {
  if (SHOULD_FAIL) {
    return res.status(500).json({ status: 'error', message: 'Health check failed' });
  }
  res.status(200).json({ status: 'healthy', version: VERSION });
});

module.exports = app;
