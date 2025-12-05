import styles from "@css/home.module.css";
import HeroSketch from "@p5/HeroSketch";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import CircularGallery from "@components/CircularGallery";
// import hero_background from "@assets/images/hero_background.svg";
// import hero_foreground from "@assets/images/hero_foreground.svg";

import bear_praying from "@assets/images/hero/bear_praying.PNG";
import bear_sleeping from "@assets/images/hero/bear_sleeping.PNG";
import jesus_bear from "@assets/images/hero/jesus_bear.PNG";
import bear_thinking from "@assets/images/hero/bear_thinking.PNG";
import solid_bear from "@assets/images/hero/solid_bear.PNG";
import hero_background from "@assets/images/hero/background.png";
import hero_foreground from "@assets/images/hero/updated_fg.png";
import honey_foreground from "@assets/images/hero/honey_foreground.png";
import clock from "@assets/images/hero/clock.png";

import first_place_cash_perks from "@assets/images/breakdown/first_place_cash_perks.png";
import first_place_career from "@assets/images/breakdown/scotiabank_digital.jpg";
import recognition from "@assets/images/breakdown/recognition.svg";
import cash_icon from "@assets/images/breakdown/cash_icon.svg";
import networking_icon from "@assets/images/breakdown/networking_icon.svg";
import recognition_icon from "@assets/images/logos/logo_icon.svg";

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
import indesignn from "@assets/images/sponsor_logos/indesignn_logo.svg";
import royalblue from "@assets/images/sponsor_logos/royalblue_logo.svg";
import gongcha from "@assets/images/sponsor_logos/gong_cha_logo.png";
import la_carnita from "@assets/images/sponsor_logos/la_carnita_logo.png";
import bearhacks_logo_icon from "@assets/images/logos/icon.svg";
import vitos from "@assets/images/sponsor_logos/vitos_logo.png";
import rabba_logo from "@assets/images/sponsor_logos/rabba_logo.png";
import icp from "@assets/images/sponsor_logos/icp_logo.png";

import faq_header from "@assets/images/faq_header.png";

import adam from "@assets/images/team/bh_adam.jpeg";
import ahmed from "@assets/images/team/bh_ahmed.jpeg";
import aleks from "@assets/images/team/bh_aleks.jpeg";
import aman from "@assets/images/team/bh_aman.jpeg";
import anya from "@assets/images/team/bh_anya.jpeg";
import connor from "@assets/images/team/bh_connor.jpeg";
import iman from "@assets/images/team/bh_iman.png";
import jon from "@assets/images/team/bh_jon.png";
import rishin from "@assets/images/team/bh_rishin.jpeg";
import sebastian from "@assets/images/team/bh_sebastian.jpeg";
import taimoor from "@assets/images/team/bh_taimoor.png";
import vidhi from "@assets/images/team/bh_vidhi.jpeg";
import william from "@assets/images/team/bh_william.jpeg";

const milliInDay = 1000 * 60 * 60 * 24;
const milliInHour = 1000 * 60 * 60;
const milliInMinute = 1000 * 60;
const milliInSecond = 1000;

const teamMembers = [
    { image: aleks, name: 'Aleks', role: 'Co-Director' },
    { image: taimoor, name: 'Taimoor', role: 'Co-Director' },
    { image: adam, name: 'Adam', role: 'Organizer' },
    { image: ahmed, name: 'Ahmed', role: 'Organizer' },
    { image: aman, name: 'Aman', role: 'Organizer' },
    { image: anya, name: 'Anya', role: 'Organizer' },
    { image: connor, name: 'Connor Uhrig', role: 'Organizer' },
    { image: iman, name: 'Iman', role: 'Organizer' },
    { image: jon, name: 'Jon', role: 'Organizer' },
    { image: rishin, name: 'Rishin', role: 'Organizer' },
    { image: sebastian, name: 'Sebastian', role: 'Organizer' },
    { image: vidhi, name: 'Vidhi', role: 'Organizer' },
    { image: william, name: 'William', role: 'Organizer' }
 ];

