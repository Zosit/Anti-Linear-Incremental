//Resources
class resource {
	constructor(value) {
		this.value = value
		this.initialValue = value;
	}
};


var positivity = new resource(0);
var positivityCap = new resource(10);
var positivityGen = new resource(0);
var positivityGenCost = new resource(10);
var positivityVelocity = new resource(0);

//Generic Resource Management Functions
function ResourceTestForReveal(targetId, targetValue) {
	var element = document.getElementById(targetId);

	if(element.currentStyle) {
		var style = element.currentStyle.display;
	} else if (window.getComputedStyle) {
		var style = window.getComputedStyle(element, null).getPropertyValue("display");
	}
	if(style == "none" && (targetValue.value != targetValue.initialValue)) {
		element.style.display = "inline";
		element.childNodes[1].style.float = "right";
	}	
}

function ResourceScreenUpdate (targetValue, targetId) {
	var element = document.getElementById(targetId);

	ResourceTestForReveal(targetId, targetValue);

	element.childNodes[1].innerHTML = targetValue.value;
}

function ResourceCapScreenUpdate (targetValue, targetId) {
	var element = document.getElementById(targetId);

	element.childNodes[1].innerHTML += " / " + targetValue.value;
}

//Game Loop
window.setInterval(function(){

	updateVelocity();

	genPos(positivityVelocity.value);
}, 1000);

//MetaResource Updates
function updateVelocity(){
	positivityVelocity.value = positivityGen.value;
}


//Resource Generation
function genPos(num) {
	positivity.value += num;
	if(positivity.value > positivityCap.value) {
		positivity.value = positivityCap.value;
	}
	ResourceScreenUpdate(positivity, "positivity");
	ResourceCapScreenUpdate(positivityCap, "positivity");
}

function genPosGen(num) {
	positivityGen.value += num;
	ResourceScreenUpdate(positivityGen, "positivityGenerator");

}

//Resource Purchase
function buyPosGen(num) {
	if(positivity.value >= positivityGenCost.value) {
		genPos(-positivityGenCost.value);
		genPosGen(num);
	}
	posGenCostUpdate();
	ResourceScreenUpdate(positivityGenCost, "buyPositivityGenerator");
}

//Cost Calculations
function posGenCostUpdate(num) {
	positivityGenCost.value = (positivityGen.value + 1) * 10;
}

//Tabs
function switchToTab(targetId){
	var element = document.getElementById(targetId);

	if(element.currentStyle) {
		var style = element.currentStyle.display;
	} else if (window.getComputedStyle) {
		var style = window.getComputedStyle(element, null).getPropertyValue("display");
	}


	document.getElementById("resourcePage").style.display = "none";
	document.getElementById("researchPage").style.display = "none";
	element.style.display = "inline";

}

