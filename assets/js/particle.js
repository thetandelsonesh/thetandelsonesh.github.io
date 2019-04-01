//INIT
var color = "ffffff";
var radius = 4.0;
var web_radius = 120;
var velocity = 2.5;
var particle_count = 75;
var particles = [];

//init main canvas
var canvas = document.createElement('canvas');
canvas.setAttribute("id", "particleCanvas");
canvas.style.width = "100%";

var context = canvas.getContext('2d');

var mouse = {
    x: 0,
    y: 0,
    mp: {}
}

// var body = document.getElementsByTagName("SECTION")[0];
var body = document.getElementsByTagName("SECTION")[0];
var div = document.createElement('div');
div.style.width = "100%";
// div.style.zIndex = -1;
div.style.position = "absolute";
div.style.top = 0;
div.style.left = 0;
body.appendChild(div);
div.appendChild(canvas);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


//MOUSE EVENTS
var MouseMove = function(e) {
    if (e.layerX || e.layerX == 0) {
        //Reset particle positions
        mouseOnScreen = true;
        mouse.x = e.layerX - canvas.offsetLeft;
        mouse.y = e.layerY - canvas.offsetTop;
        mouse.mp.x= mouse.x;
        mouse.mp.y= mouse.y;
    }
}
var MouseOut = function(e) {
    mouseOnScreen = false;
    mouse.x = -100;
    mouse.y = -100;
}

function getRGBA(opacity) {
    var bigint = parseInt(color, 16);
    var r = (bigint >> 16) & 255;
    var g = (bigint >> 8) & 255;
    var b = bigint & 255;

    return "rgba(" + r + "," + g + "," + b + "," + opacity + ")";
}

//PARTICLE FUNCTIONS

var Particle = function(x, y, d, r,m) {
    this.m = m;
    this.r = r;
    this.x = x;
    this.y = y;
    this.d = {
        x: d.x,
        y: d.y
    };

    this.getd = function() {
        while (this.d.x == 0 && this.d.y == 0) {
            this.d.x = parseFloat(Math.random() * velocity) * ((Math.random() < 0.5) ? 1 : -1);
            this.d.y = parseFloat(Math.random() * velocity) * ((Math.random() < 0.5) ? 1 : -1);
        }
    }

    this.draw = function() {
        context.fillStyle = '#'+color;
        context.beginPath();
        context.arc(this.x, this.y, this.r, 0, Math.PI * 2, true);
        context.closePath();
        context.fill();
    }


    this.web = function() {
        for (var i = 0; i < particle_count; i++) {
            var webP = particles[i];
            var dist = Math.sqrt(((webP.x - this.x) * (webP.x - this.x)) + ((webP.y - this.y) * (webP.y - this.y)));
            if (dist <= web_radius) {
                var opacity = 1 - (dist / web_radius);
                context.strokeStyle = getRGBA(opacity);
                context.beginPath();
                context.moveTo(this.x, this.y);
                context.lineTo(webP.x, webP.y);
                context.stroke();
            }
        }
    }

    this.move = function() {
        this.x += this.d.x;
        this.y += this.d.y;

        // if(this.m){
        //     return;
        // }

        if (this.x <= (web_radius * -1) || this.x >= (canvas.width + web_radius) || this.y <= (web_radius * -1) || this.y >= (canvas.height + web_radius)) {
            this.x = parseFloat(Math.random() * canvas.width);
            this.y = parseFloat(Math.random() * canvas.height);

            this.getd();

            if (Math.random() < 0.5) {
                (this.x < canvas.width / 2) ? this.x = 0: this.x = canvas.width;
            } else {
                (this.y < canvas.height / 2) ? this.y = 0: this.y = canvas.height;
            }
        }
    }

}

function drawParticles() {
    context.clearRect(0, 0, canvas.width, canvas.height); //clear canvas
    for (var i = 0; i < particle_count; i++) {
        // console.log(particles[i]);
        particles[i].move();
        particles[i].draw();
        particles[i].web();
    }
    requestAnimationFrame(drawParticles);
}

function startAnimation() {
	body.addEventListener('mousemove', MouseMove, false);
    body.addEventListener('mouseout', MouseOut, false);
    mouse.mp = new Particle(0, 0, {x:0,y:0}, 0,true);
    particles.push(mouse.mp);
    particle_count++;

    for (var i = 0; i < particle_count; i++) {

        //initialize with random value
        var x = parseFloat(Math.random() * canvas.width);
        var y = parseFloat(Math.random() * canvas.height);
        var r = 0.1 + parseFloat(Math.random() * radius);
        var d = {
            x: 0,
            y: 0
        };
        while (d.x == 0 || d.y == 0) {
            d.x = parseFloat(Math.random() * velocity) * ((Math.random() < 0.5) ? 1 : -1);
            d.y = parseFloat(Math.random() * velocity) * ((Math.random() < 0.5) ? 1 : -1);
        }

        var p = new Particle(x, y, d, r,false);
        particles.push(p);
    }
    requestAnimationFrame(drawParticles);
}

function resizeit() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}