import { createContext } from 'react';
import { useState, useEffect ,useContext } from 'react';
import { useAuthContext } from './AuthContext';
import io from 'socket.io-client';
import { set } from 'mongoose';

const SocketContext = createContext();

export const useSocketContext = () => {
    return useContext(SocketContext);
}

export const SocketContextProvider = ({children}) => {

    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const {AuthUser} = useAuthContext();

    useEffect(() => {
        if(AuthUser){
            const socket = io('http://localhost:1000',{
                query: {
                    userId: AuthUser._id,
                } 
            });

            setSocket(socket);

            // socket.on() is used to listen to the events. can be used both on the server and client side
            socket.on('getOnlineUsers',(users) => {
                setOnlineUsers(users);
            });

            return ()=> socket.close(); 
        }else{
            if(socket){
                socket.close();
                setSocket(null);
            }
        }
    },[AuthUser]);

    return (
        <SocketContext.Provider value={{socket,onlineUsers}}>
            {children}
        </SocketContext.Provider>
    )   
};