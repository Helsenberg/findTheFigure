
var EngineJS = function(name){

    var that = this;

    this.log = function(mess){
        console.log('[EngineJS]: ', mess);
    }

    this.canvas = document.getElementById(name);

    if(!this.canvas){
        this.log('Canvas is not defined');
        return;
    }

    this.context = this.canvas.getContext('2d');
    this.gameEngine;

    var wW = window.innerWidth,
        wH = window.innerHeight;

    this.setWH = function(w, h){
        that.canvas.width = w;
        that.canvas.height = h;
    };

    this.getWH = function(){
        return {w: that.canvas.width, h: that.canvas.height};
    };

    this.initFullPage = function(){
        that.setWH(wW, wH);
        window.onresize = function() {
            wW = window.innerWidth,
            wH = window.innerHeight;
            that.initFullPage();
        };
    };

    this.setWH(400, 500);

    this.OOP = {};

    this.OOP.clone = function(obj, callback){
        if (null == obj || "object" != typeof obj) return obj;
        var copy = {};
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
        }
        if(callback){
            copy.callback = callback;
            copy.callback();
            return copy;
        }
        return copy;
    }

    var nextStep = (function(){
        return requestAnimationFrame ||
            webkitRequestAnimationFrame ||
            mozRequestAnimationFrame ||
            oRequestAnimationFrame ||
            msRequestAnimationFrame ||
            function(callback){
                window.setTimeout(callback,1000 / 60);
            }
    })();

    this.gameEngineStart = function(){
        if(!that.update){
            that.log('Game loop is not defined!');
            return;
        }
        that.setGameEngine(that.update);
        that.gameEngineStep();
    }

    this.gameEngineStep = function(){
        that.gameEngine();
        nextStep(that.gameEngineStep);
    };

    this.setGameEngine = function(callback){
        that.gameEngine = callback;
    };

    var countObjects = 0;
    var baseObject = function(props){
        this.type = "BaseObject";
        this.id = ++countObjects;
        this.w = typeof props != 'undefined' && typeof props.w != 'undefined' ? props.w : 0;
        this.h = typeof props != 'undefined' && typeof props.h != 'undefined' ? props.h : 0;
        this.x = typeof props != 'undefined' && typeof props.x != 'undefined' ? props.x : 0;
        this.y = typeof props != 'undefined' && typeof props.y != 'undefined' ? props.y : 0;
        this.strokeColor = typeof props != 'undefined' && typeof props.strokeColor != 'undefined' ? props.strokeColor : 0;
        this.strokeWidth = typeof props != 'undefined' && typeof props.strokeWidth != 'undefined' ? props.strokeWidth : 0;
        this.shadowColor = typeof props != 'undefined' && typeof props.shadowColor != 'undefined' ? props.shadowColor : 0;
        this.shadowBlur = typeof props != 'undefined' && typeof props.shadowBlur != 'undefined' ? props.shadowBlur : 0;
        this.fillStyle = typeof props != 'undefined' && typeof props.fillStyle != 'undefined' ? props.fillStyle : 0;
        this.ondraw = function(ondraw){
            if(this.fillStyle) that.context.fillStyle = this.fillStyle;
            if(this.strokeColor) that.context.strokeStyle = this.strokeColor;
            if(this.strokeWidth) that.context.lineWidth = this.strokeWidth;
            if(this.shadowColor) that.context.shadowColor = this.shadowColor;
            if(this.shadowBlur) that.context.shadowBlur = this.shadowBlur;
        }
    };

    this.newBaseObject = function(props){
        return new baseObject(props);
    };

    var rectObject = function(props){
        baseObject.call(this, props);
        this.type = 'RectObject';
        this.draw = function(){
            this.ondraw();
            that.context.strokeRect(this.x, this.y, this.w, this.h);
        }
    };

    this.newRectObject = function(props){
        return new rectObject(props);
    };

    var triangleObjectObject = function(props){
        baseObject.call(this, props);
        this.type = 'TriangleObject';
        this.draw = function(){
            this.ondraw();
            that.context.beginPath();
            that.context.moveTo(this.x + this.w, this.y + this.h);
            that.context.lineTo(this.x + this.w / 2, this.y);
            that.context.lineTo(this.x, this.y + this.h);
            that.context.closePath();
            that.context.stroke();
        }
    };

    this.newTriangleObject = function(props){
        return new triangleObjectObject(props);
    };

    var ellipsObject = function(props){
        baseObject.call(this, props);
        this.type = 'EllipsObject';
        this.draw = function(){
            this.ondraw();
            that.context.beginPath();
            that.context.ellipse(this.x + this.w / 2, this.y + this.h / 2, this.w / 2, this.h / 2, 0, 0, 2 * Math.PI);
            that.context.stroke();
        }
    };

    this.newEllipsObject = function(props){
        return new ellipsObject(props);
    };

    this.clear = function(){
        that.context.clearRect(0, 0, that.getWH().w, that.getWH().h);
    }

    this.drawText = function(props){
        if(props){
            if(typeof props.text == 'undefined'){
                log('Text not defined');
                return;
            }
            var x = typeof props.x != 'undefined' ? props.x : 0;
            var y = typeof props.y != 'undefined' ? props.y : 0;
            var fontSize = typeof props.fontSize != 'undefined' ? props.fontSize : 12;
            var fontFamily = typeof props.fontFamily != 'undefined' ? props.fontFamily : 'Arial';
            var fontFamily = typeof props.fontFamily != 'undefined' ? props.fontFamily : 'Arial';
            var color = typeof props.shadowBlur != 'undefined' ? props.color : 'white';
            var shadowColor = typeof props.shadowColor != 'undefined' ? props.shadowColor : color;
            var shadowBlur = typeof props.shadowBlur != 'undefined' ? props.shadowBlur : 0;
            var type = typeof props.type != 'undefined' ? props.type : 'fill';
            var strokeColor = typeof props.strokeColor != 'undefined' ? props.strokeColor : 'black';
            var strokeWidth = typeof props.strokeWidth != 'undefined' ? props.strokeWidth : 1;
            var textAlign = typeof props.textAlign != 'undefined' ? props.textAlign : 'left';
            that.context.font =  fontSize + 'px ' + fontFamily;
            that.context.shadowColor = shadowColor;
            that.context.shadowBlur = shadowBlur;
            that.context.fillStyle = color;
            that.context.strokeStyle = strokeColor;
            that.context.lineWidth = strokeWidth;
            that.context.textAlign = textAlign;
            if(type == 'fill')
                that.context.fillText(props.text, x, y + 30);
            else if(type == 'stroke')
                that.context.strokeText(props.text, x, y + 30);
        }
    }

}
