import React, { useState } from 'react';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-md z-10">
      <div className="container mx-auto p-4 flex justify-between items-center">
        <div className="font-bold text-xl">Job Portal</div>
        <button onClick={toggleMenu} className="md:hidden">
          Menu
        </button>
        <nav className={`md:flex ${isOpen ? 'block' : 'hidden'} transition-all`}>
          <ul className="flex space-x-4">
            <li><a href="#apply" className="hover:text-blue-500">Apply</a></li>
            <li><a href="#about" className="hover:text-blue-500">About Us</a></li>
            <li><a href="#contact" className="hover:text-blue-500">Contact</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

const JobApplicationForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', resume: null });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Assume validation and modal trigger here
    alert('Application submitted!');
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white max-w-lg mx-auto shadow-md rounded">
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium">Name</label>
        <input type="text" name="name" id="name" required onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded w-full" />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium">Email</label>
        <input type="email" name="email" id="email" required onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded w-full" />
      </div>
      <div className="mb-4">
        <label htmlFor="resume" className="block text-sm font-medium">Resume</label>
        <input type="file" name="resume" id="resume" required onChange={handleChange} className="mt-1" />
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Submit Application</button>
    </form>
  );
};

const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 w-full bg-gray-800 text-white p-4">
      <div className="container mx-auto text-center">
        <p>&copy; 2023 Job Portal. All rights reserved.</p>
        <p>
          <a href="/privacy-policy" className="hover:underline">Privacy Policy</a> | 
          <a href="/terms-of-service" className="hover:underline">Terms of Service</a>
        </p>
      </div>
    </footer>
  );
};

const JobApplicationPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen pt-16">
      <Header />
      <main className="container mx-auto my-8">
        <h1 className="text-2xl font-bold text-center mb-6">Job Application</h1>
        <JobApplicationForm />
      </main>
      <Footer />
    </div>
  );
};

export default JobApplicationPage;