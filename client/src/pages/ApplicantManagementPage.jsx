import React, { useState } from 'react';

// Main page layout component
const ApplicantManagementPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <header className="p-4 shadow-md bg-gray-800 text-white text-lg">
        Applicant Management System
      </header>
      <main className="p-4">
        <ApplicantManager />
      </main>
    </div>
  );
};

// Applicant manager component to display applicants
const ApplicantManager = () => {
  const [applicants, setApplicants] = useState([
    { id: 1, name: 'John Doe', status: 'Pending' },
    { id: 2, name: 'Jane Smith', status: 'Interview Scheduled' }
  ]);

  const updateStatus = (id, newStatus) => {
    setApplicants(applicants.map(app => (app.id === id ? { ...app, status: newStatus } : app)));
  };

  return (
    <div className="space-y-4">
      {applicants.map(applicant => (
        <div key={applicant.id} className="p-4 shadow-lg rounded-md">
          <h3 className="font-semibold">{applicant.name}</h3>
          <p>Status: {applicant.status}</p>
          <ApplicationStatusUpdater applicant={applicant} onUpdateStatus={updateStatus} />
          <InterviewScheduler applicant={applicant} />
        </div>
      ))}
    </div>
  );
};

// Component to update application status
const ApplicationStatusUpdater = ({ applicant, onUpdateStatus }) => {
  const handleStatusChange = () => {
    onUpdateStatus(applicant.id, 'Updated Status'); // Example status update
  };

  return (
    <button onClick={handleStatusChange} className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">
      Update Status
    </button>
  );
};

// Interview scheduler component
const InterviewScheduler = ({ applicant }) => {
  const scheduleInterview = () => {
    // Logic to schedule an interview
    alert(`Interview scheduled for ${applicant.name}`);
  };

  return (
    <button onClick={scheduleInterview} className="mt-2 bg-green-500 text-white px-4 py-2 rounded">
      Schedule Interview
    </button>
  );
};

// Export the main component
export default ApplicantManagementPage;