import React, { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import { addEvent, allEvents, deleteEvent } from '../../api/index';
import FullScreenLoader from '../../components/loaders/FullScreenLoader';
import PopupModal from '../../components/popupModal/PopupModal';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    image: null,
  });
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState({ show: false, message: '', type: 'success' });

  useEffect(() => {
    fetchEvents();
  }, []);
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const fetchEvents = async () => {
    setLoading(true);
    const res = await allEvents();
    setLoading(false);

    if (res?.success && Array.isArray(res.events)) {
      // console.log("✅ Events fetched successfully");
      setEvents(res.events);
    } else {
      setEvents([]);
      setPopup({
        show: true,
        message: res?.message || 'Failed to fetch events',
        type: 'error',
      });
    }
  };

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({ ...form, image: file });
      setPreview(URL.createObjectURL(file));
    }
  };
  const handleDeleteEvent = async (id) => {
    setLoading(true);
    const res = await deleteEvent(id);
    setLoading(false);

    if (res.success) {
      setPopup({ show: true, message: 'Event deleted successfully', type: 'success' });
      fetchEvents();
    } else {
      setPopup({ show: true, message: res.message || 'Failed to delete event', type: 'error' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, description, startDate, endDate, image } = form;

    if (!name || !description || !startDate || !endDate || !image) {
      setPopup({ show: true, message: 'Please fill in all fields', type: 'error' });
      return;
    }


    if (new Date(startDate) > new Date(endDate)) {
      setPopup({ show: true, message: 'Start Date cannot be after End Date', type: 'error' });
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('startDate', startDate);
    formData.append('endDate', endDate);
    formData.append('image', image);

    setLoading(true);
    const res = await addEvent(formData);
    setLoading(false);

    if (res.success) {
      fetchEvents();
      setForm({
        name: '',
        description: '',
        startDate: '',
        endDate: '',
        image: null,
      });
      setPreview(null);
      setPopup({ show: true, message: 'Event created successfully!', type: 'success' });
    } else {
      setPopup({ show: true, message: res.message || 'Failed to create event', type: 'error' });
    }
  };

  return (
    <div className="p-6 md:p-10">
      {loading && <FullScreenLoader />}

      {popup.show && (
        <PopupModal
          message={popup.message}
          type={popup.type}
          onClose={() => setPopup({ ...popup, show: false })}
        />
      )}

      <h2 className="text-3xl font-bold mb-8 text-gray-800 underline decoration-pink-500 underline-offset-8">
        Manage Events
      </h2>

      {/* Event Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-6 mb-10 space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-1 text-sm font-medium">Event Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleInputChange}
              className="w-full border rounded px-3 py-2 text-sm focus:outline-pink-500"
              placeholder="Enter event name"
            />
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block mb-1 text-sm font-medium">Start Date</label>
              <input
                type="date"
                name="startDate"
                value={form.startDate}
                onChange={handleInputChange}
                className="w-full border rounded px-3 py-2 text-sm focus:outline-pink-500"
              />
            </div>
            <div className="flex-1">
              <label className="block mb-1 text-sm font-medium">End Date</label>
              <input
                type="date"
                name="endDate"
                value={form.endDate}
                onChange={handleInputChange}
                className="w-full border rounded px-3 py-2 text-sm focus:outline-pink-500"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleInputChange}
            rows={4}
            placeholder="Describe the event..."
            className="w-full border rounded px-3 py-2 text-sm resize-none focus:outline-pink-500"
          />
        </div>

        <div className="w-full flex justify-center">
          <div className="w-full md:w-1/2">
            <label className="block mb-2 text-sm font-medium text-center">Event Image</label>
            <input
              type="file"
              accept="image/*"
              id="eventImage"
              onChange={handleImageChange}
              className="hidden"
            />
            <label
              htmlFor="eventImage"
              className="w-full h-40 border-dashed border-2 border-pink-400 flex items-center justify-center rounded cursor-pointer hover:bg-pink-50"
            >
              {preview ? (
                <img
                  src={preview}
                  alt="preview"
                  className="w-full h-full object-cover rounded"
                />
              ) : (
                <Plus className="text-pink-500 w-6 h-6" />
              )}
            </label>
          </div>
        </div>

        <div className="w-full flex justify-center mt-4">
          <button
            type="submit"
            className="bg-pink-600 text-white px-6 py-2 rounded hover:bg-pink-700 transition"
            disabled={loading}
          >
            {loading ? 'Creating...' : 'Create Event'}
          </button>
        </div>
      </form>

      {/* Events Display */}
      <div>
        <h2 className="text-3xl font-bold mb-8 text-gray-800 underline decoration-pink-500 underline-offset-8">
          Events
        </h2>
        {Array.isArray(events) && events.length === 0 ? (
          <p className="text-gray-500">No events added yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {events?.map((event) => {
              const isExpired = new Date(event.endDate) < new Date();

              return (
                <div
                  key={event._id}
                  className="relative bg-white rounded-xl border shadow p-4 flex flex-col text-center"
                >
                  {/* Expired Tag */}
                  {isExpired && (
                    <span className="absolute top-2 left-2 bg-red-100 text-red-600 text-xs font-semibold px-2 py-1 rounded">
                      Event Expired
                    </span>
                  )}

                  <img
                    src={event.image}
                    alt={event.name}
                    className="w-full h-48 object-cover rounded mb-3"
                  />
                  <h4 className="text-lg font-bold text-gray-800">{event.name}</h4>
                  {/* <p className="text-sm text-gray-500 mb-1">
                    {new Date(event.startDate).toLocaleDateString()} -{' '}
                    {new Date(event.endDate).toLocaleDateString()}
                  </p> */}
                  <p className="text-sm text-gray-500 mb-1">
                    {formatDate(event.startDate)} - {formatDate(event.endDate)}
                  </p>

                  <p className="text-sm text-gray-600 mb-4">{event.description}</p>
                  <button
                    onClick={() => handleDeleteEvent(event._id)}
                    className="mt-auto bg-red-500 text-white py-1 px-4 rounded hover:bg-red-600 transition text-sm"
                  >
                    Delete
                  </button>
                </div>
              );
            })}

          </div>
        )}
      </div>
    </div>
  );
};

export default Events;
