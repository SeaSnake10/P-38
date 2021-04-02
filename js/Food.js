class Food{
    constructor(){
        this.foodStock=0;
        this.lastFed;
        this.image = loadImage("images/milk.png")
    }

    updateFoodStock(foodStock){
        this.foodStock=foodStock
    }

    getFedTime(lastFed){
        this.lastFed=lastFed;
    }

    deductFood(){
        if(this.foodStock>0){
            this.foodStock=this.foodStock-1;
        }
    }

    getFoodStock(){
        return this.foodStock
    }
    
   

    display(){
      var x=80,y=100;

        var button = createButton("Feed the Dog");
        button.position(725,95);

        if(button.mousePressed(function(){
            foodS=foodS-1;
            gameState=1;
            database.ref('/').update({'gameState':gameState})
            feedDog();
        }));

        var addFood = createButton("Add Food");
        addFood.position(825,95);

        if(addFood.mousePressed(function(){
            foodS=foodS+1;
            gameState=2;
            database.ref('/').update({'gameState':gameState})
            addFoods();
        }));
    

      if(this.foodStock!=0){
          for(var i=0; i<this.foodStock; i++){
              if(i%10==0){
                  x=80;
                  y=y+50;
              }
              image(this.image,x,y,50,50);
              x=x+30;
          }
      }
    }
}