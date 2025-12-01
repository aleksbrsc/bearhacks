import { useRef, useEffect } from "react";
import { Boid } from "@p5/boid";
import p5 from "p5";
import bearbee from "@assets/images/bearbee.png";
import bearbee_flapped from "@assets/images/bearbee_flapped.png";
import styles from "@css/components/sketch.module.css";

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
            let bee;
            let bee_flapped;
            let beeFrames = [];
            let smallBeeFrames = [];
            let grabbedBoid = null;

            p.preload = () => {
                bee = p.loadImage(bearbee);
                bee_flapped = p.loadImage(bearbee_flapped);
            }
            p.setup = () => {
                p.createCanvas(sketchRef.current.offsetWidth, sketchRef.current.offsetHeight);
                beeFrames.push(bee, bee_flapped);

                let small_bee = bee.get();
                small_bee.resize(42, 0)
                let small_bee_flapped = bee_flapped.get();
                small_bee_flapped.resize(42, 0)
                smallBeeFrames.push(small_bee, small_bee_flapped)


                let sizes = [52, 38];
                // console.log(beeFrames)
                for (let i=0;i<boidCount;i++){
                    boids.push(new Boid(p, button_rect, sizes[Math.floor(Math.random() * 2)]));
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
                    b.flock(boids, hoveredRef.current, grabbedBoid);
                    b.update();
                    let frames = smallBeeFrames;
                    if (b.radius != 38){
                        frames = beeFrames;
                    }
                    b.show(frames);
                    if (p.frameCount % 15 == 0 && !b.isGrabbed){
                        trails.push({pos: p.createVector(b.position.x, b.position.y), alpha: 1});
                    }
                }
            };

            // Handle resize
            p.windowResized = () => {
                p.resizeCanvas(sketchRef.current.offsetWidth, sketchRef.current.offsetHeight);
            };
            
            // Mouse interaction for grabbing bees
            p.mousePressed = () => {
                if (hoveredRef.current) return; // Don't grab when hovering button
                
                for (let b of boids) {
                    if (b.isMouseOver()) {
                        grabbedBoid = b;
                        b.grab();
                        break;
                    }
                }
            };
            
            p.mouseReleased = () => {
                if (grabbedBoid) {
                    grabbedBoid.release();
                    grabbedBoid = null;
                }
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