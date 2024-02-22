import style from "./ChatBotInput.module.css";
import { IconContext } from "react-icons";
import { IoSend } from "react-icons/io5";
import { useState } from "react";

const ChatBotInput = ({ sendData }) => {
    const [inputText, setInputText] = useState("");

    const sendMessage = () => {
        sendData(inputText);
        setInputText("");
    }

    return(<>
        <div className={style.divGeneral}>
            <input value={inputText}
                   className={style.inputStyle} 
                   placeholder="Escribe Tu Mensaje"
                   onChange={(e) => setInputText(e.target.value)}/>

            <div className={style.divSendStyle} onClick={sendMessage}>
                <IconContext.Provider value={{size: "1.8em"}}> 
                    <IoSend />
                </IconContext.Provider>
            </div>
        </div>    
    </>)
}

export default ChatBotInput;