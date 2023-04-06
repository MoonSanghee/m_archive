import React from "react"
import {icons} from "./icons.js";
import styles from "./iconModal.module.scss";

const IconModal = ()=>{
    //const iconItems = [...icons];
    
    return (
        <section className={styles.wrapper}>
            {/*
                icons.map(({name,icon,id})=>{
                        return(
                        <span key={id}>{icon()}</span>
                        )
                })
            */}
            {icons[0].icon()
            }
             {icons[1].icon()
            }
             {icons[2].icon()
            }
             {icons[3].icon()
            }
             {icons[4].icon()
            }

             {icons[12].icon()
            }
           
        </section>
    )
}
export default IconModal;