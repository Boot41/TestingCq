import React, { useState } from 'react';
import axios from 'axios';

const JobSearchFilter = () => {
    const [jobTitle, setJobTitle] = useState('');
    const [location, setLocation] = useState('');
    const [jobType, setJobType] = useState('');
    const [postedDate, setPostedDate] = useState('');

    const handleSearch = async () => {
        const filters = { jobTitle, location, jobType, postedDate };
        try {
            const response = await axios.get('/api/jobs', { params: filters });
            // Handle job listings from the response
        } catch (error) {
            // Handle error (e.g. show notification)
        }
    };

    return (
        <div className="bg-white rounded-lg shadow p-5">
            <input
                type="text"
                placeholder="Job Title"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                className="border rounded p-2 mb-4 w-full"
                aria-label="Job title"
            />
            <input
                type="text"
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="border rounded p-2 mb-4 w-full"
                aria-label="Location"
            />
            <input
                type="text"
                placeholder="Job Type"
                value={jobType}
                onChange={(e) => setJobType(e.target.value)}
                className="border rounded p-2 mb-4 w-full"
                aria-label="Job type"
            />
            <input
                type="date"
                value={postedDate}
                onChange={(e) => setPostedDate(e.target.value)}
                className="border rounded p-2 mb-4 w-full"
                aria-label="Posted date"
            />
            <button
                onClick={handleSearch}
                className="bg-blue-500 text-white font-bold rounded p-3"
                aria-label="Search"
            >
                Search
            </button>
        </div>
    );
};

export default JobSearchFilter;