import React, { useEffect, useState } from 'react';
import { getAllEnquiries } from '../../api/index';
import AdminTable from '../../components/common/Table';
import FullScreenLoader from '../../components/loaders/FullScreenLoader';

const Enquiries = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await getAllEnquiries();
      if (res.success) {
        setEnquiries(res.data);
      } else {
        setError(res.message || 'Failed to fetch enquiries');
      }
      setLoading(false);
    };

    fetchData();
  }, []);

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
        <AdminTable data={enquiries} columns={columns} />
      )}
    </div>
  );
};

export default Enquiries;
