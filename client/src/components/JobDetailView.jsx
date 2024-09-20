import React, { useEffect, useState } from 'react';
import axios from 'axios';

const JobDetailView = ({ jobId }) => {
    const [jobDetails, setJobDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchJobDetails = async () => {
            try {
                const response = await axios.get(`/api/jobs/${jobId}`);
                setJobDetails(response.data);
            } catch (error) {
                console.error('Error fetching job details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchJobDetails();
    }, [jobId]);

    const handleApplyClick = () => {
        // Trigger modal or redirect to application form
        window.location.href = `/apply/${jobId}`;
    };

    if (loading) {
        return <div>Loading...</div>; // Display loading indicator
    }

    return (
        <div className="job-detail-view" style={{ padding: '20px' }}>
            <header className="job-header" style={{ marginBottom: '20px' }}>
                <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#b89aff' }}>
                    {jobDetails.title}
                </h1>
                <img src={jobDetails.companyLogo} alt={`${jobDetails.companyName} logo`} />
            </header>
            <main className="job-body">
                <section className="job-description" style={{ marginBottom: '20px' }}>
                    <h2 style={{ fontSize: '20px', color: '#333333' }}>Job Description</h2>
                    <p style={{ fontSize: '16px', color: '#1e1236' }}>{jobDetails.description}</p>
                </section>
                <section className="job-requirements" style={{ marginBottom: '20px' }}>
                    <h2 style={{ fontSize: '20px', color: '#333333' }}>Requirements</h2>
                    <p style={{ fontSize: '16px', color: '#1e1236' }}>{jobDetails.requirements}</p>
                </section>
                <section className="job-benefits" style={{ marginBottom: '20px' }}>
                    <h2 style={{ fontSize: '20px', color: '#333333' }}>Benefits</h2>
                    <p style={{ fontSize: '16px', color: '#1e1236' }}>{jobDetails.benefits}</p>
                </section>
                <section className="application-instructions" style={{ marginBottom: '20px' }}>
                    <h2 style={{ fontSize: '20px', color: '#333333' }}>Application Instructions</h2>
                    <p style={{ fontSize: '16px', color: '#1e1236' }}>{jobDetails.applicationInstructions}</p>
                </section>
            </main>
            <footer className="job-footer">
                <button
                    onClick={handleApplyClick}
                    style={{
                        backgroundColor: '#340487',
                        color: '#fff',
                        borderRadius: '5px',
                        padding: '10px 20px',
                        cursor: 'pointer',
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#2a0367')}
                    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#340487')}
                >
                    Apply Now
                </button>
            </footer>
        </div>
    );
};

export default JobDetailView;