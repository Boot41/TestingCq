import React from 'react';

const ApplicationTrackingPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-grow p-4">
        <ApplicationStatusTracker />
      </main>
      <Footer />
    </div>
  );
};

const Header = () => {
  return (
    <header className="bg-blue-600 text-white p-4">
      <h1 className="text-lg font-bold">Application Tracking</h1>
      <nav>
        <ul className="flex space-x-4">
          <li><a href="#jobs" className="hover:underline focus:outline-none" aria-label="Job Seekers Navigation">Jobs</a></li>
          <li><a href="#profile" className="hover:underline focus:outline-none" aria-label="Profile Navigation">Profile</a></li>
        </ul>
      </nav>
    </header>
  );
};

const ApplicationStatusTracker = () => {
  const applications = [
    { id: 1, title: 'Frontend Developer', status: 'Interview', details: 'Interview scheduled on 21st Oct.' },
    { id: 2, title: 'Backend Developer', status: 'Applied', details: 'Application submitted on 15th Oct.' },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="hidden md:table w-full">
        <thead>
          <tr>
            <th className="border-b">Job Title</th>
            <th className="border-b">Status</th>
            <th className="border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {applications.map(app => (
            <tr key={app.id}>
              <td className="border-b p-2">{app.title}</td>
              <td className="border-b p-2">{app.status}</td>
              <td className="border-b p-2">
                <button className="text-blue-500 hover:underline" onClick={() => handleEdit(app.id)}>Edit</button>
                <button className="text-blue-500 hover:underline" onClick={() => handleViewDetails(app.id)}>View Details</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="md:hidden">
        {applications.map(app => (
          <div key={app.id} className="border rounded p-4 mb-4">
            <h2 className="font-bold">{app.title}</h2>
            <p>Status: {app.status}</p>
            <button className="text-blue-500 hover:underline" onClick={() => handleEdit(app.id)}>Edit</button>
            <button className="text-blue-500 hover:underline" onClick={() => handleViewDetails(app.id)}>View Details</button>
          </div>
        ))}
      </div>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-4">
      <p>&copy; 2023 Job Tracker</p>
    </footer>
  );
};

const handleEdit = (id) => {
  // Logic to open edit modal
};

const handleViewDetails = (id) => {
  // Logic to open details modal
};

export default ApplicationTrackingPage;