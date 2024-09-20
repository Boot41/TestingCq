import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';

const ApplicationEditForm = () => {
  const [formData, setFormData] = useState({
    resume: '',
    coverLetter: '',
    additionalDetails: ''
  });
  const [successMessage, setSuccessMessage] = useState('');
  const history = useHistory();
  const { application_id } = useParams();

  useEffect(() => {
    const fetchApplicationDetails = async () => {
      const response = await axios.get(`/api/applications/${application_id}`);
      setFormData(response.data);
    };
    fetchApplicationDetails();
  }, [application_id]);

  const updateApplicationHandler = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/applications/${application_id}`, formData);
      setSuccessMessage('Application updated successfully!');
    } catch (error) {
      console.error('Error updating application: ', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div style={{ padding: '16px' }}>
      <form onSubmit={updateApplicationHandler} aria-label="Application Edit Form">
        <div style={{ marginBottom: '16px' }}>
          <label htmlFor="resume">Resume</label>
          <input
            type="text"
            id="resume"
            name="resume"
            value={formData.resume}
            onChange={handleInputChange}
            style={{
              padding: '16px',
              backgroundColor: '#f0f0f0',
              width: '100%'
            }}
            required
          />
        </div>
        <div style={{ marginBottom: '16px' }}>
          <label htmlFor="coverLetter">Cover Letter</label>
          <input
            type="text"
            id="coverLetter"
            name="coverLetter"
            value={formData.coverLetter}
            onChange={handleInputChange}
            style={{
              padding: '16px',
              backgroundColor: '#f0f0f0',
              width: '100%'
            }}
            required
          />
        </div>
        <div style={{ marginBottom: '16px' }}>
          <label htmlFor="additionalDetails">Additional Details</label>
          <input
            type="text"
            id="additionalDetails"
            name="additionalDetails"
            value={formData.additionalDetails}
            onChange={handleInputChange}
            style={{
              padding: '16px',
              backgroundColor: '#f0f0f0',
              width: '100%'
            }}
          />
        </div>
        <button
          type="submit"
          style={{
            padding: '12px',
            backgroundColor: '#007bff',
            color: '#fff',
            borderRadius: '8px',
            fontWeight: 'bold',
            marginRight: '8px'
          }}
        >
          Update Application
        </button>
        <button
          type="button"
          onClick={() => history.push('/applications')}
          style={{
            padding: '12px',
            backgroundColor: '#6c757d',
            color: '#fff',
            borderRadius: '8px'
          }}
        >
          Cancel
        </button>
        
        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      </form>
    </div>
  );
};

export default ApplicationEditForm;