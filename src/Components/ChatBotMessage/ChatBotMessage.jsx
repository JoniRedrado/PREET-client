import style from "./ChatBotMessage.module.css";
import { FaRegUser } from "react-icons/fa";
import { IconContext } from "react-icons";
import { BsRobot } from "react-icons/bs";
import { useEffect } from "react";

const ChatBotMessage = ({ message, rol, moveScroll }) => {
    useEffect(() => {
        if(moveScroll.indexMessage === moveScroll.totalMesages) moveScroll.scrollMoveDown();
    }, [message])

    return(<>
        <div className={style.divGeneral}>
            <div className={`${style.divIcon} ${rol === 'user' ? style.divIconUser : style.divIconBot}`}>
                <IconContext.Provider value={{size:"1em"}}>
                    {rol === 'user' ? <FaRegUser /> : <BsRobot />}
                </IconContext.Provider>
            </div>
            <div >
                <span className={style.nameUser}>{rol === 'user' ? 'Yo: ' : 'PreetBot: '}</span>
                <span className={style.message}>{message}</span>
            </div>
        </div>
    </>)
}

export default ChatBotMessage;