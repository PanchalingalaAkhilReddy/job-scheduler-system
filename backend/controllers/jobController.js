const db = require('../database/db');
const { triggerWebhook } = require('../services/webhookService');

// Create a new job
async function createJob(req, res) {
  try {
    const { taskName, payload, priority } = req.body;

    // Validation
    if (!taskName || !priority) {
      return res.status(400).json({ error: 'taskName and priority are required' });
    }

    const validPriorities = ['Low', 'Medium', 'High'];
    if (!validPriorities.includes(priority)) {
      return res.status(400).json({ error: 'priority must be Low, Medium, or High' });
    }

    // Insert job into database
    const [result] = await db.query(
      'INSERT INTO jobs (taskName, payload, priority, status) VALUES (?, ?, ?, ?)',
      [taskName, JSON.stringify(payload || {}), priority, 'pending']
    );

    res.status(201).json({
      message: 'Job created successfully',
      jobId: result.insertId
    });
  } catch (error) {
    console.error('Create job error:', error);
    res.status(500).json({ error: 'Failed to create job' });
  }
}

// Get all jobs with optional filters
async function getAllJobs(req, res) {
  try {
    const { status, priority } = req.query;
    
    let query = 'SELECT * FROM jobs WHERE 1=1';
    const params = [];

    if (status) {
      query += ' AND status = ?';
      params.push(status);
    }

    if (priority) {
      query += ' AND priority = ?';
      params.push(priority);
    }

    query += ' ORDER BY createdAt DESC';

    const [jobs] = await db.query(query, params);
    
    // Parse JSON payload for each job
    const formattedJobs = jobs.map(job => ({
      ...job,
      payload: typeof job.payload === 'string' ? JSON.parse(job.payload) : job.payload
    }));

    res.json(formattedJobs);
  } catch (error) {
    console.error('Get jobs error:', error);
    res.status(500).json({ error: 'Failed to fetch jobs' });
  }
}

// Get single job by ID
async function getJobById(req, res) {
  try {
    const { id } = req.params;

    const [jobs] = await db.query('SELECT * FROM jobs WHERE id = ?', [id]);

    if (jobs.length === 0) {
      return res.status(404).json({ error: 'Job not found' });
    }

    const job = jobs[0];
    job.payload = typeof job.payload === 'string' ? JSON.parse(job.payload) : job.payload;

    res.json(job);
  } catch (error) {
    console.error('Get job error:', error);
    res.status(500).json({ error: 'Failed to fetch job' });
  }
}

// Run a job (simulate background processing)
async function runJob(req, res) {
  try {
    const { id } = req.params;

    // Check if job exists
    const [jobs] = await db.query('SELECT * FROM jobs WHERE id = ?', [id]);
    
    if (jobs.length === 0) {
      return res.status(404).json({ error: 'Job not found' });
    }

    const job = jobs[0];

    // Check if job is already running or completed
    if (job.status === 'running') {
      return res.status(400).json({ error: 'Job is already running' });
    }

    if (job.status === 'completed') {
      return res.status(400).json({ error: 'Job is already completed' });
    }

    // Set status to running
    await db.query(
      'UPDATE jobs SET status = ?, updatedAt = NOW() WHERE id = ?',
      ['running', id]
    );

    // Send immediate response
    res.json({ message: 'Job started', jobId: id });

    // Simulate background processing
    setTimeout(async () => {
      try {
        // Set status to completed
        await db.query(
          'UPDATE jobs SET status = ?, completedAt = NOW(), updatedAt = NOW() WHERE id = ?',
          ['completed', id]
        );

        // Get updated job data
        const [updatedJobs] = await db.query('SELECT * FROM jobs WHERE id = ?', [id]);
        const completedJob = updatedJobs[0];
        completedJob.payload = typeof completedJob.payload === 'string' 
          ? JSON.parse(completedJob.payload) 
          : completedJob.payload;

        // Trigger webhook
        await triggerWebhook(completedJob);

        console.log(`Job ${id} completed successfully`);
      } catch (error) {
        console.error(`Error completing job ${id}:`, error);
        // Mark job as failed
        await db.query(
          'UPDATE jobs SET status = ?, updatedAt = NOW() WHERE id = ?',
          ['failed', id]
        );
      }
    }, 3000); // 3 seconds delay

  } catch (error) {
    console.error('Run job error:', error);
    res.status(500).json({ error: 'Failed to run job' });
  }
}

module.exports = {
  createJob,
  getAllJobs,
  getJobById,
  runJob
};
