import React, { useEffect, useState } from 'react';
import axios from 'axios';

const JobListing = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('/api/jobs');
        setJobs(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const handleApplyClick = (jobId) => {
    // Redirect to job application page
    window.location.href = `/apply/${jobId}`;
  };

  const handleViewDetailsClick = (job) => {
    // Open job details in modal or new page
    alert(`Details for ${job.title}: \nCompany: ${job.company}\nLocation: ${job.location}\nType: ${job.type}\nDescription: ${job.description}`);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="grid md:grid-cols-2 gap-4">
      {jobs.map((job) => (
        <div key={job.id} className="bg-gray-100 rounded-lg shadow-lg p-5">
          <h3 className="font-bold text-lg md:text-xl">{job.title}</h3>
          <p className="text-gray-700">{job.company}</p>
          <p className="text-gray-500">{job.location}</p>
          <p className="text-gray-400">{job.type}</p>
          <div className="mt-4">
            <button
              className="bg-blue-500 text-white rounded px-4 py-2 mr-2 hover:bg-blue-600"
              onClick={() => handleApplyClick(job.id)}
              aria-label={`Apply for ${job.title}`}
            >
              Apply
            </button>
            <button
              className="bg-gray-300 text-black rounded px-4 py-2 hover:bg-gray-400"
              onClick={() => handleViewDetailsClick(job)}
              aria-label={`View details for ${job.title}`}
            >
              View Details
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default JobListing;