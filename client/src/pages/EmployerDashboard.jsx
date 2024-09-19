import React from 'react';
import JobPostingForm from './JobPostingForm';
import JobListingManager from './JobListingManager';

const EmployerDashboard = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header with navigation */}
      <header className="bg-blue-600 text-white p-4 fixed w-full z-10" role="banner">
        <div className="container mx-auto flex justify-between items-center">
          <div className="font-bold text-lg">Site Logo</div>
          <nav aria-label="Main Navigation">
            <ul className="flex space-x-4">
              <li><a href="#jobs">Jobs</a></li>
              <li><a href="#dashboard">Dashboard</a></li>
              <li><a href="#profile">Profile</a></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Main content area */}
      <main className="flex-grow pt-16 p-4">
        <div className="container mx-auto">
          <JobPostingForm />
          <JobListingManager />
        </div>
      </main>

      {/* Fixed footer */}
      <footer className="bg-gray-800 text-white text-center p-4" role="contentinfo">
        <p>&copy; 2023 Your Company. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default EmployerDashboard;