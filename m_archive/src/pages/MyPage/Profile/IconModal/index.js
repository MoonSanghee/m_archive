import React from "react"
import {icons} from "./icons.js";
import styles from "./iconModal.module.scss";

const IconModal = ({onClose,getProfileImage,...props})=>{
    
    const setProfileImage = (name) => {
        getProfileImage(name);
        onClose();
    }
    return (
        <section className={styles.wrapper}>
            {
                icons.map(({name,icon,id})=>{
                        return(
                        <span onClick={()=>{setProfileImage(name),onClose();}} key={id}>{icon()}</span>
                        )
                })
            }           
        </section>
    )
}
export default IconModal;