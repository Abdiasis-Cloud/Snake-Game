let canvas=document.getElementById("gamecanvas")
let ctx =canvas.getContext("2d")
let  gridSize= 20

let snake =[{x:gridSize,y:gridSize}]
let direction= {x:gridSize,y:0}
let food = randomfood()


///eventListaning
document.addEventListener('keydown', e=>{
   if(e.key==="ArrowUp" && direction.y===0) direction={x:0,y:-gridSize}
   if(e.key==="ArrowDown" && direction.y===0) direction={x:0,y:gridSize}

   if(e.key==="ArrowLeft" && direction.x===0) direction={x:-gridSize,y:0}
   if(e.key==="ArrowRight" && direction.x===0) direction={x:gridSize,y:0}
})



setInterval(()=>{
 draw()
 randomfood()
 UpdateGame()
},300)



function draw(){
    ctx.clearRect(0,0,canvas.clientWidth,canvas.height)


    //draw snake

    ctx.fillStyle="Red"
    snake.forEach(part=>ctx.fillRect(part.x, part.y,gridSize,gridSize))


    ctx.fillStyle="Green"
    ctx.fillRect(food.x ,food.y, gridSize,gridSize)

}

function randomfood(){
    return{
        x:Math.floor(Math.random()*(canvas.width/gridSize))* gridSize,
       y:Math.floor(Math.random()*(canvas.height/gridSize))* gridSize
    }
}



function UpdateGame(){
    let head= {x:snake[0].x+ direction.x, y:snake[0].y+direction.y}
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height || head.y >= canvas.height) {
        return   GameOver()
    }

    snake.unshift(head)

    if(head.x===food.x&& head.y===food.y){
       food= randomfood()

    }else{
        snake.pop()
    }
}
