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
    constructor(p, target, radius) {
        this.p = p
        this.position = this.p.createVector(this.p.random(this.p.width), this.p.random(this.p.height));
        this.velocity = p5.Vector.random2D();
        this.velocity.setMag(this.p.random(1.5, 3));
        this.acceleration = this.p.createVector();
        this.maxForce = 0.3;
        this.maxSpeed = 3.5;
        this.minSpeed = 1;
        this.radius = radius
        this.perceptionRadius = radius + 45;
        this.theta = Math.PI/4;
        this.alignFactor = 0.12
        this.cohesionFactor = 0.008
        this.separationFactor = 0.15
        this.seekFactor = 0.3
        this.avoidFactor = 1.2
        this.cursorAvoidRadius = 100;
        this.target = target
        this.last_frame = 0;
        this.last_frame_count = this.p.frameCount;
        this.isGrabbed = false;
        this.grabScale = 1;
        this.shakeOffset = this.p.createVector(0, 0);
        this.originalRadius = radius;
        this.spiralAngle = this.p.random(0, this.p.TWO_PI);
        this.spiralRadius = this.p.random(40, 80);
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

    avoid(position, radius = 75){
        let steering = this.p.createVector(0, 0);
        let distance = p5.Vector.dist(position, this.position);
        
        if (distance < radius && distance > 0){
            let desired = p5.Vector.sub(this.position, position);
            desired.normalize();
            
            let strength = this.p.map(distance, 0, radius, this.maxSpeed * 1.5, 0);
            desired.mult(strength);
            
            steering = p5.Vector.sub(desired, this.velocity);
            steering.limit(this.maxForce);
        }

        return steering;
    }

    seek(position){
        let desired = p5.Vector.sub(position, this.position);
        desired.normalize();
        let steering = p5.Vector.sub(desired, this.velocity);
        return steering;
    }
    
    spiralSeek(centerPos){
        this.spiralAngle += 0.05;
        let spiralX = centerPos.x + Math.cos(this.spiralAngle) * this.spiralRadius;
        let spiralY = centerPos.y + Math.sin(this.spiralAngle) * this.spiralRadius;
        let spiralTarget = this.p.createVector(spiralX, spiralY);
        
        let desired = p5.Vector.sub(spiralTarget, this.position);
        desired.normalize();
        desired.mult(this.maxSpeed * 0.8);
        
        let steering = p5.Vector.sub(desired, this.velocity);
        steering.limit(this.maxForce);
        return steering;
    }
  
    separation(boids) {
        let steering = this.p.createVector(0, 0);
        let count = 0;

        for (let b of boids){
            let distance = p5.Vector.dist(this.position, b.position);
            if (b != this && distance < 35){
                let force = p5.Vector.sub(this.position, b.position);
                if (distance > 0) {
                    force.mult(1 / distance);
                }
                steering.add(force);
                count++;
            }
        }

        if (count > 0) {
            steering.div(count);
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
  
    flock(boids, hovered, grabbedBoid = null) {
        let alignment = this.align(boids);
        let cohesion = this.cohesion(boids);
        let separation = this.separation(boids);
        
        alignment.mult(this.alignFactor);
        cohesion.mult(this.cohesionFactor);
        separation.mult(this.separationFactor);

        let mousePos = this.p.createVector(this.p.mouseX, this.p.mouseY);
        let cursorAvoid = this.p.createVector(0, 0);
        
        if (!hovered && this.p.mouseX > 0 && this.p.mouseY > 0) {
            let avoidMultiplier = this.avoidFactor;
            let avoidRadius = this.cursorAvoidRadius;
            
            if (grabbedBoid && grabbedBoid !== this) {
                avoidMultiplier *= 2.5;
                avoidRadius *= 1.3;
            }
            
            cursorAvoid = this.avoid(mousePos, avoidRadius);
            cursorAvoid.mult(avoidMultiplier);
            cursorAvoid.limit(this.maxForce * 0.8);
        }

        if (hovered){
            let rect = this.target;
            let x = rect.x + rect.width/2;
            let y = rect.y - 5.65*16 + rect.height/2;
            let centerPos = this.p.createVector(x, y);
            
            let spiralSeek = this.spiralSeek(centerPos);
            let buttonAvoid = this.avoid(centerPos, 45);
            
            spiralSeek.mult(1.2);
            buttonAvoid.mult(this.p.random(8, 12));
            
            this.acceleration.add(spiralSeek);
            this.acceleration.add(buttonAvoid);
            this.acceleration.add(separation);
            return;
        }

        this.acceleration.add(alignment);
        this.acceleration.add(cohesion);
        this.acceleration.add(separation);
        this.acceleration.add(cursorAvoid);
    }
  
    update() {
        if (this.isGrabbed) {
            let mousePos = this.p.createVector(this.p.mouseX, this.p.mouseY);
            this.position = p5.Vector.lerp(this.position, mousePos, 0.1);
            this.shakeOffset.x = this.p.random(-2, 2);
            this.shakeOffset.y = this.p.random(-2, 2);
            this.grabScale = this.p.lerp(this.grabScale, 1.4, 0.1);
            this.acceleration.mult(0);
            return;
        }
        
        this.grabScale = this.p.lerp(this.grabScale, 1, 0.1);
        this.shakeOffset.mult(0.8);
        this.acceleration.limit(this.maxForce);
        this.velocity.add(this.acceleration);
        this.edges();
        
        if (this.velocity.mag() < this.minSpeed){
            this.velocity.setMag(this.minSpeed);
        }
        
        this.velocity.limit(this.maxSpeed);
        this.position.add(this.velocity);
        this.acceleration.mult(0);
    }
  
    show(frames) {
        this.p.push();
        let displayX = this.position.x + this.shakeOffset.x;
        let displayY = this.position.y + this.shakeOffset.y;
        this.p.translate(displayX, displayY);
        this.p.scale(this.grabScale);
        
        if (!this.isGrabbed) {
            this.p.rotate(this.velocity.heading() - (Math.PI/2));
        }
        
        let frameSpeed = 5 * 1/Math.max(this.velocity.mag(), 1);
        if (this.p.frameCount - this.last_frame_count >= frameSpeed){
            this.last_frame_count = this.p.frameCount;
            this.last_frame = (this.last_frame+1) % frames.length;
        }
        
        let img = frames[this.last_frame];
        
        if (this.isGrabbed) {
            this.p.tint(255, 200, 100, 200);
        }
        
        this.p.image(img, -img.width/2, -img.height/2);
        
        if (this.isGrabbed) {
            this.p.noTint();
        }
        
        this.p.pop();
    }
    
    isMouseOver() {
        let mousePos = this.p.createVector(this.p.mouseX, this.p.mouseY);
        let distance = p5.Vector.dist(this.position, mousePos);
        return distance < (this.radius * this.grabScale) / 2;
    }
    
    grab() {
        this.isGrabbed = true;
    }
    
    release() {
        this.isGrabbed = false;
    }
  }