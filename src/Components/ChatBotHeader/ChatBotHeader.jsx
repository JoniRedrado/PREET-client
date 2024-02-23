import { IoIosArrowDown } from "react-icons/io";
import style from "./ChatBotHeader.module.css";
import { IconContext } from "react-icons";
import { useSelector } from "react-redux";


const ChatBotHeader = ({setCloseWindow, view}) => {
    const { chatItem, chat } = useSelector((state) => state.webSocket);

    const styleLiItems = ` ${chat?.length > 0 ? style.liItemAcivate : style.liItemInAcivate}`;
    const itemSelect = view ? view : chatItem ? chatItem : chat?.length > 0 ? 2 : 1;

    return(<>
        <div className={style.divHeader}>
            <IconContext.Provider value={{size: "1.4em"}} >
                <div className={style.divIconClose} onClick={() => setCloseWindow()}><IoIosArrowDown /></div>
            </IconContext.Provider>

            <div className={style.divNav}>
                <nav className={style.navBar}>
                    <ul className={style.navbarNav}>
                        <li className={`${style.liItem} ${itemSelect === 1 ? style.itemSelected : style.liItemAcivate}`}>NUEVO</li>
                        <li className={`${style.liItem} ${itemSelect === 2 ? style.itemSelected : styleLiItems}`}>CHAT</li>
                        <li className={`${style.liItem} ${itemSelect === 3 ? style.itemSelected : styleLiItems}`}>HISTORIAL</li> 
                    </ul>
                </nav>
            </div>
        </div>
    </>)
}

export default ChatBotHeader;