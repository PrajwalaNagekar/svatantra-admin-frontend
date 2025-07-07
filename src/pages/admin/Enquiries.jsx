import React, { useEffect, useState } from 'react';
import { getAllEnquiries } from '../../api/index';
import AdminTable from '../../components/common/Table';
import FullScreenLoader from '../../components/loaders/FullScreenLoader';

const Enquiries = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 20;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await getAllEnquiries(page, limit);
      if (res.success) {
        setEnquiries(res.data || []);
        setTotalPages(res.totalPages || 1);
      } else {
        setError(res.message || 'Failed to fetch enquiries');
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
    { header: 'Email', accessor: 'email' },
    { header: 'Phone', accessor: 'phone' },
    { header: 'Comments', accessor: 'comments' },
    {
      header: 'Submitted At',
      accessor: 'createdAt',
      render: (row) => new Date(row.createdAt).toLocaleString(),
    },
  ];

  return (
    <div className="p-6 md:p-10 relative">
      {loading && <FullScreenLoader />}
      <h2 className="text-3xl font-bold mb-8 text-gray-800 underline decoration-pink-500 underline-offset-8">
        Manage Contacts
      </h2>
      {error && <p className="text-red-600">{error}</p>}

      {!loading && !error && enquiries.length === 0 && (
        <p className="text-gray-500">No enquiries found.</p>
      )}

      {!loading && !error && enquiries.length > 0 && (
        <>
          <AdminTable data={enquiries} columns={columns} />

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

export default Enquiries;
