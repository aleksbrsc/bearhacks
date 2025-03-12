import styles from '@css/components/navbar.module.css';
import logo from '@assets/images/logos/icon.svg';
import linkedin from "@assets/images/icons/linkedin.svg";
import instagram from "@assets/images/icons/instagram.svg";
import discord from "@assets/images/icons/discord.svg";
import { toast } from 'sonner'
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    const [toggled, setToggled] = useState(false);

    return (
        <nav id={styles.nav_container}>
            <div id={styles.nav} data-toggled={toggled}>
                <Link id={styles.logo_container} to="/">
                    <img id={styles.logo} src={logo} alt="BearHacks logo" />
                </Link>
                <ul className={styles.list}>
                    <li>
                        <img id={styles.mini_logo} src={logo} alt="BearHacks logo" />
                    </li>
                    <li className={styles.list_item}>
                        <a href="https://www.linkedin.com/company/bearhacks/" target="_blank"><img src={linkedin}/></a>
                    </li>
                    <li className={styles.list_item}>
                        <a href="https://www.instagram.com/bearhacks/" target="_blank"><img src={instagram}/></a>
                    </li>
                    <li className={styles.list_item}>
                        <a href="https://discord.gg/g4d9A5R9Jc" target="_blank"><img src={discord}/></a>
                    </li>
                    <li id={styles.register_link} className={styles.list_item}>
                        <a href="https://forms.gle/BaQ8qmwdyswubvnf6" target="_blank">Register</a>
                    </li>
                    <div className={`${styles.list_item} ${styles.register_button}`}>
                        <a href="https://forms.gle/BaQ8qmwdyswubvnf6" target="_blank">Register</a>
                    </div>
                </ul>
                <div className={styles.burger} onClick={() => setToggled(!toggled)}> 
                    <div />
                    <div />
                    <div />
                </div>
                <div className={`${styles.overlay} ${toggled && styles.active}`} onClick={() => setToggled(!toggled)}></div>
            </div>
        </nav>
    )
}

export default Navbar;