import { useState, useEffect } from "react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";

const withAuth = (WrappedComponent) => {
    const AuthWrapper = (props) => {
        const navigation = useNavigate();
        const [authenticated, setAuthenticated] = useState(false);

        const verifyUser = async () => {
            try {
                const response = await api().get('/api/user');
                console.log(response.data);
                setAuthenticated(true);
            } catch (error) {
                console.log(error);
                setAuthenticated(false);
                navigation("/login");
            }
        }

        useEffect(() => {
            verifyUser();
        },[]);


        if (authenticated) {
            return <WrappedComponent {...props} />
        }else{
            //return navigation("/login");
        }
    }
    return AuthWrapper;
}

export default withAuth;