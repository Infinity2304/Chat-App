import React from 'react'
import { useAuthContext } from '../../context/AuthContext'
import useConversation from '../../zustand/useConversation';
import { extractTime } from '../../utils/extractTime';

const Message = ({message}) => {

  const {AuthUser} =  useAuthContext(); //using to get the curr user to display messages accordingly
  const {selectedConversation} = useConversation();

  const fromMe = message.senderId === AuthUser._id; 
  const formattedTime = extractTime(message.createdAt);
  const chatClassName = fromMe ? 'chat chat-end' : 'chat chat-start'; 
  const profilePic = fromMe ? AuthUser.profilePic : selectedConversation.profilePic;
  const chatBgColor = fromMe ? 'bg-sky-700' : "";

  return (
    <div className={`chat ${chatClassName}`}>
      <div className='chat-image avatar'>
        <div className='w-10 rounded-full'>
            <img src={profilePic} alt="user avatar" />
        </div>
      </div>

      <div className={`chat-bubble text-white ${chatBgColor}`}>{message.message}</div>
      <div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>
        {formattedTime}
      </div>
    </div>
  )
}

export default Message
