import React, { useState } from 'react';
import axios from 'axios';

const statuses = ["Under Review", "Interview Scheduled", "Rejected", "Offer Extended"];

const ApplicationStatusUpdater = ({ applicationId }) => {
    const [currentStatus, setCurrentStatus] = useState(statuses[0]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleStatusChange = async (status) => {
        setLoading(true);
        try {
            await axios.put(`/api/applications/${applicationId}/status`, { status });
            setCurrentStatus(status);
            setMessage('Status updated successfully!');
        } catch (error) {
            setMessage('Failed to update status. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-start mb-4">
            <label className="text-16 font-bold mb-2" aria-label="Current Application Status">
                Current Status: 
                <span className="ml-2 font-bold bg-primary text-white rounded px-2 py-1">
                    {currentStatus}
                </span>
            </label>
            <div className="flex flex-wrap">
                {statuses.map((status) => (
                    <button
                        key={status}
                        onClick={() => handleStatusChange(status)}
                        className={`rounded-md p-2 m-1 text-14 bg-white shadow transition-all duration-200 ease-in-out hover:bg-[#e1daf5] focus:outline-none`}
                        aria-label={`Change status to ${status}`}
                    >
                        {status}
                    </button>
                ))}
            </div>

            {loading && <span className="loader">Loading...</span>}
            {message && <div className={`notification bg-primary text-white p-2 mt-2 rounded`}>{message}</div>}
        </div>
    );
};

export default ApplicationStatusUpdater;