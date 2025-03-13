import styles from "@css/home.module.css";
import HeroSketch from "@p5/HeroSketch";

const Home = () => {
    return (
        <>
            <section id={styles.hero_section}>
                <HeroSketch />
                <div id={styles.hero_container}>
                    <div id={styles.hero_header}>
                        <h1>BearHacks 2025</h1>
                        <p>Sheridan’s first hybrid hackathon — <strong>March 28-30 @ HMC campus</strong></p>
                    </div>
                    <a href="https://bearhacks2025.devpost.com" target="_blank">Apply Now</a>
                </div>
            </section>
        </>
    );
};

export default Home;