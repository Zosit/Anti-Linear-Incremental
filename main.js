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
var pressureDirection = new resource(0);

//todo
var dynamoUnlocked = 0;
var electricity = new resource(0);
var electricityRatioIdle = new resource(50);
var electricityRatioPosGen = new resource(50);

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

function VelocityReveal(targetId) {
	var element = document.getElementById(targetId);

	if(element.currentStyle) {
		var style = element.currentStyle.display;
	} else if (window.getComputedStyle) {
		var style = window.getComputedStyle(element, null).getPropertyValue("display");
	}
	if(style == "none") {
		element.style.display = "inline";
	}	
}

function VelocityHide(targetId) {
	var element = document.getElementById(targetId);

	if(element.currentStyle) {
		var style = element.currentStyle.display;
	} else if (window.getComputedStyle) {
		var style = window.getComputedStyle(element, null).getPropertyValue("display");
	}
	if(style != "none") {
		element.style.display = "none";
	}	
}

function ResourceScreenUpdate (targetValue, targetId) {
	var element = document.getElementById(targetId);

	ResourceTestForReveal(targetId, targetValue);

	element.childNodes[1].innerHTML = targetValue.value;
}

function ResourceDropdownUpdate (targetValue, targetId) {
	var element = document.getElementById(targetId);

	ResourceTestForReveal(targetId, targetValue);

	element.childNodes[3].childNodes[1].innerHTML = targetValue.value;
}

function ResourceDropdownPositivityUpdate (base, negative, limit1, pressure, electricity, limit2, targetId) {
	var element = document.getElementById(targetId);

	if(base != 0) {
		VelocityReveal("basePositivityVelocity");
		element.childNodes[3].childNodes[1].childNodes[1].innerHTML = base;
	} else {
		VelocityHide("basePositivityVelocity");
	}
	if(negative != 0) {
		VelocityReveal("negativePositivityVelocity");
		element.childNodes[3].childNodes[3].childNodes[1].innerHTML = negative;
	} else {
		VelocityHide("negativePositivityVelocity");
	}
	if((base != 0) || (negative != 0)) {
		VelocityReveal("positivityVelocityLimit");
		element.childNodes[3].childNodes[5].childNodes[1].innerHTML = limit1;
	} else {
		VelocityHide("positivityVelocityLimit");
	}
	if(pressure != 0) {
		VelocityReveal("pressurePositivityVelocity");
		element.childNodes[3].childNodes[7].childNodes[1].innerHTML = pressure;
	} else {
		VelocityHide("pressurePositivityVelocity");
	}
	if(electricity != 0) {
		VelocityReveal("electricityPositivityVelocity");
		element.childNodes[3].childNodes[9].childNodes[1].innerHTML = electricity;
	} else {
		VelocityHide("electricityPositivityVelocity");
	}
	if((pressure != 0) || (electricity != 0)) {
		VelocityReveal("positivityVelocityLimit2");
		element.childNodes[3].childNodes[11].childNodes[1].innerHTML = limit2;
	} else {
		VelocityHide("positivityVelocityLimit2");
	}
}

function ResourceDropdownPressureUpdate (basePercent, actual, preLimit, negBoost, targetId) {
	var element = document.getElementById(targetId);

	if(basePercent != 0) {
		VelocityReveal("basePressureVelocityPercent");
		element.childNodes[3].childNodes[1].childNodes[1].innerHTML = basePercent;
	} else {
		VelocityHide("basePressureVelocityPercent");
	}
	if(actual != 0) {
		VelocityReveal("basePressureVelocity");
		element.childNodes[3].childNodes[3].childNodes[1].innerHTML = actual;
	} else {
		VelocityHide("basePressureVelocity");
	}
	if((basePercent != 0) || (actual != 0)) {
		VelocityReveal("pressureVelocityLimit");
		element.childNodes[3].childNodes[5].childNodes[1].innerHTML = preLimit;
	} else {
		VelocityHide("pressureVelocityLimit");
	}
	if((negBoost != 0)) {
		VelocityReveal("negativePressureVelocity");
		element.childNodes[3].childNodes[7].childNodes[1].innerHTML = negBoost;
	} else {
		VelocityHide("negativePressureVelocity");
	}
}

function ResourceDropdownElectricityUpdate (positivity, pressure, eleLimit, targetId) {
	var element = document.getElementById(targetId);

	if(positivity != 0) {
		VelocityReveal("elePositivityVelocity");
		element.childNodes[3].childNodes[1].childNodes[1].innerHTML = positivity;
	} else {
		VelocityHide("elePositivityVelocity");
	}
	if(pressure != 0) {
		VelocityReveal("elePressureVelocity");
		element.childNodes[3].childNodes[3].childNodes[1].innerHTML = pressure;
	} else {
		VelocityHide("elePressureVelocity");
	}
	if((positivity != 0) || (pressure != 0)) {
		VelocityReveal("eleLimit");
		element.childNodes[3].childNodes[5].childNodes[1].innerHTML = eleLimit;
	} else {
		VelocityHide("eleLimit");
	}
}

function ResourceCapScreenUpdate (targetValue, targetId) {
	var element = document.getElementById(targetId);

	element.childNodes[1].innerHTML += " / " + targetValue.value;
}

//Game Loop
window.setInterval(function(){

	updateVelocity();

	genPos(positivityVelocity.value);

	genPre(pressureVelocity.value);
}, 1000);

