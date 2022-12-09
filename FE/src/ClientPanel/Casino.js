import React from 'react';
import { Link } from 'react-router-dom';
import Footer from './Components/Footer';
import PageHeader from './Components/PageHeader';
import { useState, useEffect } from "react";
import axios from "axios";


export default function Casino() {

    return (
        <> 
          <div className='' style={{backgroundColor:"#E9E9E9"}} >
            <div className="position-relative userTheme bg-light">
                <div className="position-relative">
                    <PageHeader title="LEDGER" />
                    <div className="menu mb-3" id="menu" align="center">
                        <ul className="nav">
                            <li className="active w-100"><Link to="/MainMenu">BACK TO MAIN MENU</Link></li>
                        </ul>
                    </div>

                    <div className="container-fluid table-responsive">
                        <table width="100%" border="0" cellspacing="0" cellpadding="0" style={{backgroundColor: "#FFF"}}>
                            <tbody><tr>
                                <td>
                                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                        <tbody><tr>
                                            <td align="center">&nbsp;</td>
                                        </tr>
                                            <tr>
                                                <td align="center"><a href="#" onclick="submit()"><img src="/images/teen.png" alt="" width="112" height="112" /></a></td>
                                            </tr>
                                            <tr>
                                                <td height="25" align="center" className="GameList"><a onclick="submit()" href="#" style={{color:"#000000"}}>Teen Patti</a></td>
                                            </tr>
                                        </tbody></table>
                                </td>

                                <td>
                                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                        <tbody><tr>
                                            <td align="center">&nbsp;</td>
                                        </tr>
                                            <tr>
                                                <td align="center"><a href="#" onclick="submit()"><img src="/images/ander_bahar.png" alt="" width="112" height="112" /></a></td>
                                            </tr>
                                            <tr>
                                                <td height="25" align="center" className="GameList"><a onclick="submit()" href="#" style={{color:"#000000"}}>Ander Bahar</a></td>
                                            </tr>
                                        </tbody></table>
                                </td>


                            </tr>
                                <tr>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                </tr>


                            </tbody></table>
                    </div>
                </div>
            </div>
          </div>


            <Footer />

        </>
    );
}