const Countdown = () => {
    const targetDate = new Date("Fri, 24 April 2026 21:00:00 GMT");
    const [timeToDate, setTimeToDate] = useState(getTimeToDate(targetDate));

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeToDate(getTimeToDate(targetDate))
        }, 1000);

        return () => clearInterval(interval);
    }, [])

    function getTimeToDate(date) {
        let diff = date - new Date();
        if (diff <= 0) {
            return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }
        let days = Math.trunc(diff / milliInDay);
        diff = diff % milliInDay;
        let hours = Math.trunc(diff / milliInHour);
        diff = diff % milliInHour;
        let minutes = Math.trunc(diff / milliInMinute);
        diff = diff % milliInMinute;
        let seconds = Math.trunc(diff / milliInSecond);

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
                    <h1>{Math.trunc(timeToDate.days / 10)}<span>0</span></h1>
                    <h1>{timeToDate.days % 10}<span>0</span></h1>
                </div>
                <p>DAYS</p>
            </div>
            <h1>:</h1>
            {/* HOURS */}
            <div className={styles.time_scale}>
                <div className={styles.countdown_pair}>
                    <h1>{Math.trunc(timeToDate.hours / 10)}<span>0</span></h1>
                    <h1>{timeToDate.hours % 10}<span>0</span></h1>
                </div>
                <p>HOURS</p>
            </div>
            <h1>:</h1>
            {/* MINUTES */}
            <div className={styles.time_scale}>
                <div className={styles.countdown_pair}>
                    <h1>{Math.trunc(timeToDate.minutes / 10)}<span>0</span></h1>
                    <h1>{timeToDate.minutes % 10}<span>0</span></h1>
                </div>
                <p>MINUTES</p>
            </div>
            <h1>:</h1>
            {/* SECONDS */}
            <div className={styles.time_scale}>
                <div className={styles.countdown_pair}>
                    <h1>{Math.trunc(timeToDate.seconds / 10)}<span>0</span></h1>
                    <h1>{timeToDate.seconds % 10}<span>0</span></h1>
                </div>
                <p>SECONDS</p>
            </div>
        </div>
    );
}

const FAQ = ({ question, answer }) => {
    const [toggled, setToggled] = useState(false);

    return (
        <div className={styles.faq}> {/*onMouseEnter={() => setToggled(true)} onMouseLeave={() => setToggled(false)} */}
            <div className={styles.question_container} onClick={() => setToggled(!toggled)}>
                <h3 className={styles.question}>{question}</h3>
                <div className={styles.faq_toggle} data-toggled={toggled}>
                    <div className={styles.horizontal}></div>
                    <div className={styles.vertical}></div>
                </div>
            </div>
            <div className={`${styles.answer_wrapper} ${toggled ? styles.toggled : ''}`}>
                <p className={styles.answer}>{answer}</p>
            </div>
        </div>
    );
}

const PrizeCard = ({ icon, title, description, img }) => {
    return (
        <div className={styles.prize_card}>
            <div className={styles.prize_icon}>
                <img src={icon} />
            </div>
            <h3 className={styles.prize_title}>{title}</h3>
            <p className={styles.prize_description}>{description}</p>
            <div className={styles.prize_img_container}>
                <img src={img} className={styles.prize_img} />
            </div>
        </div>
    );
}

