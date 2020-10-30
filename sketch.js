var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloudGroup,cloudimage;
var obstaclesGroup,cactusimage1,cactusimage2,cactusimage3,cactusimage4,cactusimage5,cactusimage6

function preload(){
  trex_running =loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  
 groundImage = loadImage("ground2.png");
 cloudimage = loadImage("cloud.gif");
 cactusimage1 = loadImage("obstacle1.png");
 cactusimage2 = loadImage("obstacle2.png");
 cactusimage3 = loadImage("obstacle3.png");
 cactusimage4 = loadImage("obstacle4.png");
 cactusimage5 = loadImage("obstacle5.png");
 cactusimage6 = loadImage("obstacle6.png");
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -2;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;

  cloudGroup = new Group();
  obstaclesGroup = new Group();
}

function draw() {
  background("white");
  
  if(keyDown("space")) {
    trex.velocityY = -10;
  }
  
  trex.velocityY = trex.velocityY + 0.8
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  
  trex.collide(invisibleGround);
 
  spawnClouds();
  spawnObstacles();
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = random(80,120);
    cloud.addImage("cloud",cloudimage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 210;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudGroup.add(cloud);
  }
  
}
function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = -6;
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand){
      case 1: obstacle.addImage(cactusimage1);
      break;
      case 2: obstacle.addImage(cactusimage2);
      break;
      case 3: obstacle.addImage(cactusimage3);
      break;
      case 4: obstacle.addImage(cactusimage4);
      break;
      case 5: obstacle.addImage(cactusimage5);
      break;
      case 6: obstacle.addImage(cactusimage6);
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 110;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}