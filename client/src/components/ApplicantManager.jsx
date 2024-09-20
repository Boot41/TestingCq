import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import Select from 'react-select';

const ApplicantManager = ({ jobId }) => {
  const [applicants, setApplicants] = useState([]);
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const applicantsPerPage = 10;
  
  useEffect(() => {
    fetchApplicants();
  }, [jobId]);

  const fetchApplicants = async () => {
    const response = await axios.get(`/api/jobs/${jobId}/applications`);
    setApplicants(response.data);
  };

  const handleView = async (applicantId) => {
    const response = await axios.get(`/api/jobs/${jobId}/applications/${applicantId}`);
    setSelectedApplicant(response.data);
    setModalIsOpen(true);
  };

  const handleUpdateStatus = async (applicantId) => {
    await axios.put(`/api/jobs/${jobId}/applications/${applicantId}/status`, { status: selectedStatus });
    fetchApplicants();
  };

  const handleScheduleInterview = () => {
    // Function to open a modal for scheduling an interview
  };

  const totalPages = Math.ceil(applicants.length / applicantsPerPage);
  const paginatedApplicants = applicants.slice(currentPage * applicantsPerPage, (currentPage + 1) * applicantsPerPage);

  return (
    <div className="applicant-manager">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr className="bg-gray-50">
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {paginatedApplicants.map((applicant) => (
            <tr key={applicant.id} className="hover:bg-gray-100">
              <td className="px-6 py-4 whitespace-nowrap">{applicant.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{applicant.status}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button onClick={() => handleView(applicant.id)} className="text-blue-500 hover:underline">View Details</button>
                <Select
                  options={[{ value: 'Approved', label: 'Approved' }, { value: 'Rejected', label: 'Rejected' }]}
                  onChange={(option) => setSelectedStatus(option.value)}
                  onBlur={() => handleUpdateStatus(applicant.id)}
                  isClearable
                  className="inline-block"
                />
                <button onClick={handleScheduleInterview} className="text-green-500 hover:underline">Schedule Interview</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {applicants.length > applicantsPerPage && (
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, index) => (
            <button key={index} onClick={() => setCurrentPage(index)} className={`px-2 py-1 ${currentPage === index ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
              {index + 1}
            </button>
          ))}
        </div>
      )}
      <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
        <h2>{selectedApplicant?.name}</h2>
        <p>{selectedApplicant?.details}</p>
        <button onClick={() => setModalIsOpen(false)}>Close</button>
      </Modal>
    </div>
  );
};

export default ApplicantManager;