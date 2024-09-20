import React from 'react';
import Header from './Header';
import ProfileView from './ProfileView';
import Footer from './Footer';

const ProfilePage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Fixed Header with ARIA role */}
      <header className="shadow-md" role="banner">
        <Header />
      </header>
      
      {/* Main Content Area */}
      <main className="flex-grow p-4">
        <ProfileView />
      </main>
      
      {/* Footer with copyright information */}
      <footer className="shadow-md py-4" role="contentinfo">
        <Footer />
      </footer>
    </div>
  );
};

export default ProfilePage;