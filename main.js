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
	positivityVelocity.value = positivityGen.value;

	//reduce positivity by negativity %
	positivityVelocity.value -= (negativity.value / 100.0) * positivityCap.value;

	//Check positivity caps and limit velocity
	if(-positivityVelocity.value > positivity.value) {
		positivityVelocity.value = -positivity.value;
	}
	if(positivityVelocity.value + positivity.value > positivityCap.value) {
		positivityVelocity.value = positivityCap.value - positivity.value;
	}

	//base pressure value
	pressureVelocity.value = (pressureGen.value / 100) * pressureCap.value * pressureDirection.value;

	//Check pressure caps and limit velocity
	if(pressureVelocity.value + pressure.value < 0) {
		pressureVelocity.value = -pressure.value;
	}
	if(pressureVelocity.value + pressure.value > pressureCap.value) {
		pressureVelocity.value = pressureCap.value - pressure.value;
	}

	//case where there is not enough positivity for pressure change
	if(pressureVelocity.value > positivity.value + positivityVelocity.value && pressureDirection.value == 1) {
		pressureVelocity.value = positivity.value  + positivityVelocity.value;
	}

	//pressure affects positivity
	positivityVelocity.value -= pressureVelocity.value;

	//lastly pull from negativity if needed
	if(positivityVelocity.value == -positivity.value && pressureDirection.value == 1) {
		pressureVelocity.value += (negativity.value / 100) * pressureCap.value;
	}

	//gen electricity 
	genEle();

	electricity.value = Math.round(electricity.value * 10) / 10;


	//redo positive velocity
	positivityVelocity.value += electricity.value * (electricityRatioPosGen.value / 100)

	//Check positivity caps and limit velocity
	if(-positivityVelocity.value > positivity.value) {
		positivityVelocity.value = -positivity.value;
	}
	if(positivityVelocity.value + positivity.value > positivityCap.value) {
		positivityVelocity.value = positivityCap.value - positivity.value;
	}

	ResourceDropdownUpdate(positivityVelocity, "positivity");
	ResourceDropdownUpdate(pressureVelocity, "pressure");
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

	if(pressureGen.value >= pressureGenCap.value) {
		pressureGen.value = pressureGenCap.value;
	}
}

function genEle() {
	electricity.value = Math.abs(positivityVelocity.value) + Math.abs(pressureVelocity.value);
	ResourceScreenUpdate (electricity, "electricity");
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
	positivityGenCost.value = (positivityGen.value + 1) * 5;
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
	//if(positivity.value >= 10) {
		ClearAllResources();
		boostCaps();
		negativityCap.value = 1;

		negativityUnlocked = 1;
		revealHTML("decNeg");
		revealHTML("incNeg");
		hideHTML("resNeg");
	//}
}

function researchPressure() {
	//if(positivity.value >= 100 && negativity.value >= 1) {
		ClearAllResources();
		boostCaps();
		negativityCap.value = 5;

		pressureUnlocked = 1;
		pressureDirection.value = 1;
		revealHTML("decPre");
		revealHTML("incPre");
		hideHTML("resPre");
	//}
}

function researchDynamo() {
	if(positivity.value >= 1000 && negativity.value >= 5) {
		ClearAllResources();
		negativityCap.value = 10;

		dynamoUnlocked = 1;
	}
}

