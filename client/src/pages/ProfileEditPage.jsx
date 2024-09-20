import React, { useState } from 'react';

const Header = () => {
  return (
    <header className="bg-gray-800 text-white shadow-md p-4 flex items-center justify-between">
      <div className="text-xl">Logo</div>
      <nav className="hidden md:flex space-x-4">
        <a href="#" className="hover:text-blue-400">Home</a>
        <a href="#" className="hover:text-blue-400">Profile</a>
      </nav>
      <div className="md:hidden"> {/* Hamburger Menu for mobile */}
        <button className="text-white">☰</button>
      </div>
    </header>
  );
};

const ProfileEditor = () => {
  const [formData, setFormData] = useState({ name: '', bio: '', skills: '', contact: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation logic here
    if (formData.name) {
      setMessage('Profile Updated Successfully!');
    } else {
      setMessage('Please fill out all required fields.');
    }
  };

  return (
    <div className="p-4 bg-white border border-gray-300 rounded-md">
      <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-1" htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            aria-describedby="nameHelp"
            className="border border-gray-300 p-2 w-full"
            required
          />
          <span id="nameHelp" className="text-gray-500 text-sm">Enter your full name</span>
        </div>
        <div className="mb-4">
          <label className="block mb-1" htmlFor="bio">Bio</label>
          <textarea
            name="bio"
            id="bio"
            value={formData.bio}
            onChange={handleChange}
            aria-describedby="bioHelp"
            className="border border-gray-300 p-2 w-full"
          />
          <span id="bioHelp" className="text-gray-500 text-sm">Tell us about yourself</span>
        </div>
        <div className="mb-4">
          <label className="block mb-1" htmlFor="skills">Skills</label>
          <input
            type="text"
            name="skills"
            id="skills"
            value={formData.skills}
            onChange={handleChange}
            aria-describedby="skillsHelp"
            className="border border-gray-300 p-2 w-full"
          />
          <span id="skillsHelp" className="text-gray-500 text-sm">Comma-separated skills</span>
        </div>
        <div className="mb-4">
          <label className="block mb-1" htmlFor="contact">Contact Information</label>
          <input
            type="text"
            name="contact"
            id="contact"
            value={formData.contact}
            onChange={handleChange}
            aria-describedby="contactHelp"
            className="border border-gray-300 p-2 w-full"
          />
          <span id="contactHelp" className="text-gray-500 text-sm">Your email or phone number</span>
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
      </form>
      {message && <div className="mt-4 text-green-500">{message}</div>}
    </div>
  );
};

const ProfileEditPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow p-4">
        <ProfileEditor />
      </main>
    </div>
  );
};

export default ProfileEditPage;