var ball,stop,backGround,dimond,gold,rock;
var score=0;
var PLAY=1;
var END=0;
var gameState=PLAY;

function preload() {
  backGroundImage=loadImage("background.jpg");
  dimondImage=loadImage("dimond.png");
  ballImage=loadImage("hero.gif");
  goldImage=loadImage("gold.png");
  rockImage=loadImage("rock.png");
  stopImage=loadImage("stop.png");
  restartImage=loadImage("play-again-.png");
  gameoverImage=loadImage("game-over-.png");
  checkPointSound=loadSound("checkPoint.mp3");
  dieSound=loadSound("die.mp3");
  jumpSound=loadSound("jump.mp3");

  


  
}


function setup(){
  createCanvas(400,400);
  backGround=createSprite(200,200,200,200);
  backGround.addImage(backGroundImage);
  backGround.velocityX=-7;
  backGround.scale=1.5;
  ball=createSprite(50,350);
  ball.addImage(ballImage);
  ball.scale=0.3;
  ground=createSprite(200,375,400,10);
  ground.visible=false;
  edges=createEdgeSprites();

  restart=createSprite(200,150,0,0);
  restart.scale=0.1;
  restart.addImage(restartImage);

  gameover=createSprite(200,100,0,0);
  gameover.scale=0.7;
  gameover.addImage(gameoverImage);
  
  goldgroups=createGroup();
  dimondgroups=createGroup();
  obstaclegroups=createGroup();
 ball.debug=true;
 ball.setCollider("rectangle",20,0,200,250);



}



function draw(){
  background(0);
  if(gameState===PLAY){
    if(backGround.x<0){
      backGround.x=250;
      }
      
    if(ball.isTouching(obstaclegroups)){
      gameState=END;
    }
    number=Math.round(random(1,2))
    if(number===1){
     creategold();
     }
    else{
     spawndimond();
    }
   
    if(keyDown(UP_ARROW)&&ball.y>300){
      ball.velocityY=-10;
      }
    ball.velocityY=ball.velocityY+0.5;
 if(ball.isTouching(dimondgroups)){
   score=score+3;
  // dimondgroups.destroyEach();

 }
 if(ball.isTouching(goldgroups)){
  score=score+2;
  //goldgroups.destroyEach();


}
if(keyDown(RIGHT_ARROW)){
  ball.x=ball.x+6;

}
if(keyDown(LEFT_ARROW)){
  ball.x=ball.x-6;

}

 createobstacle();
 restart.visible=false;
 gameover.visible=false;

  ball.collide(edges[0])
  }
  else{
    ball.velocityX=0;
    ball.velocityY=0;
   backGround.velocityX=0;
   obstaclegroups.setVelocityXEach(0);
   goldgroups.setVelocityYEach(0);
   dimondgroups.setVelocityYEach(0);
   obstaclegroups.setLifetimeEach(-1);
   goldgroups.setLifetimeEach(-1);
   dimondgroups.setLifetimeEach(-1);
   gameover.visible=true;
   restart.visible=true;

  }
  if(mousePressedOver(restart)){
    gameState=PLAY;
    obstaclegroups.destroyEach();
    goldgroups.destroyEach();
   dimondgroups.destroyEach();
   score=0;
   ball.x=50;
   backGround.velocityX=-5;
    
    
  
  }
  ball.collide(ground);
 
  
if(score%50===0&&score>0){
  checkPointSound.play();
  text("Keep it up",150,200);


}
 



  
  drawSprites();
  textSize(20);
  fill("red");
  text("points:"+score,250,50);
  

}
function creategold(){
  if(frameCount%10===0){
 gold=createSprite(200,0,400,400);
 gold.velocityY=7;
 gold.addImage(goldImage);
 gold.scale=0.03
gold.x= Math.round(random(10,400))
 gold.lifetime=50;
 goldgroups.add(gold);
}}


function spawndimond(){
  if(frameCount%50===0){
  
    dimond=createSprite(200,0,400,400);
    dimond.velocityY=5;
    dimond.x=Math.round(random(10,400))
    dimond.scale=0.1;
    dimond.addImage(dimondImage);
    dimond.lifetime=50;
    dimondgroups.add(dimond);

  }
}

function createobstacle(){
  if(frameCount%40===0){
    obstacle=createSprite(400,350,400,50);
    number=Math.round(random(1,2))
    if(number===1){
      obstacle.addImage(rockImage);
      obstacle.setCollider("circle",0,0,70);
     
    }
    else{
      obstacle.addImage(stopImage);

    }
    obstacle.velocityX=-6;
    obstacle.lifetime=80;
    obstacle.scale=0.15;
    obstaclegroups.add(obstacle);


  }
}

 


