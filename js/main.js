var divisor;
var multiplo;
var puntuacion = 0;
var dificultad = 0;
var tiempoRestante = 5;
var tiempoExtra = 0;
var divisores = [2,5,3,4,6,9,11,15];
$("#restart").hide();
startTimer(tiempoRestante);	
newLevel(dificultad);	

function newLevel(dificultad){
	divisor = getDivisor(dificultad);
	multiplo = getMultiplo(divisor[0],dificultad);
	$("#number").text(multiplo);
	$("#btnDivisor0").text(divisor[0]);
	$("#btnDivisor1").text(divisor[1]);
	$("#btnDivisor2").text(divisor[2]);
	tiempoExtra = 10;
	shuffleElements($('li')); 		
}

$("#btnDivisor0").click(function(){
	if (isDivisible(multiplo, $("#btnDivisor0").text())){
		puntuacion = puntuacion + Number($("#btnDivisor0").text()) * (dificultad + 1);
		$("#puntuacion").text("Total puntos: " + puntuacion);
		setDificultad(puntuacion);
		newLevel(dificultad);			
	} else {
		gameOver();
	}
});		

$("#btnDivisor1").click(function(){
	if (isDivisible(multiplo, $("#btnDivisor1").text())){
		puntuacion = puntuacion + Number($("#btnDivisor1").text()) * (dificultad + 1);
		$("#puntuacion").text("Total puntos: " + puntuacion);
		setDificultad(puntuacion);
		newLevel(dificultad);
	} else {
		gameOver();
	}
});

$("#btnDivisor2").click(function(){
	if (isDivisible(multiplo, $("#btnDivisor2").text())){
		puntuacion = puntuacion + Number($("#btnDivisor2").text()) * (dificultad + 1);
		$("#puntuacion").text("Total puntos: " + puntuacion);
		setDificultad(puntuacion);
		newLevel(dificultad);
	} else {
		gameOver();
	}
});

function setDificultad(puntuacion){
	if (puntuacion < 20) {
		dificultad = 0;
	} else if (puntuacion < 100) {
		dificultad = 1;
	} else if (puntuacion < 300) {
		dificultad = 2;
	} else if (puntuacion < 500) {
		dificultad = 3;
	} else {
		dificultad = 4;
	}
}

$("#restart").click(function(){
	window.location.reload(true);
});

function isDivisible(multiplo, divisor){
	return multiplo%divisor === 0;
}

function getDivisor(dificultad) {
	var divisoresAux = divisores.slice(dificultad,dificultad + 4);
	var divOK = divisores[Math.floor(Math.random() * divisoresAux.length)];
	divisoresAux = divisoresAux.filter(function(elem){return elem != divOK;});
	var divKO1 = divisoresAux[Math.floor(Math.random() * divisoresAux.length)];
	divisoresAux = divisoresAux.filter(function(elem){return elem != divKO1;});
	var divKO2 = divisoresAux[Math.floor(Math.random() * divisoresAux.length)];
	return [divOK,divKO1,divKO2];
}

function getMultiplo(divisor, dificultad) {
  return divisor * (1 + Math.floor(Math.random() * (10 ** (dificultad + 1)))); 
}

function shuffleElements($elements) {
	var i, index1, index2, temp_val;

	var count = $elements.length;
	var $parent = $elements.parent();
	var shuffled_array = [];


	// populate array of indexes
	for (i = 0; i < count; i++) {
		shuffled_array.push(i);
	}

	// shuffle indexes
	for (i = 0; i < count; i++) {
		index1 = (Math.random() * count) | 0;
		index2 = (Math.random() * count) | 0;

		temp_val = shuffled_array[index1];
		shuffled_array[index1] = shuffled_array[index2];
		shuffled_array[index2] = temp_val;
	}

	// apply random order to elements
	$elements.detach();
	for (i = 0; i < count; i++) {
		$parent.append( $elements.eq(shuffled_array[i]) );
	}
}

function startTimer(duration, display) {
	var timer = duration;
	var minutes;
	var seconds;
	setInterval(function () {
		timer = timer + tiempoExtra;
		tiempoExtra = 0;
		
		minutes = parseInt(timer / 60, 10);
		seconds = parseInt(timer % 60, 10);

		minutes = minutes < 10 ? "0" + minutes : minutes;
		seconds = seconds < 10 ? "0" + seconds : seconds;

		$("#time").text(minutes + ":" + seconds);

		if (--timer < 0) {
			$("#time").text("00:00");
			gameOver();
			return;
		}
	}, 1000);
}

function gameOver(){
	$("#restart").show();
	$("#btnDivisor0").prop("disabled",true);
	$("#btnDivisor1").prop("disabled",true);
	$("#btnDivisor2").prop("disabled",true);	
}