import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const ApplicationStatusTracker = ({ seekerId }) => {
  const [applications, setApplications] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get(`/api/job-seekers/${seekerId}/applications`);
        setApplications(response.data);
      } catch (error) {
        console.error("Error fetching applications", error);
      }
    };
    fetchApplications();
  }, [seekerId]);

  const handleViewDetails = (applicationId) => {
    history.push(`/applications/${applicationId}`);
  };

  return (
    <div aria-labelledby="status-tracker-header" className="bg-gray-100 p-4">
      <h2 id="status-tracker-header" className="font-bold text-2xl mb-4">Job Application Status Tracker</h2>
      {applications.length === 0 ? (
        <p>No applications found</p>
      ) : (
        <div className="max-h-60 overflow-y-auto">
          {applications.map((app) => (
            <div key={app.id} className="bg-white shadow-md rounded p-4 mb-2">
              <h3 className="text-lg">{app.jobTitle}</h3>
              <p className="text-sm">{new Date(app.applicationDate).toLocaleDateString()}</p>
              <p className="text-sm">{app.status}</p>
              <button
                onClick={() => handleViewDetails(app.id)}
                className="mt-2 bg-purple-700 text-white rounded py-1 px-2 transition duration-200 hover:bg-purple-600"
                aria-label={`View details for ${app.jobTitle}`}
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ApplicationStatusTracker;