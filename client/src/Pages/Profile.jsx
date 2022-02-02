import React, { useState, useEffect } from "react";

import "../styles/pages/Profile.scss";

import { useUser } from "../contexts/useUser";

const Profile = () => {
  const { user } = useUser();
  const userDetails = user.details;

  return (
    <main>
      <h1>Profile</h1>
        <div className="user-info">
          <div className="about_you">
            {userDetails.user.profile_picture ? (
              <img
                src={userDetails.user.profile_picture}
                alt="user's profile picture"
              />
            ) : (
              <img
                src="https://res.cloudinary.com/drl5uagby/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1643513213/Store_Images_uploader/default-avatar-profile-icon-grey-photo-placeholder-vector-17317730_wtcwrn.jpg"
                alt="user's profile picture"
              />
            )}
            <h2>{userDetails.user.name.firstName}</h2>
          </div>

          <div className="email-wrapper">
            <h3>Email: {userDetails.user.email}</h3>
          </div>

          <div className="password-wrapper">
            <h3>Password: {userDetails.user.password}</h3>
          </div>
        </div>
      ) : (
        <p>You are not logged in</p>
      )
    </main>
  );
};

export default Profile;
