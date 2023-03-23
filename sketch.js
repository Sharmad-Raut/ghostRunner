var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;

  ghost=createSprite(200,200,50,50)
  ghost.addImage("ghost",ghostImg)
  ghost.scale=0.5
  
  doorsGroup=new Group()
  climbersGroup=new Group()
  invisibleBlockGroup=new Group()
}

function draw() {
  background(0);
  drawSprites()
  
  
    
    if(gameState==="play"){
      if(tower.y > 400){
        tower.y = 300
      }

     if (keyDown("left_arrow")){
      ghost.x=ghost.x-3
     }
     
     if(keyDown("right_arrow")){
      ghost.x=ghost.x+3
     } 

     if (keyDown("space")){
      ghost.velocityY=-10
     }

     ghost.velocityY=ghost.velocityY+0.8

     spawnDoors()

     if(climbersGroup.isTouching(ghost)){
     ghost.velocityY=0

     }

     if (invisibleBlockGroup.isTouching(ghost)||ghost.y>600)
     {
      ghost.destroy();
      gameState="end"
    }
  
}

if(gameState==="end"){
  textSize(30)
  fill("yellow")
  text("Game Over",230,250)
}
}

function spawnDoors(){
  if (frameCount%200===0){
var door=createSprite(200,0)

door.addImage(doorImg)
door.velocityY=1
  
door.x=Math.round(random(100,400))

var climber=createSprite(200,10)
climber.addImage(climberImg)
climber.velocityY=1

climber.x=door.x


var invisibleBlock=createSprite(200,15)
invisibleBlock.velocityY=1
invisibleBlock.width=climber.width
invisibleBlock.height=2
invisibleBlock.x=door.x
ghost.depth=door.depth
ghost.depth+=1

door.lifetime=700
climber.lifetime=700
invisibleBlock.lifetime=700

doorsGroup.add(door)
climbersGroup.add(climber)
invisibleBlockGroup.add(invisibleBlock)
invisibleBlock.debug=true
}
}