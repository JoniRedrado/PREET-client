import ChatBotWindow from "../ChatBotWindow/ChatBotWindow";
import style from "./ChatBotBottom.module.css";
import { IconContext } from "react-icons";
import { useSelector } from "react-redux";
import { BsRobot } from "react-icons/bs";
import { useState } from "react";

const ChatBotBottom = () => {
    const [stateBottomChat, setStateBottomChat] = useState(false);
    const [chatIcon, setChatIcon] = useState(false);

    const token = useSelector((state) => state.token);

    const closeWindowChat = () =>{
        setChatIcon(false);
        setStateBottomChat(false);
    }

    return(<>
        { token && <>
            { stateBottomChat ?
            <ChatBotWindow setCloseWindow={closeWindowChat} /> :
            <div className={style.chatDiv} 
                onMouseEnter={() => setChatIcon(true)}
                onMouseLeave={() => setChatIcon(false)}
                onClick={() => setStateBottomChat(true)}>

                <IconContext.Provider value={{color:"white", size:"2em"}}>
                    <div className={style.chatIconDiv}>
                        <BsRobot/>
                    </div>
                    {chatIcon && <span className={style.colorChatWord}>CHAT</span>}
                </IconContext.Provider> 
            </div> }
        </> }
    </>)
};

export default ChatBotBottom;