const Home = () => {
    const buttonRef = useRef();
    const [buttonLoaded, setButtonLoaded] = useState(false);
    const [bearHovered, setBearHovered] = useState(-1);
    const [breakdownIndex, setBreakdownIndex] = useState(0);
    const timeoutRef = useRef(null);

    useEffect(() => {
        if (buttonRef.current) {
            setButtonLoaded(true);
        }
    }, [buttonRef.current])

    useEffect(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
        }
        timeoutRef.current = setTimeout(() => {
            setBreakdownIndex((breakdownIndex + 1) % 3)
        }, 8000)
    }, [breakdownIndex])

    return (
        <>
            <section id={styles.hero_section}>
                {buttonLoaded && <HeroSketch button={buttonRef.current} />}
                {/* Decorative hexagons */}
                <div className={styles.hexagon_bg}>
                    {/* Left strand 1 - emerges from top, flows down-right */}
                    <svg className={styles.hexagon} style={{left: '10px', top: '-50px'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 104">
                        <polygon points="30,0 90,0 120,52 90,104 30,104 0,52" />
                    </svg>
                    <svg className={styles.hexagon} style={{left: '10px', top: '54px'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 104">
                        <polygon points="30,0 90,0 120,52 90,104 30,104 0,52" />
                    </svg>
                    <svg className={styles.hexagon} style={{left: '100px', top: '106px'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 104">
                        <polygon points="30,0 90,0 120,52 90,104 30,104 0,52" />
                    </svg>
                    <svg className={styles.hexagon} style={{left: '190px', top: '158px'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 104">
                        <polygon points="30,0 90,0 120,52 90,104 30,104 0,52" />
                    </svg>
                    
                    {/* Left strand 2 - emerges from left, flows right */}
                    <svg className={styles.hexagon} style={{left: '-60px', top: '270px', animationDelay: '0s'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 104">
                        <polygon points="30,0 90,0 120,52 90,104 30,104 0,52" />
                    </svg>
                    <svg className={styles.hexagon} style={{left: '30px', top: '322px', animationDelay: '0.5s'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 104">
                        <polygon points="30,0 90,0 120,52 90,104 30,104 0,52" />
                    </svg>
                    <svg className={styles.hexagon} style={{left: '120px', top: '374px', animationDelay: '1s'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 104">
                        <polygon points="30,0 90,0 120,52 90,104 30,104 0,52" />
                    </svg>
                    <svg className={styles.hexagon} style={{left: '210px', top: '322px', animationDelay: '1.5s'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 104">
                        <polygon points="30,0 90,0 120,52 90,104 30,104 0,52" />
                    </svg>
                    
                    {/* Left strand 3 - emerges from bottom, flows up-right */}
                    <svg className={styles.hexagon} style={{left: '20px', top: '600px'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 104">
                        <polygon points="30,0 90,0 120,52 90,104 30,104 0,52" />
                    </svg>
                    <svg className={styles.hexagon} style={{left: '110px', top: '548px'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 104">
                        <polygon points="30,0 90,0 120,52 90,104 30,104 0,52" />
                    </svg>
                    <svg className={styles.hexagon} style={{left: '200px', top: '496px'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 104">
                        <polygon points="30,0 90,0 120,52 90,104 30,104 0,52" />
                    </svg>
                    
                    {/* Right strand 1 - emerges from top, flows down-left */}
                    <svg className={styles.hexagon} style={{right: '10px', top: '-50px'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 104">
                        <polygon points="30,0 90,0 120,52 90,104 30,104 0,52" />
                    </svg>
                    <svg className={styles.hexagon} style={{right: '10px', top: '54px'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 104">
                        <polygon points="30,0 90,0 120,52 90,104 30,104 0,52" />
                    </svg>
                    <svg className={styles.hexagon} style={{right: '100px', top: '106px'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 104">
                        <polygon points="30,0 90,0 120,52 90,104 30,104 0,52" />
                    </svg>
                    <svg className={styles.hexagon} style={{right: '190px', top: '158px'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 104">
                        <polygon points="30,0 90,0 120,52 90,104 30,104 0,52" />
                    </svg>
                    
                    {/* Right strand 2 - emerges from right, flows left */}
                    <svg className={styles.hexagon} style={{right: '-60px', top: '280px', animationDelay: '0s'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 104">
                        <polygon points="30,0 90,0 120,52 90,104 30,104 0,52" />
                    </svg>
                    <svg className={styles.hexagon} style={{right: '30px', top: '332px', animationDelay: '0.5s'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 104">
                        <polygon points="30,0 90,0 120,52 90,104 30,104 0,52" />
                    </svg>
                    <svg className={styles.hexagon} style={{right: '120px', top: '384px', animationDelay: '1s'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 104">
                        <polygon points="30,0 90,0 120,52 90,104 30,104 0,52" />
                    </svg>
                    <svg className={styles.hexagon} style={{right: '210px', top: '332px', animationDelay: '1.5s'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 104">
                        <polygon points="30,0 90,0 120,52 90,104 30,104 0,52" />
                    </svg>
                    
                    {/* Right strand 3 - emerges from bottom, flows up-left */}
                    <svg className={styles.hexagon} style={{right: '30px', top: '600px'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 104">
                        <polygon points="30,0 90,0 120,52 90,104 30,104 0,52" />
                    </svg>
                    <svg className={styles.hexagon} style={{right: '120px', top: '548px'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 104">
                        <polygon points="30,0 90,0 120,52 90,104 30,104 0,52" />
                    </svg>
                    <svg className={styles.hexagon} style={{right: '210px', top: '496px'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 104">
                        <polygon points="30,0 90,0 120,52 90,104 30,104 0,52" />
                    </svg>
                </div>
                <div id={styles.hero_container}>
                    <div id={styles.hero_header}>
                        <h1>BearHacks 2026</h1>
                        <p>Sheridan’s annual hybrid hackathon, for students all across the GTA<br/>April 24-26th — more details coming soon! 🐻</p>
                    </div>
                    <a id={styles.hero_button} href="https://forms.gle/Mog1WCJvhAxCpPU77" target="_blank" ref={buttonRef}>Stay up to Date</a>
                    <p className={styles.sponsor_note}>Interested in sponsoring? Email us at <a href="mailto:bearhacks2026@gmail.com" target="_blank">bearhacks2026@gmail.com</a></p>
                </div>
            </section>
            <section id={styles.countdown_section}>
                <div id={styles.countdown_container}>
                    <div id={styles.last_supper}>
                        <img src={hero_background} alt="" id={styles.hero_background} />
                        <div id={styles.bear_praying} onMouseEnter={() => setBearHovered(0)} onMouseLeave={() => setBearHovered(-1)}>
                            <img src={bear_praying} alt="" className={styles.bear_img} />
                        </div>
                        <div id={styles.mentors_tooltip} className={`${styles.tooltip} ${bearHovered == 0 ? styles.active : ''}`}>
                            <h3>MENTORS</h3>
                            <p>Get access to developer and design mentors on the Discord on your 36-hour hacking journey.</p>
                        </div>
                        <div id={styles.bear_sleeping} onMouseEnter={() => setBearHovered(1)} onMouseLeave={() => setBearHovered(-1)}>
                            <img src={bear_sleeping} alt="" className={styles.bear_img} />
                        </div>
                        <div id={styles.hybrid_tooltip} className={`${styles.tooltip} ${bearHovered == 1 ? styles.active : ''}`}>
                            <h3>HYBRID EVENT</h3>
                            <p>Hack from the comfort of your own home, or in-person if you’ve been accepted!</p>
                        </div>
                        <div id={styles.jesus_bear} onMouseEnter={() => setBearHovered(2)} onMouseLeave={() => setBearHovered(-1)}>
                            <img src={jesus_bear} alt="" className={styles.bear_img} />
                        </div>
                        <div id={styles.support_tooltip} className={`${styles.tooltip} ${bearHovered == 2 ? styles.active : ''}`}>
                            <h3>SUPPORT TICKETS</h3>
                            <p>Having trouble? Open a support ticket on the discord and our online support will be there to assist you!</p>
                        </div>
                        <div id={styles.bear_thinking} onMouseEnter={() => setBearHovered(3)} onMouseLeave={() => setBearHovered(-1)}>
                            <img src={bear_thinking} alt="" className={styles.bear_img} />
                        </div>
                        <div id={styles.creative_tooltip} className={`${styles.tooltip} ${bearHovered == 3 ? styles.active : ''}`}>
                            <h3>GET CREATIVE</h3>
                            <p>Got a new app idea? Check out our sponsors and prize tracks to win big while trying out new tech.</p>
                        </div>
                        <div id={styles.solid_bear} onMouseEnter={() => setBearHovered(4)} onMouseLeave={() => setBearHovered(-1)}>
                            <img src={solid_bear} alt="" className={styles.bear_img} />
                        </div>
                        <div id={styles.team_tooltip} className={`${styles.tooltip} ${bearHovered == 4 ? styles.active : ''}`}>
                            <h3>FORM A TEAM</h3>
                            <p>Feeling lost and need a team? Our networking booths and team-finding channels on the Discord can help!</p>
                        </div>
                        <img src={hero_foreground} alt="" id={styles.hero_foreground} />
                        <img src={clock} alt="" id={styles.clock} />
                        <img src={honey_foreground} alt="" id={styles.honey_foreground} />
                        <Countdown />
                    </div>
                </div>
            </section>
            <section id={styles.breakdown_section}>
                <div id={styles.breakdown_container}>
                    <h1>2025's OVERALL WINNERS</h1>
                    <div id={styles.breakdown_index_container}>
                        <div className={`${styles.breakdown_index} ${breakdownIndex == 0 ? styles.active : ''}`} onClick={() => setBreakdownIndex(0)}>
                            <h3>1st Place</h3>
                        </div>
                        <div className={`${styles.breakdown_index} ${breakdownIndex == 1 ? styles.active : ''}`} onClick={() => setBreakdownIndex(1)}>
                            <h3>2nd Place</h3>
                        </div>
                        <div className={`${styles.breakdown_index} ${breakdownIndex == 2 ? styles.active : ''}`} onClick={() => setBreakdownIndex(2)}>
                            <h3>3rd Place</h3>
                        </div>
                    </div>
                    <div className={`${styles.breakdown_content} ${breakdownIndex == 0 ? styles.active : ''}`}>
                        <PrizeCard title={"Career & Networking"} description={"Scotiabank Senior Manager coffee chat, 1-on-1 with a Scotiabank Senior Principal AI/ML Architect, and a Scotiabank Recruitment coffee chat."} img={first_place_career} icon={networking_icon} />
                        <PrizeCard title={"Perks & Prizes"} description={"$340 Perplexity supply merch gift card and 1 year of NordVPN, NordPass, Incogni, and Saily."} img={first_place_cash_perks} icon={cash_icon} />
                        <PrizeCard title={"Special Recognition"} description={"Awarded custom made BearHacks trophies, medals, and recognition from our team on social media!"} img={recognition} icon={recognition_icon} />
                    </div>
                    <div className={`${styles.breakdown_content} ${breakdownIndex == 1 ? styles.active : ''}`}>
                        <PrizeCard title={"Career & Networking"} description={"1-on-1 with a Scotiabank Senior Principal AI/ML Architect, and a Scotiabank Recruitment coffee chat."} img={first_place_career} icon={networking_icon} />
                        <PrizeCard title={"Perks & Prizes"} description={"$170 Perplexity supply merch gift card and 1 year of NordVPN, NordPass, Incogni, and Saily."} img={first_place_cash_perks} icon={cash_icon} />
                        <PrizeCard title={"Special Recognition"} description={"Awarded custom made BearHacks trophies and recognition from our team on social media!"} img={recognition} icon={recognition_icon} />
                    </div>
                    <div className={`${styles.breakdown_content} ${breakdownIndex == 2 ? styles.active : ''}`}>
                        <PrizeCard title={"Career & Networking"} description={"Scotiabank Senior Manager coffee chat, and a Scotiabank Recruitment coffee chat."} img={first_place_career} icon={networking_icon} />
                        <PrizeCard title={"Perks & Prizes"} description={"$170 Perplexity supply merch gift card and 1 year of NordVPN, NordPass, Incogni, and Saily."} img={first_place_cash_perks} icon={cash_icon} />
                        <PrizeCard title={"Special Recognition"} description={"Awarded custom made BearHacks trophies and recognition from our team on social media!"} img={recognition} icon={recognition_icon} />
                    </div>
                </div>
            </section>
            <section id={styles.sponsor_section}>
                <div id={styles.sponsor_container}>
                    <h1 id={styles.sponsor_caption}>2025's SPONSORS</h1>
                    <div id={styles.sponsor_logos}>
                        <Link to="https://www.perplexity.ai/" target="_blank" style={{ maxWidth: "65%" }}><img src={perplexity} alt="" /></Link>
                        <Link to="https://gdg.community.dev/gdg-on-campus-sheridan-college-trafalgar-road-campus-oakville-canada/" style={{ width: "30rem" }} target="_blank"><img src={gdg} alt="" /></Link>
                        <Link to="https://scotiabank.com/" target="_blank" style={{ width: "clamp(min(20rem, 100%), 35vw, min(30rem, 100%))" }}><img src={scotiabank} alt="" /></Link>
                        <Link to="https://internetcomputer.org/" target="_blank" style={{ width: "clamp(min(15rem, 100%), 20vw, 25rem)" }}><img src={icp} alt="" /></Link>
                        <Link style={{ width: "clamp(min(20rem, 100%), 40vw, 40rem)" }}><img src={indesignn} alt="" /></Link>
                        <Link><img src={royalblue} alt="" /></Link>
                        <Link to="https://incogni.com/" target="_blank"><img src={incogni} alt="" /></Link>
                        <Link to="https://nordvpn.com/coupon/deal/?coupon=hackathons&utm_term=&utm_content" target="_blank" style={{ width: "clamp(7rem, 12vw, 20rem)" }}><img src={nord_vpn} alt="" /></Link>
                        <Link to="https://nordpass.com/" target="_blank" style={{ width: "clamp(7rem, 12vw, 20rem)" }}><img src={nord_pass} alt="" /></Link>
                        <Link to="https://saily.com/" target="_blank"><img src={saily} alt="" /></Link>
                        <Link to="https://balsamiq.com/" target="_blank"><img src={balsamiq} alt="" /></Link>
                        <Link to="https://typst.app/" target="_blank"><img src={typst} alt="" /></Link>
                        <Link to="https://gen.xyz/" target="_blank"><img src={xyz} alt="" /></Link>
                        <Link to="https://gong-cha.ca/" target="_blank" style={{ width: "clamp(7rem, 8vw, 20rem)" }}><img src={gongcha} alt="" /></Link>
                        <Link to="https://rabba.com/" target="_blank" style={{ width: "clamp(7rem, 10vw, 20rem)" }}><img src={rabba_logo} alt="" /></Link>
                        <Link to="https://vitospizzawings.com/" target="_blank" style={{ width: "clamp(7rem, 10vw, 20rem)" }}><img src={vitos} alt="" /></Link>
                        <Link to="https://www.lacarnita.com/" target="_blank" style={{ width: "clamp(7rem, 10vw, 20rem)" }}><img src={la_carnita} alt="" /></Link>
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
                            <li><FAQ question={'When is BearHacks?'} answer={'BearHacks 2026 will take place on April 24-26th, 2026 — join the mailing list to be notified!'} /></li>
                            <li><FAQ question={'Where are you located?'} answer={'Sheridan Hazel McCallion (HMC) campus, C-Wing 5th floor. It\'s the building closest to the Square One Cineplex!'} /></li>
                            <li><FAQ question={'Will there be food?'} answer={'Yes! We will have plenty of meals and snacks every day!'} /></li>
                            <li><FAQ question={'What should I bring?'} answer={'Bring your laptop, charger, extension cords, personal water bottles, and any hardware you plan to use.'} /></li>
                            <li><FAQ question={'What is a hackathon?'} answer={'A hackathon is a competition where people design and develop software projects in a short timeframe like 36-hours.'} /></li>
                        </ul>
                        <ul className={styles.faq_list}>
                            <li><FAQ question={'Do I need to know how to code?'} answer={'Absolutely not, we welcome students of all coding skill levels! Learn how to code, design or even play golf through our workshops or ask a mentor for help!'} /></li>
                            <li><FAQ question={'What can I make?'} answer={'Your project can be software or hardware, and will be eligible to win as long as it aligns with the theme announced at the Opening Ceremony!'} /></li>
                            <li><FAQ question={'How will our submissions be judged?'} answer={'The judging will happen fully online, with projects due for submission on the Devpost by Sunday, 10:00 AM. Read through our criteria on the Devpost for more details!'} /></li>
                            <li><FAQ question={'Do I need to come in person to for the workshops?'} answer={'The workshops will be held in person, with livestreams on online through Twitch and Discord. You can join by getting the link in our discord server!'} /></li>
                            <li><FAQ question={'Can anyone who is not from Sheridan College come?'} answer={'Yes, non-Sheridan students are welcome to join!'} /></li>
                        </ul>
                    </div>
                </div>
            </section>
            <section id={styles.team_section}>
                <div id={styles.team_container}>
                    <h1>MEET THE TEAM</h1>
                    <div style={{ height: '300px', width: '100%', position: 'relative' }}>
                        <CircularGallery 
                            items={teamMembers}
                            bend={2} 
                            textColor="#000" 
                            borderRadius={0.05} 
                            scrollEase={0.02}
                        />
                    </div>
                </div>
            </section>
        </>
    );
};

export default Home;