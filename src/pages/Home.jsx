import styles from "@css/home.module.css";
import HeroSketch from "@p5/HeroSketch";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import hero_background from "@assets/images/hero_background.svg";
import hero_foreground from "@assets/images/hero_foreground.svg";

import perplexity from "@assets/images/sponsor_logos/perplexity_logo.svg";
import gdg from "@assets/images/sponsor_logos/gdg_logo.svg";
import scotiabank from "@assets/images/sponsor_logos/scotiabank_logo.svg";
import incogni from "@assets/images/sponsor_logos/incogni_logo.svg";
import nord_vpn from "@assets/images/sponsor_logos/nordvpn_logo.svg";
import nord_pass from "@assets/images/sponsor_logos/nordpass_logo.svg";
import saily from "@assets/images/sponsor_logos/saily_logo.svg";
import balsamiq from "@assets/images/sponsor_logos/balsamiq_logo.svg";
import typst from "@assets/images/sponsor_logos/typst_logo.svg";
import xyz from "@assets/images/sponsor_logos/xyz_logo.svg";

import faq_header from "@assets/images/faq_header.svg";
import random_honeycomb from "@assets/images/random_honeycomb.svg";

const milliInDay = 1000*60*60*24;
const milliInHour = 1000*60*60;
const milliInMinute = 1000*60;
const milliInSecond = 1000;

const Countdown = () => {
    const targetDate = new Date("Fri, 28 Mar 2025 21:00:00 GMT");
    const [timeToDate, setTimeToDate] = useState(getTimeToDate(targetDate));

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeToDate(getTimeToDate(targetDate))
        }, 1000);

        return () => clearInterval(interval);
    }, [])

    function getTimeToDate(date) {
        let diff = date - new Date();
        if (diff <= 0){
            return {days: 0, hours: 0, minutes: 0, seconds: 0};
        }
        let days = Math.trunc(diff/milliInDay);
        diff = diff%milliInDay;
        let hours = Math.trunc(diff/milliInHour);
        diff = diff%milliInHour;
        let minutes = Math.trunc(diff/milliInMinute);
        diff = diff%milliInMinute;
        let seconds = Math.trunc(diff/milliInSecond);

        return {
            days,
            hours,
            minutes,
            seconds
        }
    }

    return (
        <div id={styles.countdown}>
            {/* DAYS */}
            <div className={styles.time_scale}>
                <div className={styles.countdown_pair}>
                    <h1>{Math.trunc(timeToDate.days/10)}<span>0</span></h1>
                    <h1>{timeToDate.days%10}<span>0</span></h1>
                </div>
                <p>DAYS</p>
            </div>
            <h1>:</h1>
            {/* HOURS */}
            <div className={styles.time_scale}>
                <div className={styles.countdown_pair}>
                    <h1>{Math.trunc(timeToDate.hours/10)}<span>0</span></h1>
                    <h1>{timeToDate.hours%10}<span>0</span></h1>
                </div>
                <p>HOURS</p>
            </div>
            <h1>:</h1>
            {/* MINUTES */}
            <div className={styles.time_scale}>
                <div className={styles.countdown_pair}>
                    <h1>{Math.trunc(timeToDate.minutes/10)}<span>0</span></h1>
                    <h1>{timeToDate.minutes%10}<span>0</span></h1>
                </div>
                <p>MINUTES</p>
            </div>
            <h1>:</h1>
            {/* SECONDS */}
            <div className={styles.time_scale}>
                <div className={styles.countdown_pair}>
                    <h1>{Math.trunc(timeToDate.seconds/10)}<span>0</span></h1>
                    <h1>{timeToDate.seconds%10}<span>0</span></h1>
                </div>
                <p>SECONDS</p>
            </div>
        </div>
    );
}

const FAQ = ({question, answer}) => {
    const [toggled,  setToggled] = useState(false);

    return (
        <div className={styles.faq}>
            <div className={styles.question_container}>
                <h3 className={styles.question}>{question}</h3>
                <div className={styles.faq_toggle} onClick={() => setToggled(!toggled)} data-toggled={toggled}>
                    <div className={styles.horizontal}></div>
                    <div className={styles.vertical}></div>
                </div>
            </div>
            <p className={`${styles.answer} ${toggled ? styles.toggled: ''}`}>{answer}</p>
        </div>
    );
}

