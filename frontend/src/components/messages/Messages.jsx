import React, { useEffect } from 'react'
import { useRef } from 'react'
import Message from './Message'
import useGetMessages from '../../hooks/useGetMessages';
import MessageSkeleton from '../skeletons/messageSkeleton';
import useListenMessages from '../../hooks/useListenMessages';


const Messages = () => {

  const { messages, loading } = useGetMessages();
  useListenMessages();
  const lastMessageRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100)
  }, [messages]);

  return (
    <div className='px-4 flex-1 overflow-auto'>
      {/* Display this when there are messages */}
      {!loading && messages.length > 0 && messages.map((message) => (
        <div key={message._id} ref={lastMessageRef}>
          <Message message={message} />
        </div>
      ))}


      {/* Display this while loading messages */}
      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}


      {/* Display this when there are no messages */}
      {!loading && messages.length === 0 && (
        <p className='text-center text-gray-400'>No messages yet</p>
      )}
    </div>
  )
}

export default Messages
