class Box {
  constructor(x, y, w, h, prop, options={}){
    this.body = Bodies.rectangle(x, y, w, h, options);
    this.w = w;  
    this.h = h; 
    this.img = prop.img; 
    this.op = prop.opacidad; 
    this.scale = prop.escala;
    this.pattern = createPattern(this.img, w, h, this.scale);
    this.damage = prop.damaged;
    this.destro = prop.destroy;
    World.add(world, this.body);
    this.health= prop.health;
  }
  
  show(){
    push();
    translate(
      this.body.position.x,
      this.body.position.y);
    rotate(this.body.angle);
    //rectMode(CENTER); rect(0, 0, this.w, this.h);
    imageMode(CENTER); tint(255, this.op); image(this.pattern, 0, 0, this.w, this.h);
    pop();
  }

  reduceHealth(amount) {
    if (millis() - gameStartTime > 2000) { // Verificar si han pasado más de 2 segundos
        this.health -= amount;
        this.damage.setVolume(0.1);
        this.damage.play();
        console.log(`Salud de box reducida a ${this.health}`);
        if (this.health <= 0) {
            this.destro.setVolume(0.1);
            this.destro.play();
            this.destroy();
            score += 25;
        }
    }
}

  destroy() {
      console.log("Box destruido.");
      World.remove(world, this.body);
      boxes = boxes.filter(box => box !== this); 
  }

  isSignificantFall() {
    const velocity = this.body.velocity;
    const speed = Math.sqrt(velocity.x*velocity.x + velocity.y*velocity.y);
    return speed > 5; 
  }
  
  onHit(){
    if (this.health>85 && this.prop==="wood") {
      console.log("Cambiar sprite a")
    }
  }
  
}

class Ground extends Box {
  constructor(x, y, w, h, prop){
    super(x, y, w, h, prop, {isStatic: true});
  }
}

class Bird {
    constructor(x, y, r, prop){
      this.body = Bodies.circle( x, y, r, {
        restitution: 0.7,
        collisionFilter: {
          category: 2
        }
        });
      this.img = prop.img;
      Body.setMass(this.body, prop.mass);
      World.add(world, this.body);
      this.damage = prop.damaged;
      this.destro = prop.destroy;
    }
    
    show(){
      push();
      imageMode(CENTER);
      translate(this.body.position.x,
        this.body.position.y);
      rotate(this.body.angle);
     if (this.img) {
        image(this.img, 0, 0, 2 * this.body.circleRadius, 2 * this.body.circleRadius);
      } else {
        console.error('Imagen no definida en Bird.show()');
      }
      /*ellipse(this.body.position.x, this.body.position.y,
              2*this.body.circleRadius, 2*this.body.circleRadius);*/
      pop();
    }

    onHit(){
      this.damage.setVolume(0.1);
      this.damage.play();
    }
    
    onDead(){
      this.destro.setVolume(0.1);
      this.destro.play();
    }
}

class SlingShot {
    constructor(bird) {
      this.sling = Constraint.create({
        pointA: {
          x: bird.body.position.x,
          y: bird.body.position.y
        },
        bodyB: bird.body,
        stiffness: 0.05,
        length: 2
      });
      World.add(world, this.sling);
    }
    
    show() {
      push();
      fill(48,23,8); stroke(48,23,8); strokeWeight(5);
      if (this.sling.bodyB) {    
        line(this.sling.pointA.x,
          this.sling.pointA.y,
          this.sling.bodyB.position.x,
          this.sling.bodyB.position.y
        );
        line(this.sling.pointA.x+10,
          this.sling.pointA.y+5,
          this.sling.bodyB.position.x,
          this.sling.bodyB.position.y
        );
      } else {
        line(this.sling.pointA.x,
          this.sling.pointA.y,
          this.sling.pointA.x+10,
          this.sling.pointA.y+5
        );
      }
      pop();
    }
    
    fly(mc){
      if(this.sling.bodyB &&
         mc.mouse.button === -1 &&
         this.sling.bodyB.position.x > 
         this.sling.pointA.x + 10) {
         this.sling.bodyB.collisionFilter.category = 1
         this.sling.bodyB = null;
         birdFlySE();
         birdLaunched = true;
         launchBird(); // Call launchBird when the bird is launched
         showLevelLost();
      }
    }
    
    attach(bird) {
      this.sling.bodyB = bird.body;
      birdLaunched = false;
    }
  }
  
class Pig {
    constructor(x, y, r, prop) {
        this.body = Bodies.circle(x, y, r, {
            restitution: 0.5,
            collisionFilter: {
                category: 2,
            },
        });
        this.r = r;
        this.img = prop.img;
        this.health = prop.health || 125;
        this.isDead = false;
        this.damage = prop.damaged;
        this.destro = prop.destroy;
        World.add(world, this.body);
    }

    show() {
        push();
        imageMode(CENTER);
        translate(this.body.position.x, this.body.position.y);
        rotate(this.body.angle);
        if (this.img) {
            image(this.img, 0, 0, 2 * this.r, 2 * this.r);
        } else {
            fill(0, 255, 0);
            ellipse(0, 0, 2 * this.r);
        }
        pop();

        push();
        textAlign(CENTER, CENTER);
        textSize(16);
        fill(255, 0, 0);
        text(this.health, this.body.position.x, this.body.position.y - this.r - 10);
        pop();
    }

    reduceHealth(amount) {
      if (millis() - gameStartTime > 2000) { // Verificar si han pasado más de 2 segundos
          this.health -= amount;
          this.damage.play();
          console.log(`Salud reducida a ${this.health}`);
          if (this.health <= 0) {
              this.destro.play();
              this.destroy();
              score += 25;
          }
      }
  }

    destroy() {
        console.log("Cerdo destruido.");
        World.remove(world, this.body);
        pigs = pigs.filter(pig => pig !== this); 
    }

    isSignificantFall() {
      const velocity = this.body.velocity;
      const speed = Math.sqrt(velocity.x ** 2 + velocity.y ** 2);
      return speed > 5; 
  }
}
