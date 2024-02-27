import style from "./ChatBotMessageHome.module.css";
import { IconContext } from "react-icons";
import { BsRobot } from "react-icons/bs";

const ChatBotMessageHome = ({ socket }) => {

    return(<>
        <div className={style.divGeneral}>
            <div className={style.divIcon}>
                <IconContext.Provider value={{size:"5em"}}>
                    <BsRobot/>
                </IconContext.Provider>
            </div>
            <div>
                <h2>¡Hola!</h2>
                <span className={style.textP}>Soy <strong>PreetBot</strong>, para comenzar nuestra conversación por favor escoge una de las opciones que te presento: </span>
            </div>
            <div className={style.bottomDiv}>
                <div className={style.bottomStyle}
                     onClick={() => {
                        socket?.emit('chat_message', 'Inicia actividad chatBot')
                     }}>
                        Consulta general
                </div>
                <div className={style.bottomStyle}>Consulta sobre una reserva</div>
            </div>
        </div>
    </>)
}

export default ChatBotMessageHome;