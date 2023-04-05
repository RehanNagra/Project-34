const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var rope,fruit,ground;
var fruit_con;
var fruit_con_2;
var fruit_con_3;
var rope3;

var bg_img;
var food;
var doggy;

var button,button2,button3;
var dog;
var sad;
var sound_btn;
var mute_btn;
var unmute_btn;

var fr;

var bk_song;
var cut_sound;
var sad_sound;
var eating_sound;

function preload()
{
  bg_img = loadImage('background.png');
  food = loadImage('bone.png');
  doggy = loadImage('dog.png');
  
  bk_song = loadSound('sound1.mp3');
  sad_sound = loadSound("sad.wav")
  cut_sound = loadSound('rope_cut.mp3');
  eating_sound = loadSound('eating_sound.mp3');
  air = loadSound('air.wav');

  sad = loadImage("dog_sad.png");

  star_img = loadImage("star.png")
  empty_star = loadAnimation("empty.png")
  one_star = loadAnimation("one_star.png")
  two_star = loadAnimation("stars.png")

  muteImg = loadImage("mute.png");
  unmuteImg = loadImage("unmute.png");

  
  sad.playing = true;
  sad.looping= false;
  
}

function setup() 
{
  createCanvas(500,700);
  frameRate(80);

  bk_song.play();
  bk_song.setVolume(0.5);

  engine = Engine.create();
  world = engine.world;

  //btn 1
  button = createImg('cut_btn.png');
  button.position(100,90);
  button.size(50,50);
  button.mouseClicked(drop);

   //btn 2
   button2 = createImg('cut_btn.png');
   button2.position(450,90);
   button2.size(50,50);
   button2.mouseClicked(drop2);
 
   rope = new Rope(7,{x:120,y:90});
   rope2 = new Rope(7,{x:490,y:90});

   sound_btn = createSprite(width-50,20,50,50)
   sound_btn.scale = 0.5;
   sound_btn.addImage(muteImg);
  //  sound_btn.position(width-50,20);
  //  sound_btn.size(50,50);
   if(mousePressedOver(sound_btn)){
    changeSoundState()
   }
   

  // mute_btn = createImg('mute.png');
  // mute_btn.position(width-50,20);
  // mute_btn.size(50,50);
  // mute_btn.mouseClicked(mute);

  // unmute_btn = createImg('unmute.png');
  // unmute_btn.position(width-50,20);
  // unmute_btn.size(50,50);
  // unmute_btn.mouseClicked(mute);
  // unmute_btn.visible = false
  
  ground = new Ground(300,height,width,20);
  

  dog = createSprite(200,height-85,100,100);
  dog.addImage(doggy)
  dog.addImage("sad",sad)
  dog.scale = 0.5;

  

  star_display = createSprite(50,20,30,30)
  star_display.scale = 0.2
  star_display.addAnimation("empty",empty_star)
  star_display.addAnimation("one",one_star)
  star_display.addAnimation("two",two_star)
  star_display.changeAnimation("empty")

  
  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,fruit);

  fruit_con = new Link(rope,fruit);
  fruit_con_2 = new Link(rope2,fruit);

  star = createSprite(50,370,20,20)                        
  star.addImage(star_img)
  star.scale = 0.02

  star2 = createSprite(400,290,20,20)
  star2.addImage(star_img)
  star2.scale = 0.02

  blower = createImg("balloon.png")
  blower.position(30,250)
  blower.size(120,120)
  blower.mouseClicked(airblow)


  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  
}

function draw() 
{
  background(51);
  image(bg_img,0,0,width,height);

  push();
  imageMode(CENTER);
  if(fruit!=null){
    image(food,fruit.position.x,fruit.position.y,70,70);
  }
  pop();

  rope.show();
  rope2.show();

  Engine.update(engine);
  ground.show();

  drawSprites();

 
  
  
  if(collide(fruit,star,20)==true){
    star.visible = false
    star_display.changeAnimation("one")
  }
  
  if(collide(fruit,star2,20)==true){
    star2.visible = false
    star_display.changeAnimation("two")
  }

  if(collide(fruit,dog,80)==true)
  {
    World.remove(engine.world,fruit);
    fruit = null;
    
    eating_sound.play();
  }
  

  if(fruit!=null && fruit.position.y>=650)
  {
    dog.changeImage("sad");
    bk_song.stop();
    sad_sound.play();
    fruit=null;
   }
  
}

function drop()
{
  cut_sound.play();
  rope.break();
  fruit_con.dettach();
  fruit_con = null; 
}

function drop2()
{
  cut_sound.play();
  rope2.break();
  fruit_con_2.dettach();
  fruit_con_2 = null;
}

function collide(body,sprite,x)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=x)
            {
               return true; 
            }
            else{
              return false;
            }
         }
}


function changeSoundState()
{
  if(bk_song.isPlaying() && mousePressedOver(sound_btn))
     {
      bk_song.stop();
      sound_btn.addImage(unmuteImg)


    }
     else if(!bk_song.isPlaying() && mousePressedOver(sound_btn)){
      bk_song.play();
      sound_btn.addImage(muteImg)
     }
}



function airblow(){
  Matter.Body.applyForce(fruit,{x:0,y:0},{x:0.03,y:0})
  air.play()
}

