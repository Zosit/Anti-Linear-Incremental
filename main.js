/*
 *	This file is available under the GNU license. See the LICENSE file in the root directory for details.
 */

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

var negativityUnlocked = 0;
var negativity = new resource(0);
var negativityCap = new resource(10);

var pressureUnlocked = 0;
var pressure = new resource(0);
var pressureCap = new resource(10);
var pressureGen = new resource(0);
var pressureVelocity = new resource(0);
var pressureDirection = new resource(1);

//todo
var dynamoUnlocked = 1;
var electricity = new resource(0);
var electricityRatioIdle = new resource(100);
var electricityRatioPosGen = new resource(0);

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

	var posChange = genPos(positivityVelocity.value);

	genPre(pressureVelocity.value, posChange);
}, 1000);

//MetaResource Updates
function updateVelocity(){
	pressureVelocity.value = pressureGen.value * pressureDirection.value;
	//case where pressure will empty early
	if(-pressureVelocity.value > pressure.value) {
		pressureVelocity.value = -pressure.value;
	}
	//case where pressure will fill early
	if(pressureVelocity.value + pressure.value > pressureCap.value) {
		pressureVelocity.value = pressureCap.value - pressure.value;
	}

	//base value
	positivityVelocity.value = positivityGen.value;
	//cut out negativity %
	positivityVelocity.value -= (negativity.value / 100.0) * positivityCap.value;
	//remove pressure
	positivityVelocity.value -= (pressureVelocity.value / 100.0) * pressureCap.value;

	//todo: gen electricity and redo velocitys
}

//MetaResource Updates
function FlipPreDir(){
	pressureDirection.value = -pressureDirection.value
}


//Resource Generation
function ClearAllResources() {
	genPos(-positivity.value)
	genPosGen(-positivityGen.value)
	negativity.value = 0;
}

function genPos(num) {
	var oldVal = positivity.value;
	positivity.value += num;
	if(positivity.value < 0) {
		positivity.value = 0;
	}
	if(positivity.value > positivityCap.value) {
		positivity.value = positivityCap.value;
	}
	ResourceScreenUpdate(positivity, "positivity");
	ResourceCapScreenUpdate(positivityCap, "positivity");
	return positivity.value - oldVal;
}

function genPosGen(num) {
	positivityGen.value += num;
	ResourceScreenUpdate(positivityGen, "positivityGenerator");
	posGenCostUpdate();
}

function genNeg(num) {
	if(negativityUnlocked == 1) {


		negativity.value += num;
		if(negativity.value < 0) {
			negativity.value = 0;
		}
		if(negativity.value > negativityCap.value) {
			negativity.value = negativityCap.value;
		}
		var oldNeg = negativity.value;
		ClearAllResources();
		negativity.value = oldNeg;
	
		ResourceScreenUpdate(negativity, "negativity");
		ResourceCapScreenUpdate(negativityCap, "negativity");
	}
}

function genPre(num, posChange) {

	//not enough positivity
	if(pressureUnlocked == 1) {
		if(positivity.value == 0 && pressureDirection.value == 1) {
			pressure.value -= posChange;
			pressure.value += positivityGen.value;

			//negativity hacks
			pressure.value += (negativity.value / 100) * pressureCap.value;
	
		} else if(positivity.value == 0 && pressureDirection.value == -1) {
			pressure.value += (num / 100) * pressureCap.value;
		} else {
			pressure.value += (num / 100) * pressureCap.value;
		}
	
		if(pressure.value <= 0) {
			pressure.value = 0;
			pressureDirection.value = 1;
		}
		if(pressure.value >= pressureCap.value) {
			pressure.value = pressureCap.value;
			pressureDirection.value = -1;
		}
		ResourceScreenUpdate(pressure, "pressure");
		ResourceCapScreenUpdate(pressureCap, "pressure");
	}
}


function genPreGen(num) {
	pressureGen.value += num;
	if(pressureGen.value <= 0) {
		pressureGen.value = 0;
	}

	if(pressureGen.value >= pressureGenCap.value) {
		pressureGen.value = pressureGenCap.value;
	}
}

//Resource Purchase
function buyPosGen(num) {
	if(positivity.value >= positivityGenCost.value) {
		genPos(-positivityGenCost.value);
		genPosGen(num);
	}
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

//Unlock target
function revealHTML(targetId) {
	document.getElementById(targetId).style.display = "inline";
}

function hideHTML(targetId) {
	document.getElementById(targetId).style.display = "none";
}

function boostCaps() {
		positivityCap.value *= 10;
		pressureCap.value *= 10;
}

function researchNegativity() {
	if(positivity.value >= 10) {
		ClearAllResources();
		boostCaps();
		negativityCap.value = 1;

		negativityUnlocked = 1;
		revealHTML("decNeg");
		revealHTML("incNeg");
		hideHTML("resNeg");
	}
}

function researchPressure() {
	if(positivity.value >= 100 && negativity.value >= 1) {
		ClearAllResources();
		boostCaps();
		negativityCap.value = 5;

		pressureUnlocked = 1;
		revealHTML("decPre");
		revealHTML("incPre");
		hideHTML("resPre");
	}
}

function researchDynamo() {
	if(positivity.value >= 1000 && negativity.value >= 5) {
		ClearAllResources();
		negativityCap.value = 10;

		dynamoUnlocked = 1;
	}
}

