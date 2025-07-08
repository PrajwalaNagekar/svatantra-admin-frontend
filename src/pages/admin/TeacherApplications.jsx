import React, { useEffect, useState } from 'react';
import { getAllTeacherApplications } from '../../api/index';
import AdminTable from '../../components/common/Table';
import FullScreenLoader from '../../components/loaders/FullScreenLoader';

const TeacherApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 20;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await getAllTeacherApplications(page, limit);
      if (res.success) {
        setApplications(res.applications || []);
        setTotalPages(res.totalPages || 1);
      } else {
        setError(res.message || 'Failed to fetch teacher applications');
      }
      setLoading(false);
    };

    fetchData();
  }, [page]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const columns = [
    { header: 'Name', accessor: 'name' },
    { header: 'Phone', accessor: 'phone' },
    {
      header: 'Submitted At',
      accessor: 'createdAt',
      render: (row) => {
        const date = new Date(row.createdAt);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); 
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
      },
    }

  ];

  return (
    <div className="p-6 md:p-10 relative">
      {loading && <FullScreenLoader />}
      <h2 className="text-3xl font-bold mb-8 text-gray-800 underline decoration-pink-500 underline-offset-8">
        Teacher Applications
      </h2>

      {error && <p className="text-red-600">{error}</p>}

      {!loading && !error && applications.length === 0 && (
        <p className="text-gray-500">No teacher applications found.</p>
      )}

      {!loading && !error && applications.length > 0 && (
        <>
          <AdminTable data={applications} columns={columns} />

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

export default TeacherApplications;
