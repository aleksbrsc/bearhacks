import styles from '@css/components/footer.module.css';
import logo from '@assets/images/logos/footer_logo.svg';
import discord from "@assets/images/icons/discord.svg";
import instagram from "@assets/images/icons/instagram.svg";
import linkedin from "@assets/images/icons/linkedin.svg";
import devpost from "@assets/images/icons/devpost.svg";

function Footer() {
    return (
        <footer id={styles.footer_section}>
            <div id={styles.footer_container}>
                <img id={styles.footer_logo} src={logo} alt="BearHacks 2025 Logo" />
                <div id={styles.footer_content}>
                    <ul id={styles.socials_list}>
                        <li className={styles.social_item}><a href="https://www.linkedin.com/company/bearhacks/" target='_blank'><img src={linkedin} alt="LinkedIn Page" /></a></li>
                        <li className={styles.social_item}><a href="https://www.instagram.com/bear_hacks/" target='_blank'><img src={instagram} alt="Instagram Page" /></a></li>
                        <li className={styles.social_item}><a href="https://bearhacks2025.devpost.com/" target="_blank"><img src={devpost} alt="Devpost Page" /></a></li>
                        <li className={styles.social_item}><a href="https://discord.gg/g4d9A5R9Jc" target='_blank'><img src={discord} alt="Discord Server" /></a></li>
                    </ul>
                    <p id={styles.footer_note}><a href="https://drive.google.com/file/d/1hd4oMXKCUGher1Z24KiusJMOdPzLSyBM/view" target='_blank'>Code of Conduct</a><p>&copy; BearHacks 2026</p></p>
                </div>
            </div>
        </footer>
    )
}

export default Footer;