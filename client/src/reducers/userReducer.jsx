const userReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN": {
      return { ...state, details: action.payload };
    }
    case "LOGOUT": {
      return { ...state, details: {}, storeInfo: {} };
    }

    case "UPDATE_USER": {
      return {
        ...state,
        details: {
          ...state.details,
          user: action.payload,
        },
      };
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
            storeInfo: {},
          },
        },
      };
    }

    case "STORE_INFO": {
      // console.log("this is what is returning", action.payload);
      return {
        ...state,
        details: {
          ...state.details,
          user: {
            ...state.details.user,
            storeInfo: action.payload.store,
          },
        },
      };
    }

    case "FAVORITE_TOGGLE": {
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
    case "FAVORITE": {
      return {
        ...state,
        products: {
          ...state.products,
          favorites: action.payload,
        },
      };
    }
    case "UNFAVORITE": {
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
    case "ADD_TO_CART": {
      return {
        ...state,
        details: {
          ...state.details,
          user: {
            ...state.details.user,
            cart: action.payload,
          },
        },
      };
    }
    case "REMOVE_FROM_CART": {
      return {
        ...state,
        details: {
          ...state.details,
          user: {
            ...state.details.user,
            cart: action.payload,
          },
        },
      };
    }

    // update hasStore to true
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

    // update store products
    // case "updateStore": {return {...state, products: {
    //     ...state.products,
    //     : action.payload
    // }}}

    case "OVERRIDE": {
      return action.payload;
    }
  }
};

export default userReducer;
