import React from 'react';

// Header component
const Header = () => (
    <header style={{ backgroundColor: '#2c3e50', color: '#ffffff', padding: '10px 20px', fontWeight: 'bold' }}>
        <div>Application Logo</div>
        <nav>
            <a href="/jobs" style={{ margin: '0 15px', color: '#ffffff' }}>Jobs</a>
            <a href="/dashboard" style={{ margin: '0 15px', color: '#ffffff' }}>Dashboard</a>
        </nav>
    </header>
);

// JobEditForm component
const JobEditForm = () => (
    <form style={{ display: 'flex', flexDirection: 'column', padding: '20px', border: '1px solid #e0e0e0', borderRadius: '8px' }}>
        <label>
            Job Title:
            <input type="text" aria-label="Job Title" style={{ margin: '10px 0', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
        </label>
        <label>
            Description:
            <textarea aria-label="Job Description" style={{ margin: '10px 0', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
        </label>
        <label>
            Requirements:
            <input type="text" aria-label="Job Requirements" style={{ margin: '10px 0', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
        </label>
        <label>
            Salary:
            <input type="number" aria-label="Salary" style={{ margin: '10px 0', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
        </label>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '15px' }}>
            <button type="button" onClick={() => alert('Changes saved!')} style={{ padding: '10px 15px', backgroundColor: '#27ae60', color: '#fff', border: 'none', borderRadius: '4px' }}>Save Changes</button>
            <button type="button" onClick={() => alert('Cancelled!')} style={{ padding: '10px 15px', backgroundColor: '#e74c3c', color: '#fff', border: 'none', borderRadius: '4px' }}>Cancel</button>
        </div>
    </form>
);

// Footer component
const Footer = () => (
    <footer style={{ backgroundColor: '#34495e', color: '#ffffff', padding: '10px 20px', textAlign: 'center' }}>
        © 2023 Your Company
    </footer>
);

// Main Page Layout component
const EditJobPage = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', fontFamily: 'Arial, sans-serif' }}>
            <Header />
            <main style={{ flex: '1', padding: '20px', backgroundColor: '#ffffff' }}>
                <h1>Edit Job</h1>
                <JobEditForm />
            </main>
            <Footer />
        </div>
    );
};

export default EditJobPage;