/*
 *	This file is available under the GNU license. See the LICENSE file in the root directory for details.
 */



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

