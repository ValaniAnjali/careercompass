import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../app/features/authSlice';

const Navbar = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutUser = () => {
    navigate('/');
    dispatch(logout());
  };

  return (
    <nav className="fixed w-full z-50 bg-[#010018] border-b border-[#1B2256] shadow-lg">
      <div className="flex items-center justify-between max-w-7xl mx-auto px-6 py-4 text-[#E6ECF2]">
        <Link to="/" className="flex items-center gap-2">
          {/* Logo or text */}
          <h3 className="text-3xl font-extrabold text-[#8DB2D4] tracking-wide hover:text-[#8359A3] transition">
            Career Compass
          </h3>
        </Link>

        <div className="flex items-center gap-4">
          <Link
            to="/app/profile"
            className="font-medium text-[#9AA4C7] hover:text-[#8DB2D4] transition"
          >
            Hi, {user?.name || 'Guest'}
          </Link>
          <button
            onClick={logoutUser}
            className="bg-[#FF7700] text-black px-5 py-1.5 rounded-lg font-semibold hover:opacity-90 active:scale-95 transition-all"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
