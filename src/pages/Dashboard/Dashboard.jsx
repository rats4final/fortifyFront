import {useEffect, useState} from 'react'
import api from '../../utils/api';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate()
    const checkUser = async () => {
        try {
            const response = await api().get("/api/user");
            setIsLoggedIn(true);
        } catch (error) {
            alert(error);
            setIsLoggedIn(false);
        }
    }
    const logOut = async () => {
        try {
            const response = await api().post("/api/logout")
            navigate("/login");
        } catch (error) {
            console.log("error while logging out");
            console.log(error);
        }
    }
    useEffect(() => {
        checkUser();
    },[]);

    return isLoggedIn ?  <button onClick={logOut}>Log out</button> : <h1>Tienes que loguearte</h1>;
}
