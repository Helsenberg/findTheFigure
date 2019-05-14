
var Game = function(){

    var width = ejs.getWH().w,
        height = ejs.getWH().h,
        sizeFacet = parseInt(width / 10),
        countFigures,
        arrFiguresRand,
        arrFiguresRandPos,
        figureRand,
        centerFigureRand,
        answer,
        score = 0,
        refresh,
        timer,
        objFigure = {
            0: ejs.newRectObject({
                w: sizeFacet,
                h: sizeFacet,
                strokeColor: settingsGame.color,
                strokeWidth: settingsGame.strokeWidth,
                shadowColor: settingsGame.shadowColor,
                shadowBlur: settingsGame.shadowBlur
            }),
            1: ejs.newTriangleObject({
                w: sizeFacet,
                h: sizeFacet,
                strokeColor: settingsGame.color,
                strokeWidth: settingsGame.strokeWidth,
                shadowColor: settingsGame.shadowColor,
                shadowBlur: settingsGame.shadowBlur
            }),
            2: ejs.newEllipsObject({
                w: sizeFacet,
                h: sizeFacet,
                strokeColor: settingsGame.color,
                strokeWidth: settingsGame.strokeWidth,
                shadowColor: settingsGame.shadowColor,
                shadowBlur: settingsGame.shadowBlur
            }),
            3: ejs.newRectObject({
                w: sizeFacet,
                h: sizeFacet / 2,
                strokeColor: settingsGame.color,
                strokeWidth: settingsGame.strokeWidth,
                shadowColor: settingsGame.shadowColor,
                shadowBlur: settingsGame.shadowBlur
            }),
            4: ejs.newEllipsObject({
                w: sizeFacet,
                h: sizeFacet / 1.5,
                strokeColor: settingsGame.color,
                strokeWidth: settingsGame.strokeWidth,
                shadowColor: settingsGame.shadowColor,
                shadowBlur: settingsGame.shadowBlur
            }),
        };

    var refreshData = function(){

        countFigures = Object.keys(objFigure).length - 1,
        arrFiguresRand = randomArr(0,countFigures,4),
        arrFiguresRandPos = randomArr(0,3,4),
        figureRand = getRandomInt(0,4),
        answer = false;
        refresh = false;
        arrFiguresRand.forEach(function(id, i){
            var figure = objFigure[id];
            figure.pos = arrFiguresRandPos[i];
            if(arrFiguresRandPos[i] == 0){
                figure.x = width / 2 - figure.w / 2 - figure.strokeWidth / 2;
                figure.y = settingsGame.margin;
            }
            else if(arrFiguresRandPos[i] == 1){
                figure.x = width - figure.w - figure.strokeWidth - settingsGame.margin;
                figure.y = height / 2 - figure.h / 2;
            }
            else if(arrFiguresRandPos[i] == 2){
                figure.x = width / 2 - figure.w / 2;
                figure.y = height - figure.h - figure.strokeWidth - settingsGame.margin;
            }
            else if(arrFiguresRandPos[i] == 3){
                figure.x = settingsGame.margin;
                figure.y = height / 2 - figure.h / 2 - figure.strokeWidth;
            }

        });

        centerFigureRand = OOP.clone(objFigure[arrFiguresRand[figureRand]], function(){
            this.x = width / 2 - this.w / 2;
            this.y = height / 2 - this.h / 2;
        });

    };

    refreshData();

    document.onkeydown = function (event) {
        if(event.keyCode == 38){
            if(centerFigureRand.pos == 0 && !answer){
                refresh = true;
            }
            else{
                score--;
            }
        }
        else if(event.keyCode == 39){
            if(centerFigureRand.pos == 1 && !answer){
                refresh = true;
            }
            else{
                score--;
            }
        }
        else if(event.keyCode == 40){
            if(centerFigureRand.pos == 2 && !answer){
                refresh = true;
            }
            else{
                score--;
            }
        }
        else if(event.keyCode == 37){
            if(centerFigureRand.pos == 3 && !answer){
                refresh = true;
            }
            else{
                score--;
            }
        }

    };

    ejs.update = function(){

        ejs.clear();

        arrFiguresRand.forEach(function(id, i){

            var figure = objFigure[id];
            figure.draw();

        });

        centerFigureRand.draw();

        if(score < 0){
            score = 0;
        }

        if(refresh){
            score++;
            answer = true;
            refreshData();
        }

        ejs.drawText({
            text: 'Player1: ' + score,
            x: 10,
            y: 10,
            fontSize: 30,
            type: 'fill'
        });

        ejs.drawText({
            text: 'Player2: ' + score,
            x: width - 10,
            y: 10,
            fontSize: 30,
            type: 'fill',
            strokeColor: 'white',
            textAlign: 'right'
        });

    }

    this.startGame = ejs.gameEngineStart;
};

var game = new Game();

game.startGame();
