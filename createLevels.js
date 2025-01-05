function create_lvl1() {
  ground = new Ground(width/2, height-10,
                      width, 20, sprites.grass, 255, 0.5);
  birdsXgame = 3;
 bird = new Bird(150, 350, 15, 2, sprites.red);
  slingShot = new SlingShot(bird);

  // 430: limite en y
  boxes[0] = new Box(500, 410, 14, 40, sprites.wood, 255, 0.1); 
  boxes[1] = new Box(550, 370, 14, 120, sprites.wood, 255, 0.1);
  boxes[2] = new Box(605, 423, 70, 14, sprites.wood, 255, 0.1); 
  boxes[3] = new Box(580, 385, 14, 60, sprites.ice, 125, 0.1);
  boxes[4] = new Box(630, 385, 14, 60, sprites.ice, 125, 0.1);
  boxes[5] = new Box(605, 360, 70, 14, sprites.wood, 255, 0.1);
  boxes[6] = new Box(662, 400, 14, 120, sprites.wood, 255, 0.1);
  boxes[7] = new Box(605, 300, 130, 14, sprites.wood, 255, 0.1);
  boxes[8] = new Box(578, 230, 14, 120, sprites.wood, 255, 0.1);
  boxes[9] = new Box(632, 230, 14, 120, sprites.wood, 255, 0.1);
  boxes[10] = new Box(605, 280, 25, 14, sprites.wood, 255, 0.1);
  // cerdo va arriba de 10 así que calcular a partir de ahí
  boxes[11] = new Box(605, 160, 70, 14, sprites.wood, 255, 0.1);
  boxes[12] = new Box(605, 120, 14, 40, sprites.wood, 255, 0.1);
  boxes[13] = new Box(710, 410, 14, 40, sprites.wood, 255, 0.1); 
  
  
}
