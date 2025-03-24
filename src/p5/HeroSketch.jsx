import { useRef, useEffect } from "react";
import { Boid } from "@p5/boid";
import p5 from "p5";
import styles from "@css/home.module.css";
import bearbee from "@assets/images/bearbee.png";
import bearbee_flapped from "@assets/images/bearbee_flapped.png";

function HeroSketch({button}) {
    const sketchRef = useRef();
    const p5InstanceRef = useRef(null); // Store p5 instance in a ref
    const button_rect = button.getBoundingClientRect();
    const hoveredRef = useRef(false);
    const boidCount = 25;

    useEffect(() => {
        const sketch = (p) => {
            let boids = [];
            let trails = [];
            let beeFrames = [];
            p.setup = () => {
                p.createCanvas(sketchRef.current.offsetWidth, sketchRef.current.offsetHeight);
                beeFrames.push(p.loadImage(bearbee), p.loadImage(bearbee_flapped));
                // console.log(beeFrames)
                for (let i=0;i<boidCount;i++){
                    boids.push(new Boid(p, button))
                }
            };

            p.draw = () => {
                p.frameRate(60);
                p.background(250);

                p.push()
                p.strokeWeight(6)
                for (let t of trails){
                    if (p.frameCount % 5 == 0){
                        t.alpha -= 0.15;
                    }
                    p.stroke(`rgba(255, 255, 0, ${t.alpha})`);
                    p.point(t.pos.x, t.pos.y);
                }
                p.pop();

                trails = trails.filter(t => t.alpha > 0);

                for (let b of boids){
                    b.flock(boids, hoveredRef.current);
                    b.update();
                    b.show(beeFrames);
                    if (p.frameCount % 15 == 0){
                        trails.push({pos: p.createVector(b.position.x, b.position.y), alpha: 1});
                    }
                }
            };

            // Handle resize
            p.windowResized = () => {
                p.resizeCanvas(sketchRef.current.offsetWidth, sketchRef.current.offsetHeight);
            };
        };

        // Initialize p5 instance
        p5InstanceRef.current = new p5(sketch, sketchRef.current);
        // Cleanup on unmount
        return () => {
            p5InstanceRef.current.remove();
        };
    }, []); // Empty array: only runs on mount

    useEffect(() => {
        function handleMouseEnter(){
            hoveredRef.current = true;
        }
        function handleMouseLeave(){
            hoveredRef.current = false;
        }

        button.addEventListener('mouseenter', handleMouseEnter);
        button.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            button.removeEventListener('mouseenter', handleMouseEnter);
            button.removeEventListener('mouseleave', handleMouseLeave);
        }
    }, [])

    return <div id={styles.hero_canvas_container} ref={sketchRef}></div>;
};

export default HeroSketch;