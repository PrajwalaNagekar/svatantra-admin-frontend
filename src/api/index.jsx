import axios from 'axios'
const VITE_BACKEND_LOCALHOST_API_URL = import.meta.env.VITE_BACKEND_API_URL;

const api = axios.create({
    baseURL: VITE_BACKEND_LOCALHOST_API_URL,
});

export const adminLogin = async (payload) => {
    try {
        const res = await api.post('/login', payload)
        // console.log("🚀 ~ adminLogin ~ res:", res)
        return res;
    } catch (error) {
        console.log("🚀 ~ adminLogin ~ error:", error)
    }
}
// Get token from localStorage (helper)
// const authHeader = () => ({
//   headers: {
//     Authorization: `Bearer ${localStorage.getItem('token')}`,
//   },
// });

export const uploadImage = async (formData) => {
    try {
        const token = localStorage.getItem('token');

        const res = await api.post('/upload', formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
        });

        return res.data;
    } catch (error) {
        console.error("🚀 ~ uploadImage ~ error:", error);
        throw error.response?.data || { success: false, message: 'Image upload failed' };
    }
};
export const getAllGalleryImages = async () => {
    try {
        const token = localStorage.getItem('token');
        const res = await api.get('/all-images', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data;
    } catch (error) {
        console.error('Error fetching gallery images:', error);
        return { success: false, message: 'Failed to fetch images' };
    }
};


export const getImageById = async (id) => {
    try {
        const token = localStorage.getItem('token');
        const res = await api.get(`/get-image-by-id/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return res.data;
    } catch (error) {
        console.error("🚀 ~ getImageById ~ error:", error);
        throw error.response?.data || { success: false, message: 'Failed to fetch image' };
    }
};

export const deleteImage = async (id) => {
    try {
        const token = localStorage.getItem('token');
        const res = await api.delete(`/delete-image/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return res.data;
    } catch (error) {
        console.error("🚀 ~ deleteImage ~ error:", error);
        throw error.response?.data || { success: false, message: 'Failed to delete image' };
    }
};

export const getAllApplications = async () => {
    try {
        const token = localStorage.getItem('token');

        const res = await api.get('/all-applications', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        // console.log("🚀 ~ getAllApplications ~ res:", res)

        return res.data;
    } catch (error) {
        console.error('Error fetching applications:', error);
        return {
            success: false,
            message: error?.response?.data?.message || 'Something went wrong while fetching applications'
        };
    }
};

export const getAllEnquiries = async () => {
    try {
        const token = localStorage.getItem('token');

        const res = await api.get('/all-enquiries', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return res.data;
    } catch (error) {
        console.error('Error fetching enquiries:', error);
        return {
            success: false,
            message: error?.response?.data?.message || 'Something went wrong while fetching enquiries'
        };
    }
};
export const getAllvisits = async () => {
    try {
        const token = localStorage.getItem('token');
        const res = await api.get('/all-visits', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        // console.log("🚀 ~ getAllvisits ~ res.data:", res.data)
        return res.data;
    } catch (error) {
        console.error('Error fetching visits:', error);
        return {
            success: false,
            message: error?.response?.data?.message || 'Something went wrong while fetching applications'
        };
    }
}

export const getAllTeacherApplications = async () => {
    try {
        const token = localStorage.getItem('token');

        const res = await api.get('/all-teacher-applications', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        // console.log("🚀 ~ getAllTeacherApplications ~ res:", res)

        return res.data;
    } catch (error) {
        console.error('Error fetching teacher applications:', error);
        return {
            success: false,
            message: error?.response?.data?.message || 'Something went wrong while fetching teacher applications'
        };
    }
};

//events

export const addEvent = async (formData) => {
    try {
        const token = localStorage.getItem('token');
        // console.log("🚀 ~ addEvent ~ token:", token)
        const res = await api.post('/add-event', formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
        });
        return res.data;
    } catch (error) {
        console.error('Error adding event:', error);
        return {
            success: false,
            message: error?.response?.data?.message || 'Failed to add event',
        };
    }
};
// export const getEventById = async () => {
//     try {

//     } catch (error) {

//     }
// }
export const updateEvent = async (id, formData) => {
    try {
        const token = localStorage.getItem('token');
        const res = await api.put(`/update-event/${id}`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
        });
        return res.data;
    } catch (error) {
        console.error('Error updating event:', error);
        return {
            success: false,
            message: error?.response?.data?.message || 'Failed to update event',
        };
    }
};

export const deleteEvent = async (id) => {
    try {
        const token = localStorage.getItem('token');
        const res = await api.delete(`/delete-event/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data;
    } catch (error) {
        console.error('Error deleting event:', error);
        return {
            success: false,
            message: error?.response?.data?.message || 'Failed to delete event',
        };
    }
};

export const allEvents = async () => {
    const token = localStorage.getItem('token');

    try {
        const res = await api.get('/all-events', {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        },);
        // console.log("🚀 ~ allEvents ~ res:", res)
        return res.data;
    } catch (error) {
        console.error('Error fetching events:', error);
        return {
            success: false,
            message: error?.response?.data?.message || 'Failed to fetch events',
        };
    }
};

export const getDashboardCounts = async () => {
    try {
        const token = localStorage.getItem('token');
        const res = await api.get('/dashboard-counts', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data;
    } catch (error) {
        console.error("Error fetching dashboard counts:", error);
        return { success: false, message: 'Failed to fetch counts' };
    }
};