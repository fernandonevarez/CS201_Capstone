import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useUser } from "../contexts/useUser";
import axios from "axios";

import "../styles/pages/UserStore.scss";

import CreateStorePopup from "../Components/CreateStorePopup";
import Footer from "../Components/Footer";

/*

  * things to do:
    1. create a store with axios post call to node server

    go to this website: https://stackoverflow.com/questions/39663961/how-do-you-send-images-to-node-js-with-axios
    - learn how to upload images to node server using axios

*/





const UserStore = () => {
  const { userID } = useParams();


  const {user} = useUser();

  const yourName = `${user.details.user.name.firstName} ${user.details.user.name.lastName}`;
  const yourAccountEmail = user.details.user.email;

  const [showCreateStoreForm, setShowCreateStoreForm] = useState(false);

  const [logoData, setLogoData] = useState({});

  console.log(user)

  const createStore = async (storeInfo) => {
    const response = await axios.post(
      `http://localhost:3000/api/v1/user/store`,
      storeInfo,
      {
        headers: {
          "Access-Control-Allow-Origin": "http://localhost:3001",
          Authorization: `Bearer ${user.details.token}`,
        },
      }
    );
    console.log(response.data);
  };


  const handleFormSubmit = (e) => {
    e.preventDefault();

    const {target} = e;

    console.log(target);

    console.log(document.getElementsByClassName("store_name"))

    console.log("logoData", logoData);

    const storeInfo = {
      name: target.storeName.value != "" ? target.storeName.value : `${yourName}'s Store`,
      businessEmail: target.businessEmail.value ? target.businessEmail.value : yourAccountEmail,
      storeOwnerID: user.details.user._id,
      storeOwnerName: yourName,
      logo: logoData,
      description: target.description.value,
    }

    createStore(storeInfo);
  }

  console.log(logoData)

  return (
    <main>
      
      {user.details.user.hasStore ? (
        <>
        <h1>User's Store</h1>
        <div>
          <h2>{user.details.user.storeName}</h2>
        </div></>
      ) : (
        showCreateStoreForm ? (
        // <CreateStorePopup />
        <>
          <h1 className="title">Easily Create a store to start selling</h1>
          <form onSubmit={(e) => handleFormSubmit(e)}>
            <div className="section-wrapper">
            <label>Store Name</label>
            <input type="text" name="storeName" />
            <div className="input-details">
              * If left blank, it will default to {yourName}'s Store
            </div>
            </div>
            <div className="section-wrapper">
            <label>Business Email</label>
            <input type="text" name="businessEmail" />
            <div className="input-details">
              * If left blank, it will default to your account's email: {yourAccountEmail}
            </div>
            </div>
            <div className="section-wrapper">
            <label>logo upload <span>*</span></label>
            <input className="image-upload-input" type="file" onChange={
              (e) => {
                // console.log(e.target.files[0]);
                setLogoData(e.target.files[0]);
              }
            }/>
            <div className="input-details">
              * you need to upload a logo for your store
            </div>
            </div>
            <div className="section-wrapper">
            <label>Business description <span>*</span></label>
            <textarea rows="5" cols="50" name="description" placeholder="write a description of your store"></textarea>
            <div className="input-details">
              * Please describe your business so others can know what you sell
            </div>
            </div>

            <button type="submit" onSubmit={(e) => handleFormSubmit(e)}>Create</button>
          </form>
        </>
      ) : (
        <div>
          <h3>Your don't have a store yet</h3>
          <button onClick={() => setShowCreateStoreForm(!showCreateStoreForm)}>
            Create Store
          </button>
        </div>
      )
      )
      }

      {/* <Footer className="footer"/> */}
    </main>
  );
};

export default UserStore;
