


const userReducer = (state, action) => {
    switch (action.type) {
        case "login": {return {...state, details: action.payload}}
        case "logout": {return {...state, details: {}}}
        case "favoriteToggle": {
            const index = state.products.favorites.findIndex(fav => fav.name === action.payload.name)
            if (index !== -1)
                return {...state, products: {
                    ...state.products,
                    favorites: state.products.favorites.filter((_, i) => i !== index)
                }}
            return {...state, products: {
                ...state.products,
                favorites: [...state.products.favorites, action.payload]
            }}
        }
        case "favorite": {return {...state, products: {
            ...state.products,
            favorites: [...state.favorites, action.payload]
        }}}
        case "unfavorite": {return {...state, products: {
            ...state.products,
            favorites: state.products.favorites.filter(fav => fav.name !== action.payload.name)
        }}}
        case "cartAdd": {return {...state, products: {
            ...state.products,
            cart: [...state.cart, action.payload]
        }}}
        case "cartRemove": {return {...state, products: {
            ...state.products,
            cart: state.products.cart.filter(item => item.name !== action.payload.name)
        }}}
        case "override": {return action.payload}
    }
}

export default userReducer;