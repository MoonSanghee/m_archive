import React from "react"
import { useMe } from "../../../../hooks"
import {AngelIcon, AssasinIcon,CircusIcon,DevilIcon,GhostIcon,KnightIcon,
ManIcon,PrincessIcon,QueenIcon,SantaIcon,AlienIcon,FairyIcon,DefaultIcon
} from "../../../../assets/profileIcon";
import cx from "classnames";
const icon = (item) =>{
    let myIcon;
    myIcon = item==="AngelIcon" && <AngelIcon/>
    myIcon = item==="AssasinIcon" && <AssasinIcon/>
    myIcon = item==="CircusIcon" && <CircusIcon/>
    myIcon = item==="DevilIcon" && <DevilIcon/>
    myIcon = item==="GhostIcon" && <GhostIcon/>
    myIcon = item==="KnightIcon" && <KnightIcon/>
    myIcon = item==="ManIcon" && <ManIcon/>
    myIcon = item==="PrincessIcon" && <PrincessIcon/>
    myIcon = item==="QueenIcon" && <QueenIcon/>
    myIcon = item==="SantaIcon" && <SantaIcon/>
    myIcon = item==="AlienIcon" && <AlienIcon/>
    myIcon = item==="FairyIcon" && <FairyIcon/>
    return myIcon;
}

const ProfileIcon = ({className,onClick}) =>{
    const me = useMe();
    return(
        <div className={cx(className)} onClick={onClick} >
            {me?.profileImage ? icon(me?.profileImage) : <DefaultIcon/>}
        </div>
    );
}
export default ProfileIcon;