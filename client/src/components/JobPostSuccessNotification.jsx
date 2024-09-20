import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

const JobPostSuccessNotification = ({ jobId, onClose }) => {
  const history = useHistory();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const handleViewListing = () => {
    history.push(`/jobs/${jobId}`);
  };

  const handleClose = () => {
    setIsVisible(false);
    onClose();
  };

  if (!isVisible) return null;

  return (
    <div 
      role="alert" 
      className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white shadow-lg rounded-lg p-5 max-w-lg w-full"
      aria-live="assertive"
    >
      <button 
        aria-label="Close notification" 
        className="absolute top-2 right-2 hover:text-gray-600" 
        onClick={handleClose}
      >
        &times;
      </button>
      <h2 className="font-bold text-lg">Job Posted Successfully!</h2>
      <p className="text-base mb-4">Your job has been successfully posted and is now live.</p>
      <button 
        className="bg-[#340487] text-white font-bold py-2 px-4 rounded transition duration-200 hover:bg-[#2b0363]" 
        onClick={handleViewListing}
      >
        View Listing
      </button>
    </div>
  );
};

export default JobPostSuccessNotification;