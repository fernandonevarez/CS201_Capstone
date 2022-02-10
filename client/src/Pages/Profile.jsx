import React, { useState, useEffect } from "react";

import "../styles/pages/Profile.scss";

import { useUser } from "../contexts/useUser";

const Profile = () => {
  const { user } = useUser();
  const userInfo = user.details.user;

  console.log(user.details.isAuthenticated);

  return (
    
    <main>
      {user.details.isAuthenticated ? (
        <div>
        <h1>Profile</h1>
          <div className="user-info">
            <div className="about_you">
              {userInfo.profile_picture ? (
                <img
                  src={userInfo.profile_picture}
                  alt="user's profile picture"
                />
              ) : (
                <img
                  src="https://res.cloudinary.com/drl5uagby/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1643513213/Store_Images_uploader/default-avatar-profile-icon-grey-photo-placeholder-vector-17317730_wtcwrn.jpg"
                  alt="user's profile picture"
                />
              )}
              <h2>{userInfo.name.firstName}</h2>
            </div>
  
            <div className="email-wrapper">
              <h3>Email: {userInfo.email}</h3>
            </div>
  
            {/* <div className="password-wrapper">
              <h3>Password: {userInfo.password}</h3>
            </div> */}
          </div>
        
        
        
      </div>
      ) : (
        <div> You need to be logged in</div>
      )}
    </main>

  );
};

export default Profile;
