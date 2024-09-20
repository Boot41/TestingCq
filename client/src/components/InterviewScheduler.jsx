import React, { useState } from 'react';

const InterviewScheduler = ({ applicationId, onClose }) => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [interviewType, setInterviewType] = useState('Phone');
  const [message, setMessage] = useState('');

  const handleSchedule = async () => {
    if (!date || !time) {
      setMessage('Please select both date and time.');
      return;
    }

    try {
      const response = await fetch(`/api/applications/${applicationId}/schedule-interview`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date, time, interviewType }),
      });

      if (!response.ok) throw new Error('Failed to schedule interview');

      setMessage('Interview scheduled successfully!');
      setTimeout(() => onClose(), 2000);
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'center', 
      alignItems: 'center', 
      backgroundColor: 'white', 
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', 
      padding: '32px', 
      borderRadius: '8px', 
      maxWidth: '500px', 
      margin: 'auto' 
    }}>
      <h2>Schedule Interview</h2>
      {message && <p style={{ color: '#340487' }}>{message}</p>}
      <input 
        type="date" 
        onChange={(e) => setDate(e.target.value)} 
        aria-label="Select date" 
        style={{ 
          borderRadius: '4px', 
          padding: '16px', 
          marginBottom: '16px', 
          width: '100%' 
        }} 
      />
      <input 
        type="time" 
        onChange={(e) => setTime(e.target.value)} 
        aria-label="Select time" 
        style={{ 
          borderRadius: '4px', 
          padding: '16px', 
          marginBottom: '16px', 
          width: '100%' 
        }} 
      />
      <select 
        value={interviewType} 
        onChange={(e) => setInterviewType(e.target.value)} 
        aria-label="Select interview type" 
        style={{ 
          borderRadius: '4px', 
          padding: '16px', 
          marginBottom: '16px', 
          width: '100%' 
        }}
      >
        <option value="Phone">Phone</option>
        <option value="Video">Video</option>
        <option value="In-person">In-person</option>
      </select>
      <button 
        onClick={handleSchedule} 
        style={{ 
          backgroundColor: '#340487', 
          color: 'white', 
          border: 'none', 
          borderRadius: '4px', 
          padding: '16px', 
          fontWeight: 'bold', 
          cursor: 'pointer' 
        }} 
        onMouseEnter={(e) => e.target.style.backgroundColor = '#4a0a9d'} 
        onMouseLeave={(e) => e.target.style.backgroundColor = '#340487'}
      >
        Schedule Interview
      </button>
      <button 
        onClick={onClose} 
        style={{ 
          marginTop: '16px', 
          border: 'none', 
          background: 'transparent', 
          cursor: 'pointer' 
        }} 
        aria-label="Close modal"
      >
        Close
      </button>
    </div>
  );
};

export default InterviewScheduler;