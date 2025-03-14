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
    constructor(p) {
        this.p = p
        this.position = this.p.createVector(this.p.random(this.p.width), this.p.random(this.p.height));
        this.velocity = p5.Vector.random2D();
        this.velocity.setMag(this.p.random(2, 4));
        this.acceleration = this.p.createVector();
        this.maxForce = 0.5;
        this.maxSpeed = 4;
        this.minSpeed = 1.2;
        this.perceptionRadius = 40;
        this.theta = Math.PI/6;
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

        // if (this.position.x < 0){
        //     this.position.x = width;
        // } else if (this.position.x > width){
        //     this.position.x = 0;
        // }

        // if (this.position.y < 0){
        //     this.position.y = height;
        // } else if (this.position.y > height){
        //     this.position.y = 0;
        // }
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

        let alignFactor = 0.05;
        if (neighbours > 0){
            steering.div(neighbours);
            steering.sub(this.velocity);
            steering.mult(alignFactor);
        }

        return steering;

    }

    avoid(position){
        let steering = this.p.createVector(0, 0);
        if (this.perceived(position, 75)){
            steering.add(p5.Vector.sub(this.position, position));
        }

        let avoidFactor = 5;
        steering.mult(avoidFactor);
        return steering;
    }

    seek(position){
        let desired = p5.Vector.sub(position, this.position);
        desired.normalize();
        desired.mult(0.05);

        let steering = p5.Vector.sub(desired, this.velocity);

        return steering;
    }
  
    separation(boids) {
        let steering = this.p.createVector(0, 0);

        for (let b of boids){
            if (b != this && this.perceived(b.position, 20)){
                steering.add(p5.Vector.sub(this.position, b.position));
            }
        }

        let avoidFactor = 0.075;
        steering.mult(avoidFactor);
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
            let cohesionFactor = 0.0075;
            steering.mult(cohesionFactor);
        }

        return steering;
    }
  
    flock(boids) {
      let alignment = this.align(boids);
      let cohesion = this.cohesion(boids);
      let separation = this.separation(boids);
    //   let avoid = this.avoid(this.p.createVector(this.p.mouseX, this.p.mouseY));
    //   let seek = this.seek(this.p.createVector(this.p.mouseX, this.p.mouseY));

      this.acceleration.add(alignment);
      this.acceleration.add(cohesion);
      this.acceleration.add(separation);
    //   this.acceleration.add(avoid);
    //   this.acceleration.add(seek);
    }
  
    update() {
        this.velocity.add(this.acceleration);
        this.edges();
        if (this.velocity.mag() < this.minSpeed){
            this.velocity.mult(this.minSpeed);
        }
        this.velocity.limit(this.maxSpeed);
        this.position.add(this.velocity);
        this.acceleration.mult(0);
    }
  
    show(img) {
        this.p.push();
        // this.p.strokeWeight(6);
        // this.p.stroke(0);
        // this.p.fill(0);
        // let size = 5;
        this.p.translate(this.position.x, this.position.y);
        this.p.rotate(this.velocity.heading() - (Math.PI/2));
        // this.p.beginShape();
        // this.p.vertex(0, -size);
        // this.p.vertex(-size, size*2);
        // this.p.vertex(size, size*2);
        // this.p.endShape(this.p.CLOSE);
        // this.p.point(this.position.x, this.position.y);
        // img.resize(25, 0);
        this.p.image(img, 0-img.width/2, 0-img.height/2);
        this.p.pop();
    }
  }
  