//MetaResource Updates
function updateVelocity(){



	//calculate expected pressure change
	//calculate missing positivity needed
	//reduce by missing

	//base positivity value
	var basePositivityVelocity = positivityGen.value;

	//reduce positivity by negativity %
	var negativePositivityVelocity = -(negativity.value / 100.0) * positivityCap.value;

	//Check positivity caps and limit velocity
	positivityVelocity.value = basePositivityVelocity + negativePositivityVelocity;
	var positivityVelocityLimit = positivityVelocity.value;
	if(-positivityVelocityLimit > positivity.value) {
		positivityVelocityLimit = -positivity.value;
	}
	if(positivityVelocityLimit + positivity.value > positivityCap.value) {
		positivityVelocityLimit = positivityCap.value - positivity.value;
	}
	positivityVelocity.value = positivityVelocityLimit;


	//base pressure value
	var basePressureVelocity = (pressureGen.value / 100) * pressureCap.value * pressureDirection.value;

	//Check pressure caps and limit velocity
	pressureVelocity.value = basePressureVelocity;
	var pressureVelocityLimit = pressureVelocity.value;
	if(pressureVelocityLimit + pressure.value < 0) {
		pressureVelocityLimit = -pressure.value;
	}
	if(pressureVelocityLimit + pressure.value > pressureCap.value) {
		pressureVelocityLimit = pressureCap.value - pressure.value;
	}
	//case where there is not enough positivity for pressure change
	if(pressureVelocityLimit > positivity.value + positivityVelocity.value && pressureDirection.value == 1) {
		pressureVelocityLimit = positivity.value  + positivityVelocity.value;
	}
	pressureVelocity.value = pressureVelocityLimit;

	//pressure affects positivity
	var pressurePositivityVelocity = -pressureVelocity.value;
	positivityVelocity.value += pressurePositivityVelocity;

	//lastly pull from negativity if needed
	var roundedPressureVelocity = 0;
	if(positivityVelocity.value == -positivity.value && pressureDirection.value == 1) {
		negativePressureVelocity = (negativity.value / 100) * pressureCap.value;
	} else {
		negativePressureVelocity = 0;
	}

	pressureVelocity.value += negativePressureVelocity;

	//gen electricity 
	var roundedPositivityVelocity = 0;
	var roundedPressureVelocity = 0;
	if(dynamoUnlocked == 1) {
		roundedPositivityVelocity = Math.abs(Math.round(positivityVelocity.value * 10) / 10);
		roundedPressureVelocity = Math.abs(Math.round(pressureVelocity.value * 10) / 10);
		electricity.value = roundedPositivityVelocity + roundedPressureVelocity;
		electricity.value = Math.round(electricity.value * 10) / 10;
	} else {
		electricity.value = 0;
	}
	ResourceScreenUpdate (electricity, "electricity");

	//redo positive velocity
	var electricityPositivityVelocity = electricity.value * (electricityRatioPosGen.value / 100)
	positivityVelocity.value += electricityPositivityVelocity;

	//Check positivity caps and limit velocity
	var positivityVelocityLimit2 = positivityVelocity.value;
	if(-positivityVelocityLimit2 > positivity.value) {
		positivityVelocityLimit2 = -positivity.value;
	}
	if(positivityVelocity.value + positivity.value > positivityCap.value) {
		positivityVelocityLimit2 = positivityCap.value - positivity.value;
	}
	positivityVelocity.value = positivityVelocityLimit2;

	ResourceDropdownPositivityUpdate(basePositivityVelocity, negativePositivityVelocity, positivityVelocityLimit, pressurePositivityVelocity, electricityPositivityVelocity, positivityVelocityLimit2, "positivity");
	ResourceDropdownPressureUpdate (pressureGen.value, basePressureVelocity, pressureVelocityLimit, negativePressureVelocity, "pressure");
	ResourceDropdownElectricityUpdate(roundedPositivityVelocity, roundedPressureVelocity, electricity.value, "electricity");
}

//MetaResource Updates
function FlipPreDir(){
	pressureDirection.value = -pressureDirection.value
}


//Resource Generation
function ClearAllResources() {
	genPos(-positivity.value);
	genPosGen(-positivityGen.value);
	negativity.value = 0;
	genPre(-pressure.value);
	genPreGen(-pressureGen.value);
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

function genPre(num) {

	//not enough positivity
	if(pressureUnlocked == 1) {
		pressure.value += num;
		
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

	/*if(pressureGen.value >= pressureGenCap.value) {
		pressureGen.value = pressureGenCap.value;
	}*/
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
	positivityGenCost.value = Math.round(2 * Math.pow(1.05, positivityGen.value));
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

//research functions
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
		pressureDirection.value = 1;
		revealHTML("decPre");
		revealHTML("incPre");
		hideHTML("resPre");
	}
}

function researchDynamo() {
	if(positivity.value >= 1000 && pressure.value >= 1000 && negativity.value >= 5) {
		ClearAllResources();
		boostCaps();
		negativityCap.value = 10;

		dynamoUnlocked = 1;
	}
}

function researchMarket() {
	if(positivity.value >= 10000 && pressure.value >= 10000 && negativity.value >= 10) {
		ClearAllResources();
		boostCaps();
		negativityCap.value = 15;

		marketUnlocked = 1;
	}
}
