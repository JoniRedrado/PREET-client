import style from "./ChatBotInput.module.css";
import { IconContext } from "react-icons";
import { useSelector } from "react-redux";
import { IoSend } from "react-icons/io5";
import { useState } from "react";


const ChatBotInput = ({ sendData }) => {
    const [inputText, setInputText] = useState("");

    const { chatItem, chat } = useSelector((state) => state.webSocket);

    const sendMessage = () => {
        sendData(inputText);
        setInputText("");
    }

    const activate = chatItem && chat?.length > 0;

    return(<>
        <div className={style.divGeneral}>
            <input value={inputText}
                   disabled={!activate}
                   className={style.inputStyle} 
                   placeholder="Escribe Tu Mensaje"
                   onChange={(e) => setInputText(e.target.value)}/>

            <div className={`${style.divSendStyle} ${activate ? style.SendActivate : style.SendInActivate}`} 
                 onClick={() => activate && sendMessage()}>
                <IconContext.Provider value={{size: "1.8em"}}> 
                    <IoSend />
                </IconContext.Provider>
            </div>
        </div>    
    </>)
}

export default ChatBotInput;