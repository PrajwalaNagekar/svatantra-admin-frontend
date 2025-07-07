import React, { useEffect, useState } from 'react';
import { getAllApplications } from '../../api';
import FullScreenLoader from '../../components/loaders/FullScreenLoader';
import Table from '../../components/common/Table';

const Applications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 20;

  useEffect(() => {
    const fetchApplications = async () => {
      setLoading(true);
      const res = await getAllApplications(page, limit);
      if (res?.success) {
        setApplications(res.data || []);
        setTotalPages(res.totalPages || 1);
      } else {
        setError(res?.message || 'Failed to fetch applications');
      }
      setLoading(false);
    };

    fetchApplications();
  }, [page]);

  const columns = [
    { header: 'Student Name', accessor: 'studentName' },
    { header: 'DOB', render: (row) => new Date(row.dob).toLocaleDateString() },
    { header: 'Father\'s Name', accessor: 'fatherName' },
    { header: 'Father\'s Phone', accessor: 'fatherPhone' },
    { header: 'Mother\'s Name', accessor: 'motherName' },
    { header: 'Mother\'s Phone', accessor: 'motherPhone' },
    { header: 'Address', accessor: 'address' },
    {
      header: 'Submitted At',
      render: (row) => new Date(row.submittedAt).toLocaleString(),
    },
  ];

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <div className="p-6 md:p-10">
      {loading && <FullScreenLoader />}

      <h2 className="text-3xl font-bold mb-8 text-gray-800 underline decoration-pink-500 underline-offset-8">
        Admissions
      </h2>

      {error && (
        <div className="bg-red-100 text-red-700 px-4 py-3 rounded-md mb-4 shadow">
          {error}
        </div>
      )}

      {!loading && !error && (
        <>
          <Table columns={columns} data={applications} />

          {/* Pagination Controls */}
          <div className="flex items-center justify-center mt-6 space-x-2">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
            >
              Prev
            </button>

            <span className="font-semibold text-gray-700">
              Page {page} of {totalPages}
            </span>

            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Applications;
