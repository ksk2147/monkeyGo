var monkey , monkey_running, monkeyCollide;
var ground, invisiGround;
var banana ,bananaImage, obstacle, obstacleImage;
var bananaGroup, obstacleGroup;
var survivalTime = 0;
var PLAY = 0;
var END = 1;
var gameState = "play";

function preload(){
monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
monkeyCollide = loadAnimation("sprite_1.png")
  
bananaImage = loadImage("banana.png");
obstacleImage = loadImage("obstacle.png");
  
obstaclesGroup = new Group();
bananaGroup = new Group();
}

function setup(){
createCanvas(600, 300);
  
obstacleGroup = createGroup();
bananaGroup = createGroup();

ground = createSprite(300,300,600,100);
ground.shapeColor = ("green")
ground.velocityX = -4;

monkey = createSprite(80,230,10,10);
monkey.scale = 0.12;
monkey.addAnimation("monkey", monkey_running);
  
invisiGround = createSprite(300, 278, 600, 7);
invisiGround.visible = false; 
  
}

function draw(){
background("skyblue");

if (ground.x<300){ ground.x = ground.width/2; 
}


 
 if (gameState === "play"){

  if(keyDown("space")) {
  monkey.velocityY = -7;  
  }

monkey.velocityY = monkey.velocityY+0.5; 
  

monkey.collide(invisiGround);

if(obstacleGroup.isTouching(monkey)){
        ground.velocityX = 0;
        monkey.velocityY = 0;
        obstacleGroup.setVelocityXEach(0);
        bananaGroup.setVelocityXEach(0);
        obstacleGroup.setLifetimeEach(-1);
        bananaGroup.setLifetimeEach(-1);
        gameState = "end";
}
   if (monkey.isTouching(bananaGroup)){
  bananaGroup.destroyEach();
  
   }

  
//if (obstaclesGroup.isTouching(monkey)){ monkey.destroy(); 
//monkey.velocityY = 0;
//obstacleGroup.setVelocityXEach(0);                   bananaGroup.setVelocityXEach(0);
//obstacleGroup.setLifetimeEach(-1);
//bananaGroup.setLifetimeEach(-1);
//gameState = "end"; 
//}   
 }

  if (gameState === "end"){
  stroke ("yellow");
  fill ("yellow")
  textSize (30);
  text ("GAME OVER", 230, 150);
  }

obstacles(); 
bananas();

stroke("black");
textSize(20);
fill("black")
survivalTime=Math.ceil(frameCount/frameRate())
text("Survival Time: "+ survivalTime, 400, 50);
 
drawSprites();
}
function bananas(){
if (frameCount%80 === 0){

banana = createSprite(620,120, 50, 50)
banana.addImage(bananaImage);
banana.scale = 0.1;
banana.velocityX =-3;        
banana.lifetime = 800;
bananaGroup.add(banana);
}
}

function obstacles(){
if (frameCount%300 === 0){
    
obstacle = createSprite(500,253,50,50);
obstacle.addImage(obstacleImage);  
obstacle.setCollider("circle", 0, 0, 180);
obstacle.scale = 0.13 ;
obstacle.velocityX = -5;
obstacle.lifetime = 800;
obstacleGroup.add(obstacle);
}
}