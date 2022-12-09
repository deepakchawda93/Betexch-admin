import React from 'react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import Footer from './Components/Footer';

export default function Welcome() {
    useEffect(() => {
        document.body.classList.add('modal-open');
    }, [])

    const openModal = (e) => {
        document.body.classList.remove('modal-open');
    }
    return (
        <>
            <div id="myModal" className="modal">

                <div className="modal-content2">
                    <div className="modal-header1">
                        <span class="close" onClick={(e) => openModal()}>×</span>

                        <center><h2>&nbsp;&nbsp;&nbsp;Welcome To</h2></center>
                        <center><h2><b><span style={{ color: "white" }}>99EXCH</span></b></h2></center>
                    </div>
                    <div className="modal-body1">
                        <p style={{ color: "#0000A0" }} align="center"></p>
                    </div>
                    <div className="modal-footer2">
                        <center><h3>Thanks For Visiting Our Site</h3></center>

                    </div>
                </div>
            </div>

            <div className='' style={{ backgroundColor: "#E9E9E9" }} >
                <div className='container-fluid'>
                    <div className="wrap">

                        <div className="content_top">
                            <div className="content_top-grid3"></div>
                            <div className="clear"> </div>
                        </div>
                        <div className="skills">
                            <center> <h4 align="center" className="welcomeh4">
                                Terms &amp; Conditions
                            </h4></center>
                        </div>
                        <br />
                        <div className="drag_drop">
                            <h4 align="left">1. लोगिन करने के बाद अपना पासवर्ड बदल लें। </h4>
                            <h4 align="left">2. प्रत्येक गेम के लिए 100/- Coins चार्ज और टेस्ट गेम में प्रतिदिन 100/- coins चार्ज रहेगा।</h4>
                            <h4 align="left">3. गेम रद्द होने या टाई होने पर मैच के सभी सौदे रद्द माने जायेंगे और जो सेशन पुरे हो चुके हे, उनके हिसाब से ही Coins कम या ज्यादा होंगे । </h4>
                            <h4 align="left">4. मैच के दौरान भाव को देख व समझ के ही सौदा करे। किये गए किसी भी सौदे को हटाया या बदला नहीं जाएगा। सभी सौदे के लिए स्वयं आप ही जिम्मेदार होंगे।</h4>
                            <h4 align="left">5. मैच या सेशन भाव गलत चलने पर जो भी मैच या सेशन के सौदे हुए हे वह स्वतः हट जायेंगे।</h4>
                            <h4 align="left">6. मैच में जो सेशन कम्पलीट होंगे सिर्फ उनके हिसाब से कॉइन कम या ज्यादा होंगे और जो सेशन कम्पलीट नहीं हुए है बो सारे सेशन रद्द हो जाएंगे|</h4>
                            <h4 align="left">7. मैच मैं ओवर कम होने पर एडवांस सेसन फैंसी कैंसल हो जाएंगी|</h4>
                            <h4 align="left">8. मैच में ओवर कम होने पर अगर सेम टीम दुबारा खेलने के लिए आती है तो जो रनिंग में प्लेयर के रन और पार्टनरशीप डिक्लेयर होगी। अगर ओवर कम होने पर दूसरी टीम खेलने के लिए आती है तो जो रनिंग में प्लेयर रन, पार्टनरशीप रद्द हो जाएंगे</h4>
                            <h4 align="left">9. प्लेयर के रिटायर्ड हर्ट या इंजर्ड होने पर प्लेयर के रन रद्द माने जाएंगे| अगर बो प्लेयर दुबारा खेलने के लिए आता है तो उसके रन डिक्लेअर कर दिए जायेंगे|</h4>
                            <h4 align="left">10. सेशन को डिक्लेअर और कैंसिल करने के लिए कंपनी का निर्णय अन्तिम होगा| ऐसी स्थिति में किसी भी तरह का वाद-विवाद मान्य नहीं होगा|</h4>
                            <h4 align="left">11. टेस्ट में पारी डिक्लेअर होने पर जो सेशन रनिंग में हे उस सेशन को डिक्लेअर करने के लिए दूसरी टीम के ओवर या बॉल काउंट किये जायेंगे|</h4>
                            <h4 align="left">नोट : सर्वर या वेबसाईट में किसी तरह की खराबी आने या बंद हो जाने पर केवल किये गए सौदे ही मान्य होंगे। ऐसी स्थिति में किसी भी तरह का वाद-विवाद मान्य नहीं होगा।</h4>
                        </div>
                        <br />
                        <Link to="/MainMenu" style={{ color: "#FFFFFF", textDecoration: "underline" }}><div className="skills">
                            <center> <h4 align="center" className="welcomeh4">
                                Continue
                            </h4></center>
                        </div></Link>
                        <div className="content_bottom">
                            <div className="clear"></div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />


        </>
    );
}