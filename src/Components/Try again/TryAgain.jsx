/* eslint-disable react/no-unknown-property */
import "./TryAgain.styles.css"
import notFound from "../../assets/notFound.png"
const tryAgain = () => {
    return(
        <div className="conLoa">
            <img src={notFound} alt="Hotel-Not-Found" />
            <h1 className="not">Hotel not found. Try another search.</h1>
        </div>
    )
}


export default tryAgain;