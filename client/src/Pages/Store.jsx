import { useParams } from "react-router-dom";
import Button from "../Components/form/Button";
import Input from "../Components/form/Input";
import InputArea from "../Components/form/InputArea";
import { useUser } from "../contexts/useUser";
import "../styles/pages/Store.scss";
import axios from "axios";
import { useState } from "react";

const Store = () => {
  const { userID } = useParams();
  const { user, dispatch } = useUser();
  const [logo, setLogo] = useState(null);

  const [userProducts, setUserProducts] = useState([]);

  console.log(user);

  const onSubmit = async (e) => {
    // init
    e.preventDefault();
    const { target } = e;

    // Gets all of the inputs and makes them into form inputs
    const formData = new FormData();
    formData.append("name", target["store-name"].value);
    formData.append("businessEmail", target["business-email"].value);
    formData.append("logo", target.logo.files[0]);
    formData.append("storeOwnerID", userID);
    formData.append(
      "storeOwnerName",
      `${user.details.user.name.firstName} ${user.details.user.name.lastName}`
    );
    formData.append("description", target["store-desc"].value);

    // console.log([...formData.entries()]);
    // console.log(Object.fromEntries(formData.entries()));

    // Creates the store for the user
    const storeResponse = await axios
      .post(`http://localhost:3000/api/v1/user/store`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Access-Control-Allow-Origin": "http://localhost:3001",
          Authorization: `Bearer ${user.details.token}`,
        },
      })
      .then((response) => {
        console.log("created store", response.data);
        dispatch({ type: "STORE_INFO", payload: response.data });
      })
      .catch((err) => {
        console.log(err);
      });

    // Updates the user with their store
    const userResponse = await axios
      .put(
        `http://localhost:3000/api/v1/auth/updateUser/${user.details.user._id}`,
        {
          wantsUpdating: "hasStore",
          data: true,
          // Not sure why this is here but it might be causing the password issue?
          // userPassword: user.details.user.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
            // "Access-Control-Allow-Origin": "http://localhost:3001",
            Authorization: `Bearer ${user.details.token}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
        dispatch({ type: "CREATE_STORE" });
        // console.log("updated user", response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const createProduct = async () => {
    const productCreationResponse = await axios.post(
      "/api/v1/products",
      {
        name: "",
        price: 1000,
        type: "",
        target: "",
        description: "",
        imageArray: [],
        createBy: user.details.user._id,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "http://localhost:3001",
          Authorization: `Bearer ${user.details.token}`,
        },
      }
    )
  }

  if(user.details.user.hasStore) {
    // get all products
    // const userProducts = user.storeInfo.products;

    // get products who created by user
    
  }

  return (
    <>
      {user.details.user.hasStore ? (
        <main>
          
        </main>
      ) : (
        <main className="store">
          <form onSubmit={onSubmit}>
            <h3>Sell item on MSB by creating a store</h3>
            <div className="center">
              <div className="side-by-side">
                <label
                  htmlFor="logo"
                  className="select-logo"
                  style={
                    logo
                      ? {
                          backgroundImage: `url(${logo})`,
                        }
                      : {
                          backgroundColor: "#4D90A8",
                        }
                  }
                >
                  <input
                    className="input-logo"
                    type="file"
                    name="logo"
                    id="logo"
                    accept="image/png,image/jpeg"
                    onChange={(e) =>
                      setLogo(URL.createObjectURL(e.target.files[0]))
                    }
                  />
                  {logo ? "" : "Select a Logo"}
                </label>
                <Input name="store-name" title="Store Name" />
              </div>
              <Input name="business-email" title="Business Email" type="text" />
              <InputArea name="store-desc" title="Store Description" />
            </div>
            <Button type="submit" text="Create Store" />
          </form>
        </main>
      )}
    </>
  );
};

export default Store;
