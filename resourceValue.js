/*
 *	This file is available under the GNU license. See the LICENSE file in the root directory for details.
 */







//Emptys all resources to their default state
function ClearAllResources() {
	genPos(-positivity.value);
	genPosGen(-positivityGen.value);
	negativity.value = 0;
	genPre(-pressure.value);
	genPreGen(-pressureGen.value);
}

//------------------------------------------------------------------
//Resource Generation
//------------------------------------------------------------------

//Positivity
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

//Positivity generators
function genPosGen(num) {
	positivityGen.value += num;
	ResourceScreenUpdate(positivityGen, "positivityGenerator");
}

//Negativity
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

//Pressure
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

//Pressure Generators
function genPreGen(num) {
	pressureGen.value += num;
	if(pressureGen.value <= 0) {
		pressureGen.value = 0;
	}

	/*if(pressureGen.value >= pressureGenCap.value) {
		pressureGen.value = pressureGenCap.value;
	}*/
}

//Electricity
function genEle(num) {

	//not enough positivity
	if(dynamoUnlocked == 1) {
		electricity.value += num;
		

		ResourceScreenUpdate(electricity, "electricity");
		ResourceCapScreenUpdate(electricityCap, "electricity");
	}
}

//Battery Dynamos
function genEleBat(num) {
	var change = 0;

	//not enough positivity
	if(dynamoUnlocked == 1) {
		//check against max/min values
		if((electricityRatioBattery.value + num) > electricityChoiceCap.value) {
			change = electricityChoiceCap.value - electricityRatioBattery.value;
		} else if((electricityRatioBattery.value + num) < 0) {
			change = -electricityRatioBattery.value;
		} else {
			change = num;
		}


		//check against available idle electricity
		if(-change + electricityRatioIdle.value > electricityIdleCap.value) {
			change = electricityChoiceCap.value - electricityRatioIdle.value;
		}
		if(-change + electricityRatioIdle.value < 0) {
			change = -electricityRatioIdle.value;
		}

		
		electricityRatioBattery.value += change;
		electricityRatioIdle.value -= change;

		ResourceScreenUpdate(electricityRatioIdle, "electricityIdle");
		ResourceCapScreenUpdate(electricityIdleCap, "electricityIdle");
		ResourceScreenUpdate(electricityRatioBattery, "electricityBattery");
		ResourceCapScreenUpdate(electricityChoiceCap, "electricityBattery");
	}
}

//Positivity Dynamos
function genElePos(num) {
	var change = 0;

	//not enough positivity
	if(dynamoUnlocked == 1) {
		//check against max/min values
		if((electricityRatioPosGen.value + num) > electricityChoiceCap.value) {
			change = electricityChoiceCap.value - electricityRatioPosGen.value;
		} else if((electricityRatioPosGen.value + num) < 0) {
			change = -electricityRatioPosGen.value;
		} else {
			change = num;
		}

		//check against available idle electricity
		if(-change + electricityRatioIdle.value > electricityIdleCap.value) {
			change = electricityChoiceCap.value - electricityRatioIdle.value;
		}
		if(-change + electricityRatioIdle.value < 0) {
			change = -electricityRatioIdle.value;
		}

		
		electricityRatioPosGen.value += change;
		electricityRatioIdle.value -= change;

		ResourceScreenUpdate(electricityRatioIdle, "electricityIdle");
		ResourceCapScreenUpdate(electricityIdleCap, "electricityIdle");
		ResourceScreenUpdate(electricityRatioPosGen, "electricityPosGen");
		ResourceCapScreenUpdate(electricityChoiceCap, "electricityPosGen");
	}
}

//Multiplication Dynamos
function genEleMult(num) {
	var change = 0;

	//not enough positivity
	if(dynamoUnlocked == 1) {
		//check against max/min values
		if((electricityRatioMult.value + num) > electricityChoiceCap.value) {
			change = electricityChoiceCap.value - electricityRatioMult.value;
		} else if((electricityRatioMult.value + num) < 0) {
			change = -electricityRatioMult.value;
		} else {
			change = num;
		}


		//check against available idle electricity
		if(-change + electricityRatioIdle.value > electricityIdleCap.value) {
			change = electricityChoiceCap.value - electricityRatioIdle.value;
		}
		if(-change + electricityRatioIdle.value < 0) {
			change = -electricityRatioIdle.value;
		}
	
		
		electricityRatioMult.value += change;
		electricityRatioIdle.value -= change;

		ResourceScreenUpdate(electricityRatioIdle, "electricityIdle");
		ResourceCapScreenUpdate(electricityIdleCap, "electricityIdle");
		ResourceScreenUpdate(electricityRatioMult, "electricityMult");
		ResourceCapScreenUpdate(electricityChoiceCap, "electricityMult");
	}
}

//Alloys
function genAlloy() {
	var oldVal = positivity.value;
	genPos(-positivity.value);

	alloy.value += oldVal * (negativity.value / 100);
	alloy.value = Math.round(alloy.value * 10) / 10;

	if(alloy.value < 0) {
		alloy.value = 0;
	}
	if(alloy.value > alloyCap.value) {
		alloy.value = alloyCap.value;
	}
	ResourceScreenUpdate(alloy, "alloy");
	ResourceCapScreenUpdate(alloyCap, "alloy");
}

