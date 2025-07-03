import React, { useEffect, useState } from 'react';
import {
  Users,
  Book,
  Mail,
  Image,
  FileText,
  MessageCircle
} from 'lucide-react';
import { getDashboardCounts } from '../../api';

const Dashboard = () => {
  const [counts, setCounts] = useState({
    applications: 0,
    teacherApplications: 0,
    visits: 0,
    enquiries: 0,
    events: 0,
    galleryImages: 0,
  });

  // Example: Replace with actual API call to fetch counts
  useEffect(() => {
    const fetchCounts = async () => {
      const res = await getDashboardCounts();
      if (res.success) {
        setCounts(res.data);
      } else {
        console.error(res.message);
      }
    };

    fetchCounts();
  }, []);
  const cards = [
    {
      label: 'Applications',
      count: counts.applications,
      icon: <FileText className="w-6 h-6 text-pink-600" />
    },
    {
      label: 'Teacher Applications',
      count: counts.teacherApplications,
      icon: <Users className="w-6 h-6 text-pink-600" />
    },
    {
      label: 'Visits',
      count: counts.visits,
      icon: <Book className="w-6 h-6 text-pink-600" />
    },
    {
      label: 'Enquiries',
      count: counts.enquiries,
      icon: <Mail className="w-6 h-6 text-pink-600" />
    },
    {
      label: 'Events',
      count: counts.events,
      icon: <MessageCircle className="w-6 h-6 text-pink-600" />
    },
    {
      label: 'Gallery Images',
      count: counts.galleryImages,
      icon: <Image className="w-6 h-6 text-pink-600" />
    },
  ];

  return (
    <div className="p-6 md:p-10">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 underline decoration-pink-400">
        Dashboard Overview
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow border p-6 flex items-center gap-4"
          >
            <div className="p-3 rounded-full bg-pink-100">{card.icon}</div>
            <div>
              <h4 className="text-lg font-semibold text-gray-700">{card.count}</h4>
              <p className="text-sm text-gray-500">{card.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
