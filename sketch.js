var dog,dogImg,dogImg1;
var database;
var foodS,foodStock;
var gameState,readState;
var b1,b2,b3,b4,b5
function preload(){
   dogImg=loadImage("images/dog.png");
   dogImg1=loadImage("images/Happy.png");
b1img=loadImage("images/Bed Room.png");
b2img=loadImage("images/living Room.png");
b3img=loadImage("images/Wash Room.png");
b7img=loadImage("images/Garden.png");
b6img=loadImage("images/dogVaccination.png");

  }

//Function to set initial environment
function setup() {
  database=firebase.database();
  createCanvas(500,500);
  b1=createButton("feed the dog")
  b2=createButton("add food")
  b3=createButton("go to eating room")
  b4=createButton("I need sleep ")
  b5=createButton("go to wash Room")
  b6=createButton("go to garden to play")
  b7=createButton("check vaccination")

b1.position(400,100)
b2.position(500,100)
b3.position(580,100)
b4.position(720,100)
b5.position(400,130)
b6.position(545,130)
b7.position(700,130)

  dog=createSprite(250,300,150,150);
  dog.addImage(dogImg);
  dog.scale=0.15;
  readState=database.ref('gameState');
  readState.on("value",function(data){
    gameState=data.val();
  });


  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  textSize(20); 
}

// function to display UI
function draw() {
  background("lime");

  b1.mousePressed(function(){
    writeStock(foodS);
    dog.addImage(dogImg1);
    update(1)
  })
 
  b2.mousePressed(function(){
    writeaddStock(foodS)
    update(1)
  })
  
  b3.mousePressed(function(){
 update(1) 
  })
if(gameState===1){
  background(b2img,500,500)
  dog.remove()
  text("Food remaining : "+foodS,170,200);
  fill("green");
  stroke("black");
  strokeWeight(5)
text("you are in eating room",170,175)
fill("green")
}
b4.mousePressed(function(){
  update(2) 
   })
 if(gameState===2){
   background(b1img,500,500)
   dog.remove()
   text("Food remaining : "+foodS,170,200);
 }


 b5.mousePressed(function(){
  update(3) 
   })
 if(gameState===3){
   background(b3img,500,500)
   dog.remove()
   text("Food remaining : "+foodS,170,200);
 }

 b6.mousePressed(function(){
  update(5) 
   })
 if(gameState===4){
   background(b6img,500,500)
   dog.remove()
   text("Food remaining : "+foodS,170,200);
 }

 b7.mousePressed(function(){
  update(4) 
   })
 if(gameState===5){
   background(b7img,500,500)
   dog.remove()
   text("Food remaining : "+foodS,170,200);
 }







 fill("green");
 stroke("black");
 strokeWeight(5)
 text("I am your puppy mennu ",170,150);
 if(foodS!==undefined){
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    update(1) 
  } 
  drawSprites();
  fill("green");
  stroke("black");
  strokeWeight(5)
  text("Food remaining : "+foodS,170,200);
  textSize(13);
  text("Note: Press UP_ARROW Key To Feed Drago Milk!",130,10,300,20);
}
}

//Function to read values from DB
function readStock(data){
  foodS=data.val();
}

//Function to write values in DB
function writeStock(x){
  if(x<=0){
    x=0;
    dog.addImage(dogImg1);
  }else{
    x=x-1;
  } 
  database.ref('/').set({
    Food:x
  })
}
function writeaddStock(x){
  
 x=x+1;
  
  database.ref('/').set({
    Food:x
  })
}
//update gameState
function update(state){
  database.ref('/').update({
    gameState:state
  })
}
