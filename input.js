let inputDirection = {x: 0, y: 0}
let lastInputDirection = {x: 0, y: 0}

window.addEventListener('keydown', e =>{
    switch(e.key){
        case 'ArrowUp':
            if(lastInputDirection.y !== 0) break
            inputDirection = {x: 0, y: -1};
            break
        case 'ArrowDown':
            if(lastInputDirection.y !== 0) break
            inputDirection = {x: 0, y: 1};
            break
        case 'ArrowLeft':
            if(lastInputDirection.x !== 0) break
            inputDirection = {x: -1, y: 0};
            break
        case 'ArrowRight':
            if(lastInputDirection.x !== 0) break
            inputDirection = {x: 1, y: 0};
            break
    }
})

//////////TOUCH////////////

function swipedetect(el, callback){
  
    let touchsurface = el, swipedir, startX, startY, distX, distY,
    threshold = 100, //required min distance traveled to be considered swipe
    restraint = 100, // maximum distance allowed at the same time in perpendicular direction
    allowedTime = 300, // maximum time allowed to travel that distance
    elapsedTime, startTime, handleswipe = callback || function(swipedir){}
  
    touchsurface.addEventListener('touchstart', function(e){
        let touchobj = e.changedTouches[0];
        swipedir = 'none';
        startX = touchobj.pageX;
        startY = touchobj.pageY;
        startTime = new Date().getTime() // record time when finger first makes contact with surface
        e.preventDefault()
    }, false)
  
    touchsurface.addEventListener('touchmove', function(e){
        e.preventDefault() // prevent scrolling when inside DIV
    }, false)
  
    touchsurface.addEventListener('touchend', function(e){
        var touchobj = e.changedTouches[0]
        distX = touchobj.pageX - startX // get horizontal dist traveled by finger while in contact with surface
        distY = touchobj.pageY - startY // get vertical dist traveled by finger while in contact with surface
        elapsedTime = new Date().getTime() - startTime // get time elapsed
        if (elapsedTime <= allowedTime){ // first condition for awipe met
            if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint){ // 2nd condition for horizontal swipe met
                swipedir = (distX < 0)? 'left' : 'right' // if dist traveled is negative, it indicates left swipe
            }
            else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint){ // 2nd condition for vertical swipe met
                swipedir = (distY < 0)? 'up' : 'down' // if dist traveled is negative, it indicates up swipe
            }
        }
        handleswipe(swipedir)
        e.preventDefault()
    }, false)
}
  
//USAGE:

var el = document.getElementById('game-board')
swipedetect(el, function(swipedir){
    switch(swipedir){
        case 'up':
            if(lastInputDirection.y !== 0) break
            inputDirection = {x: 0, y: -1};
            break
        case 'down':
            if(lastInputDirection.y !== 0) break
            inputDirection = {x: 0, y: 1};
            break
        case 'left':
            if(lastInputDirection.x !== 0) break
            inputDirection = {x: -1, y: 0};
            break
        case 'right':
            if(lastInputDirection.x !== 0) break
            inputDirection = {x: 1, y: 0};
            break            
    }    
})

//////////////////

export function getInputDirection(){
    lastInputDirection = inputDirection;
    return inputDirection
}