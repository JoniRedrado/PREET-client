import ChatBotMessageHome from "../ChatBotMessageHome/ChatBotMessageHome";
import ChatBotMessage from "../ChatBotMessage/ChatBotMessage";
import style from "./ChatBotMessages.module.css";
import { useSelector} from "react-redux";
import { useRef } from "react";

const ChatBotMessages = ({ socket }) => {
    const { chatItem, newChat, chat, record } = useSelector((state) => state.webSocket);

    const chats = chatItem === 1 ? newChat : 
                  chatItem === 2 ? chat :
                  chatItem === 3 ? record : null;

    const divRef = useRef();

    const scrollMoveDown = () => {
        if(divRef.current) divRef.current.scrollTo({ top: divRef.current.scrollHeight, behavior: 'smooth' });
    }

    return(<>
        <div className={style.divMessage} ref={divRef}>
            {chats ? 
                chats.length > 0 ? chats.map((data, index) => {
                    return(
                        <ChatBotMessage 
                            moveScroll={{
                                scrollMoveDown,
                                indexMessage: index,
                                totalMesages: chats.length - 1
                            }}
                            message={data.message} 
                            key={`chat_${index}`} 
                            rol={data.rol}/>
                    )
                }) : 
                <ChatBotMessageHome socket={socket}/> : 
            <div className={style.loadingDots}>Wait . . .</div>}
        </div>
    </>)
}

export default ChatBotMessages;