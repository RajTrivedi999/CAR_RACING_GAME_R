var road=document.querySelector('.road')
var score=document.querySelector('.score')
var start=document.querySelector('.start')
let myScore=0
let myCarPosition = {
    speed:5
}

let player={
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false
}

function moveLine(){
    const lines=document.querySelectorAll('.line')
    
    lines.forEach(line =>{
        var top2=line.offsetTop
        const roadBox= road.getBoundingClientRect()
        if(line.offsetTop>roadBox.bottom-20){
            top2=0
        }
    line.style.top=top2 + myCarPosition.speed + 'px'
    })
}

function moveEnemy(myCar){
    const enemies=document.querySelectorAll('.enemy')
    
    enemies.forEach(e =>{
        const enemyBox=e.getBoundingClientRect()
        const myBox=myCar.getBoundingClientRect()
        if(contact(myBox,enemyBox)){
            
        }
        e.y+= myCarPosition.speed
        e.style.top=e.y + 'px'
        if(e.y > 820){
            e.y=-350
            e.style.top=e.y + 'px'
            e.style.backgroundColor=enemyColor()
            e.style.left=Math.floor(Math.random()* 512) + 'px'
        }
    })
}

function contact(myCar,enemyCar){
    if(myCar.top < enemyCar.bottom && myCar.right > enemyCar.left && myCar.bottom > enemyCar.top && myCar.left < enemyCar.right){
        myCarPosition.start=false
        road.innerHTML=""
        start.classList.remove('hide')
        start.innerHTML="GAME OVER <br> YOUR SCORE IS: " + myScore + "<br> CLICK HERE TO START AGAIN"
        myScore=0
        myCarPosition.speed=5
    }
}

function renderGame(milliseconds){
    const myCar=document.querySelector('.myCar')
    const box= road.getBoundingClientRect();
    score.innerHTML="SCORE : " + myScore
    myScore++
    if(myScore%100==0) myCarPosition.speed+=1
    if(myCarPosition.start){
        moveLine()
        moveEnemy(myCar)
        if(player.ArrowUp && myCarPosition.y > box.top){
            myCarPosition.y -= myCarPosition.speed
            console.log(myCarPosition.y)
        }
        if(player.ArrowDown && myCarPosition.y < box.bottom-120){
            myCarPosition.y += myCarPosition.speed
            console.log(myCarPosition.y)
        }
        if(player.ArrowRight && myCarPosition.x < box.width-92){
            myCarPosition.x += myCarPosition.speed
        }
        if(player.ArrowLeft && myCarPosition.x > 4){
            myCarPosition.x -= myCarPosition.speed
        }
    }
    myCar.style.top= myCarPosition.y + 'px'
    myCar.style.left= myCarPosition.x + 'px'
    
    window.requestAnimationFrame(renderGame)
}

function startgame(){
    start.classList.add('hide')
    myCarPosition.start=true
    let top=0;
    for(var i=0;i<5;i++){
        var line=document.createElement('div')
        line.classList.add('line')
        line.style.top=top + 'px'
        road.appendChild(line)
        top+=163
    }

    let myCar=document.createElement('div')
    myCar.classList.add('myCar')
    road.appendChild(myCar)
    
    myCarPosition.y = myCar.offsetTop;
    myCarPosition.x = myCar.offsetLeft;

    for(var i=0;i<3;i++){
        let enemy=document.createElement('div')
        enemy.classList.add('enemy')
        enemy.y=((i+1)*400)*(-1)
        //alert(enemy.y)
        enemy.style.top=enemy.y + 'px'
        enemy.style.backgroundColor=enemyColor()
        enemy.style.left=Math.floor(Math.random() * 512) + 'px'
        road.appendChild(enemy)
    }
    window.requestAnimationFrame(renderGame)
}

function enemyColor(){
    function r(){
        return Math.floor(Math.random()*256)
    }
    return "rgb("+r()+","+r()+","+r()+")"
}

function upword(event){
    event.preventDefault()
    player[event.key]=false
}

function downword(event){
    event.preventDefault()
    player[event.key]=true
}

document.addEventListener('keyup',upword)
document.addEventListener('keydown',downword)
start.addEventListener('click',startgame)