const express = require('express');
const router = express.Router();
const {
  createJob,
  getAllJobs,
  getJobById,
  runJob
} = require('../controllers/jobController');

// Create a new job
router.post('/jobs', createJob);

// Get all jobs (with optional filters)
router.get('/jobs', getAllJobs);

// Get single job by ID
router.get('/jobs/:id', getJobById);

// Run a job
router.post('/run-job/:id', runJob);

module.exports = router;
