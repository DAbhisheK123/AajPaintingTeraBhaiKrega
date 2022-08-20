window.addEventListener("load",()=>{
    const canvas =document.querySelector("#canvas");
    const contxt= canvas.getContext("2d");
    canvas.height= window.innerHeight;
    canvas.width= window.innerWidth/1.2;

window.addEventListener("resize",()=>{
    canvas.height= window.innerHeight;
    canvas.width= window.innerWidth/1.2;
});
canvas.addEventListener('contextmenu', event => event.preventDefault());

let paint=false;
let arr=[];
let index=-1;

function StartPosition(e){
    paint=true;
    draw(e);

}
function EndPosition(){
 
    paint=false;
    contxt.beginPath();
    if(Event.type !='mouseup'){
    arr.push(contxt.getImageData(0,0,canvas.width,canvas.height));
    index+=1;
  
    }
    modify();
    
}
function modify(){
  stroke.addEventListener('change',e=>{
    contxt.strokeStyle=e.target.value;
   
  });
  sizeofbrush.addEventListener('change',e=>{
    contxt.lineWidth=e.target.value;
 
  });
}

function draw(e){
  if(!paint) return;
  modify();
  contxt.lineCap="round";
  contxt.lineTo(e.clientX,e.clientY);
  contxt.stroke();
  contxt.beginPath();
  contxt.moveTo(e.clientX,e.clientY);
  
}
document.getElementById("clear").addEventListener("click", clearcanvas);
document.getElementById("undo").addEventListener("click", undo_canvas);
function clearcanvas(){
       contxt.clearRect(0,0,canvas.width,canvas.height);
       arr=[];
       index=-1;
}
canvas.addEventListener("mousedown",StartPosition);
canvas.addEventListener("mouseup",EndPosition);
canvas.addEventListener("mousemove",draw);
function undo_canvas(){
    if(index<=0){
      clearcanvas();
    }
    else{
      index-=1;
      arr.pop();
      contxt.putImageData(arr[index],0,0);
      
    }
}


});

