import React, { useState } from 'react';

const JobDetailPage = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <header className="fixed top-0 left-0 right-0 bg-gray-800 text-white shadow-md p-4 flex justify-between items-center z-10">
        <div className="text-lg font-bold">Logo</div>
        <nav className={`flex ${menuOpen ? 'block' : 'hidden'} md:flex`}>
          <ul className="flex space-x-4">
            <li><a href="#" className="hover:underline">Home</a></li>
            <li><a href="#" className="hover:underline">About</a></li>
            <li><a href="#" className="hover:underline">Jobs</a></li>
            <li><a href="#" className="hover:underline">Contact</a></li>
          </ul>
        </nav>
        <button className="md:hidden" onClick={toggleMenu} aria-label="Toggle navigation menu">
          {menuOpen ? '✖' : '☰'}
        </button>
      </header>

      <main className="flex-grow pt-16">
        <JobDetailView />
      </main>

      <footer className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white shadow-md p-4">
        <div className="flex justify-between">
          <div>Contact info: info@example.com</div>
          <div>Social Media Links</div>
        </div>
      </footer>
    </div>
  );
};

const JobDetailView = () => {
  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold">Job Title</h1>
      <p className="mt-2">Job Description....</p>
      
      <h2 className="mt-4 font-semibold">Requirements</h2>
      <ul className="list-disc pl-5">
        <li>Requirement 1</li>
        <li>Requirement 2</li>
      </ul>
      
      <h2 className="mt-4 font-semibold">Salary</h2>
      <p>Salary Information....</p>
      
      <div className="mt-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded mr-2">Apply Now</button>
        <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded">Save Job</button>
      </div>
    </div>
  );
};

export default JobDetailPage;