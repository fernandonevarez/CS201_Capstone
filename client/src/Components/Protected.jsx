import { Navigate } from 'react-router-dom';
import { useUser } from '../contexts/useUser';

const Protected = ({children}) => {
    const {user} = useUser();
    const authed = user.details.isAuthenticated;
    console.log(authed  )
    
    return authed ? <>
        {children}
    </> : <Navigate to="/" replace />
};

export default Protected;
