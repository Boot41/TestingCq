import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const JobEditForm = ({ jobId }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    requirements: '',
    location: '',
    jobType: '',
    deadline: ''
  });
  const history = useHistory();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate required fields
    for (let key in formData) {
      if (!formData[key]) {
        alert(`${key} is required`);
        return;
      }
    }
    
    try {
      const response = await fetch(`/api/jobs/${jobId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error('Failed to update job listing');
      alert('Job listing updated successfully');
    } catch (error) {
      alert(error.message);
    }
  };

  const handleCancel = () => {
    history.push('/dashboard');
  };

  return (
    <div style={{ maxWidth: '600px', margin: '20px auto', padding: '20px', borderRadius: '10px', background: '#fff', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '16px' }}>
          <label style={{ fontWeight: 'bold', marginBottom: '4px' }} htmlFor="title">Job Title</label>
          <input style={{ width: '100%', minHeight: '40px', padding: '8px', border: '1px solid #D1D5DB', borderRadius: '5px' }} 
                 type="text" id="title" name="title" placeholder="Enter job title" value={formData.title} onChange={handleChange} aria-label="Job Title" required />
        </div>
        <div style={{ marginBottom: '16px' }}>
          <label style={{ fontWeight: 'bold', marginBottom: '4px' }} htmlFor="description">Description</label>
          <textarea style={{ width: '100%', minHeight: '40px', padding: '8px', border: '1px solid #D1D5DB', borderRadius: '5px' }} 
                    id="description" name="description" placeholder="Enter job description" value={formData.description} onChange={handleChange} aria-label="Job Description" required />
        </div>
        <div style={{ marginBottom: '16px' }}>
          <label style={{ fontWeight: 'bold', marginBottom: '4px' }} htmlFor="requirements">Requirements</label>
          <textarea style={{ width: '100%', minHeight: '40px', padding: '8px', border: '1px solid #D1D5DB', borderRadius: '5px' }} 
                    id="requirements" name="requirements" placeholder="Enter requirements" value={formData.requirements} onChange={handleChange} aria-label="Job Requirements" required />
        </div>
        <div style={{ marginBottom: '16px' }}>
          <label style={{ fontWeight: 'bold', marginBottom: '4px' }} htmlFor="location">Location</label>
          <input style={{ width: '100%', minHeight: '40px', padding: '8px', border: '1px solid #D1D5DB', borderRadius: '5px' }} 
                 type="text" id="location" name="location" placeholder="Enter job location" value={formData.location} onChange={handleChange} aria-label="Job Location" required />
        </div>
        <div style={{ marginBottom: '16px' }}>
          <label style={{ fontWeight: 'bold', marginBottom: '4px' }} htmlFor="jobType">Job Type</label>
          <input style={{ width: '100%', minHeight: '40px', padding: '8px', border: '1px solid #D1D5DB', borderRadius: '5px' }} 
                 type="text" id="jobType" name="jobType" placeholder="Enter job type" value={formData.jobType} onChange={handleChange} aria-label="Job Type" required />
        </div>
        <div style={{ marginBottom: '16px' }}>
          <label style={{ fontWeight: 'bold', marginBottom: '4px' }} htmlFor="deadline">Application Deadline</label>
          <input style={{ width: '100%', minHeight: '40px', padding: '8px', border: '1px solid #D1D5DB', borderRadius: '5px' }} 
                 type="date" id="deadline" name="deadline" value={formData.deadline} onChange={handleChange} aria-label="Application Deadline" required />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <button type="submit" style={{ padding: '12px', backgroundColor: '#340487', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }} aria-label="Save Changes">Save</button>
          <button type="button" onClick={handleCancel} style={{ padding: '12px', background: '#fff', border: '1px solid #D1D5DB', borderRadius: '5px', cursor: 'pointer' }} aria-label="Cancel Changes">Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default JobEditForm;