const Home = () => {
    const buttonRef = useRef();
    const [buttonLoaded, setButtonLoaded] = useState(false);

    useEffect(() => {
        if (buttonRef.current){
            setButtonLoaded(true);
        }
    }, [buttonRef.current])
    return (
        <>
                {/* {buttonLoaded && <HeroSketch button={buttonRef.current}/>} */}
            <section id={styles.hero_section}>
                <div id={styles.hero_container}>
                    <div id={styles.hero_header}>
                        <h1>BearHacks 2025</h1>
                        <p>Sheridan’s first hybrid hackathon — <strong>March 28-30 @ HMC campus</strong></p>
                    </div>
                    <a href="https://forms.gle/BaQ8qmwdyswubvnf6" target="_blank" ref={buttonRef}>Apply Now</a>
                </div>
            </section>
            <section id={styles.countdown_section}>
                <div id={styles.countdown_container}>
                    {/* <img src="" alt="" /> */}
                    <div>
                        <div>
                            <Countdown />
                        </div>
                    </div>
                </div>
            </section>
            <section id={styles.breakdown_section}>
                <h1>WINNER BREAKDOWN</h1>
                <div id={styles.podium_container}>
                    <div className={styles.podium}>
                        <div className={styles.podium_content}>
                            <h3>$$$</h3>
                            <p></p>
                        </div>
                        <img src={random_honeycomb} alt="" />
                        <div className={styles.placing}><h2>01</h2></div>
                    </div>
                    <div className={styles.podium}>
                        <div className={styles.podium_content}>
                            <h3>$$$</h3>
                            <p></p>
                        </div>
                        <img src={random_honeycomb} alt="" />
                        <div className={styles.placing}><h2>02</h2></div>
                    </div>
                    <div className={styles.podium}>
                        <div className={styles.podium_content}>
                            <h3>$$$</h3>
                            <p></p>
                        </div>
                        <img src={random_honeycomb} alt="" />
                        <div className={styles.placing}><h2>03</h2></div>
                    </div>
                    
                </div>
            </section>
            <section id={styles.sponsor_section}>
                <div id={styles.sponsor_container}>
                    <h1 id={styles.sponsor_caption}>OUR SPONSORS</h1>
                    <div id={styles.sponsor_logos}>
                        <Link to="https://www.perplexity.ai/" target="_blank"><img src={perplexity} alt="" /></Link>
                        <Link to="https://gdg.community.dev/gdg-on-campus-sheridan-college-trafalgar-road-campus-oakville-canada/" target="_blank"><img src={gdg} alt="" /></Link>
                        <Link to="https://scotiabank.com/" target="_blank"><img src={scotiabank} alt="" /></Link>
                        <Link to="https://incogni.com/" target="_blank"><img src={incogni} alt="" /></Link>
                        <Link to="https://nordvpn.com/" target="_blank"><img src={nord_vpn} alt="" /></Link>
                        <Link to="https://nordpass.com/" target="_blank"><img src={nord_pass} alt="" /></Link>
                        <Link to="https://saily.com/" target="_blank"><img src={saily} alt="" /></Link>
                        <Link to="https://balsamiq.com/" target="_blank"><img src={balsamiq} alt="" /></Link>
                        <Link to="https://typst.app/" target="_blank"><img src={typst} alt="" /></Link>
                        <Link to="https://gen.xyz/" target="_blank"><img src={xyz} alt="" /></Link>
                        {/* <Link to="https://www.thessu.ca/" target="_blank"><img src={xyz} alt="" /></Link> */}
                    </div>
                </div>
            </section>
            <section id={styles.faq_section}>
                <div id={styles.faq_container}>
                    <img src={faq_header} alt="FAQ | BearHacks" />
                    <h1>FREQUENTLY ASKED QUESTIONS</h1>
                    <div id={styles.faq_list_container}>
                        <ul className={styles.faq_list}>
                            <li><FAQ question={'When is BearHacks happening?'} answer={'The registration starts at 5 pm on March 28th for in-person participants. We kindly ask you to be there by 7:30!'}/></li>
                            <li><FAQ question={'Where are you located?'} answer={'HMC campus, 1st, 3rd, and 5th floors of the C building. It\'s the one closer to the Cineplex!'}/></li>
                            <li><FAQ question={'Will there be food?'} answer={'Yes! We will have some meals and snacks, but we encourage you to bring some with you as well.'}/></li>
                            <li><FAQ question={'What should I bring?'} answer={'Bring your laptop, charger, any hardware you plan to use, and a willingness to learn and collaborate!'}/></li>
                            <li><FAQ question={'What is a hackathon?'} answer={'A hackathon is an event where people engage in rapid and collaborative engineering over a relatively short period of time, such as 24 or 48 hours.'}/></li>
                        </ul>
                        <ul className={styles.faq_list}>
                            <li><FAQ question={'Do I need to know how to code?'} answer={'It\'s completely fine if you\'ve never coded before! BearHacks accepts students of all coding skill levels. Learn how to code, design or even play golf through our workshops or ask a mentor for help!'}/></li>
                            <li><FAQ question={'What can I make?'} answer={'Your project can be software or hardware, and will be considered for the win as long as it aligns with the theme. The theme will be announced during the opening ceremony.'}/></li>
                            <li><FAQ question={'How will our submissions be judged?'} answer={'The judging will happen fully online. By 10 am on Sunday you will need to submit your project on Devpost (a platform for hackathon submissions). The submission should include the description of your project and a recorded demo. Make sure your demo is good - judges will pay close attention to it!'}/></li>
                            <li><FAQ question={'Do I need to come in person to for the workshops?'} answer={'The workshops will be held in person, with live streaming online. You can join by getting the link in our discord server!'}/></li>
                            <li><FAQ question={'Can anyone who is not from Sheridan College come?'} answer={'Unfortunately, all non-Sheridan students can only join online.'}/></li>
                        </ul>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Home;