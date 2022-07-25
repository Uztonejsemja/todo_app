import images from "../assets/images";
import './Header.css';

const Header = () => {
    return(
        <header>
            <h1>TODO LIST</h1>

            <img src={ images.note } alt="noteImg"/>
        </header>
    )
};

export default Header;