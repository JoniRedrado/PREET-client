import { addWebSocketData, setWebSocketData } from "../../redux/actions";
import ChatBotMessages from "../ChatBotMessages/ChatBotMessages";
import ChatBotHeader from "../ChatBotHeader/ChatBotHeader";
import ChatBotInput from "../ChatBotInput/ChatBotInput";
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
        //console.log("webSocket conectado");
    });

    socket?.on("disconnect", (data) => {
        //console.log("socket desconectado");
    });

    socket?.on("set_Chats", (data) => {
        //console.log(data);
        dispatch(setWebSocketData(data));
    });

    socket?.on("chat_message", (data) => {
        //console.log(data);
        dispatch(addWebSocketData(data, 'bot'));
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