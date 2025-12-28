import { Lock, Mail, User2Icon, Sparkles, Target, ArrowRight, Eye, EyeOff } from 'lucide-react';
import React from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../app/features/authSlice';
import toast from 'react-hot-toast';
import api from '../configs/api';
import { Link } from 'react-router-dom';

const Login = () => {
const dispatch = useDispatch();
const query = new URLSearchParams(window.location.search);
const urlState = query.get('state');
const [state, setState] = React.useState(urlState || "login");
const [showPassword, setShowPassword] = React.useState(false);


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
    <div className="min-h-screen bg-gradient-to-br from-[#010018] via-[#0A0F2C] to-[#010018] relative overflow-hidden flex items-center justify-center p-6">
        {/* Animated background elements */}
        <div className="absolute inset-0">
            <div className="absolute top-20 left-10 w-72 h-72 bg-[#FF7700]/8 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#8DB2D4]/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-[#1B2256]/15 to-transparent rounded-full blur-3xl"></div>
        </div>

        {/* Floating decorative elements */}
        <div className="absolute top-20 right-20 w-4 h-4 bg-[#FF7700] rounded-full animate-bounce delay-500"></div>
        <div className="absolute bottom-32 left-16 w-6 h-6 bg-[#8DB2D4] rounded-full animate-bounce delay-1000"></div>
        <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-[#FFA600] rounded-full animate-bounce delay-1500"></div>

        {/* Back to home link */}
        <Link
            to="/"
            className="absolute top-6 left-6 flex items-center gap-2 text-[#8DB2D4] hover:text-[#FF7700] transition-colors duration-300 group"
        >
            <ArrowRight className="w-4 h-4 rotate-180 group-hover:scale-110 transition-transform" />
            <span className="text-sm font-medium">Back to Home</span>
        </Link>

        <div className="relative z-10 w-full max-w-md">
            {/* Logo/Brand */}
            <div className="text-center mb-8">
                <div className="inline-flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-[#FF7700] to-[#FFA600] rounded-2xl flex items-center justify-center shadow-lg shadow-[#FF7700]/25">
                        <Target className="w-7 h-7 text-white" />
                    </div>
                    <h1 className="text-2xl font-bold text-white">Career Compass</h1>
                </div>
                <p className="text-[#9AA4C7] text-sm">Your journey to career success starts here</p>
            </div>

            {/* Main Form Card */}
            <div className="relative">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#FF7700]/20 via-[#8DB2D4]/10 to-[#FF7700]/20 rounded-3xl blur-xl"></div>

                <form onSubmit={handleSubmit} className="relative bg-gradient-to-br from-[#0A0F2C]/90 via-[#1B2256]/30 to-[#0A0F2C]/90 backdrop-blur-xl border border-[#1B2256]/50 rounded-3xl p-8 shadow-2xl">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-white mb-2">
                            {state === "login" ? "Welcome Back" : "Join the Journey"}
                        </h2>
                        <p className="text-[#9AA4C7] text-sm">
                            {state === "login" ? "Sign in to continue building your career" : "Create your account and start crafting resumes"}
                        </p>
                    </div>

                    {/* Form Fields */}
                    <div className="space-y-4">
                        {/* Name field for Sign Up */}
                        {state !== "login" && (
                            <>
                                <div className="group">
                                    <label className="block text-sm font-medium text-[#8DB2D4] mb-2">Full Name</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <User2Icon className="w-5 h-5 text-[#9AA4C7] group-focus-within:text-[#8DB2D4] transition-colors" />
                                        </div>
                                        <input
                                            type="text"
                                            name="name"
                                            placeholder="Enter your full name"
                                            className="w-full pl-12 pr-4 py-3 bg-[#010018]/50 border border-[#1B2256]/60 rounded-xl text-white placeholder-[#9AA4C7] focus:outline-none focus:border-[#8DB2D4] focus:ring-2 focus:ring-[#8DB2D4]/20 transition-all duration-300"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="group">
                                    <label className="block text-sm font-medium text-[#8DB2D4] mb-2">Desired Job Role</label>
                                    <input
                                        type="text"
                                        name="jobRole"
                                        placeholder="e.g. Software Engineer, Product Manager"
                                        className="w-full px-4 py-3 bg-[#010018]/50 border border-[#1B2256]/60 rounded-xl text-white placeholder-[#9AA4C7] focus:outline-none focus:border-[#8DB2D4] focus:ring-2 focus:ring-[#8DB2D4]/20 transition-all duration-300"
                                        value={formData.jobRole}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="group">
                                    <label className="block text-sm font-medium text-[#8DB2D4] mb-2">Education</label>
                                    <input
                                        type="text"
                                        name="higherEducation"
                                        placeholder="e.g. Bachelor's in Computer Science"
                                        className="w-full px-4 py-3 bg-[#010018]/50 border border-[#1B2256]/60 rounded-xl text-white placeholder-[#9AA4C7] focus:outline-none focus:border-[#8DB2D4] focus:ring-2 focus:ring-[#8DB2D4]/20 transition-all duration-300"
                                        value={formData.higherEducation}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="group">
                                    <label className="block text-sm font-medium text-[#8DB2D4] mb-2">Skills</label>
                                    <input
                                        type="text"
                                        name="skills"
                                        placeholder="e.g. JavaScript, React, Node.js"
                                        className="w-full px-4 py-3 bg-[#010018]/50 border border-[#1B2256]/60 rounded-xl text-white placeholder-[#9AA4C7] focus:outline-none focus:border-[#8DB2D4] focus:ring-2 focus:ring-[#8DB2D4]/20 transition-all duration-300"
                                        value={formData.skills}
                                        onChange={handleChange}
                                    />
                                </div>
                            </>
                        )}

                        {/* Email */}
                        <div className="group">
                            <label className="block text-sm font-medium text-[#8DB2D4] mb-2">Email Address</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Mail className="w-5 h-5 text-[#9AA4C7] group-focus-within:text-[#8DB2D4] transition-colors" />
                                </div>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Enter your email"
                                    className="w-full pl-12 pr-4 py-3 bg-[#010018]/50 border border-[#1B2256]/60 rounded-xl text-white placeholder-[#9AA4C7] focus:outline-none focus:border-[#8DB2D4] focus:ring-2 focus:ring-[#8DB2D4]/20 transition-all duration-300"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div className="group">
                            <label className="block text-sm font-medium text-[#8DB2D4] mb-2">Password</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Lock className="w-5 h-5 text-[#9AA4C7] group-focus-within:text-[#8DB2D4] transition-colors" />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Enter your password"
                                    className="w-full pl-12 pr-12 py-3 bg-[#010018]/50 border border-[#1B2256]/60 rounded-xl text-white placeholder-[#9AA4C7] focus:outline-none focus:border-[#8DB2D4] focus:ring-2 focus:ring-[#8DB2D4]/20 transition-all duration-300"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-[#9AA4C7] hover:text-[#8DB2D4] transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Forgot Password */}
                    {state === "login" && (
                        <div className="mt-4 text-right">
                            <button type="button" className="text-sm text-[#8DB2D4] hover:text-[#FF7700] transition-colors duration-300">
                                Forgot password?
                            </button>
                        </div>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="mt-6 w-full py-4 bg-gradient-to-r from-[#FF7700] to-[#FFA600] text-black font-semibold rounded-xl hover:shadow-lg hover:shadow-[#FF7700]/30 transition-all duration-300 hover:scale-105 hover:from-[#FFA600] hover:to-[#FF7700] flex items-center justify-center gap-2 group"
                    >
                        <span>{state === "login" ? "Sign In" : "Create Account"}</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>

                    {/* Toggle Auth Mode */}
                    <div className="mt-6 text-center">
                        <p className="text-[#9AA4C7] text-sm">
                            {state === "login" ? "Don't have an account?" : "Already have an account?"}
                            <button
                                type="button"
                                onClick={() => setState(prev => prev === "login" ? "register" : "login")}
                                className="ml-2 text-[#8DB2D4] hover:text-[#FF7700] font-medium transition-colors duration-300 hover:underline"
                            >
                                {state === "login" ? "Sign up" : "Sign in"}
                            </button>
                        </p>
                    </div>

                    {/* Decorative sparkles */}
                    <div className="absolute top-4 right-4 text-[#FF7700]/30">
                        <Sparkles className="w-6 h-6" />
                    </div>
                    <div className="absolute bottom-4 left-4 text-[#8DB2D4]/30">
                        <Sparkles className="w-4 h-4" />
                    </div>
                </form>
            </div>

            {/* Footer text */}
            <p className="text-center text-[#9AA4C7] text-xs mt-6 max-w-sm mx-auto">
                By continuing, you agree to our Terms of Service and Privacy Policy.
                We respect your privacy and never share your data.
            </p>
        </div>
    </div>
)
}

export default Login;
