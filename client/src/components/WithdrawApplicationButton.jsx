import React, { useState } from 'react';

const WithdrawApplicationButton = ({ applicationId }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleWithdraw = async () => {
    try {
      const response = await fetch(`/api/applications/${applicationId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        // Redirect to application tracking page after successful withdrawal
        window.location.href = '/application-tracking';
      } else {
        alert('Withdrawal failed. Please try again.'); // Simple error handling
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsDialogOpen(true)}
        style={{
          backgroundColor: '#1e1236',
          color: 'white',
          padding: '16px',
          borderRadius: '8px',
          fontWeight: 'bold',
          cursor: 'pointer',
          width: '100%', // Full width for small screens
          fontSize: window.innerWidth < 768 ? '14px' : 'inherit',
        }}
        aria-label="Withdraw Application"
        onKeyDown={(e) => e.key === 'Enter' && setIsDialogOpen(true)} // Keyboard accessibility
      >
        Withdraw Application
      </button>

      {isDialogOpen && (
        <div
          role="dialog"
          aria-labelledby="dialog-title"
          style={{
            backgroundColor: '#fff',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 1000,
          }}
        >
          <h2 id="dialog-title">Confirm Withdrawal</h2>
          <p>Are you sure you want to withdraw your application?</p>
          <button
            onClick={handleWithdraw}
            style={{
              backgroundColor: '#1e1236',
              color: 'white',
              padding: '10px',
              borderRadius: '5px',
              margin: '5px',
              cursor: 'pointer',
            }}
          >
            Yes
          </button>
          <button
            onClick={() => setIsDialogOpen(false)}
            style={{
              backgroundColor: '#b89aff',
              color: 'white',
              padding: '10px',
              borderRadius: '5px',
              margin: '5px',
              cursor: 'pointer',
            }}
          >
            No
          </button>
        </div>
      )}
    </>
  );
};

export default WithdrawApplicationButton;