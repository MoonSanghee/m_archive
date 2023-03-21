import React from "react";
import cx from "classnames";
import { ProfileIcon,MyPageIcon, LikeIcon, ReviewWriteIcon, FAQIcon, LogoutIcon } from "../../../assets/icon";
import styles from "./profileDropdown.module.scss";
import { useState } from "react";
import {useNavigate} from "react-router-dom";
import { useRef } from "react";
import { useEffect } from "react";

//MEMO:
/*
ProfileDropdown: Nav바에 속해 있는 프로필아이콘을 누르면 생기는 드랍다운입니다(프로필아이콘을 포함한). 
li를 클릭하면 페이지를 이동하게 하는 드랍다운인데, 
질문 : 다른 드랍다운처럼 props로 받아와야 할 것이 있을까요? 

*/
const ProfileDropdown = () =>{
    const ref = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const onClickIcon = () =>{
        setIsOpen(!isOpen);
    }
    const onClick = (item) =>{
           return ()=>{
                navigate(item.path);
           }           
        }

    const dropdownItems = [
        {
            id:1,
            name:"마이페이지",
            value:"MyPage",
            path:"/myPage/Profile",
            icon:<MyPageIcon />
        },
        {
            id:2,
            name:"좋아요",
            value:"Like",
            path:"/myPage/Like",
            icon:<LikeIcon />
        },
        {
            id:3,
            name:"리뷰",
            value:"Review",
            path:"/myPage/Review",
            icon:<ReviewWriteIcon/>
        },
        {
            id:4,
            name:"FAQ",
            value:"FAQ",
            path:"/myPage/FAQ",
            icon:<FAQIcon/>

        },
        {
            id:5,
            name:"로그아웃",
            value:"Logout",
            path:"/auth/Logout",
            icon:<LogoutIcon/>
        },
    
        ]
    useEffect(()=>{
            if(!isOpen){
                return;
            }
            const handleClick = (e) =>{
                if(ref.current && !ref.current.contains(e.target)){
                    setIsOpen(false);
                }
            };
    
            document.addEventListener("click",handleClick);
            return ()=>{
                document.removeEventListener("click",handleClick);
            };
        },[isOpen]);
        //const Dropdown = ({className,itmes,valueKey})
    return(
        
        <div className={styles.dropdownWrapper}>
            <div ref={ref} className={styles.dropdownInfo} onClick={onClickIcon}>
                <ProfileIcon
                    className={cx(styles.icon,{[styles.isOpen]:isOpen})}
                 />
            </div>
            <menu className={cx(styles.itemWrapper,{ [styles.isOpen]: isOpen })}>
                {dropdownItems.map((item) => {
                    return (
                        <li className={styles.item} onClick={onClick(item)}>
                        {item.icon}{item.name}
                        </li>
                );
                })}
            </menu>
            
        </div>
        
    )
}
export default ProfileDropdown;