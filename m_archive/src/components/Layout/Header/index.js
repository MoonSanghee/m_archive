import React from "react";
import ProfileDropdown from "./ProfileDropdown";
import dropdownItems from "./menu";
import {Input} from "../../Common";
import styles from "./header.module.scss";
import { useNavigate } from "react-router-dom";

const Header = () =>{
    const navigate = useNavigate();
    const onClick = (item) =>{
        return ()=>{
             navigate(item.path);
        }           
     }

    return(
        <header className={styles.wrapper}>
            <div className={styles.logo}> 
                <h1>M-archive</h1>
            </div>
            <nav className={styles.navWrapper}>
                <span className={styles.movieButton}>영화</span>
                <span className={styles.searchBox}><Input className={styles.search} placeholder="무엇을 도와드릴까요"/></span>
                <span className={styles.profileIcon}><ProfileDropdown items={dropdownItems} onClick={onClick} /></span>
            </nav>
        </header>
    )
}
export default Header;