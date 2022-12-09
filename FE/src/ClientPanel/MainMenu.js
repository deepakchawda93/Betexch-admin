import React from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import PageHeader from "./Components/PageHeader";
import Footer from "./Components/Footer";

export default function MainMenu() {
  return (
    <>
      <PageHeader />
      <div className="content_top">
        <div className="content_top-grid3"></div>
        <div className="clear"> </div>
      </div>
      <table
        width="100%"
        border="0"
        cellspacing="0"
        cellpadding="0"
        style={{ backgroundColor: "#FFF" }}
      >
        <tbody>
          <tr>
            <td>
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tbody>
                  <tr>
                    <td align="center">&nbsp;</td>
                  </tr>
                  <tr>
                    <td align="center">
                      <Link to="/user-inplay">
                        <img
                          src="/images/crick.png"
                          alt=""
                          width="112"
                          height="112"
                        />
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td height="25" align="center" className="GameList">
                      <Link to="/user-inplay" style={{ color: "#000000" }}>
                        In Play
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
            <td>
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tbody>
                  <tr>
                    <td align="center">&nbsp;</td>
                  </tr>
                  <tr>
                    <td align="center">
                      <Link to="/user-casino">
                        <img
                          src="/images/casino.png"
                          alt=""
                          width="112"
                          height="112"
                        />
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td height="25" align="center" className="GameList">
                      <Link to="/user-casino" style={{ color: "#000000" }}>
                        Casino
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>

          <tr>
            <td>
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tbody>
                  <tr>
                    <td align="center">
                      <Link to="/user-complete-game">
                        <img
                          src="/images/CG1.jpg"
                          alt=""
                          width="112"
                          height="112"
                        />
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td height="25" align="center" className="GameList">
                      <Link
                        to="/user-complete-game"
                        style={{ color: "#000000" }}
                      >
                        Complete Games
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
            <td>
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tbody>
                  <tr>
                    <td align="center">
                      <Link to="/user-profile">
                        <img
                          src="/images/Profile.png"
                          alt=""
                          width="112"
                          height="112"
                        />
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td height="25" align="center" className="GameList">
                      <Link to="/user-profile" style={{ color: "#000000" }}>
                        My Profile
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>

          <tr>
            <td>
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tbody>
                  <tr>
                    <td align="center">
                      <Link to="/user-ledger">
                        <img
                          src="/images/CL.png"
                          alt=""
                          width="112"
                          height="112"
                        />
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td height="25" align="center" className="GameList">
                      <Link to="/user-ledger" style={{ color: "#000000" }}>
                        My Ledger
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>

            <td>
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tbody>
                  <tr>
                    <td align="center">
                      <Link to="/user-password">
                        <img
                          src="/images/CP.png"
                          alt=""
                          width="112"
                          height="112"
                        />
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td height="25" align="center" className="GameList">
                      <Link to="/user-password" style={{ color: "#000000" }}>
                        Change Password
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>

          <tr>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td>
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tbody>
                  <tr></tr>
                  <tr>
                    <td align="center">
                      <a href="#" onclick="return alert('coming soon')">
                        <img
                          src="/images/ipl.png"
                          alt=""
                          width="180"
                          height="112"
                        />
                      </a>
                    </td>
                  </tr>

                  <tr>
                    <td height="25" align="center" className="GameList">
                      <a href="MyLedger" style={{ color: "#000000" }}>
                        IPL Winner Cup
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr></tr>
        </tbody>
      </table>

      <Footer />
    </>
  );
}
