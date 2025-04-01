import styles from "@css/home.module.css";
import HeroSketch from "@p5/HeroSketch";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
// import hero_background from "@assets/images/hero_background.svg";
// import hero_foreground from "@assets/images/hero_foreground.svg";

import bear_praying from "@assets/images/hero/bear_praying.PNG";
import bear_sleeping from "@assets/images/hero/bear_sleeping.PNG";
import jesus_bear from "@assets/images/hero/jesus_bear.PNG";
import bear_thinking from "@assets/images/hero/bear_thinking.PNG";
import tetervak_bear from "@assets/images/hero/tetervak_bear.PNG";
import hero_background from "@assets/images/hero/background.png";
import hero_foreground from "@assets/images/hero/updated_fg.png";
import honey_foreground from "@assets/images/hero/honey_foreground.png";
import clock from "@assets/images/hero/clock.png";

import first_place_cash_perks from "@assets/images/breakdown/first_place_cash_perks.png";
import first_place_career from "@assets/images/breakdown/first_place_career.svg";
import recognition from "@assets/images/breakdown/recognition.svg";
import cash_icon from "@assets/images/breakdown/cash_icon.svg";
import networking_icon from "@assets/images/breakdown/networking_icon.svg";
import recognition_icon from "@assets/images/breakdown/logo_icon.svg";

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
import vitos from "@assets/images/sponsor_logos/vitos_logo.png";
import rabba_logo from "@assets/images/sponsor_logos/rabba_logo.png";
import icp from "@assets/images/sponsor_logos/icp_logo.png";

import faq_header from "@assets/images/faq_header.png";

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
        <div className={styles.faq}> {/*onMouseEnter={() => setToggled(true)} onMouseLeave={() => setToggled(false)} */}
            <div className={styles.question_container} onClick={() => setToggled(!toggled)}>
                <h3 className={styles.question}>{question}</h3>
                <div className={styles.faq_toggle} data-toggled={toggled}>
                    <div className={styles.horizontal}></div>
                    <div className={styles.vertical}></div>
                </div>
            </div>
            <p className={`${styles.answer} ${toggled ? styles.toggled: ''}`}>{answer}</p>
        </div>
    );
}

