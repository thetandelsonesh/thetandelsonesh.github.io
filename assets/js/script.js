// [white,grey,red,orange,d_orange,yellow,green,blue,d_purple]
var my_colors = ["9E9E9E","f44336", "FF9800", "FF5722" ,"FFEB3B","00C853","2196F3","673AB7"];

var color ="FFFFFF";
// changes color on click with ripple effect
function changeColor(){

	var ev = window.event;
	var my_pointer = parseInt(Math.random() * my_colors.length);
	var section1 = document.getElementById("section-0");
	section1.classList.add('noclicks');
	//set ripple div
	var rippleObject = document.getElementById("ripple-object"); 
	rippleObject.style.top = ev.layerY + "px";
	rippleObject.style.left = ev.layerX + "px";
	rippleObject.style.opacity = 1;
	rippleObject.style.boxShadow=  '0px 0px 10px #'+ my_colors[my_pointer];
	rippleObject.classList.add('ripple');

	//change color to particle
	color = my_colors[my_pointer];

	document.getElementById('sub-title').style.color = '#'+color;
	var arr = document.getElementsByClassName('a');
	
	// change color of logo
	for (var i = 0; i < arr.length; i++) {
		arr[i].style.stroke = '#'+my_colors[my_pointer];
		
	}
	setTimeout(function() {
		rippleObject.classList.remove('ripple');
		rippleObject.style.opacity = 0;
		
		section1.classList.remove('noclicks');

	}, 1000);
}



// draws logo at loading time only once
function drawPath(){
	var svgs = document.querySelectorAll('.a');

	svgs.forEach(function(path){ 
		var length = path.getTotalLength();

		path.style.transition = path.style.WebkitTransition = 'none';
		path.style.strokeDasharray = length + ' ' + length;
		path.style.strokeDashoffset = length;
		path.getBoundingClientRect();

		path.style.transition = path.style.WebkitTransition = 'stroke-dashoffset 3s ease-in-out';
		path.style.strokeDashoffset = '0';
		
		setTimeout(function() {
			path.style.strokeDasharray = 'none';
		}, 3100);
	});
}


function toggleAlternateMenu(){
	var menu = document.getElementsByClassName('alternate-menu')[0];
	if (menu.style.display == "none" || menu.style.display == ""){
		menu.style.display = "block";
		document.getElementsByClassName('hamburger')[0].innerHTML = "<i class='material-icons'>close</i>";
	}else{
		menu.style.display = "none";
		document.getElementsByClassName('hamburger')[0].innerHTML = "<i class='material-icons'>menu</i>";

	}
}


var section1 = document.getElementById('section-1');
var navLogo = document.getElementById('nav-logo');

window.onscroll = function(){
	if(window.scrollY >=  section1.offsetTop){
		navLogo.style.display = "block";
		if(color == "FFFFFF"){
			document.getElementsByTagName('nav')[0].style.backgroundColor = '#000000';//'#2962FF';
		}else{
			document.getElementsByTagName('nav')[0].style.backgroundColor = '#'+ color;
		}
		document.getElementsByTagName('nav')[0].style.boxShadow = "0px 3px 1px #dddddd";
	}else{
		navLogo.style.display = "none";
		document.getElementsByTagName('nav')[0].style.backgroundColor = "rgba(0,0,0,0.3)";
		document.getElementsByTagName('nav')[0].style.boxShadow = "none";
	}

}