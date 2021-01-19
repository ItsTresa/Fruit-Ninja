var Play = 1;
var End = 0;
var gamestate = Play;
var Position;

var fruit , fruit1 , fruit2 , fruit3 , fruit4 , fruitGroup;
var r=0;
var score  = 0;

var monster , monsterM , monsterGroup;
var sword , swordI;

var gameover , gameoverI;
var gameoverS , scoreS;

function preload()
{
     swordI = loadImage("sword.png");
  
     fruit1=loadImage("fruit1.png");
     fruit2=loadImage("fruit2.png");
     fruit3=loadImage("fruit3.png");
     fruit4=loadImage("fruit4.png");
   monsterM=loadAnimation("alien1.png","alien2.png")
  gameoverI = loadImage("gameover.png");
  
  gameoverS = loadSound("gameover.mp3");
  scoreS=loadSound("knifeSwooshSound.mp3");
  
}

function setup()
{
     sword=createSprite(40,400,20,20);
     sword.addImage(swordI);
     sword.scale=0.6;
     
     fruitGroup=createGroup();
     monsterGroup=createGroup();
}



function draw()
{
  background("lightblue");
  
  
  if(gamestate===Play)
  {   
    fruits();
    enemy();
    sword.y=World.mouseY;
    sword.x=World.mouseX;
    
  }
  
  if(gamestate===End)
  {
      monsterGroup.destroyEach();
    fruitGroup.destroyEach();
  }
  if(sword.isTouching(monsterGroup))
  {
    sword.visible=false;
    monsterGroup.destroyEach();
    fruitGroup.destroyEach();
    gameover=createSprite(200,200,20,20);
    gameover.addImage(gameoverI);
    gameover.scale=1;
    gamestate=End;
    
    gameoverS.play();
  }
  fill("red");
  text("score = " + score , 300,30);
  if(sword.isTouching(fruitGroup))
  {
      fruitGroup.destroyEach();
      score=score+5;
      scoreS.play();
      
  }
  
  
  
  drawSprites();
 
}
  
function fruits()
{
  if(World.frameCount%80===0){
    
    fruit=createSprite(400,200,20,20)
    fruit.scale=0.2;
    
    Position=Math.round(random(1,2));
    
    if(Position==1)
    {
      fruit.x=400;
      fruit.velocityX=-(8+(score/5));
      
    }
    else
    if(Position==2)
    {
      fruit.x=0;
      
      fruit.velocityX= (7+(score/5));
    }
    r=Math.round(random(1,4));

    if(r==1){
      fruit.addImage(fruit1);
    }
    else if(r==2)
    {
    fruit.addImage(fruit2);
    }
    else if (r==3)
    {
      fruit.addImage(fruit3);
    }
    else if(r==4)
    {
      fruit.addImage(fruit4);
    }
    fruit.y=Math.round(random(50,340));

    fruit.setLifetime=100;
    
    fruitGroup.add(fruit);
  }
}

function enemy()
{
  if(World.frameCount%200===0)
  {
    monster=createSprite(300,200,20,20);
    monster.addAnimation("moving",monsterM);
    monster.y=Math.round(random(100,300));
    monster.velocityX=-5;
    monster.velocityX=-(6+(score/10));
    monster.setLifetime=150;
    
    monsterGroup.add(monster);
  }
}
