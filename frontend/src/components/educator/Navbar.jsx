import React from 'react';
import { assets, dummyEducatorData } from '../../assets/assets';
import { UserButton, useUser } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const educatorData = dummyEducatorData;
  const { user } = useUser();

  return (
    <div className="flex justify-between items-center p-4">
      <Link to="/">
        <img src={assets.logo} alt="Logo" className="w-16 lg:w-20 rounded-full" />
      </Link>
      <div className="flex items-center gap-5 text-gray-500 relative">
        <p>Hi! {user ? user.fullName : 'Developers'}</p>
        {user ? (
          <UserButton />
        ) : (
          <img className="w-8 h-8 rounded-full" src={assets.profile_img} alt="Profile" />
        )}
      </div>
    </div>
  );
};

export default Navbar;
