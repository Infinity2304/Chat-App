import React from 'react'
import toast from 'react-hot-toast';
import { useState } from 'react';
import { useAuthContext } from '../context/AuthContext';

const useLogout = () => {
    const [loading, setloading] = useState(false) //Setting the loading state for submitting the user data
    const { setAuthUser } = useAuthContext();

    const logout = async () => {

        setloading(true); //Setting the loading state to true

        //Sending the data to server(backend)
        try {
            const res = await fetch("/api/auth/logout", {
                method: "POST",
                headers: { "Content-Type": "application/json" }
            });

            //Getting the error from server side
            const data = await res.json();
            if (data.error) {
                throw new Error(data.error);
            }

            localStorage.removeItem("chat-user"); //Removing the user from local storage
            setAuthUser(null); //Setting the user to null (since user is logged out)

        } catch (error) {
            toast.error(error.message); //Getting the error message of server side
        } finally {
            setloading(false);
        }
    }
    return { logout, loading };
}

export default useLogout
