import React from "react";
import { Link } from "react-router-dom";
import Footer from "./Components/Footer";
import PageHeader from "./Components/PageHeader";
import { useLocation } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";
import Tabs, { Tab } from "react-best-tabs";
import "react-best-tabs/dist/index.css";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Draggable from "react-draggable";
import { ToastContainer, toast } from "react-toastify";
import { BetModal } from "./BetModal";

export default function UserBet(props) {
  const location = useLocation();
  let token = localStorage.getItem("token");
  let header = { "x-access-token": `${token}` };
  let options = { headers: header };
  const { game_id, match_datetime, first_team_name, second_team_name } =
    location.state;
  const [open, setOpen] = React.useState(false);
  const [data, setData] = useState([]);
  const [session, setSession] = useState([]);
  const [match, setMatch] = useState([]);
  const [betData, setBet] = useState("");
  const [bet_type, setBetType] = useState("");
  const [bet_ValueNum, setBetValueNum] = useState();
  const [itemData, setItemData] = useState({});

  const handleClickOpen = async (e, item) => {
    setBetType(e.target.id);
    setBetValueNum(e.target.value);
    setItemData(item);
    console.log("item", item);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setBet("");
  };

  async function createMatchSession() {
    await axios
      .post("/owner/createSession", { gameId: game_id }, options)
      .then(async (resp) => {
        if (resp.data) {
          setData(resp.data.data);
        }
      })
      .catch((err) => {});
    await axios
      .post("/owner/activeMatchDetails", { gameId: game_id }, options)
      .then(async (resp) => {
        if (resp.data) {
          setData(resp.data.data);
        }
      })
      .catch((err) => {});
  }

  async function getListSession() {
    await axios
      .post("/game/sessionDetails", { gameId: game_id }, options)
      .then(async (resp) => {
        console.log("session=============>", resp.data);
        if (resp.data) {
          let filterSesssion = [];
          let tempData = resp.data.data;
          tempData.map((item) => {
            if (item.s != "SUSPENDED" && item.s != "Ball Running") {
              filterSesssion.push(item);
            }
          });
          setSession(filterSesssion);
        }
      })
      .catch((err) => {
        console.log("error", err);
      });
  }

  async function getListMatch() {
    await axios
      .post("/game/activeMatchDetails", { gameId: game_id }, options)
      .then(async (resp) => {
        console.log("match=============>", resp.data.data);
        if (resp.data) {
          setMatch(resp.data.data);
        }
      })
      .catch((err) => {});
  }
  // useEffect(() => {
  //   getListMatch();
  // }, [session]);

  useEffect(() => {
    createMatchSession();
    setInterval(() => getListSession(), 500);
    setInterval(() => getListMatch(), 500);
  }, []);
  const [showText, setShowText] = useState(false);

  return (
    <>
      <div className="position-relative userTheme bg-light">
        <div className="position-relative">
          <PageHeader title="IN PLAY" />
          <div className="menu mb-1" id="menu" align="center">
            <ul className="nav">
              <li
                style={{ backgroundColor: "#52B5E1 !important" }}
                className="active w-100"
              >
                <a
                  className="cursur"
                  style={{ backgroundColor: "#52B5E1 !important" }}
                  onClick={() => setShowText(!showText)}
                >
                  <img
                    style={{ backgroundColor: "#52B5E1 !important" }}
                    height="18"
                    width="25"
                    src="http://bet95.bet/assets/images/live-tv.png"
                  />
                  Show Tv
                </a>
              </li>
              {showText && (
                <div className="w-100">
                  <iframe
                    src="https://wbt99.in/api-v1/newtv?event_id=31595095"
                    title="Live Match"
                    class="match-tv"
                  ></iframe>
                </div>
              )}
            </ul>
          </div>
          <table
            width="100%"
            border="0"
            cellSpacing="0"
            cellPadding="0"
            id="score"
          >
            <tbody>
              <tr>
                <td
                  colSpan="3"
                  height="35"
                  align="center"
                  className="TeamCombo"
                >
                  <p className="price-btn style18">
                    <span
                      id="ScoreMsg"
                      style={{ textDecoration: "blink !important" }}
                    >
                      Score is not coming
                    </span>
                    &nbsp;
                  </p>
                </td>
              </tr>
              <tr>
                <td
                  width="35%"
                  height="35"
                  align="center"
                  className="TeamCombo"
                >
                  <div className="ScoreCard">
                    <p>
                      <span id="LocalPlayer">Player1()</span>
                      <br />
                      <span id="VisitorPlayer">Player 2()</span>
                      <br />
                      <span id="RecentBall">BOW:- </span>
                      <br />
                    </p>
                  </div>
                </td>
                <td
                  width="45%"
                  height="35"
                  align="center"
                  className="TeamCombo"
                >
                  <div className="ScoreCard">
                    <p>
                      <span id="LocalTeam">Team 1 score borad </span>
                      <br />
                      <span id="VisitorTeam">Team 2 score borad</span>
                      <br />
                      <span id="Status">6 Ball :Last 6 Balls : </span>
                      <br />
                    </p>
                  </div>
                </td>
                <td
                  width="20%"
                  height="35"
                  align="center"
                  className="TeamCombo"
                >
                  <div className="ScoreCard">
                    <p>
                      <span id="Image">
                        <img
                          height="60"
                          src="http://owner.bet95.bet/assets/images/score/BO.png"
                        />
                      </span>
                      <br />
                    </p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          <form
            name="BetPlayer"
            method="post"
            action="ODMSBetDetailsWithFancy.php"
          >
            <table
              width="100%"
              style={{ borderCollapse: "separate" }}
              border="0"
              cellSpacing="0"
              cellPadding="0"
            >
              <tr>
                <td valign="top">
                  <table
                    width="100%"
                    style={{ borderCollapse: "separate" }}
                    border="0"
                    cellPadding="0"
                    cellSpacing="0"
                  >
                    <tr>
                      <td align="left" valign="top">
                        <table
                          width="100%"
                          style={{ borderCollapse: "separate" }}
                          border="0"
                          cellSpacing="0"
                          cellPadding="0"
                          id="score"
                        ></table>
                      </td>
                    </tr>
                    <tr>
                      <td align="left" valign="top">
                        <table
                          width="100%"
                          style={{ borderCollapse: "separate" }}
                          border="0"
                          cellPadding="2"
                          cellSpacing="2"
                        >
                          <tr>
                            <td
                              width="50%"
                              height="35"
                              align="center"
                              valign="middle"
                              bgcolor="#52b5e1"
                              className="FontTextWhite10px"
                              style={{ VerticalAlign: "middle" }}
                            >
                              TEAM
                              <p>Max : 100000 </p>{" "}
                            </td>
                            <td
                              width="25%"
                              align="center"
                              valign="middle"
                              bgcolor="#52b5e1"
                              className="FontTextWhite10px"
                              style={{ VerticalAlign: "middle" }}
                            >
                              LAGAI
                            </td>
                            <td
                              width="25%"
                              align="center"
                              valign="middle"
                              bgcolor="#52b5e1"
                              className="FontTextWhite10px"
                              style={{ VerticalAlign: "middle" }}
                            >
                              KHAI
                            </td>
                            {/* <!-- <td width="35%" align="center" valign="middle" bgcolor="#52b5e1" className="FontTextWhite10px" style={{VerticalAlign:"middle"}}>POSITION</td> --> */}
                          </tr>
                          <tbody id="team-table-dst">
                            <tr>
                              <td
                                height="35"
                                align="center"
                                valign="middle"
                                bgcolor="#FFF"
                                className="FontTextBlue"
                                style={{ VerticalAlign: "middle" }}
                                selectionid="2"
                                bettype="L"
                                teamname="ADELAIDE STRIKERS WBBL"
                                datatype="match"
                              >
                                <span
                                  className="FontTextBlue"
                                  style={{ VerticalAlign: "middle" }}
                                >
                                  {first_team_name}{" "}
                                </span>
                                <span
                                  style={{
                                    color: "#00F",
                                    verticalAlign: "middle",
                                  }}
                                >
                                  0
                                </span>
                              </td>
                              <td
                                align="center"
                                valign="middle"
                                bgcolor="#FFF"
                                style={{ VerticalAlign: "middle" }}
                              >
                                <input
                                  type="button"
                                  name="KRate1"
                                  id="KRate1"
                                  value="0.00"
                                  className="ButtonK"
                                  selectionid="2"
                                  bettype="L"
                                  teamname="ADELAIDE STRIKERS WBBL"
                                  datatype="match"
                                />
                              </td>
                              <td
                                align="center"
                                valign="middle"
                                bgcolor="#FFF"
                                className="textTeamHead"
                                style={{
                                  verticalAlign: "middle",
                                  color: "#F00",
                                }}
                              >
                                <input
                                  type="button"
                                  name="LRate1"
                                  id="LRate1"
                                  value="0.00"
                                  className="ButtonL"
                                  selectionid="2"
                                  bettype="K"
                                  teamname="ADELAIDE STRIKERS WBBL"
                                  datatype="match"
                                />
                              </td>
                            </tr>
                            <tr>
                              <td
                                height="35"
                                align="center"
                                valign="middle"
                                bgcolor="#FFF"
                                className="FontTextBlue"
                                style={{ VerticalAlign: "middle" }}
                                selectionid="1"
                                bettype="L"
                                teamname="SYDNEY SIXERS WBBL"
                                datatype="match"
                              >
                                <span
                                  className="FontTextBlue"
                                  style={{ VerticalAlign: "middle" }}
                                >
                                  {second_team_name}{" "}
                                </span>
                                <span
                                  style={{
                                    color: "#00F",
                                    verticalAlign: "middle",
                                  }}
                                >
                                  0
                                </span>
                              </td>
                              <td
                                align="center"
                                valign="middle"
                                bgcolor="#FFF"
                                style={{ VerticalAlign: "middle" }}
                              >
                                <input
                                  type="button"
                                  name="KRate1"
                                  id="KRate1"
                                  value="0.00"
                                  className="ButtonK"
                                  selectionid="1"
                                  bettype="L"
                                  teamname="SYDNEY SIXERS WBBL"
                                  datatype="match"
                                />
                              </td>
                              <td
                                align="center"
                                valign="middle"
                                bgcolor="#FFF"
                                className="textTeamHead"
                                style={{
                                  color: "#00F",
                                  verticalAlign: "middle",
                                }}
                              >
                                <input
                                  type="button"
                                  name="LRate1"
                                  id="LRate1"
                                  value="0.00"
                                  className="ButtonL"
                                  selectionid="1"
                                  bettype="K"
                                  teamname="SYDNEY SIXERS WBBL"
                                  datatype="match"
                                />
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td align="center" valign="bottom" bgcolor="#FFFFFF"></td>
                    </tr>
                    <tr>
                      <td height="35" align="center" className="TeamCombo">
                        <table
                          width="99%"
                          border="0"
                          cellSpacing="0"
                          cellPadding="0"
                          style={{ borderCollapse: "separate" }}
                        >
                          <tr>
                            <td align="left" valign="top">
                              <table
                                width="100%"
                                style={{ borderCollapse: "separate" }}
                                border="0"
                                cellPadding="0"
                                cellSpacing="2"
                              >
                                <tr>
                                  <td
                                    width="40%"
                                    height="35"
                                    align="center"
                                    valign="middle"
                                    bgcolor="#52b5e1"
                                    className="FontTextWhite10px"
                                    style={{ VerticalAlign: "middle" }}
                                  >
                                    <h3>SESSION</h3>
                                  </td>
                                  <td
                                    width="15%"
                                    height="35"
                                    align="center"
                                    valign="middle"
                                    bgcolor="#52b5e1"
                                    className="FontTextWhite10px"
                                    style={{ VerticalAlign: "middle" }}
                                  >
                                    NOT
                                  </td>
                                  <td
                                    width="15%"
                                    height="35"
                                    align="center"
                                    valign="middle"
                                    bgcolor="#52b5e1"
                                    className="FontTextWhite10px"
                                    style={{ VerticalAlign: "middle" }}
                                  >
                                    YES
                                  </td>
                                </tr>
                                <tbody id="session-table-dst">
                                  <tr>
                                    <td
                                      height="35"
                                      align="center"
                                      valign="middle"
                                      bgcolor="#FFF"
                                      className="textTeamHead"
                                      style={{ color: "#00F" }}
                                    >
                                      <input
                                        type="button"
                                        name="Session1"
                                        id="Session1"
                                        value="7 OVER RUN SS W	"
                                        className="ButtonSess"
                                      />
                                      <br />
                                      <input
                                        style={{ fontSize: "10px" }}
                                        type="button"
                                        name="Session1"
                                        id="Session13"
                                        value="Session Limit : 200K"
                                        className="ButtonSess"
                                      />
                                    </td>
                                    <td
                                      align="center"
                                      valign="middle"
                                      bgcolor="#FFF"
                                      className="textTeamHead"
                                      style={{ color: "#00F" }}
                                    >
                                      <input
                                        type="button"
                                        name="NRun1"
                                        id="NRun1"
                                        value="0.00"
                                        className="ButtonNRun"
                                        bhav="0.00"
                                        selectionid="380"
                                        datatype="session"
                                      />
                                      <br />
                                      <input
                                        type="button"
                                        name="NRate1"
                                        id="NRate1"
                                        value="0.00"
                                        className="ButtonNRate"
                                        datatype="session"
                                      />
                                    </td>
                                    <td
                                      align="center"
                                      valign="middle"
                                      bgcolor="#FFF"
                                      className="textTeamHead"
                                      style={{ color: "#00F" }}
                                    >
                                      <input
                                        type="button"
                                        name="YRun1"
                                        id="YRun1"
                                        value="0.00"
                                        className="ButtonYRun"
                                        runnername="7 OVER RUN SS W"
                                        bettype="Y"
                                        selectionid="380"
                                        datatype="session"
                                      />
                                      <br />
                                      <input
                                        type="button"
                                        name="YRate1"
                                        id="YRate1"
                                        value="0.00"
                                        className="ButtonYRate"
                                      />
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                          <tr>
                            <td align="left" valign="top">
                              <table
                                width="100%"
                                border="0"
                                style={{ marginBottom: "-15%" }}
                                cellPadding="0"
                                cellSpacing="0"
                                id="PlaceBet"
                              >
                                <tbody>
                                  <tr>
                                    <td
                                      height="35"
                                      align="center"
                                      valign="middle"
                                      bgcolor="#00FFFF"
                                      className="FontTextBlue"
                                      style={{ VerticalAlign: "middle" }}
                                    >
                                      AMOUNT
                                    </td>
                                    <td
                                      align="center"
                                      valign="middle"
                                      bgcolor="#00FFFF"
                                      style={{ VerticalAlign: "middle" }}
                                    >
                                      <input
                                        type="number"
                                        name="MatchAmount"
                                        list="AmountList"
                                        className="MatchAmount"
                                        id="MatchAmount"
                                        size="10"
                                        maxLength="7"
                                        readOnly=""
                                        autoComplete="OFF"
                                        selectionid=""
                                        marketid="1.206866988"
                                        bhav=""
                                      />
                                    </td>
                                    <td
                                      align="center"
                                      valign="middle"
                                      bgcolor="#00FFFF"
                                      style={{ VerticalAlign: "middle" }}
                                    >
                                      <input
                                        name="AmountTime"
                                        type="text"
                                        list="AmountList"
                                        className="AmountTime"
                                        id="AmountTime"
                                        size="4"
                                        maxLength="3"
                                        readOnly=""
                                        autoComplete="OFF"
                                      />
                                    </td>
                                    <td
                                      align="center"
                                      valign="middle"
                                      bgcolor="#00FFFF"
                                      style={{ VerticalAlign: "middle" }}
                                    >
                                      <input
                                        name="cmdDone"
                                        style={{
                                          color: "black",
                                          border: "none",
                                          fontWeight: "bold",
                                          fontSize: "15px",
                                        }}
                                        className=""
                                        type="button"
                                        id="cmdDone"
                                        value="Done"
                                      />
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                          <tr>
                            <td valign="top"></td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                  <br />
                </td>
              </tr>
            </table>
          </form>
          <br />
          <table
            width="100%"
            border="0"
            cellSpacing="2"
            cellPadding="0"
            style={{ borderCollapse: "separate" }}
          >
            <tbody>
              <tr>
                <td>
                  <table
                    width="100%"
                    border="0"
                    cellPadding="2"
                    cellSpacing="2"
                    id="MyBets"
                    style={{ borderCollapse: "separate" }}
                  >
                    <tbody>
                      <tr>
                        <td
                          align="left"
                          bgcolor="#52b5e1"
                          className="FontTextWhite10px"
                        >
                          S.NO
                        </td>
                        <td
                          align="left"
                          valign="middle"
                          bgcolor="#52b5e1"
                          className="FontTextWhite10px"
                        >
                          Team{" "}
                        </td>
                        <td
                          align="right"
                          valign="middle"
                          bgcolor="#52b5e1"
                          className="FontTextWhite10px"
                        >
                          {" "}
                          Rate
                        </td>
                        <td
                          align="right"
                          valign="middle"
                          bgcolor="#52b5e1"
                          className="FontTextWhite10px"
                        >
                          Amount
                        </td>
                        <td
                          align="center"
                          valign="middle"
                          bgcolor="#52b5e1"
                          className="FontTextWhite10px"
                        >
                          {" "}
                          Mode
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
          <br />

          <table
            width="100%"
            border="0"
            cellSpacing="2"
            cellPadding="2"
            style={{ borderCollapse: "separate" }}
          >
            <tbody>
              <tr>
                <td
                  align="left"
                  bgcolor="#52b5e1"
                  className="FontTextWhite10px"
                >
                  S.NO
                </td>
                <td
                  align="left"
                  bgcolor="#52b5e1"
                  className="FontTextWhite10px"
                >
                  Session{" "}
                </td>
                <td
                  align="right"
                  valign="middle"
                  bgcolor="#52b5e1"
                  className="FontTextWhite10px"
                >
                  Rate
                </td>
                <td
                  align="right"
                  valign="middle"
                  bgcolor="#52b5e1"
                  className="FontTextWhite10px"
                >
                  Amount
                </td>
                <td
                  align="right"
                  bgcolor="#52b5e1"
                  className="FontTextWhite10px"
                >
                  Run
                </td>
                <td
                  align="center"
                  bgcolor="#52b5e1"
                  className="FontTextWhite10px"
                >
                  Mode
                </td>
                <td
                  align="center"
                  bgcolor="#52b5e1"
                  className="FontTextWhite10px"
                >
                  Dec
                </td>
              </tr>
              <tr>
                <td
                  align="left"
                  bgcolor="#FFF"
                  valign="middle"
                  style={{ color: "#000" }}
                  className="FontTextWhite10px"
                >
                  1
                </td>
                <td
                  align="left"
                  bgcolor="#FFF"
                  valign="middle"
                  style={{ color: "#000" }}
                  className="FontTextWhite10px"
                >
                  7 OVER RUN SS W
                </td>
                <td
                  align="right"
                  valign="middle"
                  bgcolor="#FFF"
                  style={{ color: "#000" }}
                  className="FontTextWhite10px"
                >
                  1.00
                </td>
                <td
                  align="right"
                  valign="middle"
                  bgcolor="#FFF"
                  style={{ color: "#000" }}
                  className="FontTextWhite10px"
                >
                  500{" "}
                </td>
                <td
                  align="right"
                  bgcolor="#FFF"
                  valign="middle"
                  style={{ color: "#000" }}
                  className="FontTextWhite10px"
                >
                  29
                </td>
                <td
                  align="center"
                  bgcolor="#FFF"
                  valign="middle"
                  style={{ color: "#000" }}
                  className="FontTextWhite10px"
                >
                  NOT
                </td>
                <td
                  align="center"
                  bgcolor="#FFF"
                  valign="middle"
                  style={{ color: "#000" }}
                  className="FontTextWhite10px"
                ></td>
              </tr>
            </tbody>
          </table>

          <br />
          <div className="menu" id="menu" align="center">
            <ul className="nav">
              <li className="active w-100">
                <Link to="/user-inplay" className="upcoming">
                  BACK TO UPCOMING GAMES
                </Link>
              </li>
            </ul>
          </div>
          <div style={{ display: "none" }}>
            <Tabs
              activeTab="1"
              className=""
              ulClassName=""
              activityClassName="bg-success"
              onClick={(event, tab) => console.log(event, tab)}
            >
              <Tab title="Game Info" className="mr-3 w-50">
                <div className="container-fluid mb-1d">
                  <div
                    className="tab-pane fade active show"
                    id="nav-home"
                    role="tabpanel"
                    aria-labelledby="nav-home-tab"
                  >
                    <div className="bet-status">
                      <span className="btn btn-danger">
                        <marquee behavior="alternate" scrollamount="2">
                          WICKET{" "}
                        </marquee>
                      </span>
                      <marquee
                        className="text-danger"
                        behavior="alternate"
                        scrollamount="1"
                      >
                        Netherlands Needs 38 Runs From 10 Balls
                      </marquee>
                      <button
                        type="button"
                        className="live-tv-btn btn btn-primary watch"
                      >
                        <img
                          src="https://hub11.in/assets_new/images/pc_icon@2x.png"
                          style={{
                            marginTop: " -6px ",
                            width: "36px",
                            height: "35px",
                          }}
                        />
                      </button>
                    </div>
                    <div className="scoreboard">
                      <div className="container">
                        <div className="row">
                          <div className="col-6">S Ahmad (1)*</div>
                          <div className="col-6">ZIMBABWE 133/10 (19.3)</div>
                        </div>
                        <div className="row">
                          <div className="col-6">T Nidamanuru (21)</div>
                          <div className="col-6">NETHERLANDS 95/10 (18.2)</div>
                        </div>
                        <div className="row">
                          <div className="col-6"></div>
                          <div className="col-6">
                            <span className="last-over">
                              <span>2</span>
                              <span>WW</span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p1_Video">
                      <iframe
                        src="https://wbt99.in/api-v1/newtv?event_id=31595095"
                        title="Live Match"
                        className="match-tv"
                      ></iframe>
                    </div>
                    <div className="my-3 container">
                      <div className="inplay-match-bets-header border-0">
                        <div className="teamname">Team: MAX 100000/- </div>
                        <div className="text-center">Lagai</div>
                        <div className="text-center">Khai</div>
                        <div className="text-center">Position</div>
                      </div>
                      {match && match.length != 0 ? (
                        <>
                          <div className="inplay-match-bets">
                            <div className="inplay-match-bet">
                              <div className="teamname">{match[0].nat}</div>
                              {match[0].s == "ACTIVE" ? (
                                <>
                                  <div className="lgaai">
                                    <button
                                      id="lagai"
                                      onClick={(e) =>
                                        handleClickOpen(e, match[0])
                                      }
                                      type="button"
                                      className="w-100 box-shadow-0 btn btn-transparent"
                                    >
                                      {match[0].b1}
                                    </button>
                                  </div>
                                  <div className="khaai">
                                    <button
                                      id="khaai"
                                      onClick={(e) =>
                                        handleClickOpen(e, match[0])
                                      }
                                      type="button"
                                      className="w-100 box-shadow-0 btn btn-transparent"
                                    >
                                      {match[0].l1}
                                    </button>
                                  </div>
                                </>
                              ) : (
                                <>
                                  <span
                                    className="w-10  box-shadow-0  btn btn-danger disabled"
                                    style={{ cursor: "not-allowed" }}
                                  >
                                    {match[0].s}
                                  </span>
                                </>
                              )}
                              <div className="d-flex align-items-center justify-content-center">
                                <b className="text-danger">-500</b>
                              </div>
                            </div>
                          </div>
                          <div className="inplay-match-bets">
                            <div className="inplay-match-bet">
                              <div className="teamname">{match[1].nat}</div>
                              {match[1].s == "ACTIVE" ? (
                                <>
                                  <div className="lgaai">
                                    <button
                                      id="lagai"
                                      onClick={(e) =>
                                        handleClickOpen(e, match[1])
                                      }
                                      type="button"
                                      className="w-100 box-shadow-0 btn btn-transparent"
                                    >
                                      {match[1].b1}
                                    </button>
                                  </div>
                                  <div className="khaai">
                                    <button
                                      id="khaai"
                                      onClick={(e) =>
                                        handleClickOpen(e, match[1])
                                      }
                                      type="button"
                                      className="w-100 box-shadow-0 btn btn-transparent"
                                    >
                                      {match[1].l1}
                                    </button>
                                  </div>
                                </>
                              ) : (
                                <>
                                  <span
                                    className="w-10  box-shadow-0  btn btn-danger disabled"
                                    style={{ cursor: "not-allowed" }}
                                  >
                                    {match[1].s}
                                  </span>
                                </>
                              )}
                              <div className="d-flex align-items-center justify-content-center">
                                <b className="text-danger">-500</b>
                              </div>
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          {" "}
                          <div className="inplay-match-bets">
                            <div className="inplay-match-bet">
                              <div className="teamname">{first_team_name}</div>
                              <div className="lgaai">
                                <button
                                  id="lagai"
                                  onClick={(e) => handleClickOpen(e)}
                                  type="button"
                                  className="w-100 box-shadow-0 btn btn-transparent"
                                >
                                  00
                                </button>
                              </div>
                              <div className="khaai">
                                <button
                                  id="khaai"
                                  onClick={(e) => handleClickOpen(e)}
                                  type="button"
                                  className="w-100 box-shadow-0 btn btn-transparent"
                                >
                                  00
                                </button>
                              </div>
                              <div className="d-flex align-items-center justify-content-center">
                                <b className="text-danger">-500</b>
                              </div>
                            </div>
                          </div>
                          <div className="inplay-match-bets">
                            <div className="inplay-match-bet">
                              <div className="teamname">{second_team_name}</div>
                              <div className="lgaai">
                                <button
                                  id="lagai"
                                  onClick={(e) => handleClickOpen(e)}
                                  type="button"
                                  className="w-100 box-shadow-0 btn btn-transparent"
                                >
                                  00
                                </button>
                              </div>
                              <div className="khaai">
                                <button
                                  id="khaai"
                                  onClick={(e) => handleClickOpen(e)}
                                  type="button"
                                  className="w-100 box-shadow-0 btn btn-transparent"
                                >
                                  00
                                </button>
                              </div>
                              <div className="d-flex align-items-center justify-content-center">
                                <b className="text-danger">-500</b>
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </div>

                    <div className="scoreboard">
                      <div className="container">
                        <div
                          className="row"
                          style={{ background: "#00d0a9", color: "white" }}
                        >
                          <div className="d-flex justify-content-between col">
                            <p className="m-0">Session Plus / Minus</p>
                            <span className="textBLack">0</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="container">
                      <div className="inplay-match-bets-header inplay-session-bet border-0">
                        <div className="teamname">Session</div>
                        <div className="d-flex align-items-center justify-content-center">
                          No
                        </div>
                        <div className="d-flex align-items-center justify-content-center">
                          Yes
                        </div>
                      </div>
                      <div className="inplay-match-bets">
                        {/* {JSON.stringify(session)} */}

                        {session &&
                          session.map((item) => {
                            return (
                              <div className="inplay-match-bet inplay-session-bet">
                                <div className="teamname">
                                  <p className="m-0">{item.nat}</p>
                                  <p className="m-0">Max: {item.max}</p>
                                </div>
                                <div className="khaai">
                                  <button
                                    id="session_no"
                                    onClick={(e) => handleClickOpen(e, item)}
                                    type="button"
                                    className="w-100 box-shadow-0 btn btn-transparent"
                                  >
                                    <span>{item.b1}</span>{" "}
                                    <span style={{ display: "none" }}>/</span>
                                    <span
                                      style={{ borderTop: "thin solid black" }}
                                    >
                                      {item.bs1}
                                    </span>
                                  </button>
                                </div>
                                <div className="lgaai">
                                  <button
                                    id="session_yes"
                                    onClick={(e) => handleClickOpen(e, item)}
                                    type="button"
                                    className="w-100 box-shadow-0 btn btn-transparent"
                                  >
                                    <span>{item.l1}</span>{" "}
                                    <span style={{ display: "none" }}>/</span>
                                    <span
                                      style={{ borderTop: "thin solid black" }}
                                    >
                                      {item.ls1}
                                    </span>
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  </div>
                </div>
              </Tab>
              <Tab title="Your Bets" className="mr-3 w-50">
                <div className="container-fluid mb-1d yourbet">
                  <div className="mt-3">
                    <div className="p-2">
                      <h5 className="section-title">Match Bets</h5>
                      <div className="bet-card card">
                        <div className="bet-details card-body">
                          <div>
                            <span>Team</span>
                            <p>UAE</p>
                          </div>
                          <div>
                            <span>Amount</span>
                            <p>500</p>
                          </div>
                          <div>
                            <span>Rate</span>
                            <p>0.39</p>
                          </div>
                          <div>
                            <span>Mode</span>
                            <p>L</p>
                          </div>
                        </div>
                      </div>
                      <h5 className="section-title">Session Bets</h5>
                      <div className="bet-card card">
                        <h5 className="card-header">LAMBI RUN UAE</h5>
                        <div className="bet-details card-body">
                          <div>
                            <span>Amount</span>
                            <p>500 </p>
                          </div>
                          <div>
                            <span>Rate</span>
                            <p>1.00</p>
                          </div>
                          <div>
                            <span>Run</span>
                            <p>251</p>
                          </div>
                          <div>
                            <span>Mode</span>
                            <p>N</p>
                          </div>
                          <div>
                            <span>Dec.</span>
                            <p>263</p>
                          </div>
                        </div>
                      </div>
                      <div className="bet-card card">
                        <h5 className="card-header">LAMBI RUN UAE</h5>
                        <div className="bet-details card-body">
                          <div>
                            <span>Amount</span>
                            <p>500 </p>
                          </div>
                          <div>
                            <span>Rate</span>
                            <p>1.00</p>
                          </div>
                          <div>
                            <span>Run</span>
                            <p>250</p>
                          </div>
                          <div>
                            <span>Mode</span>
                            <p>N</p>
                          </div>
                          <div>
                            <span>Dec.</span>
                            <p>263</p>
                          </div>
                        </div>
                      </div>
                      <div className="bet-card card">
                        <h5 className="card-header">LAMBI RUN UAE</h5>
                        <div className="bet-details card-body">
                          <div>
                            <span>Amount</span>
                            <p>500 </p>
                          </div>
                          <div>
                            <span>Rate</span>
                            <p>1.00</p>
                          </div>
                          <div>
                            <span>Run</span>
                            <p>251</p>
                          </div>
                          <div>
                            <span>Mode</span>
                            <p>N</p>
                          </div>
                          <div>
                            <span>Dec.</span>
                            <p>263</p>
                          </div>
                        </div>
                      </div>
                      <div className="bet-card card">
                        <h5 className="card-header">LAMBI RUN UAE</h5>
                        <div className="bet-details card-body">
                          <div>
                            <span>Amount</span>
                            <p>500 </p>
                          </div>
                          <div>
                            <span>Rate</span>
                            <p>1.00</p>
                          </div>
                          <div>
                            <span>Run</span>
                            <p>251</p>
                          </div>
                          <div>
                            <span>Mode</span>
                            <p>N</p>
                          </div>
                          <div>
                            <span>Dec.</span>
                            <p>263</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Tab>
            </Tabs>
            <BetModal
              open={open}
              setBet={setBet}
              handleClose={handleClose}
              betData={betData}
              bet_type={bet_type}
              bet_ValueNum={bet_ValueNum}
              itemData={itemData}
              game_id={game_id}
            />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
