import { useState } from 'react';
import Head from 'next/head';
import CreateJobForm from '../components/CreateJobForm';
import JobTable from '../components/JobTable';


export default function Home() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleJobCreated = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <>
      <Head>
        <title>Job Scheduler Dashboard</title>
        <meta name="description" content="Job Scheduler & Automation System" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Job Scheduler & Automation System
            </h1>
          </div>
        </header>

        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <CreateJobForm onJobCreated={handleJobCreated} />
            <JobTable refreshTrigger={refreshTrigger} />
          </div>
        </main>
      </div>
    </>
  );
}
