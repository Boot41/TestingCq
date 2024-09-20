import React, { useState } from 'react';
import ApplicationStatusTracker from './ApplicationStatusTracker';
import Modal from './Modal'; // Assuming a Modal component is created

const ApplicationTrackingPage = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleWithdrawClick = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleConfirmWithdrawal = () => {
    // Logic to handle application withdrawal
    setModalOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-blue-600 text-white p-4 fixed w-full z-10">
        <nav>
          <ul className="flex space-x-4">
            <li><a href="#status" className="hover:underline">Application Status</a></li>
            <li><a href="#withdraw" className="hover:underline">Withdraw Application</a></li>
          </ul>
        </nav>
      </header>
      <main className="flex-1 mt-16 p-4">
        <ApplicationStatusTracker withdrawButtonClick={handleWithdrawClick} />
        {isModalOpen && (
          <Modal onClose={handleCloseModal} onConfirm={handleConfirmWithdrawal}>
            <h2 className="text-lg">Confirm Withdrawal</h2>
            <p>Are you sure you want to withdraw your application?</p>
            <button onClick={handleConfirmWithdrawal} className="bg-red-600 text-white py-2 px-4 mt-2">Yes, Withdraw</button>
            <button onClick={handleCloseModal} className="bg-gray-300 text-black py-2 px-4 mt-2">Cancel</button>
          </Modal>
        )}
      </main>
    </div>
  );
};

export default ApplicationTrackingPage;