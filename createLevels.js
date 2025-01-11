

let translado = 0;

function create_lvl1() {
  ground = new Ground(width/2, height-10,
                      width+500, 20, material_grass);
  birdsXgame = 3;
   bird = new Bird(150, 350, 15, 2, sprites.red);
  slingShot = new SlingShot(bird);
  
  //translado = 250;

  // 430: limite en y
  boxes[0] = new Box(500+translado, 410, 14, 40, material_wood); 
  boxes[1] = new Box(550+translado, 370, 14, 120, material_wood);
  boxes[2] = new Box(605+translado, 423, 70, 14, material_wood); 
  boxes[3] = new Box(580+translado, 385, 14, 60, material_ice);
  boxes[4] = new Box(630+translado, 385, 14, 60, material_ice);
  boxes[5] = new Box(605+translado, 360, 70, 14, material_wood);
  boxes[6] = new Box(662+translado, 400, 14, 120, material_wood);
  boxes[7] = new Box(605+translado, 300, 130, 14, material_wood);
  boxes[8] = new Box(578+translado, 230, 14, 120, material_wood);
  boxes[9] = new Box(632+translado, 230, 14, 120, material_wood);
  boxes[10] = new Box(605+translado, 280, 25, 14, material_wood);
  // cerdo va arriba de 10 así que calcular a partir de ahí
  boxes[11] = new Box(605+translado, 160, 70, 14, material_wood);
  boxes[12] = new Box(605+translado, 120, 14, 40, material_wood);
  boxes[13] = new Box(710+translado, 410, 14, 40, material_wood); 
  
  
}
