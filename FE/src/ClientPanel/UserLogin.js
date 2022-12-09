import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';

export default function UserLogin() {

    const navigate = useNavigate();
    const [uid, setUid] = useState('');
    const [password, setPassword] = useState('')

    async function login() {
        let data = { uid, password };
        let result = await fetch('/game/login', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(data)
        });
        let demo = await result.json();
        if (demo.success) {
            localStorage.setItem('token', demo.data.token);
            localStorage.setItem('uid', demo.data.uid);
            localStorage.setItem('first_name', demo.data.name);
            localStorage.setItem('role', demo.data.role);
            localStorage.setItem('share', demo.data.share);
            localStorage.setItem('status', demo.data.status);
            localStorage.setItem('wallet', demo.data.wallet);
            localStorage.setItem('limit', demo.data.limit);
            localStorage.setItem('matchCommission', demo.data.matchCommission);
            toast.success(demo.message);
            setTimeout(() => {
                navigate('/welcome');
            }, 1000);
        }
        else {

            toast.error(demo.message);
        }

    }

    return (
        <>
            <ToastContainer />

            <div className="container main-background justify-content-center align-items-center d-flex">
                <div className="container" style={{ marginTop: "-140px" }}>
                    <div className="row justify-content-center">
                        <div className="col-md-4 mx-auto">
                            <div>
                                <div className="card-header align-items-center d-flex flex-column border-bottom-0">
                                    <b className="MuiTypography-root MuiTypography-h1 MuiTypography-colorSecondary" style={{ fontSize: "80px !important" }}><b>99EXCH</b></b>
                                    <h1 className="MuiTypography-root MuiTypography-h5 MuiTypography-colorPrimary"><b>Sign in</b></h1>

                                </div>
                                <div className="card-body">
                                    <form className="BetPlayer-login-form login-form">
                                        <div className="form-floating mb-3">
                                            <input type="text" className="form-control input" name="uid" onChange={(e) => setUid(e.target.value)} autocomplete="off" id="floatingInput" placeholder="Client Code" />
                                            <label for="floatingInput">Client Code<span className="req">*<span className="focus-bg"></span></span></label>
                                        </div>
                                        <div className="form-floating mb-3">
                                            <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} className="form-control " id="floatingPassword" placeholder="Password" />
                                            <label for="floatingPassword">Password<span className="req">*</span></label>
                                        </div>
                                        <div className="col-12">
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" id="inlineFormCheck" />
                                                <label className="form-check-label ps-2" for="inlineFormCheck">
                                                    Remember me
                                                </label>
                                            </div>
                                        </div>
                                        <div className="d-grid">
                                            <button onClick={login} type="button" className="btn text-white button-background ">sign in  </button>
                                        </div>
                                    </form>
                                </div>
                                <center className="mt-4">Copyright © 99EXCH 2022.</center>
                            </div>
                        </div>
                    </div>

                </div>
            </div>







            {/* <div className="login-page">
                <div className="toast-container position-absolute top-0 end-0 p-3 position-fixed"></div>
                <div className="login-page-banner"></div>
                <h4 className="brand-name">.</h4>
                <div className="col-lg-6 login-form card">
                    <form>
                        <div className="p-4 form-input-transparent">
                            <h3 className="form-title">Login</h3>
                            <div className="position-relative mb-4"><span className="input-title">Username</span>
                                <div className="mb-3 rounded input-group">
                                    <input name="uid" type="text" onChange={ (e)=>setUid(e.target.value) } autocomplete="off" className="form-control" />
                                </div>
                            </div>
                            <div className="position-relative"><span className="input-title">Password</span>
                                <div className="mb-3 rounded input-group">
                                    <input name="password" type="password" tabindex="2" autocomplete="off" className="form-control"  onChange={ (e)=>setPassword(e.target.value) } />
                        
                            </div>
                            </div> 
                        </div>
                        <button onClick={login} type="button" className="w-100 primary-outline-btn py-3 btn btn-primary">Login</button>
                    </form>
                </div>
            </div> */}
        </>
    );
}