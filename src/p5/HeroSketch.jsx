import { useRef, useEffect, useState } from "react";
import { Boid } from "@p5/boid";
import p5 from "p5";
import styles from "@css/home.module.css";
import bearbee from "@assets/images/bearbee.png";

function HeroSketch({button}) {
    const sketchRef = useRef();
    const p5InstanceRef = useRef(null); // Store p5 instance in a ref
    const button_rect = button.getBoundingClientRect();
    const hoveredRef = useRef(false);
    const boidCount = 25;

    useEffect(() => {
        const sketch = (p) => {
            let boids = [];
            let beeImage;
            let x = button_rect.x + button_rect.width/2;
            let y = button_rect.y - 5.65*16 + button_rect.height/2;
            p.setup = () => {
                p.createCanvas(sketchRef.current.offsetWidth, sketchRef.current.offsetHeight);
                beeImage = p.loadImage(bearbee);

                for (let i=0;i<boidCount;i++){
                    boids.push(new Boid(p, button))
                }
            };

            p.draw = () => {
                p.background(250);
        
                for (let b of boids){
                    b.flock(boids, hoveredRef.current);
                    b.update();
                    b.show(beeImage);
                }
                // p.strokeWeight(6);
                // p.point(x, y);
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

    // useEffect(() => {
    //     const resizeObserver = new ResizeObserver(() => {
    //         if (p5InstanceRef.current && sketchRef.current) {
    //             p5InstanceRef.current.resizeCanvas(
    //                 sketchRef.current.offsetWidth,
    //                 sketchRef.current.offsetHeight
    //             );
    //         }
    //     });

    //     if (sketchRef.current) {
    //         resizeObserver.observe(sketchRef.current);
    //     }

    //     return () => {
    //         resizeObserver.disconnect();
    //     };
    // }, []); // Empty array: only runs on mount

    useEffect(() => {
        function handleMouseEnter(){
            hoveredRef.current = true;
        }
        function handleMouseLeave(){
            hoveredRef.current = false;
        }

        // const element = button;

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