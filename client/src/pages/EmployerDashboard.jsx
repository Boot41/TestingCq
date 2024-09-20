import React, { useState } from 'react';

// EmployerDashboard Component
const EmployerDashboard = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  
  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const toggleSidebarVisibility = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header */}
      <header className="bg-gray-200 shadow-md p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">Employer Dashboard</h1>
          <button onClick={toggleSidebarVisibility} aria-label="Toggle Sidebar" className="md:hidden">
            {/* Hamburger Icon */}
            ☰
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        {isSidebarVisible && (
          <aside className={`bg-gray-800 text-white transition-width duration-300 ${isSidebarCollapsed ? 'w-16' : 'w-1/4'}`}>
            <div className="flex items-center justify-between p-2">
              {/* Sidebar Toggle Button */}
              <button onClick={toggleSidebar} aria-label="Collapse Sidebar">
                {isSidebarCollapsed ? '>' : '<'}
              </button>
            </div>
            <nav>
              <ul>
                <li className={`p-2 ${isSidebarCollapsed ? 'flex justify-center' : ''}`}>
                  <a href="/job-postings" className={`block ${isSidebarCollapsed ? 'text-center' : ''}`}>
                    {isSidebarCollapsed ? 'P' : 'Job Postings'}
                  </a>
                </li>
                <li className={`p-2 ${isSidebarCollapsed ? 'flex justify-center' : ''}`}>
                  <a href="/dashboard" className={`block ${isSidebarCollapsed ? 'text-center' : ''}`}>
                    {isSidebarCollapsed ? 'D' : 'Dashboard'}
                  </a>
                </li>
              </ul>
            </nav>
          </aside>
        )}

        {/* Main Area */}
        <main className="flex-1 p-4">
          {/* Job Posting Form */}
          <JobPostingForm onPostSuccess={() => alert('Job posted successfully!')} />

          {/* Job Listing Manager */}
          <JobListingManager />

          {/* Success Notification */}
          <JobPostSuccessNotification />
        </main>
      </div>
    </div>
  );
};

// JobPostingForm Component
const JobPostingForm = ({ onPostSuccess }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onPostSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 p-4 border border-gray-300 shadow-md">
      <h2 className="text-lg font-bold mb-2">Post a Job</h2>
      {/* Form Fields */}
      <input type="text" placeholder="Job Title" className="block w-full p-2 mb-2 border" required />
      <textarea placeholder="Job Description" className="block w-full p-2 mb-2 border" required />
      <button type="submit" className="bg-blue-500 text-white p-2">Post Job</button>
    </form>
  );
};

// JobListingManager Component (Placeholder)
const JobListingManager = () => {
  return (
    <div className="p-4 border border-gray-300 shadow-md">
      <h2 className="text-lg font-bold mb-2">Job Listings</h2>
      {/* Placeholder for Job Listings */}
      <p>No job listings available.</p>
    </div>
  );
};

// JobPostSuccessNotification Component
const JobPostSuccessNotification = () => {
  return (
    <div className="fixed bottom-4 right-4 bg-green-100 border border-green-300 text-green-800 p-4 shadow-md" role="alert">
      Job posted successfully!
    </div>
  );
};

// Export the EmployerDashboard component
export default EmployerDashboard;