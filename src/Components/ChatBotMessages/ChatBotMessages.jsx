import ChatBotMessage from "../ChatBotMessage/ChatBotMessage";
import style from "./ChatBotMessages.module.css";
import { useSelector} from "react-redux";
import { useRef } from "react";

const ChatBotMessages = () => {
    const messages = useSelector((state) => state.webSocket.chat);
    const divRef = useRef();

    const scrollMoveDown = () => {
        if(divRef.current) divRef.current.scrollTo({ top: divRef.current.scrollHeight, behavior: 'smooth' });
    }

    return(<>
        <div className={style.divMessage} ref={divRef}>
            {messages?.length > 0 && messages.map((data, index) => {
                return(
                    <ChatBotMessage 
                        moveScroll={{
                            scrollMoveDown,
                            indexMessage: index,
                            totalMesages: messages.length - 1
                        }}
                        message={data.message} 
                        key={`chat_${index}`} 
                        rol={data.rol}/>
                )
            })}
        </div>
    </>)
}

export default ChatBotMessages;