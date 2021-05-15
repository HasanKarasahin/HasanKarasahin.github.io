const rowCount=40;
const boxCountInRow=40;
const totalBoxCount=rowCount*boxCountInRow;

function fnOnLoad() {
    fnLoadMap(rowCount,boxCountInRow);
    fnKeyboardEvents();

    //X-Y
    makeActiveBox(0,10);

    fnRandomCreateFood();
}

var BoxesInMap = [];

function fnLoadMap(rowCount,boxCount) {
    var divContainer = document.getElementsByClassName('container')[0];
    for (let y = 0; y < rowCount; y++) {
        let divRow = document.createElement("div");
        divRow.classList.add("row");

        var BoxesInMap2 = [];

        for (let x = 0; x < boxCount; x++) {
            
            let divBox = document.createElement("div");
            divBox.classList.add("box");
            //divBox.id=x+""+y;
            divRow.appendChild(divBox);
            divBox.setAttribute("data-key-active",false);

            divBox.setAttribute("data-key-pointX",x);
            divBox.setAttribute("data-key-pointy",y);

            BoxesInMap2.push(divBox);
            
        }
        BoxesInMap.push(BoxesInMap2);
        divContainer.appendChild(divRow)
    }
}

function makeActiveBox(PointX,PointY) {
    BoxesInMap[PointY][PointX].classList.remove('box');
    BoxesInMap[PointY][PointX].classList.add('boxActive');
    BoxesInMap[PointY][PointX].setAttribute("data-key-active",true);
}

function makePassiveBox() {
    var currentActiveBox = document.querySelector('[data-key-active="true"]');
    currentActiveBox.classList.remove('boxActive');
    currentActiveBox.classList.add('box');
    currentActiveBox.setAttribute("data-key-active",false);
    return [currentActiveBox.getAttribute('data-key-pointX'),currentActiveBox.getAttribute('data-key-pointY')]
}

function mapBoundControl(pointX,pointY) {
    if (0>pointX || pointX>=boxCountInRow) {
        return false;
    }
    if (0>pointY || pointY>=rowCount) {
        return false;
    }
    if (pointX*pointY >= totalBoxCount) {
        return false;
    }
    return true;
}

function fnResetFood(food) {
    food.classList.remove('boxFood');
    food.classList.add('box');
    food.setAttribute("data-key-food",false);
}
function fnRandomCreateFood() {

    let randomPointX = Math.floor(Math.random() * boxCountInRow);
    let randomPointY = Math.floor(Math.random() * rowCount);

    //FOOD  
    BoxesInMap[randomPointY][randomPointX].classList.remove('box');
    BoxesInMap[randomPointY][randomPointX].classList.remove('boxActive');
    BoxesInMap[randomPointY][randomPointX].classList.add('boxFood');
    BoxesInMap[randomPointY][randomPointX].setAttribute("data-key-food",true);
}

function controlCollisionFood(pointX,pointY) {
    let food = document.querySelector('[data-key-food="true"]');
    let foodPointX=food.getAttribute('data-key-pointX');
    let foodPointY=food.getAttribute('data-key-pointY'); 
    if (pointX==foodPointX) {
        if(pointY==foodPointY){
            fnResetFood(food);
            fnRandomCreateFood();
            return true;
        }
        return false;
    }
    return false;
}

function fnMoveNewActiveBox(IncreaseX,IncreaseY) {
    let arrCurrentActiveBox = makePassiveBox();
        
    let newActivePointX = parseInt(arrCurrentActiveBox[0])+IncreaseX;
    let newActivePointY = parseInt(arrCurrentActiveBox[1])+IncreaseY;

    if (mapBoundControl(newActivePointX,newActivePointY)) {
        makeActiveBox(newActivePointX,newActivePointY);
        if (controlCollisionFood(newActivePointX,newActivePointY)) {
            console.log('Çarpışma oldu');
        }else{
            console.log('Çarpışma yok');
        }
    }else{
        makeActiveBox(0,0);
    }
}

function fnKeyboardEvents() {
let bodyId = document.getElementById('bodyId');

bodyId.addEventListener("keydown", (event) => {
    let key = event.key.toLowerCase();
    if (key=="w") {
        fnMoveNewActiveBox(0,-1);
    }
    if (key=="a") {
        fnMoveNewActiveBox(-1,0);
    }
    if (key=="d") {
        fnMoveNewActiveBox(1,0);
    }
    if (key=="s") {
        fnMoveNewActiveBox(0,1);
    }

    if (key=="e") {
        fnMoveNewActiveBox(1,-1);
    }

    if (key=="c") {
        fnMoveNewActiveBox(1,1);
    }

    if (key=="z") {
        fnMoveNewActiveBox(-1,1);
    }

    if (key=="q") {
        fnMoveNewActiveBox(-1,-1);
    }

});
}

