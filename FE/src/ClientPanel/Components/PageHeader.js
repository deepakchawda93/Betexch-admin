import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";

export default function PageHeader(props) {
  const navigate = useNavigate();
  const logout = () => {
    //alert("my fun call == ");
    localStorage.clear();
    toast.success("Logout Successfully");
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  const [limit, setlimit] = useState([]);
  const [uid, setuid] = useState([]);
  const [username, setFname] = useState([]);
  const [userlastname, setLname] = useState([]);
  useEffect(() => {
    const limit = localStorage.getItem("limit");
    const uid = localStorage.getItem("uid");
    const first_name = localStorage.getItem("first_name");
    setFname(first_name);
    setlimit(limit);
    setuid(uid);
    console.log(limit);
  }, []);

  return (
    <>
      <table
        width="100%"
        border="0"
        cellspacing="0"
        cellpadding="0"
        style={{ border: "#FFF solid 1.5px", backgroundColor: "#0336FF" }}
      >
        <tbody>
          <tr>
            <td width="70" align="center">
              <Link to="/user-profile">
                <img src="/images/ProfileTop.png" alt="" />{" "}
              </Link>
            </td>
            <td
              style={{ verticalAlign: "center" }}
              className="FontTextWhite"
              align="left"
            >
              <div className="profile_picture_name" align="center">
                <h3>
                  {" "}
                  {uid} &nbsp; {username}{" "}
                </h3>
              </div>
              <div className="profile_picture">
                <p align="center"> Coins : {limit} </p>
              </div>
            </td>
            <td
              width="55"
              align="center"
              className="FontTextWhite"
              style={{ padding: "8px" }}
            >
              <a href="#">
                <span onClick={logout}>
                  <img src="/images/LGTop.png" alt="" width="40" height="40" />
                </span>
                <span style={{ color: "white" }}>Logout</span>
              </a>
            </td>
          </tr>
          <tr>
            <td colspan="2"></td>
          </tr>
        </tbody>
      </table>

      {/* <div className="page-header">
        <h4 className="m-0">{props.title}</h4>
        <p className="m-0"><span>
          <box-icon color="#fff" name="limit"></box-icon>
        </span><span>Coins : <span> {limit}  </span></span></p>
      </div> */}
    </>
  );
}
