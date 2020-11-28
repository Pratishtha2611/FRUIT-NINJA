    var fruit1,fruit2,fruite3,fruit4;
    var fruit;
    var alein,alien_moving;
    var PLAY = 1;
    var END = 0;
    var gameState = PLAY;
    var score;
    var Gameover;
    var knifeSwooshSound;
    var gameover;

    function preload(){
    fruit1 = loadImage("fruit1.png");
    fruit2 = loadImage("fruit2.png");
    fruit3 = loadImage("fruit3.png");
    fruit4 = loadImage("fruit4.png");
      
    Sword = loadImage("sword.png");
      
    alien_moving=loadAnimation("alien1.png","alien2.png");
      
    Gameover = loadImage("gameover.png");
      
    knifeSwooshSound = loadSound("knifeSwooshSound.mp3");
    gameover = loadSound("gameover.mp3");

    }  

    function setup(){
    createCanvas(400,400);
    
    //creating sword
    sword=createSprite(40,200,20,20);
    sword.addImage(Sword);
    sword.scale=0.5;
      
    fruitGroup=createGroup();
    enemyGroup=createGroup();
      
    score=0;
    }

    function draw(){
    background("lightblue");
      
  
    if(gameState === PLAY){
    sword.y=World.mouseY;
    sword.x=World.mouseX;
      
    //increase the score if sword is touching the fuit
    if(fruitGroup.isTouching(sword)){
    fruitGroup.destroyEach();
    knifeSwooshSound.play();
    score = score+2;
    }
    if(enemyGroup.isTouching(sword)){
    gameState = END;
    gameover.play();
    }
    }
    else if (gameState === END){
    //stop everything if sword is touching the alein
    fruitGroup.destroyEach();
    enemyGroup.destroyEach(); 
    fruitGroup.setVelocityXEach(0);
    fruitGroup.setVelocityYEach(0);
    enemyGroup.setVelocityXEach(0);
    enemyGroup.setVelocityYEach(0);
    //change alien animation to gameover animation and         reset its position
    sword.addImage(Gameover);
    score=0;
    }  
    
    fruits();
    Enmey();
    drawSprites();
    
    //displaying score
    text("Score: "+ score, 300,30);
      
    }

    function fruits(){
    if(World.frameCount%80 === 0){
    fruit=createSprite(400,200,20,20);
    fruit.scale = 0.2;
    //fruit.debug=true;
    r=Math.round(random(1,4));
    if (r == 1){
    fruit.addImage(fruit1);
    }else if (r == 2){
    fruit.addImage(fruit2);
    }else if (r == 3){
    fruit.addImage(fruit3);
    }else{
    fruit.addImage(fruit4);
    }
    fruit.y=Math.round(random(50,340));
    fruit.velocityX = -(7+(score/4));
    fruit.velocityY =Math.round(random(-7,7));
    fruit.setLifetime=80;
    fruitGroup.add(fruit);
    } 
    }
   
    function Enmey(){
    if(World.frameCount%200===0){
    alien=createSprite(400,200,20,20);
    alien.addAnimation("moving",alien_moving);
    alien.y=Math.round(random(100,300));
    alien.velocityX = -(8+(score/10));
    alien.setLifetime=80;
    enemyGroup.add(alien);
    }
    }