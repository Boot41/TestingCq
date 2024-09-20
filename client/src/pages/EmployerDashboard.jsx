import React, { useState } from 'react';

// Header component
const Header = ({ toggleSidebar }) => (
  <header className="flex justify-between items-center p-4 shadow-lg bg-white">
    <h1 className="text-xl font-bold">Employer Dashboard</h1>
    <button 
      onClick={toggleSidebar} 
      className="p-2 bg-gray-200 rounded"
      aria-label="Toggle Sidebar"
    >
      ☰
    </button>
  </header>
);

// Sidebar component
const Sidebar = ({ isOpen, toggleSidebar }) => (
  <aside 
    className={`transition-all duration-300 ${isOpen ? 'w-1/4' : 'w-16'} bg-gray-800 text-white`}
    aria-hidden={!isOpen}
  >
    <nav>
      <a href="#job-postings" className="block p-4 hover:bg-blue-500" aria-current="page">
        {isOpen ? 'Job Postings' : 'JP'}
      </a>
      <a href="#dashboard" className="block p-4 hover:bg-blue-500">
        {isOpen ? 'Dashboard' : 'D'}
      </a>
    </nav>
  </aside>
);

// JobPostingForm component
const JobPostingForm = ({ onPostSuccess }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    onPostSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border border-gray-300">
      <h2 className="font-bold">Post a Job</h2>
      <input type="text" placeholder="Job Title" required className="p-2 w-full border border-gray-300" />
      <textarea placeholder="Job Description" required className="p-2 w-full border border-gray-300" />
      <button type="submit" className="mt-2 p-2 bg-blue-500 text-white">Post Job</button>
    </form>
  );
};

// JobListingManager component
const JobListingManager = () => (
  <div className="p-4 border border-gray-300">
    <h2 className="font-bold">Current Job Listings</h2>
    <p>No listings available.</p>
  </div>
);

// JobPostSuccessNotification component
const JobPostSuccessNotification = ({ message }) => (
  <div className={`p-4 bg-green-100 border border-green-300 text-green-700`} role="alert">
    {message}
  </div>
);

// EmployerDashboard component
const EmployerDashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [notification, setNotification] = useState('');

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleSuccess = () => {
    setNotification('Job posted successfully!');
    setTimeout(() => setNotification(''), 3000); // remove notification after 3 seconds
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <Header toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <main className="flex-1 p-4">
        {notification && <JobPostSuccessNotification message={notification} />}
        <JobPostingForm onPostSuccess={handleSuccess} />
        <JobListingManager />
      </main>
    </div>
  );
};

export default EmployerDashboard;