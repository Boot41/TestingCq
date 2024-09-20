import React from 'react';
import ApplicantManager from './ApplicantManager';
import './App.css'; // Assuming a CSS file for additional styles if needed

const App = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <header className="sticky top-0 bg-white shadow-md z-10">
        <h1 className="text-2xl font-bold p-4">Applicant Management System</h1>
      </header>
      <main className="flex-grow p-4">
        <ApplicantManager />
      </main>
    </div>
  );
};

export default App;

// ApplicantManager Component
const ApplicantManager = () => {
  // Example state for applicants
  const [applicants, setApplicants] = React.useState([]);

  return (
    <div className="space-y-4">
      {applicants.map(applicant => (
        <div key={applicant.id} className="border p-4 rounded-md shadow">
          <h2 className="text-xl">{applicant.name}</h2>
          <ApplicationStatusUpdater applicant={applicant} />
        </div>
      ))}
    </div>
  );
};

// ApplicationStatusUpdater Component
const ApplicationStatusUpdater = ({ applicant }) => {
  const [status, setStatus] = React.useState(applicant.status || '');

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleUpdate = () => {
    // Logic to update status
    console.log(`Updated status for ${applicant.name}: ${status}`);
  };

  return (
    <div className="mt-2">
      <label htmlFor={`status-${applicant.id}`} className="mr-2">
        Status:
      </label>
      <select
        id={`status-${applicant.id}`}
        value={status}
        onChange={handleStatusChange}
        className="p-2 border rounded"
        aria-label="Applicant status"
      >
        <option value="Pending">Pending</option>
        <option value="Interview">Interview</option>
        <option value="Hired">Hired</option>
        <option value="Rejected">Rejected</option>
      </select>
      <button
        onClick={handleUpdate}
        className="ml-2 p-2 bg-blue-500 text-white rounded"
        aria-label={`Update status for ${applicant.name}`}
      >
        Update
      </button>
    </div>
  );
};