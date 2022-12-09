import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Draggable from "react-draggable";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
export const BetModal = ({
  open,
  setBet,
  handleClose,
  betData,
  bet_type,
  itemData,
  bet_ValueNum,
  game_id,
}) => {
  let token = localStorage.getItem("token");
  let header = { "x-access-token": `${token}` };
  let options = { headers: header };
  // function PaperComponent(props) {
  //   return (
  //     <Draggable
  //       handle="#draggable-dialog-title"
  //       cancel={'[class*="MuiDialogContent-root"]'}
  //     >
  //       <Paper {...props} />
  //     </Draggable>
  //   );
  // }
  // console.log("itemdata",itemData);
  const [session_id, setSessionId] = useState("");
  const [session_name, setSessionName] = useState("");
  const [session_no_run, setSessionNoRun] = useState("");
  const [session_no_rate, setSessionNoRate] = useState("");
  const [session_yes_run, setSessionYesRun] = useState("");
  const [session_yes_rate, setSessionYesRate] = useState("");
  const [finalBody, setFinalBody] = useState({
    isKhai: "",
    teamName: itemData.nat,
    matchId: game_id,
    marketId: "",
    marketName: "",
    marketType: "",
    stack: betData,
    odds: bet_ValueNum,
    profit: "",
    loss: "",
  });
  function chooseAMT(e, amt) {
    if (amt == 9770534045) {
      setBet("");
    } else {
      setBet(amt);
    }
  }
  async function myFunction() {
    console.log("itemData====", itemData);
    var betType = bet_type;
    // var match_id = game_id;
    var amount = betData;
    var coins = "500000";
    // var fixrate =  jis rate bet lagi he
    coins = parseInt(coins);
    // var first_team = first_team_name;
    // var second_team = second_team_name;
    var ayt_sesslgai_run12 = session_no_run;
    var ayt_sesslgai_rat12 = session_no_rate;
    var ayt_sesskhai_run12 = session_yes_run;
    var ayt_sesskhai_rat12 = session_yes_rate;

    betType == "khaai" ? (finalBody.isKhai = true) : (finalBody.isKhai = false);
    if (betType == "khaai" || betType == "lagai") {
      console.log("finalBody----------", finalBody);
      if (betType == "khaai") {
        finalBody.profit = (bet_ValueNum / 100) * amount;
        finalBody.loss = amount;
      } else {
        console.log("finalBody----------", finalBody);
        ////For lgaai loss profit calculation
        finalBody.loss = (bet_ValueNum / 100) * amount;
        finalBody.profit = amount;
      }
      if (betData < coins) {
        if (amount <= itemData.max && amount >= itemData.min) {
          return console.log("canll in siter");
          await axios
            .get("/game/getMatch_BM", options)
            .then(async (resp) => {
              if (resp.data) {
                var updateBhav = resp.data.bhavArr;
                if (updateBhav.b1 == bet_ValueNum) {
                  if (updateBhav.s == "ACTIVE") {
                    ///// final api call  here
                    return console.log("final body", finalBody);
                    await axios
                      .post("/betPlace", options)
                      .then(async (resp) => {
                        if (resp.status) {
                          toast.success(resp.massage);
                        } else {
                          toast.warning(resp.massage);
                        }
                      })
                      .catch((err) => {});
                  }
                } else {
                  toast.error("Value has been change");
                }
              }
            })
            .catch((err) => {
              toast.error("something went wrong");
            });
        } else {
          toast.error("Bet cannot be placed");
        }
      } else {
        toast.warning("insufficient coins or Amount");
      }
    }

    // if (ayt_sesslgai_run12 == "0" || ayt_sesskhai_run12 == "0") {
    //   toast("Ret has been changed.");
    // } else {
    //   if (bet_type == "session_yes" || bet_type == "session_no") {
    //     var sessionId = session_id;
    //     var ayt_sesslgai_run1 = session_no_run;
    //     var ayt_sesslgai_rat1 = session_no_rate;
    //     var ayt_sesskhai_run1 = session_yes_run;
    //     var ayt_sesskhai_rat1 = session_yes_rate;
    //     var min_l = 100; // ye aaega superadmin se
    //     var max_l = 1000000; //ye aaega superadmin se
    //     if (amount <= max_l && amount >= min_l) {
    //       if (bet_type == "session_yes") {
    //         var mode = "yes";
    //         var data_r = session_yes_rate;
    //       } else {
    //         var mode = "no";
    //         data_r = session_no_rate;
    //       }
    //       // var rate = session_rate aaega jispe bet lagi 50/100 100 is rate
    //       // var run = session_run jis run pr bet lagi he 50 is run
    //       if (mode == "yes") {
    //         var baseamt = "rate" * amount;
    //       } else {
    //         baseamt = amount;
    //       }
    //       if (coins >= baseamt && baseamt > 0) {
    //         // $.ajax({
    //         //     type: 'post',
    //         //     url: "<?php echo base_url('home/add_sess_bat_CHECK');?>",
    //         //     data: { match_id: match_id, bet_type: bet_type, session_name: session_name, session_id: session_id, amount: amount, rate: rate, mode: mode, run: run, ayt_sesslgai_run: ayt_sesslgai_run1, ayt_sesslgai_rat: ayt_sesslgai_rat1, ayt_sesskhai_run: ayt_sesskhai_run1, ayt_sesskhai_rat: ayt_sesskhai_rat1, data_r: data_r },
    //         //     success: function (resultC) {
    //         //         var resC = resultC;
    //         //         console.log(resC);
    //         //         if (resC == 2) {
    //         //             $.ajax({
    //         //                 type: 'post',
    //         //                 url: "<?php echo base_url('home/add_sess_bat');?>",
    //         //                 data: { match_id: match_id, bet_type: bet_type, session_name: session_name, session_id: session_id, amount: amount, rate: rate, mode: mode, run: run, ayt_sesslgai_run: ayt_sesslgai_run1, ayt_sesslgai_rat: ayt_sesslgai_rat1, ayt_sesskhai_run: ayt_sesskhai_run1, ayt_sesskhai_rat: ayt_sesskhai_rat1, data_r: data_r },
    //         //                 success: function (result) {
    //         //                     $("#session_rate_input").val('');
    //         //                     setTimeout(() => {
    //         //                         $.toast({
    //         //                             heading: 'Success',
    //         //                             text: 'Bet  Added Successful.',
    //         //                             showHideTransition: 'slide',
    //         //                             position: 'top-right',
    //         //                             icon: 'success'
    //         //                         });
    //         //                         setTimeout(() => { location.reload(); }, 150);
    //         //                     }, 100);
    //         //                 },
    //         //                 error: function (data) {
    //         //                     alert("fail");
    //         //                 }
    //         //             });
    //         //         }
    //         //         else {
    //         //             setTimeout(() => {
    //         //                 $.toast({
    //         //                     heading: 'failed',
    //         //                     text: 'Ret has been changed.',
    //         //                     showHideTransition: 'slide',
    //         //                     position: 'top-right',
    //         //                     icon: 'minus'
    //         //                 });
    //         //                 setTimeout(() => { location.reload(); }, 350);
    //         //             }, 200);
    //         //         }
    //         //     },
    //         //     error: function (data) {
    //         //         console.log(data);
    //         //         alert("fail");
    //         //     }
    //         // });
    //       } else {
    //         setBet(" ");
    //         toast({
    //           heading: "failed",
    //           text: "insufficient coins or Amount",
    //         });
    //       }
    //     } else {
    //       setBet(" ");
    //       toast({
    //         heading: "failed",
    //         text: "Min " + min_l + " and Max " + max_l,
    //         showHideTransition: "slide",
    //         position: "top-right",
    //         icon: "minus",
    //       });
    //     }
    //   }
    //   // else {
    //   // if (amount <= $match_data[0]  match_table_max;?> && amount >=<?= $match_data[0] -> match_table_min;?> ) {
    //   //     if (bet_type == 'first_khai') {
    //   //         var pos = $("#first_position").html();
    //   //         var rate = $("#first_khai_input").val();
    //   //         var mode = 'khai';
    //   //         var fav_team = '<?=$match_data[0]->first_team_id ?>';
    //   //     } else if (bet_type == 'first_lgai') {
    //   //         var pos = $("#second_position").html();
    //   //         var mode = 'lagai';
    //   //         var rate = $("#first_lgai_input").val();
    //   //         var fav_team = '<?=$match_data[0]->first_team_id ?>';
    //   //     } else if (bet_type == 'second_khai') {
    //   //         var pos = $("#second_position").html();
    //   //         var mode = 'khai';
    //   //         var rate = $("#second_khai_input").val();
    //   //         var fav_team = '<?=$match_data[0]->second_team_id ?>';
    //   //     } else if (bet_type == 'second_lgai') {
    //   //         var pos = $("#first_position").html();
    //   //         var mode = 'lagai';
    //   //         var rate = $("#second_lgai_input").val();
    //   //         var fav_team = '<?=$match_data[0]->second_team_id ?>';
    //   //     }
    //   //     if (mode == 'khai') {
    //   //         if (pos > 0) {
    //   //             var baseamt = rate * amount - pos;
    //   //         } else {
    //   //             var baseamt = rate * amount;
    //   //         }
    //   //     } else {
    //   //         if (pos > 0) {
    //   //             var baseamt = amount - pos;
    //   //         } else {
    //   //             var baseamt = amount;
    //   //         }
    //   //     }

    //   //     if (coins >= baseamt && amount > 0) {

    //   //         $.ajax({
    //   //             type: 'post',
    //   //             url: "<?php echo base_url('home/add_bat_sec');?>",
    //   //             data: { match_id: match_id, bet_type: bet_type, second_team: second_team, first_team: first_team, amount: amount, fav_team: fav_team, rate: fixrate, mode: mode },
    //   //             success: function (resultC) {
    //   //                 var resC = resultC;
    //   //                 if (resC != 2) {
    //   //                     $("#rate_input").val('');
    //   //                     console.log(resultC);
    //   //                     setTimeout(() => {
    //   //                         $.toast({
    //   //                             heading: 'Success',
    //   //                             text: 'Bet  Added Successful.',
    //   //                             showHideTransition: 'slide',
    //   //                             position: 'top-right',
    //   //                             icon: 'success'
    //   //                         });
    //   //                         setTimeout(() => { location.reload(); }, 350);

    //   //                     }, 200);
    //   //                 } else {
    //   //                     $("#rate_input").val('');
    //   //                     setTimeout(() => {
    //   //                         console.log(resultC);
    //   //                         $.toast({
    //   //                             heading: 'failed',
    //   //                             text: 'Bet  not place.',
    //   //                             showHideTransition: 'slide',
    //   //                             position: 'top-right',
    //   //                             icon: 'warning'
    //   //                         });
    //   //                         setTimeout(() => { location.reload(); }, 350);

    //   //                     }, 200);
    //   //                 }

    //   //             },
    //   //             error: function (data) {
    //   //                 console.log(data);
    //   //                 alert("failed");
    //   //             }
    //   //         });
    //   //     } else {
    //   //         $('#donebtnS').prop("disabled", false);
    //   //         //  alert('insufficient coins or Amount');
    //   //         $("#rate_input").val('');
    //   //         $.toast({
    //   //             heading: 'failed',
    //   //             text: 'insufficient coins or Amount',
    //   //             showHideTransition: 'slide',
    //   //             position: 'top-right',
    //   //             icon: 'minus'
    //   //         });
    //   //     }
    //   // } else {
    //   //     $('#donebtnS').prop("disabled", false);
    //   //     // alert('Min <?=$match_data[0]->match_table_min;?> and Max <?=$match_data[0]->match_table_max;?>');
    //   //     $.toast({
    //   //         heading: 'failed',
    //   //         text: 'Min <?=$match_data[0]->match_table_min;?> and Max <?=$match_data[0]->match_table_max;?>',
    //   //         showHideTransition: 'slide',
    //   //         position: 'top-right',
    //   //         icon: 'minus'
    //   //     });
    //   // }
    //   // }
    // }
  }
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        style={{ minWidth: "100% !important", maxHeight: "100%" }}
        // PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          Subscribe
        </DialogTitle>
        <DialogContent className="d-flex">
          <div class="ayt_modal-content d-flex">
            <div class="table text-center" border="0">
              <div style={{ padding: "0 !important" }}></div>
              <br />
              <div class="customamount">
                <span onClick={(e) => chooseAMT(e, 100)}>100</span>
                <span onClick={(e) => chooseAMT(e, 500)}>500</span>
                <span onClick={(e) => chooseAMT(e, 1000)}>1K</span>
                <span onClick={(e) => chooseAMT(e, 2000)}>2K</span>
                <span onClick={(e) => chooseAMT(e, 3000)}>3K</span>
                <span onClick={(e) => chooseAMT(e, 5000)}>5K</span>
                <span onClick={(e) => chooseAMT(e, 6000)}>6K</span>
                <span onClick={(e) => chooseAMT(e, 10000)}>10k</span>
                <span onClick={(e) => chooseAMT(e, 25000)}>25K</span>
                <span onClick={(e) => chooseAMT(e, 50000)}>50K</span>
                <span
                  onClick={(e) => chooseAMT(e, 9770534045)}
                  style={{ background: "#e26f7e" }}
                >
                  CLEAR
                </span>
              </div>
              <br />
              <div
                class="m_input"
                style={{
                  padding: "20px !important",
                  width: "100%",
                  float: "left",
                  border: "1px solid #ccc",
                }}
              >
                <input
                  type="number"
                  name="betvalue"
                  value={betData}
                  placeholder="AMOUNT"
                  id="amount"
                  style={{
                    width: "100%",
                    float: "left",
                    padding: "6px",
                    borderRadius: "4px",
                  }}
                  onChange={(e) => setBet(e.target.value)}
                />
              </div>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          {/* autoFocus */}
          <Button onClick={handleClose}>Cancel</Button>

          <Button disabled={!betData} onClick={myFunction}>
            Place Bet
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
