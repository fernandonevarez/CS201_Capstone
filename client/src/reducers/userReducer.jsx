const userReducer = (state, action) => {
  switch (action.type) {
    case "login": {
      return { ...state, details: action.payload };
    }
    case "logout": {
      return { ...state, details: {}, storeInfo: {} };
    }
    case "CREATE_STORE": {
      return {
        ...state,
        details: {
          ...state.details,
          user: {
            ...state.details.user,
            hasStore: true,
          },
        },
      };
    }

    case "DELETE_STORE": {
      return {
        ...state,
        details: {
          ...state.details,
          user: {
            ...state.details.user,
            hasStore: false,
          },
        },
      };
    }

    case "STORE_INFO": {
      console.log("this is what is returning", action.payload);
      return {
        ...state,
        details: {
          ...state.details,
          storeInfo: action.payload
        },
      };
    }

    case "favoriteToggle": {
      const index = state.products.favorites.findIndex(
        (fav) => fav.name === action.payload.name
      );
      if (index !== -1)
        return {
          ...state,
          products: {
            ...state.products,
            favorites: state.products.favorites.filter((_, i) => i !== index),
          },
        };
      return {
        ...state,
        products: {
          ...state.products,
          favorites: [...state.products.favorites, action.payload],
        },
      };
    }
    case "favorite": {
      return {
        ...state,
        products: {
          ...state.products,
          favorites: [...state.favorites, action.payload],
        },
      };
    }
    case "unfavorite": {
      return {
        ...state,
        products: {
          ...state.products,
          favorites: state.products.favorites.filter(
            (fav) => fav.name !== action.payload.name
          ),
        },
      };
    }
    case "cartAdd": {
      return {
        ...state,
        products: {
          ...state.products,
          cart: [...state.cart, action.payload],
        },
      };
    }
    case "cartRemove": {
      return {
        ...state,
        products: {
          ...state.products,
          cart: state.products.cart.filter(
            (item) => item.name !== action.payload.name
          ),
        },
      };
    }

    // update hasStore to true
    case "createStore": {
      return {
        ...state,
        details: {
          ...state.details,
          user: {
            ...state.details.user,
            hasStore: true,
          },
        },
      };
    }

    // update store products
    // case "updateStore": {return {...state, products: {
    //     ...state.products,
    //     : action.payload
    // }}}

    case "override": {
      return action.payload;
    }
  }
};

export default userReducer;
