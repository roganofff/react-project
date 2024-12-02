import { Button } from "@consta/uikit/Button"; 
import { NavLink, useLocation } from "react-router-dom";
import style from "./Menu.module.css";

const Menu = () => {
    const { pathname } = useLocation();
    
    return (
        <div className={style.Menu}>
            <NavLink to="/" className={({ isActive }) => isActive ? style.active : ""}>
                <Button 
                    view={pathname === "/" ? "primary" : "secondary"} 
                    label="Главная страница" 
                />
            </NavLink>
            <NavLink to="/service" className={({ isActive }) => isActive ? style.active : ""}>
                <Button 
                    view={pathname === "/service" ? "primary" : "secondary"} 
                    label="Страница услуг" 
                />
            </NavLink>
        </div>
    );
};

export default Menu;
