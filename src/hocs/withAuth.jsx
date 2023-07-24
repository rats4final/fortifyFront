import { useState, useEffect } from "react";
import api from "../utils/api";

const withAuth = (WrappedComponent) => {
    const AuthWrapper = (props) => {
        const [authenticated, setAuthenticated] = useState(false);

        const verifyUser = async () => {
            try {
                const response = await api().get('/api/user');
                console.log(response.data);
                setAuthenticated(true);
            } catch (error) {
                console.log(error);
                setAuthenticated(false);
            }
        }

        useEffect(() => {
            verifyUser();
        },[]);

        if (authenticated) {
            return <WrappedComponent {...props} />
        }else{
            return <h1>You are unauthenticated!</h1>
        }
    }
    return AuthWrapper;
}

export default withAuth;