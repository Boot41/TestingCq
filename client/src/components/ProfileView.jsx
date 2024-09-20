import React, { useEffect, useState } from 'react';

const ProfileView = ({ seekerId }) => {
  const [profile, setProfile] = useState(null);

  // Fetch profile data
  useEffect(() => {
    const fetchProfile = async () => {
      const response = await fetch(`/api/job-seekers/${seekerId}`);
      const data = await response.json();
      setProfile(data);
    };

    fetchProfile();
  }, [seekerId]);

  // Function to handle edit actions (to be implemented)
  const handleEdit = (section) => {
    // Redirect to the edit page or show a modal (logic to be added)
  };

  if (!profile) return <div>Loading...</div>;

  return (
    <div style={{ padding: '16px', fontFamily: 'Arial, sans-serif' }}>
      <section style={{ backgroundColor: '#FFFFFF', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', marginBottom: '20px', padding: '16px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px' }}>
          Personal Information
          <button onClick={() => handleEdit('personal')} aria-label="Edit Personal Information" style={{ marginLeft: '10px' }}>Edit</button>
        </h2>
        <img src={profile.photoUrl} alt={`${profile.name}'s profile`} style={{ borderRadius: '50%', width: '100px', height: '100px' }} />
        <p style={{ fontSize: '16px', color: '#666666' }}>Name: {profile.name}</p>
        <p style={{ fontSize: '16px', color: '#666666' }}>Contact: {profile.contact}</p>
      </section>

      <section style={{ backgroundColor: '#FFFFFF', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', marginBottom: '20px', padding: '16px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px' }}>
          Work History
          <button onClick={() => handleEdit('work')} aria-label="Edit Work History" style={{ marginLeft: '10px' }}>Edit</button>
        </h2>
        <ul>
          {profile.workHistory.map((job) => (
            <li key={job.id} style={{ fontSize: '16px', color: '#666666' }}>
              {job.title} at {job.company} ({job.startDate} - {job.endDate})
            </li>
          ))}
        </ul>
      </section>

      <section style={{ backgroundColor: '#FFFFFF', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', marginBottom: '20px', padding: '16px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px' }}>
          Education
          <button onClick={() => handleEdit('education')} aria-label="Edit Education" style={{ marginLeft: '10px' }}>Edit</button>
        </h2>
        <ul>
          {profile.education.map((edu) => (
            <li key={edu.id} style={{ fontSize: '16px', color: '#666666' }}>
              {edu.degree} from {edu.institution} ({edu.graduationDate})
            </li>
          ))}
        </ul>
      </section>

      <section style={{ backgroundColor: '#FFFFFF', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', marginBottom: '20px', padding: '16px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px' }}>
          Skills
          <button onClick={() => handleEdit('skills')} aria-label="Edit Skills" style={{ marginLeft: '10px' }}>Edit</button>
        </h2>
        <div>
          {profile.skills.map((skill) => (
            <span key={skill} style={{ backgroundColor: '#E0E0E0', borderRadius: '12px', padding: '5px 10px', marginRight: '5px' }}>
              {skill}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProfileView;