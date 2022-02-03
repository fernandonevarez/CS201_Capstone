import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useUser } from "../contexts/useUser";
import axios from "axios";

import CreateStorePopup from "../Components/CreateStorePopup";

const UserStore = () => {
  const { userID } = useParams();


  const {user} = useUser();

  const yourName = `${user.details.user.name.firstName} ${user.details.user.name.lastName}`;
  const yourAccountEmail = user.details.user.email;

  const [showCreateStoreForm, setShowCreateStoreForm] = useState(false);

  const [logoData, setLogoData] = useState({});

  const storeInfo = {
    name: "",
    businessEmail: "",
    storeOwnerID: "",
    storeOwnerName: "",
    logo: "",
    description: "",
  }

  const createStore = async () => {
    const response = await axios.post(
      `http://localhost:3000/api/v1/user/store`,
      storeInfo,
      {
        headers: {
          Authorization: `Bearer ${user.details.user.token}`,
          "Access-Control-Allow-Origin": "http://localhost:3001",
        },
      }
    );
    console.log(response.data);
  };

  
  console.log(logoData)

  return (
    <main>
      <h1>User's Store</h1>
      {user.details.user.hasStore ? (
        <div>
          <h2>{user.details.user.storeName}</h2>
        </div>
      ) : (
        showCreateStoreForm ? (
        // <CreateStorePopup />
        <>
          <h1>Create Store</h1>
          <form>

            <label>Store Name</label>
            <input type="text" />
            <div className="input-details">
              If left blank, it will default to {yourName}'s Store
            </div>

            <label>Business Email</label>
            <input type="text" />

            
            <div className="input-details">
              If left blank, it will default to your account's email: {yourAccountEmail}
            </div>
            
            <label>logo upload</label>
            <input type="file" onChange={
              (e) => {
                // console.log(e.target.files[0]);
                setLogoData(e.target.files[0]);
              }
            }/>
            <div className="input-details">
              you need to upload a logo for your store
            </div>

            <label>Business description</label>
            <input type="text" />

            
            <div className="input-details">
              Please describe your business so others can know what you sell
            </div>

            <button>Create</button>
          </form>
        </>
      ) : (
        <div>
          <h3>Your don't have a store yet</h3>
          <button onClick={() => setShowCreateStoreForm(true)}>
            Create Store
          </button>
        </div>
      )
      )
      }
    </main>
  );
};

export default UserStore;
