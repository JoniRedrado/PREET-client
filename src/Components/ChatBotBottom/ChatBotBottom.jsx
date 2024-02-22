import ChatBotWindow from "../ChatBotWindow/ChatBotWindow";
import style from "./ChatBotBottom.module.css";
import { IconContext } from "react-icons";
import { BsRobot } from "react-icons/bs";
import { useState } from "react";

const ChatBotBottom = () => {
    const [stateBottomChat, setStateBottomChat] = useState(false);
    const [chatIcon, setChatIcon] = useState(false);

    const closeWindowChat = () =>{
        setChatIcon(false);
        setStateBottomChat(false);
    }

    const token = localStorage.getItem("token");

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