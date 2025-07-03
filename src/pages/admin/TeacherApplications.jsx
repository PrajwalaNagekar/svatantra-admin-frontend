import React, { useEffect, useState } from 'react';
import { getAllTeacherApplications } from '../../api/index'; // adjust path as needed
import AdminTable from '../../components/common/Table'; // your reusable table component
import FullScreenLoader from '../../components/loaders/FullScreenLoader';

const TeacherApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await getAllTeacherApplications();
      if (res.success) {
        setApplications(res.applications);
      } else {
        setError(res.message || 'Failed to fetch teacher applications');
      }
      setLoading(false);
    };


    fetchData();
  }, []);

  const columns = [
    { header: 'Name', accessor: 'name' },
    { header: 'Phone', accessor: 'phone' },
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
       Teacher Applications
      </h2>
      {error && <p className="text-red-600">{error}</p>}

      {!loading && !error && applications.length === 0 && (
        <p className="text-gray-500">No teacher applications found.</p>
      )}

      {!loading && !error && applications.length > 0 && (
        <AdminTable data={applications} columns={columns} />
      )}
    </div>
  );
};

export default TeacherApplications;
