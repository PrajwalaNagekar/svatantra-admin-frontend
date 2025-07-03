import React, { useState, useEffect } from 'react';
import { uploadImage, deleteImage, getAllGalleryImages } from '../../api';
import { Plus } from 'lucide-react';
import FullScreenLoader from '../../components/loaders/FullScreenLoader';
import PopupModal from '../../components/popupModal/PopupModal';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(null);
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
    const file = e.target.files[0];
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    const formData = new FormData();
    formData.append('images', selectedFile);

    setUploading(true);
    try {
      await uploadImage(formData);
      setSelectedFile(null);
      setPreview(null);
      fetchImages();
      setPopup({ show: true, message: 'Image uploaded successfully!', type: 'success' });
    } catch (error) {
      console.error('Upload failed:', error);
      setPopup({ show: true, message: 'Failed to upload image', type: 'error' });
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
      {loading && <FullScreenLoader />}
      {popup.show && (
        <PopupModal
          message={popup.message}
          type={popup.type}
          onClose={() => setPopup({ ...popup, show: false })}
        />
      )}
      {uploading && <FullScreenLoader />}
      <h2 className="text-3xl font-bold mb-8 text-gray-800 underline decoration-pink-500 underline-offset-8">
        Manage Campus
      </h2>

      {/* Upload Section */}
      <div className="mb-10 flex justify-center">
        <div className="flex flex-col items-center gap-4">
          {/* File Input */}
          <div className="relative">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              id="imageUpload"
            />
            <label
              htmlFor="imageUpload"
              className="w-32 h-32 flex items-center justify-center border-2 border-dashed border-pink-400 rounded-md cursor-pointer hover:bg-pink-50 transition"
            >
              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-full object-cover rounded"
                />
              ) : (
                <Plus className="text-pink-500" size={32} />
              )}
            </label>
          </div>

          {/* Upload Button */}
          <button
            onClick={handleUpload}
            className="bg-pink-600 text-white px-6 py-2 rounded hover:bg-pink-700 transition"
            disabled={uploading || !selectedFile}
          >
            {uploading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Uploading...
              </span>
            ) : (
              'Upload Image'
            )}
          </button>
        </div>
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
