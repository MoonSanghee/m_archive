import React from "react"
import { useMount } from "react-use";
import { useNavigate } from "react-router-dom";
const Logout = () =>{
    const navigate = useNavigate();
    useMount(()=>{
        localStorage.clear();
        navigate("/movies");
    })
    return(
        <></>
    )
}
export default Logout;