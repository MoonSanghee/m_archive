import React from "react"
import { useMount } from "react-use";
import { useNavigate } from "react-router-dom";
import { meState } from "../../../recoil";
import {useSetRecoilState,useResetRecoilState} from "recoil";
const Logout = () =>{
    const navigate = useNavigate();
    const resetMe = useResetRecoilState(meState); 
    useMount(()=>{
        localStorage.clear();
        resetMe();
        navigate("/movies");
    })
    return(
        <></>
    )
}
export default Logout;