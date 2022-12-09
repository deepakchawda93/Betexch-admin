import React from 'react';
import { Link } from 'react-router-dom';
import Footer from './Components/Footer';
import PageHeader from './Components/PageHeader';
import { useState, useEffect } from "react";
import axios from "axios";

export default function UserInplay() {

  let token = localStorage.getItem("token");
  let header = ({ 'x-access-token': `${token}` });
  let options = ({ headers: header });

  const [data, setData] = useState([]);

  const profiledetail = async () => {
    axios.get(`/game/in-play`, options)
      .then(res => {
        console.log(res.data.data);
        const data = res.data.data;
        setData(data);
      })
  }

  useEffect(() => {
    profiledetail();
  }, []);


  return (
    <>
      <div className="position-relative userTheme bg-light">
        <div className="position-relative">
          <PageHeader title="IN PLAY" />
          <div className="menu" id="menu" align="center">
            <ul className="nav">
              <li className="active w-100"><Link to="/MainMenu">BACK TO MAIN MENU</Link></li>
            </ul>
          </div>
          <br />


          {data.map((item, index) => {
              return (
                <>
          <div className='inplylist'>
          <div className="TeamName">
            <Link to={'/user-start-bet'}
              state={{
                game_id: item.game_id,
                match_datetime: item.match_datetime,
                first_team_name: item.first_team_name,
                second_team_name: item.second_team_name,
              }}
            >{item.first_team_name} VS {item.second_team_name}</Link>
          </div>
          <div className="profile-details">
            <Link to={'/user-start-bet'}
              state={{
                game_id: item.game_id,
                match_datetime: item.match_datetime,
                first_team_name: item.first_team_name,
                second_team_name: item.second_team_name,
              }}
            >
              <table width="100%" border="0" cellspacing="0" cellpadding="0" className='mb-3'>
                <tbody><tr>
                  <td width="1%">&nbsp;</td>
                  <td className="GameList" style={{verticalAlign: "top"}}>
                    <table width="99%" border="0" cellspacing="0" cellpadding="0">
                      <tbody><tr>
                        <td className="GameList" align="center">{item.match_datetime}</td>
                      </tr>
                        <tr>
                          <td className="GameList" align="center">Match Bets :0</td>
                        </tr>
                        <tr>
                          <td className="GameList" align="center">Session Bets : 0</td>
                        </tr>
                        <tr>
                          <td className="GameList" align="center">Declared : No</td>
                        </tr>
                        <tr>
                          <td className="GameList" align="center">Won By : </td>
                        </tr>
                      </tbody></table>
                  </td>
                  <td width="1%">&nbsp;</td>
                </tr>
                </tbody></table>
              </Link>
          </div>
          </div>
          </>
              )
            })}


        </div>
      </div>


      <Footer />

    </>
  );
}
