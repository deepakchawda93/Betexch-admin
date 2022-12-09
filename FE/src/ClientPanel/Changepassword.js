import React from 'react';
import { Link } from 'react-router-dom';
import Footer from './Components/Footer';
import PageHeader from './Components/PageHeader';
import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';


export default function Changepassword() {


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

    //////////////change password //////////////////
    const myFormData = async (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        const Formvlaues = Object.fromEntries(data.entries());
        console.log("form data is == ", Formvlaues);
        const response = await axios.post('/game/change-password', Formvlaues, options)
        // console.log(response.response.status);
        const data1 = response.data;
        if (data1.success) {
            toast.success(data1.message);
            e.target.reset();
        }
        else {
            toast.error(data1.message);
        }
    }

    return (
        <>
            <ToastContainer />
            <div className='' style={{ backgroundColor: "#E9E9E9" }} >
                <div className="position-relative userTheme">
                    <div className="position-relative">
                        <PageHeader title="LEDGER" />


                        <div className="container-fluid table-responsive p-0">
                        <form onSubmit={(e) => myFormData(e)}>
                            <table width="100%" border="0" cellspacing="0" cellpadding="0" style={{ backgroundColor: "#FFF" }}>
                                <tbody><tr><form action="#" method="POST" id="frm"></form>
                                    <td width="1%" bgcolor="#FFF">&nbsp;</td>
                                    <td bgcolor="#FFF">&nbsp;</td>
                                    <td width="50%" bgcolor="#FFF">&nbsp;</td>
                                    <td bgcolor="#FFF" className="FontTextBlack10px">&nbsp;</td>
                                </tr>
                                    <tr>
                                        <td bgcolor="#FFF" className="FontTextBlack10px">&nbsp;</td>
                                        <td width="49%" align="center" height="35" bgcolor="#FFF" className="FontTextBlack10px">OLD. PASSWORD</td>
                                        <td align="center" bgcolor="#FFF">

                                            <input type="password" id="c_pass" className="form-control1" name="current_pass" />

                                        </td><td bgcolor="#FFF" className="FontTextBlack10px">&nbsp;</td>
                                    </tr>
                                    <tr>
                                        <td bgcolor="#FFF" className="FontTextBlack10px">&nbsp;</td>
                                        <td height="35" align="center" bgcolor="#FFF" className="FontTextBlack10px">NEW PASSWORD</td>
                                        <td align="center" bgcolor="#FFF">

                                            <input type="password" id="pass1" className="form-control1" min="2" required="" name="new_pass" />

                                        </td><td bgcolor="#FFF" className="FontTextBlack10px">&nbsp;</td>
                                    </tr>
                                    <tr>
                                        <td bgcolor="#FFF" className="FontTextBlack10px">&nbsp;</td>
                                        <td height="35" align="center" bgcolor="#FFF" className="FontTextBlack10px">CON. PASSWORD</td>
                                        <td align="center" bgcolor="#FFF">

                                            <input type="password" id="pass2" className="form-control1" name="confirm" />

                                            {/* <input type="hidden" id="id" className="form-control1" name="confirm" min="2" required="" /> */}

                                        </td><td bgcolor="#FFF" className="FontTextBlack10px">&nbsp;</td>
                                    </tr>
                                    <tr>
                                        <td colspan="4" align="center" bgcolor="#FFF" className="FontTextBlack10px">&nbsp;</td>
                                    </tr>
                                    <tr>
                                        <td height="25">&nbsp;
                                        </td>
                                    </tr>
                                    <tr>
                                        <td height="45" colSpan={3} className="text-center">
                                            <div id="msgCon" align="center" bgcolor="#6A9AA4 " class="success"></div>
                                            <div class="menu" id="menu" align="center">
                                                <ul class="nav" style={{ justifyContent: "center"}}>
                                                    <li class="active"><button class="mybtn" type='submit'>CHANGE PASSWORD</button></li>
                                                </ul>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </form>
                        </div>
                    </div>
                </div>
            </div>


            <div className="menu mt-3" id="menu" align="center">
                <ul className="nav">
                    <li className="active w-100"><Link to="/MainMenu">BACK TO MAIN MENU</Link></li>
                </ul>
            </div>
            <Footer />

        </>
    );
}