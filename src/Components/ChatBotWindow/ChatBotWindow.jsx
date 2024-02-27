import { addWebSocketData, setWebSocketData } from "../../redux/actions";
import ChatBotMessages from "../ChatBotMessages/ChatBotMessages";
import ChatBotHeader from "../ChatBotHeader/ChatBotHeader";
import ChatBotInput from "../ChatBotInput/ChatBotInput";
import style from "./ChatBotWindow.module.css";
import { setToken } from "../../redux/actions";
import { useDispatch } from "react-redux";
import axios from "axios";

import io from "socket.io-client";

const ChatBotWindow = ({setCloseWindow}) => {
    const dispatch = useDispatch();

    const token = localStorage.getItem("token");
    const socket = io(`${import.meta.env.VITE_BACK_URL}`, {
        auth:{
            token
        }
    });

    socket?.on("connect", () => {
        //console.log("webSocket conectado");
    });

    socket?.on("disconnect", (data) => {
        //console.log("socket desconectado");
    });

    socket?.on("set_Chats", (data) => {
        dispatch(setWebSocketData(data));
    });

    socket?.on("chat_message", (data) => {
        if(data === 'Token Invalid'){
            (async function () {
                try{
                  await axios.get(`${import.meta.env.VITE_BACK_URL}/verify`);
                }catch(error){
                  console.log('token fail');
                }
            })();
        }else{
            dispatch(addWebSocketData(data, 'bot'));
        }
    });

    socket?.on("error_Chat", (data) => {
        console.log('Error chatBot: ' + data);
    });

    const setCloseWindowAndSocket = () => {
        setCloseWindow();
        socket.emit('closeWindow', '');
    }

    const sendData = (text) => {
        socket?.emit('chat_message', text);
        dispatch(addWebSocketData(text, 'user'));
    }

    return(
        <div className={style.divWindow}>
            <ChatBotHeader setCloseWindow={setCloseWindowAndSocket}/>
            <ChatBotMessages socket={socket}/>
            <ChatBotInput sendData={sendData}/>
        </div>
    )
};

export default ChatBotWindow;