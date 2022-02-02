

import React, {useState, useeffect} from 'react';
import { useParams } from 'react-router-dom';

const UserStore = () => {

  const {userID} = useParams();

  return <div>{userID}</div>;
};

export default UserStore;
