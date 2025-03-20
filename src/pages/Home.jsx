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
                    <a href="https://bearhacks2025.devpost.com" target="_blank" ref={buttonRef}>Apply Now</a>
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
        </>
    );
};

export default Home;