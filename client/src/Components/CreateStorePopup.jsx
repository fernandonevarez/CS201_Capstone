import React from 'react';

import {useUser} from '../contexts/useUser';

const CreateStorePopup = () => {

  const {user} = useUser();

  const yourName = user.details.user.name;
  const yourAccountEmail = user.details.user.email;

  return (
    <main>
      <h1>Create Store</h1>
      <form>
        <label>Store Name</label>
        <div className="input-details">If left blank, it will default to {yourName}'s Store</div>
        <input type="text" />

        <label>Business Email</label>
        <div className="input-details">If left blank, it will default to {yourAccountEmail}</div>
        <input type="text" />
        
        <button>Create</button>
      </form>
    </main>
  );
};

export default CreateStorePopup;
