/* eslint-disable react/no-unknown-property */
import "./TryAgain.styles.css"

const tryAgain = () => {
    return(
        <div className="conLoa">
            <i class="bi bi-chat-square-text icon-mesagge"></i>
            <h1 className="not">The hotel search you conducted did not yield any results. Please try again.</h1>
        </div>
    )
}


export default tryAgain;