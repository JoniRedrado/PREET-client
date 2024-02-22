import { IoIosArrowDown } from "react-icons/io";
import style from "./ChatBotHeader.module.css";
import { IconContext } from "react-icons";

const ChatBotHeader = ({setCloseWindow}) => {


    return(<>
        <div className={style.divHeader}>
            <IconContext.Provider value={{size: "1.4em"}} >
                <div className={style.divIconClose} onClick={() => setCloseWindow()}><IoIosArrowDown /></div>
            </IconContext.Provider>

            <span>CHAT</span>

            <div></div>
        </div>
    </>)
}

export default ChatBotHeader;