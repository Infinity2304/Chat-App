import React from 'react'
import toast from 'react-hot-toast';
import { IoSearchSharp } from "react-icons/io5";
import { useState } from 'react';
import useConversation from '../../zustand/useConversation';
import useGetConversations from '../../hooks/useGetConversations';

const SearchInput = () => {

    const [search, setSearch] = useState('');
    const { setSelectedConversation } = useConversation();
    const { conversations } = useGetConversations();

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!search) return;
        if(search.length<3){
            return toast.error('Search term must be atleast 3 characters long');
        }

        const conversation = conversations.find((conversation) => conversation.fullName.toLowerCase().includes(search.toLowerCase()));

        if(conversation){
            setSelectedConversation(conversation);
            setSearch('');
        }else{
            toast.error('No user found with that name');
        }
    }   


    return (
        <form onSubmit={handleSubmit} className='flex items-center gap-2'>
            <input type="text" placeholder='Search' className='input input-bordered rounded-full'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <button type='submit' className='btn btn-circle bg-sky-800 text-white'>
                <IoSearchSharp className='w-6 h-6 outline-none'/>
            </button>
        </form>
    )
}

export default SearchInput
