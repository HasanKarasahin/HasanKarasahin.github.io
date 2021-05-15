(function () {

    var CONSTS = {
    	gameSpeed: 50,
        score1: 0,
        score2: 0,
        stick1Speed: 1,
        stick2Speed: 1,
        ballTopSpeed: 0,
        ballLeftSpeed: 0,

        rowCount:50,
        boxCountInRow:60,
        totalBoxCount:40*40
    };
    var BoxesInMap=[];

    var CSS = {
        arena: {
            padding:'50',
            width: 600,
            height: 600,
            background: '#62247B',
            position: 'fixed',
            top: '50%',
            left: '50%',
            zIndex: '999',
            transform: 'translate(-50%, -50%)'
        },
        ball: {
            width: 15,
            height: 15,
            radius:1,
            position: 'absolute',
            top: 0,
            left: 350,
            borderRadius: 50,
            background: '#C6A62F'
        },
        line: {
            width: 0,
            height: 600,
            borderLeft: '2px dashed #C6A62F',
            position: 'absolute',
            top: 0,
            left: '50%'
        },
        stick: {
            width: 12,
            height: 85,
            position: 'absolute',
            background: 'red'
        },
        row:{
            display: 'flex',
            justifyContent: 'center'
        },
        box:{
            width: 7,
            height: 7,
            border: '0px solid gray',
            background: 'black'
        },
        boxActive:{
            width: 7,
            height: 7,
            borderRadius: 50,
            background: '#C6A62F'
        },
        boxStick:{
            background: 'white'
        },
        container:{
            zIndex: '999',
            position: 'fixed',
            top: '50%',
            left: '50%',
            background: 'rgb(215, 182, 245)',
            height: 500,
            width: 500,
            display: 'flex',
            flexDirection: 'column',
            padding: 10
        },
        scoarBoard:{
            margin:'5px',
            padding:'5px',
            fontSize:'25px',
            border:'1px solid white'
        }
    };

    function start() {
        fnLoadMap(CONSTS.rowCount,CONSTS.boxCountInRow);
        makeScoarBoard();

        fnDrawStick('stick1',0,2,17);
        fnDrawStick('stick2',CONSTS.boxCountInRow-1,30,17);

        randomMakeActiveBox();      
        setEvents();
        loop();
    }

    function randomMakeActiveBox() {
        let arrRandom=[[1,-1],[-1,1],[-1,1],[1,-1]];
        let tmp = CONSTS.rowCount/2
        let arrRandom2=[tmp-1,tmp,tmp+1,tmp];
        let rnd = Math.floor(Math.random() * 4);
        makeActiveBox(arrRandom2[rnd],1,arrRandom[rnd][0],arrRandom[rnd][1]);  
    }

    function makeScoarBoard(){
        var divRow = $('<div/>',{}).css(CSS.scoarBoard).appendTo('#pong-game');
        divRow[0].innerHTML='Player1 :<div id="player1Score">0</div>';
        divRow[0].innerHTML+='<hr/>';
        divRow[0].innerHTML+='Player2 :<div id="player2Score">0</div>';
        if(localStorage.getItem("player1Score")){
            $('#player1Score').text(localStorage.getItem("player1Score")); 
        }
        if(localStorage.getItem("player2Score")){
            $('#player2Score').text(localStorage.getItem("player2Score")); 
        }

    }

    function makeActiveBox(pointX,pointY,YonX=0,YonY=0) {
        if(isNaN(pointX) || isNaN(pointY))
            return false;
        if(mapBoundControl(pointX,pointY)){
            BoxesInMap[pointY][pointX].classList.remove('box');
            $(BoxesInMap[pointY][pointX]).css(CSS.boxActive);
            BoxesInMap[pointY][pointX].setAttribute("data-key-active",true);
    
            BoxesInMap[pointY][pointX].setAttribute("data-key-yon-x",YonX);
            BoxesInMap[pointY][pointX].setAttribute("data-key-yon-y",YonY);
        }else{
            console.log('Sınırlar aşıldı. Nesne oluşturulumadı.001. X:'+pointX+"Y:"+pointY);
        }
       
    }

    function fnDrawStick(stickName,StartPointX,StartPointY,EndPointY){

        for (let index = StartPointY; index < StartPointY+EndPointY; index++) {
            
            BoxesInMap[index][StartPointX].classList.remove('box');
            $(BoxesInMap[index][StartPointX]).css(CSS.boxStick);
            BoxesInMap[index][StartPointX].setAttribute("data-key-"+stickName,true);
            BoxesInMap[index][StartPointX].setAttribute("data-key-mirror",true);
        }

    }

    function fnLoadMap(rowCount,boxCount) {
       $('<div/>', {id: 'pong-game'}).css(CSS.arena).appendTo('body');
        for (let y = 0; y < rowCount; y++) {
            var divRow = $('<div/>',{}).css(CSS.row).appendTo('#pong-game');
    
            var BoxesInMap2 = [];
    
            for (let x = 0; x < boxCount; x++) {
                let divBox = $('<div/>',{'data-key-active':false,'data-key-point-x':x,'data-key-point-y':y}).css(CSS.box).appendTo(divRow);
                
                if(x==0 || x==boxCount-1){
                    divBox[0].setAttribute("data-key-mirror",false);
                    divBox[0].setAttribute("data-key-mirror-change-x",true);
                }
                
                BoxesInMap2.push(divBox[0]);
            }


            BoxesInMap.push(BoxesInMap2);
        }


        for (let index = 0; index < CONSTS.boxCountInRow; index++) {
            BoxesInMap[0][index].setAttribute("data-key-mirror",true);
            BoxesInMap[0][index].setAttribute("data-key-mirror-change-y",true);

            BoxesInMap[CONSTS.rowCount-1][index].setAttribute("data-key-mirror",true);
            BoxesInMap[CONSTS.rowCount-1][index].setAttribute("data-key-mirror-change-y",true);
        }

    }


    function fnKeyPress(stickName,speed){
        let stick = $('[data-key-'+stickName+'="true"]');
        let stickFirst = stick.first();
        let stickLast = stick.last();

        stickLast.css(CSS.box);
        
        let stick1PointX=stickFirst.attr('data-key-point-x');
        let stick1PointY=parseInt(stickFirst.attr('data-key-point-y'))+speed;

        if(mapBoundControl(stick1PointX,stick1PointY)){
            stickLast.removeAttr('data-key-'+stickName);
            stickLast.attr("data-key-mirror",false);
            $(BoxesInMap[stick1PointY][stick1PointX]).css(CSS.boxStick);
            BoxesInMap[stick1PointY][stick1PointX].setAttribute("data-key-"+stickName,true);
            BoxesInMap[stick1PointY][stick1PointX].setAttribute("data-key-mirror",true);
        }
       
    }


    function fnKeyPress2(stickName,speed){
        let stick = $('[data-key-'+stickName+'="true"]');
        let stickFirst = stick.first();
        let stickLast = stick.last();
        
        stickFirst.css(CSS.box);
        
        
        let stick1PointX=stickLast.attr('data-key-point-x');
        let stick1PointY=parseInt(stickLast.attr('data-key-point-y'))+speed;

        if(mapBoundControl(stick1PointX,stick1PointY)){
            stickFirst.removeAttr('data-key-'+stickName);
            stickFirst.attr("data-key-mirror",false);
            $(BoxesInMap[stick1PointY][stick1PointX]).css(CSS.boxStick);
            BoxesInMap[stick1PointY][stick1PointX].setAttribute("data-key-"+stickName,true);
            BoxesInMap[stick1PointY][stick1PointX].setAttribute("data-key-mirror",true);
        }

       
    }

    function setEvents() {
        $(document).on('keydown', function (e) {
            
            //Player1

            //w
            if (e.keyCode=='87') {
                fnKeyPress("stick1",-CONSTS.stick1Speed);
            }
            //s
            if (e.keyCode=='83') {
                fnKeyPress2("stick1",CONSTS.stick1Speed);
            }

            //Player2
            
            //yukarı ok
            if (e.keyCode=='38') {
                fnKeyPress("stick2",-CONSTS.stick2Speed);
            }
            //asagı ok
            if (e.keyCode=='40') {
                fnKeyPress2("stick2",CONSTS.stick2Speed);
            }

             //save   
            if(e.keyCode=='80'){
                clearTimeout(window.pongLoop);
                localStorage.setItem("player1Score", $('#player1Score').text());
                localStorage.setItem("player2Score", $('#player2Score').text());
            }

        });
    }

    function mapBoundControl(pointX,pointY) {
        if(isNaN(pointX) || isNaN(pointY))
            return false;
        if (0>pointX || pointX>=CONSTS.boxCountInRow) {
            return false;
        }
        if (0>pointY || pointY>=CONSTS.rowCount) {
            return false;
        }
        return true;
    }

    function isItGoal(pointX,pointY) {
        let box = $(BoxesInMap[pointY][pointX]);
        if(box.attr('data-key-mirror')){
            if(!(box.attr('data-key-mirror')=="true")){
                return true;
            }
        }
        return false;
    }

    function isCollision(pointX,pointY){
        debugger
        if(isNaN(pointX) || isNaN(pointY)){
            return false;
        }
            
        let box = $(BoxesInMap[pointY][pointX]);
            if(box.attr('data-key-mirror')){
                if(box.attr('data-key-mirror')=="true"){
                    if(box.attr('data-key-mirror-change-x')=="true"){
                        return 'x';
                    }else if(box.attr('data-key-mirror-change-y')=="true"){
                        return 'y';
                    }
                    return false;
                }else{
                    console.log('Dead');
                    return 'dead';
                }
            }else{
                return false;;
            }
    
    }

    function loop() {
        window.pongLoop = setInterval(function () {
            let ball = $('[data-key-active="true"]').first();
            if(ball.length==1){
               
                let ballPointX = parseInt(ball.attr('data-key-point-x'));
                let ballPointY = parseInt(ball.attr('data-key-point-y'));

                let ballYonX = parseInt(ball.attr('data-key-yon-x'));
                let ballYonY = parseInt(ball.attr('data-key-yon-y'));
    
                //sınır kontrolu
                if(mapBoundControl(ballPointX+ballYonX,ballPointY+ballYonY)){
                    
                    let yonDegistir = isCollision(ballPointX+ballYonX,ballPointY+ballYonY);
                    if(yonDegistir){
                        if(yonDegistir=='x'){
                            ball.removeAttr('data-key-active');
                            ball.css(CSS.box);
    
                            console.log('x DEGISICEK');
                            ballYonX*=-1;
                            if(mapBoundControl(ballPointX+ballYonX,ballPointY)){
                                makeActiveBox(ballPointX+ballYonX,ballPointY,ballYonX,ballYonY);
                            }else{
                                console.log('HATA1');
                            }
                        }else if(yonDegistir=='y'){
                            ball.removeAttr('data-key-active');
                            ball.css(CSS.box);
    
                            console.log('y DEGISICEK');
                            ballYonY*=-1;
                            
                            if(mapBoundControl(ballPointX,ballPointY+ballYonY)){
                                makeActiveBox(ballPointX,ballPointY+ballYonY,ballYonX,ballYonY);
                            }else{
                                console.log('HATA2');
                            }
                        }else if(yonDegistir=='dead'){
                            ball.removeAttr('data-key-active');
                            ball.css(CSS.box);

                            let stick1 = $('[data-key-stick1="true"]');
                            let stick1First = stick1.first();

                            let stick2 = $("[data-key-stick2=true]");
                            let stick2First = stick2.first();
                            
                            const dist1 = Math.sqrt((ballPointX+ballYonX - parseInt(stick1First.attr('data-key-point-x'))) ** 2 + (ballPointY+ballYonY - parseInt(stick1First.attr('data-key-point-y'))) ** 2);

                            const dist2 = Math.sqrt((ballPointX+ballYonX - parseInt(stick2First.attr('data-key-point-x'))) ** 2 + (ballPointY+ballYonY - parseInt(stick2First.attr('data-key-point-y'))) ** 2);

                            if (dist1>dist2) {
                            let currnetScore = parseInt($('#player1Score').text());
                            $('#player1Score').text(currnetScore+5);     
                            }else{
                            let currnetScore = parseInt($('#player2Score').text());
                            $('#player2Score').text(currnetScore+5);    
                            }

                            randomMakeActiveBox();
                        }
                    }else{
                        ball.removeAttr('data-key-active');
                        ball.css(CSS.box);
                        makeActiveBox(ballPointX+ballYonX,ballPointY+ballYonY,ballYonX,ballYonY);
                    }
                }else{
                   //pass
                }
                
                /*
                if(yonDegistir){
                    if(yonDegistir=='x'){
                        ball.removeAttr('data-key-active');
                        ball.css(CSS.box);

                        console.log('x DEGISICEK');
                        ballYonX*=-1;
                        let tst = Math.floor(Math.random() * 5);
                        if(tst==1){
                            ballPointY+=2;
                        } 
                        if(tst==4){
                            ballPointY+=1;
                        }
                        if(mapBoundControl(ballPointX+ballYonX+1,ballPointY+ballYonY)){
                            makeActiveBox(ballPointX+ballYonX+1,ballPointY+ballYonY,ballYonX,ballYonY);
                        }else{
                            console.log('HATA1');
                        }
                    }else if(yonDegistir=='y'){
                        ball.removeAttr('data-key-active');
                        ball.css(CSS.box);

                        console.log('y DEGISICEK');
                        ballYonY*=-1;
                        let tst = Math.floor(Math.random() * 5);
                        if(tst==1){
                            ballPointX+=2;
                        } 
                        if(tst==4){
                            ballPointX+=1;
                        } 
                        if(mapBoundControl(ballPointX+ballYonX,ballPointY+ballYonY+1)){
                            makeActiveBox(ballPointX+ballYonX+1,ballPointY+ballYonY+1,ballYonX,ballYonY+1);
                        }else{
                            console.log('HATA2');
                        }
                    }else if(yonDegistir=='Nothing'){
                        ball.removeAttr('data-key-active');
                        ball.css(CSS.box);

                        ballYonY*=1;
                       
                        if(mapBoundControl(ballPointX+ballYonX,ballPointY+ballYonY)){
                            makeActiveBox(ballPointX+ballYonX,ballPointY+ballYonY,ballYonX,ballYonY);
                        }else{
                            console.log('HATA5');
                        }
                    }
                }else{
                    if(mapBoundControl(ballPointX+ballYonX,ballPointY+ballYonY)){
                        makeActiveBox(ballPointX+ballYonX,ballPointY+ballYonY,ballYonX,ballYonY);
                    }else{
                        //console.log('HATA4');
                        //makeActiveBox(0+ballYonX,0,ballYonX,ballYonY);
                    }
                    //makeActiveBox(,ballPointY+ballYonY,ballYonX,ballYonY);
                }*/
            }else{
                console.log('hata loop');
            }    

        }, CONSTS.gameSpeed);
    }

    start();
})();