

import React, {useState, useeffect} from 'react';
import { useParams } from 'react-router-dom';
import {useUser} from '../contexts/useUser';

const UserStore = () => {

  const {userID} = useParams();

  const {user} = useUser();

  const createStore = async () => {
    
  }

  return (
    <main>
      <h1>User's Store</h1>
      {
        user.details.user.hasStore ? (
          <div><h2>{user.details.user.storeName}</h2></div>
        ) : (
          
            <div>
              <h2>You don't have a store yet!</h2>
            <button onClick={() => createStore()}>Create a store</button>
            </div>
            
        )
      }
    </main>
  );
};

export default UserStore;
