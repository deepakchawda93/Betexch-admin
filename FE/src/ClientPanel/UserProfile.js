import React from 'react';
import { Link } from 'react-router-dom';
import Footer from './Components/Footer';
import PageHeader from './Components/PageHeader';
import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';


export default function UserProfile() {

    let token = localStorage.getItem("token");
    let header = ({ 'x-access-token': `${token}` });
    let options = ({ headers: header });

    const [data, setData] = useState([]);

    const profiledetail = async () => {
        axios.get(`/game/profile`, options)
            .then(res => {
                const data = res.data.data;
                setData(data);
                console.log(data);
            })
    }

    useEffect(() => {
        profiledetail();
    }, []);



    return (
        <>
            <ToastContainer />
            <PageHeader />
            <div className="menu mb-3" id="menu" align="center">
                <ul className="nav">
                    <li className="active w-100"><Link to="/MainMenu">BACK TO MAIN MENU</Link></li>
                </ul>
            </div>
            <table width="100%" style={{    background: "#e9e9e9", borderCollapse: "separate"}} border="0" cellspacing="0" cellpadding="0">
                <tbody><tr>
                    <td valign="top"><table width="100%" style={{    background: "#e9e9e9", borderCollapse: "separate"}} border="0" cellpadding="0" cellspacing="0">
                        <tbody><tr>
                            <td align="left" valign="top">
                                <table width="100%" style={{    background: "#e9e9e9", borderCollapse: "separate"}} border="0" cellspacing="0" cellpadding="0">
                                    <tbody><tr>
                                        <td height="35" align="center" bgcolor="#888399" className="TeamCombo">
                                            <p className='style13'>RATE INFORMATION </p>
                                        </td>
                                    </tr>
                                    </tbody></table>
                            </td>
                        </tr>
                            <tr>
                                <td align="left" valign="top">
                                    <div id="msgCon" align="center" bgcolor="#f1f1f1"></div><table width="100%" style={{    background: "#e9e9e9", borderCollapse: "separate"}} border="0" cellpadding="2" cellspacing="2">
                                        <tbody><tr>
                                            <td height="35" width="33%" align="left" bgcolor="#FFFFFF" className="FontTextBlue style12">Rate Difference :</td>
                                            <td align="center" width="33%" bgcolor="#FFFFFF" className="FontTextBlue style14">

                                                <select name="Rate1" id="Rate1">

                                                    <option value="0.08" selected="selected">8</option>
                                                    <option value="0.00">0</option> <option value="0.01">1</option> <option value="0.02">2</option>
                                                    <option value="0.03">3</option> <option value="0.04">4</option> <option value="0.05">5</option>
                                                    <option value="0.06">6</option> <option value="0.07">7</option>
                                                    <option value="0.08">8</option> <option value="0.09">9</option> <option value="0.10">10</option>
                                                </select>
                                            </td>
                                            <td align="center" width="33%" bgcolor="#FFFFFF" className="FontTextBlue style1"><div className="menu" id="menu" align="center">
                                                <ul className="nav">
                                                    <li className="activeRate"><a className="btnClk">UPDATE</a></li>
                                                </ul>
                                            </div></td>

                                        </tr>
                                        </tbody></table>
                                </td>
                            </tr>
                            <tr>
                                <td align="center" valign="bottom" bgcolor="#FFFFFF"></td>
                            </tr>
                            <tr>
                                <td align="left" valign="top">&nbsp;</td>
                            </tr>
                            <tr>
                                <td valign="top">
                                </td>
                            </tr>
                        </tbody></table></td>
                </tr>
                    <tr>
                        <td valign="top"><table width="100%" style={{    background: "#e9e9e9", borderCollapse: "separate"}} border="0" cellpadding="0" cellspacing="0">
                            <tbody><tr>
                                <td align="left" valign="top">
                                    <table width="100%" style={{    background: "#e9e9e9", borderCollapse: "separate"}} border="0" cellspacing="0" cellpadding="0">
                                        <tbody><tr>
                                            <td height="35" align="center" bgcolor="#888399" className="TeamCombo">
                                                <p className='style15'>PERSONAL INFORMATION </p>
                                            </td>
                                        </tr>
                                        </tbody></table>
                                </td>
                            </tr>
                                <tr>
                                    <td align="left" valign="top">
                                        <table width="100%" style={{    background: "#e9e9e9", borderCollapse: "separate"}} border="0" cellpadding="2" cellspacing="2">
                                            <tbody><tr>
                                                <td height="35" width="50%" align="left" bgcolor="#FFFFFF" className="FontTextBlue style12">Client Code :</td>
                                                <td align="center" width="50%" bgcolor="#FFFFFF" className="FontTextBlue style12">{data.uid}</td>
                                            </tr>
                                                <tr>
                                                    <td height="35" align="left" bgcolor="#FFFFFF" className="FontTextBlue style12">Client Name :</td>
                                                    <td align="center" bgcolor="#FFFFFF" className="FontTextBlue style12">{data.first_name} {data.last_name}</td>
                                                </tr>
                                                {/* <tr><td height="35" align="left" bgcolor="#FFFFFF" className="FontTextBlue style12">Contact No :</td>
                                                    <td align="center" bgcolor="#FFFFFF" className="FontTextBlue style12"></td>
                                                </tr> */}
                                                <tr>
                                                    <td height="35" align="left" bgcolor="#FFFFFF" className="FontTextBlue style12">Date Of Joining :</td>
                                                    <td align="center" bgcolor="#FFFFFF" className="FontTextBlue style12">{data.createdAt}</td>
                                                </tr>
                                                <tr>
                                                    <td height="38" align="left" bgcolor="#FFFFFF" className="FontTextBlue style12">Address :</td>
                                                    <td align="center" bgcolor="#FFFFFF" className="FontTextBlue style12">INDIA</td>
                                                </tr>
                                            </tbody></table>
                                    </td>
                                </tr>
                                <tr>
                                    <td align="center" valign="bottom" bgcolor="#FFFFFF"></td>
                                </tr>
                                <tr>
                                    <td align="left" valign="top">&nbsp;</td>
                                </tr>
                                <tr>
                                    <td valign="top">
                                    </td>
                                </tr>
                            </tbody></table></td>
                    </tr>
                    <tr>
                        <td valign="top">
                            <table width="100%" style={{    background: "#e9e9e9", borderCollapse: "separate"}} border="0" cellpadding="0" cellspacing="0">
                            <tbody><tr>
                                <td align="left" valign="top">
                                    <table width="100%" style={{    background: "#e9e9e9", borderCollapse: "separate"}} border="0" cellspacing="0" cellpadding="0">
                                        <tbody><tr>
                                            <td height="35" align="center" bgcolor="#888399" className="TeamCombo">
                                                <p className="style16">COMPANY INFORMATION </p>
                                            </td>
                                        </tr>
                                        </tbody></table>
                                </td>
                            </tr>
                                <tr>
                                    <td align="left" valign="top">
                                        <table width="100%" style={{    background: "#e9e9e9", borderCollapse: "separate"}} border="0" cellpadding="2" cellspacing="2">
                                            <tbody><tr>
                                                <td height="35" width="50%" align="left" bgcolor="#FFFFFF" className="FontTextBlue style12">HELP LINE NO :</td>
                                                <td align="center" width="50%" bgcolor="#FFFFFF" className="FontTextBlue style12">+91-1234567890</td>
                                            </tr>
                                            </tbody></table>
                                    </td>
                                </tr>
                              
                                <tr>
                                    <td align="left" valign="top">&nbsp;</td>
                                </tr>
                               
                            </tbody></table></td>
                    </tr>
                </tbody></table>
                <div className="menu" id="menu" align="center">
                <ul className="nav">
                    <li className="active w-100"><Link to="/MainMenu">BACK TO MAIN MENU</Link></li>
                </ul>
            </div>
            <Footer />


        </>
    );
}