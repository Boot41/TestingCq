import React from 'react';
import JobSearchFilter from './JobSearchFilter'; // Import the filter component
import JobListing from './JobListing'; // Import the job listing component

const JobSearchPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Fixed header */}
      <header className="bg-white shadow-md">
        <nav className="container mx-auto p-4">
          <h1 className="text-xl font-bold">Job Search</h1>
          {/* Navigation items can be added here */}
        </nav>
      </header>

      {/* Main content area */}
      <main className="flex flex-1 flex-col p-4">
        <JobSearchFilter />
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Display job listings here */}
          <JobListing />
          <JobListing />
          <JobListing />
          <JobListing />
          <JobListing />
          <JobListing />
        </div>
      </main>
    </div>
  );
};

export default JobSearchPage;