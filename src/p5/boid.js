import p5 from "p5";

function slope(p1, p2){
    let rise = p2.y - p1.y;
    let run = p2.x - p1.x;
    if (run == 0){
        run = 0.0000001;
    }
    return rise/run;
}

export class Boid {
    constructor(p, target) {
        this.p = p
        this.position = this.p.createVector(this.p.random(this.p.width), this.p.random(this.p.height));
        this.velocity = p5.Vector.random2D();
        this.velocity.setMag(this.p.random(2, 4));
        this.acceleration = this.p.createVector();
        this.maxForce = 0.5;
        this.maxSpeed = 4;
        this.minSpeed = 1.2;
        this.perceptionRadius = 35/2+30;
        this.theta = Math.PI/6;
        this.alignFactor = 0.075
        this.cohesionFactor = 0.00075
        this.separationFactor = 0.01
        this.seekFactor = 0.5
        this.target = target
        // this.theta = 2*Math.PI/9;
    }

    perceived(position, radius){
        if (p5.Vector.dist(this.position, position) > radius){
            return false;
        }

        let boidSlope = slope(position, this.position);
        let heading = this.velocity.heading();
        let s1 = Math.tan(heading - Math.PI + this.theta);
        let s2 = Math.tan(heading - Math.PI - this.theta);

        if (boidSlope >= Math.min(s1, s2) && boidSlope <= Math.max(s1, s2)){
            return false;
        }

        return true;    
    }
  
    edges() {
        let width = this.p.width;
        let height = this.p.height;
        let turnFactor = 0.2;
        let margin = 50;
        if (this.position.x < margin) {
            this.velocity.x += turnFactor;
        } else if (this.position.x > width-margin) {
            this.velocity.x -= turnFactor;
        }
        if (this.position.y > height-margin) {
            this.velocity.y -= turnFactor;
        } else if (this.position.y < margin) {
            this.velocity.y += turnFactor;
        }
    }
  
    align(boids) {
        let steering = this.p.createVector(0, 0);
        let neighbours = 0;

        for (let b of boids){
            if (b != this && this.perceived(b.position, this.perceptionRadius)){
                steering.add(b.velocity);
                neighbours += 1;
            }
        }

        if (neighbours > 0){
            steering.div(neighbours);
            steering.sub(this.velocity);
        }

        return steering;

    }

    avoid(position){
        let steering = this.p.createVector(0, 0);
        if (p5.Vector.dist(position, this.position) < 75){
            steering.add(p5.Vector.sub(this.position, position));
        }

        return steering;
    }

    seek(position){
        let desired = p5.Vector.sub(position, this.position);
        desired.normalize();
        // desired.mult(0.05);

        let steering = p5.Vector.sub(desired, this.velocity);

        return steering;
    }
  
    separation(boids) {
        let steering = this.p.createVector(0, 0);

        for (let b of boids){
            if (b != this && p5.Vector.dist(this.position, b.position) < 30){
                steering.add(p5.Vector.sub(this.position, b.position));
            }
        }

        return steering;
    }
  
    cohesion(boids) {
        let steering = this.p.createVector(0, 0);
        let neighbours = 0;

        for (let b of boids){
            if (b != this && this.perceived(b.position, this.perceptionRadius)){
                steering.add(b.position);
                neighbours += 1;
            }
        }

        if (neighbours > 0){
            steering.div(neighbours);
            steering.sub(this.position);
        }

        return steering;
    }
  
    flock(boids, hovered) {
        let alignment = this.align(boids);
        let cohesion = this.cohesion(boids);
        let separation = this.separation(boids);
        alignment.mult(this.alignFactor);
        cohesion.mult(this.cohesionFactor);
        separation.mult(this.separationFactor);

        if (hovered){
            let rect = this.target.getBoundingClientRect();
            let x = rect.x + rect.width/2;
            let y = rect.y - 5.65*16 + rect.height/2;
            let position = this.p.createVector(x, y)
            let seek = this.seek(position);
            let avoid = this.avoid(position);
            avoid.mult(this.p.random(20, 25))
            seek.mult(this.seekFactor);
            this.acceleration.add(seek);
            this.acceleration.add(avoid);
            this.acceleration.add(separation)
            return
        }

        this.acceleration.add(alignment);
        this.acceleration.add(cohesion);
        this.acceleration.add(separation);
    }
  
    update() {
        this.velocity.add(this.acceleration);
        this.edges();
        if (this.velocity.mag() < this.minSpeed){
            // this.velocity.mult(this.minSpeed);
            this.velocity.setMag(this.minSpeed);
        }
        this.velocity.limit(this.maxSpeed);
        this.position.add(this.velocity);
        this.acceleration.mult(0);
    }
  
    show(img) {
        this.p.push();
        // this.p.strokeWeight(6);
        // this.p.stroke(0);
        this.p.fill(0);
        let size = 5;
        this.p.translate(this.position.x, this.position.y);
        this.p.rotate(this.velocity.heading() + (Math.PI/2));
        this.p.beginShape();
        this.p.vertex(0, -size);
        this.p.vertex(-size, size*2);
        this.p.vertex(size, size*2);
        this.p.endShape(this.p.CLOSE);
        // this.p.point(this.position.x, this.position.y);
        // img.resize(25, 0);
        // this.p.image(img, -img.width/2, -img.height/2);
        this.p.pop();
    }
  }
  