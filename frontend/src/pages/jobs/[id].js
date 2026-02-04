import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { jobAPI } from '../../services/api';


export default function JobDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchJob = async () => {
      try {
        const data = await jobAPI.getJobById(id);
        setJob(data);
      } catch (error) {
        console.error('Error fetching job:', error);
        alert('Failed to fetch job details');
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
    
    // Auto-refresh every 2 seconds to see status updates
    const interval = setInterval(fetchJob, 2000);
    return () => clearInterval(interval);
  }, [id]);

  const getStatusBadge = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      running: 'bg-blue-100 text-blue-800',
      completed: 'bg-green-100 text-green-800',
      failed: 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getPriorityBadge = (priority) => {
    const colors = {
      Low: 'bg-gray-100 text-gray-800',
      Medium: 'bg-orange-100 text-orange-800',
      High: 'bg-red-100 text-red-800'
    };
    return colors[priority] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl">Loading job details...</div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-xl mb-4">Job not found</div>
          <Link href="/" className="text-blue-600 hover:underline">
            Go back to dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Job Details - {job.taskName}</title>
      </Head>

      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <Link href="/" className="text-blue-600 hover:underline mb-2 inline-block">
              ← Back to Dashboard
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">Job Details</h1>
          </div>
        </header>

        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Job ID</h3>
                  <p className="mt-1 text-lg text-gray-900">{job.id}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500">Task Name</h3>
                  <p className="mt-1 text-lg text-gray-900 font-semibold">{job.taskName}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500">Status</h3>
                  <span className={`mt-1 inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getStatusBadge(job.status)}`}>
                    {job.status}
                  </span>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500">Priority</h3>
                  <span className={`mt-1 inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getPriorityBadge(job.priority)}`}>
                    {job.priority}
                  </span>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500">Created At</h3>
                  <p className="mt-1 text-lg text-gray-900">
                    {new Date(job.createdAt).toLocaleString()}
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500">Updated At</h3>
                  <p className="mt-1 text-lg text-gray-900">
                    {new Date(job.updatedAt).toLocaleString()}
                  </p>
                </div>

                {job.completedAt && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Completed At</h3>
                    <p className="mt-1 text-lg text-gray-900">
                      {new Date(job.completedAt).toLocaleString()}
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-500 mb-2">Payload</h3>
                <pre className="bg-gray-50 border border-gray-300 rounded-lg p-4 overflow-x-auto">
                  <code className="text-sm">
                    {JSON.stringify(job.payload, null, 2)}
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
