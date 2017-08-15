/*
 *	This file is available under the GNU license. See the LICENSE file in the root directory for details.
 */

//Prevents Bootstrap buttons from staying focused on click
$(document).ready(function () {
  $(".btn").click(function(event) {
    // Removes focus of the button.
    $(this).blur();
  });
});

//If a resource has been modified, reveal it
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

//Reveal a target that is modifying a resource
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

//Hide a target that is no longer modifying a resource
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

//Updates a resource on the display
function ResourceScreenUpdate (targetValue, targetId) {
	var element = document.getElementById(targetId);

	ResourceTestForReveal(targetId, targetValue);

	element.childNodes[1].innerHTML = targetValue.value;
}

//Updates the dropdown for a resource on the display (out of date?)
function ResourceDropdownUpdate (targetValue, targetId) {
	var element = document.getElementById(targetId);

	ResourceTestForReveal(targetId, targetValue);

	element.childNodes[3].childNodes[1].innerHTML = targetValue.value;
}

//Updates the positivity dropdown on the display
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

//Updates the pressure dropdown on the display
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

//Updates the electricity dropdown on the display
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

//Updates the capacity value for a resource on the display
function ResourceCapScreenUpdate (targetValue, targetId) {
	var element = document.getElementById(targetId);

	element.childNodes[1].innerHTML += " / " + targetValue.value;
}


//Tabs switching function (out of date?)
function switchToTab(targetId) {
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


//Reveal target
function revealHTML(targetId) {
	document.getElementById(targetId).style.display = "inline";
}

//Hide target
function hideHTML(targetId) {
	document.getElementById(targetId).style.display = "none";
}

