import { setWebSocketItem } from "../../redux/actions";
import { useSelector, useDispatch } from "react-redux";
import { IoIosArrowDown } from "react-icons/io";
import style from "./ChatBotHeader.module.css";
import { IconContext } from "react-icons";

const ChatBotHeader = ({setCloseWindow, view}) => {
    const dispatch = useDispatch();
    const { chatItem, chat, record } = useSelector((state) => state.webSocket);

    const styleLiItems_2 = ` ${chat?.length > 0 ? style.liItemAcivate : style.liItemInAcivate}`;
    const styleLiItems_3 = ` ${record?.length > 0 ? style.liItemAcivate : style.liItemInAcivate}`;
    const itemSelect = view ? view : chatItem ? chatItem : chat?.length > 0 ? 2 : 1;

    return(<>
        <div className={style.divHeader}>
            <IconContext.Provider value={{size: "1.4em"}} >
                <div className={style.divIconClose} onClick={() => setCloseWindow()}><IoIosArrowDown /></div>
            </IconContext.Provider>

            <div className={style.divNav}>
                <nav className={style.navBar}>
                    <ul className={style.navbarNav}>
                        <li className={`${style.liItem} ${itemSelect === 1 ? style.itemSelected : style.liItemAcivate}`}
                            onClick={() => dispatch(setWebSocketItem(1))}>NUEVO</li>
                        <li className={`${style.liItem} ${itemSelect === 2 ? style.itemSelected : styleLiItems_2}`}
                            onClick={() => dispatch(setWebSocketItem(2))}>CHAT</li>
                        <li className={`${style.liItem} ${itemSelect === 3 ? style.itemSelected : styleLiItems_3}`}>HISTORIAL</li> 
                    </ul>
                </nav>
            </div>
        </div>
    </>)
}

export default ChatBotHeader;