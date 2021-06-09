var ball;
var ball_position
var position;
var dataBase;
function setup(){
    createCanvas(500,500);
    dataBase = firebase.database();
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";
    //console.log(dataBase);
    ball_position = dataBase.ref('ball/position');
    ball_position.on('value',readPosition,showError)
}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        changePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        changePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        changePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        changePosition(0,+1);
    }
    drawSprites();
}

function readPosition(data){
    //Puts all the value it fetched into the position variable
    position=data.val();
    ball.x = position.x;
    ball.y = position.y;
    console.log(position);
}

function showError(){
    console.log('there is an error')
}

function changePosition(x,y){
    //set() puts values from the code into the database
    dataBase.ref('ball/position').set({
        'x':position.x + x,
        'y':position.y + y
    })

    //ball.x = ball.x + x;
    //ball.y = ball.y + y;
}