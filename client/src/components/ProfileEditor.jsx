import React, { useState } from 'react';

const ProfileEditor = () => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    workHistory: [{ jobTitle: '', company: '', duration: '' }],
    education: '',
    skills: '',
    additionalDetails: ''
  });

  const [progress, setProgress] = useState(0);
  const [feedback, setFeedback] = useState('');

  const saveProfileHandler = async () => {
    try {
      const response = profile.id 
        ? await fetch(`/api/job-seekers/${profile.id}`, { method: 'PUT', body: JSON.stringify(profile) })
        : await fetch('/api/job-seekers', { method: 'POST', body: JSON.stringify(profile) });
      
      if (response.ok) {
        setFeedback('Profile saved successfully!');
      } else {
        throw new Error('Failed to save profile');
      }
    } catch (error) {
      setFeedback(error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
    updateProgress(); // Call function to calculate progress
  };

  const handleWorkChange = (index, e) => {
    const { name, value } = e.target;
    const workHistory = [...profile.workHistory];
    workHistory[index][name] = value;
    setProfile((prev) => ({ ...prev, workHistory }));
    updateProgress(); // Call function to calculate progress
  };

  const updateProgress = () => {
    const totalFields = 5; // example total fields
    const filledFields = Object.values(profile).filter(val => val).length;
    setProgress((filledFields / totalFields) * 100);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
      <div role="progressbar" aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100" style={{ width: `${progress}%`, backgroundColor: 'green', height: '5px', marginBottom: '20px' }}></div>
      
      <Section title="Personal Information">
        <Input label="Name" name="name" value={profile.name} onChange={handleChange} />
        <Input label="Email" name="email" value={profile.email} onChange={handleChange} />
        <Input label="Phone" name="phone" value={profile.phone} onChange={handleChange} />
      </Section>

      <Section title="Work History">
        {profile.workHistory.map((entry, index) => (
          <div key={index}>
            <Input label="Job Title" name="jobTitle" value={entry.jobTitle} onChange={(e) => handleWorkChange(index, e)} />
            <Input label="Company" name="company" value={entry.company} onChange={(e) => handleWorkChange(index, e)} />
            <Input label="Duration" name="duration" value={entry.duration} onChange={(e) => handleWorkChange(index, e)} />
          </div>
        ))}
        <button onClick={() => setProfile((prev) => ({ ...prev, workHistory: [...prev.workHistory, { jobTitle: '', company: '', duration: '' }] }))}>
          Add Job
        </button>
      </Section>

      <Section title="Education">
        <Dropdown label="Education Level" name="education" value={profile.education} onChange={handleChange} options={['High School', 'Bachelor', 'Master']} />
      </Section>

      <Section title="Skills">
        <Dropdown label="Skills" name="skills" value={profile.skills} onChange={handleChange} options={['JavaScript', 'React', 'Node.js']} />
      </Section>

      <Section title="Additional Details">
        <Input label="Details" name="additionalDetails" value={profile.additionalDetails} onChange={handleChange} />
      </Section>

      <button 
        onClick={saveProfileHandler} 
        style={{ fontWeight: 'bold', width: '80%', marginTop: '20px', padding: '10px' }}
      >
        Save
      </button>

      {feedback && <div>{feedback}</div>} {/* Feedback message */}
    </div>
  );
};

const Section = ({ title, children }) => (
  <div style={{ marginTop: '20px', padding: '20px', border: '1px solid #ccc' }}>
    <h2>{title}</h2>
    {children}
  </div>
);

const Input = ({ label, ...props }) => (
  <div style={{ marginBottom: '10px' }}>
    <label style={{ fontSize: '16px' }}>{label}</label>
    <input style={{ fontSize: '14px', borderRadius: '5px', width: '100%', padding: '10px' }} {...props} />
  </div>
);

const Dropdown = ({ label, options, ...props }) => (
  <div style={{ marginBottom: '10px' }}>
    <label style={{ fontSize: '16px' }}>{label}</label>
    <select style={{ fontSize: '14px', borderRadius: '5px', width: '100%', padding: '10px' }} {...props}>
      {options.map(option => <option key={option} value={option}>{option}</option>)}
    </select>
  </div>
);

export default ProfileEditor;