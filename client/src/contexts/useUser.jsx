import { createContext, useContext, useState } from "react";

const UserContext = createContext(null)

const useUser = () => useContext(UserContext)

const UserProvider = ({children}) => {
    const [user, setUser] = useState()

    const loginUser = (newUser) => {
        setUser(newUser)
    }

    const logoutUser = () => {
        setUser();
    }

    return <UserContext.Provider value={{user, loginUser, logoutUser}}>
        {children}
    </UserContext.Provider>
}

export {useUser, UserProvider}