const PrizeCard = ({icon, title, description, img}) => {
    return (
        <div className={styles.prize_card}>
            <div className={styles.prize_icon}>
                <img src={icon} />
            </div>
            <h3 className={styles.prize_title}>{title}</h3>
            <p className={styles.prize_description}>{description}</p>
            <img src={img} className={styles.prize_img}/>
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
        if (buttonRef.current){
            setButtonLoaded(true);
        }
    }, [buttonRef.current])

    useEffect(() => {
        if (timeoutRef.current){
            clearTimeout(timeoutRef.current)
        }
        timeoutRef.current = setTimeout(() => {
            setBreakdownIndex((breakdownIndex+1)%3)
        }, 8000)
    }, [breakdownIndex])

    return (
        <>
            <section id={styles.hero_section}>
                {buttonLoaded && <HeroSketch button={buttonRef.current}/>}
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
                    <div id={styles.last_supper}>
                        <img src={hero_background} alt="" id={styles.hero_background}/>
                        <div id={styles.bear_praying} onMouseEnter={() => setBearHovered(0)} onMouseLeave={() => setBearHovered(-1)}>
                            <img src={bear_praying} alt="" className={styles.bear_img}/>
                        </div>
                        <div id={styles.mentors_tooltip} className={`${styles.tooltip} ${bearHovered == 0 ? styles.active: ''}`}>
                            <h3>MENTORS</h3>
                            <p>Get access to developer and design mentors on the Discord on your 36-hour hacking journey.</p>
                        </div>
                        <div id={styles.bear_sleeping} onMouseEnter={() => setBearHovered(1)} onMouseLeave={() => setBearHovered(-1)}>
                            <img src={bear_sleeping} alt="" className={styles.bear_img}/>
                        </div>
                        <div id={styles.hybrid_tooltip} className={`${styles.tooltip} ${bearHovered == 1 ? styles.active: ''}`}>
                            <h3>HYBRID EVENT</h3>
                            <p>Hack from the comfort of your own home, or in-person if you’ve been accepted (but no overnight stays!)</p>
                        </div>
                        <div id={styles.jesus_bear} onMouseEnter={() => setBearHovered(2)} onMouseLeave={() => setBearHovered(-1)}>
                            <img src={jesus_bear} alt="" className={styles.bear_img}/>
                        </div>
                        <div id={styles.support_tooltip} className={`${styles.tooltip} ${bearHovered == 2 ? styles.active: ''}`}>
                            <h3>SUPPORT TICKETS</h3>
                            <p>Having trouble? Open a support ticket on the discord and our online support will be there to assist you!</p>
                        </div>
                        <div id={styles.bear_thinking} onMouseEnter={() => setBearHovered(3)} onMouseLeave={() => setBearHovered(-1)}>
                            <img src={bear_thinking} alt=""className={styles.bear_img} />
                        </div>
                        <div id={styles.creative_tooltip} className={`${styles.tooltip} ${bearHovered == 3 ? styles.active: ''}`}>
                            <h3>GET CREATIVE</h3>
                            <p>Got a new app idea? Check out our sponsors and prize tracks to win big while trying out new tech.</p>
                        </div>
                        <div id={styles.tetervak_bear} onMouseEnter={() => setBearHovered(4)} onMouseLeave={() => setBearHovered(-1)}>
                            <img src={tetervak_bear} alt="" className={styles.bear_img}/>
                        </div>
                        <div id={styles.team_tooltip} className={`${styles.tooltip} ${bearHovered == 4 ? styles.active: ''}`}>
                            <h3>FORM A TEAM</h3>
                            <p>Feeling lost and need a team? Our networking booths and team-finding channels on the Discord can help!</p>
                        </div>
                        <img src={hero_foreground} alt="" id={styles.hero_foreground}/>
                        <img src={clock} alt="" id={styles.clock}/>
                        <img src={honey_foreground} alt="" id={styles.honey_foreground}/>
                        <Countdown />
                    </div>
                </div>
            </section>
            <section id={styles.breakdown_section}>
                <div id={styles.breakdown_container}>
                    <h1>WINNER BREAKDOWN</h1>
                    <div id={styles.breakdown_index_container}>
                        <div className={`${styles.breakdown_index} ${breakdownIndex == 0 ? styles.active: ''}`} onClick={() => setBreakdownIndex(0)}>
                            <h3>1st Place</h3>
                        </div>
                        <div className={`${styles.breakdown_index} ${breakdownIndex == 1 ? styles.active: ''}`} onClick={() => setBreakdownIndex(1)}>
                            <h3>2nd Place</h3>
                        </div>
                        <div className={`${styles.breakdown_index} ${breakdownIndex == 2 ? styles.active: ''}`} onClick={() => setBreakdownIndex(2)}>
                            <h3>3rd Place</h3>
                        </div>
                    </div>
                    <div className={`${styles.breakdown_content} ${breakdownIndex == 0 ? styles.active: ''}`}>
                        <PrizeCard title={"Cash & Perks"} description={"$170 Perplexity supply gift card and 1 year of NordVPN, NordPass, Incogni, and Saily."} img={first_place_cash_perks} icon={cash_icon}/>
                        <PrizeCard title={"Career & Networking"} description={"Scotiabank Senior Manager coffee chat, 1-on-1 with a Scotiabank Senior Principal AI/ML Architect, and a Scotiabank recruitment coffee chat."} img={first_place_career} icon={networking_icon}/>
                        <PrizeCard title={"Recognition"} description={"Awarded a special BearHacks trophy."} img={recognition} icon={recognition_icon}/>
                    </div>
                    <div className={`${styles.breakdown_content} ${breakdownIndex == 1 ? styles.active: ''}`}>
                        <PrizeCard title={"Cash & Perks"} description={"$170 Perplexity supply gift card and 1 year of NordVPN, NordPass, Incogni, and Saily."} img={first_place_cash_perks} icon={cash_icon}/>
                        <PrizeCard title={"Career & Networking"} description={"1-on-1 with a Scotiabank Senior Principal AI/ML Architect, and a Scotiabank recruitment coffee chat."} img={first_place_career} icon={networking_icon}/>
                        <PrizeCard title={"Recognition"} description={"Awarded a special BearHacks trophy."} img={recognition} icon={recognition_icon}/>
                    </div>
                    <div className={`${styles.breakdown_content} ${breakdownIndex == 2 ? styles.active: ''}`}>
                        <PrizeCard title={"Cash & Perks"} description={"$170 Perplexity supply gift card."} img={perplexity} icon={cash_icon}/>
                        <PrizeCard title={"Career & Networking"} description={"Scotiabank Senior Manager coffee chat and a Scotiabank recruitment coffee chat."} img={first_place_career} icon={networking_icon}/>
                        <PrizeCard title={"Recognition"} description={"Awarded a special BearHacks trophy."} img={recognition} icon={recognition_icon}/>
                    </div>
                </div>
            </section>
            <section id={styles.sponsor_section}>
                <div id={styles.sponsor_container}>
                    <h1 id={styles.sponsor_caption}>OUR SPONSORS</h1>
                    <div id={styles.sponsor_logos}>
                        <Link to="https://www.perplexity.ai/" target="_blank" style={{maxWidth: "75%"}}><img src={perplexity} alt="" /></Link>
                        <Link to="https://gdg.community.dev/gdg-on-campus-sheridan-college-trafalgar-road-campus-oakville-canada/" style={{width: "30rem"}} target="_blank"><img src={gdg} alt="" /></Link>
                        <Link to="https://scotiabank.com/" target="_blank" style={{width: "clamp(min(20rem, 100%), 35vw, min(30rem, 100%))"}}><img src={scotiabank} alt="" /></Link>
                        <Link to="https://internetcomputer.org/" target="_blank" style={{width: "clamp(min(15rem, 100%), 20vw, 25rem)"}}><img src={icp} alt="" /></Link>
                        <Link style={{width: "clamp(min(20rem, 100%), 40vw, 40rem)"}}><img src={indesignn} alt="" /></Link>
                        <Link><img src={royalblue} alt="" /></Link>
                        <Link to="https://incogni.com/" target="_blank"><img src={incogni} alt="" /></Link>
                        <Link to="https://nordvpn.com/coupon/deal/?coupon=hackathons&utm_term=&utm_content" target="_blank" style={{width: "clamp(7rem, 12vw, 20rem)"}}><img src={nord_vpn} alt="" /></Link>
                        <Link to="https://nordpass.com/" target="_blank" style={{width: "clamp(7rem, 12vw, 20rem)"}}><img src={nord_pass} alt="" /></Link>
                        <Link to="https://saily.com/" target="_blank"><img src={saily} alt="" /></Link>
                        <Link to="https://balsamiq.com/" target="_blank"><img src={balsamiq} alt="" /></Link>
                        <Link to="https://typst.app/" target="_blank"><img src={typst} alt="" /></Link>
                        <Link to="https://gen.xyz/" target="_blank"><img src={xyz} alt="" /></Link>
                        <Link to="https://gong-cha.ca/" target="_blank" style={{width: "clamp(7rem, 8vw, 20rem)"}}><img src={gongcha} alt="" /></Link>
                        <Link to="https://rabba.com/" target="_blank" style={{width: "clamp(7rem, 10vw, 20rem)"}}><img src={rabba_logo} alt="" /></Link>
                        <Link to="https://vitospizzawings.com/" target="_blank" style={{width: "clamp(7rem, 10vw, 20rem)"}}><img src={vitos} alt="" /></Link>
                        <Link to="https://www.lacarnita.com/" target="_blank" style={{width: "clamp(7rem, 10vw, 20rem)"}}><img src={la_carnita} alt="" /></Link>
                        {/* <Link to="https://www.thessu.ca/" target="_blank"><img src={xyz} alt="" /></Link> */}
                    </div>
                </div>
            </section>
            <section id={styles.faq_section}>
                <div id={styles.faq_container}>
                    <img src={faq_header} alt="FAQ | BearHacks"/>
                    <h1>FREQUENTLY ASKED QUESTIONS</h1>
                    <div id={styles.faq_list_container}>
                        <ul className={styles.faq_list}>
                            <li><FAQ question={'When is BearHacks happening?'} answer={'The registration is from 5:00 - 7:00PM on March 28th for in-person participants. Please arrive as early as possible to ensure you\'re checked in before Opening Ceremony at 7:00PM and the Scotiabank fireside chat right after.'}/></li>
                            <li><FAQ question={'Where are you located?'} answer={'Sheridan HMC campus, C Wing 5th floor. It\'s the one closer to the Cineplex!'}/></li>
                            <li><FAQ question={'Will there be food?'} answer={'Yes! We will have some meals and snacks, but we encourage you to bring some with you as well.'}/></li>
                            <li><FAQ question={'What should I bring?'} answer={'Bring your laptop, charger, extension cords, personal water bottles, and any hardware you plan to use.'}/></li>
                            <li><FAQ question={'What is a hackathon?'} answer={'A hackathon is an event where people design and develop software projects in 36 hours.'}/></li>
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