import { useState } from 'react';
import { jobAPI } from '../services/api';

export default function CreateJobForm({ onJobCreated }) {
  const [formData, setFormData] = useState({
    taskName: '',
    payload: '',
    priority: 'Medium'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      // Parse payload JSON
      let payloadObj = {};
      if (formData.payload.trim()) {
        try {
          payloadObj = JSON.parse(formData.payload);
        } catch (err) {
          setError('Invalid JSON in payload field');
          setIsSubmitting(false);
          return;
        }
      }

      await jobAPI.createJob({
        taskName: formData.taskName,
        payload: payloadObj,
        priority: formData.priority
      });

      // Reset form
      setFormData({
        taskName: '',
        payload: '',
        priority: 'Medium'
      });

      // Notify parent
      if (onJobCreated) {
        onJobCreated();
      }

      alert('Job created successfully!');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create job');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Create New Job</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Task Name *
          </label>
          <input
            type="text"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.taskName}
            onChange={(e) => setFormData({ ...formData, taskName: e.target.value })}
            placeholder="e.g., Send Email, Generate Report"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Payload (JSON)
          </label>
          <textarea
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
            rows="4"
            value={formData.payload}
            onChange={(e) => setFormData({ ...formData, payload: e.target.value })}
            placeholder='{"email": "test@example.com", "type": "notification"}'
          />
          <p className="text-sm text-gray-500 mt-1">Enter valid JSON or leave empty for {}</p>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Priority *
          </label>
          <select
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.priority}
            onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
        >
          {isSubmitting ? 'Creating...' : 'Create Job'}
        </button>
      </form>
    </div>
  );
}
