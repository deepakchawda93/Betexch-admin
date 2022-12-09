import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { NavLink } from "react-router-dom";


export default function Footer() {
    const navigate = useNavigate();
    const logout = () => {
        //alert("my fun call == ");
        localStorage.clear();
        toast.success("Logout Successfully");
        setTimeout(() => {
            navigate('/');
        }, 1000);
    }


    return (
        <>
            <ToastContainer />

            <table className="footer">
                <tbody><tr>

                    <td className="FontTextWhite">
                        <div className="profile_picture_name" align="center">
                            <center><h3 style={{color:"black"}}> Copy Right  @ 99EXCH </h3></center>
                        </div>
                        <div className="profile_picture">
                        </div>
                    </td>

                </tr>
                    <tr>
                        <td colspan="2">
                        </td>
                    </tr>
                </tbody></table>

            
        </>
    );
}