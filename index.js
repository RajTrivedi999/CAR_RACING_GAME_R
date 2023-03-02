var road=document.querySelector('.road')
var score=document.querySelector('.score')
var start=document.querySelector('.start')

let myCarPosition = {
    x:0,
    y:0,
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
        var top=line.offsetTop
        const roadBox= road.getBoundingClientRect()
        if(line.offsetTop>roadBox.bottom){
            top=0
            
        }
    line.style.top=top + myCarPosition.speed + 'px'
    })
}

function renderGame(milliseconds){
    moveLine()
    const myCar=document.querySelector('.myCar')
    const box= road.getBoundingClientRect();
    if(player.ArrowUp && myCarPosition.y > box.top){
        myCarPosition.y -= myCarPosition.speed
        console.log(myCarPosition.y)
    }
    if(player.ArrowDown && myCarPosition.y < box.bottom-120){
        myCarPosition.y += myCarPosition.speed
        console.log(myCarPosition.y)
    }
    if(player.ArrowRight && myCarPosition.x < box.right-88){
        myCarPosition.x += myCarPosition.speed
    }
    if(player.ArrowLeft && myCarPosition.x > box.left+8){
        myCarPosition.x -= myCarPosition.speed
    }

    myCar.style.top= myCarPosition.y + 'px'
    myCar.style.left= myCarPosition.x + 'px'
    console.log(myCarPosition.x + 'px');
    window.requestAnimationFrame(renderGame)
}

function startgame(){
    start.classList.add('hide')
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
        enemy.y=((i+1)*320)*(-1)
        
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