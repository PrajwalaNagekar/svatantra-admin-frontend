import React, { useEffect, useState } from 'react';
import { getAllApplications } from '../../api';
import FullScreenLoader from '../../components/loaders/FullScreenLoader';
import Table from '../../components/common/Table';

const Applications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchApplications = async () => {
      setLoading(true);
      const res = await getAllApplications();
      // console.log("🚀 ~ fetchApplications ~ res:", res)
      if (res?.success) {
        setApplications(res.data|| []);
      } else {
        setError(res?.data?.message || 'Failed to fetch applications');
      }
      setLoading(false);
    };

    fetchApplications();
  }, []);

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

  return (
    <div className="p-6 md:p-10">
      {loading && <FullScreenLoader />}

      <h2 className="text-3xl font-bold mb-8 text-gray-800 underline decoration-pink-500 underline-offset-8">
        Applications
      </h2>

      {error && (
        <div className="bg-red-100 text-red-700 px-4 py-3 rounded-md mb-4 shadow">
          {error}
        </div>
      )}

      {!loading && !error && (
        <Table columns={columns} data={applications} />
      )}
    </div>
  );
};

export default Applications;
