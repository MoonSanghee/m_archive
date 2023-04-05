import React from "react";
import {    MyPageIcon, LikeIcon, ReviewWriteIcon, FAQIcon, LogoutIcon } from "../../../assets/icon";
export default  [

        {
            id:1,
            name:"마이페이지",
            value:"MyPage",
            path:"/movies/mypage/profile",
            icon:<MyPageIcon />
        },
        {
            id:2,
            name:"좋아요",
            value:"Like",
            path:"/movies/mypage/like",
            icon:<LikeIcon />
        },
        {
            id:3,
            name:"리뷰",
            value:"Review",
            path:"/movies/mypage/review",
            icon:<ReviewWriteIcon/>
        },
        {
            id:4,
            name:"FAQ",
            value:"FAQ",
            path:"/movies/mypage/faq",
            icon:<FAQIcon/>

        },
        {
            id:5,
            name:"로그아웃",
            value:"Logout",
            path:"/logout",
            icon:<LogoutIcon/>
        },
    
    ]



