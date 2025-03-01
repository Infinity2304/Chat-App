import React from 'react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useAuthContext } from '../context/AuthContext'

const useSignup = () => {
    const [loading, setloading] = useState(false) //Setting the loading state for submitting the user data
    const {setAuthUser} = useAuthContext();

    const signup = async ({ fullName, userName, password, confirmPassword, gender }) => {
        const success = handleInputErrors({ fullName, userName, password, confirmPassword, gender });

        if (!success) return; //Client side validation

        setloading(true);
        try {
            //Sending the data to server(backend)
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ fullName, userName, password, confirmPassword, gender })
            });

            //Getting the error from server side
            const data = await res.json();
            if (data.error) {
                throw new Error(data.error);
            }
            
            //Save user to local storage
            localStorage.setItem("chat-user", JSON.stringify(data));

            //Saving as context
            setAuthUser(data);

        } catch (error) {
            //handling errors
            toast.error(error.message);
        } finally {
            setloading(false);
        }
    }
    return { signup, loading };
}

export default useSignup


// Client side validation
function handleInputErrors({ fullName, userName, password, confirmPassword, gender }) {
    if (!fullName || !userName || !password || !confirmPassword || !gender) {
        toast.error("Please fill all the fields");
        return false;
    }
    if (password != confirmPassword) {
        toast.error("Passwords do not match");
        return false;
    }
    if (fullName.length < 5) {
        toast.error("full Name must be atleast 5 characters long");
        return false;
    }
    if (fullName.length > 18) {
        toast.error("full Name must be less than 18 characters long");
        return false;
    }
    if (userName.length < 6) {
        toast.error("Username must be atleast 6 characters long");
        return false;
    }
    if (userName.length > 18) {
        toast.error("Username must be less than 18 characters long");
        return false;
    }
    if (password.length < 5) {
        toast.error("Password must be atleast 5 characters long");
        return false;
    }
    return true;
}
