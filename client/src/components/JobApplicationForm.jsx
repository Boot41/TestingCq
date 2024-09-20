import React, { useState } from 'react';

const JobApplicationForm = ({ jobId }) => {
    const [resume, setResume] = useState(null);
    const [coverLetter, setCoverLetter] = useState('');
    const [additionalDetails, setAdditionalDetails] = useState('');
    const [loading, setLoading] = useState(false);
    const [feedback, setFeedback] = useState('');
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setFeedback('');

        const formData = new FormData();
        formData.append('resume', resume);
        formData.append('coverLetter', coverLetter);
        formData.append('additionalDetails', additionalDetails);

        try {
            const response = await fetch(`/api/jobs/${jobId}/apply`, {
                method: 'POST',
                body: formData
            });
            if (response.ok) {
                setFeedback('Application submitted successfully!');
            } else {
                setFeedback('Failed to submit application. Please try again.');
            }
        } catch (error) {
            setFeedback('Error occurred: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleResumeChange = (e) => {
        const file = e.target.files[0];
        if (file && (file.type === 'application/pdf' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
            setResume(file);
        } else {
            alert('Please upload a valid PDF or DOCX file.');
        }
    };

    return (
        <div style={{ backgroundColor: '#FFFFFF', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }} aria-live="polite">
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
                <label htmlFor="resume" style={{ marginBottom: '8px' }}>Resume (PDF/DOCX):</label>
                <input type="file" id="resume" accept=".pdf, .docx" onChange={handleResumeChange} style={{ padding: '12px', borderRadius: '8px', marginBottom: '20px' }} aria-required="true"/>

                <label htmlFor="coverLetter" style={{ marginBottom: '8px' }}>Cover Letter:</label>
                <textarea id="coverLetter" value={coverLetter} onChange={(e) => setCoverLetter(e.target.value)} style={{ padding: '12px', borderRadius: '8px', marginBottom: '20px' }} aria-required="true"></textarea>

                <label htmlFor="additionalDetails" style={{ marginBottom: '8px' }}>Additional Details:</label>
                <textarea id="additionalDetails" value={additionalDetails} onChange={(e) => setAdditionalDetails(e.target.value)} style={{ padding: '12px', borderRadius: '8px', marginBottom: '20px' }}></textarea>

                <button type="submit" disabled={loading} style={{
                    backgroundColor: '#007BFF', color: '#FFFFFF', padding: '12px 20px',
                    borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', 
                    transition: 'background-color 0.3s',
                    opacity: loading ? 0.7 : 1
                }} 
                onMouseEnter={(e) => e.target.style.backgroundColor = '#0056b3'} 
                onMouseLeave={(e) => e.target.style.backgroundColor = '#007BFF'}>
                    {loading ? 'Submitting...' : 'Submit'}
                </button>
            </form>
            {feedback && <div style={{ marginTop: '20px', color: feedback.includes('successfully') ? 'green' : 'red' }}>{feedback}</div>}
        </div>
    );
};

export default JobApplicationForm;