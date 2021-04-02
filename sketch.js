//Create variables here
var dog, happyDog, database, foodS, foodStock, dImg;
var feed, addFood, foodObj, lastFed;
var bImg, wImg, gImg, lImg, readState, changeState, sadDog, gameState;

function preload()
{
	//load images here
  dImg = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg.png");
  bImg = loadImage("images/Bed Room.png");
  wImg = loadImage("images/washroom.png");
  gImg = loadImage("images/Garden.png");
  lImg = loadImage("images/Living Room.png");
  sadDog = loadImage("images/sad.png");
}

function setup() {
	createCanvas(900, 700);
  dog = createSprite(840,300,100,10);
  dog.addImage(dImg);
  dog.scale = 0.15;

  database=firebase.database();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock)

  foodObj = new Food();

  readState=database.ref("gameState");
  readState.on("value",function(data){
    gameState=data.val();
  });
}


function draw() {  
  background(46, 139, 87)
  foodObj.display();
  if(foodS == 0){
    dog.addImage(happyDog);
  }else{
    dog.addImage(sadDog);
  }

  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val()
  });
  drawSprites();
  //add styles here
  textSize(15);
  fill("white");

  if(lastFed>=12){
    text("Last Feed :"+lastFed%12 + "PM",200,60);
  }else if(lastFed==0){
    text("Last Feed : 12AM",350,30);
  }else{
    text("Last Feed : "+lastFed + "AM",200,60);
  }
  
  if(gameState === 1){
    dog.addImage(happyDog);
    dog.scale = 0.15;
    dog.y = 250;
  }
  if(gameState === 2){
    dog.addImage(sadDog);
    dog.scale = 0.15;
    dog.y = 250;
  }

  var Bath=createButton("I want to take a bath");
  Bath.position(580,125);
  if(Bath.mousePressed(function(){
    gameState=3;
    database.ref('/').update({'gameState':gameState});
  }));
  if(gameState==3){
    background(wImg);
  }

  var Sleep=createButton("I am very sleepy");
  Sleep.position(740,125);
  if(Sleep.mousePressed(function(){
    gameState=4;
    database.ref('/').update({'gameState':gameState});
  }));
  if(gameState===4){
    background(bImg);
  }

  var Play=createButton("Lets play !");
  Play.position(580,160);
  if(Play.mousePressed(function(){
    gameState=5;
    database.ref('/').update({'gameState':gameState});
  }));
  if(gameState === 5){
    background(lImg);
  }

  var PlayInGarden=createButton("lets play in the park");
  PlayInGarden.position(710, 160);
  if(PlayInGarden.mousePressed(function(){
    gameState=6;
    database.ref('/').update({'gameState':gameState});
  }));
  if(gameState === 6){
    background(gImg);
  }
  
}

function readStock(data){
  foodS=data.val();
}

function writeStock(){
  database.ref('/').update({
    food:x
  })
}

function update(state){
  database.ref('/').update({
    gameState:state
  })
}

function feedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1)
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

function addFoods(){
  foodS++;
  foodObj.updateFoodStock(foodObj.getFoodStock()+1)

  database.ref('/').update({
    Food:foodObj.getFoodStock()
  })
}