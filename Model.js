class Box {
  constructor(x, y, w, h, img, op, scale, options={}){
    this.body = Bodies.rectangle(x, y, w, h, options);
    this.w = w;  this.h = h; this.img = img; this.op = op; this.scale = scale;
    this.pattern = createPattern(img, w, h, scale);
    World.add(world, this.body);
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
}

class Ground extends Box {
  constructor(x, y, w, h, img, op, scale){
    super(x, y, w, h, img, op, scale, {isStatic: true});
  }
}

class Bird {
  constructor(x, y, r, mass, img){
    this.body = Bodies.circle( x, y, r, {
      restitution: 0.7,
      collisionFilter: {
        category: 2
      }
      });
    this.img = img;
    Body.setMass(this.body, mass);
    World.add(world, this.body);
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
      length: 5
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
    }
  }
  
  attach(bird) {
    this.sling.bodyB = bird.body;
  }
}