// Canvas setup
const canvas = document.getElementById('confetti');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Heart class
class Heart {
  constructor(x=null, y=null){
    this.x = x!==null ? x : Math.random()*canvas.width;
    this.y = y!==null ? y : Math.random()*canvas.height;
    this.size = Math.random()*20 + 20;
    this.speed = Math.random()*1.5 + 0.5;
    this.angle = Math.random()*2*Math.PI;
    this.spin = Math.random()*0.05 - 0.025;
    this.color = "#f2ebed";
  }

  drawHeart(x, y, size){
    ctx.beginPath();
    const topCurveHeight = size*0.3;
    ctx.moveTo(x, y+topCurveHeight);
    ctx.bezierCurveTo(x, y, x-size/2, y, x-size/2, y+topCurveHeight);
    ctx.bezierCurveTo(x-size/2, y+(size+topCurveHeight)/2, x, y+(size+topCurveHeight)/1.2, x, y+size);
    ctx.bezierCurveTo(x, y+(size+topCurveHeight)/1.2, x+size/2, y+(size+topCurveHeight)/2, x+size/2, y+topCurveHeight);
    ctx.bezierCurveTo(x+size/2, y, x, y, x, y+topCurveHeight);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  draw(){
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    this.drawHeart(0,0,this.size);
    ctx.restore();
  }

  update(){
    this.y -= this.speed;
    this.angle += this.spin;
    if(this.y + this.size < 0) this.y = canvas.height + this.size;
  }
}

// Hearts array
const hearts = [];
for(let i=0;i<30;i++) hearts.push(new Heart());

// Animate hearts
function animate(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  hearts.forEach(h=>{
    h.update();
    h.draw();
  });
  requestAnimationFrame(animate);
}
animate();

// Spawn hearts on click
canvas.addEventListener('click',(e)=>{
  for(let i=0;i<5;i++) hearts.push(new Heart(e.clientX,e.clientY));
});

window.addEventListener('resize', ()=>{
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// Message tap → change text
const messageBox = document.getElementById('messageBox');
const music = document.getElementById('bgMusic');

// Mobile autoplay fix
let musicStarted = false;
document.addEventListener('click', ()=>{
  if(!musicStarted){
    music.play();
    musicStarted = true;
  }
});

// Tap box → change message
let tapped = false;
messageBox.addEventListener('click', ()=>{
  if(!tapped){
    messageBox.querySelector('h1').textContent = "💖🙈 I Love You My THANGAMEY😘🫂💖";
    tapped = true;
  }
});