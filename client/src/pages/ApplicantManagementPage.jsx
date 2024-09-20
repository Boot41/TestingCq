import React from 'react';
import { Header } from './Header';
import { ApplicantManager } from './ApplicantManager';
import { Footer } from './Footer';

const ApplicantManagementPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Fixed sticky header */}
      <header className="bg-blue-800 text-white p-4 shadow-md sticky top-0 z-10">
        <Header />
      </header>

      {/* Main content area */}
      <main className="flex-grow p-4 bg-white">
        <ApplicantManager />
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 p-4">
        <Footer />
      </footer>
    </div>
  );
};

export default ApplicantManagementPage;