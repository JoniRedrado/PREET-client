import { useLocation } from "react-router-dom"
import NavBar from "../NavBar/NavBar"
import SearchBar from "../SearchBar/SearchBar"
import styles from "./Header.module.css"

const Header = () => {
    const { pathname } = useLocation();
    const renderHeaderContent = () => {
        if (pathname === "/"){
            return (
                <header className={styles.header1}>
                <div className={styles.headerContainer}>
                    <div className={styles.navbarContainer}>
                        <NavBar/>
                    </div>
                    <div className={styles.textContainer}>
                        <h1>Book a hotel, get wonderful memories</h1>
                    </div>
                    <div className={styles.searchbarContainer}>
                        <SearchBar/>
                    </div>
        
                </div>
            </header>
            )
        } else {
            return (
                <header className={styles.header2}>
                    <div className={styles.headerContainer2}>
                        <NavBar/>
                    </div>
                </header>
            )
        }
    } 
  return (
    renderHeaderContent()
  )
}

export default Header;