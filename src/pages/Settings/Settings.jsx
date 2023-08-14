import React, { useState, useEffect, useRef } from 'react'
import api from '../../utils/api'
import PasswordConfirmModal from '../../components/auth/PasswordConfirmModal';

export default function Settings() {
    const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [user, setUser] = useState(false);


    const openDialog = () => {
        setIsDialogOpen(true);
    }

    const closeDialog = () => {
        setIsDialogOpen(false);
    }

    const getUser = async () => {
        const response = await api().get("/api/user");
        const data = await response.data;
        console.log(data.has2FA);
    }

    // //const toggle2FA?
    // useEffect(() => {
    //     getUser();
    //     const currentDialog = dialog.current;
    //     currentDialog.addEventListener('click', (e) => { 
    //         console.log("clicked!", e);
    //     })

    //     // return () => {
    //     //     currentDialog.removeEventListener('click');
    //     // }
    // },[])


    return (
        <>
            <h1>User Settings</h1>
            <div>
                <p>Two Factor Authentication is {twoFactorEnabled? "enabled": "disabled"}</p>
                <button onClick={openDialog}>Enable</button>
            </div>
            <PasswordConfirmModal isOpened={isDialogOpen} onClose={closeDialog}/>
        </>
    )
}
