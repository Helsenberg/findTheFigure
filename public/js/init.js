function randomArr(min, max, l){

    var arr = [],
        m = [],
        n = 0,
        i;

    if (max - min < l - 1) return;

    for (i = 0; i <= (max - min); i++){
      m[i] = i + min;
    }

    for (i = 0; i < l; i++) {
        n = Math.floor(Math.random() * (m.length));
        arr.push(m.splice(n, 1)[0]);
    };

    return arr;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

var settingsGame = {
        color: '#ffaa82',
        shadowColor: '#f54c1e',
        strokeWidth: 8,
        shadowBlur: 30,
        margin: 40
    }


var ejs = new EngineJS('game'),
    log = ejs.log,
    OOP = ejs.OOP;

ejs.initFullPage({h: 120, w: 0});
