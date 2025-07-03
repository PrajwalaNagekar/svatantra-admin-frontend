import React, { useEffect, useState } from 'react';
import Table from '../../components/common/Table';
import FullScreenLoader from '../../components/loaders/FullScreenLoader';
import { getAllvisits } from '../../api'; // make sure path is correct

const Visits = () => {
  const [visits, setVisits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchVisits = async () => {
      setLoading(true);
      const res = await getAllvisits();

      if (res.success) {
        setVisits(res.data || []);
      } else {
        setError(res.message || 'Failed to fetch visit data');
      }

      setLoading(false);
    };

    fetchVisits();
  }, []);
  const columns = [
    { header: 'Name', accessor: 'name' },
    { header: 'Mobile', accessor: 'mobile' },
    {
      header: 'Date',
      render: (row) => new Date(row.date).toLocaleDateString(),
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

      {!loading && !error && (
        <Table columns={columns} data={visits} />
      )}
    </div>
  );
};

export default Visits;
