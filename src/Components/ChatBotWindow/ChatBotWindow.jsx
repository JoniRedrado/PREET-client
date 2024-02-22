import ChatBotMessages from "../ChatBotMessages/ChatBotMessages";
import ChatBotHeader from "../ChatBotHeader/ChatBotHeader";
import ChatBotInput from "../ChatBotInput/ChatBotInput";
import { addWebSocketData } from "../../redux/actions";
import style from "./ChatBotWindow.module.css";
import { useDispatch } from "react-redux";
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
        console.log("webSocket conectado");
        dispatch(addWebSocketData('¡Hola! ¿En que te puedo ayudar?', 'bot'));
    });

    socket?.on("message", (data) => {
    
    });

    socket?.on("disconnect", (data) => {
        console.log("socket desconectado");
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
            <ChatBotMessages />
            <ChatBotInput sendData={sendData}/>
        </div>
    )
};

export default ChatBotWindow;