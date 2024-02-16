import "./NavBarDashboard.modules.css"
import template from "../../../assets/Logo-White.svg";


const NavBarDashboard = () => {


    return(
        <nav class="navbar bg-body-tertiary">
            <div class="container">
            <a class="navbar-brand" href="#">
                <img src={template} alt="PREET" width="18%" />
            </a>
            </div>
        </nav>
    )
}

export default NavBarDashboard;