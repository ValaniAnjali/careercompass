import { Lock, Mail, User2Icon } from 'lucide-react';
import React from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../app/features/authSlice';
import toast from 'react-hot-toast';
import api from '../configs/api';

const Login = () => {
const dispatch = useDispatch();
const query = new URLSearchParams(window.location.search);
const urlState = query.get('state');
const [state, setState] = React.useState(urlState || "login");


const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    password: '',
    jobRole: '',
    higherEducation: '',
    skills: ''
});

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        // Convert skills string to array
        const payload = {
            ...formData,
            skills: formData.skills.split(',').map(s => s.trim())
        };
        const { data } = await api.post(`/api/users/${state}`, payload);
        dispatch(login(data));
        localStorage.setItem('token', data.token);
        toast.success(data.message);
    } catch (error) {
        toast(error?.response?.data?.message || error.message);
    }
};

const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
};

return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
        <form onSubmit={handleSubmit} className="sm:w-[400px] w-full text-center border border-gray-300/60 rounded-2xl px-8 py-10 bg-white shadow-md">
            <h1 className="text-gray-900 text-3xl font-medium mb-2">{state === "login" ? "Login" : "Sign Up"}</h1>
            <p className="text-gray-500 text-sm mb-6">Please {state} to continue</p>

            {/* Name field for Sign Up */}
            {state !== "login" && (
                <>
                    <div className="flex items-center mt-3 w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
                        <User2Icon size={16} color='#6B7280'/>
                        <input 
                            type="text" 
                            name="name" 
                            placeholder="Name" 
                            className="border-none outline-none ring-0 w-full" 
                            value={formData.name} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>

                    <div className="flex items-center mt-3 w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
                        <input 
                            type="text" 
                            name="jobRole" 
                            placeholder="Desired Job Role" 
                            className="border-none outline-none ring-0 w-full" 
                            value={formData.jobRole} 
                            onChange={handleChange} 
                        />
                    </div>

                    <div className="flex items-center mt-3 w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
                        <input 
                            type="text" 
                            name="higherEducation" 
                            placeholder="Higher Education" 
                            className="border-none outline-none ring-0 w-full" 
                            value={formData.higherEducation} 
                            onChange={handleChange} 
                        />
                    </div>

                    <div className="flex items-center mt-3 w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
                        <input 
                            type="text" 
                            name="skills" 
                            placeholder="Skills (comma separated)" 
                            className="border-none outline-none ring-0 w-full" 
                            value={formData.skills} 
                            onChange={handleChange} 
                        />
                    </div>
                </>
            )}

            {/* Email */}
            <div className="flex items-center mt-4 w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
                <Mail size={13} color='#6B7280'/>
                <input 
                    type="email" 
                    name="email" 
                    placeholder="Email id" 
                    className="border-none outline-none ring-0 w-full" 
                    value={formData.email} 
                    onChange={handleChange} 
                    required 
                />
            </div>

            {/* Password */}
            <div className="flex items-center mt-4 w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
                <Lock size={13} color='#6B7280'/>
                <input 
                    type="password" 
                    name="password" 
                    placeholder="Password" 
                    className="border-none outline-none ring-0 w-full" 
                    value={formData.password} 
                    onChange={handleChange} 
                    required 
                />
            </div>

            <div className="mt-4 text-left text-indigo-500">
                <button className="text-sm" type="reset">Forget password?</button>
            </div>

            <button 
                type="submit" 
                className="mt-4 w-full h-11 rounded-full text-white bg-indigo-500 hover:opacity-90 transition-opacity"
            >
                {state === "login" ? "Login" : "Sign Up"}
            </button>

            <p 
                onClick={() => setState(prev => prev === "login" ? "register" : "login")} 
                className="text-gray-500 text-sm mt-3 mb-11 cursor-pointer"
            >
                {state === "login" ? "Don't have an account?" : "Already have an account?"} 
                <span className="text-indigo-500 hover:underline ml-1">click here</span>
            </p>
        </form>
    </div>
)


}

export default Login;
