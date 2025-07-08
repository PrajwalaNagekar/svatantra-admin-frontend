import React, { useEffect, useState } from 'react';
import Table from '../../components/common/Table';
import FullScreenLoader from '../../components/loaders/FullScreenLoader';
import { getAllvisits } from '../../api';

const Visits = () => {
  const [visits, setVisits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 20;

  useEffect(() => {
    const fetchVisits = async () => {
      setLoading(true);
      const res = await getAllvisits(page, limit);

      if (res.success) {
        setVisits(res.data || []);
        setTotalPages(res.totalPages || 1);
      } else {
        setError(res.message || 'Failed to fetch visit data');
      }

      setLoading(false);
    };

    fetchVisits();
  }, [page]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const columns = [
    { header: 'Name', accessor: 'name' },
    { header: 'Mobile', accessor: 'mobile' },
    {
      header: 'Date',
      render: (row) => {
        const date = new Date(row.date);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`; // D-M-Y format
      },
    },
    {
      header: 'Time',
      accessor: 'time',
    },
  ];

  return (
    <div className="p-6 md:p-10">
      {loading && <FullScreenLoader />}

      <h2 className="text-3xl font-bold mb-8 text-gray-800 underline decoration-pink-500 underline-offset-8">
        Visit Bookings
      </h2>

      {error && (
        <div className="bg-red-100 text-red-700 px-4 py-3 rounded-md mb-4 shadow">
          {error}
        </div>
      )}

      {!loading && !error && visits.length === 0 && (
        <p className="text-gray-500">No visits found.</p>
      )}

      {!loading && !error && visits.length > 0 && (
        <>
          <Table columns={columns} data={visits} />

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

export default Visits;
