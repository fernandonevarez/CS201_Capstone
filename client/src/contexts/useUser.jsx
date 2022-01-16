import {createContext, useContext, useState} from "react";

const UserContext = createContext(null)

const useUser = () => useContext(UserContext)

const UserProvider = ({children}) => {
    const [user, setUser] = useState({
        details: {},
        dev: {
            skipAuth: true,
        },
    })

    const loginUser = (newUser) => {
        setUser({...user, details: newUser})
    }

    const logoutUser = () => {
        setUser({...user, details: {}});
    }

    return <UserContext.Provider value={{user, loginUser, logoutUser}}>
        {children}
    </UserContext.Provider>
}

export {useUser, UserProvider}
