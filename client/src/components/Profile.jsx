import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import api from '../configs/api';
import toast from 'react-hot-toast';
import { login } from '../app/features/authSlice';

const Profile = () => {
    const userRedux = useSelector(state => state.auth.user);
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        name: '',
        jobRole: '',
        higherEducation: '',
        skills: ''
    });

    useEffect(() => {
        if (userRedux) {
            setFormData({
                name: userRedux.name || '',
                jobRole: userRedux.jobRole || '',
                higherEducation: userRedux.higherEducation || '',
                skills: (userRedux.skills || []).join(', ')
            });
        }
    }, [userRedux]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                name: formData.name,
                jobRole: formData.jobRole,
                higherEducation: formData.higherEducation,
                skills: formData.skills.split(',').map(s => s.trim())
            };
            const { data } = await api.put('/api/users/update', payload, {
                headers: { Authorization: localStorage.getItem('token') }
            });

            toast.success('Profile updated successfully');
            dispatch(login({ user: data.user, token: localStorage.getItem('token') }));
        } catch (error) {
            toast.error(error?.response?.data?.message || error.message);
        }
    };

    return (
        <div className="flex justify-center  px-4">
            <form 
                onSubmit={handleSubmit} 
                className="w-full max-w-md bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border border-gray-700 rounded-2xl p-8 shadow-xl text-white"
            >
                <h2 className="text-3xl font-bold mb-6 text-center text-indigo-400">Your Profile</h2>

                <label className="block text-gray-300 mt-3 font-medium">Name</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border border-gray-700 rounded-full px-4 py-2 mt-1 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />

                <label className="block text-gray-300 mt-3 font-medium">Email (cannot edit)</label>
                <input
                    type="email"
                    value={userRedux?.email}
                    disabled
                    className="w-full border border-gray-700 rounded-full px-4 py-2 mt-1 bg-gray-700 text-gray-400 cursor-not-allowed"
                />

                <label className="block text-gray-300 mt-3 font-medium">Desired Job Role</label>
                <input
                    type="text"
                    name="jobRole"
                    value={formData.jobRole}
                    onChange={handleChange}
                    className="w-full border border-gray-700 rounded-full px-4 py-2 mt-1 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />

                <label className="block text-gray-300 mt-3 font-medium">Higher Education</label>
                <input
                    type="text"
                    name="higherEducation"
                    value={formData.higherEducation}
                    onChange={handleChange}
                    className="w-full border border-gray-700 rounded-full px-4 py-2 mt-1 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />

                <label className="block text-gray-300 mt-3 font-medium">Skills (comma separated)</label>
                <input
                    type="text"
                    name="skills"
                    value={formData.skills}
                    onChange={handleChange}
                    className="w-full border border-gray-700 rounded-full px-4 py-2 mt-1 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />

                <button
                    type="submit"
                    className="mt-6 w-full bg-indigo-500 text-white py-2 rounded-full hover:bg-indigo-600 transition-colors font-semibold"
                >
                    Save Changes
                </button>
            </form>
        </div>
    );
};

export default Profile;
