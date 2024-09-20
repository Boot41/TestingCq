import React from 'react';
import Header from './Header';
import JobSearchFilter from './JobSearchFilter';
import JobListing from './JobListing';
import Footer from './Footer';

const JobSearchPage = () => {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Fixed Header */}
            <header className="bg-white shadow-md">
                <Header />
            </header>

            {/* Main content area */}
            <main className="flex-grow p-4">
                <JobSearchFilter />
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <JobListing />
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-gray-800 text-white p-4">
                <Footer />
            </footer>
        </div>
    );
};

export default JobSearchPage;