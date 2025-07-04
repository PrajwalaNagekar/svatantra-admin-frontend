import React, { useState, useEffect } from 'react';
import { uploadImage, deleteImage, getAllGalleryImages } from '../../api';
import { Plus, X } from 'lucide-react';
import FullScreenLoader from '../../components/loaders/FullScreenLoader';
import PopupModal from '../../components/popupModal/PopupModal';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState({ show: false, message: '', type: 'success' });

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    setLoading(true);
    try {
      const res = await getAllGalleryImages();
      if (res.success) {
        setImages(res.images || []);
      } else {
        setPopup({ show: true, message: res.message || 'Failed to load images', type: 'error' });
      }
    } catch (error) {
      console.error('Error fetching images:', error);
      setPopup({ show: true, message: 'Something went wrong fetching images', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles((prev) => [...prev, ...files]);
  };

  const handleRemoveSelected = (index) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) return;

    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append('images', file); // 'images' matches multer key
    });

    setUploading(true);
    try {
      await uploadImage(formData);
      setSelectedFiles([]);
      fetchImages();
      setPopup({ show: true, message: 'Images uploaded successfully!', type: 'success' });
    } catch (error) {
      console.error('Upload failed:', error);
      setPopup({ show: true, message: 'Failed to upload images', type: 'error' });
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await deleteImage(id);
      fetchImages();
      setPopup({ show: true, message: 'Image deleted successfully', type: 'success' });
    } catch (error) {
      console.error('Delete failed:', error);
      setPopup({ show: true, message: 'Failed to delete image', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 w-full relative">
      {(loading || uploading) && <FullScreenLoader />}
      {popup.show && (
        <PopupModal
          message={popup.message}
          type={popup.type}
          onClose={() => setPopup({ ...popup, show: false })}
        />
      )}

      <h2 className="text-3xl font-bold mb-8 text-gray-800 underline decoration-pink-500 underline-offset-8">
        Manage Campus
      </h2>

      {/* Upload Section */}
      <div className="mb-10 flex flex-col items-center gap-4">
        <input
          type="file"
          id="multiImageUpload"
          multiple
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
        <label
          htmlFor="multiImageUpload"
          className="w-32 h-32 flex items-center justify-center border-2 border-dashed border-pink-400 rounded-md cursor-pointer hover:bg-pink-50 transition"
        >
          <Plus className="text-pink-500" size={32} />
        </label>

        {selectedFiles.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
            {selectedFiles.map((file, idx) => (
              <div key={idx} className="relative">
                <img
                  src={URL.createObjectURL(file)}
                  alt={`preview-${idx}`}
                  className="w-32 h-24 object-cover rounded shadow"
                />
                <button
                  onClick={() => handleRemoveSelected(idx)}
                  className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1 hover:bg-red-700"
                  title="Remove"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        )}

        <button
          onClick={handleUpload}
          className="mt-4 bg-pink-600 text-white px-6 py-2 rounded hover:bg-pink-700 transition disabled:opacity-50"
          disabled={uploading || selectedFiles.length === 0}
        >
          {uploading ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              Uploading...
            </span>
          ) : (
            'Upload Selected Images'
          )}
        </button>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {images.length > 0 ? (
          images.map((img) => (
            <div
              key={img._id}
              className="flex flex-col items-center overflow-hidden rounded-lg border shadow hover:shadow-lg transition p-2"
            >
              <img src={img.url} alt="gallery" className="w-full h-60 object-cover" />
              <button
                onClick={() => handleDelete(img._id)}
                className="mt-3 mb-4 bg-red-600 text-white text-sm px-4 py-2 rounded hover:bg-red-700 transition w-full"
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <p className="col-span-full text-gray-500 text-center">No images uploaded yet.</p>
        )}
      </div>
    </div>
  );
};

export default Gallery;
