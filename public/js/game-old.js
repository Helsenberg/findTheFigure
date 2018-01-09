
var Game = function(){

	var sizeFacet = parseInt(width / 8);
	var objFigure = {
		0: game.newRectObject({
			w: sizeFacet,
			h: sizeFacet,
            strokeColor: color,
            strokeWidth: strokeWidth,
            shadowColor: shadowColor,
            shadowBlur: shadowBlur
		}),
		1: game.newTriangleObject({
			w: sizeFacet,
			h: sizeFacet,
            strokeColor: color,
            strokeWidth: strokeWidth,
            shadowColor: shadowColor,
            shadowBlur: shadowBlur
		}),
		2: game.newEllipsObject({
			w: sizeFacet,
			h: sizeFacet,
            strokeColor: color,
            strokeWidth: strokeWidth,
            shadowColor: shadowColor,
            shadowBlur: shadowBlur
		}),
		3: game.newRectObject({
			w: sizeFacet,
			h: sizeFacet / 2,
            strokeColor: color,
            strokeWidth: strokeWidth,
            shadowColor: shadowColor,
            shadowBlur: shadowBlur
		}),
		4: game.newEllipsObject({
			w: sizeFacet,
			h: sizeFacet / 1.5,
            strokeColor: color,
            strokeWidth: strokeWidth,
            shadowColor: shadowColor,
            shadowBlur: shadowBlur
		}),
	}

	var countFigures,
		arrFiguresRand,
		arrFiguresRandPos,
		figureRand,
		centerFigureRand,
		answer,
		score = 0,
		timer;

	var refreshData = function(){

		countFigures = Object.keys(objFigure).length - 1,
		arrFiguresRand = randomArr(0,countFigures,4),
		arrFiguresRandPos = randomArr(0,3,4),
		figureRand = getRandomInt(0,4),
		answer = false;
		arrFiguresRand.forEach(function(id, i){
			var figure = objFigure[id];

			if(arrFiguresRandPos[i] == 0){
				objFigure[id].x = width / 2 - figure.w / 2 - figure.strokeWidth / 2;
				objFigure[id].y = margin;
			}
			else if(arrFiguresRandPos[i] == 1){
				objFigure[id].x = width - figure.w - figure.strokeWidth - margin;
				objFigure[id].y = height / 2 - figure.h / 2;
			}
			else if(arrFiguresRandPos[i] == 2){
				objFigure[id].x = width / 2 - figure.w / 2;
				objFigure[id].y = height - figure.h - figure.strokeWidth - margin;
			}
			else if(arrFiguresRandPos[i] == 3){
				objFigure[id].x = margin;
				objFigure[id].y = height / 2 - figure.h / 2 - figure.strokeWidth;
			}
			objFigure[id].pos = arrFiguresRandPos[i];

		});

        /*console.log(objFigure[arrFiguresRand[figureRand]]);
        centerFigureRand = clone(objFigure[arrFiguresRand[figureRand]]);
        console.log(centerFigureRand);
        centerFigureRand.x = width / 2 - centerFigureRand.w / 2;
        centerFigureRand.y = height / 2 - centerFigureRand.h / 2;
        centerFigureRand.id = 10;*/

        centerFigureRand = OOP.clone(objFigure[arrFiguresRand[figureRand]],function(){
            this.x = width / 2 - this.w / 2;
            this.y = height / 2 - this.h / 2;
        });

		/*socket.on('setScore', function(val){
			score = val;
		})*/

	};

	refreshData();

	this.update = function(){
        console.log(111);
		game.clear();

		var refresh = false;
		document.onkeydown = function (event) {
            if(event.keyCode == 37){
                if(centerFigureRand.pos == 0 && !answer){
                    console.log(111);
                    refresh = true;
                }
                else{
                    score--;
                }
            }
            else if(event.keyCode == 38){
                if(centerFigureRand.pos == 1 && !answer){
                    console.log(222);
                    refresh = true;
                }
                else{
                    score--;
                }
            }
            else if(event.keyCode == 39){
                if(centerFigureRand.pos == 2 && !answer){
                    console.log(333);
                    refresh = true;
                }
                else{
                    score--;
                }
            }
            else if(event.keyCode == 40){
                if(centerFigureRand.pos == 3 && !answer){
                    console.log(444);
                    refresh = true;
                }
                else{
                    score--;
                }
            }
        };

		arrFiguresRand.forEach(function(id, i){

			var figure = objFigure[id];
			if(mouse.isPeekStatic('LEFT', figure)){
				if(figure.pos == centerFigureRand.pos && !answer){
					refresh = true;
				}
				else{
					score--;
				}
			}

			figure.draw();

		});

		centerFigureRand.draw();

        brush.drawTextS({
            text: ' Player1: ' + score,
            size: 30,
            color: '#ffffff',
            strokeColor: '#ffffff',
            strokeWidth: 1,
            x: 10,
            y: 10
        });

		brush.drawTextS({
			text: ' Player2: ' + score,
			size: 30,
			color: '#ffffff',
			strokeColor: '#ffffff',
			strokeWidth: 1,
			x: width - 170,
			y: 10
		});

		if(score < 0){
			score = 0;
		}

		if(refresh){
            socket.emit('chat message', true);
			answer = true;
			refreshData();
		}

	}

};

game.newLoopFromClassObject('Game', new Game());
