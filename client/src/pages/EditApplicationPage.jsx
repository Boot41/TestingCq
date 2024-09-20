import React from 'react';

// Header Component
const Header = () => (
  <header className="bg-white shadow-md p-4">
    <h1 className="text-xl font-bold" aria-label="Edit Application Page">Edit Application</h1>
    <nav>
      <a href="/dashboard" className="text-blue-500 hover:underline" tabIndex="0">Dashboard</a>
    </nav>
  </header>
);

// ApplicationEditForm Component
const ApplicationEditForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Confirmation dialog
    const isConfirmed = window.confirm("Are you sure you want to save changes?");
    if (isConfirmed) {
      // Handle save
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 border border-gray-300 rounded shadow-md">
      <div className="mb-4">
        <label htmlFor="jobTitle" className="block text-gray-700">Job Title</label>
        <input type="text" id="jobTitle" required className="w-full p-2 border border-gray-400 rounded" />
      </div>
      <div className="mb-4">
        <label htmlFor="companyName" className="block text-gray-700">Company Name</label>
        <input type="text" id="companyName" required className="w-full p-2 border border-gray-400 rounded" />
      </div>
      <div className="mb-4">
        <label htmlFor="applicationDate" className="block text-gray-700">Application Date</label>
        <input type="date" id="applicationDate" required className="w-full p-2 border border-gray-400 rounded" />
      </div>
      <div className="mb-4">
        <label htmlFor="status" className="block text-gray-700">Status</label>
        <select id="status" required className="w-full p-2 border border-gray-400 rounded">
          <option value="">Select status</option>
          <option value="applied">Applied</option>
          <option value="interview">Interview</option>
          <option value="offer">Offer</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block text-gray-700">Description</label>
        <textarea id="description" rows="4" required className="w-full p-2 border border-gray-400 rounded"></textarea>
      </div>
      <div className="flex justify-between">
        <button type="button" onClick={() => window.location.href = '/dashboard'} className="bg-gray-300 p-2 rounded">Cancel</button>
        <button type="button" onClick={() => window.confirm("Are you sure you want to delete this application?")} className="bg-red-500 text-white p-2 rounded">Delete</button>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Save</button>
      </div>
    </form>
  );
};

// Footer Component
const Footer = () => (
  <footer className="bg-white shadow-md p-4 mt-auto">
    <p className="text-center text-gray-600">© 2023 Your Company. All rights reserved.</p>
    <nav className="flex justify-center space-x-4">
      <a href="/privacy" className="text-blue-500 hover:underline">Privacy Policy</a>
      <a href="/terms" className="text-blue-500 hover:underline">Terms of Service</a>
    </nav>
  </footer>
);

// Page Layout Component
const EditApplicationPage = () => (
  <div className="flex flex-col h-screen">
    <Header />
    <main className="flex-1 p-4">
      <ApplicationEditForm />
    </main>
    <Footer />
  </div>
);

// Exporting the page layout
export default EditApplicationPage;