import { useRef, useEffect } from "react";
import { Boid } from "@p5/boid";
import p5 from "p5";
import styles from "@css/home.module.css";
import bearbee from "@assets/images/bearbee.png";

function HeroSketch() {
    const sketchRef = useRef();
    const p5InstanceRef = useRef(null); // Store p5 instance in a ref

    useEffect(() => {
        const sketch = (p) => {
            let boids = [];
            let beeImage;
            p.setup = () => {
                p.createCanvas(sketchRef.current.offsetWidth, sketchRef.current.offsetHeight);
                for (let i=0;i<50;i++){
                    boids.push(new Boid(p, sketchRef.current.offsetWidth, sketchRef.current.offsetHeight));
                }

                beeImage = p.loadImage(bearbee);
                // beeImage.resize(10, 0);
            };

            p.draw = () => {
                p.background(250);
                for (let b of boids){
                    b.flock(boids);
                    b.update();
                    b.show(beeImage);
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
        const resizeObserver = new ResizeObserver(() => {
            if (p5InstanceRef.current && sketchRef.current) {
                p5InstanceRef.current.resizeCanvas(
                    sketchRef.current.offsetWidth,
                    sketchRef.current.offsetHeight
                );
            }
        });

        if (sketchRef.current) {
            resizeObserver.observe(sketchRef.current);
        }

        return () => {
            resizeObserver.disconnect();
        };
    }, []); // Empty array: only runs on mount

    return <div id={styles.hero_canvas_container} ref={sketchRef}></div>;
};

export default HeroSketch;