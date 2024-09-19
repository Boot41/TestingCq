import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const JobListingManager = () => {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    const response = await fetch('/api/jobs');
    const data = await response.json();
    setJobs(data);
  };

  const handleEdit = (jobId) => {
    navigate(`/edit/job/${jobId}`);
  };

  const handleDelete = async (jobId) => {
    const confirmed = window.confirm('Are you sure you want to delete this job listing?');
    if (confirmed) {
      await fetch(`/api/jobs/${jobId}`, { method: 'DELETE' });
      fetchJobs();
    }
  };

  return (
    <div style={{ padding: '16px', maxWidth: '1200px', margin: '0 auto' }}>
      <h2>Job Listings</h2>
      <div style={{ display: 'none', '@media (max-width: 768px)': { display: 'block' } }}>
        {jobs.map((job, index) => (
          <div key={job.id} style={{ border: '1px solid #ccc', margin: '8px 0', padding: '16px', borderRadius: '8px' }}>
            <h3 style={{ margin: '0' }}>{job.title}</h3>
            <p>{job.company}</p>
            <p>{new Date(job.datePosted).toLocaleDateString()}</p>
            <button onClick={() => handleEdit(job.id)} style={{ border: '1px solid #D1D5DB', borderRadius: '5px', padding: '8px 16px', marginRight: '8px' }}>Edit</button>
            <button onClick={() => handleDelete(job.id)} style={{ backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '5px', padding: '8px 16px' }}>Delete</button>
          </div>
        ))}
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse', display: 'none', '@media (min-width: 768px)': { display: 'table' } }}>
        <thead>
          <tr style={{ backgroundColor: '#f1f1f1' }}>
            <th style={{ padding: '8px 16px', fontWeight: 'bold' }}>Job Title</th>
            <th style={{ padding: '8px 16px', fontWeight: 'bold' }}>Company</th>
            <th style={{ padding: '8px 16px', fontWeight: 'bold' }}>Date Posted</th>
            <th style={{ padding: '8px 16px', fontWeight: 'bold' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job, index) => (
            <tr key={job.id} style={{ backgroundColor: index % 2 === 0 ? '#ffffff' : '#f9f9f9', transition: 'background-color 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e2e2e2'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = index % 2 === 0 ? '#ffffff' : '#f9f9f9'}>
              <td style={{ padding: '8px 16px' }}>{job.title}</td>
              <td style={{ padding: '8px 16px' }}>{job.company}</td>
              <td style={{ padding: '8px 16px' }}>{new Date(job.datePosted).toLocaleDateString()}</td>
              <td style={{ padding: '8px 16px' }}>
                <button onClick={() => handleEdit(job.id)} style={{ border: '1px solid #D1D5DB', borderRadius: '5px', padding: '8px 16px', marginRight: '8px' }}>Edit</button>
                <button onClick={() => handleDelete(job.id)} style={{ backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '5px', padding: '8px 16px' }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default JobListingManager;