import React from 'react'
import { TbLogout2 } from "react-icons/tb";
import useLogout from '../../hooks/useLogout';

const LogoutButton = () => {

    const {logout, loading}= useLogout();

    return <div className='my-auto pt-2'>
        {!loading ? ( 
            <TbLogout2 className='w-6 h-6 text-white cursor-pointer'
                onClick={logout}
            />
            ) : (
                <span className='loading loading-spinner'></span>
            )}
    </div>

}

export default LogoutButton
