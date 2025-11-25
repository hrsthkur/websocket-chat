import {io} from 'socket.io-client'
export function connectWS(){
return io('https://websocket-chat-rury.onrender.com/')
}
