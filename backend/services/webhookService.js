const axios = require('axios');
require('dotenv').config();

const WEBHOOK_URL = process.env.WEBHOOK_URL;

async function triggerWebhook(jobData) {
  if (!WEBHOOK_URL) {
    console.log('No webhook URL configured');
    return;
  }

  const payload = {
    jobId: jobData.id,
    taskName: jobData.taskName,
    priority: jobData.priority,
    payload: jobData.payload,
    status: jobData.status,
    completedAt: jobData.completedAt
  };

  try {
    console.log('Triggering webhook:', WEBHOOK_URL);
    console.log('Payload:', JSON.stringify(payload, null, 2));
    
    const response = await axios.post(WEBHOOK_URL, payload, {
      headers: {
        'Content-Type': 'application/json'
      },
      timeout: 5000
    });
    
    console.log('Webhook response:', response.status);
    return { success: true, status: response.status };
  } catch (error) {
    console.error('Webhook error:', error.message);
    return { success: false, error: error.message };
  }
}

module.exports = { triggerWebhook };
