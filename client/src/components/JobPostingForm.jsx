import React, { useState } from 'react';

const JobPostingForm = () => {
  const [formData, setFormData] = useState({
    jobTitle: '',
    description: '',
    requirements: '',
    location: '',
    jobType: '',
    applicationDeadline: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' }); // Clear error on change
  };

  const validateForm = () => {
    const newErrors = {};
    for (const key in formData) {
      if (!formData[key]) {
        newErrors[key] = `${key.replace(/([A-Z])/g, ' $1')} is required`;
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await fetch('/api/jobs', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        if (response.ok) {
          window.location.href = '/dashboard'; // Redirect on success
        } else {
          // Handle response errors (optionally)
        }
      } catch (error) {
        console.error('Error posting job:', error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-6 max-w-md mx-auto">
      <div className="mb-4">
        <label htmlFor="jobTitle" className="block font-bold text-gray-700 mb-2">Job Title</label>
        <input
          type="text"
          name="jobTitle"
          id="jobTitle"
          value={formData.jobTitle}
          onChange={handleChange}
          className={`w-full h-10 p-3 border ${errors.jobTitle ? 'border-red-500' : 'border-gray-300'} rounded`}
          aria-labelledby="jobTitle"
        />
        {errors.jobTitle && <p className="text-red-500 text-sm">{errors.jobTitle}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="description" className="block font-bold text-gray-700 mb-2">Description</label>
        <textarea
          name="description"
          id="description"
          value={formData.description}
          onChange={handleChange}
          className={`w-full h-24 p-3 border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded`}
          aria-labelledby="description"
        />
        {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="requirements" className="block font-bold text-gray-700 mb-2">Requirements</label>
        <textarea
          name="requirements"
          id="requirements"
          value={formData.requirements}
          onChange={handleChange}
          className={`w-full h-24 p-3 border ${errors.requirements ? 'border-red-500' : 'border-gray-300'} rounded`}
          aria-labelledby="requirements"
        />
        {errors.requirements && <p className="text-red-500 text-sm">{errors.requirements}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="location" className="block font-bold text-gray-700 mb-2">Location</label>
        <input
          type="text"
          name="location"
          id="location"
          value={formData.location}
          onChange={handleChange}
          className={`w-full h-10 p-3 border ${errors.location ? 'border-red-500' : 'border-gray-300'} rounded`}
          aria-labelledby="location"
        />
        {errors.location && <p className="text-red-500 text-sm">{errors.location}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="jobType" className="block font-bold text-gray-700 mb-2">Job Type</label>
        <input
          type="text"
          name="jobType"
          id="jobType"
          value={formData.jobType}
          onChange={handleChange}
          className={`w-full h-10 p-3 border ${errors.jobType ? 'border-red-500' : 'border-gray-300'} rounded`}
          aria-labelledby="jobType"
        />
        {errors.jobType && <p className="text-red-500 text-sm">{errors.jobType}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="applicationDeadline" className="block font-bold text-gray-700 mb-2">Application Deadline</label>
        <input
          type="date"
          name="applicationDeadline"
          id="applicationDeadline"
          value={formData.applicationDeadline}
          onChange={handleChange}
          className={`w-full h-10 p-3 border ${errors.applicationDeadline ? 'border-red-500' : 'border-gray-300'} rounded`}
          aria-labelledby="applicationDeadline"
        />
        {errors.applicationDeadline && <p className="text-red-500 text-sm">{errors.applicationDeadline}</p>}
      </div>

      <button
        type="submit"
        className="w-full h-10 bg-[#1e1236] text-white rounded text-bold hover:bg-[#281456] transition duration-200"
      >
        Submit
      </button>
    </form>
  );
};

export default JobPostingForm;