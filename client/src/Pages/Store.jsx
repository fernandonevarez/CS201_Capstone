import { useParams } from "react-router-dom";
import Button from "../Components/form/Button";
import Input from "../Components/form/Input";
import InputArea from "../Components/form/InputArea";
import { useUser } from "../contexts/useUser";
import "../styles/pages/Store.scss";
import axios from "axios";
import { useState, useEffect } from "react";

const Store = () => {
  const { userID } = useParams();
  const { user, dispatch } = useUser();
  const [logo, setLogo] = useState(null);

  const [shownProducts, setShownProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios
        .get(`http://localhost:3000/api/v1/products`, {
          headers: {
            Authorization: `Bearer ${user.details.token}`,
            "Access-Control-Allow-Origin": "http://localhost:3001",
          },
        })
        .then((response) => {
          // console.log(response.data.products);
          // filter products to only show products that belong to the store
          const filteredProducts = response.data.products.filter(
            (product) => product.createdBy === userID
          );
          setShownProducts(filteredProducts);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchProducts();
  }, [user.details.user.storeInfo.products]);

  // console.log(user);

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
        console.log(response.data);
        dispatch({ type: "CREATE_STORE" });
        // console.log("updated user", response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const createProductForm = (e) => {
    e.preventDefault();
    const { target } = e;

    const convertedPrice = target["price"].value.replace(/[^0-9.]/g, "");

    // convert the price into pennies
    // const convertedPrice = target["product-price"].value.replace(
    //   /[^0-9.]/g,
    //   ""
    // ).replace(/\./g, "");

    // console.log(convertedPrice);

    const formData = new FormData();
    formData.append("name", target["name"].value);
    formData.append("price", convertedPrice);
    formData.append("type", target["type"].value);
    formData.append("target", target["target"].value);
    formData.append("description", target["product-desc"].value);

    formData.append("imageArray", target["product-images"].value);
    // formData.append("createdBy", userID);
    formData.append("createdBy", user.details.user._id);
    // formData.append("storeID", user.details.user.store._id);

    const createProduct = async () => {
      const productCreationResponse = await axios.post(
        "/api/v1/products",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "http://localhost:3001",
            Authorization: `Bearer ${user.details.token}`,
          },
        }
      ).then((response) => {
        console.log("products", response.data);
        // dispatch({ type: "CREATE_PRODUCT", payload: response.data });
      }
      ).catch((err) => {
        console.log(err);
      }
      );
    };
  };

  const deleteStore = async () => {
    const storeDeleteResponse = await axios
      .delete(
        `http://localhost:3000/api/v1/user/store/${user.details.user.storeInfo._id}`,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "http://localhost:3001",
            Authorization: `Bearer ${user.details.token}`,
          },
        }
      )
      .then((response) => {
        // console.log(response);
        dispatch({ type: "DELETE_STORE" });
      });
  };

  return (
    <>
      {user.details.user.hasStore ? (
        <main className="store-display">
          <div className="top">
            <div className="image">
              <img
                src={user.details.user.storeInfo.logo}
                alt={`${user.details.user.storeInfo.name}'s logo`}
              />
            </div>
            <div className="details">
              <div className="name">{user.details.user.storeInfo.name}</div>
              <div className="owner">
                From {user.details.user.storeInfo.storeOwnerName}
              </div>
            </div>
          </div>
          <div className="desc">
            <span className="title">Description:</span>
            <p className="content">{user.details.user.storeInfo.description}</p>
          </div>
          <div className="products-wrapper">
            <div className="products">
              {shownProducts.map((product) => (
                <div className="store-product">
                <div className="image"><img src={product.imageArray[0]} alt={product.name} /></div>
                <div className="details">
                  <div className="product-name">{product.name}</div>
                  <div className="product-desc">{product.description}</div>
                </div>
              </div>
              ))}
            </div>
            <div className="add">
              <div className="hor"></div>
              <div className="ver"></div>
            </div>
          </div>
          <div className="delete-store">
            <button
              className="delete-button"
              onClick={() => {
                deleteStore();
              }}
            >
              Delete Store
            </button>
          </div>

          <div className="modal">
            <form onSubmit={createProductForm}>
              <Input name="name" />
              {/* <Input type={"number"} name="price" onChange={(e) => console.log(e.target.value)}/> */}

              <div className="price-wrapper">
                <span className="title">Price</span>
                <input name="price" type={"number"}></input>
              </div>

              <div className="type">
                <span className="title">type of Product</span>
                <br />
                <select name="type">
                  <option value="">Select a type</option>
                  <option value="toy">toy</option>
                  <option value="art">art</option>
                  <option value="entertainment">entertainment</option>
                  <option value="clothing">clothing</option>
                  <option value="craft supplies">craft supplies</option>
                  <option value="Tools">Tools</option>
                  <option value="party">party</option>
                  <option value="jewelry">jewelry</option>
                  <option value="accessories">accessories</option>
                </select>
              </div>

              <div className="target">
                <span className="title">Target audience:</span>
                <br />
                <select name="target">
                  <option value="">Select a type</option>
                  <option value="kids">Kids</option>
                  <option value="teens">Teens</option>
                  <option value="adults">Adults</option>
                  <option value="netural">netural</option>
                </select>
              </div>

              <div className="desc">
                <span className="title">Description:</span>
                <br />
                <textarea
                  name="product-desc"
                  cols="30"
                  rows="10"
                  placeholder="Enter a description"
                ></textarea>
              </div>

              {/* allow for users to be able to upload multiply images */}
              <div className="images">
                <span className="title">Images:</span>
                <br />
                <input
                  type="file"
                  name="product-images"
                  multiple
                  accept="image/png,image/jpeg"
                />
              </div>

              {/* <input
                className="input-logo"
                type="file"
                name="logo"
                id="logo"
                accept="image/png,image/jpeg"
                onChange={(e) =>
                  setLogo(URL.createObjectURL(e.target.files[0]))
                }
              /> */}
              <Button type="submit" text="Create Product" />
            </form>
          </div>
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
